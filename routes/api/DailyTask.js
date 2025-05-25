const express = require("express");
const router = express.Router();
const { addTask, getAllTasks, deleteTask } = require("../../controllers/dailyTasksController");
const markTaskAsRead = require("../../controllers/markTaskAsRead");
const getCompletedTasks = require("../../controllers/getCompletedTasks");
const removeCompletedTask = require("../../controllers/removeCompletedTask");

router.post("/add", addTask);
// router.post("/mark-read/:id", markTaskAsRead);
router.post("/mark-read/:id", (req, res, next) => {
  console.log("Mark-read route hit for id:", req.params.id);
  next();
}, markTaskAsRead);

router.get("/getCompletedTasks/:email", getCompletedTasks);
router.get("/all", getAllTasks);
router.delete("/:id", deleteTask);

router.delete("/completed/:email/:taskId", removeCompletedTask);

module.exports = router;
