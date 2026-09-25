"use client";

import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Sparks from "./Sparks";
import { brand } from "@/config/brand";

const FONT = "/fonts/bebas.woff";

/** Chiffres clés en 3D, flottant dans l'atelier. */
export default function BigText({ z, mobile = false }: { z: number; mobile?: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.position.y = (mobile ? 4.2 : 5.1) + Math.sin(t * 0.5) * 0.08;
    g.current.rotation.y = -0.22 + Math.sin(t * 0.25) * 0.05;
  });

  return (
    <group ref={g} position={[mobile ? 0 : 3.8, 5.1, z]} scale={mobile ? 0.55 : 1}>
      <Text
        font={FONT}
        fontSize={2.3}
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.55, 0]}
      >
        {`+${brand.yearsOfExperience} ANS`}
        <meshStandardMaterial color="#c9ced6" metalness={0.95} roughness={0.28} envMapIntensity={1.6} />
      </Text>
      <Text
        font={FONT}
        fontSize={0.72}
        letterSpacing={0.18}
        anchorX="center"
        anchorY="middle"
        position={[0, -1.05, 0]}
      >
        DE SAVOIR-FAIRE À CARPIQUET
        <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={1.4} toneMapped={false} />
      </Text>
      <group position={[0, -2.5, 0.5]}>
        <Sparks mode="ambient" count={120} area={[12, 6, 3]} size={0.06} speed={0.5} />
      </group>
    </group>
  );
}
