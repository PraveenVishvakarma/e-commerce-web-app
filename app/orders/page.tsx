
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import getOrderByUserId from "@/actions/getOrderByUserId";
import OrdersClient from "./OrdersClient";



const Orders= async()=>{
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return <NullData title="Oops! Access Denied" />
    }

    const orders=await getOrderByUserId(currentUser.id);
    if(!orders){
        return <NullData title="No order yet..." />
    }
    return(
        <div className="pt-8">
            <Container>
            <OrdersClient orders={orders}/>
            </Container>
        </div>
    )
};
 export default Orders;