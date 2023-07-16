import CardProduct from "@/components/CardProduct"
import CategoryComponent from "@/components/CategoryComponent"
import HeaderTenant from "@/components/HeaderTenant"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useState } from "react"

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
interface Product {
    id:string
    name: string;
    category: string;
    img: string;
    price: string;
    slug: string;
    description:string
  };
  interface Category{
    id:string,
    name:string,
    slug:string
  }
interface Props{
    tenant: Tenant
    products:[Product]
    categories:[Category]
}
export default function TenantPage(props:Props) {

   // const [categories, setCategories] = useState([{ id: 1, category: "Hamburguer" }, { id: 2, category: "Pizza" }, { id: 3, category: "Suco" }])
    const[categories, setCategories] = useState(props.categories)
    // const [products, setProducts] = useState([{ id: 1, name: "Hamburgão Top", category_id: 1, tenant_id: 1, price:"14,98", 
    //                                             img:"https://cdn.casaeculinaria.com/wp-content/uploads/2023/04/05163949/Hamburguer-artesanal-1024x576.webp",
    //                                             description:"Melhor hamburguer da cidade" }])
    //const [tenant, setTenant] = useState({ id: 'xl', name: "Duz Lanches", mainColor: 'red', instagram:"https://www.instagram.com/", facebook:"https://www.facebook.com/", whatsapp:"https://www.whatsapp.com/" })
     const[products, setProducts] = useState(props.products)
    const[tenant, setTenant] = useState(props.tenant)
    const [categorySelected, setCategorySelected] = useState("Hamburguer")
    console.log(props.products)
    return (
        <>
        <HeaderTenant tenant={tenant}/>
        <main>





            <div className={`flex gap-2 px-4 w-screen overflow-scroll`}>
                {categories.map((category, index) => (
                    <div key={index}>
                        <CategoryComponent name={category.name}  mainColor={tenant.mainColor} categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
                    </div>
                ))}
            </div>
            <div className={`flex flex-col px-4 gap-2 w-screen mt-4`}>
                {products.map((product, index) => (
                    <div key={index} className="shadow-xl border-2 rounded-lg">
                        <CardProduct  product={product} tenant={tenant} categorySelected={categorySelected}/>
                    </div>
                ))}
            </div>
        </main>

        </>
       
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { tenant } = context.query
    const { host } = context.req.headers
    const tenantFound = await axios(`http://${host}/api/tenants/${tenant}`)
    const productsFound = await axios(`http://${host}/api/products/${tenant}`)
    const categoriesFound = await axios(`http://${host}/api/categories/${tenant}`)
    
    return{
        props:{
            tenant:tenantFound.data,
            products:productsFound.data,
            categories:categoriesFound.data
        }
    }
}