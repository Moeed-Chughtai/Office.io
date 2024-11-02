// src/Avatar.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Avatar() {
  const avatarRef = useRef();

  const speed = 0.05;
  const keysPressed = useRef({ forward: false, backward: false, left: false, right: false });

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') keysPressed.current.forward = true;
      if (event.key === 's') keysPressed.current.backward = true;
      if (event.key === 'a') keysPressed.current.left = true;
      if (event.key === 'd') keysPressed.current.right = true;
    };
    const handleKeyUp = (event) => {
      if (event.key === 'w') keysPressed.current.forward = false;
      if (event.key === 's') keysPressed.current.backward = false;
      if (event.key === 'a') keysPressed.current.left = false;
      if (event.key === 'd') keysPressed.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (avatarRef.current) {
      const position = avatarRef.current.position;
      const rotation = avatarRef.current.rotation;

      // Determine movement direction and update position
      let moveX = 0;
      let moveZ = 0;

      if (keysPressed.current.forward) moveZ -= speed;
      if (keysPressed.current.backward) moveZ += speed;
      if (keysPressed.current.left) moveX -= speed;
      if (keysPressed.current.right) moveX += speed;

      // Apply movement
      position.x += moveX;
      position.z += moveZ;

      // Set rotation based on direction
      if (moveX !== 0 || moveZ !== 0) {
        rotation.y = Math.atan2(moveX, moveZ); // Calculate angle based on movement direction
      }
    }
  });

  return (
    <group ref={avatarRef} position={[0, 1, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.6, 1, 0.4]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.7, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0.5, 0.7, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
      <mesh position={[0.2, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
    </group>
  );
}

export default Avatar;
