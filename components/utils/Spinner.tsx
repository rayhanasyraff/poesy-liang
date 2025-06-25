import { FadeLoader } from "react-spinners";

export default function Spinner({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col items-center justify-center w-screen h-screen ${className}`}>
            <FadeLoader 
            loading={true}
            color="#ffffff" 
            />
        </div>
    );
}