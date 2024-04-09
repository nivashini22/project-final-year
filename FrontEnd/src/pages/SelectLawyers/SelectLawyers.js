import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './SelectLawyers.css';

function SelectLawyers() {
  const [userData, setUserData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [searchedLawyer, setSearchedLawyer] = useState('');
  const [sortedLawyers, setSortedLawyers] = useState([]);

  const [lawyers, setLawyers] = useState([]);
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
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/lawyers`)
    response = await response.json();
    if (user.isPrisoner.case.lawyer_id) {
      response = response.filter(lawyer => lawyer._id == user.isPrisoner.case.lawyer_id)
      setLawyers(response);
      setSortedLawyers(response)
    } else {
      response = response.sort((a, b) => b.isLawyer.review - a.isLawyer.review);
      setLawyers(response);
      setSortedLawyers(response)
    }
  }

  const searchLawyer = (event) => {
    const searchTxt = event.target.value;
    setSearchedLawyer(searchTxt)
    const filteredLawyers = lawyers && lawyers.filter(lawyer =>
      lawyer.isLawyer.specialization.toLowerCase().includes(searchTxt.toLowerCase())
    )
    const res = filteredLawyers.sort((a, b) => b.isLawyer.review - a.isLawyer.review);
    setSortedLawyers(res)
  }

  const selectLawyer = async (id) => {
    console.log(id)
    const requested_prisoner = {
      user_id: userData._id,
      isAccepted: false,
      isAnswered: false
    }
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/lawyer/request`, {
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
    const res = lawyers.map(lawyer => {
      if (lawyer._id == id) {
        lawyer.isLawyer.requested_prisoners.push(requested_prisoner);
      }
      return lawyer;
    })
    setLawyers(res);
    console.log(lawyers)
  }

  const isSelected = (lawyer) => {
    return lawyer.isLawyer.requested_prisoners.find(prisoner => prisoner.user_id == userData._id) || false;
  }

  return (
    <div className='bg-dark ' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='sldiv'>
        <h1 className='sloheading'>Empowering Futures, Restoring Lives: Advocating for Rehabilitation of Undertrial Prisoners</h1>
        <img className='sloimage' src="https://static.wixstatic.com/media/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg" alt="Justice Scale Icon" ></img>
        {/* {lawyers && lawyers.length > 1 ? */}
          <input
            className='slinput'
            type="text"
            placeholder="Search for a lawyer..."
            value={searchedLawyer}
            onChange={searchLawyer}
          />
          {/* :
          <></>
        } */}

        <div className='ldiv'>
          <h2 className='lheading'>Lawyers List</h2>
          {sortedLawyers.length === 0 ? (
            <p className='lp'>No lawyers found for the searched case.</p>
          ) : (
            <ul className='lul'>
              {sortedLawyers && sortedLawyers.map(lawyer => (
                <li className='lli' key={lawyer._id}>
                  <strong className='lstrong'>{lawyer.name}</strong>
                  <p className='lp'>Specialization: {lawyer.isLawyer.specialization}</p>
                  <p className='lp'>Reviews: {lawyer.isLawyer.review}</p>
                  <div className='w-100  text-center'>
                    {isSelected(lawyer) ?
                      isSelected(lawyer).isAnswered ?
                        isSelected(lawyer).isAccepted ?
                          <span className='badge text-bg-success'>Accepted</span>
                          :
                          <span className='badge text-bg-danger'>Declined</span>
                        :
                        <span className='badge text-bg-dark'>Selected</span>
                      :
                      <button className='lp btn btn-info' onClick={() => selectLawyer(lawyer._id)}>Select</button>
                    }
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {userData && userData._id
          ?
          <Link to={`/users/prisoner/${userData._id}/counselors`} className='btn btn-primary round-button'>
            Select Counselor
          </Link>
          :
          <></>}

      </div>

    </div>
  )
}

export default SelectLawyers;
