import { useRouter } from 'next/navigation'; // ✅ Correct for App Router


function NavigationTab({children, path}: {children: React.ReactNode, path: string}) {

    const router = useRouter();

    const handler = () => {
        router.push(path);
    };
    

    return (
        <button
        onClick={handler}
        title="tab" 
        className="hover:cursor-pointer border-solid border-white border-1 p-2"
        >
            <p>{children}</p>
        </button>
    )
}

export default function NavigationMenu() {
    return (
        <nav className="flex flex-row gap-3 text-md font-bright-grotesk-light ml-10">
            <NavigationTab path="/">Home</NavigationTab>
            <NavigationTab path="/about">About</NavigationTab>
            <NavigationTab path="/contacts">Contacts</NavigationTab>
        </nav>
    );
}