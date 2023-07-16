import axios from "axios";
import { useRouter } from "next/router";
import {photoConvertProvider} from "@/utils/photoConvertProvider"
import { Category, Product} from "@/types/types";


interface Props {
    product: Product
    setProduct:(value:Product)=>void
    showProductModel: boolean
    setShowProductModel: (arg0: boolean) => void
    categories: [Category]
    isNewProduct: boolean
    setIsNewProduct:(arg0:boolean)=>void
}
export default function ProductAdminModel(props: Props) {
    const{product, setProduct, setShowProductModel, isNewProduct, setIsNewProduct} = props
    let router = useRouter()
    let {tenant} = router.query
    
    
    
    async function handleSaveEdit(){        
        const productEdited = await axios.post(`/api/products/${tenant}/${product.id}`,{product})
        alert("Produto editado com sucesso")
        setShowProductModel(false)
        router.reload()
    }
    
    async function handleCreateProduct(){
        
        let{name, category, description, price, img, slug} = product
        console.log(product)
        if(name&& category&& description&& price&& img&& slug){
            const productEdited = await axios.post(`/api/products/${tenant}/`,{product})
        alert("Produto criado com sucesso")
        setShowProductModel(false)
        router.reload()
        }else{
            alert("Por favor, preencha todos os campos")
        }
        
    }

    return (
        <div className="h-screen w-screen bg-[rgb(0,0,0,0.7)] z-50 fixed px-4 justify-center pt-10 pb-20 top-0"
            style={props.showProductModel ? { display: "flex" } : { display: "none" }}
        >
            <div className="bg-white  w-[100vw] flex flex-col justify-between items-start p-8">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="font-bold">Edição Produto</h1>
                    <img src={props.product?.img} alt={props.product?.name} className="w-6/12 h-24 object-cover"/>
                    <input type="file" className="w-10/12 text-sm" onChange={async(e)=>{setProduct({...product, img: await photoConvertProvider(e)})}} />
                    <label className="w-full">
                        Nome:
                        <input placeholder="Digite o nome do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md" value={product?.name} 
                        onChange={(e)=>{setProduct({...product,name:e.target.value})}}
                        />
                    </label>
                    <label className="w-full">
                        Preço:
                        <input placeholder="Digite o preço do produto" className="flex-1 border-2 w-full mt-1 px-2 rounded-md"  
                        value={product?.price }
                         onChange={(e)=>{setProduct({...product,price:e.target.value})}}
                        />
                    </label>
                    <label className="w-full">
                        Categoria:
                        <select className="w-full mt-1 border-2 px-2 rounded-md"   onChange={(e)=>setProduct({...product, category:e.target.value})}>
                            {props.categories.map((category, index) => (
                                <option key={index}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="w-full ">
                        Descrição
                        <textarea placeholder="Digite a descrição do produto" className="border-2 w-full p-2 mt-1 rounded-lg"
                        value={product?.description }
                         onChange={(e)=>{setProduct({...product,description:e.target.value})}}
                        />
                        
                    </label>
                </div>

                <div className=" flex justify-around w-full">
                    <button onClick={() => {props.setShowProductModel(false);setProduct({id:'', name: '', category: '', img: '', price: '', slug: '', description: ''})}}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    >Cancelar</button>
                    <button
                        className="bg-green-500 text-white py-1 px-5 rounded-lg "
                        onClick={()=>{
                            {isNewProduct?
                                handleCreateProduct():
                                handleSaveEdit()
                            }
                            }
                        }
                    > Salvar </button>
                </div>

            </div>


        </div>
    )
}