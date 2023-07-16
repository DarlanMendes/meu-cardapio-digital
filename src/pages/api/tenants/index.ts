// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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
  TenantList: Array<Tenant>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  async function getTenants(db:any) {
    const tenantsCol = collection(db, 'tenant');
    const tenantSnapshot = await getDocs(tenantsCol);
    const tenantList = tenantSnapshot.docs.map(doc => doc.data());
    res.status(200).json(tenantList as any)
  }
  if(req.method === 'GET'){
    await  getTenants(db)
  }
  
}
