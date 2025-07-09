import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import { dbConnect } from "./config/dbConntect.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cookieParser());

const fileRoutes = fs.readdirSync("./routes");
fileRoutes.forEach((file) => {
  import(`./routes/${file}`).then((route) => {

    app.use("/api/v1/", route.default);
  }).catch((error) => {
    console.log(error);
  });
});

const server = async () => {
  try {
    await dbConnect();
    await app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
export default app;