import {NextResponse} from "next/server"
import type { NextApiRequest } from "next"

export function authMiddleware(req:NextApiRequest){
    console.log(req)
    return NextResponse.next()
}