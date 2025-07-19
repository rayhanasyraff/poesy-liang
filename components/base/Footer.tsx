import useShowComponent from "@/hooks/useShowComponent";

export default function Footer({ className }: { className?: string }) {

  const showFooter = useShowComponent();

  if (showFooter) {
    return (
      <footer className={`flex h-[100px] justify-end items-end pb-3 pr-5 font-bright-grotesk-semibold opacity-70 ${className}`}>
          <p>© 2025 PINK YAKUZA</p>
      </footer>
    );
  }

  return <></>
}
  