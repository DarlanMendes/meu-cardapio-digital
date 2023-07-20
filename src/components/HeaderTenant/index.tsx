import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { BsInstagram, BsFacebook, BsWhatsapp } from 'react-icons/bs'
import{RiLogoutBoxRLine} from 'react-icons/ri'


interface Tenant{
    name:string,
    mainColor:string,
    instagram:string,
    facebook: string,
    whatsapp:string,
    email:string,
    slug:string,
    banner:string,
    logo:string
}
interface Props{
    tenant?:Tenant|null;
}
export default function HeaderTenant(props:Props) {
    async function handleLogOut(){
        try{
            await signOut()
            alert('Usuario deslogado com sucesso')
        }catch(e){
            console.error("Erro ao fazer logout:", e)
        }
    }
    return (
        <div className="">
            <img src={props.tenant!.banner} alt=""
                className="h-[42vw] w-screen object-cover" />
            <div className="flex h-[35vw]">
                <img src={props.tenant!.logo} alt=""
                    className="w-[40vw] h-[40vw] ml-4 rounded-full relative top-[-10vw] object-cover border-2" />
                <div className='flex-col py-2 px-4'>
                    <h1 className={`py-2 text-xl font-semibold `}
                    style={{color:props.tenant?.mainColor}}
                    > {props.tenant?.name}</h1>
                    <div className='flex  gap-4 '>
                        <IconContext.Provider value={{ className: 'text-gray-800 text-xl' }}>
                           <Link href={props.tenant!.instagram}>
                           <BsInstagram />
                           </Link>
                           <Link href={props.tenant!.facebook}>
                            <BsFacebook />
                            </Link>
                            <Link href={props.tenant!.whatsapp}>
                            <BsWhatsapp />
                            </Link> 
                            <RiLogoutBoxRLine onClick={async()=>await handleLogOut()}/>
                        </IconContext.Provider>
                    </div>

                </div>

            </div>
        </div>
    )
}