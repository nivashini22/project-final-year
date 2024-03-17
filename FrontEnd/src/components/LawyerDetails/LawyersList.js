// LawyersList.js

import React from 'react';
import './LawyersList.css';


const LawyersList = ({ lawyers, searchedCase }) => {
  // Filter lawyers based on the searched case
  const filteredLawyers = lawyers.filter(lawyer =>
    lawyer.specialization.toLowerCase().includes(searchedCase.toLowerCase())
  );

  // Sort lawyers based on reviews (assuming the review property exists)
  const sortedLawyers = filteredLawyers.sort((a, b) => b.review - a.review);

  return (
    <div className='ldiv'>
      <h2 className='lheading'>Lawyers List</h2>
      {sortedLawyers.length === 0 ? (
        <p className='lp'>No lawyers found for the searched case.</p>
      ) : (
        <ul className='lul'>
          {sortedLawyers.map(lawyer => (
            <li className='lli' key={lawyer.id}>
              <strong className='lstrong'>{lawyer.name}</strong>
              <p className='lp'>Specialization: {lawyer.specialization}</p>
              <p className='lp'>Reviews: {lawyer.review}</p>
              {/* Add more lawyer details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LawyersList;
