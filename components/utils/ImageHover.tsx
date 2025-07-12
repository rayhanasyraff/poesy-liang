"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ImageHover({ id, name, img }: { id: number, name: string, img: string }) {
  
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const imgSize = {
    width: 480,
    height: 480
  }

  useEffect(() => {
    document.addEventListener('mousemove', function(e) {
      const image = document.getElementById(`image-${id}`);
      const project = document.getElementById(`project-${id}`);

      if (project !== null && image !== null) {

        if (project.matches(':hover')) {
          image.className = "max-md:hidden md:absolute md:z-10";

          const imageRect = image.getBoundingClientRect();

          // console.log({
          //   "cursor x": e.pageX, 
          //   "cursor y": e.pageY, 
          //   "image width": imageRect.width, 
          //   "image height": imageRect.height, 
          //   "window width": window.innerWidth, 
          //   "window height": window.innerHeight,
          //   "cursor + image y": (e.pageY + imageRect.height + 40),
          //   "cursor + image x": (e.pageX + imageRect.width)
          // });

          if ((e.pageY + imageRect.height - 30) > window.innerHeight) {
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

  if (img == "/assets/images/poesy-logo-pink.png") {
    imgSize.width = 200;
    imgSize.height = 200;
  }

  if (name == "gratitude letters") {
    imgSize.width = 900;
    imgSize.height = 900;
  }

  if (name == "harry putter shop") {
    imgSize.width = 500;
    imgSize.height = 500;
  }

  if (name == "harry putter birthday book") {
    imgSize.width = 800;
    imgSize.height = 800;
  }

  return (
      <Image
      src={img}
      width={imgSize.width}
      height={imgSize.height}
      alt={name}
      className="hidden"
      id={`image-${id}`}
      placeholder="empty"
      onError={() => setIsImageLoadError(true)}
      />
  )
}