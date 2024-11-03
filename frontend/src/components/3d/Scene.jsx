// src/components/3d/Scene.js
import React, { useRef, Suspense, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SmallWall, Wall, Desk, Chair, Floor, OfficePlant, TallOfficePlant, OfficeDisplay, AdjustableWall, Floor2, DoubleGlassDoors, BoardroomTable } from './OfficeComponents';
import Avatar from './Avatar';
import { ConferenceSeating } from './ConferenceSeating';
import { OfficeDivider } from './OfficeDivider';
import { GridHelper, AxesHelper } from 'three';
import { Sofa } from './Sofa';
import { LoungeArea } from './LoungeArea';
import { PoolTable } from './PoolTable';
import Avatar2 from './Avatar2';

function Scene({ isFirstPerson, onAvatarClick }) {
  const avatarRef = useRef();
  const controlsRef = useRef();

  const speed = 0.1;
  const { camera } = useThree();

  const keysPressed = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keysPressed.current.hasOwnProperty(e.key)) keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      if (keysPressed.current.hasOwnProperty(e.key)) keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (keysPressed.current.ArrowUp) camera.position.z -= speed;
    if (keysPressed.current.ArrowDown) camera.position.z += speed;
    if (keysPressed.current.ArrowLeft) camera.position.x -= speed;
    if (keysPressed.current.ArrowRight) camera.position.x += speed;

    if (controlsRef.current) controlsRef.current.update();
  });

  useEffect(() => {
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight />
      <pointLight position={[20, 20, 20]} />

      <Floor />
      <Wall position={[-20, 2.5, 0]} args={[0.2, 5, 40]} />
      <Wall position={[20, 2.5, 0]} args={[0.2, 5, 40]} />
      <Wall position={[0, 2.5, 20]} args={[40, 5, 0.2]} />
      <AdjustableWall position={[12.5, 2.5, -20]} width={15} />
      <AdjustableWall position={[-12.5, 2.5, -20]} width={15} />
      <Desk position={[14, 0.55, 17]} />
      <Chair position={[14, 0.5, 18]} />
      <Desk position={[12, 0.55, 16]} />
      <Chair position={[12, 0.5, 17]} />
      <Desk position={[10, 0.55, 14]} />
      <Chair position={[10, 0.5, 13]} />
      <SmallWall position={[-10, 2.5, -2]} args={[0.2, 5, 8]} />
      <SmallWall position={[-4, 2.5, -10]} args={[8, 5, 0.2]} />
      <Desk position={[-8, 0.55, -13]} />
      <Chair position={[-8, 0.5, -14]} />
      <SmallWall position={[10, 2.5, -2]} args={[0.2, 5, 8]} />
      <SmallWall position={[4, 2.5, -10]} args={[8, 5, 0.2]} />
      <Desk position={[8, 0.55, -13]} />
      <Chair position={[8, 0.5, -14]} />
      <SmallWall position={[-10, 2.5, 6]} args={[0.2, 5, 8]} />
      <SmallWall position={[-6, 2.5, 10]} args={[8, 5, 0.2]} />
      <SmallWall position={[10, 2.5, 6]} args={[0.2, 5, 8]} />
      <SmallWall position={[6, 2.5, 10]} args={[8, 5, 0.2]} />
      <Desk position={[8, 0.55, 13]} />
      <Chair position={[8, 0.5, 14]} />
      <OfficeDivider position={[15, 1, 2]} scale={1.5} />
      <OfficeDivider position={[-15, 1, 2]} scale={1.5} />
      <group position={[0, 0, -15]} rotation={[0, Math.PI / 2, 0]}>
        <OfficeDivider position={[-30, 1, 0]} scale={1.5} />
      </group>
      <OfficePlant position={[-2, 0, 5]} scale={1.5} />
      <TallOfficePlant position={[-9, 0, 12]} scale={1.5} />
      <OfficeDisplay position={[-6, 3, 9.5]} scale={4} />
      <OfficeDisplay position={[6, 3, 9.5]} scale={4} />
      <ConferenceSeating position={[0, 0, 5]} scale={1.5} />
      <ConferenceSeating position={[-5, 0, -5]} scale={1.5} />
      <ConferenceSeating position={[5, 0, -5]} scale={1.5} />
      <Suspense fallback={null}>
        <Avatar ref={avatarRef} isFirstPerson={isFirstPerson} />
      </Suspense>
      <OrbitControls ref={controlsRef} />

      {/* Avatar2 with click handler passed as prop */}
      <Avatar2 name="Sophia Harper" summary="Working on integrating a machine learning model into a customer support platform to automatically classify and prioritize support tickets based on urgency and topic" 
      onAvatarClick={onAvatarClick} />
    </>
  );
}

export default Scene;
