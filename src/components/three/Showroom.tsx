"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { STEEL, DARK_STEEL, BLACK_STEEL } from "./materials";

/** Quatre ouvrages exposés sur socles : portail coulissant, porte, garde-corps, clôture. */

function Plinth({ w = 3.4, label }: { w?: number; label?: string }) {
  return (
    <group>
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <boxGeometry args={[w, 0.22, 1.8]} />
        <meshStandardMaterial color="#14161a" metalness={0.4} roughness={0.7} />
      </mesh>
      {label && (
        <group position={[0, -1.3, 0.91]}>
          <Text font="/fonts/bebas.woff" fontSize={0.13} letterSpacing={0.12} anchorX="center" anchorY="middle" color="#cfd3d9">
            {label}
          </Text>
        </group>
      )}
      <mesh position={[0, -1.19, 0.86]}>
        <boxGeometry args={[w - 0.3, 0.006, 0.01]} />
        <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Spot({ light }: { light: boolean }) {
  const target = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(0, -0.5, 0);
    return o;
  }, []);
  if (!light) return null;
  return (
    <>
      <primitive object={target} />
      <spotLight
        position={[0, 5.2, 2.2]}
        target={target}
        intensity={90}
        angle={0.42}
        penumbra={0.7}
        color="#e9eef7"
        distance={14}
        decay={2}
        castShadow
        shadow-mapSize={[512, 512]}
      />
    </>
  );
}

function SlidingGate() {
  const slats = Array.from({ length: 9 }, (_, i) => -0.85 + i * 0.21);
  return (
    <group>
      <Plinth label="PORTAIL COULISSANT" />
      {/* frame */}
      {[[-1.55, 0], [1.55, 0]].map(([x], i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.08, 1.95, 0.08]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
      ))}
      {[-0.95, 0.95].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[3.18, 0.08, 0.08]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
      ))}
      {slats.map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <boxGeometry args={[3.05, 0.11, 0.035]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      ))}
      {/* guide rail + wheels */}
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[3.6, 0.06, 0.16]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, -1.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.12, 20]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      ))}
    </group>
  );
}

function Door() {
  return (
    <group>
      <Plinth w={2} label="PORTE MÉTALLIQUE" />
      {/* frame */}
      <mesh position={[-0.62, 0.05, 0]}>
        <boxGeometry args={[0.09, 2.35, 0.14]} />
        <meshStandardMaterial {...BLACK_STEEL} />
      </mesh>
      <mesh position={[0.62, 0.05, 0]}>
        <boxGeometry args={[0.09, 2.35, 0.14]} />
        <meshStandardMaterial {...BLACK_STEEL} />
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[1.33, 0.09, 0.14]} />
        <meshStandardMaterial {...BLACK_STEEL} />
      </mesh>
      {/* leaf */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[1.12, 2.24, 0.06]} />
        <meshStandardMaterial color="#2b3037" metalness={0.85} roughness={0.38} />
      </mesh>
      {/* vision panel */}
      <mesh position={[0, 0.55, 0.035]}>
        <boxGeometry args={[0.4, 0.7, 0.01]} />
        <meshStandardMaterial color="#8fb3d9" metalness={0.2} roughness={0.05} transparent opacity={0.55} />
      </mesh>
      {/* handle + kick plate */}
      <mesh position={[0.4, -0.1, 0.07]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.32, 12]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, -0.85, 0.035]}>
        <boxGeometry args={[1.05, 0.4, 0.01]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  );
}

function Railing() {
  const posts = [-1.4, -0.47, 0.47, 1.4];
  const bars = Array.from({ length: 19 }, (_, i) => -1.35 + i * 0.15);
  return (
    <group>
      <Plinth label="GARDE-CORPS" />
      {posts.map((x) => (
        <mesh key={x} position={[x, -0.6, 0]} castShadow>
          <boxGeometry args={[0.05, 1.15, 0.05]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
      ))}
      {bars.map((x) => (
        <mesh key={x} position={[x, -0.6, 0]}>
          <boxGeometry args={[0.014, 1.0, 0.014]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 2.95, 16]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, -1.12, 0]}>
        <boxGeometry args={[2.95, 0.04, 0.05]} />
        <meshStandardMaterial {...BLACK_STEEL} />
      </mesh>
    </group>
  );
}

function Fence() {
  const bars = Array.from({ length: 21 }, (_, i) => -1.5 + i * 0.15);
  return (
    <group>
      <Plinth label="CLÔTURE" />
      {[-1.62, 1.62].map((x) => (
        <mesh key={x} position={[x, -0.25, 0]} castShadow>
          <boxGeometry args={[0.07, 1.9, 0.07]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
      ))}
      {[-1.0, 0.45].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[3.2, 0.06, 0.05]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      ))}
      {bars.map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[0.022, 1.7, 0.022]} />
            <meshStandardMaterial {...DARK_STEEL} />
          </mesh>
          <mesh position={[0, 0.66, 0]}>
            <coneGeometry args={[0.028, 0.12, 4]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Showroom({ z, mobile = false }: { z: number; mobile?: boolean }) {
  const items = [
    { x: -6.6, el: <SlidingGate /> },
    { x: -2.2, el: <Door /> },
    { x: 2.2, el: <Railing /> },
    { x: 6.6, el: <Fence /> },
  ];
  return (
    <group position={[0, 0, z]}>
      {items.map((it, i) => (
        <group key={i} position={[it.x, 0, 0]}>
          {it.el}
          <Spot light={!mobile} />
        </group>
      ))}
    </group>
  );
}
