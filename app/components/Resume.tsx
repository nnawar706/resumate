import React, {useEffect, useState} from 'react'
import {Link} from "react-router";
import Score from "~/components/Score";

const Resume = ({id, companyName, jobTitle, feedback, imageUrl}: ResumeProps) => {
    const [resumeUrl, setResumeUrl] = useState<string>()

    // useEffect(() => {
    //     const loadResume = async () => {
    //         const blob = await fs.read(imagePath);
    //         if(!blob) return;
    //         let url = URL.createObjectURL(blob);
    //         setResumeUrl(url);
    //     }
    //
    //     loadResume();
    // }, [imageUrl]);

    return (
        <Link to={`/resume/${id}`} className={"resume-card animate-in face-in duration-1000"}>
            <div className={"resume-card-header"}>
                <div className={"flex flex-col gap-2"}>
                    <h2 className={"!text-black font-bold break-words"}>{companyName}</h2>
                    <h3 className={"text-lg break-words text-gray-500"}>{jobTitle}</h3>
                </div>
                <div className={"flex-shrink-0"}>
                    <Score score={feedback.overallScore}/>
                </div>
            </div>
            <div className={"gradient-border animate-in fade-in duration-1000"}>
                <div className={"w-full h-full"}>
                    <img src={imageUrl} alt={`resume#${id}`}
                    className={"w-full h-[350px] max-sm:h-[200px] object-cover object-top"}/>
                </div>
            </div>
        </Link>
    )
}
export default Resume
