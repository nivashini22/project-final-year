import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './SelectCounselors.css';

function SelectCounselors() {
  const [userData, setUserData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [searchedCounselor, setSearchedCounselor] = useState('');
  const [sortedCounselors, setSortedCounselors] = useState([]);

  const [counselors, setCounselors] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    let user_id = ''
    if (params && params.user_id) {
      user_id = params.user_id
    } else {
      let userFromStorage = sessionStorage.getItem('user');
      userFromStorage = JSON.parse(userFromStorage);
      user_id = userFromStorage._id
    }
    if (!user_id) {
      return navigate('/login')
    }
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user_id}`)
    const user = await result.json();
    console.log(user);
    user.photo = user.photo ? user.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRynyvvPOS4gcG8x1DtUCOgoPMFnn56yDEzhw&usqp=CAU';
    setUserData(user);
    setCaseData(user.isPrisoner.case)
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/counselors`)
    response = await response.json();
    if (user.isPrisoner.case.counselor_id) {
      response = response.filter(counselor => counselor._id == user.isCounselor.case.counselor_id)
      setCounselors(response);
      setSortedCounselors(response)
    } else {
      response = response.sort((a, b) => b.isCounselor.expertiseLevel - a.isCounselor.expertiseLevel);
      setCounselors(response);
      setSortedCounselors(response)
    }
  }

  const searchCounselor = (event) => {
    const searchTxt = event.target.value;
    setSearchedCounselor(searchTxt)
    const filteredLawyers = counselors && counselors.filter(counselor =>
      counselor.isCounselor.counselingNeed.toLowerCase().includes(searchTxt.toLowerCase())
    )
    const res = filteredLawyers.sort((a, b) => b.isCounselor.expertiseLevel - a.isCounselor.expertiseLevel);
    setSortedCounselors(res)
  }

  const selectCounselor = async (id) => {
    console.log(id)
    const requested_prisoner = {
      user_id: userData._id,
      isAccepted: false,
      isAnswered: false
    }
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/counselor/request`, {
      method: "put",
      body: JSON.stringify({
        _id: id,
        requested_prisoner
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await result.json();
    const res = counselors.map(counselor => {
      if (counselor._id == id) {
        counselor.isCounselor.requested_prisoners.push(requested_prisoner);
      }
      return counselor;
    })
    setCounselors(res);
    console.log(counselors)
  }

  const isSelected = (counselor) => {
    return counselor.isCounselor.requested_prisoners.find(prisoner => prisoner.user_id == userData._id) || false;
  }

  return (
    <div className='bg-dark ' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='sldiv'>
        <h1 className='sloheading'>Guiding Paths to Redemption: Empowering Lives Through Rehabilitation and Renewed Hope</h1>
        <img className='sloimage' src="https://4.imimg.com/data4/RI/QB/MY-23084548/one-to-one-counselling-service-500x500.jpg" alt="Justice Scale Icon" ></img>
        <input
          className='slinput'
          type="text"
          placeholder="Search for a counseling need..."
          value={searchedCounselor}
          onChange={searchCounselor}
        />
        <div className='ldiv'>
          <h2 className='lheading'>Counselors List</h2>
          {sortedCounselors.length === 0 ? (
            <p className='lp'>No counselors found for the searched counseling need.</p>
          ) : (
            <ul className='lul'>
              {sortedCounselors && sortedCounselors.map(counselor => (
                <li className='lli' key={counselor._id}>
                  <strong className='lstrong'>{counselor.name}</strong>
                  <p className='lp'>Counseling need: {counselor.isCounselor.counselingNeed}</p>
                  <p className='lp'>Expertise: {counselor.isCounselor.expertise}</p>
                  <p className='lp'>Expertise Level: {counselor.isCounselor.expertiseLevel}</p>
                  <div className='w-100  text-center'>
                    {isSelected(counselor) ?
                      isSelected(counselor).isAnswered ?
                        isSelected(counselor).isAccepted ?
                          <span className='badge text-bg-success'>Accepted</span>
                          :
                          <span className='badge text-bg-danger'>Declined</span>
                        :
                        <span className='badge text-bg-dark'>Selected</span>
                      :
                      <button className='lp btn btn-info' onClick={() => selectCounselor(counselor._id)}>Select</button>
                    }
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {userData && userData._id
          ?
          <Link to={`/users/prisoner/${userData._id}/lawyers`} className='btn btn-primary round-button'>
            Select Lawyer
          </Link>
          :
          <></>}

      </div>

    </div>
  )
}

export default SelectCounselors;
