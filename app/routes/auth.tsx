import React, {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";
import {LOGO, RESUMESCANNER} from "../../constants";
import Footer from "~/components/Footer";

export const meta = () => {
    return [
        { title: "ResuMate | SignIn" },
        { name: "description", content: "Sign into your account" },
    ];
}

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const isAuthenticated = auth.isAuthenticated;
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) {
            if (next) {
                navigate(next);
            }
            navigate("/");
        }
    }, [isAuthenticated, next]);

    return (
        <main className={"auth"}>
            <section className={"relative w-[850px] h-[550px] bg-white rounded-xl shadow-xl"}>
                <div
                    className={"absolute z-1 right-0 w-1/2 px-0 md:px-2 h-full flex flex-col gap-4 items-center justify-center text-center"}>
                    <img src={LOGO} width={300} alt={"logo"}/>
                    <h3 className={"text-gray-700"}>Sign In to Continue Your Journey of Job Hunting</h3>

                    {isLoading ? (
                        <button className={"auth-button animate-pulse"}>Signing you in...</button>
                    ): (
                        <button className={"auth-button"}
                                onClick={auth.signIn}>
                            Sign In
                        </button>
                    )}
                </div>

                <div className={"absolute w-full h-full"}>
                    <div className={"absolute w-1/2 h-full bg-[#c1d3f8] flex flex-col justify-center items-center"}>
                        <img src={RESUMESCANNER} className={"w-full"} alt={"resume-scanner"}/>
                        <Footer/>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Auth
