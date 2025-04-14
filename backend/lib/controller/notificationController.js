const { firebaseAdmin } = require("../config/firebaseConfig");
const models = require("../models");
const dataSet = models.dataSet;
const user = models.user;

//push 알람 전송
const sendNotification = async (token, message) => {
    try {
        const currentTime = new Date().toISOString();
        const newMessage = {
            notification: {
                title: '이상 행동이 탐지 되었습니다.',
                body: message,
            },
            data: {
                timestamp : currentTime
            },
            token: token,
        };

        const pushAlert = await firebaseAdmin.messaging().send(newMessage);
        console.log('알림 전송 성공:', pushAlert);
        return pushAlert;
    } catch (error) {
        console.error('알림 전송 실패:', error);
        throw error;
    }
};


//알람 내역 조회 
const getAllNews = async(req, res) => {
    const { phoneNumber } = req.params;
    try{
        if( !phoneNumber ){
            return res.status(404).json({ message: " 사용자 정보를 찾을 수 없습니다." });
        }

        const userInfo = await user.findOne({
            where: {
                phoneNumber : phoneNumber,
            },
            attributes: [ 'name' ],
        });

        const notifications = await dataSet.findAll({
             where : { 
                phoneNumber : phoneNumber,
                equipStatus : 1,
                 }
            });
        if( notifications.length === 0 ){
            return res.status(208).json({ message: "사용자의 과거 알람 내역이 존재하지 않습니다.", userInfo : userInfo });
        }else{
            console.log(notifications.createdAt);
           return res.status(200).json({ message: " 알림 내역 조회를 성공적으로 완료했습니다.", notifications : notifications });
        }
    }catch(error){
        console.error("알림 내역 조회 중 오류가 발생했습니다.");
        res.status(500).json({ error : "알림 내역 조회 중 오류 발생"});
    }
};


module.exports = {
    sendNotification,
    getAllNews,
}
