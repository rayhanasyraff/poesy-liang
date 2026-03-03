"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';

// Replaced manual mouse positioning with Floating UI for robust positioning
export default function ImageHover({ id, name, img, width, height }: { id: number, name: string, img: string, width: number, height: number }) {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
  const [open, setOpen] = useState(false);

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
    placement: 'right-start',
    middleware: [offset(12), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Attach reference to the project element and listen for hover to toggle open state
  useEffect(() => {
    const project = document.getElementById(`project-${id}`);
    if (!project) return;

    refs.setReference(project);

    const onEnter = () => {
      setOpen(true);
      // request position update when opening
      update?.();
    };
    const onLeave = () => setOpen(false);

    project.addEventListener('mouseenter', onEnter);
    project.addEventListener('mouseleave', onLeave);

    return () => {
      project.removeEventListener('mouseenter', onEnter);
      project.removeEventListener('mouseleave', onLeave);
    };
  }, [id, refs, update]);

  if (isImageLoadError || !imgSize) return null;

  return (
    <div
      ref={refs.setFloating}
      id={`image-${id}`}
      style={{
        position: strategy,
        left: x ?? 0,
        top: y ?? 0,
      }}
      className={open ? "max-md:hidden md:absolute md:z-10" : "hidden"}
    >
      <Image
        src={img}
        width={width}
        height={height}
        alt={name}
        placeholder="empty"
      />
    </div>
  );
}
