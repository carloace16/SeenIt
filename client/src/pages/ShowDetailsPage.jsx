import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getShowById,
  fetchSeasonsByShowId,
  createSeason,
  updateSeason,
  deleteSeason,
} from "../services/api";

const ShowDetailsPage = () => {
  const { user } = useAuth();
  const { id: showId } = useParams(); // Get the show ID from the URL

  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [newSeason, setNewSeason] = useState({
    title: "",
    season_order: 1,
    cover_image_url: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    season_order: 1,
    cover_image_url: "",
  });

  useEffect(() => {
    if (user) {
      getShowDetails();
      getSeasons();
    }
  }, [user, showId]);

  const getShowDetails = async () => {
    const data = await getShowById(showId);
    setShow(data);
  };

  const getSeasons = async () => {
    const data = await fetchSeasonsByShowId(showId);
    setSeasons(data);
  };

  // --- CREATE ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    const finalData = {
      ...newSeason,
      season_order: parseInt(newSeason.season_order, 10),
      cover_image_url:
        newSeason.cover_image_url ||
        "https://images.unsplash.com/photo-1511875762315-c546542d742b?q=80&w=1000&auto=format&fit=crop",
      show_id: parseInt(showId),
    };

    const created = await createSeason(finalData);
    if (created) {
      setSeasons([...seasons, created]);
      setNewSeason({
        title: "",
        season_order: seasons.length + 1,
        cover_image_url: "",
      });
      setIsCreating(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Delete this season and all its episodes?")) {
      const success = await deleteSeason(id);
      if (success) {
        setSeasons(seasons.filter((s) => s.id !== id));
      } else {
        alert("Delete failed.");
      }
    }
  };

  // --- UPDATE ---
  const startEdit = (e, season) => {
    e.preventDefault();
    setEditingId(season.id);
    setEditForm({
      title: season.title,
      season_order: season.season_order,
      cover_image_url: season.cover_image_url,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      ...editForm,
      season_order: parseInt(editForm.season_order, 10),
    };

    const updated = await updateSeason(editingId, updateData);
    if (updated) {
      setSeasons(seasons.map((s) => (s.id === editingId ? updated : s)));
      setEditingId(null);
    } else {
      alert("Update failed.");
    }
  };

  const EmptyState = () => (
    <div className="text-center py-20 px-6 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700">
      <h2 className="text-3xl font-extrabold text-white mb-4">
        No Seasons Found
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Get started by adding the first season for "{show?.title}".
      </p>
      <button
        onClick={() => setIsCreating(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
      >
        + Add First Season
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header Section - Show Hero */}
      {show && (
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
          style={{ height: "400px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${show.cover_image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          <div className="relative p-8 md:p-12 flex flex-col justify-end h-full">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              {show.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              {show.description}
            </p>
          </div>
        </div>
      )}

      {/* Button to Add New Season */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-white">Seasons & Movies</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
          >
            + Add Season/Movie
          </button>
        )}
      </div>

      {/* Create New Season Form (Collapsible) */}
      {isCreating && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl animate-fade-in-down">
          <h3 className="text-xl font-bold text-white mb-4">
            Add New Season/Movie
          </h3>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title (e.g., 'Season 1' or 'Naruto: The Movie')"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                value={newSeason.title}
                onChange={(e) =>
                  setNewSeason({ ...newSeason, title: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Order (e.g., 1)"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={newSeason.season_order}
                onChange={(e) =>
                  setNewSeason({ ...newSeason, season_order: e.target.value })
                }
                required
              />
            </div>
            <input
              type="text"
              placeholder="Cover Image URL (Paste a link)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newSeason.cover_image_url}
              onChange={(e) =>
                setNewSeason({ ...newSeason, cover_image_url: e.target.value })
              }
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg py-3 transition-colors"
              >
                Create
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

      {/* Seasons Grid (Netflix Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {seasons.map((season) => (
          <div key={season.id} className="relative group">
            {editingId === season.id ? (
              // --- EDIT MODE CARD ---
              <div className="bg-gray-800 rounded-2xl p-4 h-80 flex flex-col justify-center gap-3 border-2 border-blue-500 shadow-xl">
                <h3 className="text-white font-bold mb-2 text-center">
                  Edit Season
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
                  type="number"
                  className="p-2 bg-gray-700 rounded text-white text-sm w-full"
                  value={editForm.season_order}
                  onChange={(e) =>
                    setEditForm({ ...editForm, season_order: e.target.value })
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
                to={`/season/${season.id}`}
                className="block h-80 rounded-2xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${season.cover_image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {season.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Season {season.season_order}
                  </p>
                  <p className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors mt-2">
                    View Episodes &rarr;
                  </p>
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => startEdit(e, season)}
                    className="py-2 px-4 bg-black/70 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-colors text-sm font-medium"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, season.id)}
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

      {user && seasons.length === 0 && !isCreating && <EmptyState />}
    </div>
  );
};

export default ShowDetailsPage;
