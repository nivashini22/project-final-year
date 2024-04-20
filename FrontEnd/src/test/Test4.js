import React from 'react'

const questions = [
  {
    "number": 1,
    "question": "You are locking up cells at night-time when one prisoner tells you he needs to borrow a book from another prisoner. You have to make sure everyone is locked up in the next two minutes and the other prisoner's cell is 5 or 6 doors down the corridor. He is pleading with you, saying it won't take him long and that he has to have the book. What would you do?",
    "answers": [
      {
        "value": "Tell the prisoner he has had plenty of time and shut the cell door so that he cannot speak to you anymore.",
        "mark": 0
      },
      {
        "value": "Refuse the request and explain to the prisoner that you have to get everyone locked up on time.",
        "mark": 10
      },
      {
        "value": "Allow the prisoner to go and get the book on the condition that he is back in one minute.",
        "mark": 0
      }
    ]
  },
  {
      "number": 2,
      "question": "You are just finishing a day shift when you come across a prisoner who begins a conversation with you. Although she does not seem to be visibly upset, she tells you how unhappy she is, using phrases like 'my life is worthless' and 'I don't know what to do'. You know this prisoner does not get on well with some of the other officers and you have a good rapport with her. What would you do?",
      "answers": [
        {
          "value": "Stay with the prisoner as long as it takes until you are satisfied her issues have been resolved. ",
          "mark": 0
        },
        {
          "value": "Fill in a document monitoring those at risk of self-harm and speak to a staff member coming on duty about your conversation.",
          "mark": 10
        },
        {
          "value": "Listen for a few minutes and then promise to continue the conversation when you are back on shift the next day.",
          "mark": 0
        }
      ]
    },
    {
      "number": 3,
      "question": "It’s Sunday and you have a busy week coming up. You have a master’s assignment deadline on Friday and the Governor has asked you to take the lead on a new project to improve wellbeing of prisoners on your wing, which is being launched on Wednesday. You also have long shifts at work on Wednesday and Thursday. What would you do?",
      "answers": [
        {
          "value": "Ask for an assignment extension due to work ",
          "mark": 0
        },
        {
          "value": "Speak to your mentor to get some advice on managing your time and see where you can get some support from colleagues",
          "mark": 10
        },
        {
          "value": "Put the wellbeing project off until next week so you can focus on your assignment",
          "mark": 0
        }
        
      ]
    },
    {
      "number": 4,
      "question": "You have noticed that a colleague has not been doing so well recently. One day, they accidentally send the wrong invoice to a customer and you notice it while going through their work. This is quite early on and the situation can still be fixed. What would you do?",
      "answers": [
        {
          "value": "They have been causing a lot of mistakes recently, so rather than deal with it you simply report the mistake to your superior ",
          "mark": 5
        },
        {
          "value": "You act like nothing has happened. This is none of your business, so you simply go on with your own work.",
          "mark": 0
        },
        {
          "value": "You quickly step in, take charge and fix the situation. Once you have fixed it, you speak to your colleague",
          "mark": 5
        },
        {
          "value": "You take you colleague aside and tell them what they did, help them fix the mistake and advise them to talk to the manager.",
          "mark": 10
        }
      ]
    },
    {
        "number": 5,
        "question": "You re-enter the main shop floor from the stock room and find a customer yelling at one of your subordinates about a faulty product they purchased. They are in distress and don’t seem to know how to deal with the situation. It seems that if the situation continues for much longer that it might get out of hand. What would you do?",
        "answers": [
          {
            "value": "You quickly step in and say your subordinate does not know what to do and take over the ccase to help the customer by yourself.",
            "mark": 0
          },
          {
            "value": "You call security to be on standby before approachin the situation to see what is happening. You offer to assist them and once that is clear, you see how your subordinate is. ",
            "mark": 10
          },
          {
            "value": "You swiftly step in and ask to be explained the situation. After being informed, you offer to refer the customer onto someone who can help and then check on your subordinate.",
            "mark": 5
          },
          {
            "value": "You take a minute to monitor the situation before stepping in and offering to help the customer. Your apologise profusely for the error and offer some sort of compensation.",
            "mark": 5
          }
        ]
      },
      {
        "number": 6,
        "question": "You recently called out your teammate Ria on doing something wrong that had potential of ruining the project that you were working on. Yesterday you overheard from Tina in accounting that she has been badmouthing you behind your back to everyone and is giving you a bad image. What would you do?",
        "answers": [
          {
            "value": "You try to talk to Ria and explain that you did not mean to upset her before, try to sort out the situation and tell her that if she persists that you will file a complaint.",
            "mark": 10
          },
          {
            "value": "You approach Ria and ask her why she was saying things behind your back and tell her to talk to you if she has a complaint in the future rather than spread rumours.",
            "mark": 5
          },
          {
            "value": "You immediately act against her and file a formal complaint with your boss. This sort of behaviour should not be tolerated in a professional environment.",
            "mark": 0
          },
          {
            "value": "You approach Ria and ask her to explain why she has been saying such things and that if she doesn't stop, you will file a formal complaint.",
            "mark": 5
          }
        ]
      },
      {
        "number": 7,
        "question": "You have recently moved to a new department within the company. A customer contacts you with a problem they are having. The issue is not related to your new department but is related to your previous one. What would you do?",
        "answers": [
          {
            "value": "Contact your manager and ask if it alright for you to help the customer despite the issue not being related to your department. If not, you refer them to the correct one.",
            "mark": 10
          },
          {
            "value": "You know exactly what need to be done and tell your manager to let you take care of the problem for the customer, so they don't have to go to another department.",
            "mark": 5
          },
          {
            "value": "As this is a problem you have dealt with before, you offer to take care of the problem for the cutomer and then continue working on other things.",
            "mark": 0
          },
          {
            "value": "Apologise to the customer and explain that your department does not deal wiht this problen and redirect them to the correct one.",
            "mark": 5
          }
        ]
      },
      {
        "number": 8,
        "question": "You are asked to compile information on a prospective client by your supervisor. The client is expected to bring in many projects to the company. You find some compromising information on the client. This can result in losing the client. What do you do next?",
        "answers": [
          {
            "value": "You discuss this with a senior colleague and seek advice on what to do.",
            "mark": 5
          },
          {
            "value": "Your report this to your supervisor as organisatinal policies are against this.",
            "mark": 10
          },
          {
            "value": "You leave out the information as it can result in losing the client",
            "mark": 0
          },
          {
            "value": "You ask your colleagues who have dealt with similar situations for advice.",
            "mark": 5
          }
        ]
      },
      {
        "number": 9,
        "question": "You are working in the customer service department. In your organisation, the enquiry department and the customer complaint department work next to each other, often leading to customers queuing up in different queues. This has led to increased customer dissatisfaction. How would you deal with the situation?",
        "answers": [
          {
            "value": "Assign some colleagues to direct the customers to the right queue.",
            "mark": 5
          },
          {
            "value": "Apologise to the customers and ask them to make sure they are in the right queue.",
            "mark": 0
          },
          {
            "value": "Pass along the queue frequently and inform the customers which queue they are in.",
            "mark": 5
          },
          {
            "value": "Sugges placing signs with clear directions next to each queue.",
            "mark": 10
          }
        ]
      }
]

export default function Test4() {
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
