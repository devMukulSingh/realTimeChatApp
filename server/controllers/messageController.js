import  getprismaInstance  from "../utils/prismaClient.js";
import { renameSync } from "fs";


export const addMessageController = async(req,res,next) => {

try {
        const{ message,to,from } = req.body;
        
        if(message && to && from ){
    
             const prisma = getprismaInstance();
             const messages = await prisma.messages.create({
                 data:{
                     message:message,
                     sender: { connect : { id:from }} ,
                     receiver: { connect : { id: to }} ,
                     messageStatus:" ",
                     type:'text'
                 }
             })
             return res.json({ status:201, data:messages })
        }
        return res.json({ status:500 , msg:"To, From and message is required"});
} catch (error) {
    next(`Error in addMessageController ${error}`);
}

}

export const getMessageController = async(req,res,next) => { 
    try {
        const{ to,from } = req.query;
        if( !to || !from ){
            return res.status(300).json("To and from not found");
        }
        const prisma = getprismaInstance();
        const messages = await prisma.messages.findMany({
            where : {
                OR:[
                    {
                        senderId : to,
                        receiverId : from, 
                    },
                    {
                        senderId: from,
                        receiverId : to,
                    }
                ]
            },
            orderBy : {
                id : "asc"
            }
        });
        return res.status(201).json(messages);
    } catch (error) {
        next(`Error in get Message Controller ${error}`);
    }   
}

export const addImageMessageController = async(req,res,next) => {
    try {
        if(req.file){
            console.log(req.file);
            const date = Date.now();
            const filename = 'uploads/images/' + date + req.file.originalname;
            renameSync(req.file.path, filename);
            const{ to,from } = req.query;
            if(to && from ){
                const prisma = getprismaInstance();
                const message = await prisma.messages.create({
                    data:{
                        message:filename,
                        sender : { connect: { id:from }},
                        receiver : { connect : {id: to} },
                        type:'image',
                    }
                })
                return res.status(200).json(message);
            }
            return res.status(400).send('Required to and from');
        }
        return res.status(400).send('Image is required');
    } catch (error) {
        next(error);
    }

}