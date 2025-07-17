import { useState, useRef, useEffect, Suspense } from 'react';

export function ResponsiveVideo({
  video,
  scale = 96,
}: {
  video: string;
  name: string;
  scale?: number;
}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(700);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.onloadedmetadata = () => {
        const width = vid.videoWidth;
        const height = vid.videoHeight;
        const windowHeight = window.innerHeight;
        const padding = 100;

        const availableHeight = windowHeight - padding;
        const calculatedWidth = Math.min(700, availableHeight * (width / height));

        setAspectRatio(width / height);
        setMaxWidth(calculatedWidth);
      };
    }
  }, []);

  return (
      <Suspense fallback={<p className='text-[10px] text-white font-bright-grotesk-light'>Loading video...</p>}>
        <div
        className="relative mx-auto"
        style={{
            width: `${scale}%`,
            maxWidth: `${maxWidth}px`,
            aspectRatio: aspectRatio ? `${aspectRatio}` : '4 / 3',
        }}
        >
            <video
                ref={videoRef}
                src={video}
                className="w-full h-full object-contain"
                controls
                preload="metadata"
            />
        </div>
      </Suspense>
  );
}
