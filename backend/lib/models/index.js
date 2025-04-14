const Sequelize = require("sequelize");
//DB 연결정보 가져오기
const { team2dbConfig, team1dbConfig } = require("../config/config")

//dataSet
const dataSet = require("./dataSet");
//user
const user = require("./user");

//데이터베이스 및 모델 저장
const db = {};

//team2db 데이터베이스 대한 연결 설정
const team2DB = new Sequelize(
    team2dbConfig.database,
    team2dbConfig.user,
    team2dbConfig.password,
    {
        host: team2dbConfig.host, 
        dialect: "mysql",
        timezone : "+09:00"
    }
)

//team1db 데이터베이스 대한 연결 설정
const team1DB = new Sequelize(
    team1dbConfig.database,
    team1dbConfig.user,
    team1dbConfig.password,
    {
        host: team1dbConfig.host,
        dialect: "mysql",
        timezone : "+09:00"
    }
)

db.Sequelize = Sequelize;
db.team2DB = team2DB;
db.team1DB = team1DB;


//모델 로드
db.dataSet = dataSet(team1DB, Sequelize);
db.user = user(team1DB, Sequelize);

//모델관계설정
// user과 dataSet 간의 관계 설정
db.user.hasMany(db.dataSet, { foreignKey: "name" });
db.dataSet.belongsTo(db.user, { foreignKey:  "name" });

module.exports = db;
