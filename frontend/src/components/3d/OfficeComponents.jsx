// src/OfficeComponents.js
import React,{useState, useRef} from 'react';
import { useTexture } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// src/components/3d/Wall.js

export function Wall({ position, args }) {
  // Load a subtle wall texture or pattern (assuming it's in your public folder)
  const wallTexture = useTexture('/bluewall.jpg'); // Replace with your texture file path

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
    // Load the texture file
    const texture = useTexture('/tiles.webp'); // Replace with the path to your texture file
  
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial map={texture} /> {/* Apply the texture */}
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

export function AdjustableWall({ position = [0, 2.5, 0], width = 10, height = 5, depth = 0.2 }) {
    // Load wall texture
    const wallTexture = useTexture('/bluewall.jpg'); // Adjust path as needed
  
    return (
      <group position={position}>
        {/* Main Wall */}
        <mesh>
          <boxGeometry args={[width, height, depth]} /> {/* Adjustable width */}
          <meshStandardMaterial map={wallTexture} /> {/* Apply texture to wall */}
        </mesh>
  
        {/* Bottom Molding */}
        <mesh position={[0, -height / 2 + 0.05, 0]}>
          <boxGeometry args={[width, 0.1, 0.1]} /> {/* Adjusted to match width */}
          <meshStandardMaterial color="#888888" /> {/* Darker color for molding */}
        </mesh>
      </group>
    );
  }


  export function Floor2() {
    // Load the texture file
    const texture = useTexture('/laminated.jpg'); // Replace with the path to your texture file
  
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -40]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial map={texture} /> {/* Apply the texture */}
      </mesh>
    );
  }


  export function DoubleGlassDoors({ position = [0, 0, 0], scale = 1 }) {
    const [isOpen, setIsOpen] = useState(false);
    const leftDoorRef = useRef();
    const rightDoorRef = useRef();
  
    // Toggle the open state on click
    const handleDoorClick = () => {
      setIsOpen((prev) => !prev);
    };
  
    // Slide doors open or closed on each frame
    useFrame(() => {
      if (leftDoorRef.current && rightDoorRef.current) {
        leftDoorRef.current.position.x = isOpen ? -0.8 : -0.4;
        rightDoorRef.current.position.x = isOpen ? 0.8 : 0.4;
      }
    });
  
    return (
      <group position={position} scale={scale} onClick={handleDoorClick}>
        {/* Left Door */}
        <group ref={leftDoorRef}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.4, 1, 0.05]} /> {/* Wider and shorter */}
            <meshStandardMaterial color="#87ceeb" opacity={0.3} transparent metalness={0.3} roughness={0.1} />
          </mesh>
  
          {/* Left Handle */}
          <mesh position={[0.15, 0.5, 0.03]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 32]} />
            <meshStandardMaterial color="#888888" />
          </mesh>
        </group>
  
        {/* Right Door */}
        <group ref={rightDoorRef}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.4, 1, 0.05]} />
            <meshStandardMaterial color="#87ceeb" opacity={0.3} transparent metalness={0.3} roughness={0.1} />
          </mesh>
  
          {/* Right Handle */}
          <mesh position={[-0.15, 0.5, 0.03]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 32]} />
            <meshStandardMaterial color="#888888" />
          </mesh>
        </group>
      </group>
    );
  }

export default OfficeDisplay;


