// The port your backend server is on
const API_URL = "http://localhost:3000/api";

// --- NEW USER AUTH FUNCTIONS ---

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      // Try to parse the error message from the server
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: error.message }; // Return an error object
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
    return { error: error.message }; // Return an error object
  }
};

// --- CATEGORY FUNCTIONS ---

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData), // Send the whole object
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
      body: JSON.stringify(categoryData), // Send the whole object
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
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
