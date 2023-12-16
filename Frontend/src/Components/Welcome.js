import React, { useState, useEffect } from 'react';
import '../Styles/Welcome.css';
import Loading from './Loading';
import Socket from './Socket'; // Import the 'Socket' module
import Main from './Main';

export default function Welcome(props) {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        // Simulate a 1-second delay
        Socket.connect();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Clear the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    function openApp() {
        setOpen(true);
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : open ? <Main/> : (
                <div className="container">
                    <div className='card'>
                        <div className='container-welcome showcase'>
                            <img className='background-img' src='https://picsum.photos/200' alt='background' />
                            <h1>Welcome to our website</h1>
                            <div className='introduction'>Control personal user remotely through email.</div>
                        </div>
                        <div className='container-welcome button-block'>
                            <button onClick={openApp} className='button-52'>
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
