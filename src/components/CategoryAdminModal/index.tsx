import { Category } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/router"

interface Props {
    category: Category
    setCategory:(arg0:Category)=>void
    isCategoryModalOpen: boolean
    setIsCategoryModalOpen: (arg0: boolean) => void
    tenant:string
}

export default function CategoryAdminModal(props: Props) {
    const router = useRouter()
    async function handleCreateCategory(){
        console.log(props.category)
        if(props.category.name){
            const productEdited = await axios.post(`/api/categories/${props.tenant}/`,{category: props.category})
            alert('Categoria criada com sucesso')
            router.reload()
        }else{
            alert('Preencha o nome da categoria')
        }
        
    }
    async function handleUpdateCategory(){
        if(props.category.name){
            const productEdited = await axios.post(`/api/categories/${props.tenant}/${props.category.id}`,{category: props.category})
            alert('Categoria criada com sucesso')
            router.reload()
        }else{
            alert('Preencha o nome da categoria')
        }
    }
    return (
        <div className={`bg-[rgb(0,0,0,0.8)] fixed top-0 justify-center px-8 items-center w-screen h-screen z-[101] flex  ${props.isCategoryModalOpen ? 'flex' : 'hidden'}`}>
            <div className="bg-white  w-full  p-4 flex flex-col items-center justify-center">
                <h1 className="font-bold my-4">Edicão Categorias</h1>
                <label className="w-full font-semibold">
                    Nome:
                    <input placeholder="Digite o nome da categoria" className="flex-1 border-2 w-full mt-2 px-2 rounded-md mb-6 font-normal " value={props.category.name}
                    onChange={(e)=>props.setCategory({...props.category, name:e.target.value})}
                    />
                </label>

                <div className="flex justify-center gap-4 mb-4 ">
                    <button
                        onClick={() => props.setIsCategoryModalOpen(false)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    > Cancelar</button>
                    <button className="bg-green-500 text-white py-1 px-5 rounded-lg "
                        onClick={async() => {
                            {props.category?
                            await handleUpdateCategory() :
                            await handleCreateCategory()
                            }
                           
                        }
                        }
                    > Salvar </button>
                </div>
            </div>
        </div>
    )
}