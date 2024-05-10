const Task = require("../models/task");

exports.getTaskId = (req, res, next, id) => {
  Task.findById(id).exec((err, tas) => {
    if (err) {
      return res.status(400).json({
        error: "task do not save in db",
      });
    }
    req.Task = tas;
    next();
  });
};

exports.createTask = (req, res) => {
  const task = new Task({
    task_title: req.body.task_title,
  });

  task.save((err, task) => {
    if (err) {
      return res.status(400).json({
        error: "can't create task",
      });
    }
    res.json({ task });
  });
};

exports.getTask = (req, res) => {
  return res.json(req.Task);
};

exports.getallTask = (req, res) => {
  Task.find()
    .sort({ createdAt: -1 })
    .exec((err, task) => {
      if (err) {
        return res.status(400).json({
          error: "can't get all tasks'",
        });
      }
      res.json(task);
    });
};

exports.removecategory = (req, res) => {
  let tas = req.Task;
  if (tas != null) {
    tas.remove((err, task) => {
      if (err) {
        return res.status(400).json({
          error: "Task not deleted",
        });
      }
      res.json({
        message: "Task deleted successfully",
      });
    });
  } else {
    return res.status(400).json({
      error: "Task not deleted",
    });
  }
};

exports.updateTask = (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.Task._id },
    {
      status: !req.Task.status,
    }
  ).exec((err, task) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "can`t update" });
    }
    console.log(task);
    res.json({
      message: "sucessfully updated",
    });
  });
};

exports.update = (req, res) => {
  Task.findByIdAndUpdate(
    { _id: req.Task._id },
    {
      task_title: req.body.task_title,
    }
  ).exec((err, task) => {
    if (err) {
      return res.status(400).json({ error: "can`t update" });
    }
    res.json({
      message: "sucessfully updated",
    });
  });
};
