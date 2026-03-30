const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);
// router.use(authorize("admin"));

router.get("/", authorize("admin"), userController.getUsers);
router.get("/get/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
