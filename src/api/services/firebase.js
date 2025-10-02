const admin = require('firebase-admin');

const firebaseConfig = require('../../../firebase_key.json');


admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
})


module.exports = admin;