"use client"

import React from 'react'
import { ResponsiveImage } from '../utils/ResponsiveImage'

export default function RtcHero({ image, alt, pdfUrl, showAbout = true }: { image: string, alt?: string, pdfUrl: string, showAbout?: boolean }) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full">
                <ResponsiveImage image={image} name={alt ?? 'RTC'} scale={100} />
            </div>
            {showAbout && (
            <div className="mt-6 w-full flex justify-center">
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open RTC About PDF"
                    className="relative z-20 text-white/80 text-[12px] uppercase tracking-widest px-3 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                    About
                </a>
            </div>
            )}
        </div>
    )
}