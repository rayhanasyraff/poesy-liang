import Image from 'next/image';
import { useState } from 'react';

export function ResponsiveButtonedImage({image, name, onClick}: {image: string, name: string, onClick: () => void}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(700); // default max width

  const checkAndResize = (width: number, height: number) => {
    const windowHeight = window.innerHeight;
    const padding = 100; // breathing space

    const availableHeight = windowHeight - padding;
    const calculatedWidth = Math.min(700, availableHeight * (width / height));

    setAspectRatio(width / height);
    setMaxWidth(calculatedWidth); // set actual width instead of scaling
  };

  return (
    <div
      className="relative mx-auto"
      style={{
        width: '96%',
        maxWidth: `${maxWidth}px`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : '4 / 3',
      }}
    >
      <button title={name} className="block w-full h-full hover:cursor-pointer" onClick={onClick}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          style={{ objectFit: 'contain' }}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            if (naturalWidth && naturalHeight) {
              checkAndResize(naturalWidth, naturalHeight);
            }
          }}
        />
      </button>
    </div>
  );
}

export function ResponsiveImage({image, name}: {image: string, name: string}) {

  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(700); // default max width

  const checkAndResize = (width: number, height: number) => {
    const windowHeight = window.innerHeight;
    const padding = 100; // breathing space

    const availableHeight = windowHeight - padding;
    const calculatedWidth = Math.min(700, availableHeight * (width / height));

    setAspectRatio(width / height);
    setMaxWidth(calculatedWidth); // set actual width instead of scaling
  };

  return (
    <div
      className="relative mx-auto"
      style={{
        width: '96%',
        maxWidth: `${maxWidth}px`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : '4 / 3',
      }}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        style={{ objectFit: 'contain' }}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          const naturalWidth = img.naturalWidth;
          const naturalHeight = img.naturalHeight;
          if (naturalWidth && naturalHeight) {
            checkAndResize(naturalWidth, naturalHeight);
          }
        }}
      />
    </div>
  );
}
