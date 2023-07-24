import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { app } from '../../../../firebase';

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
  tenant: Array<Tenant>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  async function getTenants(slug: string) {



    const q = query(collection(db, 'tenant'), where('slug', '==', slug));

    const querySnapshot = await getDocs(q);
    let tenants;
    querySnapshot.forEach((doc) => {
      tenants = (doc.data() as Tenant);
    });
    
    res.status(200).json( tenants!);
  }

  if (req.method === 'GET') {
    
    let tenantName = String(req.query?.slug || '');
    await getTenants(tenantName);
  }
}
