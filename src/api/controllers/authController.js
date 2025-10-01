const userModel = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { uid, email } = req.user || {};
    if (!uid || !email) {
      return res.status(401).json({ error: "Unauthorized: missing user info" });
    }

    const { username, full_name, bio } = req.body || {};
    if (!username || !full_name) {
      return res.status(400).json({ error: "Username and full name are required" });
    }

    const newUser = {
      user_id: uid,
      email,
      username,
      full_name,
      bio: bio || null
    };

    const createdUser = await userModel.createUser(newUser);
    return res.status(201).json({ message: "User registered successfully", user: createdUser });
    
  } catch (error) {
    if (error.statusCode === 409) {
      return res.status(409).json({ error: error.message });
    }
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
