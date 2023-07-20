import { Product } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/router"

interface Props{
    product:Product
    setProductEditing: (arg0:Product)=>void
    setShowProductModel:(arg0:boolean)=>void
    slug:string
}
export default function ProductCardAdmin(props:Props){
    const router = useRouter()
    async function handleDeleteProduct(id: string) {
        let confirmed = confirm("Deseja realmente excluir esse produto?")
        if (confirmed) {
            let result = await axios.delete(`/api/products/${props.slug}/${id}`)
            if (result) {
                alert("Produto deletado com sucesso")
                router.reload()
            }
        }
    }
    return (
        
        <div className="flex p-2 gap-2 border-2 mt-2">
             <img src={props.product.img} alt={props.product.name} className="w-5/12" />
                        <div className="p-2">
                            <h1 className="font-semibold">{props.product.name}</h1>
                            <div className="flex gap-2 justify-center items-center mt-2">
                                <button className="py-1 px-3 bg-yellow-600 rounded-lg font-semibold text-white"
                                    onClick={() => { props.setProductEditing(props.product); props.setShowProductModel(true); console.log(props.product) }}
                                >Editar</button>
                                <button className="py-1 px-3 bg-red-600 text-white rounded-lg"
                                    onClick={async () => { await handleDeleteProduct(props.product.id) }}
                                >Apagar</button>
                            </div>
                        </div>
        </div>
        )
}