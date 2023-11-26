import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const PORT  = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})

const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000"
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",{
                from:data.from,
                message:data.message,
            })
        }
    })
});



