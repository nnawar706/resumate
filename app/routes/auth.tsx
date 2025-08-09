import React, {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";

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
        if(auth.isAuthenticated) navigate(next);
    }, [isAuthenticated, next]);

    return (
        <main className={"auth"}>
            <section className={"gradient-border shadow-lg"}>
                <div className={"flex flex-col gap-8 bg-white rounded-2xl p-10"}>
                    <div className={"flex flex-col items-center gap-2 text-center"}>
                        <h1>Welcome</h1>
                        <h3>Sign In to Continue Your Journey of Job Hunting</h3>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className={"auth-button animate-pulse"}>Signing you in...</button>
                        ): (
                            <button className={"auth-button"}
                                    onClick={isAuthenticated ? auth.signOut : auth.signIn}>
                                {isAuthenticated ? "Sign Out" : "Sign In"}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Auth
