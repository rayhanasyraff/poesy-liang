import { ResponsiveImage } from "../utils/ResponsiveImage";
import useDeviceContext from "@/hooks/useDeviceContext";
import ClosePageButton from "../utils/ClosePageButton";
import PageBaseBodyLayout from "../layout/PageBaseBodyLayout";
import PageBaseLayout from "../layout/PageBaseLayout";
import useNavigateToAnotherPage from "@/hooks/useNavigateToAnotherPage";

function AboutPageContentNarrowScreen() {
    return (
        <>
            <ResponsiveImage 
            image="/assets/images/poesy-harry-anime.png" 
            name="Poesy Liang 梁小詩" 
            />
            <div className="mx-10 mt-10 font-bright-grotesk-light opacity-77 text-white">
                <div>
                    <h1 className="text-[15px]">POESY LIANG</h1>
                    <p className="text-[13px]">梁小詩</p>
                    <p className="text-[10px]">1975</p>
                    <p className="text-[10px]">MALAYSIA - TAIWAN</p>
                </div>
                <div className="mt-10 text-[10px] leading-relaxed space-y-4">
                    <p>
                    Poesy is a contemporary artist and award winning social innovator who incorporates technology into her creative endeavours.
                    </p>

                    <p>
                    She is the daughter of a Malaysian-Chinese father and a Taiwanese mother. Intermarriage between two Chinese diaspora nations left the young Poesy grappling with being an outsider in her community &mdash; facing questions of belonging and cultural disconnection, creating a unique cultural synthesis of being neither purely Chinese nor purely Malaysian in an age of rampant economic migration and dual citizenship.
                    </p>

                    <p>
                    In her multidisciplinary practise, Poesy is a painter, poet, designer, sculptor, composer, filmmaker, and movement maker; she has spun out capsule brands of art merchandise, streetwear, fashion accessories, and even produced a painfully cute mobile game &mdash; her naive visuals are usually packed with irony.
                    </p>

                    <p>
                    Her lifelong commitment to social activism as her unique art form has also resulted in large-scale installations &mdash; piecing together drawings, objects, performance, music and poetry &mdash; which are evident in her pavilion-scale work The Pirate&rsquo;s Daughter.
                    </p>

                    <p>
                    Poesy is an illustrious storyteller with colourful backstories behind her humanitarian messaging, which she continues to deliver to the world in unprecedented ways. Through the whimsical world of her signature Rooftop Cats (RTC), she compels her audiences to reach for their highest soul potential.
                    </p>

                    <p>
                    A frequent flyer, Poesy appears on the global stage and routinely clocks her calendar across three continents every year.
                    </p>

                    <p>
                    She is a prolific writer and the author of a website since 1999 &mdash; with enough materials to publish six books, two movies and a small mountain of poetic zines.
                    </p>

                    <p>
                    As a filmmaker, her heart is primarily set on creating an immersive experience for her blind friends, achieving with soundscapes what her visuals cannot.
                    </p>

                    <p>
                    She navigates the social impact space with familiarity and is a contributor to the art world. Between travels, Poesy hosts an international database of art practitioners and has an artist residency program in the heart of Kuala Lumpur. Her fundamental calling is to make the art world a kinder place for all artists to thrive and to break down barriers that prevents Malaysian artists to be seen globally.
                    </p>

                    <p>
                    For comedic catharsis, she is also building a cat movement for the art world, which reflects a blueprint of a world domination plan similar to the internet cat phenomenon.
                    </p>

                    <p>
                    Poesy was a teenager with a career in television. In addition to her early introduction to the arts practice, she schooled in architecture and business, and grew up to be the principal of a boutique jewellery house; designing luxury hotels &amp; residences since 2000. Her design territory has inevitably expanded to creating top-notch tech-luxury cat spaces for wealthy felines.
                    </p>

                    <p>
                    Poesy reinvents with technology, promoting compassion, kindness, and empathy through media reform. She develops projects to serve humanity, not its greed, and balances restoring old school class that don&rsquo;t need modernization. In the advent of artificial intelligence, she puts focus on the personal touch and humanistic potential, to preempt the onslaught of existential crises to humankind.
                    </p>

                    <p>
                    She is also an advocate and accessibility consultant for the building industry, and a keen designer of tiny houses. With her commitment to sustainability, she owns the &lsquo;Tiny House Asia&rsquo; group and holds an administrator role for the &lsquo;Malaysian Backyard Chickens&rsquo; group on Facebook. She is personally active in the &lsquo;Buy Nothing&rsquo; movement and is a composting geek.
                    </p>

                    <p>
                    Her personal battles with spinal tumours paralysed her twice since the age of 17. Against all odds, she learned to walk again each time. She is often spotted riding a mobility scooter through international airports and global architectural icons. This exposure informs her expertise in universal design accessibility.
                    </p>

                    <p>
                    Poesy started her bitcoin journey in 2016 and began experimenting with blockchain solutions for physical art provenance. Her signature Running Rabbit (RR), active since 2000, continues its story in the form of NFTs who made it to the moon.
                    </p>

                    <p>
                    Her famed cat Harry Putter (named after a hairy golfer) was recently spotted mingling with marine life in a mobile game where he catches fish to feed his fat wife, and bothers to collect glass &amp; plastic waste in the sea. This storyline is a prelude to Poesy&rsquo;s venture into cutting glass bottles into drinkware for the hospitality industry. Poesy&rsquo;s projects inevitably awaken our modern society to humanity&rsquo;s original design &mdash; synonymous with the unrelenting mission of Helping Angels &#x5584;&#x5F80;&#x5929;&#x4F7F; &mdash; Poesy&rsquo;s randomly kind movement since 2007.
                    </p>

                    <p>
                    During her brief stint as a street artist, her Harry Putter RTC debuted in Melaka and quickly appeared in Johor, Kuala Lumpur, Singapore, Manila, and New York. While her largest public commission to date is the #ChubbPoesy mural, her longest wall can be found at Malaysia&rsquo;s leading children&rsquo;s foundation Yayasan Chow Kit, where she has established a 12-year-old Tuesday Art program for marginalised children.
                    </p>

                    <p>
                    Despite being everywhere, Poesy wants to read the Bible aloud from cover to cover and possessively loves to sleep. Nothing comes between her and God &mdash; nor should anyone attempt to keep her awake unnecessarily.
                    </p>

                    <p>
                    If you greet her in person, a simple &ldquo;meow&rdquo; will suffice. Small talk is strictly prohibited.
                    </p>
                </div>
            </div>
        </>
    )
}

