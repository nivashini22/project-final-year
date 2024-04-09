import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Modal as ReactModal } from 'react-responsive-modal';

function Dashboard({ type = '' }) {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchData()
  }, [type])

  async function fetchData() {
    setSearchedUser('');
    setUserData(null);
    setFilteredUsers([]);
    setUsers([]);
    setIsOpen(false)
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/${type}`)
    const users = await result.json();
    users.map(user => {
      if (!user.photo) {
        user.photo = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
      }
    })
    setUsers(users);
    setFilteredUsers(users);
  }

  const onClose = () => {
    setIsOpen(false);
    setUserData(null);
  }

  const searchUser = (event) => {
    const searchTxt = event.target.value;
    setSearchedUser(searchTxt)
    const filteredLawyers = users && users.filter(user =>
      user.name.toLowerCase().includes(searchTxt.toLowerCase())
    )
    setFilteredUsers(filteredLawyers);
  }

  const viewUser = async (user) => {
    if (user.isPrisoner.case.lawyer_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.lawyer_id}`)
      result = await result.json();
      user.isPrisoner.case.lawyer_name = result.name;
    }
    if (user.isPrisoner.case.counselor_id) {
      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.isPrisoner.case.counselor_id}`)
      result = await result.json();
      user.isPrisoner.case.counselor_name = result.name;
    }
    // user.videos = [
    //   {
    //     title: 'Meditaion',
    //     url: 'https://www.youtube.com/watch?v=P2krkKl1S4Q&list=RDP2krkKl1S4Q&start_radio=1'
    //   },
    //   {
    //     title: 'Demo',
    //     url: 'https://www.youtube.com/watch?v=P2krkKl1S4Q&list=RDP2krkKl1S4Q&start_radio=1'
    //   }
    // ]
    
    setUserData(user);
    setIsOpen(true);
  }

  return (
    <div className="dashboard bg-dark " style={{ minHeight: '100vh' }}>
      <Navbar />
      <ReactModal open={isOpen} onClose={onClose} center closeOnOverlayClick={false} showCloseIcon={true}>
        {userData ?
          <div className='card p-4 mb-2'>
            <img class="card-img-top" src={userData.photo} alt="User image" />
            <div className='card-body'>
              <p class="card-text"><b>Name:</b> {userData.name}</p>
              <p class="card-text"><b>Age:</b> {userData.age}</p>
              <p class="card-text"><b>DOB:</b> {userData.dob}</p>
              <p class="card-text"><b>Address:</b> {userData.address}</p>
              {type === 'prisoners' ?
                <>
                  <p class="card-text"><b>Case number:</b> {userData.isPrisoner.case.number}</p>
                  <p class="card-text"><b>Case title:</b> {userData.isPrisoner.case.title}</p>
                  <p class="card-text"><b>Case description:</b> {userData.isPrisoner.case.description}</p>
                  <p class="card-text"><b>Charge:</b> {userData.isPrisoner.case.charge}</p>
                  <p class="card-text"><b>Date joined:</b> {userData.isPrisoner.case.date_joined}</p>
                  <p class="card-text"><b>Duration:</b> {userData.isPrisoner.case.duration_of_sentence}</p>
                  {userData.isPrisoner.case.lawyer_name ?
                    <p class="card-text"><b>Lawyer:</b> {userData.isPrisoner.case.duration_of_sentence}</p>
                    :
                    <></>
                  }
                  {userData.isPrisoner.case.counselor_name ?
                    <p class="card-text"><b>Counselor:</b> {userData.isPrisoner.case.duration_of_sentence}</p>
                    :
                    <></>
                  }
                  {userData.videos && userData.videos.length ?
                    <p class="card-text m-0"><b>Videos:</b></p>
                    :
                    <></>
                  }
                  {userData.videos ? userData.videos.map(video => (
                      <a href={video.url} target='__blank' >{video.title}</a>
                  ))
                    :
                    <></>
                  }
                </>
                :
                <></>
              }
              {type === 'lawyers' ?
                <>
                  <p class="card-text"><b>Specialization:</b> {userData.isLawyer.specialization}</p>
                  <p class="card-text"><b>Review:</b> {userData.isLawyer.review}</p>
                </>
                :
                <></>
              }
              {type === 'counselors' ?
                <>
                  <p class="card-text"><b>Counseling Need:</b> {userData.isCounselor.counselingNeed}</p>
                  <p class="card-text"><b>Expertise:</b> {userData.isCounselor.expertise}</p>
                  <p class="card-text"><b>Expertise Level:</b> {userData.isCounselor.expertiseLevel}</p>
                </>
                :
                <></>
              }

            </div>
          </div>
          :
          <></>
        }
      </ReactModal>
      <div className="container text-white">
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <p className="welcome text-start fw-300 font-size-24 m-0">Welcome Admin,</p>
        </div>
        <div className='sldiv'>
          {type === 'prisoners' ?
            <>
              <h1 className='sloheading'>Empowering Futures, Restoring Lives: Advocating for Rehabilitation of Undertrial Prisoners</h1>
              <img className='sloimage' src="https://www.indiaspend.com/h-upload/old_images/1500x900_342846-1440x563.jpg" alt="Justice Scale Icon" ></img>
              <input
                className='slinput'
                type="text"
                placeholder="Search for a prisoner..."
                value={searchedUser}
                onChange={searchUser}
              />
            </>
            :
            <></>}
          {type === 'lawyers' ?
            <>
              <h1 className='sloheading'>Empowering Futures, Restoring Lives: Advocating for Rehabilitation of Undertrial Prisoners</h1>
              <img className='sloimage' src="https://static.wixstatic.com/media/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1cd646_ae7f0376474742e4ac9a0dee2f3f5a5d~mv2_d_2508_1672_s_2.jpg" alt="Justice Scale Icon" ></img>
              <input
                className='slinput'
                type="text"
                placeholder="Search for a lawyer..."
                value={searchedUser}
                onChange={searchUser}
              />
            </>
            :
            <></>}
          {type === 'counselors' ?
            <>
              <h1 className='sloheading'>Guiding Paths to Redemption: Empowering Lives Through Rehabilitation and Renewed Hope</h1>
              <img className='sloimage' src="https://4.imimg.com/data4/RI/QB/MY-23084548/one-to-one-counselling-service-500x500.jpg" alt="Justice Scale Icon" ></img>
              <input
                className='slinput'
                type="text"
                placeholder="Search for a counselor..."
                value={searchedUser}
                onChange={searchUser}
              />
            </>
            :
            <></>}
          <div className='ldiv'>
            <h2 className='lheading'>{type.charAt(0).toUpperCase() + type.slice(1)} List</h2>
            {filteredUsers.length === 0 ? (
              <p className='lp'>No {type} found for the searched case.</p>
            ) : (
              <ul className='lul'>
                {filteredUsers && filteredUsers.map(user => (
                  <div className='lli text-center row' key={user._id}>
                    <img className='col-4' src={user.photo} />
                    {type === 'prisoners' ?
                      <div className='col-6 m-auto'>
                        <strong className='lp'>{user.name}</strong>
                        <p className='lp'>Case title: {user.isPrisoner.case.title}</p>
                        <p className='lp'>Charge: <b>{user.isPrisoner.case.charge}</b></p>
                      </div>
                      :
                      <></>
                    }
                    {type === 'lawyers' ?
                      <div className='col-6 m-auto'>
                        <strong className='lp'>{user.name}</strong>
                        <p className='lp'>Specialization: {user.isLawyer.specialization}</p>
                        <p className='lp'>Reviews: <b>{user.isLawyer.review}</b></p>
                      </div>
                      :
                      <></>
                    }
                    {type === 'counselors' ?
                      <div className='col-6 m-auto'>
                        <strong className='lp'>{user.name}</strong>
                        <p className='lp'>Counseling need: : {user.isCounselor.counselingNeed}</p>
                        <p className='lp'>Expertise: {user.isCounselor.expertise}</p>
                        <p className='lp'>Expertise Level: {user.isCounselor.expertiseLevel}</p>
                      </div>
                      :
                      <></>
                    }
                    <div className='col-2 m-auto'>
                      <button className='btn btn-primary mb-2' onClick={() => viewUser(user)}>View</button>
                      <Link to={`/${type}/edit/${user._id}`} className='btn btn-secondary'>Edit</Link>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;