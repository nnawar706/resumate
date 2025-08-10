import React, {type FormEvent, useEffect, useState} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import Navbar from "~/components/Navbar";
import {prepareInstructions, RESUMESCANNER} from "../../constants";
import FileUploader from "~/components/FileUploader";
import {convertPdfToImage} from "~/lib/pdf2image";
import {generateUUID} from "~/lib/utils";

const Upload = () => {
    const navigate = useNavigate();
    const { auth, isLoading, fs, kv, ai } = usePuterStore();
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return;

        setIsProcessing(true);

        // console.log({companyName, jobTitle, jobDescription, file})

        setStatus("Uploading in progress...");

        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatus("Error: Failed to upload file.");

        setStatus("Converting to image...");
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatus("Error: Failed to convert PDF to image.");

        setStatus("Uploading the image...");
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatus("Error: Failed to upload image.");

        setStatus("Analyzing in progress...");
        const uuid = generateUUID();

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: ""
        }

        await kv.set(`resume#${uuid}`, JSON.stringify(data));

        setStatus("Generating feedback...");

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        );

        if (!feedback) return setStatus("Error: Failed to generate feedback.");

        const feedbackText = typeof feedback.message.content === "string"
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);

        await kv.set(`resume#${uuid}`, JSON.stringify(data));
        setStatus("Redirecting...");

        navigate(`/resume/${uuid}`)
    }

    return (
        <main className={"upload-section"}>
            <Navbar showUpload={false}/>

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
