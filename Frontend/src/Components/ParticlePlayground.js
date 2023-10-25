import '../Styles/ParticlePlayground.css';
import { useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticlePlayground(props) {
    const particlesInit = useCallback(async engine => {
        console.log("engine init:", engine);
        await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async (container) => {
        await console.log("container init:", container);
    }, []);
    const particlesOptions = {}
    return (
        <>
            <div className="playgroundContainer">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={particlesOptions}
                >
                </Particles>
            </div>
        </>
    )
}