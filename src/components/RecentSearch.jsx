const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <>
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
          {recentHistory &&
            recentHistory.map((hisItem, hisIndex) => (
              <li
                onClick={() => setSelectedHistory(hisItem)}
                className="truncate text-zinc-400 hover:bg-zinc-600 hover:text-zinc-400 cursor-pointer pl-3 my-1"
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
