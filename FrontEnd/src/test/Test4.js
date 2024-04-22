import React from 'react'
import { test4 } from '../helpers/data'
import { useParams, useNavigate } from "react-router-dom";

const questions = test4;

export default function Test4() {
  const params = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = React.useState({});
  const onSelectAnswer = (e, index) => {
    const mark = e.target.value;
    setAnswers(prev => (
      {
        ...prev, 
        [index]: Number(mark)
      }
    ));
  }

  const onSubmit = async () => {
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
    const attendedAnswersLength = Object.keys(answers).length;
    if (attendedAnswersLength !== test4.length) {
      alert('Please answer all answers!!!');
      return
    }
    const sum = Object.values(answers).reduce((a, b) => a + b, 0);
    console.log(sum)
    let user = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/update/prisoner/test`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({
        _id: user_id,
        mark: sum,
        type: 'SAS'
      })
    })
    user = await user.json()
    console.log('user ', user)
    return navigate(`/users/prisoner/${user._id}`);
  }

  return (
    <div>
    <h1>Test 4</h1>
    <h2>Situations and Scenarios</h2>
    {questions.map((question, index) => (
      <div key={index} className="question-container">
        <p className="question">{question.number}. {question.question}</p>
        <div className="answers">
          {question.answers.map((answer, i) => (
            <label key={i}>
              <input class="input" type="radio" name={`question${index}`} value={answer.mark} onChange={e => onSelectAnswer(e, question.number)}/>
              {answer.value}
            </label>
          ))}
        </div>
      </div>
    ))}
    <button className='submit-button' onClick={onSubmit}>Submit</button>
  </div>
  )
}
