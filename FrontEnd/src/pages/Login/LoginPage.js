import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const LoginPage = ({ type }) => {
  const navigate = useNavigate();
  const [selectedLogin, setSelectedLogin] = useState('prisoner');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
      method: "post",
      body: JSON.stringify({ name, password, type: type === 'admin' ? 'ADMIN' : selectedLogin.toUpperCase() }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const user = await result.json();
    console.log(user);
    if (user && user._id) {
      sessionStorage.removeItem("user");
      sessionStorage.setItem("user", JSON.stringify(user));
      if (user && user.type === 'PRISONER') {
        navigate(`/users/prisoner/${user._id}`);
      } else if (user && user.type === 'LAWYER') {
        navigate(`/users/lawyer/${user._id}`);
      } else if (user && user.type === 'COUNSELOR') {
        navigate(`/users/counselor/${user._id}`);
      } else if (user && user.type === 'ADMIN') {
        navigate(`/dashboard/prisoners`);
      } else {
        navigate(`/profile`);
      } 
      return;
    } else {
      alert("Please enter correct details");
    }
  }

  useEffect(() => {
    const userFromStorage = sessionStorage.getItem('user');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      console.log('user.type ', user.type)
      if (user && user.type === 'PRISONER') {
        navigate(`/users/prisoner/${user._id}`);
      } else if (user && user.type === 'LAWYER') {
        navigate(`/users/lawyer/${user._id}`);
      } else if (user && user.type === 'COUNSELOR') {
        navigate(`/users/counselor/${user._id}`);
      } else if (user && user.type === 'ADMIN') {
        navigate(`/dashboard/prisoners`);
      } else {
        navigate(`/profile`);
      } 
      return;
    }
  }, [])

  const handleLoginSelection = (loginType) => {
    setSelectedLogin(loginType);
  };

  return (
    <div className="login-container">
        <div class='frontlogin wrap'>
          <div class="h1">{type == 'admin' ? 'Admin' : selectedLogin.charAt(0).toUpperCase() + selectedLogin.slice(1)} Login</div>
          <form>
            <h5>Name</h5>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='logbtn'
              type="submit"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </form>
          {type === 'admin'
            ?
            <></>
            :
            <div class="radio-inputs">
              <label class="radio">
                <input type="radio" name="radio" value="prisoner"
                  checked={selectedLogin === 'prisoner'}
                  onChange={() => handleLoginSelection('prisoner')}
                />
                <span class="name">Prisoner</span>
              </label>
              <label class="radio">
                <input type="radio" name="radio" value="lawyer"
                  checked={selectedLogin === 'lawyer'}
                  onChange={() => handleLoginSelection('lawyer')}
                />
                <span class="name">Lawyer</span>
              </label>

              <label class="radio">
                <input type="radio" name="radio" value="counselor"
                  checked={selectedLogin === 'counselor'}
                  onChange={() => handleLoginSelection('counselor')}
                />
                <span class="name">Counselor</span>
              </label>
            </div>
          }
          {/* <p>
            By continuing, you agree to Library store's Conditions of Use and
            Privacy Notice.
          </p> */}

          {/* <p style={{ "text-align": "center" }}>
            Not a user? <Link to="/signup">Register here</Link>
          </p>
          <Link to="/signup">
            <button className="login__registerButton">
              Create your Account here
            </button>
          </Link> */}
        </div>
        </div>
  );
};

export default LoginPage;
