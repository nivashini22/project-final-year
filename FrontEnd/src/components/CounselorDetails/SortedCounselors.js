// App.js

import React, { useState } from 'react';
import CounselorsList from './CounselorsList';
import './SortedCounselors.css';
import { Link } from 'react-router-dom';

const SortedCounselors = () => {
  const [searchedNeed, setSearchedNeed] = useState('');
  const counselors = [
    { id: 1, name: 'Dr. Kimberly Turner', counselingNeed: 'Substance Abuse', expertise: 'Addiction Counseling', expertiseLevel: 4.5 },
  { id: 2, name: 'Dr. Jonathan Carter', counselingNeed: 'Anger Management', expertise: 'Behavioral Therapy', expertiseLevel: 4.8 },
  { id: 3, name: 'Dr. Michelle Rodriguez', counselingNeed: 'Depression', expertise: 'Cognitive-Behavioral Therapy', expertiseLevel: 3.9 },
  { id: 4, name: 'Dr. Anthony Martinez', counselingNeed: 'Anxiety', expertise: 'Mindfulness Therapy', expertiseLevel: 4.2 },
  { id: 5, name: 'Dr. Vanessa Foster', counselingNeed: 'Relationship Issues', expertise: 'Couple Counseling', expertiseLevel: 4.7 },
  { id: 6, name: 'Dr. Carlos Ramirez', counselingNeed: 'Personal Growth', expertise: 'Positive Psychology', expertiseLevel: 4.1 },
  { id: 7, name: 'Dr. Angela White', counselingNeed: 'Substance Abuse', expertise: 'Addiction Counseling', expertiseLevel: 4.5 },
  { id: 8, name: 'Dr. Samuel Miller', counselingNeed: 'Anger Management', expertise: 'Behavioral Therapy', expertiseLevel: 4.8 },
  { id: 9, name: 'Dr. Sophia Carter', counselingNeed: 'Depression', expertise: 'Cognitive-Behavioral Therapy', expertiseLevel: 3.9 },
  { id: 10, name: 'Dr. Michael Cooper', counselingNeed: 'Anxiety', expertise: 'Mindfulness Therapy', expertiseLevel: 4.2 },
  { id: 11, name: 'Dr. Jessica Turner', counselingNeed: 'Relationship Issues', expertise: 'Couple Counseling', expertiseLevel: 4.7 },
  { id: 12, name: 'Dr. Daniel Rivera', counselingNeed: 'Personal Growth', expertise: 'Positive Psychology', expertiseLevel: 4.1 },
  { id: 13, name: 'Dr. Olivia Rodriguez', counselingNeed: 'Substance Abuse', expertise: 'Addiction Counseling', expertiseLevel: 3.5 },
  { id: 14, name: 'Dr. Christopher Foster', counselingNeed: 'Anger Management', expertise: 'Behavioral Therapy', expertiseLevel: 4.0 },
  { id: 15, name: 'Dr. Sophia Brooks', counselingNeed: 'Substance Abuse', expertise: 'Addiction Counseling', expertiseLevel: 4.3 },
  { id: 16, name: 'Dr. Benjamin Hughes', counselingNeed: 'Anger Management', expertise: 'Behavioral Therapy', expertiseLevel: 4.6 },
  { id: 17, name: 'Dr. Emma Turner', counselingNeed: 'Depression', expertise: 'Cognitive-Behavioral Therapy', expertiseLevel: 3.9 },
  { id: 18, name: 'Dr. Joshua Brown', counselingNeed: 'Anxiety', expertise: 'Mindfulness Therapy', expertiseLevel: 4.2 },
  { id: 19, name: 'Dr. Sophia Davis', counselingNeed: 'Relationship Issues', expertise: 'Couple Counseling', expertiseLevel: 4.7 },
  { id: 20, name: 'Dr. Matthew Wilson', counselingNeed: 'Personal Growth', expertise: 'Positive Psychology', expertiseLevel: 4.1 },
  ];

  const handleSearch = event => {
    setSearchedNeed(event.target.value);
  };

  return (
    <div className='sdiv'>
      <h1 className='counheading'>Guiding Paths to Redemption: Empowering Lives Through Rehabilitation and Renewed Hope.</h1>
      <img className='counimage' src="https://4.imimg.com/data4/RI/QB/MY-23084548/one-to-one-counselling-service-500x500.jpg" alt="Justice Scale Icon" ></img>
      <input className='sinput'
        type="text"
        placeholder="Search for a counseling need..."
        value={searchedNeed}
        onChange={handleSearch}
      />
      <CounselorsList counselors={counselors} searchedNeed={searchedNeed} />
      <Link to="/" className='round-button'>
        Next
      </Link>
    </div>
  );
};

export default SortedCounselors;
