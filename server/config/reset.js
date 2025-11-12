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
            name varchar(100) NOT NULL UNIQUE,
            image_url varchar(255) 
        );
    `;
  // --------------------------

  const createShowsTableQuery = `
        CREATE TABLE IF NOT EXISTS shows (
            id serial PRIMARY KEY,
            title varchar(255) NOT NULL,
            description text,
            cover_image_url varchar(255),
            category_id integer REFERENCES categories(id) ON DELETE SET NULL, 
            created_at timestamp DEFAULT now()
        );
    `;

  const createSeasonsTableQuery = `
        CREATE TABLE IF NOT EXISTS seasons (
            id serial PRIMARY KEY,
            season_number integer NOT NULL,
            show_id integer NOT NULL REFERENCES shows(id) ON DELETE CASCADE
        );
    `;

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

const seedData = async () => {
  try {
    // --- UPDATED THIS QUERY ---
    await pool.query(`
        INSERT INTO categories (name, image_url) VALUES 
        ('Anime', 'https://wallpapers.com/images/hd/anime-group-cpzl2mkdxnxtwgai.jpg'), 
        ('Netflix', 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5..v1582751026.png'), 
        ('Movies', 'https://irp.cdn-website.com/e0446a5f/dms3rep/multi/Best+of+2022+SQUARE.png')
    `);
    console.log("🎉 Categories seeded");
    // --------------------------

    await pool.query(`
        INSERT INTO shows (title, description, cover_image_url, category_id) VALUES
        ('Attack on Titan', 'Humanity fights for survival against giant man-eating titans.', 'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d8/Attack_on_Titan_Season_1.jpg/revision/latest/scale-to-width-down/1200?cb=20211005182832', 1),
        ('Stranger Things', 'A group of kids in a small town uncover supernatural mysteries.', 'https://i2.wp.com/readysteadycut.com/wp-content/uploads/2022/05/825394.jpg?fit=1920%2C1080&ssl=1', 2),
        ('Game of Thrones', 'Noble families fight for control of the Iron Throne.', 'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 3),
        ('Naruto', 'A young ninja seeks recognition from his peers.', 'https://m.media-amazon.com/images/M/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1)
    `);
    console.log("🎉 Shows seeded");
  } catch (err) {
    console.error("⚠️ error seeding data", err);
  }
};

const setupDatabase = async () => {
  await createTables();
  await seedData();
  pool.end();
};

setupDatabase();
