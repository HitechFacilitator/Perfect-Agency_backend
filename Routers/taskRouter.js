const express = require("express");
const router = express.Router();

const taskController = require("../Controllers/taskController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", authorize("admin"), taskController.createTask);
router.get("/", authorize("admin", "marketer"), taskController.getTasks);
router.put("/:id/status", authorize("admin", "marketer"), taskController.updateTaskStatus);
router.delete("/:id", authorize("admin"), taskController.deleteTask)

module.exports = router;
