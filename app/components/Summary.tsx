import React, {useState} from 'react'
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import {PREVIEWLENGTH} from "../../constants";

const Category = ({ title, score }: CategoryProps) => (
    <section className={"resume-summary"}>
        <div className={"category"}>
            <div className={"flex flex-row gap-2 items-center justify-center"}>
                <p className={"text-lg font-bold text-dark-200"}>{title}</p>
                <ScoreBadge score={score}/>
            </div>
            <span className={score > 70 ? "text-green-600" :
                score > 49 ? "text-yellow-600" : "text-red-600"}>{score}/100</span>
        </div>
    </section>
)

const Summary = ({feedback, jobTitle, jobDescription, companyName}: SummaryProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    }

    const displayText = jobDescription ?
        isExpanded ? jobDescription : jobDescription.slice(0, PREVIEWLENGTH) + (jobDescription.length > PREVIEWLENGTH ? "..." : "") : "No description found";

    return (
        <section className={"bg-white rounded-2xl shadow-md w-full"}>
            <div className={"flex flex-row items-center p-4 gap-8"}>
                <ScoreGauge score={feedback.overallScore}/>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score}/>
            <Category title="Content" score={feedback.content.score}/>
            <Category title="Structure" score={feedback.structure.score}/>
            <Category title="Skills" score={feedback.skills.score}/>


            <div className={"px-4 pb-4"}>
                <p className={"text-sm text-gray-600"}>
                    Note: This analysis was generated for the position of <b>{jobTitle}</b> at <b>{companyName}</b>, based
                    on the following job description:<br/>
                    <span>{displayText} {" "}</span>
                    <button
                        onClick={toggleExpand}
                        className={"text-blue-500 hover:underline cursor-pointer font-medium"}>
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                </p>
            </div>
        </section>
)}
export default Summary
