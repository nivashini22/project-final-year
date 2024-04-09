import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styles from './styles.module.css'; // Import CSS modules
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { isSuperAdmin } from '../../helpers/helper';

function PersonalDetails() {
  const [userData, setUserData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData()
  }, [])

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
    if (user && user.type === 'PRISONER') {
      setCaseData(user.isPrisoner.case)
    } else if (user && (user.type === 'COUNSELOR' || user.type === 'LAWYER')) {
      const cases = [];
      for (let index = 0; index < user.requested_prisoners.length; index++) {
        const case_id = user.requested_prisoners[index].case_id;
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/case/${case_id}`)
        res = await res.json();
        res.requested_prisoner = user.requested_prisoners[index];
        cases.push(res);
      }
      console.log(cases);
      setCaseData(cases)
    }
  }

  const getAverage = (arr) => {
    const value = (arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length).toFixed(1);
    return value !== 'NaN' ? value : 0;
  }

  const acceptCase = async (id, isAccepted) => {
    const requested_prisoners = userData.requested_prisoners;
    console.log(requested_prisoners)
    requested_prisoners.map(data => {
      if (data.case_id == id) {
        data.isAnswered = true;
        data.isAccepted = isAccepted;
      }
    })
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/accept`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({
        case_id: id,
        lawyer_id: userData._id,
        counselor_id: userData._id,
        requested_prisoners,
        isAccepted,
        isLawyer: userData.type === 'LAWYER'
      })
    })
    res = await res.json();
    await fetchData()
  }

  return (
    <div className='details-container bg-dark' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='d-flex justify-content-center mt-4'>
        {userData ?
          <div className="card" style={{ width: "18rem" }} >
            <img class="card-img-top" src={userData.photo} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title text-center">{userData.name}
                {isSuperAdmin()
                  ?
                  <Link to={`/users/edit/${userData._id}`} className='mx-2' style={{ fontSize: '16px' }}>Edit</Link>
                  :
                  <></>
                }
              </h5>

              <p class="card-text"><b>Age:</b> {userData.age}</p>
              <p class="card-text"><b>DOB:</b> {userData.dob}</p>
              {userData.type === 'PRISONER' ?
                <>
                  <p class="card-text"><b>Is Released:</b> {userData.isReleased ? 'Yes' : 'No'}</p>
                  <p class="card-text"><b>Test Score:</b> {getAverage(userData.test_score)}</p>
                </>
                :
                <></>
              }
              <p class="card-text"><b>Rating:</b> {getAverage(userData.rating)}</p>
              {userData.type === 'PRISONER' ?
                <p class="card-text"><b>No of cases:</b> {userData.cases.length}</p>
                :
                <></>
              }
              <hr />
              <b className=''>Case:</b>
              {userData && userData.type === 'PRISONER' && caseData && caseData._id &&
                <div className='pt-3 '>
                  <Link to={`/case/${caseData._id}`} class="card-text btn btn-primary text-center w-100">{caseData.title} {caseData.lawyer_id && caseData.counselor_id ? '' : '- Select'}</Link>
                  <Link to='/' >Select Lawyer</Link>
                </div>
              }
              {/* {userData && userData.type !== 'PRISONER' && caseData && caseData.map(data => {
                return (
                  <div className='pt-3 d-flex'>
                    <Link to={`/case/${data._id}`} class="card-text btn btn-primary text-center w-100">{data.title}</Link>
                    {data.requested_prisoner.isAnswered ?
                      <>
                        <button className={`btn btn-${data.requested_prisoner.isAccepted ? 'primary' : 'danger'} mx-2`}>{data.requested_prisoner.isAccepted ? 'Accepted' : 'Declined'}</button>
                      </>
                      :
                      <>
                        <button className='btn btn-success mx-2' onClick={() => acceptCase(data._id, true)}>Accept</button>
                        <button className='btn btn-danger mx-2' onClick={() => acceptCase(data._id, false)}>Decline</button>
                      </>
                    }
                  </div>
                )
              })}
              {!caseData || (caseData && caseData.length === 0) ?
                <p>No cases found</p>
                :
                <></>
              } */}
            </div>
          </div>
          :
          <></>
        }
      </div>
      {/* Add more personal details here */}
    </div>
  );
}

export default PersonalDetails;