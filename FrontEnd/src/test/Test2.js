import React from 'react'

const questions = [
  {
    "number": 1,
    "question": "Feeling nervous, anxious, or on edge ",
    "answers": [
      {
        "value": "Not at all",
        "mark": 0
      },
      {
        "value": "Several days",
        "mark": 1
      },
      {
        "value": "More than half the days",
        "mark": 2
      },
      {
        "value": "Nearly every day",
        "mark": 3
      }
    ]
  },
  {
      "number": 2,
      "question": "Not being able to stop or control worrying",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    },
    {
      "number": 3,
      "question": "Worrying too much about different things",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    },
    {
      "number": 4,
      "question": "Trouble relaxing",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    },
    {
      "number": 5,
      "question": "Being so restless that it is hard to sit still",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    },
    {
      "number": 6,
      "question": "Becoming easily annoyed or irritable",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    },
    {
      "number": 7,
      "question": "Feeling afraid, as if something awful might happen",
      "answers": [
        {
          "value": "Not at all",
          "mark": 0
        },
        {
          "value": "Several days",
          "mark": 1
        },
        {
          "value": "More than half the days",
          "mark": 2
        },
        {
          "value": "Nearly every day",
          "mark": 3
        }
      ]
    }
]

export default function Test2() {
  return (
    <div>
      <h1>Test 2</h1>
      <h2> GAD-7 (Generalized Anxiety Disorder 7-item scale)</h2>
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
