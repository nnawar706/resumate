import logo from "/icons/logo.png"
import resumeScanner from "/images/resume-scan.gif"
import scanner from "/images/resume-scan-2.gif"
import pdf from "/images/pdf.png";
import cross from "/icons/cross.svg";
import upload from "/icons/upload.svg";
import check from "/icons/check.svg";
import warning from "/icons/warning.svg";

export const LOGO = logo
export const SCANNER = scanner
export const RESUMESCANNER = resumeScanner
export const PDF = pdf
export const ICONCROSS = cross
export const ICONUPLOAD = upload
export const ICONCHECK = check
export const ICONWARNING = warning

export const PREVIEWLENGTH = 150;
export const MAXFILESIZE = 20 * 1024 * 1024 // 20MB in bytes

export const RADIUS = 40;
export const STROKE = 8;
export const NORMALIZEDRADIUS = RADIUS - STROKE / 2;
export const CIRCUMFERENCE = 2 * Math.PI * NORMALIZEDRADIUS;

const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
                                        jobTitle,
                                        jobDescription,
                                    }: InstructionProps) =>
    `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;