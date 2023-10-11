const express = require("express");
const router = express.Router();
const Task = require("../models/taskmodel");

router.post("/assigntask", async (req, res) => {
  try {
    const { title, description, assignedTo, complete } = req.body;
    const task = new Task({ title, description, assignedTo, complete });
    await task.save();
    res.json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all tasks assigned to the specified user
    const tasks = await Task.find({ assignedTo: userId });

    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Implement task update and delete routes here

router.get("/tasks", async (req, res) => {
  try {
    // Find all tasks and populate the "assignedTo" field with user details
    const tasks = await Task.find().populate("assignedTo", "username");
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add this route to update the "complete" field of a task by ID
router.patch("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { complete } = req.body;

    // Find the task by ID and update the "complete" field
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { complete },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
