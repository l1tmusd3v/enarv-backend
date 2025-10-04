const userModel = require('../models/userModel');


exports.updatePreferences = async (req, res) => {
    try {
        const userId = req.user?.uid;

        const preferences = req.body;

        if (!preferences || Object.keys(preferences).length === 0) {
            return res.status(400).json({ error: "No preferences provided" });
        }

        preferences.onboardingComplete = true;

        const updatedUser = await userModel.updatePreferences(userId, preferences);

        if (!updatedUser){
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Preferences updated successfully",
            preferences: updatedUser.preferences
        });
    }catch (error){
        console.error('Error in updatePreferences controller:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
    }
};