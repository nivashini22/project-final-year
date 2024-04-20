import React from 'react'

const questions = [
  {
    "number": 1,
    "question": "You unpack an appliance you have just bought, plug it in, and discover that it doesn't work",
    "answers": [
      {
        "value": "Not at all ",
        "mark": 0
      },
      {
        "value": "Little",
        "mark": 1
      },
      {
        "value": "Moderate ",
        "mark": 2
      },
      {
        "value": "Very much",
        "mark": 3
      }
    ]
  },
  {
      "number": 2,
      "question": "Being singled out for a correction, while the actions of others go unnoticed",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 3,
      "question": "Getting your car stuck in the mud or sand",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 4,
      "question": "You are talking to someone and they don't answer you ",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 5,
      "question": "While you are struggling to carry four cups of coffee to your table at a cafeteria, someone bumps into you, spilling the coffee",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 6,
      "question": "You are hounded by a sales person from the moment you walk into the store",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 7,
      "question": "Your car is stalled at a traffic light, and the person behind you keeps blowing his horn  ",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 8,
      "question": "You are trying to concentrate, but a person near you is tapping their foot",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 9,
      "question": "You have had a busy day, and the person you live with starts to complain about how you forgot to do something you agreed to",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    },
    {
      "number": 10,
      "question": "Stepping on a lump of chewing gum ",
      "answers": [
        {
          "value": "Not at all ",
          "mark": 0
        },
        {
          "value": "Little",
          "mark": 1
        },
        {
          "value": "Moderate ",
          "mark": 2
        },
        {
          "value": "Very much",
          "mark": 3
        }
      ]
    }
]


export default function Test5() {
  return (
    <div>
    <h1>Test 5</h1>
    <h2>Anger</h2>
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
