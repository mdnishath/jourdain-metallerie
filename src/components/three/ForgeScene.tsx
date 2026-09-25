"use client";

import { Suspense, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import Staircase from "./Staircase";
import Studio from "./Studio";

export default function ForgeScene({
  progressRef,
  mobile = false,
}: {
  progressRef: MutableRefObject<number>;
  mobile?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.5 : 2]}
      shadows={!mobile}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{
        position: mobile ? [5.6, 3.4, 10.5] : [5.9, 2.8, 8.0],
        fov: mobile ? 40 : 36,
      }}
      onCreated={({ camera }) => camera.lookAt(mobile ? 0 : 0.5, mobile ? 1.1 : 0.2, 0)}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Studio shadows={!mobile} />
        <group position={[mobile ? 0 : 1.4, mobile ? 1.2 : 0, 0]}>
          <Staircase progressRef={progressRef} mobile={mobile} />
          {!mobile && (
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.55}
              scale={12}
              blur={2.2}
              far={4}
              color="#000"
            />
          )}
        </group>
        <fog attach="fog" args={["#0a0a0b", 8, 18]} />
      </Suspense>
    </Canvas>
  );
}
