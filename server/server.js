import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users.js";
import showsRouter from "./routes/shows.js";
import categoriesRouter from "./routes/categories.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/shows", showsRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">SeenIt API</h1>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
