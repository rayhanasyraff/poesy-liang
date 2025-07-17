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
                    <h1 className="text-[22px]">Poesy Liang (1975)</h1>
                    <p className="text-[16px]">Malaysia - Taiwan</p>
                </div>
                <div className="mt-10 text-[15px] leading-relaxed space-y-4">
                    <p>Poesy is a contemporary artist and award winning social innovator who embeds technology into her creative endeavours.</p>

                    <p>In her multidisciplinary practise; Poesy is a painter, designer, filmmaker, composer, poet, sculptor, street artist, and movement maker; who spun out capsule brands of art merchandise, streetwear, fashion accessories, luxury homes and fine jewellery.</p>

                    <p>As her unique art form, she masterminds social movements that runs for a lifetime, while her interdisciplinary practise also covers large scale installations, piecing together paintings, objects, music &amp; poetry – evident in her large scale work, the Pirate&rsquo;s Daughter.</p>

                    <p>In a nutshell, Poesy is an illustrious storyteller with colourful backstories behind her humanitarian messaging that she continues to deliver to the world in unprecedented ways. Often through the whimsical premise of her Rooftop Cats, she brings her audience to reach out to their highest ideals.</p>

                    <p>Poesy is a frequent flyer, who appears on global stages, and routinely clock her calendar in 3 continents each year.</p>

                    <p>She is familiar in the social impact space and an active participant of the art world. In between her travels, Poesy hosts an international database of art practitioners with her artist residency programs in downtown Kuala Lumpur. Her underlying goal is to make the art world a kinder place for all artists.</p>

                    <p>Poesy was a teenager with a career in television. She was schooled in architecture and business, and is the principal of a boutique jewellery house; and designs luxury hotels &amp; residences since 2000. She is also an advocate and accessibility consultant for the building industry, as well as a keen designer for the Tiny House Movement.</p>

                    <p>Her personal battles with spinal tumours has paralysed her twice since she was the age of 17 and she has defied the odds by learning to walk again each time. She is often spotted in her travels using a mobility scooter and this informs her as the lifestyle designer with a detailed insight to accessibility design for her building projects.</p>

                    <p>Poesy started her crypto journey in 2015 which led her to adopt blockchain solutions to track the provenance of her art stock. More recently, Poesy&rsquo;s Running Rabbit, her signature since 2000, continues the story in the form of NFTs.</p>

                    <p>She reinvents with technology to raise compassion, kindness and empathy by media reform, to serve humanity.</p>

                    <p>As the street artist, Poesy&rsquo;s Harry Putter RTC was first spotted in Melaka, and continued to sprout in Johor, Kuala Lumpur, Singapore, Manila and New York. While the #ChubbPoesy public mural is the largest commission to date, the longest wall she has ever drawn on is to be found at the headquarters of Yayasan Chow Kit, a leading children&rsquo;s foundation in Malaysia - where she ran an art program for the marginalised children for 12 years.</p>

                    <p>Harry Putter was recently spotted mingling with marine life in a mobile game where he catches fish and collects glass &amp; plastic waste. Her art inevitably awakens our modern lifestyle to civic standards of the old world, an unrelentless extension of Helping Angels 善⾏天使 &ndash; her social movement since 2007.</p>
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
