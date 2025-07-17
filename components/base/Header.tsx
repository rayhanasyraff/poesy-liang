"use client"

import { mobileSize } from '@/constants/screenSize';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Header() {

  const pathname = usePathname();
  const isMobile = useMediaQuery({ query: mobileSize });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Show header if:
  // - you're on "/" (home), or
  // - you're on "/projects/[project]" AND on mobile
  const showHeader = isClient && (
    (pathname === "/") ||
    (pathname.startsWith("/projects/") && isMobile)
  );

  if (showHeader) {
    return (
      <div className="flex flex-col ml-10 mt-7 font-bright-grotesk-semibold text-xl tracking-[0.20em] opacity-[0.77] items-start">
        <Link href="/" className='flex flex-row items-start'>
          <h1 className="mr-2">POESY LIANG</h1>
          <Image 
          src="/assets/images/poesy-logo-white.png"
          alt="Poesy Logo"
          width={20}
          height={20} />
        </Link>
      </div>
    );
  }

  return <></>

}
  