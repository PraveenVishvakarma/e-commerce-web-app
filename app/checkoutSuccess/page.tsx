
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutTrue from "./CheckoutTrue";
import { getCurrentUser } from "@/actions/getCurrentUser";


const CheckoutSuccess=  async ()=>{
    const currentUser=await getCurrentUser();
    
    return(
        <Container><FormWrap>
    <CheckoutTrue currentUser={currentUser} />
   </FormWrap> </Container>
   )
}

export default CheckoutSuccess;