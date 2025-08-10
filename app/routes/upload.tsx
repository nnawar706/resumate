import React, {type FormEvent, useEffect, useState} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import Navbar from "~/components/Navbar";
import {RESUMESCANNER} from "../../constants";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const navigate = useNavigate();
    const { auth, isLoading } = usePuterStore();
    const isAuthenticated = auth.isAuthenticated;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const isSubmittable = companyName.trim() !== "" && jobTitle.trim() !== "" && jobDescription.trim() !== "" && file !== null;

    useEffect(() => {
        if (!isAuthenticated) navigate("/auth?next=/")
    }, [isAuthenticated]);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");

        if (!form) return;

        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
    }

    return (
        <main className={"upload-section"}>
            <Navbar/>

            <section className={"main-section"}>
                <div className={"page-heading py-16"}>
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h3>{status}</h3>
                            <img src={RESUMESCANNER} className={"w-full"} alt={"resume-scanner"}/>
                        </>
                    ): (
                        <h3>Drop your resume for an ATS score and improvement tips</h3>
                    )}

                    {!isProcessing && (
                        <form id={"upload-form"} onSubmit={handleSubmit}
                              className={"flex flex-col gap-4 mt-8"}>
                            <div className={"form-div"}>
                                <label htmlFor={"company-name"}>Company Name <span
                                    className={"text-red-600"}>*</span></label>
                                <input type={"text"} name={"company-name"}
                                       onChange={(e) => setCompanyName(e.target.value)}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-title"}>Job Title <span className={"text-red-600"}>*</span></label>
                                <input type={"text"} name={"job-title"} onChange={(e) => setJobTitle(e.target.value)}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-description"}>Job Description <span
                                    className={"text-red-600"}>*</span></label>
                                <textarea rows={5} name={"job-description"}
                                          onChange={(e) => setJobDescription(e.target.value)}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"uploader"}>Upload Resume <span
                                    className={"text-red-600"}>*</span></label>
                                <FileUploader file={file} onFileSelect={handleFileSelect}/>
                            </div>

                            <p className={"text-xs text-red-600"}>* indicates required fields</p>

                            <button type="submit"
                                    disabled={!isSubmittable}
                                    className={`primary-button ${isSubmittable ? "cursor-pointer" : "!primary-gradient-blur cursor-not-allowed"}`}>Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
