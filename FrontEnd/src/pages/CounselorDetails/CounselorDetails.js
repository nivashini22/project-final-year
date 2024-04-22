import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styles from './styles.module.css'; // Import CSS modules
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { isSuperAdmin } from '../../helpers/helper';
import { Modal as ReactModal } from 'react-responsive-modal';

function CounselorDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    url: ''
  });
  const [userData, setUserData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [requestedPrisoners, setRequestedPrisoners] = useState([]);
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
    let prisonerDetails = [];
    for (let index = 0; index < user.isCounselor.requested_prisoners.length; index++) {
      const prisoner = user.isCounselor.requested_prisoners[index];
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${prisoner.user_id}`)
      const data = await result.json();
      // console.log("Prisoner details:", prisoner);
      data.isAccepted = prisoner.isAccepted;
      data.isAnswered = prisoner.isAnswered;
      prisonerDetails.push(data);
    }
    console.log('case details ', prisonerDetails)
    setRequestedPrisoners(prisonerDetails)
  }

  const acceptCase = async (prisonerData) => {
    const updatedRequestedPrisoners = requestedPrisoners.map(prisoner => {
      if (prisonerData._id == prisoner._id) {
        prisoner.isPrisoner.case.counselor_id = userData._id;
        prisoner.isAccepted = true;
        prisoner.isAnswered = true;
      }
      return prisoner;
    })
    console.log('updatedRequestedPrisoners ', updatedRequestedPrisoners)
    setRequestedPrisoners(updatedRequestedPrisoners);
    const updatedLawyerRequestedPrisoners = userData.isCounselor.requested_prisoners.map(prisoner => {
      if (prisoner.user_id == prisonerData._id) {
        prisoner.isAnswered = true;
        prisoner.isAccepted = true;
      }
      return prisoner;
    })
    const obj = {
      isAccepted: true,
      user_id: prisonerData._id,
      counselor_id: userData._id,
      requested_prisoners: updatedLawyerRequestedPrisoners
    }
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/counselor/accept`, {
      method: "put",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await result.json();
  }

  const declineCase = async (prisonerData) => {
    const updatedRequestedPrisoners = requestedPrisoners.map(prisoner => {
      if (prisonerData._id == prisoner._id) {
        prisoner.isAnswered = true;
        prisoner.isAccepted = false;
      }
      return prisoner;
    });
    setRequestedPrisoners(updatedRequestedPrisoners);
    const updatedLawyerRequestedPrisoners = userData.isCounselor.requested_prisoners.map(prisoner => {
      if (prisoner.user_id == prisonerData._id) {
        prisoner.isAnswered = true;
        prisoner.isAccepted = false;
      }
      return prisoner;
    })
    const obj = {
      isAccepted: false,
      user_id: prisonerData._id,
      counselor_id: userData._id,
      requested_prisoners: updatedLawyerRequestedPrisoners
    }
    console.log('obj ', obj)
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/counselor/accept`, {
      method: "put",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await result.json();
  }

  const addVideo = async (id) => {
    console.log(videoDetails)
    const updatedRequestedPrisoners = requestedPrisoners.map(prisoner => {
      if (prisoner._id == id) {
        if (prisoner.isPrisoner.case.videos) {
          prisoner.isPrisoner.case.videos.push(videoDetails);
        } else {
          prisoner.isPrisoner.case.videos = [videoDetails]
        }
      }
      return prisoner;
    })
    setRequestedPrisoners(updatedRequestedPrisoners);
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/prisoner/video`, {
      method: "put",
      body: JSON.stringify({
        _id: id,
        video: videoDetails
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await result.json()
    setVideoDetails({
      title: '',
      url: ''
    });
  }

  const onClose = () => {
    setIsOpen(false);
    setCaseData(null);
  }

  const viewCase = (data) => {
    setCaseData(data);
    setIsOpen(true);
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
      <ReactModal open={isOpen} onClose={onClose} center closeOnOverlayClick={false} showCloseIcon={true}>
        {caseData ?
          <div className='card p-4 mb-2'>
            <img class="card-img-top" src={caseData.photo} alt="Card image cap" />
            <div className='card-body'>
              <p class="card-text"><b>Prisoner:</b> {caseData.name}</p>
              <p class="card-text"><b>Age:</b> {caseData.age}</p>
              <p class="card-text"><b>DOB:</b> {caseData.dob}</p>
              <p class="card-text"><b>Address:</b> {caseData.address}</p>
              <p class="card-text"><b>Prisoner:</b> {caseData.name}</p>
              <p class="card-text"><b>Case number:</b> {caseData.isPrisoner.case.number}</p>
              <p class="card-text"><b>Case title:</b> {caseData.isPrisoner.case.title}</p>
              <p class="card-text"><b>Case description:</b> {caseData.isPrisoner.case.description}</p>
              <p class="card-text"><b>Charge:</b> {caseData.isPrisoner.case.charge}</p>
              <p class="card-text"><b>Date joined:</b> {caseData.isPrisoner.case.date_joined}</p>
              <p class="card-text"><b>Duration:</b> {caseData.isPrisoner.case.duration_of_sentence}</p>
              <p class="card-text text-primary"><b>Test Details:</b></p>
              
              {caseData?.isPrisoner?.test_score?.BDI?.isAttended ?
              <p class="card-text"><b>BDI:</b> {markText('BDI', caseData?.isPrisoner?.test_score.BDI)}</p>
              :
              <p class="card-text"><b>BDI:</b>&nbsp;Not Attended
              </p>
            }
            {caseData?.isPrisoner?.test_score?.GAD?.isAttended ?
              <p class="card-text"><b>GAD:</b> {markText('GAD', caseData?.isPrisoner?.test_score.GAD)}</p>
              :
              <p class="card-text"><b>GAD:</b>&nbsp;Not Attended</p>

            }
            {caseData?.isPrisoner?.test_score?.Stress?.isAttended ?
              <p class="card-text"><b>Stress:</b> {markText('Stress', caseData?.isPrisoner?.test_score.Stress)}</p>
              :
              <p class="card-text"><b>Stress:</b>&nbsp;Not Attended</p>
            }
            {caseData?.isPrisoner?.test_score?.SAS?.isAttended ?
              <p class="card-text"><b>SAS:</b> {markText('SAS', caseData?.isPrisoner?.test_score.SAS)}</p>
              :
              <p class="card-text"><b>SAS:</b>&nbsp;Not Attended</p>
            }
            {caseData?.isPrisoner?.test_score?.Anger?.isAttended ?
              <p class="card-text"><b>Anger:</b> {markText('Anger', caseData?.isPrisoner?.test_score.Anger)}</p>
              :
              <p class="card-text"><b>Anger:</b>&nbsp;Not Attended</p>
            }
            </div>
          </div>
          :
          <></>
        }

      </ReactModal>
      <div className='d-flex justify-content-center mt-4 py-5'>
        {userData ?
          <div className="col-4"  >
            <div className='card'>
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
                <p class="card-text"><b>Counseling Need:</b> {userData.isCounselor.counselingNeed}</p>
                <p class="card-text"><b>Expertise:</b> {userData.isCounselor.expertise}</p>
                <p class="card-text"><b>Expertise Level:</b> {userData.isCounselor.expertiseLevel}</p>
              </div>
            </div>

          </div>
          :
          <></>
        }
        <div className='col-2'></div>
        <div className='col-4 d-flex flex-column justify-content-around '>
          {userData && requestedPrisoners && requestedPrisoners.length ? requestedPrisoners.map(prisoner => (
            <div className='card row w-100 p-4 mb-2'>
              <p class="card-text"><b>Case number:</b> {prisoner.isPrisoner.case.number}</p>
              <p class="card-text"><b>Prisoner:</b> {prisoner.name}</p>
              <p class="card-text"><b>Case title:</b> {prisoner.isPrisoner.case.title}</p>
              <p class="card-text"><b>Charge:</b> {prisoner.isPrisoner.case.charge}</p>
              {/* <p class="card-text m-0"><b>Videos:</b></p>
              {prisoner?.isPrisoner?.case?.videos?.length && prisoner.isPrisoner.case.videos.map(video => (
                <a href={video.url} target='__blank' >{video.title}</a>
              ))}
              <input type='text' placeholder='Enter the video title' value={videoDetails.title} onChange={e => setVideoDetails({...videoDetails, title: e.target.value })}/>
              <input type='text' placeholder='Enter the video url...' value={videoDetails.url} onChange={e => setVideoDetails({...videoDetails, url: e.target.value })}/> 
              <button className='btn btn-secondary text-white p-2 mb-3' onClick={() => addVideo(prisoner._id)}>Add video</button> */}
              <button className='btn btn-secondary text-white p-2 mb-3' onClick={() => viewCase(prisoner)}>View</button>
              {prisoner.isAnswered ?
                prisoner.isAccepted ?
                  <span className='badge text-bg-success p-3'>Accepted</span>
                  :
                  <span className='badge text-bg-danger p-3'>Declined</span>
                :
                <div className='d-flex justify-content-around'>
                  <button className='btn btn-success' onClick={() => acceptCase(prisoner)}>Accept</button>
                  <button className='btn btn-danger' onClick={() => declineCase(prisoner)}>Decline</button>
                </div>
              }
            </div>
          ))
            :
            <div className='card'>
              <h3 className='p-4'>No cases found!!!
              </h3>
            </div>
          }
        </div>
      </div>
      {/* Add more personal details here */}
    </div>
  );
}

export default CounselorDetails;