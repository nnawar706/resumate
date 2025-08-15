import type { Route } from "./+types/home";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {SCANNER} from "../../constants";
import Navbar from "~/components/Navbar";
import Resume from "~/components/Resume";
import {usePuterStore} from "~/lib/puter";
import Footer from "~/components/Footer";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "ResuMate" },
    { name: "description", content: "Your go-to AI resume companion" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [resumes, setResumes] = useState<ResumeProps[]>([]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth?next=/")
  }, [isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoading(true);

      const resumes = (await kv.list("resume#*", true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as ResumeProps
      ))

      console.log(parsedResumes)

      setResumes(parsedResumes || []);
      setLoading(false);
    }

    loadResumes();
  }, []);

  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
    <Navbar showUpload={true} showSignOut={true}/>

    <section className={"main-section"}>
      <div className={"page-heading py-16"}>
        <h1>Track Your Applications & Resume Ratings</h1>
      {/*  #later# show resumes if any */}
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
      {(loading || (!loading && resumes.length === 0)) && (
          <div className={"flex flex-col items-center justify-center"}>
            <img src={SCANNER} className={"w-[200px]"} alt={"resume-scanner"}/>
            {!loading && resumes.length === 0 &&
                (<p className={"text-dark-200"}>You do not have any submissions yet.</p>)
            }
          </div>
      )}

      {!loading && resumes.length > 0 && (
          <div className={"resumes-section"}>
            {resumes.map((resume) => (
                <Resume key={resume.id}
                        id={resume.id}
                        companyName={resume.companyName}
                        jobTitle={resume.jobTitle}
                        feedback={resume.feedback}
                        imagePath={resume.imagePath}
                />
            ))}
          </div>
      )}
    </section>

    <Footer/>
  </main>;
}
