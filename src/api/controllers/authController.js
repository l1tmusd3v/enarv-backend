const userModel = require("../models/userModel");
const admin = require("../services/firebase");

exports.registerUser = async (req, res) => {
  try {
    const { uid, email } = req.user || {};
    if (!uid || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { username, full_name, bio, dob} = req.body || {};
    if (!username || !full_name || !dob) {
      return res.status(400).json({ error: "Username, full name and date of birth are required" });
    }
     if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return res.status(400).json({ message: 'Date of birth must be in YYYY-MM-DD format.' });
    }

    if (typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({ error: "Invalid username format" });
    }

    if (typeof full_name !== 'string' || full_name.trim().length === 0) {
      return res.status(400).json({ error: "Invalid full name format" });
    }

    const newUser = {
      user_id: uid,
      email,
      username: username.trim(),
      full_name: full_name.trim(),
      bio: bio ? bio.trim() : null,
      dob
    };

    const createdUser = await userModel.createUser(newUser);

    const safeUserData = {
      id: createdUser.user_id,
      email: createdUser.email,
      username: createdUser.username,
      full_name: createdUser.full_name,
      bio: createdUser.bio,
      created_at: createdUser.created_at
    };

    return res.status(201).json({ 
      message: "User registered successfully", 
      user: safeUserData 
    });
    
  } catch (error) {
    if (error.statusCode === 409) {
      return res.status(409).json({ 
        error: "This account is already registered" 
      });
    }

    // Log sanitized error details (no SQL queries or sensitive data)
    console.error("Error in user registration:", {
      uid: req.user?.uid,
      errorType: error.code || error.name,
      message: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(500).json({ 
      error: "An error occurred during registration. Please try again later." 
    });
  }
};

exports.login = async (req, res)=>{
  try{
    const { idToken } = req.body;

    if (!idToken){
      return res.status(400).json({ error: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid } = decodedToken;

    const user = await userModel.findById(uid);
    if (!user){
      return res.status(404).json({ error: "User not found" });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    }

    res.cookie('authToken', idToken, cookieOptions);

    return res.status(200).json({ message: "Login successful",
      user: {
        id: user.user_id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
      }
     });
  }catch(error){
    console.error("Error in user login:", {
      errorType: error.code || error.name,
      message: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(401).json({ error: "Invalid or expired ID token" });
  }
}