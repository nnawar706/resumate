import React, {useEffect, useState} from 'react'
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
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isAuthenticated) navigate("/auth?next=/")
    }, [isAuthenticated]);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleSubmit = () => {}

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
                                <label htmlFor={"company-name"}>Company Name <span className={"text-red-600"}>*</span></label>
                                <input type={"text"} name={"company-name"} id={"company-name-input"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-title"}>Job Title <span className={"text-red-600"}>*</span></label>
                                <input type={"text"} name={"job-title"} id={"job-title-input"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"job-description"}>Job Description <span
                                    className={"text-red-600"}>*</span></label>
                                <textarea rows={5} name={"job-description"} id={"job-description-input"}/>
                            </div>
                            <div className={"form-div"}>
                                <label htmlFor={"uploader"}>Upload Resume <span
                                    className={"text-red-600"}>*</span></label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>

                            <p className={"text-xs text-red-600"}>* indicates required fields</p>
                            <button type="submit" className={"primary-button"}>Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
