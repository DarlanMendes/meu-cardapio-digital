import Image from 'next/image'
import { Inter, Playfair_Display } from 'next/font/google'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Tenant } from '@/types/types';
import Link from 'next/link';

const playFairDisplay = Playfair_Display({ subsets: ['latin'] })


interface Props {
  tenants: Array<Tenant>
}
export default function Home(props: Props) {
  return (
    <main
      className={` ${playFairDisplay.className} `}
    >
      <div className=' grid gap-6 px-6 py-4 justify-center items-start grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
        {props.tenants.map((tenant) => (
          <Link href={`/${tenant.slug}`}>
          
          <div className='p-4 border-2 h-40 flex items-center w-full gap-2 bg-slate-100 rounded-md'>
            <img src={tenant.logo} className='h-24 w-24 object-cover rounded-full border' />
            <div className='flex p-2 flex-col items-start justify-start h-full mt-8'>
                <h1 className='text-2xl font-bold'> {tenant.name} </h1>

            </div>
          </div>
          </Link>
        ))}
      </div>


    </main>
  )
}
export async function getServerSideProps(context: any) {


  const { host } = context.req.headers;
  const tenantsFound = await axios(`http://${host}/api/tenants/`);

  const session = await getSession(context);


  return {
    props: {
      tenants: tenantsFound.data,
    }
  };
}