const models = require("../models");
const user = models.user;

//로그인
const login = async (req , res) => {
    const { token, phoneNumber } = req.body;
    
    try{    
        const checkNumber = await user.findOne({ where : { phoneNumber : phoneNumber }})
        if( !checkNumber ){
            return res.status(404).json({ message: "사용자 정보를 찾을 수 없습니다"});
        }
        //토큰 정보 저장 
        if(!checkNumber.token){
            checkNumber.token = token;
            await checkNumber.save();
        }
        return res.status(200).json({ message: "로그인 성공"});

    }catch(error){
        console.error("로그인 실패", error);
        return res.status(500).json({ error: "로그인 실패" });
    }
};

module.exports = {
    login,
}