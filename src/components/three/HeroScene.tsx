"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import Gate from "./Gate";
import Sparks from "./Sparks";
import Studio from "./Studio";

export default function HeroScene({ mobile = false }: { mobile?: boolean }) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.5 : 2]}
      shadows={!mobile}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.35, mobile ? 9.4 : 6.4], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Studio shadows={!mobile} />
        {/* front fill + back rim so the bars read as polished steel */}
        <pointLight position={[2.5, 1.5, 4.5]} intensity={10} color="#e3e9f2" distance={12} decay={2} />
        <spotLight position={[-2, 4, -5]} intensity={40} angle={0.6} penumbra={0.8} color="#ffb47a" />
        <group position={[mobile ? 0.4 : 0.2, mobile ? -0.9 : 0.05, 0]}>
          <Gate mobile={mobile} />
        </group>
        {!mobile && (
          <ContactShadows
            position={[0, -1.42, 0]}
            opacity={0.6}
            scale={9}
            blur={2.4}
            far={3}
            color="#000"
          />
        )}
        <Sparks
          mode="ambient"
          count={mobile ? 70 : 180}
          area={[9, 6, 5]}
          size={0.075}
          speed={0.9}
        />
        <fog attach="fog" args={["#0a0a0b", 7, 14]} />
      </Suspense>
    </Canvas>
  );
}
