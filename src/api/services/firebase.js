const admin = require('firebase-admin');
if (!process.env.FIREBASE_CONFIG) {
    console.error('FIREBASE_CONFIG environment variable is not set');
    process.exit(1);
}
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, '\n');
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
})


module.exports = admin;