// src/pages/Home.js
import Navbar from '../components/Navbar.jsx';
import Logo from '../components/Logo.jsx';
import Scene from '../components/3d/Scene.jsx';
import { Canvas } from '@react-three/fiber';
import ChatPopup from '../components/ChatPopup.jsx';
import { useState } from 'react';

const Home = () => {
  const [isFirstPerson, setIsFirstPerson] = useState(false);

  

  const toggleFirstPerson = () => {
    setIsFirstPerson((prev) => !prev);
    console.log("Toggled to:", !isFirstPerson); // Log toggle state
  };

    return (
        <>
            <Navbar />
            <Canvas style = {{width: '100%', height: '100vh'}}>
                <Scene/>
            </Canvas>
        </>
    );
}

export default Home;
