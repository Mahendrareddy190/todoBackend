const express = require("express");
const {
  createTask,
  getTaskId,
  getTask,
  getallTask,
  removecategory,
  updateTask,
  update,
} = require("../controlls/task");

const router = express.Router();

router.param("taskid", getTaskId);
router.post("/create", createTask);
router.get("/task/:taskid", getTask);
router.get("/tasks", getallTask);
router.delete("/taskDelete/:taskid", removecategory);
router.put("/update/:taskid", updateTask);
router.put("/updateTask/:taskid", update);
module.exports = router;
