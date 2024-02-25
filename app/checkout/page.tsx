import Container from "@/app/components/Container"
import FormWrap from "@/app/components/FormWrap"
import ChechoutClient from "./CheckoutClient"

const Checkout=()=>{
    return(
        <div className="p-8">
            <Container>
                <FormWrap>
                    <ChechoutClient/>
                </FormWrap>
            </Container>
        </div>
    )
}
export default Checkout;