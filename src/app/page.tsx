import { getSiteAssets } from "@/lib/assets";
import { MotionProvider } from "@/components/MotionProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Groups } from "@/components/sections/Groups";
import { Nutrition } from "@/components/sections/Nutrition";
import { Clubs } from "@/components/sections/Clubs";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";

export default function HomePage() {
  const assets = getSiteAssets();

  return (
    <MotionProvider>
      <Header logo={assets.logo} />
      <main>
        <Hero image={assets.heroImage} />
        <About video={assets.aboutVideo} />
        <Groups />
        <Nutrition />
        <Clubs />
        <Gallery photos={assets.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={assets.logo} />
    </MotionProvider>
  );
}
