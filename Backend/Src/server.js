import pool from "./common/connect.js";
import express from "express";
import songRoute from "./routes/songsRoute.js";
import userRoute from "./routes/usersRoute.js";
import artistsRoute from "./routes/artistsRoute.js";
import playlistsRoute from "./routes/playlistsRoute.js";
import folderRoute from "./routes/foldersRoute.js";
const app = express();

app.use(express.json());

app.use("/users", userRoute, folderRoute);

app.use("/songs", songRoute);

app.use("/artists", artistsRoute);

app.use("/playlists", playlistsRoute);

app.listen(5001, () => {
  console.log("server bắt đầu trên cổng 5001");
});
