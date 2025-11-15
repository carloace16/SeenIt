import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users.js";
import showsRouter from "./routes/shows.js";
import categoriesRouter from "./routes/categories.js";
import seasonsRouter from "./routes/seasons.js";
import episodesRouter from "./routes/episodes.js";
import watchlogRouter from "./routes/watchlog.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/shows", showsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/seasons", seasonsRouter);
app.use("/api/episodes", episodesRouter);
app.use("/api/watchlog", watchlogRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">SeenIt API</h1>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
