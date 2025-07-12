import Image from 'next/image';

export default function ResponsiveImage({image, name}: {image: string, name: string}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',     // Optional: limit the size
        aspectRatio: '4 / 3',  // Keeps aspect ratio, no layout shift
        margin: '0 auto',      // Optional: center
      }}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        style={{
          objectFit: 'contain', // or 'cover' if you want crop-fill effect
        }}
      />
    </div>
  );
}
