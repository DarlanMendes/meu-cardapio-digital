import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, query, where, getDocs,doc, updateDoc, addDoc} from 'firebase/firestore/lite';
import { app } from '../../../../firebase';
//import { doc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

type Product = {
  name: string;
  category: string;
  img: string;
  price: string;
  slug: string;
  description: string
};

type Data = {
  products?: Array<Product>;
  msg: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    
    const productCollectionRef = collection(db, 'product');
    let { name, category, description, price, img, slug } = req.body.product;
    try{
      const productRef = await addDoc(productCollectionRef, { name, category, description, price, img, slug });
  
      return res.json({msg:`produto criado com sucesso ${productRef.id}`});
    }catch(e){
      throw new Error(`Erro ao criar produto`);
    }
  
  }
  async function getTenants(slug: string) {
    const q = query(collection(db, 'product'), where('slug', '==', slug));

    const querySnapshot = await getDocs(q);
    let products: any = []
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data() as Product, id: doc.id });
    });

    res.status(200).json(products!);
  }

  if (req.method === 'GET') {
    console.log(req.query);
    let tenantName = String(req.query?.slug || '');
    await getTenants(tenantName);
  }

  
}
