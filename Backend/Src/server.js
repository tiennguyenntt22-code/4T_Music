import pool from "./common/connect.js";
import express from "express";
import taskRoute from "./routes/songRouter.js";


const app = express();

app.use(express.json());

app.use("/api/song", taskRoute);

app.listen(5001, () => {
  console.log("server bắt đầu trên cổng 5001");
});
