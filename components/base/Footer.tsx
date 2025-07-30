import { textStyle } from "@/constants/text";
import useShowComponent from "@/hooks/useShowComponent";
import cn from "@/utils/cn";

export default function Footer({ className="" }: { className?: string }) {

  const showFooter = useShowComponent();

  if (showFooter) {
    return (
      <footer className={cn(textStyle({ weight: "semibold" }), `w-full flex mt-15 justify-end pb-3 pr-5`, className)}>
        <p>© 2025 PINK YAKUZA</p>
      </footer>
    );
  }

  return <></>
}
  