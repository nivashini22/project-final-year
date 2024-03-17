// CounselorsList.js

import React from 'react';
import './CounselorsList.css';

const CounselorsList = ({ counselors, searchedNeed }) => {
  // Filter counselors based on the searched need for rehabilitation
  const filteredCounselors = counselors.filter(counselor =>
    counselor.counselingNeed.toLowerCase().includes(searchedNeed.toLowerCase())
  );

  // Sort counselors based on expertise or any relevant property
  const sortedCounselors = filteredCounselors.sort((a, b) => b.expertiseLevel - a.expertiseLevel);

  return (
    <div className='ccontainer'>
      <h2 className='cheading'>Counselors List</h2>
      {sortedCounselors.length === 0 ? (
        <p className='cp'>No counselors found for the searched counseling need.</p>
      ) : (
        <ul className='cul'>
          {sortedCounselors.map(counselor => (
            <li className='cli' key={counselor.id}>
              <strong className='cstrong'>{counselor.name}</strong>
              <p className='cp'>Counseling need: {counselor.counselingNeed}</p>
              <p className='cp'>Expertise: {counselor.expertise}</p>

              <p className='cp'>Expertise Level: {counselor.expertiseLevel}</p>
              {/* Add more counselor details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CounselorsList;
