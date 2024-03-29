import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import getprismaInstance from "./utils/prismaClient.js";

dotenv.config();
const app = express();
const PORT  = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/uploads/images", express.static("uploads/images"));
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})

const io = new Server(server, {
    cors : {
        // origin: "https://mukul-chat-app.vercel.app"
        origin: "http://localhost:3000"

    }
});

global.onlineUsers = new Map(); // map data structure of name onlineUsers(global object)

//socket.on used to listen to events emmitted either from the client or the server side. it can be used on both side
// this events can be emmiited using socket.emit method

io.on("connection", (socket) => {
    
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        if(userId){
            onlineUsers.set(userId, socket.id);
            // console.log(onlineUsers);
        }
    });
    
    socket.on("send-msg", (data) => {  //data contains {senderId,receiverId,messagetoBeSend} (coming from the frontend)
        // console.log(data);
        const senderSocket = onlineUsers.get(data.to);
        // console.log(onlineUsers);

        if(senderSocket){
            // console.log('inside');
            socket.to(senderSocket).emit("msg-receive",{ //new event is emmitted at the receiver's side,after the message is received
                senderId:data.from,                    //from the sender using "send-msg" event, to send the message to the receiver.
                message:data.message,                  // this event is then handled at the receiver's home page
                created:data.created,
                type: data.type
            }) 
        } 
    })

    // 3rd step for voice call // 4th step->page.jsx(home)
    // emmitting incoming-voice-call event as we have the data of caller to the receiver's end
    socket.on("outgoing-voice-call", (data) => {
        // console.log(data);
        const senderSocket = onlineUsers.get(data.to);
        if(senderSocket){
            // console.log('in');
            socket.to(senderSocket).emit("incoming-voice-call",{
                from:data.from,
                roomId: data.roomId,
                callType:data.callType

            })
        }
    })

    // 3rd step for video call
    socket.on("outgoing-video-call", (data) => {
        const senderSocket = onlineUsers.get(data.to);
        console.log(data);
        if(senderSocket){
            socket.emit("incoming-video-call", {
                from:data.from,
                roomId: data.roomId,
                callType:data.callType
            })
        }
    })

    socket.on("reject-voice-call", (data) => {
        const senderSocket = onlineUsers.get(data.to);
        if(senderSocket){
            socket.to(senderSocket).emit("voice-call-rejected");
        }
    })
    socket.on("reject-video-call",(data) => {
        const senderSocket = onlineUsers.get(data.to);
        if(senderSocket){
            socket.to(senderSocket).emit("video-call-rejected");
        }
    });

    // 8th step for voice call(at receiver's side) // 9th step-> voiceCall.jsx
    socket.on("accept-incoming-call", (data) => {
        const senderSocket = onlineUsers.get(data.to);
        if(senderSocket){
            socket.to(senderSocket).emit("accept-call",data);
        }
    })

});



