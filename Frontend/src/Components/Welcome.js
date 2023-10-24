import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Welcome.css';
import Loading from './Loading';

export default function Welcome(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a 1-second delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Clear the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="container">
                    <div className='card'>
                        <div className='container-welcome showcase'>
                            <img className='background-img' src='https://picsum.photos/200' alt='background' />
                            <h1>Welcome to our website</h1>
                            <div className='introduction'>Control personal user remotely through email.</div>
                        </div>
                        <div className='container-welcome button-block'>
                            <Link to='/main'>
                                <button className='button-52'>
                                    Enter
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
