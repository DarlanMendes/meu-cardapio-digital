import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, doc, updateDoc, addDoc, deleteDoc} from 'firebase/firestore/lite';
import { app } from '../../../../../firebase';
import { Category } from '@/types/types';

const db = getFirestore(app);



type Data = {
  categories?: Array<Category>;
  msg?:string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 

 
  if(req.method === 'POST'){
    const productCollectionRef = collection(db, 'category');
    const productRef = doc(productCollectionRef, `${req.query.id}`);
  
    let {name} = req.body.category;
      await updateDoc(productRef, { name});
      return res.json({ msg: 'Salvo com sucesso' });
  }
  if(req.method === 'DELETE'){
    try{
        console.log('deletando categoria')
        let deleted = await deleteDoc(doc(db, "category",`${req.query.id}`))
        return res.status(200).json({msg:`Deletado com sucesso ${deleted}`})
    }
    catch (e){
        return res.json({msg:`erro ao deletar documento ${e}`})
    }
  }
}
