import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

const getprismaInstance = () => {
    if(!prismaInstance){
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}

export default getprismaInstance;