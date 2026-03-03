"use client"

import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';

// Use Floating UI virtual reference that follows the cursor while hovering
export default function ImageHover({ id, name, img, width, height }: { id: number, name: string, img: string, width: number, height: number }) {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
  const [open, setOpen] = useState(false);
  const virtualRef = useRef({
    getBoundingClientRect: () => new DOMRect(0, 0, 0, 0),
  } as { getBoundingClientRect: () => DOMRect });

  useEffect(() => {
    const preloadImg = new window.Image();
    preloadImg.src = img;
    preloadImg.onload = () => {
      setImgSize({
        width: preloadImg.naturalWidth,
        height: preloadImg.naturalHeight,
      });
    };
    preloadImg.onerror = () => {
      setIsImageLoadError(true);
    };
  }, [img]);

  const { x, y, strategy, refs, update } = useFloating({
    placement: 'auto',
    middleware: [offset(12), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const project = document.getElementById(`project-${id}`);
    if (!project) return;

    // set virtual element as reference so the floating thumbnail follows the cursor
    refs.setReference(virtualRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      // create a rect at the cursor position (client coords)
      const clientX = e.clientX;
      const clientY = e.clientY;
      virtualRef.current.getBoundingClientRect = () => new DOMRect(clientX, clientY, 1, 1);

      // position update
      update?.();
    };

    const onEnter = (e: Event) => {
      setOpen(true);
      // start listening to mousemove on document to track cursor even if it leaves the project text
      document.addEventListener('mousemove', handleMouseMove);
    };

    const onLeave = () => {
      setOpen(false);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    project.addEventListener('mouseenter', onEnter);
    project.addEventListener('mouseleave', onLeave);

    return () => {
      project.removeEventListener('mouseenter', onEnter);
      project.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [id, refs, update]);

  if (isImageLoadError || !imgSize) return null;

  if (isImageLoadError || !imgSize) return null;

  const THUMB = 240;

  return (
    <div
      ref={refs.setFloating}
      id={`image-${id}`}
      style={{
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
        pointerEvents: 'none',
      }}
      className={open ? "max-md:hidden md:absolute md:z-10" : "hidden"}
    >
      {/* fixed thumbnail container so all thumbnails share the same scale */}
      <div style={{ position: 'relative', width: THUMB, height: THUMB }}>
        <Image
          src={img}
          alt={name}
          fill
          style={{ objectFit: 'contain' }}
          placeholder="empty"
        />
      </div>
    </div>
  );
}

