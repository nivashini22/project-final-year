import React from 'react';
import './Test.css';

const questions = [
  {
    "number": 1,
    "question": "",
    "answers": [
      {
        "value": "I do not feel sad. ",
        "mark": 0
      },
      {
        "value": "I feel sad",
        "mark": 1
      },
      {
        "value": "I am sad all the time and I can't snap out of it. ",
        "mark": 2
      },
      {
        "value": "I am so sad and unhappy that I can't stand it.",
        "mark": 3
      }
    ]
  },
  {
      "number": 2,
      "question": "",
      "answers": [
        {
          "value": "I am not particularly discouraged about the future.  ",
          "mark": 0
        },
        {
          "value": "I feel discouraged about the future. ",
          "mark": 1
        },
        {
          "value": "I feel I have nothing to look forward to.  ",
          "mark": 2
        },
        {
          "value": "I feel the future is hopeless and that things cannot improve.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 3,
      "question": "",
      "answers": [
        {
          "value": "I do not feel like a failure. ",
          "mark": 0
        },
        {
          "value": "I feel I have failed more than the average person",
          "mark": 1
        },
        {
          "value": "As I look back on my life, all I can see is a lot of failures.  ",
          "mark": 2
        },
        {
          "value": "I feel I am a complete failure as a person. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 4,
      "question": "",
      "answers": [
        {
          "value": "I get as much satisfaction out of things as I used to.",
          "mark": 0
        },
        {
          "value": "I don't enjoy things the way I used to. ",
          "mark": 1
        },
        {
          "value": "I don't get real satisfaction out of anything anymore. ",
          "mark": 2
        },
        {
          "value": "I am dissatisfied or bored with everything. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 5,
      "question": "",
      "answers": [
        {
          "value": "I don't feel particularly guilty  ",
          "mark": 0
        },
        {
          "value": "I feel guilty a good part of the time. ",
          "mark": 1
        },
        {
          "value": "I feel quite guilty most of the time. ",
          "mark": 2
        },
        {
          "value": "I feel guilty all of the time. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 6,
      "question": "",
      "answers": [
        {
          "value": "I don't feel I am being punished.",
          "mark": 0
        },
        {
          "value": "I feel I may be punished. ",
          "mark": 1
        },
        {
          "value": "I expect to be punished. ",
          "mark": 2
        },
        {
          "value": "I feel I am being punished.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 7,
      "question": "",
      "answers": [
        {
          "value": "I don't feel disappointed in myself.",
          "mark": 0
        },
        {
          "value": "I am disappointed in myself. ",
          "mark": 1
        },
        {
          "value": "I am disgusted with myself. ",
          "mark": 2
        },
        {
          "value": "I hate myself.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 8,
      "question": "",
      "answers": [
        {
          "value": "I don't feel I am any worse than anybody else.",
          "mark": 0
        },
        {
          "value": "I am critical of myself for my weaknesses or mistakes. ",
          "mark": 1
        },
        {
          "value": "I blame myself all the time for my faults. ",
          "mark": 2
        },
        {
          "value": "I blame myself for everything bad that happens.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 9,
      "question": "",
      "answers": [
        {
          "value": "I don't have any thoughts of killing myself. ",
          "mark": 0
        },
        {
          "value": "I have thoughts of killing myself, but I would not carry them out.",
          "mark": 1
        },
        {
          "value": "I would like to kill myself. ",
          "mark": 2
        },
        {
          "value": "I would kill myself if I had the chance.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 10,
      "question": "",
      "answers": [
        {
          "value": "I don't cry any more than usual. ",
          "mark": 0
        },
        {
          "value": "I cry more now than I used to. ",
          "mark": 1
        },
        {
          "value": "I cry all the time now.  ",
          "mark": 2
        },
        {
          "value": "I used to be able to cry, but now I can't cry even though I want to. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 11,
      "question": "",
      "answers": [
        {
          "value": "I am no more irritated by things than I ever was. ",
          "mark": 0
        },
        {
          "value": "I am slightly more irritated now than usual.  ",
          "mark": 1
        },
        {
          "value": "I am quite annoyed or irritated a good deal of the time.  ",
          "mark": 2
        },
        {
          "value": "I feel irritated all the time. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 12,
      "question": "",
      "answers": [
        {
          "value": "I have not lost interest in other people.",
          "mark": 0
        },
        {
          "value": "I am less interested in other people than I used to be.  ",
          "mark": 1
        },
        {
          "value": "I have lost most of my interest in other people. ",
          "mark": 2
        },
        {
          "value": "I have lost all of my interest in other people. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 13,
      "question": "",
      "answers": [
        {
          "value": "I make decisions about as well as I ever could. ",
          "mark": 0
        },
        {
          "value": "I put off making decisions more than I used to. ",
          "mark": 1
        },
        {
          "value": "I have greater difficulty in making decisions more than I used to.",
          "mark": 2
        },
        {
          "value": "I can't make decisions at all anymore.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 14,
      "question": "",
      "answers": [
        {
          "value": "I don't feel that I look any worse than I used to. ",
          "mark": 0
        },
        {
          "value": "I am worried that I am looking old or unattractive.",
          "mark": 1
        },
        {
          "value": "I feel there are permanent changes in my appearance that make me look unattractive ",
          "mark": 2
        },
        {
          "value": "I believe that I look ugly.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 15,
      "question": "",
      "answers": [
        {
          "value": "I can work about as well as before. ",
          "mark": 0
        },
        {
          "value": "It takes an extra effort to get started at doing something. ",
          "mark": 1
        },
        {
          "value": "I have to push myself very hard to do anything",
          "mark": 2
        },
        {
          "value": "I can't do any work at all. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 16,
      "question": "",
      "answers": [
        {
          "value": "I can sleep as well as usual.",
          "mark": 0
        },
        {
          "value": "I don't sleep as well as I used to. ",
          "mark": 1
        },
        {
          "value": "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep",
          "mark": 2
        },
        {
          "value": "I wake up several hours earlier than I used to and cannot get back to sleep",
          "mark": 3
        }
      ] 
  },
  {
      "number": 17,
      "question": "",
      "answers": [
        {
          "value": "I don't get more tired than usual. ",
          "mark": 0
        },
        {
          "value": "I get tired more easily than I used to.",
          "mark": 1
        },
        {
          "value": "I get tired from doing almost anything. ",
          "mark": 2
        },
        {
          "value": "I am too tired to do anything.",
          "mark": 3
        }
      ] 
  },
  {
      "number": 18,
      "question": "",
      "answers": [
        {
          "value": "My appetite is no worse than usual. ",
          "mark": 0
        },
        {
          "value": "My appetite is not as good as it used to be. ",
          "mark": 1
        },
        {
          "value": "My appetite is much worse now.  ",
          "mark": 2
        },
        {
          "value": "I have no appetite at all anymore. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 19,
      "question": "",
      "answers": [
        {
          "value": "I haven't lost much weight, if any, lately. ",
          "mark": 0
        },
        {
          "value": "I have lost more than five pounds.",
          "mark": 1
        },
        {
          "value": "I have lost more than ten pounds.",
          "mark": 2
        },
        {
          "value": "I have lost more than fifteen pounds. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 20,
      "question": "",
      "answers": [
        {
          "value": "I am no more worried about my health than usual. ",
          "mark": 0
        },
        {
          "value": "I am worried about physical problems like aches, pains, upset stomach, or constipation. ",
          "mark": 1
        },
        {
          "value": "I am very worried about physical problems and it's hard to think of much else. ",
          "mark": 2
        },
        {
          "value": "I am so worried about my physical problems that I cannot think of anything else. ",
          "mark": 3
        }
      ] 
  },
  {
      "number": 21,
      "question": "",
      "answers": [
        {
          "value": "I have not noticed any recent change in my interest in sex.",
          "mark": 0
        },
        {
          "value": "I am less interested in sex than I used to be.",
          "mark": 1
        },
        {
          "value": "I have almost no interest in sex. ",
          "mark": 2
        },
        {
          "value": "I have lost interest in sex completely. ",
          "mark": 3
        }
      ] 
  }
]
   

const Test1 = () => {
  return (
    <div>
      <h1>Test 1</h1>
      <h2> Beck Depression Inventory (BDI)</h2>
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
  );
};

export default Test1;
