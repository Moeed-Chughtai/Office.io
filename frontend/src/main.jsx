import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import Messaging from './components/Messaging.jsx'
import * as THREE from 'three'
import Chatbot from './components/Chatbot.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chatbot />
  </StrictMode>,
)
