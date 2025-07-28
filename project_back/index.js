import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import { dbConnect } from "./config/dbConntect.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import MessageModel from "./models/Message.js";
import path from "path"; 
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static("public"));
app.use(cookieParser());

const fileRoutes = fs.readdirSync("./routes");
fileRoutes.forEach((file) => {
  import(`./routes/${file}`).then((route) => {
    app.use("/api/v1/", route.default);
  }).catch((error) => {
    console.error("Error loading route:", error);
  });
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("Usuario conectado");


  socket.on("joinTeamRoom", (teamId) => {
    socket.join(`team_${teamId}`);
    console.log(`Usuario unido a sala team_${teamId}`);
  });


  socket.on("sendMessage", async ({ text, teamId, sender }) => {

    if (!sender || !sender._id) {
      console.error("Usuario inválido en sendMessage");
      return;
    }

    const newMessage = new MessageModel({
      text,
      teamId,
      sender: sender._id,
    });

    await newMessage.save();

    await newMessage.populate("sender", "name email");

    io.to(`team_${teamId}`).emit("newMessage", {
      _id: newMessage._id,
      text: newMessage.text,
      sender: newMessage.sender,
      teamId: newMessage.teamId,
      createdAt: newMessage.createdAt,
    });
  });


  socket.on("joinPrivateChat", ({ fromUserId, toUserId }) => {
    const privateRoomId = [fromUserId, toUserId].sort().join("_");
    socket.join(privateRoomId);

    console.log(`🔐 ${fromUserId} se unió a la sala privada: ${privateRoomId}`);
  });



  socket.on("sendPrivateMessage", async ({ fromUserId, toUserId, text }) => {
    const privateRoomId = [fromUserId, toUserId].sort().join("_");

    const newMessage = new MessageModel({
      sender: fromUserId,
      receiver: toUserId,
      text,
    });

    await newMessage.save();


    const populatedMessage = await MessageModel.findById(newMessage._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    if (populatedMessage) {
      io.to(privateRoomId).emit("newPrivateMessage", populatedMessage);
    }
  });


  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});



const startServer = async () => {
  try {
    await dbConnect();
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();

export default app;
