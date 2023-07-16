import { Tenant } from "@/types/types"
import axios from "axios"
import { GetServerSideProps } from "next"
import { signIn } from "next-auth/react"

interface Props{
    tenant:Tenant
}
export default function Login(props:Props){
    return(
        <div className="flex w-screen flex-col  justify-center items-center bg-slate-500 h-screen">
            <div className="w-10/12 p-4 flex flex-col items-center bg-slate-400 justify-center rounded-3xl mt-[-20vh]">
            <h1 className="font-bold text-white my-4 text-xl">
                Sistema administrativo
            </h1> 
            <img src={props.tenant.logo} className="rounded-full h-[50vw] w-[50vw] object-cover"/>
            <button
            className="py-3 bg-slate-800 text-white mt-4 mb-1 w-10/12 rounded-lg font-bold"
            onClick={()=>signIn('google')}
            >Login</button>
            <span className="text-sm mb-4"> Fale com um de nossos atendentes</span>
            </div>
          

        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant } = context.query
    const { host } = context.req.headers
    const tenantFound = await axios(`http://${host}/api/tenants/${tenant}`)
  

    return {
        props: {
            tenant: tenantFound.data
        }
    }
}