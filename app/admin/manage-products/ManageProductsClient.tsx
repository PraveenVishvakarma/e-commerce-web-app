'use client'

import { Product } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemove } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ManageProductsClientProps{
    products:Product[],
}
const ManageProductsClient:React.FC<ManageProductsClientProps>=({products})=>{
    const router=useRouter();
    let rows:any=[];
    if(products){
        rows=products.map((product)=>{
            return {
                id:product.id,
                name:product.name,
                price:product.price,
                category:product.category,
                brand:product.brand,
                inStock:product.inStock,
                images:product.images,
            }
        })}
        const columns:GridColDef[]=[
            {field:"id", headerName:"ID", width:220},
            {field:"name", headerName:"Name", width:220 },
            {field:"price", headerName:"Price(INR)", width:100,
            renderCell:(params)=>{
                return(
                    <div className="font-bold text-slate-800">{params.row.price}</div>
                )
            }
            },
            {field:"category", headerName:"Category", width:100},
            {field:"brand", headerName:"Brand", width:100},
            {field:"inStock", headerName:"inStock",width:120,
            renderCell:(params)=>{
                return(
                    <div>{
                        params.row.inStock===true ? <Status
                        text="In stock"
                        color="text-teal-800"
                        icon={MdDone}
                        bg="bg-teal-200"
                         /> : <Status
                         text="Out of stock"
                         color="text-rose-800"
                         icon={MdClose}
                         bg="bg-rose-200"
                          />}
                    </div>
                )
            }
            },
            {field:"action", headerName:"Action",width:200,
            renderCell:(params)=>{
                return(
                    <div className="flex justify-center gap-4 w-full">
                        <ActionBtn icon={MdCached} onClick={()=>{handleToggleStock(params.row.id,params.row.inStock)}} />
                        <ActionBtn icon={MdDelete} onClick={()=>{}} />
                        <ActionBtn icon={MdRemove} onClick={()=>{}} />
                    </div>
                )
            }
            },
        ]

        const handleToggleStock=useCallback((id:string, inStock:boolean)=>{
            axios.put("/api/product",{
                id,
                inStock: !inStock,
            })
            .then((res)=>{
                toast.success("Product status changed");
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("O0ps! Something went wrong");
                console.log("error", err);
            })
        },[])
    
    return<>
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Manage Products" center/>
        </div>
        <div style={{height:600, width:"100%"}}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            />   
        </div>
    
    </div>
    </>
}

export default ManageProductsClient;