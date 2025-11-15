# SeenIt

**Deployed Link:** [https://seenit-9107.onrender.com](https://seenit-9107.onrender.com)

Submitted by: **Carlo Ace Sagad, Jose Huertero, Arunavo Chowdhury**

## Description and Purpose

**SeenIt** is a full-stack web application designed to be the single source of truth for your media consumption. We were inspired to solve a common problem: in the age of endless streaming services (Netflix, Crunchyroll, etc.), it's too easy to lose track of which season or episode we last watched.

SeenIt provides a centralized, beautiful interface to create "folders" for your media, log your progress, and always know what to watch next.

## Inspiration

We often lose track of which season or episode we last watched, especially for ongoing series or anime with many installments. Existing apps can sometimes be overly complex, focused on only one type of media, or lack the specific tracking features we want. We were inspired to create a simple, focused, and visually appealing tool to solve this common problem for ourselves and others who consume a lot of media.

## Final GIF Walkthrough

Here is a complete walkthrough of the application's core features, from registration to marking an episode as watched.

<img src="./Big%20GIF.gif" title="Final Project Walkthrough" width="" alt="Video Walkthrough" />

---

## Feature List

### ✅ Completed Features

- **Full User Authentication:** Full-featured flow with a themed Landing Page, Login Page, and Register Page. User passwords are fully hashed and secured.
- **Persistent Login:** The app uses a global React Context and `localStorage` to keep users logged in, even after reloading the page.
- **Smart, Themed Navigation:** The navbar and footer are styled with Tailwind and are "smart" — they show different links based on whether the user is logged in or out.
- **Full CRUD for Categories (Folders):** After logging in, users see a dashboard of their media "folders" (e.g., "Anime", "Netflix"). They can create, edit, and delete these folders, including adding a custom image URL.
- **Full CRUD for Shows:** Users can click a category to see all the "shows" inside it. They can create, edit, and delete shows (e.g., "Naruto") and add a cover image URL.
- **Full CRUD for Seasons:** Users can click a show to see all its "seasons" or movies. They can create, edit, and delete seasons (e.g., "Season 1", "Shippuden") and add a cover image URL.
- **Full CRUD for Episodes:** Users can click a season to see all its episodes. They can create, edit, and delete individual episodes (e.g., "Episode 1: Enter Naruto!").
- **Core "Watch Log" Feature:** On the episodes page, users can click a checkbox to "mark as watched." This status is toggled in the database and updates instantly on the UI.
- **Relational Database:** Full PostgreSQL database with a normalized schema, including `users`, `categories`, `shows`, `seasons`, `episodes`, and a `user_watched_log` join table.
- **Full RESTful API:** A complete backend Express API with full CRUD endpoints for all data models, following RESTful conventions.
- **Database Reset Script:** Includes an `npm run reset-db` script to fully wipe and rebuild the database schema.
- **Custom API Route:** A custom non-RESTful route (`POST /api/watchlog/toggle`) that intelligently creates or deletes a "watched" status in a single call.
- **Unique Field in Join Table:** The `user_watched_log` join table includes a `watched_date` to track _when_ a user watched an episode.
- **Full Deployment:** Both the frontend (React) and backend (Express) are fully deployed and connected on Render.
- **Image Pasting via URL:** Users can add custom images to folders, shows, and seasons by pasting in a URL.
