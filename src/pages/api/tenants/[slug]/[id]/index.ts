import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { app } from '../../../../../firebase';

const db = getFirestore(app);

type Tenant = {
  id?: string;
  name: string;
  email: string;
  mainColor: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  slug: string;
  banner:string,
  logo:string
};

type Data = {
  tenant?: Array<Tenant>;
  msg?:string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  

  if(req.method === 'POST'){
    const tenant = req.body
    const tenantCollectionRef = collection(db, 'tenant');
    const tenantRef = doc(tenantCollectionRef, `${tenant.id}`);
  
    let { name, mainColor, facebook, instagram,whatsapp,logo, banner, slug } = req.body;
  
   
      await updateDoc(tenantRef, { name, mainColor, facebook, instagram,whatsapp,logo, banner, slug});
      return res.json({ msg: 'Salvo com sucesso' });
  }
  if(req.method === 'DELETE'){
    try{
      let deleted = await deleteDoc(doc(db, "tenant",`${req.query.id}`))
      return res.status(200).json({msg:`Deletado com sucesso ${deleted}`})
    }catch(e){
      return res.json({msg:`erro ao deletar documento ${e}`})
    }
  }
}
