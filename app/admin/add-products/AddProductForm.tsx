'use client'
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Button from "@/app/components/products/Button";
import Heading from "@/app/components/products/Heading";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { useRouter } from "next/navigation";
import axios from "axios";

export type ImageType={
    color:string;
    colorCode:string;
    image:File | null;
}

export type UploadedImageType={
    color:string;
    colorCode:string;
    image:string;
}


const AddProductForm=()=>{
    const [isLoading, setIsLoading]=useState(false);
    const [images, setImages]=useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated]=useState(false);
    const router=useRouter();
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
    });

    useEffect(()=>{
        setCustomValue("images",images);
    },[images]);

    useEffect(()=>{
        reset();
        setImages(null);
        setIsProductCreated(false);
    },[isProductCreated]);

    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        console.log("Product Data", data);
        //upload image to firebase
        //save product to mongoDB
        setIsLoading(true);
        let uploadedImages:UploadedImageType[]=[];

        if(!data.category){
            setIsLoading(false);
            return toast.error("Category is not selected!");
        }

        if(!data.images || data.images.length ===0){
            setIsLoading(false);
            return toast.error("No selected image!")
        }

        const handleImageUploads=async()=>{
            toast("Creating product, please wait..");
            try{
                for(const item of data.images){
                    if(item.image){
                        const fileName=new Date().getTime() + "-" + item.image.name;
                        const storage=getStorage(firebaseApp);
                        const storageRef=ref(storage, `products/${fileName}`);
                        const uploadTask=uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject)=>{
                            uploadTask.on(
                                'state_changed',
                                (snapshot)=>{
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                    console.log('Upload is running');
                                    break;
                                    }
                                },
                                (error)=>{
                                    console.log("error uploading image", error);
                                    reject(error);
                                },
                                () => {
                                    // Handle successful uploads on complete
                                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image:downloadURL,
                                        })
                                      console.log('File available at', downloadURL);
                                      resolve();
                                    })
                                    .catch((error)=>{
                                        console.log("error getting the download url",error);
                                        reject(error);
                                    })
                                  }
                            )
                        })
                    }
                }
            }
            catch(error){
                setIsLoading(false);
                console.log("error handling image upload",error);
                toast.error("error handling image upload");
            }
        }
        await handleImageUploads();
        const productData={...data, images:uploadedImages};
        console.log("productData", productData);
        
        try{
            const response=await axios.post('/api/product',productData);
            if(response){
                toast.success("product created");
                setIsProductCreated(true);
                router.refresh();
            }
        }
        catch(error:any){
                console.log("something went wrong", error)
                toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false);
        }
    }

    const category=watch("category");

    const setCustomValue=(id:string, value:any)=>{
        setValue(id, value, {
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true,
        });
    }

    const addImageToState=useCallback((value:ImageType)=>{
        setImages((pre)=>{
            if(!pre){
                return [value];
            }

            return [...pre, value];
        })
    },[]);

    const removeImageFromState=useCallback((value:ImageType)=>{
        setImages((pre)=>{
            if(pre){
            const filteredImages=pre?.filter((item)=> item.color!==value.color);
            return filteredImages;
            }
            return pre;
        })
    },[])
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
        <div className="w-full flex flex-col flex-wrap gap-4">
            <div>
                <div className="font-bold">Select the available product colors and upload their images</div>
                <div className="text-sm">
                You must upload an image for each of the color selected otherwise your color selection will be ignored.</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {colors.map((item, index)=>{
                    return <SelectColor
                    key={index}
                    item={item}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageFromState}
                    isProductCreated={isProductCreated}
                    />
                })}
            </div>
        </div>
        <Button label="Add Product" onClick={handleSubmit(onSubmit)} />
        </>
    )
}

export default AddProductForm;