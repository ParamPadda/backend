const express = require("express");
const router = express.Router();
const { addTask, getAllTasks, deleteTask } = require("../../controllers/dailyTasksController");
const markTaskAsRead = require("../../controllers/markTaskAsRead");
const getCompletedTasks = require("../../controllers/getCompletedTasks");

router.post("/add", addTask);
router.post("/mark-read/:id", markTaskAsRead);
router.get("/getCompletedTasks/:email", getCompletedTasks);
router.get("/all", getAllTasks);
router.delete("/:id", deleteTask);

module.exports = router;
