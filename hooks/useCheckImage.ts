// import { useEffect, useState } from "react";
// import useBaseUrl from "./useBaseUrl";

// async function checkImage(baseUrl: string | undefined, imageName: string) {
//     if (!baseUrl) return false;

//     const url = new URL(imageName, baseUrl);

//     try {
//         const res = await fetch(url.toString(), { method: "HEAD" });
//         return res.ok;
//     } catch {
//         return false;
//     }
// }

// export default function useCheckImage(img: string) {
//     const baseUrl = useBaseUrl();
//     const [exists, setExists] = useState<boolean | null>(null);

//     useEffect(() => {
//         let isMounted = true;

//         checkImage(baseUrl, img).then(result => {
//             if (isMounted) {
//                 setExists(result);
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [baseUrl, img]);

//     return exists;
// }
