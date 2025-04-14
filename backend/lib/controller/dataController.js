const models = require("../models");
const { sendNotification } = require("./notificationController");
const user = models.user;
const dataSet = models.dataSet;
const { Op } = require("sequelize");
const team2DB = models.team2DB; 
const moment = require("moment");

// lastCheck 초기화
let lastCheck = 0;

//team2db 신규 데이터 주시 로직
const initializeLastCheck = async () => {
    try {
        // dataSet 테이블에서 가장 큰 id 값을 가져옴
        const maxId = await dataSet.max('id');

        // maxId가 null인 경우 초기값 0 설정
        lastCheck = maxId || 0;

        console.log(`초기화된 lastCheck 값: ${lastCheck}`);
    } catch (error) {
        console.error('lastCheck 초기화 중 에러가 발생했습니다:', error);
        lastCheck = 0; // 에러 발생 시 기본값으로 설정
    }
};

const checkTeam2NewData = async() => {

    try{
        
        const [results] = await team2DB.query(
            'SELECT * FROM fluxis WHERE id > :lastCheck ORDER BY id ASC',
            {
              replacements: { lastCheck }, 
              type: team2DB.QueryTypes.SELECT, 
            }
          );

          
          if( results ){
          const savedData = await dataSet.findOne ({
            where : {
                id : results.id,
            }
          });

          if( !savedData ) {
            await pushData(results);
            await saveNewData(results);
            lastCheck = results.id;
          }
        
            
        }else{
            console.log("DB 상 신규데이터가 없습니다.")
        };
      
    }catch(error){
        console.error("team2db 데이터 처리 중 에러가 발생했습니다.", error);
    }
};

const saveNewData = async(data) => {
    try{

        //이미 저장된 사용자인지 확인 
        const savedUser = await user.findOne({ where : { phoneNumber: data.phoneNumber }});

        //user 테이블에 데이터 저장 
        if( !savedUser ) {
            await user.create({
                name : data.name,
                phoneNumber : data.phoneNumber,
                token : data.token,
            });
        console.log("신규 사용자 정보 저장완료");
        }

        const formattedDate = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");

        //dataSet 테이블에 데이터 저장 
        const notification = await dataSet.create({ 
            name : data.name,
            phoneNumber : data.phoneNumber,
            isGoggleOn : data.isGoggleOn,
            isHelmetOn : data.isHelmetOn,
            isShoesOn : data.isShoesOn,
            equipStatus : data.equipStatus,
            createdAt : formattedDate,
             });
        console.log("신규데이터 저장 완료 :", notification );
        
    }catch(error){
        console.error("데이터 저장 오류:", error);
    }

};


//push 알람 데이터 필터링 
const pushData = async( data ) => {
    try{
    
    if( data.equipStatus == 1){
    let message = [];
        if( data.isGoggleOn == 1){
            message.push("고글")
        };
        if( data.isHelmetOn == 1){
            message.push("안전모")
        };
        if ( data.isShoesOn == 1){
            message.push("안전화")
        };

    const pushMessage = `${data.name}님 ${message.join(" / ")} 미착용`;
    const userInfo = await user.findOne({ 
        where: { phoneNumber : data.phoneNumber},
        attributes: [ "token" ]
    }); 
    await sendNotification(userInfo.token, pushMessage);
    console.log("신규 데이터 저장 및 푸쉬알림 전송완료");
    }else{
    console.log("사용자가 모든 안전장비를 착용 중임.");
    };

}catch(error){
    console.error("알림 데이터 처리 중 오류가 발생했습니다", error)
    }
};

module.exports= {
    initializeLastCheck,
    checkTeam2NewData,
    saveNewData,
    pushData,
}