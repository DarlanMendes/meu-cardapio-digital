interface Product {
    name: string;
    category: string;
    img: string;
    price: string;
    slug: string;
    description: string;
}
interface Tenant{
    name:string,
    mainColor:string,
    instagram:string,
    facebook: string,
    whatsapp:string,
    email:string,
    slug:string,
}
interface Props {
    categorySelected: string
    product: Product
    tenant:Tenant
}

export default function CardProduct(props: Props) {
    return (

        <div
            className="flex rounded-sm"
        >
            {props.categorySelected === props.product.category ?
                <>
                    <img src={props.product.img} alt="" className="w-4/12 object-cover rounded-l-lg" />
                    <div className="p-4 w-8/12">
                        <h2 className="font-bold"
                        style={{color:props.tenant.mainColor}}
                        >{props.product.name}
                        </h2>
                        <p>{props.product.description}</p>
                        <h3 className="font-semibold">R$ {props.product.price}</h3>
                    </div>
                </>

                :
                <div className="h-40 p-4">
                    Sem produto disponível no momento
                </div>
            }
        </div>
    )
}