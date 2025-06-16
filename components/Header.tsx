import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex ml-10 mt-7 font-bright-grotesk-semibold text-xl tracking-[0.20em] opacity-70 items-start">
      <h1 className="mr-2">POESY LIANG</h1>
      <Image 
      src="/assets/images/poesy-logo-white.png"
      alt="Poesy Logo"
      width={20}
      height={20} />
    </div>
  );
}
  