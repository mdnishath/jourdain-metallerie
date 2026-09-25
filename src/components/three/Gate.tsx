"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STEEL, DARK_STEEL, BLACK_STEEL } from "./materials";

/**
 * Portail battant barreaudé, généré en code (aucun fichier 3D à charger).
 * `open` renvoie 0..1 : 0 = entrouvert, 1 = grand ouvert (la caméra peut passer).
 */

const LEAF_W = 1.55;
const GAP = 0.08;
const POST_H = 2.6;
const BAR_SPACING = 0.155;

function Leaf({ side }: { side: -1 | 1 }) {
  const bars = useMemo(() => {
    const n = Math.floor((LEAF_W - 0.1) / BAR_SPACING);
    return Array.from({ length: n }, (_, i) => {
      const t = (i + 0.5) / n;
      const x = side * (0.06 + t * (LEAF_W - 0.12));
      const arch = Math.cos((1 - t) * Math.PI * 0.5) * 0.28;
      return { x, h: 1.85 + arch };
    });
  }, [side]);

  return (
    <group>
      {[-0.95, -0.1, 0.75].map((y, i) => (
        <mesh key={i} position={[(side * LEAF_W) / 2, y, 0]} castShadow>
          <boxGeometry args={[LEAF_W - 0.02, 0.07, 0.05]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      ))}
      <mesh position={[side * (LEAF_W - 0.03), -0.05, 0]} castShadow>
        <boxGeometry args={[0.06, 2.15, 0.06]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {bars.map((b, i) => (
        <group key={i} position={[b.x, 0, 0]}>
          <mesh position={[0, b.h / 2 - 1.05, 0]} castShadow>
            <boxGeometry args={[0.03, b.h, 0.03]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
          <mesh position={[0, b.h - 1.05 + 0.08, 0]}>
            <coneGeometry args={[0.035, 0.16, 4]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>
      ))}
      <mesh position={[(side * LEAF_W) / 2, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.014, 8, 40]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  );
}

export default function Gate({
  open,
  parallax = false,
}: {
  open?: () => number;
  parallax?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (parallax) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35, 3, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 3, dt);
    }
    const o = open ? open() : 0;
    const angle = 0.28 + Math.sin(t * 0.4) * 0.04 + o * 1.05;
    if (left.current) left.current.rotation.y = THREE.MathUtils.damp(left.current.rotation.y, -angle, 4, dt);
    if (right.current) right.current.rotation.y = THREE.MathUtils.damp(right.current.rotation.y, angle, 4, dt);
  });

  const postX = LEAF_W + GAP / 2 + 0.09;

  return (
    <group ref={group}>
      {[-postX, postX].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.18, POST_H, 0.18]} />
            <meshStandardMaterial {...BLACK_STEEL} />
          </mesh>
          <mesh position={[0, POST_H / 2 - 0.02, 0]}>
            <boxGeometry args={[0.26, 0.06, 0.26]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
          <mesh position={[0, POST_H / 2 + 0.09, 0]}>
            <sphereGeometry args={[0.08, 20, 20]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>
      ))}
      <group ref={left} position={[-(LEAF_W + GAP / 2), 0, 0]}>
        <Leaf side={1} />
      </group>
      <group ref={right} position={[LEAF_W + GAP / 2, 0, 0]}>
        <Leaf side={-1} />
      </group>
    </group>
  );
}
