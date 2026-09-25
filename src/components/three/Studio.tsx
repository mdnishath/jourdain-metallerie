"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { EMBER } from "./materials";

/**
 * Éclairage "atelier" partagé : un environnement HDR généré en code
 * (pas de fichier à télécharger) pour des reflets métalliques crédibles.
 */
export default function Studio({ shadows = true }: { shadows?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#e8ecf3"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.8} color="#9fb3d1" />
      <pointLight position={[-3, -1, 3]} intensity={6} color={EMBER} distance={9} decay={2} />

      <Environment resolution={256} frames={1}>
        <group>
          {/* big soft top light */}
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[10, 10, 1]}
            color="#dfe6f0"
          />
          {/* cool side strips for chrome highlights */}
          <Lightformer
            form="rect"
            intensity={2.5}
            position={[-8, 1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.2, 8, 1]}
            color="#b9c8de"
          />
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[8, 2, -2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.2, 8, 1]}
            color="#ffffff"
          />
          {/* warm forge glow from below/back */}
          <Lightformer
            form="ring"
            intensity={2.2}
            position={[0, -4, -6]}
            scale={[6, 6, 1]}
            color={EMBER}
          />
        </group>
      </Environment>
    </>
  );
}
