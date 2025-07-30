"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ Correct for App Router
import useShowComponent from '@/hooks/useShowComponent';
import cn from '@/utils/cn';
import { textStyle } from '@/constants/text';

const headerTextStyle = cn(textStyle({ size: "md", weight: "semibold" }), "tracking-[0.20em]")
const headerStyle = cn("flex flex-col items-start", headerTextStyle)

export default function Header({ onClick, className="" }: { onClick?: () => void, className?: string }) {
  const router = useRouter(); // ✅ use the hook
  const showHeader = useShowComponent();

  const defaultHandler = () => {
    router.push("/"); // ✅ will now work
  };

  const handleClick = onClick ?? defaultHandler;

  if (!showHeader) return null;

  return (
    <div className={cn(headerStyle, className)}>
      <button 
        title="Header Logo"
        type="button"
        onClick={handleClick}
        className="flex flex-row items-start hover:cursor-pointer"
      >
        <h1 className="mr-2">POESY LIANG</h1>
        <Image 
          src="/assets/images/poesy-logo-white.png"
          alt="Poesy Logo"
          width={20}
          height={20} 
        />
      </button>
    </div>
  );
}
