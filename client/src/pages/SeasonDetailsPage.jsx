import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getSeasonById,
  fetchEpisodesBySeasonId,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  fetchWatchLog, // <-- NEW
  toggleWatchStatus, // <-- NEW
} from "../services/api";

const SeasonDetailsPage = () => {
  const { user } = useAuth();
  const { id: seasonId } = useParams(); // Get the season ID from the URL

  const [season, setSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  // This new state will hold a list of *only* the IDs of watched episodes
  const [watchedIds, setWatchedIds] = useState(new Set());

  const [isCreating, setIsCreating] = useState(false);
  const [newEpisode, setNewEpisode] = useState({
    title: "",
    episode_number: 1,
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", episode_number: 1 });

  // This function fetches all the data for the page
  const loadPageData = async () => {
    if (user && seasonId) {
      // 1. Get the season's details (for the header)
      const seasonData = await getSeasonById(seasonId);
      setSeason(seasonData);

      // 2. Get all episodes for this season
      const episodesData = await fetchEpisodesBySeasonId(seasonId);
      setEpisodes(episodesData);

      // 3. Get the user's watch log
      const watchLogData = await fetchWatchLog(user.id);
      // We use a Set for fast lookups (e.g., watchedIds.has(1))
      setWatchedIds(new Set(watchLogData));
    }
  };

  // Load all data when the page starts
  useEffect(() => {
    loadPageData();
  }, [user, seasonId]);

  // --- CREATE ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      title: newEpisode.title,
      episode_number: parseInt(newEpisode.episode_number, 10),
      season_id: parseInt(seasonId),
    };
    const created = await createEpisode(finalData);
    if (created) {
      setEpisodes([...episodes, created]);
      setNewEpisode({ title: "", episode_number: episodes.length + 2 });
      setIsCreating(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Delete this episode?")) {
      const success = await deleteEpisode(id);
      if (success) {
        setEpisodes(episodes.filter((ep) => ep.id !== id));
      }
    }
  };

  // --- UPDATE ---
  const startEdit = (e, episode) => {
    e.preventDefault();
    setEditingId(episode.id);
    setEditForm({
      title: episode.title,
      episode_number: episode.episode_number,
    });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...editForm,
      episode_number: parseInt(editForm.episode_number, 10),
    };
    const updated = await updateEpisode(editingId, updateData);
    if (updated) {
      setEpisodes(episodes.map((ep) => (ep.id === editingId ? updated : ep)));
      setEditingId(null);
    }
  };

  // --- NEW: Handle Toggling Watch Status ---
  const handleToggleWatch = async (episodeId) => {
    if (!user) return; // Safety check

    const result = await toggleWatchStatus(user.id, episodeId);

    if (result && result.status === "watched") {
      // Add to our local set
      setWatchedIds((prevIds) => new Set(prevIds).add(episodeId));
    } else if (result && result.status === "unwatched") {
      // Remove from our local set
      setWatchedIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(episodeId);
        return newIds;
      });
    }
  };

  const EmptyState = () => (
    <div className="text-center py-20 px-6 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700">
      <h2 className="text-3xl font-extrabold text-white mb-4">
        No Episodes Found
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Get started by adding the first episode for "{season?.title}".
      </p>
      <button
        onClick={() => setIsCreating(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20"
      >
        + Add First Episode
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header Section - Season Hero */}
      {season && (
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
          style={{ height: "300px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${season.cover_image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          <div className="relative p-8 md:p-12 flex flex-col justify-end h-full">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              {season.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Season {season.season_order}
            </p>
          </div>
        </div>
      )}

      {/* Button to Add New Episode */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-white">Episodes</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20"
          >
            + Add Episode
          </button>
        )}
      </div>

      {/* Create New Episode Form (Collapsible) */}
      {isCreating && (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl animate-fade-in-down">
          <h3 className="text-xl font-bold text-white mb-4">Add New Episode</h3>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Episode Title (e.g., 'The Boy in the Iceberg')"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                value={newEpisode.title}
                onChange={(e) =>
                  setNewEpisode({ ...newEpisode, title: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Episode No."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={newEpisode.episode_number}
                onChange={(e) =>
                  setNewEpisode({
                    ...newEpisode,
                    episode_number: e.target.value,
                  })
                }
                required
              />
            </div>
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

      {/* Episodes List */}
      <div className="space-y-4">
        {episodes.map((episode) => {
          // Check if the user has watched this episode
          const isWatched = watchedIds.has(episode.id);

          return (
            <div key={episode.id}>
              {editingId === episode.id ? (
                // --- EDIT MODE ---
                <form
                  onSubmit={handleUpdateSubmit}
                  className="bg-gray-800 p-4 rounded-lg flex items-center gap-4"
                >
                  <input
                    type="number"
                    className="p-2 bg-gray-700 rounded text-white text-sm w-20"
                    value={editForm.episode_number}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        episode_number: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="p-2 bg-gray-700 rounded text-white text-sm flex-grow"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="bg-green-600 rounded py-2 px-4 text-sm font-bold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 rounded py-2 px-4 text-sm"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                // --- VIEW MODE ---
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-700/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-bold w-8 text-right">
                      {episode.episode_number}
                    </span>
                    <h3 className="text-lg text-white">{episode.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* THIS IS THE NEW, FUNCTIONAL CHECKBOX */}
                    <button
                      onClick={() => handleToggleWatch(episode.id)}
                      className={`text-2xl ${
                        isWatched ? "text-blue-500" : "text-gray-600"
                      } hover:text-white`}
                      title={
                        isWatched ? "Mark as Unwatched" : "Mark as Watched"
                      }
                    >
                      {isWatched ? "☑" : "☐"}
                    </button>
                    {/* ------------------------------------- */}
                    <button
                      onClick={(e) => startEdit(e, episode)}
                      className="text-sm text-gray-400 hover:text-blue-400 opacity-0 group-hover:opacity-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, episode.id)}
                      className="text-sm text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {user && episodes.length === 0 && !isCreating && <EmptyState />}
    </div>
  );
};

export default SeasonDetailsPage;
