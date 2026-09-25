"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  count?: number;
  /** "ambient": particles drift up across the whole area.
   *  "weld": particles burst out of `originRef`, gated by `activeRef` (0..1). */
  mode?: "ambient" | "weld";
  area?: [number, number, number];
  originRef?: MutableRefObject<THREE.Vector3>;
  activeRef?: MutableRefObject<number>;
  size?: number;
  color?: string;
  speed?: number;
};

function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,215,130,0.95)");
  g.addColorStop(0.6, "rgba(255,120,30,0.5)");
  g.addColorStop(1, "rgba(255,106,26,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Sparks({
  count = 160,
  mode = "ambient",
  area = [8, 5, 4],
  originRef,
  activeRef,
  size = 0.09,
  color = "#ffb45c",
  speed = 1,
}: Props) {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(() => makeSprite(), []);

  const { positions, velocities, life } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const life = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * area[2];
      velocities[i * 3] = (Math.random() - 0.5) * 0.15;
      velocities[i * 3 + 1] = 0.15 + Math.random() * 0.35;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      life[i] = mode === "weld" ? 0 : Math.random() * 4;
    }
    return { positions, velocities, life };
  }, [count, area, mode]);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05) * speed;
    const p = points.current;
    if (!p) return;
    const pos = p.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const active = activeRef ? activeRef.current : 1;
    const origin = originRef?.current;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      life[i] -= dt;

      if (mode === "weld") {
        // gravity + drag
        velocities[ix + 1] -= 4.5 * dt;
        velocities[ix] *= 0.985;
        velocities[ix + 2] *= 0.985;
      }

      arr[ix] += velocities[ix] * dt;
      arr[ix + 1] += velocities[ix + 1] * dt;
      arr[ix + 2] += velocities[ix + 2] * dt;

      if (life[i] <= 0) {
        if (mode === "ambient") {
          arr[ix] = (Math.random() - 0.5) * area[0];
          arr[ix + 1] = -area[1] / 2 + Math.random() * 0.4;
          arr[ix + 2] = (Math.random() - 0.5) * area[2];
          velocities[ix] = (Math.random() - 0.5) * 0.2;
          velocities[ix + 1] = 0.12 + Math.random() * 0.4;
          velocities[ix + 2] = (Math.random() - 0.5) * 0.2;
          life[i] = 3 + Math.random() * 5;
        } else if (origin && active > 0.05 && Math.random() < active) {
          arr[ix] = origin.x + (Math.random() - 0.5) * 0.3;
          arr[ix + 1] = origin.y + 0.05;
          arr[ix + 2] = origin.z + (Math.random() - 0.5) * 0.3;
          const a = Math.random() * Math.PI * 2;
          const s = 1.2 + Math.random() * 2.4;
          velocities[ix] = Math.cos(a) * s;
          velocities[ix + 1] = 1.5 + Math.random() * 2.5;
          velocities[ix + 2] = Math.sin(a) * s;
          life[i] = 0.35 + Math.random() * 0.6;
        } else {
          // park it far away until the weld is active again
          arr[ix + 1] = -999;
          life[i] = 0.05;
        }
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={size}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
        opacity={0.95}
      />
    </points>
  );
}
