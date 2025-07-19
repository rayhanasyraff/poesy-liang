import Image from 'next/image';
import { useState } from 'react';

type JustifyOptions = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type AlignOptions = 'top' | 'center' | 'bottom' | 'baseline' | 'stretch';

interface BaseImageProps {
  image: string;
  name: string;
  scale?: number;
  imageScale?: number;
  justify?: JustifyOptions;
  align?: AlignOptions;
  fixedWidth?: number;
  fixedHeight?: number;
  className?: string;
}

interface ButtonedImageProps extends BaseImageProps {
  onClick: () => void;
}

const justifyMap: Record<JustifyOptions, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const alignMap: Record<AlignOptions, string> = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

function useResponsiveImageSize() {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(700);

  const checkAndResize = (width: number, height: number) => {
    const windowHeight = window.innerHeight;
    const padding = 100;
    const availableHeight = windowHeight - padding;
    const calculatedWidth = Math.min(700, availableHeight * (width / height));

    setAspectRatio(width / height);
    setMaxWidth(calculatedWidth);
  };

  return { aspectRatio, maxWidth, checkAndResize };
}

function getContainerStyle({
  fixedWidth,
  fixedHeight,
  scale,
  maxWidth,
  aspectRatio,
}: {
  fixedWidth?: number;
  fixedHeight?: number;
  scale: number;
  maxWidth: number;
  aspectRatio: number | null;
}): React.CSSProperties {
  if (fixedWidth && fixedHeight) {
    return { width: `${fixedWidth}px`, height: `${fixedHeight}px` };
  }

  return {
    width: `${scale}%`,
    maxWidth: `${maxWidth}px`,
    aspectRatio: aspectRatio ? `${aspectRatio}` : '4 / 3',
  };
}

// 🔁 Shared component
function ImageContainer({
  image,
  name,
  onClick,
  scale = 96,
  imageScale = 100,
  justify = 'center',
  align = 'center',
  fixedWidth,
  fixedHeight,
  className = '',
}: Partial<ButtonedImageProps>) {
  const { aspectRatio, maxWidth, checkAndResize } = useResponsiveImageSize();

  const containerStyle = getContainerStyle({
    fixedWidth,
    fixedHeight,
    scale,
    maxWidth,
    aspectRatio,
  });

  const imageWrapperStyle: React.CSSProperties = {
    width: `${imageScale}%`,
    height: `${imageScale}%`,
    position: 'relative',
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!fixedWidth && !fixedHeight && naturalWidth && naturalHeight) {
      checkAndResize(naturalWidth, naturalHeight);
    }
  };

  return (
    <div className={`flex ${justifyMap[justify]} ${alignMap[align]} w-full ${className}`}>
      <div style={containerStyle} className="flex justify-center items-center">
        {onClick ? (
          <button
            title={name}
            className="block w-full h-full hover:cursor-pointer"
            onClick={onClick}
            style={{ padding: 0, margin: 0 }}
          >
            <div style={imageWrapperStyle}>
              <Image
                src={image || ''}
                alt={name || ''}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                style={{ objectFit: 'contain' }}
                onLoad={handleImageLoad}
              />
            </div>
          </button>
        ) : (
          <div style={imageWrapperStyle}>
            <Image
              src={image || ''}
              alt={name || ''}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              style={{ objectFit: 'contain' }}
              onLoad={handleImageLoad}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Clickable image
export function ResponsiveButtonedImage(props: ButtonedImageProps) {
  return <ImageContainer {...props} />;
}

// ✅ Static image
export function ResponsiveImage(props: BaseImageProps) {
  return <ImageContainer {...props} />;
}
