"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';

// use imgSize if want to follow image source

export default function ImageHover({ id, name, img, width, height }: { id: number, name: string, img: string, width: number, height: number }) {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const image = document.getElementById(`image-${id}`);
      const project = document.getElementById(`project-${id}`);

      if (project && image) {
        if (project.matches(':hover')) {
          image.className = "max-md:hidden md:absolute md:z-10";

          const pageY = e.pageY;
          const pageX = e.pageX;

          const imgHeight = image.offsetHeight;
          const imgWidth = image.offsetWidth;

          const spaceBelow = window.scrollY + window.innerHeight - pageY;
          const spaceRight = window.innerWidth + window.scrollX - pageX;

          // Vertical positioning
          if (spaceBelow > imgHeight + 30) {
            image.style.top = (pageY + 30) + 'px';
          } else {
            image.style.top = (pageY - imgHeight - 20) + 'px';
          }

          // Horizontal positioning
          if (spaceRight < imgWidth) {
            image.style.left = (pageX - imgWidth + 10) + 'px';
          } else {
            image.style.left = pageX + 'px';
          }
        } else {
          image.className = "hidden";
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [id]);

  if (isImageLoadError || !imgSize) return null;

  return (
    <Image
      src={img}
      width={width}
      height={height}
      alt={name}
      id={`image-${id}`}
      className="hidden"
      placeholder="empty"
    />
  );
}
