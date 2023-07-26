import { Tenant } from "@/types/types"
import { photoConvertProvider } from "@/utils/photoConvertProvider"
import axios from "axios"
import { useRouter } from "next/router"
import { useRef } from "react"

interface Props {
    tenant: Tenant
    showTenantModel: boolean
    setShowTenantModel: (arg0: boolean) => void
    setTenant: (arg0: Tenant) => void
}

export default function TenantAdminModal(props: Props) {
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    function handleCacheInputFile(){
        if(imgInputRef.current) {
           imgInputRef.current.value = ''
        }
       }
    async function editTenant() {
        const{ name, mainColor, facebook, instagram,whatsapp,logo, banner, slug}=props.tenant
        if( name&& mainColor&& facebook&& instagram&&whatsapp&&logo&& banner&& slug){
            try{
                const tenantEdited = await axios.post(`/api/tenants/${props.tenant.slug}/${props.tenant.id}`,props.tenant)
                alert("Tenant editado com sucesso")
                router.reload()
            }catch(e){
                alert(`Ocorreu um erro: ${e}`)
            }
            
        }else{
            alert("Por favor, preencha todos os campos")
        }
        
    }
    async function createTenant() {
        const{ name, mainColor, facebook, instagram,whatsapp,logo, banner, slug}=props.tenant
        if( name&& mainColor&& facebook&& instagram&&whatsapp&&logo&& banner&& slug){
            try{
                const tenantCreated = await axios.post(`/api/tenants`,props.tenant)
                alert("Tenant criado com sucesso")
                router.reload()
            }catch(e){
                alert(`Ocorreu um erro: ${e}`)
            }
        }else{
            alert("Por favor, preencha todos os campos")
        }
    }
    return (
        <div className=" w-full bg-[rgb(0,0,0,0.7)] z-50 absolute  justify-center items-center  top-0 flex flex-col "
            style={props.showTenantModel ? { display: "flex" } : { display: "none" }}
        >
            <div className="bg-white  flex flex-col justify-between items-center p-8 my-8" style={{maxWidth:"800px"}}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="font-bold">{props.tenant.id.length>1? "Edição Tenant" : "Criar Tenant"}</h1>
                    <img src={props.tenant?.logo} alt={props.tenant?.name} className="w-6/12 h-24 object-cover" />
                    <input type="file" className="w-10/12 text-sm"
                        ref={imgInputRef}
                        onChange={async (e) => { props.setTenant({ ...props.tenant, logo: await photoConvertProvider(e) }) }} />

                    <label className="w-full">
                        Nome:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.name}
                            onChange={(e) => { props.setTenant({ ...props.tenant, name: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Slug:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.slug}
                            onChange={(e) => { props.setTenant({ ...props.tenant, slug: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Cor Principal:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.mainColor}
                            onChange={(e) => { props.setTenant({ ...props.tenant, mainColor: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Instagram:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.instagram}
                            onChange={(e) => { props.setTenant({ ...props.tenant, instagram: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Facebook:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.facebook}
                            onChange={(e) => { props.setTenant({ ...props.tenant, facebook: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Whatsapp:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.whatsapp}
                            onChange={(e) => { props.setTenant({ ...props.tenant, whatsapp: e.target.value }) }}
                        />
                    </label>
                    <label className="w-full">
                        Email:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"
                            value={props.tenant?.email}
                            onChange={(e) => { props.setTenant({ ...props.tenant, email: e.target.value }) }}
                        />
                    </label>
                    <div className="w-full">
                        <img src={props.tenant?.banner} alt={'banner'} className=" object-cover h-24 w-full border" />
                        <input type="file" className=" text-sm "
                            ref={imgInputRef}
                            onChange={async (e) => { props.setTenant({ ...props.tenant, banner: await photoConvertProvider(e) }) }} />
                    </div>

                </div>

                <div className=" flex justify-around w-full">
                    <button onClick={() => {
                        props.setShowTenantModel(false);
                        props.setTenant({id:"",name:"",mainColor:"",instagram:"",facebook:"",whatsapp:"",email:"",slug:"",banner:"",logo:""});
                        handleCacheInputFile()
                    }}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg mt-4"
                    >Cancelar</button>
                    <button
                        className="bg-green-500 text-white py-1 px-5 rounded-lg mt-4 "
                        onClick={() => {console.log(props.tenant.id.length>1?'editar':'cria')
                            {
                               props.tenant.id.length> 1? editTenant():createTenant()        
                            }
                        }
                        }
                    > Salvar </button>
                </div>

            </div>


        </div>
    )
}