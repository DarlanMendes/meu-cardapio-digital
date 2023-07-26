import { app } from "@/firebase"
import axios from "axios"
import { getAuth, signInWithCustomToken } from "firebase/auth"
import { getSession, signIn, useSession } from "next-auth/react"
import { useEffect } from "react"


const auth = getAuth(app)

export default function Login(){
   
   
    return(
        <div className="flex w-screen flex-col  justify-center items-center bg-slate-500 h-screen">
        <div className="w-10/12 p-4 flex flex-col items-center bg-slate-400 justify-center rounded-3xl mt-[-20vh]">
            <h1 className="font-bold text-white my-4 text-xl">
                Sistema administrativo
            </h1>
            
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
    const session = await getSession(context)
    await syncFirebaseAuth(session)
    try{
        
        if (session?.user?.email === 'dedsondarlan@gmail.com') {
            return {
                redirect: {
                    destination: `/admin`
                }
            }
        }else{
            return{
                props:{

                }
            }
        }
    }catch(e){
        console.log(e)
    }
        
}

async function syncFirebaseAuth(session: any) {
    if (session && session.firebaseToken) {
        try {
           let usuario =  await signInWithCustomToken(auth, session.firebaseToken)
           console.log(usuario)
        } catch (error) {
            console.error('Error signing in with custom token:', error)
        }
    } else {
        auth.signOut()
    }
}