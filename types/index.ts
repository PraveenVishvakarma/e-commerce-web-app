import { User } from "@prisma/client";


export type safeUser=Omit<User,"createAt"| "updateAt" | "emailVerified"> & {
    createAt:string,
    updateAt:string,
    emailVerified:string | null,
}
/*id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createAt: Date;
    updateAt: Date;
    role: $Enums.Role; */