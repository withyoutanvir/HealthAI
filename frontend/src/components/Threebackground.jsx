// components/ThreeBackground.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const AnimatedSphere = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y += 0.005;
    ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime()) * 0.1);
  });
  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#1E90FF" wireframe />
    </mesh>
  );
};

const ThreeBackground = () => {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full -z-10" camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <AnimatedSphere />
      <Stars radius={50} depth={50} count={5000} factor={4} fade />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default ThreeBackground;
