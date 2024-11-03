// src/pages/Home.js
import Navbar from '../components/Navbar.jsx';
import Logo from '../components/Logo.jsx';
import Scene from '../components/3d/Scene.jsx';
import { Canvas } from '@react-three/fiber';
import ChatPopup from '../components/ChatPopup.jsx';
import { useState } from 'react';
import PeopleInteraction from '../functions/PeopleInteraction.jsx';

const Home = () => {

  // first person view
  const [isFirstPerson, setIsFirstPerson] = useState(false);
  const toggleFirstPerson = () => {
    setIsFirstPerson((prev) => !prev);
    console.log("Toggled to:", !isFirstPerson); // Log toggle state
  };

  // show people interaction pop up
  const [showPeopleInteraction, setShowPeopleInteraction] = useState(false);
  const handleLogoClick = () => {
    setShowPeopleInteraction(true);
  };
  const handleClosePeopleInteraction = () => {
    setShowPeopleInteraction(false);
  };

    return (
        <>
            <Navbar />
            <Canvas style = {{width: '100%', height: '100vh'}}>
                <Scene/>
            </Canvas>
            <ChatPopup />
        </>
    );
}

export default Home;
