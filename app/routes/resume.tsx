import React, {useEffect, useState} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useNavigate, useParams} from "react-router";
import Navbar from "~/components/Navbar";
import Summary from "~/components/Summary";
import Ats from "~/components/ATS";
import Details from "~/components/Details";
import {SCANNER} from "../../constants";
import Footer from "~/components/Footer";

export const meta = () => ([
    { title: 'ResuMate | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { id } = useParams();
    const { auth, isLoading, fs, kv } = usePuterStore();
    const [jobTitle, setJobTitle] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [resumeUrl, setResumeUrl] = useState<string>("");
    const [feedback, setFeedback] = useState<FeedbackProps | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume#${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            setJobTitle(data.jobTitle);
            setJobDescription(data.jobDescription);
            setCompanyName(data.companyName);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    return (
        <main className={"!pt-0"}>
            <Navbar showUpload={false}/>
            {feedback ? (
                    <section className={"flex flex-row w-full max-lg:flex-col-reverse"}>
                        <div className={"feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center"}>
                            <div className={"animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit"}>
                                <a href={resumeUrl} target={"_blank"} rel={"noopener noreferrer"}>
                                    <img src={imageUrl} className={"w-full h-full object-contain rounded-2xl"} alt={"resume"}/>
                                </a>
                            </div>
                        </div>
                        <div className={"feedback-section"}>
                            <h2 className={"text-4xl font-bold"}>Resume Review</h2>

                            <div className={"flex flex-col gap-8 animate-in fade-in duration-1000"}>
                                <Summary
                                    jobTitle={jobTitle}
                                    jobDescription={jobDescription}
                                    companyName={companyName}
                                    feedback={feedback}/>

                                <Ats score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>

                                <Details feedback={feedback}/>
                            </div>
                        </div>
                    </section>
            ): (
                <div className={"flex justify-center"}>
                    <img src={SCANNER} alt={"resume-scanner"} width={280}/>
                </div>
            )}

            <Footer/>
        </main>
    )
}
export default Resume
