'use client'
import Status from "@/app/components/Status";
import Heading from "@/app/components/products/Heading";
import { fromatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled } from "react-icons/md";

interface OrderDetailProps{
    order:Order
}
const OrderDetail:React.FC<OrderDetailProps>=({order})=>{
    const router=useRouter();
    return(
        <div className="max-w-[1150px] m-auto flex  flex-col gap-2">
            <div>
                <Heading title="Order Details" />
            </div>
            <div>
                Order ID: {order?.id}
            </div>
            <div>
                Total Amount:{" "}
                <span className="font-bold">{fromatPrice(order.amount)}</span>
            </div>
            <div>
                <div>Payment Status:</div>
                <div>
                    {order?.status==='pending' ? <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" /> : 
                    order.status==='complete' ? <Status text="Completed" icon={MdAccessTimeFilled} bg="bg-green-200" color="text-green-700" />:<></>  }
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;