import { useRef, useEffect, useState, Suspense } from 'react';

export function ResponsiveVideo({
  video,
  width,
  height,
  isFullscreen = false,
  autoplay = false,
  loop = false,
}: {
  video: string;
  width?: number;
  height?: number;
  isFullscreen?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDimensions, setVideoDimensions] = useState({ width: 640, height: 360 });

  // 🌐 Handle viewport meta change based on isFullscreen
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) return;

    const originalContent = viewportMeta.getAttribute('content');

    if (isFullscreen) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }

    return () => {
      if (originalContent) {
        viewportMeta.setAttribute('content', originalContent);
      }
    };
  }, [isFullscreen]);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.onloadedmetadata = () => {
        setVideoDimensions({
          width: vid.videoWidth,
          height: vid.videoHeight,
        });
        if (autoplay) {
          vid.play().catch(() => {
            console.warn('Autoplay failed: user interaction may be required.');
          });
        }
      };
    }
  }, [autoplay]);

  const finalWidth = width ?? videoDimensions.width;
  const finalHeight = height ?? videoDimensions.height;
  const aspectRatio = finalWidth / finalHeight;

  const videoElement = (
    <video
      ref={videoRef}
      src={video}
      className="w-full h-full object-cover"
      controls
      preload="metadata"
      autoPlay={autoplay}
      muted={autoplay}
      playsInline
      loop={loop}
    />
  );

  const fullscreenStyle = {
    height: '100vh',
    maxHeight: '100vh',
    aspectRatio: `${aspectRatio}`,
    maxWidth: '100%',
  };

  const normalStyle = {
    width: '100%',
    maxWidth: `${finalWidth}px`,
    aspectRatio: `${aspectRatio}`,
    maxHeight: '100vh',
  };

  return (
    <Suspense fallback={<p className="text-[10px] text-white font-bright-grotesk-light">Loading video...</p>}>
      <div className="relative mx-auto" style={isFullscreen ? fullscreenStyle : normalStyle}>
        {videoElement}
      </div>
    </Suspense>
  );
}
