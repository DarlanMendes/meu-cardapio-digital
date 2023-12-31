import { app } from "@/firebase"
import { Tenant } from "@/types/types"
import axios from "axios"

import { getAuth, signInWithCustomToken } from 'firebase/auth'

import { getSession, signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect } from "react"
const auth = getAuth(app)

interface Props {
    tenant: Tenant
}
export default function Login(props: Props) {


    return (
        <div className="flex w-screen flex-col  justify-center items-center bg-slate-500 h-screen">
            <div className="w-10/12 p-4 flex flex-col items-center bg-slate-400 justify-center rounded-3xl mt-[-20vh]">
                <h1 className="font-bold text-white my-4 text-xl">
                    Sistema administrativo
                </h1>
                <Link href={`/${props.tenant.slug}`}>
                    <img src={props.tenant.logo} className="rounded-full h-[50vw] w-[50vw] object-cover" />
                </Link>

                <button
                    className="py-3 bg-slate-800 text-white mt-4 mb-1 w-10/12 rounded-lg font-bold"
                    onClick={() => signIn('google')}
                >Login</button>
                <span className="text-sm mb-4"> Fale com um de nossos atendentes</span>
            </div>


        </div>
    )
}
export async function getServerSideProps(context: any) {

    const { tenant } = context.query
    const { host } = context.req.headers
    const tenantFound = await axios(`http://${host}/api/tenants/${tenant}`)
    const session = await getSession(context)

    await syncFirebaseAuth(session)

    if (session) {
        if (session.user?.email === tenantFound.data.email) {
            return {
                redirect: {
                    destination: `/${tenant}/admin`
                }
            }
        }
    }
    return {
        props: {
            tenant: tenantFound.data
        }
    }


}
//Necessário criar um customToken para conseguir permissao de gravação usando adapter
async function syncFirebaseAuth(session: any) {
    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken)
        } catch (error) {
            console.error('Error signing in with custom token:', error)
        }
    } else {
        auth.signOut()
    }
}


