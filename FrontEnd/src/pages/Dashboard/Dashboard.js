import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    const users = await result.json();
    setUsers(users);
    setFilteredUsers(users);
  }

  const getAverage = (arr) => {
    const value = (arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length).toFixed(1);
    return value !== 'NaN' ? value : 0;
  }

  const filterByUser = (type) => {
    if (type === 'ALL') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.type === type))
    }
  }

  return (
    <div className="dashboard bg-dark " style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="container text-white">
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <p className="welcome text-start fw-300 font-size-24 m-0">Welcome Admin,</p>
        </div>
        <div className="header row mt-5 mb-5 text-color-primary f-400 font-size-16 text-center border">
          <p className='col-5 m-0 py-3 fw-bold border'>NAME</p>
          <div className="dropdown col-4 m-0 py-3 border">
              <p className="dropdown-toggle m-0" type="button" role="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              TYPE
              </p>
              <div className="dropdown-menu allList-filter-buttons p-0" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item py-3 font-size-12" onClick={() => filterByUser('ALL')}>ALL</button>
                <button className="dropdown-item py-3 font-size-12" onClick={() => filterByUser('PRISONER')}>PRISONER</button>
                <button className="dropdown-item py-3 font-size-12" onClick={() => filterByUser('LAWYER')}>LAWYER</button>
                <button className="dropdown-item py-3 font-size-12" onClick={() => filterByUser('COUNSELOR')}>COUNSELOR</button>
              </div>
            </div>
          <p className='col-3 m-0 py-3 fw-bold border'>RATING</p>
        </div>
        {filteredUsers && filteredUsers.map((user, index) => {
          return (
            <div className="row text-white  text-center mt-4" key={index}>
              {/* <Link to={`/dashboard/campaign/${campaign._id}`} className="col-2"><img alt='clickable folder' src={FolderPng} width="30" /></Link> */}
              <Link to={`/users/${user._id}`} className="col-5 text-break">{user.name}</Link>
              <p className="col-4 text-break">{user.type}</p>
              <p className="col-3 text-break">{getAverage(user.rating)}</p>
              <hr className='mt-4' />
            </div>
          )
        })}
        {filteredUsers && filteredUsers.length === 0 && (
          <div className='text-center'>
            <p className='text-white text-center font-size-14 fw-500'>No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard