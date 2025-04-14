const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, itemCount, imageUrl } = req.body;
    const newCategory = new Category({ name, itemCount, imageUrl });
    await newCategory.save();
    res.status(201).json({ message: "Category added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.itemCount !== undefined)
      updates.itemCount = req.body.itemCount;
    if (req.body.imageUrl !== undefined) updates.imageUrl = req.body.imageUrl;

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
