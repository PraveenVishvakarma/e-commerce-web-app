'use client'

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { safeUser } from "@/types";

interface LoginFormProps{
    currentUser:safeUser | null;
}
const LoginForm:React.FC<LoginFormProps>=({currentUser})=>{
    const[isLoading, setIsLoading]=useState(false);
    const router=useRouter();
    
    useEffect(()=>{
        if(currentUser){
            router.push("/cart");
            router.refresh();
        }
    },[])

    const {register, handleSubmit, formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    });
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        try{
            setIsLoading(true);
                const signinData=await signIn("credentials",{
                    ...data,
                    redirect:false,
                });
                if(signinData?.ok){
                    router.push("/cart");
                    router.refresh();
                    toast.success("Logged In");
                }
                if(signinData?.error){
                    toast.error(signinData.error);
                }
        }
        catch(error){
            toast.error("Something went wrong")
        }
        finally{
            setIsLoading(false);
        }
    }
    if(currentUser){
        return <p className="text-center">Logged in Redirecting...</p>
    }
    return(
        <>
        <Heading title="Sign in to E-Bazar" />
        <Button label="Continue with Google" outline icon={AiOutlineGoogle} onClick={()=>{signIn('google')}} />
        <hr className="bg-slate-300 w-full h-px" />
        <Input id='email' label="Email" disabled={isLoading} register={register} errors={errors} required />
        <Input id='password' label="Password" disabled={isLoading} register={register} errors={errors} required />
        <Button label={`${isLoading?"Loading...":'Login'}`} onClick={handleSubmit(onSubmit)} />
        <p>Don't have an Account?{" "} <Link href={"/register"} className="underline text-blue-500">
            Sign up
        </Link> </p>
        </>
    )
}

export default LoginForm;