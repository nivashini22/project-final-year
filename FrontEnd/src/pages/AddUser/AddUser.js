import React, { useEffect, useRef, useState } from 'react'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from "react-router-dom";

function AddUser({ type = '', pageType = '' }) {
  if (type.toUpperCase() === 'PRISONERS') {
    type = 'PRISONER'
  } else if (type.toUpperCase() === 'LAWYERS') {
    type = 'LAWYER'
  } else if (type.toUpperCase() === 'COUNSELORS') {
    type = 'COUNSELOR'
  } else {

  }
  const [_id, setId] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('');
  const [isPrisoner, setIsPrisoner] = useState({
    number: '',
    title: '',
    description: '',
    charge: '',
    date_joined: '',
    duration_of_sentence: '',
    lawyer_id: '',
    counselor_id: '',
    videos: []
  });
  const [isLawyer, setIsLawyer] = useState({
    requested_prisoners: [],
    specialization: [],
    review: false
  });
  const [isCounselor, setIsCounselor] = useState({
    requested_prisoners: [],
    counselingNeed: '',
    expertise: '',
    expertiseLevel: ''
  });
  const params = useParams();
  const inputFileRef = useRef();

  useEffect(() => {
    setName('');
    setPhoto('');
    setPassword('');
    setDob('');
    setAge('');
    setAddress('');
    setIsPrisoner({
      number: '',
      title: '',
      description: '',
      charge: '',
      date_joined: '',
      duration_of_sentence: '',
      lawyer_id: '',
      counselor_id: '',
      videos: []
    })
    setIsLawyer({
      requested_prisoners: [],
      specialization: '',
      review: ''
    })
    setIsCounselor({
      requested_prisoners: [],
      counselingNeed: '',
      expertise: '',
      expertiseLevel: ''
    })
    if (pageType == 'edit') {
      fetchData()
    }
  }, [type, pageType])

  const fetchData = async () => {
    const user_id = params.user_id;
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user_id}`)
    const user = await result.json();
    console.log(user);
    setName(user.name);
    setPhoto(user.photo);
    setPassword(user.password);
    setDob(user.dob);
    setAge(user.age);
    setAddress(user.address);
    setUserType(user.type);
    setId(user._id)
    if (user.type === 'PRISONER') {
      setIsPrisoner(user.isPrisoner.case)
    }
    if (user.type === 'LAWYER') {
      setIsLawyer(user.isLawyer);
    }
    if (user.type === 'COUNSELOR') {
      setIsCounselor(user.isCounselor);
    }
  }

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  })

  const onChange = (file) => {

    if (!file) {
      setPhoto('');
      return;
    }

    fileToDataUri(file)
      .then(photo => {
        setPhoto(photo)
      })

  }

  const onChangePrisonerData = (e) => {
    setIsPrisoner({ ...isPrisoner, [e.target.name]: e.target.value })
  }
  const onChangeLawyerData = (e) => {
    setIsLawyer({ ...isLawyer, [e.target.name]: e.target.value })
  }
  const onChangeCounselorData = (e) => {
    setIsCounselor({ ...isCounselor, [e.target.name]: e.target.value })
  }

  const addUser = async () => {
    if (!name || !photo || !password || !dob || !age || !address) {
      alert('Please enter all the details');
      return
    }
    const userObj = {
      name,
      photo,
      type: type ? type : userType,
      password,
      dob,
      age,
      address
    }
    if (type === 'PRISONER') {
      userObj.isPrisoner = {};
      userObj.isPrisoner.case = isPrisoner;
    }
    if (type === 'LAWYER') {
      userObj.isLawyer = isLawyer;
    }
    if (type === 'COUNSELOR') {
      userObj.isCounselor = isCounselor;
    }
    if (pageType == 'edit') {
      userObj._id = _id
      let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(userObj)
      })
      res = await res.json();
      inputFileRef.current.value = '';
      alert('User updated successfully');
    } else {
      let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/signup`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(userObj)
      })
      res = await res.json();
      alert('User added successfully');
      setName('');
      setPhoto('');
      setPassword('');
      setDob('');
      setAge('');
      setAddress('');
      inputFileRef.current.value = '';
    }
  }

  return (
    <div className='bg-dark' style={{ minHeight: '100vh' }}>
      <Navbar />
      <h2 className='text-white text-center'>{pageType == 'edit' ? 'Update' : 'Add'} {type.toUpperCase()}</h2>
      <div className='container d-flex justify-content-center align-items center p-4'>
        <div class="card" style={{ width: "40rem" }}>
          <div class="card-body">
            <input type='file' ref={inputFileRef} onChange={(event) => onChange(event.target.files[0] || null)} />
            <img src={photo} width={'100%'} height={'auto'} />
            <div className='p-2'>
              <label>Enter name:</label>
              <input type='text' className='w-100' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter password:</label>
              <input type='text' className='w-100' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {pageType == 'edit' ?
              <div className='p-2'>
                <label>Type:</label>
                <p className='m-0'>{userType}</p>
              </div>
              :
              <></>
            }
            <div className='p-2'>
              <label>Enter DOB:</label>
              <input type='text' className='w-100' value={dob} onChange={e => setDob(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter Age:</label>
              <input type='text' className='w-100' value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter Address:</label>
              <input type='text' className='w-100' value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            {type === 'PRISONER' ?
              <>
                <div className='p-2'>
                  <label>Case Number:</label>
                  <input type='text' name='number' className='w-100' value={isPrisoner.number} onChange={onChangePrisonerData} />
                </div>
                <div className='p-2'>
                  <label>Case Title:</label>
                  <input type='text' name='title' className='w-100' value={isPrisoner.title} onChange={onChangePrisonerData} />
                </div>
                <div className='p-2'>
                  <label>Case Description:</label>
                  <input type='text' name='description' className='w-100' value={isPrisoner.description} onChange={onChangePrisonerData} />
                </div>
                <div className='p-2'>
                  <label>Charge:</label>
                  <input type='text' name='charge' className='w-100' value={isPrisoner.charge} onChange={onChangePrisonerData} />
                </div>
                <div className='p-2'>
                  <label>Date joined:</label>
                  <input type='text' name='date_joined' className='w-100' value={isPrisoner.date_joined} onChange={onChangePrisonerData} />
                </div>
                <div className='p-2'>
                  <label>Duration:</label>
                  <input type='text' name='duration_of_sentence' className='w-100' value={isPrisoner.duration_of_sentence} onChange={onChangePrisonerData} />
                </div>
              </>
              :
              <></>
            }
            {type === 'LAWYER' ?
              <>
                <div className='p-2'>
                  <label>Specialization:</label>
                  <input type='text' name='specialization' className='w-100' value={isLawyer.specialization} onChange={onChangeLawyerData} />
                </div>
                <div className='p-2'>
                  <label>Review:</label>
                  <input type='text' name='review' className='w-100' value={isLawyer.review} onChange={onChangeLawyerData} />
                </div>
              </>
              :
              <></>}
            {type === 'COUNSELOR' ?
              <>
                <div className='p-2'>
                  <label>Counseling Need:</label>
                  <input type='text' name='counselingNeed' className='w-100' value={isCounselor.counselingNeed} onChange={onChangeCounselorData} />
                </div>
                <div className='p-2'>
                  <label>Expertise:</label>
                  <input type='text' name='expertise' className='w-100' value={isCounselor.expertise} onChange={onChangeCounselorData} />
                </div>
                <div className='p-2'>
                  <label>Expertise Level:</label>
                  <input type='text' name='expertiseLevel' className='w-100' value={isCounselor.expertiseLevel} onChange={onChangeCounselorData} />
                </div>
              </>
              :
              <></>}
            <button className='btn btn-primary w-100' onClick={addUser}>{pageType == 'edit' ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddUser
