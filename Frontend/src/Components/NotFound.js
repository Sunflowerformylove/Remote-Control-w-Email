import React, { useEffect, useState } from 'react';
import '../Styles/NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');

    useEffect(() => {
        const randomNum = () => Math.floor(Math.random() * 9) + 1;

        let loop1, loop2, loop3, time = 30, i = 0;

        loop3 = setInterval(() => {
            if (i > 40) {
                clearInterval(loop3);
                setDigit3('4');
            } else {
                setDigit3(randomNum().toString());
                i++;
            }
        }, time);

        loop2 = setInterval(() => {
            if (i > 80) {
                clearInterval(loop2);
                setDigit2('0');
            } else {
                setDigit2(randomNum().toString());
                i++;
            }
        }, time);

        loop1 = setInterval(() => {
            if (i > 100) {
                clearInterval(loop1);
                setDigit1('4');
            } else {
                setDigit1(randomNum().toString());
                i++;
            }
        }, time);

        return () => {
            clearInterval(loop1);
            clearInterval(loop2);
            clearInterval(loop3);
        };
    }, []);

    return (
        <div className="error">
            <div className="container-floud">
                <div className="col-xs-12 ground-color text-center">
                    <div className="container-error-404">
                        <div className='clip-container'>
                            <div className="clip">
                                <div className="shadow">
                                    <span className="digit thirdDigit">{digit3}</span>
                                </div>
                            </div>
                            <div className="clip">
                                <div className="shadow">
                                    <span className="digit secondDigit">{digit2}</span>
                                </div>
                            </div>
                            <div className="clip">
                                <div className="shadow">
                                    <span className="digit firstDigit">{digit1}</span>
                                </div>
                            </div>
                        </div>
                        <div className="msg">
                            OH!<span className="triangle" />
                        </div>
                    </div>
                    <div className="text">
                        <h2 className="h1">Sorry! Page not found</h2>
                        <p>
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>
                        <Link to="/" className='link-style'> <div className='button-86'>Back To Home</div> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
