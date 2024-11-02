// src/OfficeComponents.js
import React from 'react';
import { useTexture } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

// src/components/3d/Wall.js

export function Wall({ position, args }) {
  // Load a subtle wall texture or pattern (assuming it's in your public folder)
  const wallTexture = useTexture('/brick.jpg'); // Replace with your texture file path

  return (
    <group position={position}>
      {/* Main Wall */}
      <mesh>
        <boxGeometry args={args} />
        <meshStandardMaterial map={wallTexture} /> {/* Apply texture to the wall */}
      </mesh>

      {/* Bottom Molding */}
      <mesh position={[0, -args[1] / 2 + 0.05, 0]}>
        <boxGeometry args={[args[0], 0.1, 0.1]} /> {/* Adjust size as needed */}
        <meshStandardMaterial color="#888888" /> {/* Darker color for molding */}
      </mesh>

      
      {/* <mesh position={[0, args[1] / 4, 0.02]}>
        <boxGeometry args={[1, 1.2, 0.05]} /> 
        <meshStandardMaterial color="#444444" /> 
      </mesh>
      
      <mesh position={[0, args[1] / 4, 0.03]}>
        <boxGeometry args={[0.9, 1.1, 0.01]} />
        <meshStandardMaterial color="#87ceeb" opacity={0.4} transparent /> 
      </mesh> */}
    </group>
  );
}

export function SmallWall({ position, args = [5, 5, 0.2] }) {
    return (
      <group position={position}>
        {/* Main Wall with Glass Effect */}
        <mesh>
          <boxGeometry args={args} />
          <meshStandardMaterial
            color="#87ceeb"         // Light blue tint for glass effect
            opacity={0.4}           // Low opacity for higher transparency
            transparent={true}      // Enable transparency
            roughness={0.05}        // Low roughness for a polished, smooth surface
            metalness={0.8}         // High metalness for reflectivity
            reflectivity={0.9}      // High reflectivity for a glass-like appearance
          />
        </mesh>
  
        {/* Bottom Molding with Glass Effect */}
        <mesh position={[0, -args[1] / 2 + 0.05, 0]}>
          <boxGeometry args={[args[0], 0.1, 0.1]} /> {/* Adjust size as needed */}
          <meshStandardMaterial
            color="#87ceeb"
            opacity={0.3}
            transparent={true}
            roughness={0.1}
            metalness={0.9}
            reflectivity={0.9}
          />
        </mesh>
      </group>
    );
  }
 
  

// Desk Component
export function Desk({ position }) {
    return (
      <group position={position}>
        {/* Desk Surface */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#964B00" /> {/* Brown color */}
        </mesh>
  
        {/* Desk Legs */}
        <mesh position={[-0.9, 0.2, -0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4A4A4A" /> {/* Dark gray for legs */}
        </mesh>
        <mesh position={[0.9, 0.2, -0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh position={[-0.9, 0.2, 0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh position={[0.9, 0.2, 0.4]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
  
        {/* Computer Monitor */}
        <mesh position={[0, 0.8, -0.3]}>
          <boxGeometry args={[0.6, 0.4, 0.05]} />
          <meshStandardMaterial color="#000000" /> {/* Black monitor screen */}
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, 0.7, -0.3]}>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#4A4A4A" /> {/* Dark gray stand */}
        </mesh>
  
        {/* Keyboard */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.2]} />
          <meshStandardMaterial color="#333333" /> {/* Dark gray keyboard */}
        </mesh>
      </group>
    );
}

// Chair Component
export function Chair({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="black" /> {/* Black color */}
    </mesh>
  );
}

// Floor Component
export function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#D2B48C" /> {/* Light brown color */}
    </mesh>
  );
}


// src/components/3d/OfficePlant.js


export function OfficePlant({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Plant Pot */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.4, 12]} />
        <meshStandardMaterial color="#8B4513" /> {/* Brown color for the pot */}
      </mesh>

      {/* Plant Stem */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#228B22" /> {/* Green color for the stem */}
      </mesh>

      {/* Leaves */}
      <mesh position={[-0.2, 0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0, 0.2, 0.4, 6]} />
        <meshStandardMaterial color="#32CD32" /> {/* Bright green for leaves */}
      </mesh>
      <mesh position={[0.2, 0.9, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0, 0.2, 0.4, 6]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[0, 0.9, -0.2]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0, 0.2, 0.4, 6]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[0, 0.9, 0.2]} rotation={[-Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0, 0.2, 0.4, 6]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
    </group>
  );
}


export function TallOfficePlant({ position = [0, 0, 0], scale = 1 }) {
    return (
      <group position={position} scale={scale}>
        {/* Smaller Plant Pot */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.3, 12]} />
          <meshStandardMaterial color="#8B4513" /> {/* Brown color for the pot */}
        </mesh>
  
        {/* Taller Plant Stem */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
          <meshStandardMaterial color="#228B22" /> {/* Green color for the stem */}
        </mesh>
  
        {/* Larger Leaves */}
        <mesh position={[-0.3, 1.6, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0, 0.3, 0.6, 6]} />
          <meshStandardMaterial color="#32CD32" /> {/* Bright green for leaves */}
        </mesh>
        <mesh position={[0.3, 1.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0, 0.3, 0.6, 6]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <mesh position={[0, 1.6, -0.3]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0, 0.3, 0.6, 6]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <mesh position={[0, 1.6, 0.3]} rotation={[-Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0, 0.3, 0.6, 6]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
      </group>
    );
  }



export function OfficeDisplay({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Screen Frame */}
      <mesh>
        <boxGeometry args={[1.8, 1, 0.1]} />  {/* Outer frame size */}
        <meshStandardMaterial color="#333333" /> {/* Dark grey frame color */}
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.6, 0.9, 0.02]} />  {/* Slightly smaller than frame */}
        <meshStandardMaterial color="#000000" emissive="#111111" /> {/* Dark screen with slight emissive light */}
      </mesh>

      {/* TV Stand */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} /> {/* Flat base for stability */}
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}

export default OfficeDisplay;


