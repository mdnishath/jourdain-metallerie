"use client";

import Studio from "./Studio";
import Atelier from "./Atelier";
import Gate from "./Gate";
import Staircase from "./Staircase";
import Showroom from "./Showroom";
import BigText from "./BigText";
import Doors from "./Doors";
import Gallery from "./Gallery";
import ForgeStation from "./ForgeStation";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
import { world, Z } from "@/lib/world";

export default function Experience({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 8, mobile ? 32 : 40]} />
      <Studio shadows={!mobile} />
      <CameraRig mobile={mobile} />

      <Atelier mobile={mobile} />

      {/* entrance gate */}
      <group position={[0, 0.1, Z.gate]}>
        <Gate open={() => world.gate} />
        <pointLight position={[0, 1.2, 2.5]} intensity={8} color="#dfe6f0" distance={9} decay={2} />
        <spotLight position={[-2, 4, -4]} intensity={35} angle={0.6} penumbra={0.8} color="#ffb47a" />
      </group>

      {/* staircase built on scroll */}
      <group position={[1.6, 0, Z.stair]}>
        <Staircase mobile={mobile} />
      </group>

      <Showroom z={Z.showroom} mobile={mobile} />
      <BigText z={Z.text} mobile={mobile} />
      <Doors z={Z.doors} />
      <Gallery z={Z.gallery} />
      <ForgeStation z={Z.forge} mobile={mobile} />

      {!mobile && <Effects />}
    </>
  );
}
