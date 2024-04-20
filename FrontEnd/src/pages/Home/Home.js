import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import classes from "./Home.module.css";
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Header = props => {
  const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg',
        'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1421903.jpg&fm=jpg',
        'https://images.pexels.com/photos/804172/pexels-photo-804172.jpeg?cs=srgb&dl=pexels-rakicevic-nenad-804172.jpg&fm=jpg'
        // Add more image URLs here
    ];
    const handleclick = () => {
      navigate('/login');
    }
    const handleclickadmin = () => {
        navigate('/admin/login');
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
                <button class='logbutton' onClick={handleclickadmin}>Admin</button>
                <button class='logbutton1' onClick={handleclick}>Users</button>
            </header>
            <div className={classes['main-image']}>
                <img src={images[currentImageIndex]} alt="table full of food" className={classes['half-image']}/>
            </div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p className="title">Every saint has a past, and every sinner has a future</p>
                        <p>-Oscar Wilde</p>
                    </div>
                    <div className="flip-card-back">
                        <p className="title">It's never too late to be what you might have been.</p>
                        <p>-George Eliot</p>
                    </div>
                </div>
            </div>
        </Fragment> 
    );
}

export default Header;