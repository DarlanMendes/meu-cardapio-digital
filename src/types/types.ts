export type Category = {
    name: string,
    slug: string,
    id:string
}
export type Product = {
    id:string;
    name: string;
    category: string;
    img: string;
    price: string;
    slug: string;
    description: string
};

export type Tenant = {
    id:string,
    name: string,
    mainColor: string,
    instagram: string,
    facebook: string,
    whatsapp: string,
    email: string,
    slug: string,
    banner: string,
    logo: string
}
