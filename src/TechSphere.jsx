import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';

const orbitLabels = [
  { label: 'React', position: [1.32, 0.58, 0.25] },
  { label: 'JS', position: [-1.34, 0.25, 0.28] },
  { label: 'CSS', position: [0.2, -1.32, 0.35] },
  { label: 'API', position: [-0.28, 1.32, -0.15] },
  { label: 'SQL', position: [0.88, 0.5, -0.9] },
];

function OrbitalCore() {
  const group = useRef();
  const pointer = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      pointer.current.y * 0.16,
      3,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      -pointer.current.x * 0.12,
      3,
      delta,
    );
    pointer.current.set(state.pointer.x, state.pointer.y);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#27143e"
          emissive="#5925a5"
          emissiveIntensity={0.45}
          metalness={0.72}
          roughness={0.3}
          wireframe
          transparent
          opacity={0.56}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.78, 40, 40]} />
        <meshStandardMaterial
          color="#171020"
          emissive="#35165f"
          emissiveIntensity={0.25}
          metalness={0.35}
          roughness={0.42}
        />
      </mesh>
      {orbitLabels.map((item) => (
        <Html key={item.label} position={item.position} center distanceFactor={7}>
          <span className="orbit-label">{item.label}</span>
        </Html>
      ))}
      <mesh rotation={[Math.PI / 2.8, 0.2, 0.1]}>
        <torusGeometry args={[1.42, 0.009, 8, 128]} />
        <meshBasicMaterial color="#a875ff" transparent opacity={0.52} />
      </mesh>
      <mesh rotation={[0.3, Math.PI / 2.4, 0.6]}>
        <torusGeometry args={[1.58, 0.006, 8, 128]} />
        <meshBasicMaterial color="#65e4ff" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function TechSphere() {
  let canRenderWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    canRenderWebGL = Boolean(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches === false &&
        (canvas.getContext('webgl') || canvas.getContext('webgl2')),
    );
  } catch {
    canRenderWebGL = false;
  }

  if (!canRenderWebGL) {
    return (
      <div className="sphere-fallback" aria-label="Technology sphere illustration">
        <span>React</span><span>JS</span><span>CSS</span><span>API</span>
        <div className="fallback-core">SPV</div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 40 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      aria-label="Interactive 3D technology sphere"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <pointLight position={[3, 3, 4]} color="#bd8cff" intensity={20} />
        <pointLight position={[-3, -2, -2]} color="#367aff" intensity={8} />
        <Stars radius={18} depth={4} count={70} factor={1.3} saturation={0.4} fade speed={0.2} />
        <OrbitalCore />
      </Suspense>
    </Canvas>
  );
}
