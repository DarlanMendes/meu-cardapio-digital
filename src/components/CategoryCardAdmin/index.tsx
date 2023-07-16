import { Category } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/router"
interface Props {
    category: Category
    setCategory:(arg0:Category)=>void
    setIsCategoryModalOpen: (arg0:boolean)=>void
}

export default function CategoryCardAdmin(props: Props) {
    const router = useRouter()
    async function handleDeleteCategory(id:string){
        let confirmed = confirm("Deseja realmente excluir essa categoria?")
        if (confirmed) {
            let result = await axios.delete(`/api/categories/${props.category.slug}/${id}`)
            if (result) {
                alert("Produto deletado com sucesso")
                router.reload()
            }
        }
    }
    return (
        <div className={`p-6 shadow-sm my-2 border flex justify-between `}>
            <h1 className="text-xl font-semibold">
                {props.category.name}
            </h1>
           

            <div className="flex gap-4">
                <button className="py-1 px-3 bg-yellow-600 rounded-lg font-semibold text-white" onClick={()=>{props.setIsCategoryModalOpen(true); props.setCategory(props.category)}}> Editar </button>
                <button className="py-1 px-3 bg-red-600 text-white rounded-lg" onClick={async()=>{ await handleDeleteCategory(props.category.id)}}> Apagar</button>
            </div>

        </div>
    )
}