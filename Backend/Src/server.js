import pool from "./common/connect.js";
import express from "express";
import songRoute from "./routes/songRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use("/user", userRoute);

app.use("/song", songRoute);

app.listen(5001, () => {
  console.log("server bắt đầu trên cổng 5001");
});
