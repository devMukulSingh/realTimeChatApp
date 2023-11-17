import  getprismaInstance  from "../utils/prismaClient.js";

export const addMessageController = async(req,res,next) => {

try {
        const{ message,to,from } = req.body;
        
        if(message && to && from ){
    
             const prisma = getprismaInstance();
             const messages = await prisma.messages.create({
                 data:{
                     message:message,
                     sender: from,
                     receiver: to ,
                     messageStatus:" "
                 }
             })
             return res.json({ status:201, data:messages })
        }
        return res.json({ status:500 , msg:"To, From and message is required"});
} catch (error) {
    next(`Error in addMessageController ${error}`);
}

}