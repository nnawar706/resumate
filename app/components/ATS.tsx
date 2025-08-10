import React from 'react'
import {ICONCHECK, ICONWARNING} from "../../constants";

const Ats = ({score, suggestions}: ATSProps) => {
    const gradientClass = score > 69
        ? 'from-green-100'
        : score > 49
            ? 'from-yellow-100'
            : 'from-red-100';

    const iconSrc = score > 69
        ? '/icons/ats-good.svg'
        : score > 49
            ? '/icons/ats-warning.svg'
            : '/icons/ats-bad.svg';

    const subtitle = score > 69
        ? 'Great Job!'
        : score > 49
            ? 'Good Start'
            : 'Needs Improvement';

    return (
        <section className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}>
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS-score" className="w-12 h-12"/>
                <div>
                    <p className="text-lg font-bold text-dark-200">ATS Score - {score}/100</p>
                </div>
            </div>
            <div className={"mb-6"}>
                <h3 className="text-xl font-semibold mb-2 text-dark-200">{subtitle}</h3>
                <p className="text-gray-600 mb-4">
                    This score represents how well your resume is likely to perform in Applicant Tracking Systems
                    used by employers.
                </p>

                <div className={"space-y-3"}>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className={"flex items-start gap-3"}>
                            <img src={suggestion.type === "good" ? ICONCHECK : ICONWARNING} alt={"icon"}
                                 className={"w-5 h-5 mt-1"}/>
                            <p className={suggestion.type === "good" ? "text-green-700" : "text-amber-700"}>
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-gray-700 italic">
                "Keep refining your resume to improve your chances of getting past ATS filters and into the hands of
                recruiters. Best of luck!"
            </p>
        </section>
    )
}
export default Ats
