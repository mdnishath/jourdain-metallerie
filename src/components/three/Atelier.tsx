"use client";

import { Grid } from "@react-three/drei";
import Sparks from "./Sparks";
import { BLACK_STEEL, DARK_STEEL } from "./materials";

/**
 * L'atelier : sol, grille, poteaux, poutres IPN, lampes suspendues, poussière.
 * Tout procédural, très léger.
 */
const RINGS = [-6, -18, -30, -42, -54, -66, -78, -90];
const HALF_W = 9.5;
const BEAM_Y = 6.4;

export default function Atelier({ mobile = false }: { mobile?: boolean }) {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, -46]} receiveShadow>
        <planeGeometry args={[80, 150]} />
        <meshStandardMaterial color="#0b0c0e" roughness={0.9} metalness={0.15} />
      </mesh>
      <Grid
        position={[0, -1.41, -46]}
        args={[80, 150]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1a1e25"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#2a2f38"
        fadeDistance={48}
        fadeStrength={1.6}
        followCamera={false}
      />

      {/* structure rings */}
      {RINGS.map((z, i) => (
        <group key={z} position={[0, 0, z]}>
          {[-HALF_W, HALF_W].map((x) => (
            <mesh key={x} position={[x, 2.6, 0]} castShadow={!mobile}>
              <boxGeometry args={[0.45, 8.1, 0.45]} />
              <meshStandardMaterial {...BLACK_STEEL} />
            </mesh>
          ))}
          <mesh position={[0, BEAM_Y, 0]}>
            <boxGeometry args={[HALF_W * 2 + 0.45, 0.38, 0.38]} />
            <meshStandardMaterial {...DARK_STEEL} />
          </mesh>
          {/* diagonal braces */}
          {[-1, 1].map((s) => (
            <mesh
              key={s}
              position={[s * (HALF_W - 1.1), BEAM_Y - 0.9, 0]}
              rotation={[0, 0, s * 0.8]}
            >
              <boxGeometry args={[0.12, 2.4, 0.12]} />
              <meshStandardMaterial {...DARK_STEEL} />
            </mesh>
          ))}
          {/* longitudinal beams to the next ring */}
          {i < RINGS.length - 1 &&
            [-HALF_W, HALF_W].map((x) => (
              <mesh key={`l${x}`} position={[x, BEAM_Y, -6]}>
                <boxGeometry args={[0.3, 0.3, 12]} />
                <meshStandardMaterial {...DARK_STEEL} />
              </mesh>
            ))}
          <Lamp light={!mobile} />
        </group>
      ))}

      {/* dust in the air */}
      <group position={[0, 1.5, -44]}>
        <Sparks
          mode="ambient"
          count={mobile ? 160 : 420}
          area={[24, 8, 100]}
          size={0.045}
          color="#d9c7a8"
          speed={0.35}
        />
      </group>
    </group>
  );
}

function Lamp({ light }: { light: boolean }) {
  return (
    <group position={[0, BEAM_Y, 0]}>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2, 6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, -2.05, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 0.42, 24, 1, true]} />
        <meshStandardMaterial color="#15171a" metalness={0.8} roughness={0.5} side={2} />
      </mesh>
      <mesh position={[0, -2.15, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#fff2dc" emissive="#ffd9a3" emissiveIntensity={5} toneMapped={false} />
      </mesh>
      {light && (
        <pointLight position={[0, -2.3, 0]} intensity={14} color="#ffc98a" distance={16} decay={2} />
      )}
    </group>
  );
}
