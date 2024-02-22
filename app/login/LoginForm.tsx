'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm=()=>{
    const[isLoading, setIsLoading]=useState(false);
    const {register, handleSubmit, formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        console.log(data);
    }
    return(
        <>
        <Heading title="Sign in to E-Bazar" />
        <Button label="Continue with Google" outline icon={AiOutlineGoogle} onClick={()=>{}} />
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