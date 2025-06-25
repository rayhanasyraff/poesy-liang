import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="flex flex-row gap-3 text-md font-">
            <Link href="/projects"><p>projects</p></Link>
            <Link href="/world"><p>world</p></Link>
            <Link href="/about"><p>about</p></Link>
        </nav>
    );
}