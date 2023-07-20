import CategoryCardAdmin from "@/components/CategoryCardAdmin";
import HeaderTenant from "@/components/HeaderTenant";
import ProductAdminModel from "@/components/ProductAdminModel";
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { Product, Category, Tenant } from "@/types/types";
import CategoryAdminModal from "@/components/CategoryAdminModal";
import ProductCardAdmin from "@/components/ProductCardAdmin/ProductCardAdmin";
import { getSession } from "next-auth/react";

interface Props {
    tenant: Tenant
    products: [Product]
    categories: [Category]
}
export default function AdminDashBoard(props: Props) {
    const router = useRouter()
    const { tenant, products, categories } = props
    const [productEditing, setProductEditing] = useState<Product>({ id: '', name: ' ', category: categories[0]?.name, img: '', price: '', slug: tenant.slug, description: '' })
    const [categoryEditing, setCategoryEditing] = useState({ name: '', slug: tenant.slug, id: '' })
    const [showProductModel, setShowProductModel] = useState(false)
   
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    async function handleDeleteProduct(id: string) {
        let confirmed = confirm("Deseja realmente excluir esse produto?")
        if (confirmed) {
            let result = await axios.delete(`/api/products/${tenant.slug}/${id}`)
            if (result) {
                alert("Produto deletado com sucesso")
                router.reload()
            }
        }
    }

    return (
        <>
            <ProductAdminModel product={productEditing!} setProduct={setProductEditing} showProductModel={showProductModel} setShowProductModel={setShowProductModel} categories={categories} />
            <CategoryAdminModal category={categoryEditing} isCategoryModalOpen={isCategoryModalOpen} setIsCategoryModalOpen={setIsCategoryModalOpen} setCategory={setCategoryEditing} tenant={tenant.slug} />
            <HeaderTenant tenant={tenant} />
            <div className={`px-4`}>
                <div className="flex gap-4 items-center justify-center">
                    <h1 className="font-bold">Categorias:</h1>
                    <hr className="w-full" />
                    <button className={`px-3 py-1 rounded-lg w-96`}
                        style={{ backgroundColor: tenant.mainColor, color: "white" }}
                        onClick={() => { setIsCategoryModalOpen(true)}}
                    > Criar categoria</button>

                </div>

                {categories?.map((category, index) => (
                    <div key={index}>
                        <CategoryCardAdmin category={category} setIsCategoryModalOpen={setIsCategoryModalOpen} setCategory={setCategoryEditing} />
                    </div>
                ))}

            </div>

            <div className="px-4">
                <div className="flex items-center gap-4 justify-between">

                    <h1 className="font-bold">Produtos:</h1>
                    <hr className="w-full" />
                    <button className={`px-3 py-1 rounded-lg w-96`}
                        style={{ backgroundColor: tenant.mainColor, color: "white" }}
                        onClick={() => {  setShowProductModel(true); }}
                    > Criar produto</button>
                </div>

                {products?.map((product, index) => (
                    <div key={index} className="mb-2">
                        <ProductCardAdmin product={product} setProductEditing={setProductEditing} setShowProductModel={setShowProductModel} slug={tenant.slug}/>
                        {/* <img src={product.img} alt={product.name} className="w-5/12" />
                        <div className="p-2">
                            <h1 className="font-semibold">{product.name}</h1>
                            <div className="flex gap-2 justify-center items-center mt-2">
                                <button className="py-1 px-3 bg-yellow-600 rounded-lg font-semibold text-white"
                                    onClick={() => { setProductEditing(product); setShowProductModel(true); console.log(product) }}
                                >Editar</button>
                                <button className="py-1 px-3 bg-red-600 text-white rounded-lg"
                                    onClick={async () => { await handleDeleteProduct(product.id) }}
                                >Apagar</button>
                            </div>
                        </div> */}
                    </div>
                ))}

            </div>

        </>
    )


}
export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant } = context.query
    const { host } = context.req.headers
    const tenantFound = await axios(`http://${host}/api/tenants/${tenant}`)
    const productsFound = await axios(`http://${host}/api/products/${tenant}`)
    const categoriesFound = await axios(`http://${host}/api/categories/${tenant}`)
    const session = await getSession(context);
   // console.log(session.user.email === tenantFound.data.email)
    return {
        props: {
            tenant: tenantFound.data,
            products: productsFound.data,
            categories: categoriesFound.data
        }
    }
}