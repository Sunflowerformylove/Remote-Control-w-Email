import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "../Styles/Main.css";
import Loading from './Loading';

export default function Main() {
    const [loading, setLoading] = useState(true);

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
                    <Menu></Menu>
                </div>

            )}
        </>
    );
}