const createError = require("http-errors");
//const secure = require("express-force-https");
const express = require("express");
const http = require("http");
//const https = require("https");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config(); // dotenv 로드

const PORT = process.env.PORT || 3000; // 서버내 백엔드 포트 번호  'http://IP:3004' '3004:3000'
const HOST = process.env.HOST || '0.0.0.0' //모든 IP 주소에서 보내는 요청을 받음, 외부 네트워크 요청 처리 ... 이후 CORS 설정 추가 필요


//Express 서버 설정
const app = express();
const server = http.createServer(app);

//Express 설정
//app.use(secure()); //HTTPS 강제 리다이렉팅
app.use(express.json()); //JSON 파싱
app.use(logger("dev")); //요청 로깅
app.use(express.urlencoded({ extended : false })); //URL-encoded 데이터 파싱
app.use(cors({
  origin: ["http://mfluxis.duckdns.org:3004"],
  methods:[ "GET", "POST", "OPTIONS"],
  credentials: true,
})); //CORS 설정 

app.get('/', (req, res) => {
  res.send('CORS 설정 완료')
});

//서버 작동 확인용 로그 
server.listen(PORT,HOST, () => {
  console.log( `서버 구동 http://${HOST}:${PORT}/`);
  }); 

//데이터베이스 동기화
const database = require("./lib/models");

const dtbs = {};
dtbs.sequlize = database.Sequelize;
dtbs.models = database;

// 데이터베이스 연결
dtbs.models.team1DB
  .sync({ force: false })
  .then(() => {
    console.log("team1DB 데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("team1DB 데이터베이스 연결 실패:", err);
  });

  dtbs.models.team2DB
  .sync({ force: false })
  .then(() => {
    console.log("team2DB 데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("team2DB 데이터베이스 연결 실패:", err);
  });

//  마이그레이션 코드 
const {checkTeam2NewData} = require("./lib/controller/dataController"); // dataController에서 team2db 주시 함수 가져옴
const {initializeLastCheck} = require("./lib/controller/dataController");

// app.js 파일 내에서 주기적으로 checkTeam2NewData 함수를 실행하는 코드
// 5초마다 데이터베이스 업데이트( 필요에 따라 수정바랍니다. )
setInterval(() => {
  console.log('데이터베이스 업데이트 중...');
  initializeLastCheck();
  checkTeam2NewData(); // checkTeam2NewData 함수 호출
},5000);

//router 설정
const routers = [
  "data"
];
routers.forEach((route) => {
    require(`./lib/router/${route}`)(app);
});

//404 에러 핸들러
app.use((req, res, next)=> {
    next(createError(404))
});

module.exports ={ app, server }
