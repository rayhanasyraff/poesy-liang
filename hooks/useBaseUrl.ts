export default function useBaseUrl() {
    return (
    process.env.NODE_ENV === "production" ? 
        process.env.URL : 
            process.env.URL_NETWORK ? process.env.URL_NETWORK : 
                process.env.URL_LOCAL ? process.env.URL_LOCAL : "http://localhost:3000"
    );
} 