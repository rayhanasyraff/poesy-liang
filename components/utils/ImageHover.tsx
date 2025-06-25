"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ImageHover({ id, name, img }: { id: number, name: string, img: string }) {
  
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  useEffect(() => {
    document.addEventListener('mousemove', function(e) {
      const image = document.getElementById(`image-${id}`);
      const project = document.getElementById(`${id}`);

      if (project !== null && image !== null) {

        if (project.matches(':hover')) {
          image.className = "max-md:hidden md:absolute md:z-10";

          const imageRect = image.getBoundingClientRect();

          if ((e.pageY + imageRect.height + 40) > window.innerHeight) {
            image.style.top = e.pageY - imageRect.height - 20 + 'px';
          } else {
            image.style.top = e.pageY + 40 + 'px';
          }

          if ((e.pageX + imageRect.width) > window.innerWidth) {
            image.style.left = e.pageX - imageRect.width + 10 + 'px';
          } else {
            image.style.left = e.pageX + 'px';
          }

        } else {
          image.className = "hidden";
        }
      }
    });
  
  })
  
  if (isImageLoadError) {
    return <></>
  }

  return (
      <Image
      src={img}
      width={300}
      height={300}
      alt={name}
      className="hidden"
      id={`image-${id}`}
      placeholder="empty"
      onError={() => setIsImageLoadError(true)}
      />
  )
}