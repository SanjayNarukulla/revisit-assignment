// Categories.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAdmin] = useState(localStorage.getItem("role") === "admin");

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    itemCount: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCategories = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditCategory(null);
    setFormData({ name: "", imageUrl: "", itemCount: 0 });
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setFormData({
      name: category.name,
      imageUrl: category.imageUrl,
      itemCount: category.itemCount,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editCategory) {
        // Edit mode
        await axios.put(`${API_URL}/categories/${editCategory._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add mode
        await axios.post(`${API_URL}/categories`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  return (
    <div className="p-4">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        {isAdmin && (
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Category
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded shadow p-4 relative">
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="h-40 w-full object-cover rounded"
            />
            <div className="mt-4 text-lg font-semibold">{cat.name}</div>
            <div className="text-sm text-gray-500">{cat.itemCount} items</div>

            {isAdmin && (
              <button
                className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded"
                onClick={() => openEditModal(cat)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-full max-w-sm sm:max-w-md lg:max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">
              {editCategory ? "Edit Category" : "Add Category"}
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border mb-3 rounded"
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border mb-3 rounded"
            />

            <input
              type="number"
              name="itemCount"
              placeholder="Items Count"
              value={formData.itemCount}
              onChange={handleChange}
              className="w-full p-2 border mb-3 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editCategory ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
