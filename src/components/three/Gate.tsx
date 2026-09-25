"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STEEL, DARK_STEEL, BLACK_STEEL } from "./materials";

/**
 * Portail battant barreaudé, généré en code (aucun fichier 3D à charger).
 * Deux vantaux légèrement ouverts, pivotant sur leurs poteaux.
 */

const LEAF_W = 1.55;
const GAP = 0.08;
const POST_H = 2.6;
const BAR_SPACING = 0.155;

function Leaf({ side }: { side: -1 | 1 }) {
  const bars = useMemo(() => {
    const n = Math.floor((LEAF_W - 0.1) / BAR_SPACING);
    return Array.from({ length: n }, (_, i) => {
      // local x from hinge (0) to free edge (LEAF_W * side)
      const t = (i + 0.5) / n;
      const x = side * (0.06 + t * (LEAF_W - 0.12));
      // gentle arch: taller near the hinge side to read as a classic "portail"
      const arch = Math.cos((1 - t) * Math.PI * 0.5) * 0.28;
      const h = 1.85 + arch;
      return { x, h };
    });
  }, [side]);

  return (
    <group>
      {/* horizontal rails */}
      {[-0.95, -0.1, 0.75].map((y, i) => (
        <mesh key={i} position={[(side * LEAF_W) / 2, y, 0]} castShadow>
          <boxGeometry args={[LEAF_W - 0.02, 0.07, 0.05]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      ))}
      {/* frame vertical on free edge */}
      <mesh position={[side * (LEAF_W - 0.03), -0.05, 0]} castShadow>
        <boxGeometry args={[0.06, 2.15, 0.06]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {/* bars + spear tips */}
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
      {/* decorative ring near the mid rail */}
      <mesh
        position={[(side * LEAF_W) / 2, 0.32, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.16, 0.014, 8, 40]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  );
}

export default function Gate({ mobile = false }: { mobile?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const px = mobile ? 0 : state.pointer.x;
    const py = mobile ? 0 : state.pointer.y;
    // mouse parallax + idle float
    const targetY = px * 0.35 + Math.sin(t * 0.35) * 0.05;
    const targetX = -py * 0.12 + Math.sin(t * 0.5) * 0.02;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, dt);
    g.position.y = Math.sin(t * 0.6) * 0.04;

    // leaves breathe open/closed
    const open = 0.32 + Math.sin(t * 0.4) * 0.06;
    if (left.current) left.current.rotation.y = -open;
    if (right.current) right.current.rotation.y = open;
  });

  const postX = LEAF_W + GAP / 2 + 0.09;

  return (
    <group ref={group} rotation={[0, 0.25, 0]}>
      {/* pillars */}
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

      {/* left leaf hinged on left pillar */}
      <group ref={left} position={[-(LEAF_W + GAP / 2), 0, 0]}>
        <Leaf side={1} />
      </group>
      {/* right leaf hinged on right pillar */}
      <group ref={right} position={[LEAF_W + GAP / 2, 0, 0]}>
        <Leaf side={-1} />
      </group>

      {/* ground slab */}
      <mesh position={[0, -1.36, 0.1]} receiveShadow>
        <boxGeometry args={[4.2, 0.06, 1.0]} />
        <meshStandardMaterial color="#0a0b0d" metalness={0} roughness={1} />
      </mesh>
    </group>
  );
}
