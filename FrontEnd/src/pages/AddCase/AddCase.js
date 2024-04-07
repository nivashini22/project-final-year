import React, { useEffect, useState } from 'react'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Navbar from '../../components/Navbar/Navbar';


function AddCase() {

  
  const [prisoners, setPrisoners] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [duration, setDuration] = useState('');
  const [offenders, setOffenders] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/prisoners`)
    const users = await result.json();
    // users.map(user => user.isSelected = false)
    setPrisoners(users);
  }

  const selectPrisoners = (id, checked) => {
    console.log('checked', checked)
    const uPrisoners = prisoners.map(prisoner => {
      if (prisoner._id == id) {
        prisoner.isSelected = checked;
      }
      return prisoner;
    })
    setPrisoners(uPrisoners);
  }

  const addCase = async () => {
    if (!title || !description || !dateJoined || !duration) {
      alert('Please enter all the details');
      return
    }
    const caseObj = {
      title,
      description,
      incarcerated_date: dateJoined,
      duration_of_sentence: duration,
      offenders: prisoners.filter(prisoner => prisoner.isSelected).map(prisoner => prisoner._id)
    }
    let caseRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/case/create`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(caseObj)
    })
    caseRes = await caseRes.json();
    alert('Case added successfully');
    setTitle('');
    setDescription('');
    setDateJoined('');
    setDuration('');
    setPrisoners([]);
    await fetchData();
  }

  return (
    <div className='bg-dark' style={{ minHeight: '100vh' }}>
      <Navbar />
      <h2 className='text-white text-center'>Add Case</h2>
      <div className='container d-flex justify-content-center align-items center p-4'>
        <div class="card" style={{ width: "18rem" }}>

          <div class="card-body">
            <div className='p-2'>
              <label>Enter title:</label>
              <input type='text' className='w-100' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter description:</label>
              <textarea type='text' className='w-100' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter date joined:</label>
              <input type='text' className='w-100' value={dateJoined} onChange={e => setDateJoined(e.target.value)} />
            </div>
            <div className='p-2'>
              <label>Enter duration:</label>
              <input type='text' className='w-100' value={duration} onChange={e => setDuration(e.target.value)} />
            </div>
            <p className='m-0 fw-bold'>Add prisoners</p>
            {prisoners && prisoners.map(prisoner => (
              <div className='d-flex justify-content-between px-2 py-1'>
                <label>{prisoner.name}</label>
                <input type='checkbox' checked={prisoner.isSelected} onChange={e => selectPrisoners(prisoner._id, e.target.checked)}/>
              </div>
            ))}

            <button className='btn btn-primary w-100' onClick={addCase}>Add</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddCase
