import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, query, where, getDocs, setDoc, addDoc} from 'firebase/firestore/lite';
import { app } from '../../../../firebase';
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
  async function getTenants(slug: string) {
    const q = query(collection(db, 'category'), where('slug', '==', slug));

    const querySnapshot = await getDocs(q);
    let categories :any= []
    querySnapshot.forEach((doc) => {
      categories.push({...doc.data() as Category, id: doc.id});
    });

    res.status(200).json( categories!);
  }

  if (req.method === 'GET') {
    console.log(req.query);
    let tenantName = String(req.query?.slug || '');
    await getTenants(tenantName);
  }
  if(req.method === 'POST'){
    let{name, slug}  = req.body.category
      const categoryRef = collection(db, 'category')
      try{
        let  categoryCreated = await addDoc(categoryRef, {name, slug})
        return res.json({msg:`Categoria criada com sucesso ${categoryCreated}`})
      }
      catch(e){
        return res.json({msg:`Erro ao criar categoria ${e}`})
      }
    
  }
}
