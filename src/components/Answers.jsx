import { useEffect, useState } from "react";
import { checkHeading, headingStart } from "../utils/helper";

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

    return (
        <>
            {index == 0 && ansLength > 1 ? (
                <span className="text-2xl pb-10 font-bold">{answer}</span>
            ) : heading ? (
                <span className="text-xl pb-2 ">{answer}</span>
            ) : (
                <span className="pl-3 inline-block">{ans}</span>
            )}
        </>
    );
};

export default Answers;
