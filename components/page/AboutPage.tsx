import { desktopSize, mobileSize } from "@/constants/screenSize";
import { useMediaQuery } from "react-responsive";
import Home from "@/app/page";
import { ResponsiveImage } from "../utils/ResponsiveImage";

function AboutPageMobile() {

    return (
        <div className="flex flex-3 mr-10 flex-col">
            <ResponsiveImage 
                image={"/assets/images/poesy-avatar-2.jpeg"} 
                name={"Poesy Liang 梁小詩"} 
            />
            <div className="mx-10 mt-10 font-bright-grotesk-light opacity-77 text-white">
                <div>
                    <h1 className="text-[16px]">POESY LIANG</h1>
                    <p>梁小詩</p>
                    <p className="text-[10px]">MALAYSIA - TAIWAN (1975)</p>
                </div>
                <div className="mt-10 text-[10px] leading-relaxed space-y-4">
                <p>Poesy Liang 梁小詩 (1975) is a contemporary artist and award-winning social innovator from Malaysia and Taiwan who embeds technology into her creative endeavours.</p>

                <p>In her multidisciplinary practise, Poesy is a painter, designer, filmmaker, composer, poet, sculptor, and movement maker; she has spun out capsule brands of art merchandise, streetwear, fashion accessories, and even created a painfully cute mobile game.</p>

                <p>As her unique art form, she masterminds social movements that run for a lifetime, while her interdisciplinary practise also covers large-scale installations—piecing together paintings, objects, music & poetry—evident in her pavilion-sized work, the Pirate’s Daughter.</p>

                <p>Poesy is an illustrious storyteller with colourful backstories behind her humanitarian messages. Through the whimsical world of her Rooftop Cats, she encourages audiences to reach for their highest soul potential.</p>

                <p>A frequent flyer, Poesy appears on global stages and routinely clocks her calendar across three continents every year. She is a prolific writer and the author of an extensive website since 1999—with enough material to publish six books, two movies, and a mountain of poetic zines.</p>

                <p>As a filmmaker, her heart is set on creating immersive experiences for her blind audience, often achieving with sound what visuals cannot.</p>

                <p>Poesy is well-versed in the social impact space and actively contributes to the art world. Between travels, she runs artist residency programs in downtown Kuala Lumpur and hosts an international database of art practitioners. Her mission is to make the art world a kinder place and to break barriers for Malaysian artists globally.</p>

                <p>For comedy, she’s building a cat movement that mirrors a world domination plan—an homage to internet culture.</p>

                <p>Poesy began her public life as a teenager in television. She studied architecture and business, and eventually became the principal of a boutique jewellery house, designing luxury homes and hotels since 2000.</p>

                <p>She is also an accessibility consultant for the building industry, a keen designer for the Tiny House Movement, and runs groups like Tiny House Asia and Malaysian Backyard Chickens. Her recent work includes top-tier catio spaces for wealthy cats.</p>

                <p>Her personal battles with spinal tumours have paralysed her twice since the age of 17. Defying the odds, she learned to walk again each time. She now uses a mobility scooter to travel the globe, which informs her expertise in universal design accessibility.</p>

                <p>Poesy started her bitcoin journey in 2015 and began experimenting with blockchain solutions for art provenance. Her Running Rabbit signature, active since 2000, now lives on as an NFT that made it to the moon.</p>

                <p>During a brief stint as a street artist, her character Harry Putter RTC debuted in Melaka and rapidly spread to Johor, Kuala Lumpur, Singapore, Manila, and New York. Her largest mural to date is #ChubbPoesy, while her longest wall can be found at Yayasan Chow Kit, where she led a 12-year art program for marginalised children.</p>

                <p>Harry Putter was recently spotted in a mobile game catching fish to feed his fat wife and collecting plastic waste. Poesy’s projects consistently remind modern society of its original civic standards, continuing her 2007 movement, Helping Angels 善⾏天使.</p>

                <p>Despite being all over the place, Poesy hopes to read the Bible aloud from cover to cover and fiercely guards her sleep. Nothing comes between her and God—or her nap time.</p>

                <p>If you see her, a simple “miao” will do. Strictly no small talk.</p>
                </div>

            </div>
        </div>
    );
}

function AboutPageDesktop() {
    return (<></>);
}

export default function AboutPage() {
    const isDesktop = useMediaQuery({ query: desktopSize });
    const isMobile = useMediaQuery({ query: mobileSize });

    if (isMobile) {
        return (
            <>
                {/* <Header /> */}
                <AboutPageMobile />
            </>
        );
    }

    if (isDesktop) {
        return <AboutPageDesktop />;
    }

    return <Home />;
}
