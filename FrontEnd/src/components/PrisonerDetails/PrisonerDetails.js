// components/Login/LoginPage.js
import React from 'react';
import PersonalDetails from './PersonalDetails';
import CaseDetails from './CaseDetails';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';  // Import external styles

function PrisonerDetails() {
  // Dummy data for illustration purposes
  const prisonerData = {
    name: 'John Doe',
    age: 30,
    
    
    // Add more personal details
  };

  const caseData = {
    caseNumber: '123456',
    charge: 'Theft',
    // Add more case details
  };

  return (
    <div className={styles['login-container']}>
      <h1 className={styles['login-heading']}>Prisoner Details</h1>
      <PersonalDetails prisonerData={prisonerData} />
      <CaseDetails caseData={caseData} />
      <Link to="/lawyerdetails" className={styles['round-button']}>
        Next
      </Link>
      
    </div>
  );
}

export default PrisonerDetails;
