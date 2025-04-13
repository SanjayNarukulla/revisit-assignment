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
    const { name, itemCount, imageUrl } = req.body;
    await Category.findByIdAndUpdate(id, { name, itemCount, imageUrl });
    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
