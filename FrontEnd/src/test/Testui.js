import React from 'react';
import { Link } from 'react-router-dom';
import './Testui.css'; 


import test1Image from '../images/test1.jpeg';
import test2Image from '../images/test2.jpg';
import test3Image from '../images/test3.jpg';
import test4Image from '../images/test4.jpg';
import test5Image from '../images/test5.jpg';


const TestCard = ({ testName, test, image, route }) => {
  return (
    <div className="card">
    <Link to={route} className="card-link">
    
      <img src={image} alt={testName} className="test-image" />
      <h2>{testName}</h2>
      <h3>{test}</h3>
      
   
    </Link>
    </div>
  );
};


const TestUI = () => {
  return (
    <div>
      <h1 className="header">Explore Your Personality: Begin Your Psychometric Journey</h1>
      <h2 className="subheader">Take our tests to discover more about yourself</h2>
      <div className="test-ui">
        <TestCard test="Beck Depression Inventory (BDI)" testName="Test 1" image={test1Image} route="/test/test1" />
        <TestCard test="Generalized Anxiety Disorder 7-item Scale (GAD-7)" testName="Test 2" image={test2Image} route="/test/test2" />
        <TestCard test="Stress" testName="Test 3" image={test3Image} route="/test/test3" />
        <TestCard test="Situations and Scenarios" testName="Test 4" image={test4Image} route="/test/test4" />
        <TestCard test="Anger" testName="Test 5" image={test5Image} route="/test/test5" />
      </div>
    </div>
  );
};

export default TestUI;
