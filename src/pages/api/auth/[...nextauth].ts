// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"


// export const authOptions:NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
//     })
//   ],
//   secret:process.env.NEXT_PUBLIC_JWT_SECRET as string,
  
  
// }

// export default NextAuth(authOptions)
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
        GoogleProvider({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        })
      ],
      secret:process.env.NEXT_PUBLIC_JWT_SECRET as string,
      
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  //     privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  //   }),
  // }) as Adapter,
  
}
export default NextAuth(authOptions)


