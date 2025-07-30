export default function useBaseUrl() {

    const isEnvironmentProductionOrPreview = process.env.NEXT_PUBLIC_NODE_ENV === "production" || process.env.NEXT_PUBLIC_NODE_ENV === "preview";

    return (
        isEnvironmentProductionOrPreview ? process.env.NEXT_PUBLIC_URL : "http://localhost:3000"
    );
    
    // return (
    // process.env.NEXT_PUBLIC_NODE_ENV === "production" ? 
    //     process.env.NEXT_PUBLIC_URL : 
    //         process.env.NEXT_PUBLIC_URL_NETWORK ? process.env.NEXT_PUBLIC_URL_NETWORK : 
    //             process.env.NEXT_PUBLIC_URL_LOCAL ? process.env.NEXT_PUBLIC_URL_LOCAL : "http://localhost:3000"
    // );
} 