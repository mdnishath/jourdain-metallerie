"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Sparks from "./Sparks";
import { STEEL, DARK_STEEL, BLACK_STEEL, EMBER } from "./materials";

/**
 * Escalier droit en acier, assemblé marche par marche selon `progressRef` (0 → 1).
 * Tout est procédural : aucun modèle à télécharger, chargement instantané.
 */

export const STEPS = 10;
const RISE = 0.3;
const RUN = 0.56;
const WIDTH = 2.1;
const TREAD_T = 0.06;

const totalH = STEPS * RISE;
const totalD = STEPS * RUN;
const theta = Math.atan2(totalH, totalD);
const stringerLen = Math.hypot(totalH, totalD) + 0.5;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Staircase({
  progressRef,
  mobile = false,
}: {
  progressRef: MutableRefObject<number>;
  mobile?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const stepRefs = useRef<(THREE.Group | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const railRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const weldPos = useRef(new THREE.Vector3(0, -999, 0));
  const weldActive = useRef(0);

  const finals = useMemo(
    () =>
      Array.from({ length: STEPS }, (_, i) => ({
        x: 0,
        y: i * RISE + RISE - TREAD_T / 2,
        z: -(i * RUN) - RUN / 2,
      })),
    [],
  );

  useFrame((state, dt) => {
    const p = clamp01(progressRef.current);
    const build = p * (STEPS + 1.6);
    let weldSet = false;

    for (let i = 0; i < STEPS; i++) {
      const g = stepRefs.current[i];
      const m = matRefs.current[i];
      if (!g || !m) continue;
      const f = finals[i];
      const li = clamp01((build - i) / 1.6);
      const e = easeOutCubic(li);
      const side = i % 2 === 0 ? -1 : 1;

      g.visible = li > 0.001;
      g.position.set(
        f.x + (1 - e) * 2.6 * side,
        f.y + (1 - e) * 2.2,
        f.z + (1 - e) * 0.6,
      );
      g.rotation.set((1 - e) * -0.5, (1 - e) * side * 0.4, (1 - e) * side * 0.7);

      // weld glow peaks as the tread lands
      const glow =
        li > 0.55 && li < 1 ? Math.sin((Math.PI * (li - 0.55)) / 0.45) : 0;
      m.emissiveIntensity = glow * 3;

      if (!weldSet && li > 0.55 && li < 1) {
        weldPos.current.set(f.x + side * 0.9, f.y, f.z);
        weldActive.current = glow;
        weldSet = true;
      }
    }
    if (!weldSet) weldActive.current = THREE.MathUtils.damp(weldActive.current, 0, 8, dt);

    if (lightRef.current) {
      lightRef.current.position.copy(weldPos.current).add(new THREE.Vector3(0, 0.25, 0));
      lightRef.current.intensity = weldActive.current * 30;
    }

    // handrail rises at the end
    if (railRef.current) {
      const rp = easeOutCubic(clamp01((p - 0.8) / 0.2));
      railRef.current.visible = rp > 0.001;
      railRef.current.position.y = (1 - rp) * 1.6;
    }

    // cinematic orbit tied to scroll + idle sway
    if (root.current) {
      const t = state.clock.elapsedTime;
      const px = mobile ? 0 : state.pointer.x * 0.12;
      root.current.rotation.y = -0.75 + p * 0.55 + Math.sin(t * 0.3) * 0.03 + px;
      root.current.position.y = -totalH / 2 + 0.2;
    }
  });

  const stringerProps = {
    rotation: [theta, 0, 0] as [number, number, number],
    position: [0, totalH / 2, -totalD / 2] as [number, number, number],
  };

  return (
    <group ref={root} position={[0, -totalH / 2 + 0.2, 0]}>
      <group position={[0, 0, totalD / 2]}>
        {/* stringers (limons) — the frame is there from the start */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * (WIDTH / 2 + 0.06), 0, 0]}>
            <mesh {...stringerProps} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.3, stringerLen]} />
              <meshStandardMaterial {...BLACK_STEEL} />
            </mesh>
          </group>
        ))}

        {/* base plate */}
        <mesh position={[0, -0.04, 0.35]} receiveShadow>
          <boxGeometry args={[WIDTH + 0.6, 0.08, 1.2]} />
          <meshStandardMaterial color="#101215" metalness={0.3} roughness={0.9} />
        </mesh>

        {/* steps */}
        {finals.map((f, i) => (
          <group
            key={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            position={[f.x, f.y, f.z]}
          >
            {/* tread */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[WIDTH, TREAD_T, RUN + 0.06]} />
              <meshStandardMaterial
                ref={(el) => {
                  matRefs.current[i] = el;
                }}
                {...STEEL}
                emissive={EMBER}
                emissiveIntensity={0}
              />
            </mesh>
            {/* anti-slip nosing */}
            <mesh position={[0, TREAD_T / 2 + 0.005, RUN / 2 + 0.01]}>
              <boxGeometry args={[WIDTH, 0.012, 0.05]} />
              <meshStandardMaterial {...DARK_STEEL} />
            </mesh>
            {/* riser */}
            <mesh position={[0, -RISE / 2, -RUN / 2 + 0.02]} castShadow>
              <boxGeometry args={[WIDTH - 0.02, RISE - TREAD_T, 0.04]} />
              <meshStandardMaterial {...DARK_STEEL} />
            </mesh>
          </group>
        ))}

        {/* handrail (garde-corps) on the right side */}
        <group ref={railRef} visible={false}>
          {finals
            .filter((_, i) => i % 2 === 0)
            .map((f, i) => (
              <mesh
                key={i}
                position={[WIDTH / 2 + 0.06, f.y + 0.5, f.z]}
                castShadow
              >
                <cylinderGeometry args={[0.018, 0.018, 1.0, 12]} />
                <meshStandardMaterial {...BLACK_STEEL} />
              </mesh>
            ))}
          <mesh
            position={[WIDTH / 2 + 0.06, totalH / 2 + 1.0, -totalD / 2]}
            rotation={[theta - Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.028, 0.028, stringerLen, 16]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
          {/* mid cable */}
          <mesh
            position={[WIDTH / 2 + 0.06, totalH / 2 + 0.55, -totalD / 2]}
            rotation={[theta - Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.008, 0.008, stringerLen - 0.2, 8]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        </group>

        {/* welding light + sparks */}
        <pointLight ref={lightRef} color={EMBER} intensity={0} distance={3.5} decay={2} />
        <Sparks
          mode="weld"
          count={mobile ? 90 : 220}
          originRef={weldPos}
          activeRef={weldActive}
          size={0.07}
          color="#ffc36a"
        />
      </group>
    </group>
  );
}
