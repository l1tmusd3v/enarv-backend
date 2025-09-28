const admin = require('../services/firebase');

const authMiddleware = async (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
        return res.status(401).send({message: 'Authorization token missing'});

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).send({message: 'Invalid token'});
    }
}
