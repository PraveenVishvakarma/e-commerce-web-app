import getProducts from "@/actions/getProducts";
import Container from "../components/Container";
import Summary from "../components/Summary";
import getOrders from "@/actions/getOrders";
//import { getCurrentUser } from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import BarGraphData from "../components/BarGraph";
import getGraphData from "@/actions/getGraphData";
import NullData from "../components/NullData";

const AdminPage=async()=>{

    const products=await getProducts({category:null});
    const orders=await getOrders();
    const users=await getUsers();
    const graphData=await getGraphData();
    //const currentUser=await getCurrentUser();

    // if(!currentUser){
    //     return <NullData title="Oops! Access Denied, Please login." />
    // }
        if(!users){
        return <NullData title="Oops! No user"  />
    // if(currentUser.role !=="ADMIN"){
    //     return <NullData title="Oops! Access Denied, Please login as an Admin" />
    // }
   }

  

    return(
        <div className="pt-8">
            <Container>
                <Summary products={products} orders={orders} users={users}/>
                <div className="mt-4 mx-auto max-w-[1150px]">
                <BarGraphData data={graphData} />
                </div>   
            </Container>
        </div>
    )
}

export default AdminPage;