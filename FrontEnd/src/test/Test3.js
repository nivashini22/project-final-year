import React from 'react'

const questions = [
  {
    "number": 1,
    "question": "I couldn't seem to experience any positive feeling at all",
    "answers": [
      {
        "value": "Did not apply to me at all ",
        "mark": 0
      },
      {
        "value": "Some of the time",
        "mark": 1
      },
      {
        "value": "Good part of the time ",
        "mark": 2
      },
      {
        "value": "Most of the time",
        "mark": 3
      }
    ]
  },
  {
      "number": 2,
      "question": " I found myself in situations that made me so anxious I was most relieved when they ended ",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 3,
      "question": "I found myself getting impatient when I was delayed in any way",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 4,
      "question": "I felt scared without any good reason",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 5,
      "question": "I couldn't seem to get any enjoyment out of the things I did",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 6,
      "question": "I feared that I would be 'thrown' by some trivial but unfamiliar task",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 7,
      "question": "I was unable to become enthusiastic about anything",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 8,
      "question": "I was worried about situations in which I might panic and make a fool of myself",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 9,
      "question": "Been angered because of things that happened that were out of your control",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    },
    {
      "number": 10,
      "question": " I found it difficult to work up the initiative to do things ",
      "answers": [
        {
          "value": "Did not apply to me at all ",
          "mark": 0
        },
        {
          "value": "Some of the time",
          "mark": 1
        },
        {
          "value": "Good part of the time ",
          "mark": 2
        },
        {
          "value": "Most of the time",
          "mark": 3
        }
      ]
    }
]

export default function Test3() {
  return (
    <div>
    <h1>Test 3</h1>
    <h2>Stress</h2>
    {questions.map((question, index) => (
      <div key={index} className="question-container">
        <p className="question">{question.number}. {question.question}</p>
        <div className="answers">
          {question.answers.map((answer, i) => (
            <label key={i}>
              
              <input class="input" type="radio" name={`question${index}`} value={answer.mark} />
              {answer.value}
            </label>
          ))}
        </div>
      </div>
    ))}
    <button className='submit-button'>Submit</button>
  </div>
  )
}
