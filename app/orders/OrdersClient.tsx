'use client'

import { Order, User } from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";
import { fromatPrice } from "@/utils/FormatPrice";

interface OrdersClientProps{
    orders:ExtendedOrder[],
}

type ExtendedOrder=Order & {
    user:User
}
const OrdersClient:React.FC<OrdersClientProps>=({orders})=>{
    const router=useRouter();
    let rows:any=[];
    if(orders){
        rows=orders.map((order)=>{
            return {
                id:order.id,
                customer:order.user.name,
                amount:fromatPrice(order.amount/100),
                paymentStatus:order.status,
                date:moment(order.createDate).fromNow(),
                deliveryStatus:order.deliveryStatus,
            }
        })}
        const columns:GridColDef[]=[
            {field:"id", headerName:"ID", width:220},
            {field:"customer", headerName:"Customer Name", width:130 },
            {field:"amount", headerName:"Amount(INR)", width:130,
            renderCell:(params)=>{
                return(
                    <div className="font-bold text-slate-800">{params.row.amount}</div>
                )
            }
            },
            {field:"paymentStatus", headerName:"Payment Status", width:130,
            renderCell:(params)=>{
                return(
                    <div>{
                        params.row.paymentStatus==="pending" ? <Status
                        text="pending"
                        color="text-slate-800"
                        icon={MdAccessTimeFilled}
                        bg="bg-slate-200"
                         /> :params.row.paymentStatus==="complete" ?<Status
                          text="completed"
                          color="text-green-800"
                          icon={MdDone}
                          bg="bg-green-200"
                           />:<></>}
                    </div>
                )
            }
        },
            {field:"deliveryStatus", headerName:"Delivery Status",width:130,
            renderCell:(params)=>{
                return(
                    <div>{
                        params.row.deliveryStatus==="pending" ? <Status
                        text="pending"
                        color="text-slate-800"
                        icon={MdAccessTimeFilled}
                        bg="bg-slate-200"
                         /> : params.row.deliveryStatus==="dispatched" ?<Status
                         text="dispatched"
                         color="text-purple-800"
                         icon={MdDeliveryDining}
                         bg="bg-purple-200"
                          />:params.row.deliveryStatus==="delivered" ?<Status
                          text="delivered"
                          color="text-green-800"
                          icon={MdDone}
                          bg="bg-green-200"
                           />:<></>}
                    </div>
                )
            }
            },
            {field:"date", headerName:"Date",width:130},
            {field:"action", headerName:"Action",width:100,
            renderCell:(params)=>{
                return(
                    <div>
                        <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                            router.push(`admin/order/${params.row.id}`);
                        }} />
                    </div>
                )
            }
            },
        ]
            
    
    return<>
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading title="Manage Orders" center/>
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

export default OrdersClient;