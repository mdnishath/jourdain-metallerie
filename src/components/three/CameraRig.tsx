"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { world, WAYPOINTS, INTRO_POS, INTRO_LOOK } from "@/lib/world";
import { prefersReducedMotion } from "@/lib/gsap";

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function CameraRig({ mobile = false }: { mobile?: boolean }) {
  const { posCurve, lookCurve } = useMemo(() => {
    const pts = WAYPOINTS.map((w) => new THREE.Vector3(...w.pos));
    const lks = WAYPOINTS.map((w) => new THREE.Vector3(...w.look));
    return {
      posCurve: new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5),
      lookCurve: new THREE.CatmullRomCurve3(lks, false, "centripetal", 0.5),
    };
  }, []);

  const target = useRef(new THREE.Vector3(...INTRO_POS));
  const lookTarget = useRef(new THREE.Vector3(...INTRO_LOOK));
  const look = useRef(new THREE.Vector3(...INTRO_LOOK));
  const tmp = useRef(new THREE.Vector3());
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const ys = world.ys;
    const N = WAYPOINTS.length;
    if (ys.length !== N) return;

    // scroll → curve parameter t
    const y = window.scrollY;
    let i = 0;
    while (i < N - 2 && y >= ys[i + 1]) i++;
    const span = Math.max(1, ys[i + 1] - ys[i]);
    const local = THREE.MathUtils.clamp((y - ys[i]) / span, 0, 1);
    const t = (i + local) / (N - 1);

    posCurve.getPoint(t, target.current);
    lookCurve.getPoint(t, lookTarget.current);

    // hero gate opens as we approach it
    world.gate = THREE.MathUtils.clamp(y / (window.innerHeight * 0.45), 0, 1);

    // intro flight blends from far outside the gate into waypoint 0
    if (world.intro < 1) {
      const k = easeInOut(world.intro);
      tmp.current.set(...INTRO_POS);
      target.current.lerpVectors(tmp.current, target.current, k);
      tmp.current.set(...INTRO_LOOK);
      lookTarget.current.lerpVectors(tmp.current, lookTarget.current, k);
    }

    // subtle mouse parallax (desktop)
    if (!mobile) {
      target.current.x += state.pointer.x * 0.25;
      target.current.y += state.pointer.y * 0.12;
    }

    const k = reduced ? 1 : 1 - Math.exp(-dt * 4.2);
    state.camera.position.lerp(target.current, k);
    look.current.lerp(lookTarget.current, k);
    state.camera.lookAt(look.current);
  });

  return null;
}
