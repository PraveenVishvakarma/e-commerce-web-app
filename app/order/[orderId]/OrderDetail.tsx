'use client'
import Status from "@/app/components/Status";
import Heading from "@/app/components/products/Heading";
import { fromatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

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
                <span className="font-bold">{fromatPrice(order.amount/100)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div>Payment Status:</div>
                <div>
                    {order?.status==='pending' ? <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" /> : 
                    order.status==='complete' ? <Status text="Completed" icon={MdAccessTimeFilled} bg="bg-green-200" color="text-green-700" />:<></>  }
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div>Delivery Status:</div>
                <div>
                    {order?.deliveryStatus==='pending' ? <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" /> : 
                    order.deliveryStatus==='dispatched' ? <Status text="Dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />:order.deliveryStatus==='complete' ? <Status text="Completed" icon={MdDone} bg="bg-green-200" color="text-green-700" />: <></>  }
                </div>
            </div>
            <div>Date: {moment(order.createDate).fromNow()}</div>
            <div>
                <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">PRODUCT</div>
                    <div className="justify-self-center">PRICE</div>
                    <div className="justify-self-center">QTY</div>
                    <div className="justify-self-end">TOTAL</div>
                </div>
                {order.products && order.products.map((item)=>{
                    return( <OrderItem key={item.id} item={item}></OrderItem>)
                })}
            </div>
        </div>
    )
}

export default OrderDetail;