// src/pages/Home.js
import Navbar from '../components/Navbar.jsx';
import Logo from '../components/Logo.jsx';
import Scene from '../components/3d/Scene.jsx';
import { Canvas } from '@react-three/fiber';
import ChatPopup from '../components/ChatPopup.jsx';
import { useState } from 'react';
import UserPopup from '../components/UserPopup.jsx'; // Import UserPopup
import SchedulePopup from '../components/SchedulePopup.jsx';
import AnnouncementPopup from '../components/AnnouncementPopup.jsx';

const Home = () => {
  // first person view
  const [isFirstPerson, setIsFirstPerson] = useState(false);
  const toggleFirstPerson = () => {
    setIsFirstPerson((prev) => !prev);
    console.log("Toggled to:", !isFirstPerson);
  };

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', summary: '' });

  // Function to handle Avatar2 clicks from Scene
  const handleAvatarClick = (name, summary) => {
    setPopupData({ name, summary });
    setShowPopup(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

    return (
        <>
            <Navbar />
            <Canvas style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }} className='bg-linear-gradient'>
                <Scene className='bg-linear-gradient'/>
            </Canvas>
            <ChatPopup />
            <SchedulePopup />
            <AnnouncementPopup />
        </>
    );
}

export default Home;
