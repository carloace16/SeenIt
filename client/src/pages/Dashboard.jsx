import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  // State for creating a new category
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image_url: "" });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", image_url: "" });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  // --- CREATE HANDLERS ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    // Use a default image if none provided
    const finalData = {
      name: newCategory.name,
      image_url:
        newCategory.image_url ||
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
    };

    const created = await createCategory(finalData);
    if (created) {
      setCategories([...categories, created]);
      setNewCategory({ name: "", image_url: "" });
      setIsCreating(false);
    }
  };

  // --- DELETE HANDLER ---
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent link click
    if (window.confirm("Delete this folder and all its contents?")) {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    }
  };

  // --- EDIT HANDLERS ---
  const startEdit = (e, category) => {
    e.preventDefault(); // Prevent link click
    setEditingId(category.id);
    setEditForm({ name: category.name, image_url: category.image_url });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateCategory(editingId, editForm);
    if (updated) {
      setCategories(categories.map((c) => (c.id === editingId ? updated : c)));
      setEditingId(null);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            My Library
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.first_name || "Traveler"}. What are we
            watching?
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          {isCreating ? "Cancel" : "+ New Folder"}
        </button>
      </div>

      {/* Create New Folder Form (Collapsible) */}
      {isCreating && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl animate-fade-in-down">
          <h3 className="text-xl font-bold text-white mb-4">
            Create New Folder
          </h3>
          <form
            onSubmit={handleCreateSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Folder Name (e.g., Anime)"
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Cover Image URL (Paste a link)"
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newCategory.image_url}
              onChange={(e) =>
                setNewCategory({ ...newCategory, image_url: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg py-3 transition-colors"
            >
              Create Folder
            </button>
          </form>
        </div>
      )}

      {/* Folders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="relative group">
            {editingId === category.id ? (
              // --- EDIT MODE CARD ---
              <div className="bg-gray-800 rounded-2xl p-4 h-64 flex flex-col justify-center gap-3 border-2 border-blue-500 shadow-xl">
                <input
                  type="text"
                  className="p-2 bg-gray-700 rounded text-white text-sm"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="p-2 bg-gray-700 rounded text-white text-sm"
                  placeholder="Image URL"
                  value={editForm.image_url}
                  onChange={(e) =>
                    setEditForm({ ...editForm, image_url: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleUpdateSubmit}
                    className="flex-1 bg-green-600 rounded py-1 text-sm font-bold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-600 rounded py-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // --- VIEW MODE CARD ---
              <Link
                to={`/category/${category.id}`}
                className="block h-64 rounded-2xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image_url})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    View Collection &rarr;
                  </p>
                </div>

                {/* Hover Actions (Edit/Delete) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => startEdit(e, category)}
                    className="p-2 bg-black/60 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-colors"
                    title="Edit"
                  >
                    <i className="fas fa-pen text-xs"></i> Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, category.id)}
                    className="p-2 bg-black/60 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                    title="Delete"
                  >
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">
            No folders yet. Create one to start tracking!
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
