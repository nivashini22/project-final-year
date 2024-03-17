// components/Login/CaseDetails.js
import React from 'react';
import styles from './styles.module.css'; // Import external styles

function CaseDetails({ caseData }) {
  return (
    <div className={styles["details-container"]}>
      <h2 className={styles['details-heading']}>Case Details</h2>
      <p className={styles['details-content']}>Case Number: {caseData.caseNumber}</p>
      <p className={styles['details-content']}>Charge: {caseData.charge}</p>
      {/* Add more case details here */}
    </div>
  );
}

export default CaseDetails;
