'use client'
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import Heading from "@/app/components/products/Heading";
import { categories } from "@/utils/Categories";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";


const AddProductForm=()=>{
    const [isLoading, setIsLoading]=useState(false);
    const {register, handleSubmit, setValue, watch, reset, formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
        name:"", 
        description:"", 
        price:"", 
        brand:"", 
        category:"", 
        inStock:false,
        images:[]
        }
    })
    const category=watch("category");
    const setCustomValue=(id:string, value:any)=>{
        setValue(id, value, {
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true,
        });
    }
    return(
        <>
        <Heading title="Add a product" center />
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
        <Input id="price" label="Price" disabled={isLoading} register={register} errors={errors} required />
        <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
        <TextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
        <CustomCheckbox id="inStock" label="This product in Stock" register={register} />
        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">Select a Category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto gap-3">
                {categories.map((item)=>{
                    return(
                        <div key={item.label} className="col-span-1">
                        <CategoryInput 
                        label={item.label} icon={item.icon} 
                        selected={category===item.label}
                        onClick={(category)=>{setCustomValue("category", category)}} />
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default AddProductForm;