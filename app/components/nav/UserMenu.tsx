'use client'

import { useCallback, useState } from "react"
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import {signOut} from "next-auth/react";
import BackDrop from "./BackDrop";
import { safeUser } from "@/types";
import { User } from "@prisma/client";
interface UserMenuProps{
    currentUser: safeUser | null,
}
const UserMenu:React.FC<UserMenuProps>=({currentUser})=>{
    const[isToggled, setISToggled]=useState(false);
    const toggle=useCallback(()=>{
        setISToggled((pre)=>!pre);
    },[]);
    return(
        <>
        <div className="relative z-30">
            <div onClick={toggle} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                <Avatar/>
                <AiFillCaretDown />
            </div>
            {isToggled && 
            <div className="absolute rounded-md shadow-md bg-white right-0 top-12 w-[170px] overflow-hidden flex flex-col cursor-pointer text-sm">
               {currentUser?<div>
                    <Link href={"/orders"}>
                        <MenuItems onClick={toggle} >Your Orders</MenuItems>
                    </Link>
                    <Link href={"/admin"}>
                        <MenuItems onClick={toggle} >Admin Dashboard</MenuItems>
                    </Link>
                    <hr />
                    <MenuItems onClick={()=>{
                        toggle();
                        signOut();
                    }}
                    >
                        Logout
                    </MenuItems>
                </div>
                :
                <div>
                    <Link href={"/login"}>
                        <MenuItems onClick={toggle} >Login</MenuItems>
                    </Link>
                    <Link href={"/register"}>
                        <MenuItems onClick={toggle} >Register</MenuItems>
                    </Link>
                </div>
                }
            </div> }
        </div>
        {isToggled?<BackDrop onClick={toggle}></BackDrop>:null}
        </>
    )
}

export default UserMenu;