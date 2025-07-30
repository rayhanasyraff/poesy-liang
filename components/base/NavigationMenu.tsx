import { textStyle } from '@/constants/text';
import cn from '@/utils/cn';
import { useRouter } from 'next/navigation';
// import { TopRightArrowIcon } from '../icons/TopRightArrowIcon';

const navigationMenuStyle = cn("flex flex-row gap-2", textStyle({ size: "sm" }));
const navigationTabStyle = cn("flex flex-row hover:cursor-pointer hover:bg-pink-yakuza border-solid border-white border-1 p-[10px]")

function NavigationTab({children, path}: {children: React.ReactNode, path: string}) {

    const router = useRouter();

    const handler = () => {
        router.push(path);
    };
    
    return (
        <button
        onClick={handler}
        title={children?.toString()}
        className={navigationTabStyle}
        >
            <p>{children}</p>
        </button>
    )
}

export default function NavigationMenu({ className="" }: { className?: string }) {
    return (
        <nav className={cn(navigationMenuStyle, className)}>
            <NavigationTab path="/">HOME</NavigationTab>
            <NavigationTab path="/about">ABOUT</NavigationTab>
            <NavigationTab path="/">CONTACTS</NavigationTab>
            <NavigationTab path="/search">SEARCH</NavigationTab>
        </nav>
    );
}