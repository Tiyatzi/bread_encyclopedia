"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Group } from "three";

interface EarthProps {
  onClick?: () => void;
  children?: React.ReactNode;
  texturePath: string;
  autoRotate?: boolean;
}

export interface EarthHandle {
  group: Group | null;
}

const Earth = forwardRef<EarthHandle, EarthProps>(function Earth(
  { onClick, children, texturePath, autoRotate = true },
  ref
) {
  const groupRef = useRef<Group>(null);
  const earthTexture = useTexture(texturePath);

  useImperativeHandle(ref, () => ({ group: groupRef.current }), []);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
      {children}
    </group>
  );
});

export default Earth;
