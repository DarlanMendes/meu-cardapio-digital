import Link from "next/link";

export default function Header(){
    return(
        <div className={`bg-black text-white py-4 flex font-bold items-center justify-center`}>
               <Link href='/'>MEU CARDÁPIO DIGITAL </Link> 
        </div>
    )
}