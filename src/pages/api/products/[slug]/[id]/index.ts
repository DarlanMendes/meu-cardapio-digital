import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection,doc, updateDoc,deleteDoc} from 'firebase/firestore/lite';
import { app } from '../../../../../firebase';


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
    const productRef = doc(productCollectionRef, `${req.query.id}`);
  
    let { name, category, description, price, img, slug } = req.body.product;
  
   
      await updateDoc(productRef, { name, category, description, price, img});
      return res.json({ msg: 'Salvo com sucesso' });
  
  }
  if(req.method === "DELETE"){
    try{
      let deleted = await deleteDoc(doc(db, "product",`${req.query.id}`))
      return res.status(200).json({msg:`Deletado com sucesso ${deleted}`})
    }catch(e){
      return res.json({msg:`erro ao deletar documento ${e}`})
    }
     
      
  }

 
  
}
