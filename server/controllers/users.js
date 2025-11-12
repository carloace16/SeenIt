import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

// REGISTER a new user
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, avatar_url } = req.body;

    // 1. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Insert the new user into the database
    const results = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, avatar_url)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, first_name, last_name, email, avatar_url`, // Don't return the password!
      [first_name, last_name, email, hashedPassword, avatar_url]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// LOGIN an existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by their email
    const results = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results.rows[0];

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. If successful, return user info (excluding password)
    const { password_hash, ...userInfo } = user; // Remove password_hash from the object
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
