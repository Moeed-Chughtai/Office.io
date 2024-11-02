// src/Scene.js
import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SmallWall, Wall, Desk, Chair, Floor, OfficePlant, TallOfficePlant, OfficeDisplay } from './OfficeComponents';
import Avatar from './Avatar';
import { ConferenceSeating } from './ConferenceSeating';
import { OfficeDivider } from './OfficeDivider';
import { GridHelper, AxesHelper } from 'three';
import {Sofa} from './Sofa';
import {LoungeArea} from './LoungeArea';
import {PoolTable} from './PoolTable';

function Scene() {
  const avatarRef = useRef();
  const controlsRef = useRef();

  // Update the OrbitControls target to follow the avatar
  useFrame(() => {
    if (avatarRef.current && controlsRef.current) {
      controlsRef.current.target.copy(avatarRef.current.position);
      controlsRef.current.update();
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight />
      <pointLight position={[20, 20, 20]} />

      {/* Floor */}
      <Floor />

      {/* Main Room Walls */}
      <Wall position={[-20, 2.5, 0]} args={[0.2, 5, 40]} />
      <Wall position={[20, 2.5, 0]} args={[0.2, 5, 40]} />
      <Wall position={[0, 2.5, -20]} args={[40, 5, 0.2]} />
      <Wall position={[0, 2.5, 20]} args={[40, 5, 0.2]} />

      {/* SPECIAL ONESSSSSSSSSSSSSSSSSSSSSSSS */}

      {/* Desks and Chairs */}
      <Desk position={[14, 0.55, 17]} />
      <Chair position={[14, 0.5, 18]} />

      {/* special */}
      <Desk position={[12, 0.55, 16]} />
      <Chair position={[12, 0.5, 17]} />



      <Desk position={[10, 0.55, 14]} />
      <Chair position={[10, 0.5, 13]} />

      {/* Breakout Rooms */}
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

      {/* Dividers */}
      <OfficeDivider position={[15, 1, 2]} scale={1.5} />
      <OfficeDivider position={[-15, 1, 2]} scale={1.5} />
      <OfficeDivider position={[0, 1, -15]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />

      {/* Plants */}
      <OfficePlant position={[-2, 0, 5]} scale={1.5} />
      <TallOfficePlant position={[-9, 0, 12]} scale={1.5} />

      {/* Office Displays */}
      <OfficeDisplay position={[-6, 3, 9.5]} scale={4} />
      <OfficeDisplay position={[6, 3, 9.5]} scale={4} />

      {/* Conference Seating */}
      <ConferenceSeating position={[0, 0, 5]} scale={1.5} />
      <ConferenceSeating position={[-5, 0, -5]} scale={1.5} />
      <ConferenceSeating position={[5, 0, -5]} scale={1.5} />

      {/* Avatar */}
      <Suspense fallback={null}>
        <Avatar ref={avatarRef} />
      </Suspense>

      {/* Orbit Controls */}
      <OrbitControls ref={controlsRef} />

      {/* Helpers */}
      <primitive object={new AxesHelper(10)} />
      <primitive object={new GridHelper(50, 50)} />

      {/* Additional Chairs and Desks  */}
      {/* <Chair position={[-15, 0.5, 5]} />          */}
      <Chair position={[-15, 0.5, 0]} />
      <Chair position={[-15, 0.5, -5]} />
      <Chair position={[-15, 0.5, -10]} />

      {/* <Desk position={[-14, 0.55, 5]} /> */}
      <Desk position={[-14, 0.55, 0]} />
      <Desk position={[-14, 0.55, -5]} />
      <Desk position={[-14, 0.55, -10]} />

      <Desk position={[15, 0.55, 14]} />
      <Chair position={[15, 0.5, 13]} />

      <Desk position={[17, 0.55, 13]} />
      <Chair position={[17, 0.5, 14]} />

      <group position={[18, 0.5, 13]} rotation={[0, Math.PI / 2, 0]}>
        <Desk position={[6, 0.55, -3]} />
        <Chair position={[6, 0.5, -2]} />
        <Desk position={[7, 0.05, 0]} />
        <Chair position={[7, -0.05, 1]} />
      </group>


      <Sofa position={[0, 0.5, -15]} />

      <LoungeArea position={[15, 0, -17]} scale={1.5} />

      <PoolTable position={[0, 0, 0]} scale={2}/>

      {/* <Sofa position={[10, 0.5, -5]} /> */}
      {/* <Sofa position={[-10, 0.5, 5]} /> */}

      <group position={[0, 0, 0]} rotation={[0, Math.PI / 5, 0]}>
        <Sofa position={[-6, 0.5, -5]} scale={1.5}/>
        <Sofa position={[-8, 0.5, -2]} scale={1.5}/>
      </group>

      

      <group position={[0, 0, 0]} rotation={[0, -Math.PI / 5, 0]}>
        <Sofa position={[8, 0.5, -1]} scale={1.5}/>
        <Sofa position={[5.5, 0.5, -4]} scale={1.5}/>
      </group>

      
    </>
  );
}

export default Scene;
