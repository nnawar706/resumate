import React from 'react'
import {Link, useLocation} from "react-router";
import {LOGO} from "../../constants";

const Navbar = () => {
    const location = useLocation();
    const isUpload = location.pathname === "/upload";

    return (
        <nav className={"navbar"}>
            <Link to={"/"}>
                <img src={LOGO} height={200} width={200}  alt={"logo"}/>
            </Link>
            {!isUpload && (
                <Link to={"/upload"} className={"primary-button w-fit"}>
                    Upload Resume
                </Link>
            )}
        </nav>
    )
}
export default Navbar
