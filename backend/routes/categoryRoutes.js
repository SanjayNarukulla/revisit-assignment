const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCategories);
router.post("/", verifyToken, isAdmin, addCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);

module.exports = router;
