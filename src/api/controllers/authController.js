const userModel = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { uid, email } = req.user || {};
    if (!uid || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { username, full_name, bio } = req.body || {};
    if (!username || !full_name) {
      return res.status(400).json({ error: "Username and full name are required" });
    }

    // Validate input format
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
      bio: bio ? bio.trim() : null
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