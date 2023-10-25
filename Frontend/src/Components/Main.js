import { useState, useEffect } from "react";
import Menu from "./Menu";
import "../Styles/Main.css";
import Loading from './Loading';
// import ParticlePlayground from "./ParticlePlayground";
import Mail from "./Mail";

export default function Main(props) {
    const [loading, setLoading] = useState(true);
    const [extendMenu, setExtendMenu] = useState(false);

    useEffect(() => {
        // Simulate a 1-second delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="mainContainer">
                    <Menu extendMenu={extendMenu}></Menu>
                    {/* <ParticlePlayground></ParticlePlayground> */}
                    <Mail></Mail>
                </div>

            )}
        </>
    );
}