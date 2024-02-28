import AdminNav from "../components/adminNav/AdminNav";

export const metadata={
    title:"E-Bazar Admin",
    description:"E-shop Admin Dashboard"
}
const AdminLayout=({children}:{children:React.ReactNode})=>{
    return(
        <div>
            <AdminNav />
            {children}
        </div>
    )
}

export default AdminLayout;