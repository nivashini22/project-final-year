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
  const [testData, setTestData] = useState(null);
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
    setCaseData(user.isPrisoner.case);
    setTestData(user.isPrisoner.test_score);
    if (user.isPrisoner.case.lawyer_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.lawyer_id}`)
      result = await result.json();
      setLawyerData(result)
    }
    if (user.isPrisoner.case.counselor_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.counselor_id}`)
      result = await result.json();
      setCounselorData(result)
    }
  }


  const markText = (type, obj) => {
    const value = obj.mark;
    let text = '';
    if (type == 'BDI') {
      if (value < 14) {
        text = `Minimal despression - ${value}`
      } else if (value > 13 && value < 20) {
        text = `Mild despression - ${value}`
      } else if (value > 19 && value < 29) {
        text = `Moderate despression - ${value}`
      } else {
        text = `Severe despression - ${value}`
      }
    } else if (type == 'GAD') {
      if (value < 5) {
        text = `Minimal anxiety - ${value}`
      } else if (value > 4 && value < 10) {
        text = `Mild anxiety - ${value}`
      } else if (value > 9 && value < 15) {
        text = `Moderate anxiety - ${value}`
      } else {
        text = `Severe anxiety - ${value}`
      }
    } else if (type == 'Stress') {
      if (value < 8) {
        text = `Minimal stress - ${value}`
      } else if (value > 7 && value < 16) {
        text = `Mild stress - ${value}`
      } else if (value > 15 && value < 23) {
        text = `Moderate stress - ${value}`
      } else {
        text = `Severe stress - ${value}`
      }
    } else if (type == 'SAS') {
      text = `${value};`
    } else if (type == 'Anger') {
      if (value < 20) {
        text = `Bad - ${value}`
      } else if (value > 19 && value < 41) {
        text = `Fair - ${value}`
      } else if (value > 40 && value < 66) {
        text = `Good - ${value}`
      } else {
        text = `Excellent - ${value}`
      }
    } else {
      text = `${value};`
    }
    return text;
  }

  return (
    <div className='details-container bg-dark' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='row mt-4 p-5'>
        {userData ?
          <div className="col-4 bg-white" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <img class="card-img-top" src={userData.photo} alt="Card image cap" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} />
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
              {/* <p class="card-text"><b>Test Score:</b> {getAverage(userData.isPrisoner.test_score)}</p> */}
            </div>
          </div>
          :
          <></>
        }
        <div className='col-1'></div>
        {userData && caseData && caseData.number &&
          <div className='col-3 bg-white d-flex flex-column justify-content-around p-5 ' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
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
        <div className='col-1'></div>
        {userData && caseData && caseData.number &&
          <div className='col-3 bg-white d-flex flex-column justify-content-around p-5 ' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <h4 className='text-primary'>Test Details</h4>
            {testData?.BDI?.isAttended ?
              <p class="card-text"><b>BDI:</b> {markText('BDI', testData.BDI)}</p>
              :
              <p class="card-text"><b>BDI:</b>
                <Link to={`/test/1/${userData._id}`} className='text-decoration-none'>&nbsp;Take test</Link>
              </p>
            }
            {testData?.GAD?.isAttended ?
              <p class="card-text"><b>GAD:</b> {markText('GAD', testData.GAD)}</p>
              :
              <p class="card-text"><b>GAD:</b>
                <Link to={`/test/2/${userData._id}`} className='text-decoration-none'>&nbsp;Take test</Link>
              </p>

            }
            {testData?.Stress?.isAttended ?
              <p class="card-text"><b>Stress:</b> {markText('Stress', testData.Stress)}</p>
              :
              <p class="card-text"><b>Stress:</b>
                <Link to={`/test/3/${userData._id}`} className='text-decoration-none'>&nbsp;Take test</Link>
              </p>
            }
            {testData?.SAS?.isAttended ?
              <p class="card-text"><b>SAS:</b> {markText('SAS', testData.SAS)}</p>
              :
              <p class="card-text"><b>SAS:</b>
                <Link to={`/test/4/${userData._id}`} className='text-decoration-none'>&nbsp;Take test</Link>
              </p>
            }
            {testData?.Anger?.isAttended ?
              <p class="card-text"><b>Anger:</b> {markText('Anger', testData.Anger)}</p>
              :
              <p class="card-text"><b>Anger:</b>
                <Link to={`/test/5/${userData._id}`} className='text-decoration-none'>&nbsp;Take test</Link>
              </p>
            }
          </div>
        }
      </div>
      {/* Add more personal details here */}
    </div>
  );
}

export default PrisonerDetails;