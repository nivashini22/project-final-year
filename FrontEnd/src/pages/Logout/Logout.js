import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        return navigate('/login');
    }, [])
    
    return <></>
}

export default Logout
