import Navbar from '../components/Navbar.jsx';
import Logo from '../components/Logo.jsx';
import Scene from '../components/3d/Scene.jsx';
import { Canvas } from '@react-three/fiber';

const Home = () => {

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