import React, { useEffect, useState } from 'react';
// import styles from './styles.module.css'; // Import external styles
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';

function CaseDetails() {
  const [caseData, setCaseData] = useState(null);
  const [lawyers, setLawyers] = useState(null);
  const [counselors, setCounselors] = useState(null);
  const [tests, setTests] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {

    fetchData()
  }, []);
  async function fetchData() {
    let case_id = '';
    if (params && params.case_id) {
      case_id = params.case_id
    }
    console.log('case_id ', case_id)
    console.log('params ', params)
    setCaseId(case_id);
    let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/case/${case_id}`)
    result = await result.json();
    setCaseData(result);
    console.log('casees ', result)
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/lawyers`)
    res = await res.json();
    console.log('lawyers ', res)
    if (result.lawyer_id) {
      res = res.filter(r => r._id == result.lawyer_id)
    }
    setLawyers(res)
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/type/counselors`)
    response = await response.json();
    if (result.counselor_id) {
      res = res.filter(r => r._id == result.counselor_id)
    }
    console.log('counselors ', response)
    setCounselors(response)

  }
  const getAverage = (arr) => {
    const value = (arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length).toFixed(1);
    return value !== 'NaN' ? value : 0;
  }

  const selectLawyer = async (id) => {
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/request`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({
        _id: id,
        case_id: caseId,
        requested_prisoners: {
          case_id: caseId,
          isAccepted: false,
          isAnswered: false
        },
      })
    })
    res = await res.json();
    await fetchData()
  }

  return (
    <div className={"details-container bg-dark"} style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='d-flex justify-content-center mt-4'>
        <div>
          <h2 className={'details-heading'}>Case Details</h2>
          {caseData &&
            <div className="card" style={{ width: "18rem" }} >
              <img class="card-img-top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRynyvvPOS4gcG8x1DtUCOgoPMFnn56yDEzhw&usqp=CAU' alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{caseData.title}</h5>
                <p class="card-text">{caseData.description}</p>
                <p class="card-text"><b>Duration:</b> {caseData.duration_of_sentence}</p>
                <p class="card-text"><b>Date of joining:</b> {caseData.incarcerated_date}</p>
              </div>
              <hr />
              {caseData && caseData.lawyer_id ?
                <h4 className='p-2'>Selected Lawyer</h4>
                :
                <h4 className='p-2'>Select Lawyers</h4>
              }
              <div className='d-flex text-dark bg-white rounded justify-content-around fw-bold'>
                <p className='p-2 col-5'>Name</p>
                <p className='p-2 col-4'>Selected</p>
                <p className='p-2 col-3'>Rating</p>
              </div>
              {lawyers && lawyers.map(data => {
                return (
                  <div className='card'>
                    <div className={`d-flex justify-content-around align-items-center  ${caseData.lawyer_id ? 'bg-success' : ''}`}>
                      <p class={`card-text p-2 m-0 col-5`}>{data.name}</p>
                      <input type='checkbox' className='col-4' checked={data.requested_prisoners.find(data => data.case_id == caseId)} disabled />
                      <p class="card-text p-2 m-0 col-3">{getAverage(data.rating)}</p>
                    </div>
                    {data.requested_prisoners.find(data => data.case_id == caseId)
                      ?
                      <></>
                      :
                      <button className='btn btn-primary m-2' onClick={() => selectLawyer(data._id)}>Select</button>
                    }
                  </div>
                )
              })}
              <hr />
              {caseData && caseData.counselor_id ?
                <h4 className='p-2'>Selected Counselor</h4>
                :
                <h4 className='p-2'>Select Counselors</h4>
              }
              <div className='d-flex text-dark bg-white rounded justify-content-around fw-bold'>
                <p className='p-2 col-5'>Name</p>
                <p className='p-2 col-4'>Selected</p>
                <p className='p-2 col-3'>Rating</p>
              </div>
              {counselors && counselors.map(data => {
                return (
                  <div className='card'>
                    <div className={`d-flex justify-content-around align-items-center ${caseData.counselor_id ? 'bg-success' : ''}`}>
                      <p class={`card-text p-2 m-0 col-5`}>{data.name}</p>
                      <input type='checkbox' className='col-4' checked={data.requested_prisoners.find(data => data.case_id == caseId)} disabled />
                      <p class="card-text p-2 m-0 col-3">{getAverage(data.rating)}</p>
                    </div>
                    {caseData.counselor_id ?
                      <></>
                      :
                      data.requested_prisoners.find(data => data.case_id == caseId)
                        ?
                        <></>
                        :
                        <button className='btn btn-primary m-2' onClick={() => selectLawyer(data._id)}>Select</button>
                    }
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default CaseDetails;