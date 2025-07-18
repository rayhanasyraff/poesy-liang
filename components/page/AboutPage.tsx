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
                    <p>
                        Poesy is a contemporary artist and award winning social innovator who embeds technology into her creative endeavours.
                    </p>

                    <p>
                        In her multidisciplinary practise; Poesy is a painter, designer, filmmaker, composer, poet, sculptor, and movement maker; who spun out capsule brands of art merchandise, streetwear, fashion accessories, and produced a painfully cute mobile game.                    
                    </p>

                    <p>
                        As her unique art form, she masterminds social movements that runs
                        for a lifetime, while her interdisciplinary practise also covers
                        large scale installations; piecing together paintings, objects,
                        music &amp; poetry – evident in her pavilion-sized work, the Pirate&rsquo;s
                        Daughter.
                    </p>

                    <p>
                        In a nutshell, Poesy is an illustrious storyteller with colourful
                        backstories behind her humanitarian messaging that she continues
                        to deliver to the world in unprecedented ways. Often through the whimsical premise of her Rooftop Cats, she brings her audience to reach for their highest soul potential.
                    </p>

                    <p>
                        Poesy is a frequent flyer, who appears on global stages, and routinely clocks her calendar in 3 continents each year. She is a prolific writer, the author of a website since 1999 &ndash; with enough materials to publish 6 books, 2 movies and a small mountain of poetic zines. As a filmmaker, her heart is primarily set on creating an immersive experience for her blind audience, achieving with sound what her visuals cannot.
                    </p>

                    <p>
                        She navigates the social impact space with familiarity and is a contributing member of the art world. In between her travels, Poesy hosts an international database of art practitioners with her artist residency programs in downtown Kuala Lumpur. Her underlying calling is to make the art world a kinder place for all artists to thrive and to break the barriers for Malaysian artists to be seen globally. For comedy, she is building a cat movement for the art world as well, which plagiarises the blueprint of a world domination plan similar to the internet.
                    </p>

                    <p>
                        Poesy was a teenager with a career in television. She schooled
                        in architecture and business, and grew up to be the principal of a boutique
                        jewellery house; and designs luxury hotels &amp; residences since
                        2000. She is also an advocate and accessibility consultant for the
                        building industry, as well as a keen designer of tiny houses. With her commitment to sustainability, she owns the group Tiny House Asia and took the admin role for Malaysian Backyard Chickens on Facebook. Her design territory has inevitably expanded into creating top tech luxury catio spaces for wealthy cats.                     
                    </p>

                    <p>
                        Her personal battles with spinal tumours has paralysed her twice
                        since she was the age of 17 and she has defied the odds by
                        learning to walk again each time. She is often spotted using a mobility scooter to cross the globe and this informs her with detailed insights as an artful designer of universal accessibility for every building project that consults her.
                    </p>

                    <p>
                        Poesy reinvents with technology to raise compassion, kindness and
                        empathy by media reform, to serve humanity but not the greed. She started her bitcoin journey in 2015 which led her to experiment 
                        blockchain solutions for art provenance.
                        More recently, Poesy&rsquo;s Running Rabbit, a signature since 2000,
                        continues its story in the form of NFT who got to the moon.
                    </p>

                    <p>
                        During her brief stint as the street artist, Poesy&rsquo;s Harry Putter RTC was first spotted in Melaka, and rapidly appeared in Johor, Kuala Lumpur, Singapore, Manila and New York. While the #ChubbPoesy mural is her largest public commission to date, the longest wall she has ever drawn is to be found at the headquarters of Yayasan Chow Kit, a leading children&rsquo;s foundation in Malaysia &ndash; where Poesy spearheaded a Tuesday art program for marginalised children that lasted 12 years.
                    </p>

                    <p>
                        Her famed cat Harry Putter was recently spotted mingling with marine life in a mobile game where he catches fish to feed his fat wife, and bothers to collect glass &amp; plastic waste in the sea. Poesy&rsquo;s projects inevitably awaken our modern society to its original design in order to restore civic standards of the old school &ndash; synonymous with the unrelenting mission of Helping Angels 善⾏天使 &ndash; Poesy&rsquo;s randomly kind movement since 2007.
                    </p>

                    <p>
                        Despite being all over the place, Poesy wants to read the Bible aloud from cover to cover and possessively loves her sleep. She rarely allows anything to come between her and God, nor should anyone attempt to keep her awake unnecessarily. 
                    </p>

                    <p>
                        If you say hi to her, a basic &ldquo;miao&rdquo; is sufficient and strictly no small talk. 
                    </p>

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
