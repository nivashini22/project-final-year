// components/Login/PrisonerDetails/PersonalDetails.js
import React from 'react';
import styles from './styles.module.css'; // Import CSS modules

function PersonalDetails({ prisonerData }) {
  return (
    <div className={styles['details-container']}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRynyvvPOS4gcG8x1DtUCOgoPMFnn56yDEzhw&usqp=CAU' className={styles['prisoner-photo']} alt='prisoner' />
      
      <h2 className={styles['details-heading']}>Personal Details</h2>
      
      <p className={styles['details-content']}>Name: {prisonerData.name}</p>
      <p className={styles['details-content']}>Age: {prisonerData.age}</p>
      {/* Add more personal details here */}
    </div>
  );
}

export default PersonalDetails;
