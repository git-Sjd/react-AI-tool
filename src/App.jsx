import { useState } from "react";
import "./App.css";
import { URL } from "./utils/constant";
import Answers from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(
      URL + "AIzaSyAthYlH92j0PiGRan4Fwd4MbXY6Aw9SKkg",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    response = await response.json();
    let rawData = response.candidates[0].content.parts[0].text;
    rawData = rawData.split("* ");
    let refinedData = rawData.map((item, index) => item.trim());
    // console.log("refinedData: -->", refinedData);
    setResult([
      ...result,
      { type: "qsn", qsnText: question },
      { type: "ans", ansText: refinedData },
    ]);
  };

  console.log("-->", result);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800"></div>

      <div className="col-span-4 p-10">
        <div className="container h-110 overflow-scroll">
          <div className="text-white ">
            <ul>
              {result.map((item, index) =>
                item.type == "qsn" ? (
                  <li key={index} className="text-left ml-2 mt-2 font-semibold">
                    <Answers
                      ans={item.qsnText}
                      index={index}
                      ansLength={item.length}
                    />
                  </li>
                ) : (
                  <li key={index} className="text-left ml-2 mt-2 pb-5 text-neutral-200">
                    <Answers
                      ans={item.ansText}
                      index={index}
                      ansLength={item.length}
                    />
                  </li>
                )
              )}
            </ul>

            {/* <ul>
              {result &&
                result.map((item, index) => (
                  <li key={index} className="text-left ml-2 mt-2">
                    <Answers ans={item} index={index} ansLength={item.length} />
                  </li>
                ))}
            </ul> */}
          </div>
        </div>

        <div className="flex bg-zinc-800 w-1/2 mt-5 m-auto text-white rounded-4xl p-1 pr-5 border border-zinc-700 h-16">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full outline-none p-3"
            placeholder="Ask me Anything"
          />
          <button className="cursor-pointer" onClick={askQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
