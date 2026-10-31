import pool from "./common/connect.js";
import express from "express";
import songRoute from "./routes/songsRoute.js";
import userRoute from "./routes/usersRoute.js";
import artistsRoute from "./routes/artistsRoute.js";
import playlistsRoute from "./routes/playlistsRoute.js";
import folderRoute from "./routes/foldersRoute.js";
import authRoute from "./routes/authRoute.js";
const app = express();

app.use(express.json());

app.use("/api/users", userRoute, folderRoute);

app.use("/api/songs", songRoute);

app.use("/api/artists", artistsRoute);

app.use("/api/playlists", playlistsRoute);

app.use("/api/auth", authRoute);

app.listen(5001, () => {
  console.log("server bắt đầu trên cổng 5001");
});
