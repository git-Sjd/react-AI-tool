import { useEffect, useState } from "react";
import { checkHeading, headingStart } from "../utils/helper";

const Answers = ({ ans, index }) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {

        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(headingStart(ans))
        }

    }, [])


    return (
        <>
            {heading ? <span className="text-3xl">{ans}</span> : <span>{ans}</span>}
        </>
    )
}

export default Answers;