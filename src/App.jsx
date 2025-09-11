import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./utils/constant";
import Answers from "./components/Answers";
import RecentSearch from "./components/RecentSearch";
import QuestionsAnswers from "./components/QuestionsAnswers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const [loader, setLoader] = useState(false);
  const scrollToAnswer = useRef();

  const askQuestion = async () => {
    // console.log("--->", selectedHistory)
    if (!question && !selectedHistory) {
      return false;
    }
    setLoader(true);
    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payLoadData = question ? question : selectedHistory;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: payLoadData,
            },
          ],
        },
      ],
    };

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
      { type: "qsn", qsnText: question ? question : selectedHistory },
      { type: "ans", ansText: refinedData },
    ]);
    setQuestion("");

    setLoader(false);

    setTimeout(() => {
      scrollToAnswer.current.scrollTop = scrollToAnswer.current.scrollHeight;
    }, 1000);
  };

  const isEnterKey = (event) => {
    // console.log("--->", event.key);
    if (event.key == "Enter") {
      askQuestion();
      // setQuestion()
    }
  };

  useEffect(() => {
    // console.log("-->", selectedHistory);
    askQuestion();
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <RecentSearch
        recentHistory={recentHistory}
        setRecentHistory={setRecentHistory}
        setSelectedHistory={setSelectedHistory}
      />

      <div className="col-span-4 px-2 py-4">
        <div>
          <h1 className="text-4xl pb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-800">
            Hello User, Ask me Anything
          </h1>
        </div>
        {loader ? (
          <div role="status" className="pb-2">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
        <div ref={scrollToAnswer} className="container h-130 overflow-scroll">
          <QuestionsAnswers result={result} />

          {/* <ul>
              {result &&
                result.map((item, index) => (
                  <li key={index} className="text-left ml-2 mt-2">
                    <Answers ans={item} index={index} ansLength={item.length} />
                  </li>
                ))}
            </ul> */}
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
