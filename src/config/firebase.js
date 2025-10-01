const admin = require('firebase-admin');
const serviceAccount = require('../../firebase_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
} = require('firebase/auth');

module.exports = {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    admin
};