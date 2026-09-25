"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Sparks from "./Sparks";
import { STEEL, DARK_STEEL, BLACK_STEEL, EMBER } from "./materials";

/** La forge : enclume, foyer incandescent, râtelier de barres. Fin du voyage. */
export default function ForgeStation({ z, mobile = false }: { z: number; mobile?: boolean }) {
  const ember = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const origin = useRef(new THREE.Vector3(1.9, -0.95, z));
  const active = useRef(0.8);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const f = 0.75 + Math.sin(t * 7.3) * 0.12 + Math.sin(t * 13.1) * 0.08 + Math.random() * 0.06;
    if (ember.current) ember.current.emissiveIntensity = 2.2 + f * 2;
    if (light.current) light.current.intensity = 14 + f * 18;
    active.current = 0.35 + f * 0.5;
  });

  return (
    <group position={[0, 0, z]}>
      {/* anvil */}
      <group position={[-0.6, 0, 0]}>
        <mesh position={[0, -1.05, 0]} receiveShadow>
          <cylinderGeometry args={[0.42, 0.5, 0.72, 20]} />
          <meshStandardMaterial color="#3b2a1c" roughness={0.95} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 0.36, 0.55]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
        <mesh position={[0.95, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.2, 0.55, 20]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
        <mesh position={[0, -0.76, 0]}>
          <boxGeometry args={[0.9, 0.18, 0.4]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
        {/* hammer resting */}
        <mesh position={[-0.35, -0.25, 0.1]} rotation={[0.2, 0.3, 0.9]}>
          <cylinderGeometry args={[0.025, 0.03, 0.8, 10]} />
          <meshStandardMaterial color="#4a3625" roughness={0.9} />
        </mesh>
        <mesh position={[-0.05, -0.2, 0.05]} rotation={[0.2, 0.3, 0.9]}>
          <boxGeometry args={[0.16, 0.3, 0.14]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      </group>

      {/* forge hearth */}
      <group position={[1.9, 0, 0]}>
        <mesh position={[0, -1.15, 0]} receiveShadow>
          <cylinderGeometry args={[1.0, 1.1, 0.55, 28]} />
          <meshStandardMaterial color="#1a1c20" metalness={0.6} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.86, 0]}>
          <cylinderGeometry args={[0.72, 0.8, 0.08, 28]} />
          <meshStandardMaterial
            ref={ember}
            color="#3a1204"
            emissive={EMBER}
            emissiveIntensity={3}
            roughness={1}
            toneMapped={false}
          />
        </mesh>
        <pointLight ref={light} position={[0, -0.4, 0]} color="#ff7a2a" intensity={20} distance={12} decay={2} />
        <Sparks
          mode="weld"
          count={mobile ? 120 : 260}
          originRef={origin}
          activeRef={active}
          size={0.06}
          color="#ffbf6a"
          speed={0.7}
        />
        {/* chimney hood */}
        <mesh position={[0, 2.0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.4, 1.2, 4, 1, true]} />
          <meshStandardMaterial {...BLACK_STEEL} side={2} />
        </mesh>
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[0.7, 3, 0.7]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
      </group>

      {/* bar rack */}
      <group position={[-3.6, 0, -1.6]} rotation={[0, 0.4, 0]}>
        {[-0.8, 0.8].map((x) => (
          <mesh key={x} position={[x, -0.2, 0]}>
            <boxGeometry args={[0.08, 2.4, 0.08]} />
            <meshStandardMaterial {...BLACK_STEEL} />
          </mesh>
        ))}
        {[-0.9, -0.2, 0.5].map((y) => (
          <mesh key={y} position={[0, y, 0.25]}>
            <boxGeometry args={[1.7, 0.05, 0.5]} />
            <meshStandardMaterial {...DARK_STEEL} />
          </mesh>
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <mesh
            key={i}
            position={[-0.6 + (i % 5) * 0.3, -0.75 + Math.floor(i / 5) * 0.7, 0.25]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.03, 0.03, 2.6, 8]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
