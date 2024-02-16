import Image from "next/image";
import {FaUserCircle} from "react-icons/fa"
interface AvatarProps{
    src?:string | null | undefined;
}
const Avatar:React.FC<AvatarProps>=({
    src
})=>{
    if(src){
        return <Image src={src} alt="Avatar" height={24} width={24} />
    }
    return(
        <FaUserCircle size={24} />
    )
}

export default Avatar;