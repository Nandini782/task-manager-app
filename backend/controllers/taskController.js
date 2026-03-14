const Task = require("../models/Task");
const mongoose = require("mongoose");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET TASKS (Pagination + Filter + Search)
exports.getTasks = async (req, res) => {
  try {

    const { page = 1, status, search } = req.query;

    const query = { user: req.user };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
