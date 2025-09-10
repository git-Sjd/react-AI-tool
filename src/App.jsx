import { useState } from "react";
import "./App.css";
import { URL } from "./utils/constant";
import Answers from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState([]);

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
    if (!question) {
      return false
    }

    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      history = [question, ...history];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    } else {
      localStorage.setItem("history", JSON.stringify([question]));
      setRecentHistory([question]);
    }

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
    setQuestion('');
  };

  const clearHistory = () => {
    localStorage.clear()
    setRecentHistory([])
  }

  const isEnterKey = (event) => {
    console.log("--->", event.key)
    if (event.key == "Enter") {
      askQuestion();
      // setQuestion()
    }
  }

  // console.log("-->", result);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
        <h1 className="text-xl text-white felx justify-between text-center my-5">
          <span>Recent History</span>
          <button onClick={clearHistory} className="ml-5 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M312-696v480-480Zm139 552H312q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v149q-18-3-36-4.5t-36 .5v-145H312v479.63h106.17Q423-197 431.5-179q8.5 18 19.5 35Zm-67-144h24q0-70 24-111l24-41v-184h-72v336Zm120-204q14-11 32.5-22.5T576-534v-90h-72v132ZM671.77-96Q592-96 536-152.23q-56-56.22-56-136Q480-368 536.23-424q56.22-56 136-56Q752-480 808-423.77q56 56.22 56 136Q864-208 807.77-152q-56.22 56-136 56ZM727-199l34-34-65-65v-86h-48v106l79 79Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-sm text-left overflow-auto mt-5">
          {recentHistory.map((hisItem, hisIndex) => (
            <li className="truncate text-zinc-400 hover:bg-zinc-600 hover:text-zinc-400 cursor-pointer pl-3 my-1">
              {hisIndex + 1 + "." + " " + hisItem}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-4 p-10">
        <div className="container h-130 overflow-scroll">
          <div className="text-white ">
            <ul>
              {result.map((item, index) =>
                item.type == "qsn" ? (
                  <li
                    key={index}
                    className="text-zinc-300 text-right mx-2  mt-2 font-semibold border-5 bg-zinc-700
                     border-zinc-700 w-fit rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                  >
                    <Answers
                      ans={item.qsnText}
                      index={index}
                      ansLength={item.length}
                    />
                  </li>
                ) : (
                  item.ansText.map((ansItem, ansIndex) => (
                    <li className="text-left ml-2 mt-2 text-neutral-200">
                      <Answers
                        ans={ansItem}
                        index={ansIndex}
                      // ansLength={ansItem.length}
                      />
                    </li>
                  ))
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
            onKeyDown={isEnterKey}
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
