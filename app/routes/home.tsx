import type { Route } from "./+types/home";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";

import {RESUMES, SCANNER} from "../../constants";
import Navbar from "~/components/Navbar";
import Resume from "~/components/Resume";
import {usePuterStore} from "~/lib/puter";

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
  const resumes = RESUMES;

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth?next=/")
  }, [isAuthenticated]);

  return <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
    <Navbar showUpload={true}/>

    <section className={"main-section"}>
      <div className={"page-heading py-16"}>
        <h1>Track Your Applications & Resume Ratings</h1>
      {/*  #later# show resumes if any */}
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
      {loading && (
          <div className={"flex flex-col items-center justify-center"}>
            <img src={SCANNER} className={"w-[200px]"} alt={"resume-scanner"}/>
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
                        imageUrl={resume.imageUrl}
                />
            ))}
          </div>
      )}

      {!loading && resumes.length === 0 && (
          <div className={"flex flex-col items-center justify-center mt-10 gap-4"}>
            <Link to={"/upload"} className={"primary-button w-fit text-xl font-semibold"}>
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>;
}
