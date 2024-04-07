import React, { useEffect } from 'react'
import { isAuthenticated } from '../../helpers/helper'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const isLoggedIn = isAuthenticated();
        if (!isLoggedIn) {
            navigate('/login')
            return;
        }
    }, [])
    
    return (
        <div>
            <Navbar/>
            <h1>Home</h1>
        </div>
    )
}

export default Home
