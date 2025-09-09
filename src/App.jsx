import { useState } from 'react'
import './App.css'
import { URL } from './utils/constant';
import Answers from './components/Answers';

function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }

  const askQuestion = async () => {
    let response = await fetch(URL + "AIzaSyAthYlH92j0PiGRan4Fwd4MbXY6Aw9SKkg", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    response = await response.json();
    let rawData = response.candidates[0].content.parts[0].text;
    rawData = rawData.split("* ");
    let refinedData = rawData.map((item, index) => item.trim());
    console.log("refinedData: -->", refinedData);
    setResult(refinedData)
  }

  return (
    <div className='grid grid-cols-5 h-screen text-center'>

      <div className='col-span-1 bg-zinc-800'>
      </div>

      <div className='col-span-4 p-10'>
        <div className='container h-110 overflow-scroll'>
          <div className='text-white '>
            {/* {result} */}
            <ul>
              {
                result && result.map((item, index) =>
                  <li className='text-left ml-2 mt-2'>
                    <Answers ans={item} key={index + 1} />
                  </li>)
              }
            </ul>
          </div>
        </div>

        <div className='flex bg-zinc-800 w-1/2 mt-5 m-auto text-white rounded-4xl p-1 pr-5 border border-zinc-700 h-16'>
          <input type='text' value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full outline-none p-3' placeholder='Ask me Anything' />
          <button className='cursor-auto' onClick={askQuestion}>Ask</button>
        </div>
      </div>

    </div>
  )
}

export default App
