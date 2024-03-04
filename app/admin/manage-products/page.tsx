import getProducts from "@/actions/getProducts";
import ManageProductsClient from "./ManageProductsClient";



const ManageProducts= async()=>{
    const products=await getProducts({category:null}) 
    return(
        <div>
            <ManageProductsClient products={products}/>
        </div>
    )
};
 export default ManageProducts;