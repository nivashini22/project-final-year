import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import classes from "./Nav.module.css";
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Header = props => {
  const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://i.pinimg.com/564x/f5/00/9c/f5009cbe0d5377d503da3e892cfda5a0.jpg',
        'https://images.cnbctv18.com/wp-content/uploads/2023/04/prison.jpg?impolicy=website&width=330&height=180',
        'https://i.pinimg.com/236x/2f/25/65/2f2565eb5c84516d96c3f204fd2cb465.jpg'
        // Add more image URLs here
    ];
    const handleclick = () => {
      navigate('/login');
    }
   
   

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2400); // Change image every 0.5 seconds

        return () => clearInterval(intervalId); // Cleanup function
    }, [images.length]); // Dependency array to ensure effect runs when images change
   

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Home Page</h1>
                <button onClick={handleclick}>Login</button>
            </header>
            <div className={classes['main-image']}>
                <img src={images[currentImageIndex]} alt="table full of food"/>
            </div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p className="title">FLIP CARD</p>
                        <p>Hover Me</p>
                    </div>
                    <div className="flip-card-back">
                        <p className="title">BACK</p>
                        <p>Leave Me</p>
                    </div>
                </div>
            </div>
        </Fragment> 
    );
}

export default Header;
