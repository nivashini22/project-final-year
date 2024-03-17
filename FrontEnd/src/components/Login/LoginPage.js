import React, { useState } from 'react';
import PrisonerLogin from './PrisonerLogin';
import LawyerLogin from './LawyerLogin';
import CounselorLogin from './CounselorLogin';
import './LoginPage.css';

const LoginPage = () => {
  const [selectedLogin, setSelectedLogin] = useState('prisoner');

  const handleLoginSelection = (loginType) => {
    setSelectedLogin(loginType);
  };

  return (
    <div class="container">
    <div className="login-page">
      {/* <div class="header">
  <img src="https://media.istockphoto.com/id/980041056/photo/man-in-prison-hands-of-behind-hold-steel-cage-jail-bars-offender-criminal-locked-in-jail.jpg?s=612x612&w=0&k=20&c=YNC23cS3zg81jLj5yMtu9A0l-7_5f50eVU7KqnYgTc4=" alt="Header Image" />
</div> */}

      <div className="login-container">
        <div className="login-column">
          {selectedLogin === 'prisoner' && <PrisonerLogin />}
          {selectedLogin === 'lawyer' && <LawyerLogin />}
          {selectedLogin === 'counselor' && <CounselorLogin />}
        </div>
      </div>
      {/* <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="prisoner"
            checked={selectedLogin === 'prisoner'}
            onChange={() => handleLoginSelection('prisoner')}
          />
          Prisoner
        </label>
        <label>
          <input
            type="radio"
            value="lawyer"
            checked={selectedLogin === 'lawyer'}
            onChange={() => handleLoginSelection('lawyer')}
          />
          Lawyer
        </label>
        <label>
          <input
            type="radio"
            value="counselor"
            checked={selectedLogin === 'counselor'}
            onChange={() => handleLoginSelection('counselor')}
          />
          Counselor
        </label>
      </div> */}
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
    </div>
    </div>
  );
};

export default LoginPage;
