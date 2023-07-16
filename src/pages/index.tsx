import Image from 'next/image'
import { Inter, Playfair_Display } from 'next/font/google'

const playFairDisplay = Playfair_Display({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={` ${playFairDisplay.className}`}
    >
     Principal
    </main>
  )
}
