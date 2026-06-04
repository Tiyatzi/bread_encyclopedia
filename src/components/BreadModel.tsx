"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { assetPath } from "@/lib/basePath";
import { useFrame } from "@react-three/fiber";
import {
  Object3D,
  Quaternion,
  Vector3,
  Mesh,
  RingGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Material,
} from "three";
import { latLngToPosition } from "@/utils/coordinates";
import { BreadData } from "@/data/breads";

const up = new Vector3(0, 1, 0);
const _quat = new Quaternion();
const _normal = new Vector3();

interface BreadModelProps {
  bread: BreadData;
  isHovered: boolean;
  isSelected: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const glowGeo = new RingGeometry(0.04, 0.14, 32);

export default function BreadModel({
  bread,
  isHovered,
  isSelected,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onClick,
}: BreadModelProps) {
  const groupRef = useRef<Object3D>(null);

  const position = useMemo(
    () => latLngToPosition(bread.latitude, bread.longitude, 1.22),
    [bread.latitude, bread.longitude]
  );

  const rotation = useMemo(() => {
    _normal.set(...position).normalize();
    _quat.setFromUnitVectors(up, _normal);
    return _quat;
  }, [position]);

  const { scene } = useGLTF(assetPath(bread.modelPath));
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  const glowRotation = useMemo(() => {
    _normal.set(...position).normalize();
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 0, 1), _normal);
    return q;
  }, [position]);

  const glowMaterial = useMemo(() => {
    const color = isSelected ? "#ffd700" : "#f59e0b";
    return new MeshBasicMaterial({
      color,
      side: DoubleSide,
      transparent: true,
      opacity: isSelected ? 0.7 : 0.45,
      depthWrite: false,
    });
  }, [isSelected]);

  const targetScale = isHovered ? 1.35 : 1;
  const currentScale = useRef(1);
  const dimmedOpacity = useRef(0.15);

  useFrame((_, delta) => {
    currentScale.current +=
      (targetScale - currentScale.current) * Math.min(delta * 8, 1);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    const targetDimmed = dimmed ? 0.12 : 1;
    dimmedOpacity.current +=
      (targetDimmed - dimmedOpacity.current) * Math.min(delta * 6, 1);

    clonedScene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat: Material) => {
          if ("opacity" in mat && "transparent" in mat) {
            mat.opacity = dimmedOpacity.current;
            mat.transparent = true;
            mat.depthWrite = dimmedOpacity.current > 0.5;
          }
        });
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={rotation}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (!dimmed) onHoverStart();
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onHoverEnd();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!dimmed) onClick();
      }}
    >
      {(isHovered || isSelected) && !dimmed && (
        <mesh
          geometry={glowGeo}
          material={glowMaterial}
          quaternion={glowRotation}
          position={[0, 0.01, 0]}
          renderOrder={1}
        />
      )}

      <primitive object={clonedScene} scale={bread.modelScale ?? 0.08} />
    </group>
  );
}
