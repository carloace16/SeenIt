# SeenIt

Submitted by: **Carlo Ace Sagad, Jose Huertero, Arunavo Chowdhury**

## Description and Purpose

**SeenIt** is a full-stack web application designed to be the single source of truth for your media consumption. We were inspired to solve a common problem: in the age of endless streaming services (Netflix, Crunchyroll, etc.), it's too easy to lose track of which season or episode we last watched.

SeenIt provides a centralized, beautiful interface to create "folders" for your media, log your progress, and always know what to watch next.

## Inspiration

We often lose track of which season or episode we last watched, especially for ongoing series or anime with many installments. Existing apps can sometimes be overly complex, focused on only one type of media, or lack the specific tracking features we want. We were inspired to create a simple, focused, and visually appealing tool to solve this common problem for ourselves and others who consume a lot of media.

## Feature List

Below is a list of the features we plan to implement for the final project.

### ✅ Completed Features (Milestone 3)

**✅ Full User Authentication & Dashboard Foundation**

- **Landing, Login, & Register Pages:** A full-featured user authentication flow. Users can register for a new account (with hashed passwords) or log in on a premium, themed page.
- **Smart, Themed Navigation:** The navbar and footer are styled to match the app's theme and are "smart" — they show different links based on whether the user is logged in or out.
- **Category (Folder) Dashboard:** After logging in, the user is taken to their main dashboard. This page displays their "folders" (categories) as a grid of themed cards with image backgrounds.
- **Full Category CRUD:** Users can create new folders (with a name and image URL), edit a folder's details, and delete folders directly from the dashboard.

**GIF Walkthrough of these features:**
_(This GIF shows the auth flow and the dashboard's CRUD functionality)_
<img src="./Week%208%20GIF.gif" title="Milestone 3 Walkthrough" width="" alt="Video Walkthrough" />

---

### Baseline Features (In Progress):

- **View Tracked Shows:** Users can view a list/grid of all the shows, anime, or movies they have added to their tracking list. (GET all user's tracked items)
- **Add New Show:** Users can add a new show/movie to their tracked list (initially perhaps via manual entry, potentially later via external API search). (POST a new tracked item relationship)
- **View Show Details:** Users can click on a show to see more details, including a description, cover image, and a list of its seasons/episodes. (GET show by ID, Frontend Route)
- **Mark as Watched/Unwatched:** Users can mark individual seasons or episodes as watched or unwatched. The interface updates instantly. (PATCH/POST on `user_watched_status`, Frontend Interaction)
- **Remove Show:** Users can remove a show entirely from their tracked list. (DELETE a tracked item relationship)
- ✅ **Database Relationships:** Implemented a relational schema with Users, Shows, Seasons, Episodes, and a `user_watched_log` join table.
- ✅ **Database Reset Script:** Includes a script to reset the database tables to their initial state with seeded data.
- ✅ **RESTful API:** Backend API follows REST principles with full CRUD for Categories and Users.
- ✅ **React Frontend:** Use React with React Router for frontend navigation and component hierarchy.
- **Deployment:** Deploy the final application to Render.

### Custom Features (In Progress):

- **Filter Tracked List:** Users can filter their tracked list by platform (e.g., Netflix, Crunchyroll) or genre. (Custom Feature #1 - Filter/Sort)
- ✅ **Track Watched Date:** The `user_watched_log` join table includes a `watched_date` column, recording when the user marked an item as watched. (Custom Feature #2 - Unique Field in Join Table)

### Stretch Features (Potential Ideas):

- Integrate with an external API (like TMDB or TVMaze) to automatically fetch show details and episode lists.
- Add a user rating system for watched shows/episodes.
- Display progress bars for partially watched seasons.
