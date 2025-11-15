import React, { useState, useEffect } from "react";
// These import lines are now fixed (no '_')
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchCategoryById,
  fetchShowsByCategoryId,
  createShow,
  updateShow,
  deleteShow,
} from "../services/api";

const CategoryPage = () => {
  const { user } = useAuth();
  const { id: categoryId } = useParams(); // Get the category ID from the URL

  const [category, setCategory] = useState(null);
  const [shows, setShows] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [newShow, setNewShow] = useState({
    title: "",
    description: "",
    cover_image_url: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    cover_image_url: "",
  });

  // Fetch both the category's details (for the title) and the shows in it
  useEffect(() => {
    // We need to check for user AND categoryId
    if (user && categoryId) {
      getCategoryDetails();
      getShows();
    }
  }, [user, categoryId]);

  const getCategoryDetails = async () => {
    const data = await fetchCategoryById(categoryId);
    setCategory(data);
  };

  const getShows = async () => {
    const data = await fetchShowsByCategoryId(categoryId);
    setShows(data);
  };

  // --- CREATE ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    const finalData = {
      title: newShow.title,
      description: newShow.description,
      cover_image_url:
        newShow.cover_image_url ||
        "https://images.unsplash.com/photo-1594908900066-3f07b375b33f?q=80&w=1000&auto=format&fit=crop",
      category_id: parseInt(categoryId), // Link it to this category
    };

    const created = await createShow(finalData);
    if (created) {
      setShows([...shows, created]);
      setNewShow({ title: "", description: "", cover_image_url: "" });
      setIsCreating(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    if (window.confirm("Delete this show and all its seasons/episodes?")) {
      const success = await deleteShow(id);
      if (success) {
        setShows(shows.filter((s) => s.id !== id));
      } else {
        alert("Delete failed.");
      }
    }
  };

  // --- UPDATE ---
  const startEdit = (e, show) => {
    e.preventDefault();
    setEditingId(show.id);
    setEditForm({
      title: show.title,
      description: show.description,
      cover_image_url: show.cover_image_url,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    const updateData = {
      title: editForm.title,
      description: editForm.description,
      cover_image_url: editForm.cover_image_url,
      category_id: parseInt(categoryId), // Keep it in this category
    };

    const updated = await updateShow(editingId, updateData);
    if (updated) {
      setShows(shows.map((s) => (s.id === editingId ? updated : s)));
      setEditingId(null);
    } else {
      alert("Update failed.");
    }
  };

  // This is the "Empty State" component you asked for
  const EmptyState = () => (
    <div className="text-center py-20 px-6 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700">
      <h2 className="text-3xl font-extrabold text-white mb-4">
        This Folder is Empty
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Get started by adding your first show (e.g., "Naruto") to "
        {category?.name}".
      </p>
      <button
        onClick={() => setIsCreating(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
      >
        + Add Your First Show
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            {category?.name || "Loading..."}
          </h1>
          <p className="text-gray-400">All shows in this folder.</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
          >
            + New Show
          </button>
        )}
      </div>

      {/* Create New Show Form (Collapsible) */}
      {isCreating && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl animate-fade-in-down">
          <h3 className="text-xl font-bold text-white mb-4">Add New Show</h3>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Show Title (e.g., Naruto)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newShow.title}
              onChange={(e) =>
                setNewShow({ ...newShow, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newShow.description}
              onChange={(e) =>
                setNewShow({ ...newShow, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cover Image URL (Paste a link)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newShow.cover_image_url}
              onChange={(e) =>
                setNewShow({ ...newShow, cover_image_url: e.target.value })
              }
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg py-3 transition-colors"
              >
                Create Show
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg py-3 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Shows Grid (Netflix Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shows.map((show) => (
          <div key={show.id} className="relative group">
            {editingId === show.id ? (
              // --- EDIT MODE CARD ---
              <div className="bg-gray-800 rounded-2xl p-4 h-80 flex flex-col justify-center gap-3 border-2 border-blue-500 shadow-xl">
                <h3 className="text-white font-bold mb-2 text-center">
                  Edit Show
                </h3>
                <input
                  type="text"
                  className="p-2 bg-gray-700 rounded text-white text-sm w-full"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="p-2 bg-gray-700 rounded text-white text-sm w-full"
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="p-2 bg-gray-700 rounded text-white text-sm w-full"
                  placeholder="Image URL"
                  value={editForm.cover_image_url}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      cover_image_url: e.target.value,
                    })
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleUpdateSubmit}
                    className="flex-1 bg-green-600 rounded py-2 text-sm font-bold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-600 rounded py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // --- VIEW MODE CARD (Netflix Style) ---
              <Link
                to={`/show/${show.id}`}
                className="block h-80 rounded-2xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${show.cover_image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-3xl font-extrabold text-white mb-2">
                    {show.title}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    View Seasons &rarr;
                  </p>
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => startEdit(e, show)}
                    className="py-2 px-4 bg-black/70 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-colors text-sm font-medium"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, show.id)}
                    className="py-2 px-4 bg-black/70 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors text-sm font-medium"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Show the EmptyState message if user is logged in and has no shows */}
      {user && shows.length === 0 && !isCreating && <EmptyState />}
    </div>
  );
};

export default CategoryPage;
