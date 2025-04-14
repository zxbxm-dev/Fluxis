 require('dotenv').config(); // .env 파일에서 환경 변수 로드
const mysql = require("mysql2");

// team2DB
const team2dbConfig = {  
    host: process.env.DB_team2DB_HOST,
    user: process.env.DB_team2DB_USER,
    password: process.env.DB_team2DB_PASSWORD,
    database: process.env.DB_team2DB_DATABASE,
    port: 3306,
}; 

// 데이터베이스 연결 설정
const team1dbConfig = {
  host: process.env.DB_CHART_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
};

// //tea2DB 연결 생성
 const team2dbConnection = mysql.createPool(team2dbConfig);

//데이터베이스 연결 생성
const team1dbConnection = mysql.createPool(team1dbConfig); 

module.exports = { team2dbConfig, team1dbConfig };