function AboutPageBodyNarrowScreen() {
    return (
        <PageBaseBodyLayout>
            <div className="flex flex-3 mr-10 flex-col">
                <AboutPageContentNarrowScreen />
            </div>
        </PageBaseBodyLayout>

    ); 
}

function AboutPageNarrowScreen() {
    return  (
        <PageBaseLayout>
            <AboutPageBodyNarrowScreen />
        </PageBaseLayout>
    );
}

function AboutPageContentWideScreen() {
    return (
        <div className="flex flex-1 flex-row">
            <div className="m-15 font-bright-grotesk-light opacity-77 text-white">
                <div>
                    <h1 className="text-[30px]">POESY LIANG</h1>
                    <p className="text-[25px]">梁小詩</p>
                    <p className="text-[20px]">1975</p>
                    <p className="text-[20px]">MALAYSIA - TAIWAN</p>
                </div>
                <div className="mt-10 text-[20px] leading-relaxed space-y-4">
                    <p>
                    Poesy is a contemporary artist and award winning social innovator who incorporates technology into her creative endeavours.
                    </p>

                    <p>
                    She is the daughter of a Malaysian-Chinese father and a Taiwanese mother. Intermarriage between two Chinese diaspora nations left the young Poesy grappling with being an outsider in her community &mdash; facing questions of belonging and cultural disconnection, creating a unique cultural synthesis of being neither purely Chinese nor purely Malaysian in an age of rampant economic migration and dual citizenship.
                    </p>

                    <p>
                    In her multidisciplinary practise, Poesy is a painter, poet, designer, sculptor, composer, filmmaker, and movement maker; she has spun out capsule brands of art merchandise, streetwear, fashion accessories, and even produced a painfully cute mobile game &mdash; her naive visuals are usually packed with irony.
                    </p>

                    <p>
                    Her lifelong commitment to social activism as her unique art form has also resulted in large-scale installations &mdash; piecing together drawings, objects, performance, music and poetry &mdash; which are evident in her pavilion-scale work The Pirate&rsquo;s Daughter.
                    </p>

                    <p>
                    Poesy is an illustrious storyteller with colourful backstories behind her humanitarian messaging, which she continues to deliver to the world in unprecedented ways. Through the whimsical world of her signature Rooftop Cats (RTC), she compels her audiences to reach for their highest soul potential.
                    </p>

                    <p>
                    A frequent flyer, Poesy appears on the global stage and routinely clocks her calendar across three continents every year.
                    </p>

                    <p>
                    She is a prolific writer and the author of a website since 1999 &mdash; with enough materials to publish six books, two movies and a small mountain of poetic zines.
                    </p>

                    <p>
                    As a filmmaker, her heart is primarily set on creating an immersive experience for her blind friends, achieving with soundscapes what her visuals cannot.
                    </p>

                    <p>
                    She navigates the social impact space with familiarity and is a contributor to the art world. Between travels, Poesy hosts an international database of art practitioners and has an artist residency program in the heart of Kuala Lumpur. Her fundamental calling is to make the art world a kinder place for all artists to thrive and to break down barriers that prevents Malaysian artists to be seen globally.
                    </p>

                    <p>
                    For comedic catharsis, she is also building a cat movement for the art world, which reflects a blueprint of a world domination plan similar to the internet cat phenomenon.
                    </p>

                    <p>
                    Poesy was a teenager with a career in television. In addition to her early introduction to the arts practice, she schooled in architecture and business, and grew up to be the principal of a boutique jewellery house; designing luxury hotels &amp; residences since 2000. Her design territory has inevitably expanded to creating top-notch tech-luxury cat spaces for wealthy felines.
                    </p>

                    <p>
                    Poesy reinvents with technology, promoting compassion, kindness, and empathy through media reform. She develops projects to serve humanity, not its greed, and balances restoring old school class that don&rsquo;t need modernization. In the advent of artificial intelligence, she puts focus on the personal touch and humanistic potential, to preempt the onslaught of existential crises to humankind.
                    </p>

                    <p>
                    She is also an advocate and accessibility consultant for the building industry, and a keen designer of tiny houses. With her commitment to sustainability, she owns the &lsquo;Tiny House Asia&rsquo; group and holds an administrator role for the &lsquo;Malaysian Backyard Chickens&rsquo; group on Facebook. She is personally active in the &lsquo;Buy Nothing&rsquo; movement and is a composting geek.
                    </p>

                    <p>
                    Her personal battles with spinal tumours paralysed her twice since the age of 17. Against all odds, she learned to walk again each time. She is often spotted riding a mobility scooter through international airports and global architectural icons. This exposure informs her expertise in universal design accessibility.
                    </p>

                    <p>
                    Poesy started her bitcoin journey in 2016 and began experimenting with blockchain solutions for physical art provenance. Her signature Running Rabbit (RR), active since 2000, continues its story in the form of NFTs who made it to the moon.
                    </p>

                    <p>
                    Her famed cat Harry Putter (named after a hairy golfer) was recently spotted mingling with marine life in a mobile game where he catches fish to feed his fat wife, and bothers to collect glass &amp; plastic waste in the sea. This storyline is a prelude to Poesy&rsquo;s venture into cutting glass bottles into drinkware for the hospitality industry. Poesy&rsquo;s projects inevitably awaken our modern society to humanity&rsquo;s original design &mdash; synonymous with the unrelenting mission of Helping Angels &#x5584;&#x5F80;&#x5929;&#x4F7F; &mdash; Poesy&rsquo;s randomly kind movement since 2007.
                    </p>

                    <p>
                    During her brief stint as a street artist, her Harry Putter RTC debuted in Melaka and quickly appeared in Johor, Kuala Lumpur, Singapore, Manila, and New York. While her largest public commission to date is the #ChubbPoesy mural, her longest wall can be found at Malaysia&rsquo;s leading children&rsquo;s foundation Yayasan Chow Kit, where she has established a 12-year-old Tuesday Art program for marginalised children.
                    </p>

                    <p>
                    Despite being everywhere, Poesy wants to read the Bible aloud from cover to cover and possessively loves to sleep. Nothing comes between her and God &mdash; nor should anyone attempt to keep her awake unnecessarily.
                    </p>

                    <p>
                    If you greet her in person, a simple &ldquo;meow&rdquo; will suffice. Small talk is strictly prohibited.
                    </p>
                </div>
            </div>
            <div className={`flex  w-full`}>
                <ResponsiveImage
                className="mt-10"
                justify="center"
                align="top" 
                fixedHeight={900}
                fixedWidth={450}
                image="/assets/images/poesy-harry-anime.png" 
                name="Poesy Liang 梁小詩" />
            </div>
        </div>
    )
}

function AboutPageBodyWideScreen() {

    const setNavigateToAnotherPage = useNavigateToAnotherPage((state) => state.setNavigateToAnotherPage);

    return (
        <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-center min-h-screen">
                <AboutPageContentWideScreen />
            </div>
            <ClosePageButton onClick={() => setNavigateToAnotherPage(false) } />
        </div>
    )

}

function AboutPageWideScreen() {
    return <AboutPageBodyWideScreen />;
}

export default function AboutPage() {

    const { isWideScreen, isNarrowScreen } = useDeviceContext();

    if (isNarrowScreen) {
        return <AboutPageNarrowScreen />;
    }

    if (isWideScreen) {
        return <AboutPageWideScreen />;
    }

    return <></>;
}
