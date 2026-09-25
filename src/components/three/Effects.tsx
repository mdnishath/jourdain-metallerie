"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/** Bloom sur les émissifs (soudure, lampes, foyer) + vignette cinéma. Desktop uniquement. */
export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.2}
        mipmapBlur
        radius={0.6}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.75} />
    </EffectComposer>
  );
}
