import Nav from "@/components/ui/Nav";
import SideNav from "@/components/ui/SideNav";
import Cursor from "@/components/ui/Cursor";
import StickyMobileBar from "@/components/ui/StickyMobileBar";
import Marquee from "@/components/ui/Marquee";
import Loader from "@/components/Loader";
import ScrollTracker from "@/components/ScrollTracker";
import World from "@/components/three/World";
import Hero from "@/components/sections/Hero";
import Forge from "@/components/sections/Forge";
import Services from "@/components/sections/Services";
import Pourquoi from "@/components/sections/Pourquoi";
import ProsParticuliers from "@/components/sections/ProsParticuliers";
import Realisations from "@/components/sections/Realisations";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <World />
      <ScrollTracker />
      <Nav />
      <SideNav />
      <Cursor />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Forge />
        <Services />
        <Pourquoi />
        <ProsParticuliers />
        <Realisations />
        <Contact />
      </main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
