import TenantAdminModal from "@/components/TenantAdminModal";
import { Tenant } from "@/types/types";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {RiLogoutBoxRLine} from "react-icons/ri"
type User = {
    name: string
    email: string
    image: string
}
interface Props {
    tenants: Array<Tenant>
    user: User
}
export default function Admin(props: Props) {
    const [showTenantModel, setShowTenantModel] = useState(false)
    const [tenantForEdit, setTenantForEdit] = useState({ id: "", name: "", mainColor: "", instagram: "", facebook: "", whatsapp: "", email: "", slug: "", banner: "", logo: "" })
    const router = useRouter()
    async function handleLogOut() {
        try {
            await signOut()
            alert('Usuario deslogado com sucesso')
        } catch (e) {
            console.error("Erro ao fazer logout:", e)
        }
    }
    async function deleteTenant(id:string) {
       
            let confirmed = confirm("Deseja realmente excluir esse produto?")
            if (confirmed) {
                let result = await axios.delete(`/api/tenants/${tenantForEdit.slug}/${id}`)
                if (result) {
                    alert("Produto deletado com sucesso")
                    router.reload()
                }
            }
        
    }
    return (
        <div>
            <TenantAdminModal tenant={tenantForEdit} setTenant={setTenantForEdit} showTenantModel={showTenantModel} setShowTenantModel={setShowTenantModel} />
            <div className="flex flex-row items-center p-4 border m-4" style={{ maxWidth: '500px' }}>
                <img src={props.user.image} alt={props.user.name}  className=" h-24 rounded-full" />
                <div className="p-4 flex flex-col gap-2">
                    <h1 className="font-bold">Admin: {props.user.name}</h1>
                    <span className="text-sm">Email:{props.user.email}</span >
                    <div className="flex  gap-2 items-center bg-slate-400 w-16 px-2 rounded-md text-white">
                        <span>Sair</span> <RiLogoutBoxRLine onClick={async () => await handleLogOut()} />
                    </div>
                    
                </div>
            </div>
            <div className="flex px-5 items-center">
                <hr className="w-full" />
                <button className="ml-2 w-48 px-3 py-1 bg-green-500 text-white rounded-md"
                onClick={()=>setShowTenantModel(true)}
                >
                    Criar Tenant
                </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
                {
                    props.tenants.map((tenant, index) =>
                    (
                        <div className="border p-4 m-4 flex" key={index}>
                            <img src={tenant.logo} alt={tenant.name} className="h-20" />
                            <div>
                                <h1 className="text-xl mt-2 ml-4 font-medium">{tenant.name}</h1>
                                <div className="flex gap-4 mt-2 ml-4">
                                    <button className="py-1 px-3 bg-yellow-600 rounded-lg font-semibold text-white" onClick={() => { setTenantForEdit(tenant); setShowTenantModel(true) }}> Editar </button>
                                    <button className="py-1 px-3 bg-red-600 text-white rounded-lg" onClick={() => { 
                                        setTenantForEdit(tenant);
                                        deleteTenant(tenant.id)
                                    }}> Apagar</button>
                                </div>
                            </div>

                        </div>
                    )
                    )
                }
            </div>

        </div>
    )
}

export async function getServerSideProps(context: any) {


    const { host } = context.req.headers;
    const tenantsFound = await axios(`http://${host}/api/tenants/`)
    const session = await getSession(context);

    if (session?.user?.email !== 'dedsondarlan@gmail.com') {
        return {
            redirect: {
                destination: `/login`
            }
        };
    }
    return {
        props: {
            tenants: tenantsFound.data,
            user: session?.user
        }
    };
}