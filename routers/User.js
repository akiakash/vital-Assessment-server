const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("./Auth");

// Protected route (requires authentication)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // User is authenticated, and their information is available in req.user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
