import "dotenv/config";
import express from "express";
import songRoute from "./routes/songsRoute.js";
import userRoute from "./routes/usersRoute.js";
import artistsRoute from "./routes/artistsRoute.js";
import playlistsRoute from "./routes/playlistsRoute.js";
import folderRoute from "./routes/foldersRoute.js";
import authRoute from "./routes/authRoute.js";
import socialRoute from "./routes/socialRoute.js";
import albumsRoute from "./routes/albumsRoute.js";
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/users", userRoute, folderRoute);

app.use("/api/songs", songRoute);

app.use("/api/artists", artistsRoute);

app.use("/api/playlists", playlistsRoute);

app.use("/api/auth", authRoute);

app.use("/api/social", socialRoute);

app.use("/api/albums", albumsRoute);

app.listen(5001, () => {
  console.log("server bắt đầu trên cổng 5001");
});
