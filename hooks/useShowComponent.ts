import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useDeviceContext from '@/hooks/useDeviceContext';


export default function useShowComponent() {

    const pathname = usePathname();
    const { isNarrowScreen } = useDeviceContext();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Show header if:
    // - you're on "/" (home), or
    // - you're on "/projects/[project]" AND on mobile
    const showComponent = isClient && (
        (pathname === "/") ||
        (pathname.startsWith("/projects/") && isNarrowScreen)
    );

    return showComponent;
}