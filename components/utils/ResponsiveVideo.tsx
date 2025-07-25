"use client";
import { useRef, useEffect, useState, Suspense } from "react";

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

  // Adjust viewport on fullscreen
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

  // Set video dimensions and autoplay
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

  // Lock scroll on fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const finalWidth = width ?? videoDimensions.width;
  const finalHeight = height ?? videoDimensions.height;
  const aspectRatio = finalWidth / finalHeight;

  const fullscreenStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    backgroundColor: 'black',
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
      </div>
    </Suspense>
  );
}
