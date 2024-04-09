import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styles from './styles.module.css'; // Import CSS modules
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { isSuperAdmin } from '../../helpers/helper';

function PrisonerDetails() {
  const [userData, setUserData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [lawyerData, setLawyerData] = useState(null);
  const [counselorData, setCounselorData] = useState(null);

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
    setCaseData(user.isPrisoner.case)
    if (user.isPrisoner.case.lawyer_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.lawyer_id}`)
      result = await result.json();
      setLawyerData(result)
    }
    if(user.isPrisoner.case.counselor_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.counselor_id}`)
      result = await result.json();
      setCounselorData(result)
    }
  }

  const getAverage = (arr = []) => {
    const value = (arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length).toFixed(1);
    return value !== 'NaN' ? value : 0;
  }

  return (
    <div className='details-container bg-dark' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='d-flex justify-content-center mt-4 py-5'>
        {userData ?
          <div className="card col-4"  >
            <img class="card-img-top" src={userData.photo} alt="Card image cap" />
            <div class="card-body p-4">
              <h4 className='text-primary'>User Details</h4>
              <h5 class="card-title"> {userData.name}
                {isSuperAdmin()
                  ?
                  <Link to={`/users/edit/${userData._id}`} className='mx-2' style={{ fontSize: '16px' }}>Edit</Link>
                  :
                  <></>
                }
              </h5>

              <p class="card-text"><b>Age:</b> {userData.age}</p>
              <p class="card-text"><b>DOB:</b> {userData.dob}</p>
              <p class="card-text"><b>Address:</b> {userData.address}</p>
              <p class="card-text"><b>Is Released:</b> {userData.isPrisoner.isReleased ? 'Yes' : 'No'}</p>
              <p class="card-text"><b>Test Score:</b> {getAverage(userData.isPrisoner.test_score)}</p>
            </div>
          </div>
          :
          <></>
        }
        <div className='col-2'></div>

        {userData && caseData && caseData.number &&
          <div className='col-4 card  d-flex flex-column justify-content-around p-5 '>
            <h4 className='text-primary'>Case Details</h4>
            <p class="card-text"><b>Case number:</b> {caseData.number}</p>
            <p class="card-text"><b>Case title:</b> {caseData.title}</p>
            <p class="card-text"><b>Case description:</b> {caseData.description}</p>
            <p class="card-text"><b>Charge:</b> {caseData.charge}</p>
            <p class="card-text"><b>Date Joined:</b> {caseData.date_joined}</p>
            <p class="card-text"><b>Duration of sentence:</b> {caseData.duration_of_sentence}</p>
            {caseData.lawyer_id && lawyerData ?
              <>
                <p class="card-text"><b>Appointed Lawyer:</b> {lawyerData.name}</p>
              </>
              :
              <>
                <Link to={`/users/prisoner/${userData._id}/lawyers`} className='btn btn-primary w-100'>Select Lawyer</Link>
              </>
            }
            {caseData.counselor_id && counselorData ?
              <>
                <p class="card-text"><b>Appointed Counselor:</b> {counselorData.name}</p>
              </>
              :
              <>
                <Link to={`/users/prisoner/${userData._id}/counselors`} className='btn btn-primary w-100 mt-2'>Select Counselor</Link>
              </>
            }
          </div>
        }
      </div>
      {/* Add more personal details here */}
    </div>
  );
}

export default PrisonerDetails;