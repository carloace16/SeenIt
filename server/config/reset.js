import { pool } from "./database.js";

const createTables = async () => {
  // Drop tables in specific order to handle foreign keys
  const dropUserWatchedLogQuery = "DROP TABLE IF EXISTS user_watched_log;";
  const dropEpisodesQuery = "DROP TABLE IF EXISTS episodes;";
  const dropSeasonsQuery = "DROP TABLE IF EXISTS seasons;";
  const dropShowsQuery = "DROP TABLE IF EXISTS shows;";
  const dropCategoriesQuery = "DROP TABLE IF EXISTS categories;";
  const dropUsersQuery = "DROP TABLE IF EXISTS users;";

  const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            first_name varchar(100) NOT NULL,
            last_name varchar(100) NOT NULL,
            email varchar(100) UNIQUE NOT NULL,
            password_hash varchar(255) NOT NULL,
            avatar_url varchar(255),
            created_at timestamp DEFAULT now()
        );
    `;

  // --- UPDATED THIS TABLE ---
  const createCategoriesTableQuery = `
        CREATE TABLE IF NOT EXISTS categories (
            id serial PRIMARY KEY,
            name varchar(100) NOT NULL,
            image_url varchar(255),
            user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
    `;
  // --------------------------

  const createShowsTableQuery = `
        CREATE TABLE IF NOT EXISTS shows (
            id serial PRIMARY KEY,
            title varchar(255) NOT NULL,
            description text,
            cover_image_url varchar(255),
            category_id integer REFERENCES categories(id) ON DELETE CASCADE, 
            created_at timestamp DEFAULT now()
        );
    `;

  // ... (rest of the tables are the same) ...
  // (Your reset.js file... find this function)
  const createSeasonsTableQuery = `
        CREATE TABLE IF NOT EXISTS seasons (
            id serial PRIMARY KEY,
            title varchar(255) NOT NULL,
            season_order integer NOT NULL,
            cover_image_url varchar(255),
            show_id integer NOT NULL REFERENCES shows(id) ON DELETE CASCADE
        );
    `;
  // (The rest of your reset.js file stays the same for now)

  const createEpisodesTableQuery = `
        CREATE TABLE IF NOT EXISTS episodes (
            id serial PRIMARY KEY,
            episode_number integer NOT NULL,
            title varchar(255),
            season_id integer NOT NULL REFERENCES seasons(id) ON DELETE CASCADE
        );
    `;

  const createUserWatchedLogQuery = `
        CREATE TABLE IF NOT EXISTS user_watched_log (
            user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            episode_id integer NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
            watched_date date,
            created_at timestamp DEFAULT now(),
            PRIMARY KEY (user_id, episode_id)
        );
    `;

  try {
    await pool.query(dropUserWatchedLogQuery);
    await pool.query(dropEpisodesQuery);
    await pool.query(dropSeasonsQuery);
    await pool.query(dropShowsQuery);
    await pool.query(dropCategoriesQuery);
    await pool.query(dropUsersQuery);
    console.log("Tables dropped successfully.");

    await pool.query(createUsersTableQuery);
    console.log('🎉 "users" table created');
    await pool.query(createCategoriesTableQuery);
    console.log('🎉 "categories" table created');
    await pool.query(createShowsTableQuery);
    console.log('🎉 "shows" table created');
    await pool.query(createSeasonsTableQuery);
    console.log('🎉 "seasons" table created');
    await pool.query(createEpisodesTableQuery);
    console.log('🎉 "episodes" table created');
    await pool.query(createUserWatchedLogQuery);
    console.log('🎉 "user_watched_log" table created');
  } catch (err) {
    console.error("⚠️ error creating tables", err);
  }
};

const setupDatabase = async () => {
  await createTables();
  // We no longer seed any categories or shows. Users will create their own.
  console.log("🎉 Database setup complete. No seed data added.");
  pool.end();
};

setupDatabase();
