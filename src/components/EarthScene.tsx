"use client";

import { Suspense, useState, useCallback, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import Earth, { EarthHandle } from "./Earth";
import Starfield from "./Starfield";
import BreadModel from "./BreadModel";
import breads, { BreadData } from "@/data/breads";
import { latLngToPosition } from "@/utils/coordinates";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useAppContext } from "@/store/AppContext";

function BreadsLayer({
  hoveredId,
  onHover,
  onSelect,
}: {
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (bread: BreadData | null) => void;
}) {
  const { filteredBreads, selectedBreadId } = useAppContext();

  const visibleSet = useMemo(
    () => new Set(filteredBreads.map((b) => b.id)),
    [filteredBreads]
  );

  return (
    <>
      {breads.map((bread) => (
        <Suspense key={bread.id} fallback={null}>
          <BreadModel
            bread={bread}
            isHovered={hoveredId === bread.id}
            isSelected={selectedBreadId === bread.id}
            dimmed={!visibleSet.has(bread.id)}
            onHoverStart={() => onHover(bread.id)}
            onHoverEnd={() => onHover(null)}
            onClick={() => onSelect(bread)}
          />
        </Suspense>
      ))}
    </>
  );
}

function flyBackToDefault(
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  animatingRef: React.MutableRefObject<boolean>
) {
  if (animatingRef.current) return;
  animatingRef.current = true;
  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);
  const endPos = new THREE.Vector3(0, 1.5, 5);
  const endTarget = new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      animatingRef.current = false;
      if (controls) {
        controls.target.copy(endTarget);
        controls.update();
        controls.enabled = true;
      }
    },
  });

  tl.to(
    startPos,
    {
      x: endPos.x, y: endPos.y, z: endPos.z,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => camera.position.copy(startPos),
    },
    0
  );
  tl.to(
    startTarget,
    {
      x: endTarget.x, y: endTarget.y, z: endTarget.z,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (controls) {
          controls.target.copy(startTarget);
          controls.update();
        }
      },
    },
    0
  );
}

/**
 * 飞向面包模型。
 * 通过 earthGroup 将模型的局部坐标转换为世界坐标，
 * 确保无论地球转到什么角度，相机都能准确对准模型。
 */
function flyToBread(
  bread: BreadData,
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  earthGroup: THREE.Group | null,
  animatingRef: React.MutableRefObject<boolean>
) {
  if (animatingRef.current) return;

  // 模型在 Earth group 局部空间的位置
  const localPos = new THREE.Vector3(
    ...latLngToPosition(bread.latitude, bread.longitude, 1.22)
  );

  // 转换为世界坐标（考虑 Earth group 的当前旋转）
  const worldPos = localPos.clone();
  if (earthGroup) {
    earthGroup.localToWorld(worldPos);
  }

  const normal = worldPos.clone().normalize();
  const cameraEnd = worldPos.clone().add(normal.clone().multiplyScalar(0.8));

  animatingRef.current = true;
  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      animatingRef.current = false;
      if (controls) {
        controls.target.copy(worldPos);
        controls.update();
        controls.enabled = true;
      }
    },
  });

  tl.to(
    startPos,
    {
      x: cameraEnd.x, y: cameraEnd.y, z: cameraEnd.z,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => camera.position.copy(startPos),
    },
    0
  );
  tl.to(
    startTarget,
    {
      x: worldPos.x, y: worldPos.y, z: worldPos.z,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (controls) {
          controls.target.copy(startTarget);
          controls.update();
        }
      },
    },
    0
  );
}

function SceneContent() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const earthRef = useRef<EarthHandle>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isAnimating = useRef(false);
  const { selectedBreadId, setSelectedBread, earthTexturePath, background } = useAppContext();

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
    document.body.style.cursor = id ? "pointer" : "default";
  }, []);

  const handleSelect = useCallback(
    (bread: BreadData | null) => {
      if (!bread) {
        setSelectedBread(null);
        flyBackToDefault(camera, controlsRef.current, isAnimating);
      } else if (selectedBreadId === bread.id) {
        setSelectedBread(null);
        flyBackToDefault(camera, controlsRef.current, isAnimating);
      } else {
        setSelectedBread(bread.id);
        flyToBread(
          bread,
          camera,
          controlsRef.current,
          earthRef.current?.group ?? null,
          isAnimating
        );
      }
    },
    [camera, selectedBreadId, setSelectedBread]
  );

  const handleEarthClick = useCallback(() => {
    if (selectedBreadId) {
      setSelectedBread(null);
      document.body.style.cursor = "default";
      flyBackToDefault(camera, controlsRef.current, isAnimating);
    }
  }, [camera, selectedBreadId, setSelectedBread]);

  // 选中面包时停止自转，取消选中时恢复
  const autoRotate = !selectedBreadId;

  return (
    <>
      <color attach="background" args={["#020210"]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} />
      <directionalLight position={[-5, -1, -3]} intensity={0.4} />

      <Suspense fallback={null}>
        <Starfield background={background} />
      </Suspense>
      <Suspense fallback={null}>
        <Earth
          ref={earthRef}
          onClick={handleEarthClick}
          texturePath={earthTexturePath}
          autoRotate={autoRotate}
        >
          <BreadsLayer
            hoveredId={hoveredId}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        </Earth>
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={12}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <SceneContent />
    </Canvas>
  );
}
