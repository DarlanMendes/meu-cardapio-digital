// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import{app} from '../../../firebase'
const db = getFirestore(app);
type Tenant={
  id?: string;
  name:string;
  email:string;
  mainColor:string,
  instagram:string,
  facebook:string,
  whatsapp:string
}
type Data = {
  tenants?: Tenant[]
  msg?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      const tenantsCol = collection(db, 'tenant');
      const tenantSnapshot = await getDocs(tenantsCol);
      const tenants: any[] = [];
  
      tenantSnapshot.forEach((doc) => {
        tenants.push({ id: doc.id, data: doc.data() });
      });
  
      return res.json(tenants as any); // Adiciona o 'return' aqui
    } catch (error) {
      console.error('Erro ao obter os dados dos tenants:', error);
      return res.status(500).json({ msg: 'Erro ao obter os tenants' });
    }
  }
  
  if(req.method === 'POST'){
    const TenantCollectionRef = collection(db, 'tenant');
    let { name, mainColor, facebook, instagram,whatsapp,logo, banner, slug, email} = req.body;
    if(name&& mainColor&& facebook&& instagram&&whatsapp&&logo&& banner&& slug&&email){
      try{
        const tenantRef = await addDoc(TenantCollectionRef, {  name, mainColor, facebook, instagram,whatsapp,logo, banner, slug,email });
    
        return res.json({msg:`produto criado com sucesso ${tenantRef.id}`});
      }catch(e){
        console.log(`Erro ao criar produto ${e}`);
        return res.json({msg:`ocorreu um erro${e}`})
      }
    }
    
  }else{
    return res.json({msg:"Campos incompletos"})
  }
  
}
