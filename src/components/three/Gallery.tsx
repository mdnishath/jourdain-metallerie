"use client";

import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STEEL } from "./materials";

const FONT = "/fonts/bebas.woff";

import { WORKS } from "@/config/works";

/** Plaques d'acier flottantes de part et d'autre du couloir, la caméra passe entre elles. */
export default function Gallery({ z }: { z: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      c.position.y = 1.25 + Math.sin(t * 0.6 + i * 1.3) * 0.08;
    });
  });

  return (
    <group ref={group}>
      {WORKS.map((w, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const x = side * 3.4;
        const zz = z - i * 3.1;
        return (
          <group key={w.title} position={[x, 1.25, zz]} rotation={[0, -side * 0.55, 0]}>
            {/* plate */}
            <mesh castShadow>
              <boxGeometry args={[3.4, 2.2, 0.06]} />
              <meshStandardMaterial color="#1b1e24" metalness={0.9} roughness={0.35} envMapIntensity={1.2} />
            </mesh>
            {/* brushed frame */}
            <mesh position={[0, 0, -0.02]}>
              <boxGeometry args={[3.55, 2.35, 0.02]} />
              <meshStandardMaterial {...STEEL} />
            </mesh>
            {/* rivets */}
            {[[-1.55, 0.95], [1.55, 0.95], [-1.55, -0.95], [1.55, -0.95]].map(([rx, ry], k) => (
              <mesh key={k} position={[rx, ry, 0.04]}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial {...STEEL} />
              </mesh>
            ))}
            {/* number */}
            <Text
              font={FONT}
              fontSize={1.4}
              anchorX="center"
              anchorY="middle"
              position={[0, 0.2, 0.04]}
              color="#2d3239"
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            {/* label */}
            <Text
              font={FONT}
              fontSize={0.3}
              anchorX="left"
              anchorY="bottom"
              position={[-1.55, -0.72, 0.04]}
              color="#f4f5f7"
            >
              {w.title.toUpperCase()}
            </Text>
            <Text
              font={FONT}
              fontSize={0.17}
              letterSpacing={0.12}
              anchorX="left"
              anchorY="bottom"
              position={[-1.55, -0.98, 0.04]}
              color="#ff9a3c"
            >
              {w.place.toUpperCase()}
            </Text>
            {/* accent light strip */}
            <mesh position={[0, -1.06, 0.03]}>
              <boxGeometry args={[3.4, 0.03, 0.01]} />
              <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
