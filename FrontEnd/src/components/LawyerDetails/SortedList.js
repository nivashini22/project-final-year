// App.js

import React, { useState } from 'react';
import LawyersList from './LawyersList';
import styles from './SortedList.css';
import { Link } from 'react-router-dom';

const SortedList = () => {
  const [searchedCase, setSearchedCase] = useState('');
  const lawyers = [
    { id: 1, name: 'Jennifer Baker', specialization: 'Criminal law', review: 4.5 },
    { id: 2, name: 'Robert Clark', specialization: 'Family Law', review: 4.2 },
    { id: 3, name: 'Alexandra Turner', specialization: 'Civil Law', review: 4.8 },
    { id: 4, name: 'William Foster', specialization: 'Real Estate Law', review: 4.1 },
    { id: 5, name: 'Amanda White', specialization: 'Criminal law', review: 4.6 },
    { id: 6, name: 'Samuel Davis', specialization: 'Civil Law', review: 4.3 },
    { id: 7, name: 'Emily Martinez', specialization: 'Real Estate Law', review: 3.9 },
    { id: 8, name: 'Christopher Reed', specialization: 'Corporate Law', review: 4.7 },
    { id: 9, name: 'Jessica Turner', specialization: 'Civil Law', review: 3.9 },
    { id: 10, name: 'Michael Rivera', specialization: 'Civil Law', review: 4.2 },
    { id: 11, name: 'Victoria Thompson', specialization: 'Criminal law', review: 4.7 },
    { id: 12, name: 'Jordan Cooper', specialization: 'Real Estate Law', review: 4.1 },
    { id: 13, name: 'Isaac Harris', specialization: 'Family Law', review: 3.5 },
    { id: 14, name: 'Olivia Brown', specialization: 'Intellectual Property Law', review: 4.0 },
    { id: 15, name: 'Nathan Hughes', specialization: 'Criminal law', review: 4.3 },
    { id: 16, name: 'Sophia Reynolds', specialization: 'Real Estate Law', review: 4.6 },
    { id: 17, name: 'Elijah Turner', specialization: 'Intellectual Property Law', review: 3.9 },
    { id: 18, name: 'Abigail Miller', specialization: 'Corporate Law', review: 4.2 },
    { id: 19, name: 'Daniel Baker', specialization: 'Corporate Law', review: 4.7 },
    { id: 20, name: 'Emma Foster', specialization: 'Criminal law', review: 4.1 },
  ];

  const handleSearch = event => {
    setSearchedCase(event.target.value);
  };

  return (
    <div className='sldiv'>
      <h1 className='sloheading'>Empowering Futures, Restoring Lives: Advocating for Rehabilitation of Undertrial Prisoners</h1>
      <img className='sloimage' src="https://static.wixstatic.com/media/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg" alt="Justice Scale Icon" ></img>

      <input
      className='slinput'
     
        type="text"
        placeholder="Search for a case..."
        value={searchedCase}
        onChange={handleSearch}
      />
      <LawyersList lawyers={lawyers} searchedCase={searchedCase} />
      <Link to="/counselordetails" className='round-button'>
        Next
      </Link>
    </div>
  );
};

export default SortedList;
