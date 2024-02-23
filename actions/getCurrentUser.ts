import { authOptions } from "@/pages/api/auth/[...nextauth]"
import {getServerSession} from "next-auth"
import prisma from "@/libs/prismadb"
import { safeUser } from "@/types";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try{
        const session=await getSession();

        if(!session?.user?.email){
            return null;
        }
        const currentUser=await prisma.user.findUnique({
            where:{
                email:session?.user?.email,
            }
        });

        if(!currentUser){
            return null;
        }
        const safeUser: safeUser = {
            ...currentUser,
            createAt: currentUser.createAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null,
        };

        return safeUser;
    }
    catch(error:any){
        return null;
    }
}