import { useState } from "react";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  darkMode,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <>
      <div className="">
        <h1 className="text-xl dark:text-white text-zinc-800 justify-center text-center my-5">
          <span className="inline-block">Recent History</span>
          <button
            onClick={clearHistory}
            className="ml-5 cursor-pointer inline-block"
          >
            {darkMode == "dark" ? (
              <svg
                className=" inline-block"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#EFEFEF"
              >
                <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
              </svg>
            ) : (
              <svg
                className=" inline-block"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
              </svg>
            )}
          </button>
        </h1>
        <ul className="text-sm text-left overflow-auto mt-5">
          {recentHistory &&
            recentHistory.map((hisItem, hisIndex) => (
              <li
                onClick={() => setSelectedHistory(hisItem)}
                className="truncate dark:text-zinc-300 hover:bg-zinc-600 hover:text-zinc-400 cursor-pointer pl-3 my-1"
                key={hisIndex}
              >
                {hisIndex + 1 + "." + " " + hisItem}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
