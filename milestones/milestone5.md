# Milestone 5

This document should be completed and submitted during **Unit 9** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [x] Deploy your project on Render
  - [x] In `readme.md`, add the link to your deployed project
- [x] Update the status of issues in your project board as you complete them
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of their title
  - [x] Under each feature you have completed, **include a GIF** showing feature functionality
- [x] In this document, complete the **Reflection** section below
- [x] 🚩🚩🚩**Complete the Final Project Feature Checklist section below**, detailing each feature you completed in the project (ONLY include features you implemented, not features you planned)
- [x] 🚩🚩🚩**Record a GIF showing a complete run-through of your app** that displays all the components included in the **Final Project Feature Checklist** below
  - [x] Include this GIF in the **Final Demo GIF** section below

## Final Project Feature Checklist

Complete the checklist below detailing each baseline, custom, and stretch feature you completed in your project. This checklist will help graders look for each feature in the GIF you submit.

### Baseline Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project includes an Express backend app and a React frontend app
- [x] The project includes these backend-specific features:
  - [x] At least one of each of the following database relationships in Postgres
    - [x] one-to-many (e.g., `shows` has many `seasons`, `seasons` has many `episodes`)
    - [x] many-to-many with a join table (e.g., `users` and `episodes` linked by `user_watched_log`)
  - [x] A well-designed RESTful API that:
    - [x] supports all four main request types for a single entity (ex. tasks in a to-do list app): GET, POST, PATCH, and DELETE
      - [x] the user can **view** items (e.g., Categories, Shows, Seasons, Episodes)
      - [x] the user can **create** a new item (e.g., Categories, Shows, Seasons, Episodes)
      - [x] the user can **update** an existing item (e.g., Categories, Shows, Seasons, Episodes)
      - [x] the user can **delete** an existing item (e.g., Categories, Shows, Seasons, Episodes)
    - [x] Routes follow proper naming conventions (e.g., `/api/shows`, `/api/users/login`)
  - [x] The web app includes the ability to reset the database to its default state (via `npm run reset-db`)
- [x] The project includes these frontend-specific features:
  - [x] At least one redirection, where users are able to navigate to a new page with a new URL within the app (e.g., Login -> Dashboard)
  - [x] At least one interaction that the user can initiate and complete on the same page without navigating to a new page (e.g., Marking an episode "watched" on the `SeasonDetailsPage`)
  - [x] Dynamic frontend routes created with React Router (e.g., `/`, `/login`, `/register`, `/dashboard`, `/category/:id`, `/show/:id`, `/season/:id`)
  - [x] Hierarchically designed React components
    - [x] Components broken down into categories, including Page (`LandingPage`, `Dashboard`) and Component (`Navbar`, `Footer`) types.
    - [ ] Corresponding container components and presenter components as appropriate _(Note: We used modern hooks like `useAuth` which blend these concepts)_
- [x] The project includes dynamic routes for both frontend and backend apps
- [x] The project is deployed on Render with all pages and features that are visible to the user are working as intended

### Custom Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project gracefully handles errors (e.g., API failures on Login/Register show a message to the user)
- [ ] The project includes a one-to-one database relationship
- [x] The project includes a slide-out pane or modal as appropriate for your use case that pops up and covers the page content without navigating away from the current page (The "Create New Folder/Show/Season/Episode" forms all appear and disappear on the same page)
- [x] The project includes a unique field within the join table (Our `user_watched_log` table includes a `watched_date`)
- [x] The project includes a custom non-RESTful route with corresponding controller actions (Our `POST /api/watchlog/toggle` route, which intelligently decides whether to CREATE or DELETE a record)
- [ ] The user can filter or sort items based on particular criteria as appropriate for your use case
- [ ] Data is automatically generated in response to a certain event or user action.
- [ ] Data submitted via a POST or PATCH request is validated before the database is updated (e.g. validating that an event is in the future before allowing a new event to be created)

### Stretch Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] A subset of pages require the user to log in before accessing the content (e.g., `/dashboard` and all sub-pages)
  - [ ] Users can log in and log out via GitHub OAuth with Passport.js
- [ ] Restrict available user options dynamically
- [ ] Show a spinner while a page or page element is loading
- [ ] Disable buttons and inputs during the form submission process
- [ ] Disable buttons after they have been clicked
- [ ] Users can upload images to the app and have them be stored on a cloud service
  - [x] _Adding a photo via a URL does **NOT** count for this rubric item (for example, if the user provides a URL with an image to attach it to the post)._ _(Note: We used this URL method, which is why this is checked)_
- [ ] 🍞 Toast messages deliver simple feedback in response to user events _(Note: We used standard `alert()` pop-ups)_

## Final Demo GIF

🔗 [Here's a GIF walkthrough of the final project](./Big%20GIF.gif)

## Reflection

### 1. What went well during this unit?

[👉🏾👉🏾👉🏾 **Our group's core vision for the app was strong from the start, and that really helped. Once we established the hierarchy (Folders -> Shows -> Seasons -> Episodes), building the components and API felt logical. We also did well with the UI, creating a premium, dark-mode theme with Tailwind that looks consistent across the entire application.**]

### 2. What were some challenges your group faced in this unit?

[👉🏾👉🏾👉🏾 **The biggest challenge was state management, especially with authentication. We faced bugs where the user would be "logged out" on page reloads or when navigating. Implementing a global Auth Context with `localStorage` was a critical and challenging fix. We also had to do a lot of debugging on our API routes and database schema (like fixing `user_id` permissions) to get the full CRUD functionality working securely.**]

### 3. What were some of the highlights or achievements that you are most proud of in this project?

[👉🏾👉🏾👉🏾 **We are most proud of the final user interface and the complete, logical flow of the app. It *feels* like a real, polished product. The "Netflix-style" card grids with hover effects, the smart navbar, and the full CRUD functionality at every level (Folders, Shows, Seasons, and Episodes) all came together really well. Getting the "Mark as Watched" checkbox to work was a huge highlight.**]

### 4. Reflecting on your web development journey so far, how have you grown since the beginning of the course?

[👉🏾👉🏾👉🏾 **Looking back, the growth is massive. We started with simple HTML and hardcoded data. Now, we've built a full-stack application from scratch with a complex relational PostgreSQL database, a secure Express API (handling hashing, routes, and controllers), and a dynamic React frontend. We've learned how to debug complex state issues, manage a project with Git, and deploy a live app, which is a huge leap.**]

### 5. Looking ahead, what are your goals related to web development, and what steps do you plan to take to achieve them?

[👉🏾👉🏾👉🏾 **Our goals are to get more comfortable with complex state management (like using `useReducer` or libraries like Redux/Zustand) and to integrate third-party APIs (like the TMDB to auto-populate show data). The next steps would be to refactor this project to use a proper auth token (JWT), learn how to do file uploads for images, and continue building new projects to solidify these skills.**]
