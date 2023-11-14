import getprismaInstance from "../utils/prismaClient.js";
  
export const checkUserController = async(req,res,next) => {
   try {
    const{ email } = req.body;
    if(!email){
     res.json({ msg : `User doesnt exist`,status:false});
    } 
    
    const prisma = getprismaInstance();
 
    const user = await prisma.user.findUnique( { where : {email} });
    
    if(!user){
     res.json({ msg:'User not found', status:false});
    }
    else{
     res.json( { msg : 'User found ', status:true , data: user});
    }
   } catch (error) {
        next(error);
   }
}

export const addUserController = async(req,res,next) => {
try {
      const{ email,userName, photoURL,about } = req.body;
      console.log(email,userName,photoURL,about);
      if( !email || !userName || !photoURL || !about){
         return res.json({ msg:"Email, Name and Image are required"});
      }
         const prisma = getprismaInstance();
         const newUser = await prisma.user.create({
            data:{
               name:userName,
               email:email,
               photoURL:photoURL,
               about:about
            }
         })
   
         res.json( { msg : `User created Sucessfully`, status: true });
} catch (error) {
   next(`Error in addUSerController ${error}`);
}
}

export const getUsersController = async(req,res,next) => {
try {
      const prisma = getprismaInstance();
   
      const users = await prisma.user.findMany();
      res.json(users); 

      // if(users){}
} catch (error) {
      next(error)
}
}