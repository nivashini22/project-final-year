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
  const params = useParams();
  const inputFileRef = useRef();
  
  useEffect(() => {
    if (pageType == 'edit') {
      fetchData()
    }
  }, [])

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
        <div class="card" style={{ width: "18rem" }}>

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
            <button className='btn btn-primary w-100' onClick={addUser}>{pageType == 'edit' ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddUser
