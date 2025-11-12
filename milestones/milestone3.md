# Milestone 3

This document should be completed and submitted during **Unit 7** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

You will need to reference the GitHub Project Management guide in the course portal for more information about how to complete each of these steps.

- [x] In your repo, create a project board.
  - _Please be sure to share your project board with the grading team's GitHub **codepathreview**. This is separate from your repository's sharing settings._
- [x] In your repo, create at least 5 issues from the features on your feature list.
- [x] In your repo, update the status of issues in your project board. (We closed our 5 setup issues).
- [x] In your repo, create a GitHub Milestone for each final project unit, corresponding to each of the 5 milestones in your `milestones/` directory.
  - [x] Set the completion percentage of each milestone. The GitHub Milestone for this unit (Milestone 3 - Unit 7) should be 100% completed when you submit for full points.
- [ ] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of the feature's name.
  - [ ] Under each feature you have completed, include a GIF showing feature functionality.
- [x] In this document, complete all five questions in the **Reflection** section below.

## Reflection

### 1. What went well during this unit?

[👉🏾👉🏾👉🏾 **Our backend setup went well once we had a clear plan. Defining the 5 core setup issues (install, connect DB, create schema, auth API, shows API) made the process feel like a checklist. It was a great feeling to get the `reset-db` script working and to confirm with Postman that our API was successfully registering users and serving data from the live Render database.**]

### 2. What were some challenges your group faced in this unit?

[👉🏾👉🏾👉🏾 **The biggest challenge was the initial project configuration. We were confused about the starter repo being a planning template, not a code skeleton. We also ran into several tricky `dotenv` and `package.json` issues, like figuring out the correct location for the `.env` file (root vs. server) and ensuring all our scripts (`dev`, `reset-db`) could find the right `node_modules` folder.**]

### 3. Did you finish all of your tasks in your sprint plan for this week? If you did not finish all of the planned tasks, how would you prioritize the remaining tasks on your list?

[👉🏾👉🏾👉🏾 **Yes, we successfully completed all 5 of our planned setup tasks for this sprint (Milestone 3). Our GitHub milestone is at 100%, and the backend foundation is now fully built. The next step, which is the start of Milestone 4, will be building the frontend components to match.**]

### 4. Which features and user stories would you consider “at risk”? How will you change your plan if those items remain “at risk”?

[👉🏾👉🏾👉🏾 **The features most "at risk" are the complex frontend ones. Specifically, the "Show Details" page, which needs to fetch data from multiple API endpoints (shows, seasons, episodes, and the user's watched status) and combine it all. If we run into trouble, our plan is to simplify: first, we'll just get the show and its seasons to display. We'll leave the episode-level tracking and the "mark as watched" functionality (which is the most complex) for last.**]

### 5. What additional support will you need in upcoming units as you continue to work on your final project?

[👉🏾👉🏾👉🏾 **As we start building the React frontend, we'll need support on the best practices for managing complex, related data. For example, clear examples of how to fetch data from multiple API endpoints on a single page (like the Show Details page) and manage that state effectively would be very helpful. We also anticipate needing guidance on implementing the user authentication flow on the frontend.**]
