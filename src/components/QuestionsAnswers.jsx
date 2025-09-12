import Answers from "./Answers";

const QuestionsAnswers = ({ result }) => {
  return (
    <>
      <div className="text-white ">
        <ul>
          {result.map((item, index) =>
            item.type == "qsn" ? (
              <li
                key={index}
                className="dark:text-zinc-300  text-right mx-2 mt-4 font-semibold border-5 bg-zinc-700
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
                <li
                  key={ansIndex}
                  className="text-left ml-2 mt-2 dark:text-neutral-200 text-zinc-800"
                >
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
      </div>
    </>
  );
};
export default QuestionsAnswers;
