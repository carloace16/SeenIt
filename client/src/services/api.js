// The port your backend server is on
// const API_URL = "http://localhost:3000/api";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// --- USER AUTH FUNCTIONS ---
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: error.message };
  }
};
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error.message };
  }
};

// --- CATEGORY FUNCTIONS ---
export const fetchCategories = async (userId) => {
  if (!userId) return [];
  try {
    const response = await fetch(`${API_URL}/categories/user/${userId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const fetchCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching category details:", error);
    return null;
  }
};
export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
};
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};
export const deleteCategory = async (id, userId) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};

// --- SHOWS FUNCTIONS ---
export const fetchShows = async () => {
  try {
    const response = await fetch(`${API_URL}/shows`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
};
export const fetchShowsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/shows/bycategory/${categoryId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching shows for category:", error);
    return [];
  }
};
export const getShowById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching show details:", error);
    return null;
  }
};
export const createShow = async (showData) => {
  try {
    const response = await fetch(`${API_URL}/shows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(showData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error creating show:", error);
    return null;
  }
};
export const updateShow = async (id, showData) => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(showData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating show:", error);
    return null;
  }
};
export const deleteShow = async (id) => {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting show:", error);
    return false;
  }
};

// --- SEASONS FUNCTIONS ---
export const getSeasonById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/seasons/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching season details:", error);
    return null;
  }
};
export const fetchSeasonsByShowId = async (showId) => {
  try {
    const response = await fetch(`${API_URL}/seasons/byshow/${showId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching seasons for show:", error);
    return [];
  }
};
export const createSeason = async (seasonData) => {
  try {
    const response = await fetch(`${API_URL}/seasons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seasonData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error creating season:", error);
    return null;
  }
};
export const updateSeason = async (id, seasonData) => {
  try {
    const response = await fetch(`${API_URL}/seasons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seasonData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating season:", error);
    return null;
  }
};
export const deleteSeason = async (id) => {
  try {
    const response = await fetch(`${API_URL}/seasons/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting season:", error);
    return false;
  }
};

// --- EPISODES FUNCTIONS ---
export const fetchEpisodesBySeasonId = async (seasonId) => {
  try {
    const response = await fetch(`${API_URL}/episodes/byseason/${seasonId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching episodes for season:", error);
    return [];
  }
};
export const createEpisode = async (episodeData) => {
  try {
    const response = await fetch(`${API_URL}/episodes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error creating episode:", error);
    return null;
  }
};
export const updateEpisode = async (id, episodeData) => {
  try {
    const response = await fetch(`${API_URL}/episodes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating episode:", error);
    return null;
  }
};
export const deleteEpisode = async (id) => {
  try {
    const response = await fetch(`${API_URL}/episodes/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting episode:", error);
    return false;
  }
};

// --- WATCH LOG FUNCTIONS (NEW!) ---

// Gets an array of watched episode IDs for the logged-in user
export const fetchWatchLog = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/watchlog/user/${userId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json(); // Returns array like [1, 5, 12]
  } catch (error) {
    console.error("Error fetching watch log:", error);
    return [];
  }
};

// Toggles an episode's "watched" status
export const toggleWatchStatus = async (userId, episodeId) => {
  try {
    const response = await fetch(`${API_URL}/watchlog/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        episode_id: episodeId,
        watched_date: new Date().toISOString(), // Add today's date
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json(); // Returns { status: 'watched' } or { status: 'unwatched' }
  } catch (error) {
    console.error("Error toggling watch status:", error);
    return null;
  }
};
