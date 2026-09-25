"use client";

import Gate from "./Gate";
import { STEEL, DARK_STEEL, BLACK_STEEL } from "./materials";

/** Pros à gauche (porte industrielle sectionnelle), particuliers à droite (portail de maison). */
export default function Doors({ z }: { z: number }) {
  const panels = Array.from({ length: 7 }, (_, i) => -1.0 + i * 0.5);
  return (
    <group position={[0, 0, z]}>
      {/* industrial sectional door */}
      <group position={[-4.6, 0, 0]}>
        {[-2.35, 2.35].map((x) => (
          <mesh key={x} position={[x, 0.55, 0]} castShadow>
            <boxGeometry args={[0.3, 3.95, 0.3]} />
            <meshStandardMaterial {...BLACK_STEEL} />
          </mesh>
        ))}
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[5, 0.3, 0.3]} />
          <meshStandardMaterial {...BLACK_STEEL} />
        </mesh>
        {panels.map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow>
            <boxGeometry args={[4.4, 0.46, 0.08]} />
            <meshStandardMaterial color="#343a42" metalness={0.85} roughness={0.42} />
          </mesh>
        ))}
        {/* ribs */}
        {panels.map((y) => (
          <mesh key={`r${y}`} position={[0, y - 0.24, 0.02]}>
            <boxGeometry args={[4.4, 0.03, 0.1]} />
            <meshStandardMaterial {...DARK_STEEL} />
          </mesh>
        ))}
        <mesh position={[0, 2.2, 0.06]}>
          <boxGeometry args={[4.4, 0.35, 0.02]} />
          <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* residential gate on a low wall */}
      <group position={[4.6, 0, 0]}>
        <mesh position={[0, -1.15, 0]} receiveShadow>
          <boxGeometry args={[5.2, 0.5, 0.6]} />
          <meshStandardMaterial color="#1c1e22" roughness={0.9} />
        </mesh>
        <group position={[0, 0.1, 0]} scale={0.95}>
          <Gate parallax={false} />
        </group>
        {/* lantern on the pillar */}
        <mesh position={[2.1, 1.75, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#fff2dc" emissive="#ffd9a3" emissiveIntensity={4} toneMapped={false} />
        </mesh>
        <mesh position={[2.1, 1.75, 0]}>
          <boxGeometry args={[0.28, 0.32, 0.28]} />
          <meshStandardMaterial {...STEEL} transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}
