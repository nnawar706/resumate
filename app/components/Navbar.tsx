import React from 'react'
import {Link} from "react-router";
import {LOGO} from "../../constants";
import {usePuterStore} from "~/lib/puter";

const Navbar = ({ showUpload, showSignOut }: NavbarProps) => {
    const { auth } = usePuterStore();
    return (
        <nav className={"navbar"}>
            <Link to={"/"}>
                <img src={LOGO} height={200} width={200}  alt={"logo"}/>
            </Link>
            <div className={"flex flex-row gap-2"}>
                {showUpload && (
                    <Link to={"/upload"} className={"primary-button w-fit"}>
                        Upload Resume
                    </Link>
                )}
                {showSignOut && (
                    <button className={"primary-button w-fit cursor-pointer"}
                    onClick={auth.signOut}>
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    )
}
export default Navbar
