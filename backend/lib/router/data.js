module.exports = (app) => {
    const dataController = require("../controller/dataController");
    const notificationController = require("../controller/notificationController");
    const loginController = require("../controller/loginController");

    const express = require("express");
    const router = express.Router();
    

    //로그인 
    router.post("/login", loginController.login);

    //알림조회
    router.get("/getNews/:phoneNumber", notificationController.getAllNews);
 
    
    app.use("/api", router);
};