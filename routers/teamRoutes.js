const express = require("express");
const router = express.Router();

// Import your User and Team models here
const User = require("../models/user");
const Team = require("../models/team");

// Route to create a team
router.post("/createteam", async (req, res) => {
  try {
    // Get the user IDs from the request body (assuming you send an array of user IDs)
    const { memberIds, teamName } = req.body;

    // Create a new team with the provided member IDs
    const team = new Team({ members: memberIds, name: teamName });
    await team.save();

    res.json({ message: "Team created successfully" });
  } catch (error) {
    console.error("Error creating team: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the team" });
  }
});

router.get("/viewteams", async (req, res) => {
  try {
    // Retrieve all teams from the database
    const teams = await Team.find().populate("members", "username"); // Populate members with user details

    res.json({ teams });
  } catch (error) {
    console.error("Error retrieving teams: ", error);
    res.status(500).json({ error: "An error occurred while retrieving teams" });
  }
});

module.exports = router;
