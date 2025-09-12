import { useEffect, useState } from "react";
import { checkHeading, headingStart } from "../utils/helper";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Answers = ({ ans, ansLength, index }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  // console.log("---->", ansLength, ans, index, heading, answer);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(headingStart(ans));
    }
  }, []);

  const codeRenderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index == 0 && ansLength > 1 ? (
        <span className="text-2xl pb-10 font-bold">{answer}</span>
      ) : heading ? (
        <span className="text-xl pb-2 ">{answer}</span>
      ) : (
        <span className="px-3 inline-block">
          <ReactMarkdown components={codeRenderer}>{ans}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answers;
