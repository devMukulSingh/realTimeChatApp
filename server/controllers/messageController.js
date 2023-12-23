import  getprismaInstance  from "../utils/prismaClient.js";

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
        const { to, from } = req.body;
        if( !to || !from ){
            return res.status(300).json('To and From not found');
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