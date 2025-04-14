const fcmAdmin = require("firebase-admin")
let serverKey = require("../../fcmServiceAccountKey.json");

fcmAdmin.initializeApp({
    credential : fcmAdmin.credential.cert(serverKey)
});

module.exports = {
    firebaseAdmin: fcmAdmin,
};