'use client';

import Image from 'next/image';
import NavLink from './NavLink';
import { useSession,signIn } from "next-auth/react";
import useTokens from '@/app/store/useTokens';
let heroImages = ['/1.png', '/6.png', '/3.png', '/4.png', '/5.png', '/2.png'];

export default function Hero() {

  const { data: session, status } = useSession()
  const { initialData } = useTokens();
  return (
    <section>
      <div className="custom-screen pt-28 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
            Generate your next AI QR Code in seconds
          </h1>
          <p className="max-w-xl mx-auto">
            QR AI makes it simple for you to generate cool looking AI QR codes
            in seconds. 
          </p>
          
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            { status ==="authenticated" ? (  initialData > 0 ? (
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 "
            >
              Generate your QR Code
            </NavLink>) : (<p></p>)) : (<p><button onClick={() => signIn()}>Sign in</button></p>) 
            }
          </div>
       
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-10">
            {heroImages.map((image, idx) => (
              <Image
                key={idx}
                alt="image"
                src={image}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
