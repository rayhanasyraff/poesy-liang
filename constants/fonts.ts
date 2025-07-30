import localFont from 'next/font/local';

export const brightGrotesk = localFont({
    src: [
        {
            path: '../public/assets/fonts/Bright Grotesk/Light/Bright Grotesk Light.ttf',
            weight: '200',
            style: 'light',
        },
        {
            path: '../public/assets/fonts/Bright Grotesk/Normal/Bright Grotesk.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/assets/fonts/Bright Grotesk/Semibold/Bright Grotesk Semibold.ttf',
            weight: '600',
            style: 'semibold',
        },
    ],
    variable: '--font-bright-grotesk',
});