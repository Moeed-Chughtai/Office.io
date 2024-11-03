// src/components/3d/Avatar2.js
import React, { useRef, useState } from 'react';
import PeopleInteraction from '../../functions/PeopleInteraction';

function Avatar2({ name, summary }) {
  const avatarRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <group ref={avatarRef} position={[0, 1, 0]} onClick={handleClick}>
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

      {/* Popup */}
      {showPopup && (
        <PeopleInteraction name={name} summary={summary} onClose={handleClose} />
      )}
    </>
  );
}

export default Avatar2;
