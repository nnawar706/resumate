import React from 'react'
import {CIRCUMFERENCE, NORMALIZEDRADIUS, STROKE} from "../../constants";

const Score = ({score}: ScoreProps) => {
    const progress = score / 100;
    const strokeDashOffset = CIRCUMFERENCE * (1-progress);

    return (
        <div className={"relative w-[100px] h-[100px]"}>
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={NORMALIZEDRADIUS}
                    stroke="#e5e7eb"
                    strokeWidth={STROKE}
                    fill="transparent"
                />
                {/* Partial circle with gradient */}
                <defs>
                    <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF97AD"/>
                        <stop offset="100%" stopColor="#5171FF"/>
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r={NORMALIZEDRADIUS}
                    stroke="url(#grad)"
                    strokeWidth={STROKE}
                    fill="transparent"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashOffset}
                    strokeLinecap="round"
                />
            </svg>

            <div className={"absolute inset-0 flex flex-col items-center justify-center"}>
                <span className={"font-semibold text-sm"}>{`${score}%`}</span>
            </div>
        </div>
    )
}
export default Score
