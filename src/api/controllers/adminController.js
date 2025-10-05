const userModel = require("../models/userModel");

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId === userId) {
      return res
        .status(400)
        .json({ error: "You cannot delete your own admin account" });
    }

    const affectedRows = await userModel.deleteById(userId);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser controller:", error);

    res
      .status(500)
      .json({
        message: "An internal server error occurred during user deletion.",
      });
  }
};
