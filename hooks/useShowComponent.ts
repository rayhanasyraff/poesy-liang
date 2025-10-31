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

    // ✅ Show header immediately on home page
    // Wait for client on project pages (to check device context)
    if (pathname === "/") {
        return true;
    }

    // For project pages, wait for client to check screen size
    const showComponent = isClient && (
        pathname.startsWith("/projects/") && isNarrowScreen
    );

    return showComponent;
}