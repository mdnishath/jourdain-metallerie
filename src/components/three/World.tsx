"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { world, INTRO_POS } from "@/lib/world";
import { useIsMobile, useWebGL } from "@/lib/hooks";

/** Le monde 3D, fixé derrière toute la page. La caméra suit le scroll. */
export default function World() {
  const mobile = useIsMobile();
  const webgl = useWebGL();

  useEffect(() => {
    if (webgl === false) world.ready = true;
  }, [webgl]);

  if (webgl === false) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,106,26,0.18),transparent_55%),linear-gradient(180deg,#0a0a0b,#131417)]"
      />
    );
  }
  if (webgl === null) return null;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.5 : 1.75]}
        shadows={!mobile}
        gl={{ antialias: !mobile, powerPreference: "high-performance", stencil: false }}
        camera={{ fov: mobile ? 50 : 42, near: 0.1, far: 140, position: INTRO_POS }}
        onCreated={() => {
          // first frame → the loader can proceed
          requestAnimationFrame(() => {
            world.ready = true;
          });
        }}
      >
        <Suspense fallback={null}>
          <Experience mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
