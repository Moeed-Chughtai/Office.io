// src/components/3d/Avatar.js
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// import { throttle } from '../../utils/throttle';
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

function Avatar({ isFirstPerson }) {
  const avatarRef = useRef();
  const { camera } = useThree();

  const speed = 0.05;
  const rotationSpeed = 0.03;
  const keysPressed = useRef({ forward: false, backward: false, left: false, right: false });

  const logFirstPerson = throttle((mode) => console.log("Avatar: First-person mode:", mode), 1000); // 1 second delay

  useEffect(() => {
    logFirstPerson(isFirstPerson); // Throttled log for first-person mode
  }, [isFirstPerson]);

  // Set up event listeners for keyboard controls
  useEffect(() => {
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

  // Update avatar's position and rotation each frame
  useFrame(() => {
    if (avatarRef.current) {
      const position = avatarRef.current.position;
      const rotation = avatarRef.current.rotation;
      const direction = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();

      // Rotate avatar based on left and right input
      if (keysPressed.current.left) rotation.y += rotationSpeed;
      if (keysPressed.current.right) rotation.y -= rotationSpeed;

      // Calculate forward/backward movement relative to the avatar's rotation
      quaternion.setFromEuler(rotation);
      direction.set(0, 0, (keysPressed.current.forward ? -1 : 0) + (keysPressed.current.backward ? 1 : 0));
      direction.applyQuaternion(quaternion);

      // Apply movement based on speed
      position.add(direction.multiplyScalar(speed));

      // Update camera position and orientation for first-person mode

    //   if (isFirstPerson) {
    //     camera.position.set(position.x, position.y + 1.5, position.z);
    //     camera.quaternion.copy(quaternion);


    //     // console.log("Camera in first-person mode", camera.position); // Log camera position in first-person
    //   } else {
    //     // console.log("Camera in third-person mode"); // Log camera behavior when in third-person
    //   }
    
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
