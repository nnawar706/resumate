import React from 'react'
import {Link} from "react-router";
import {LOGO} from "../../constants";

const Navbar = ({ showUpload }: NavbarProps) => {
    return (
        <nav className={"navbar"}>
            <Link to={"/"}>
                <img src={LOGO} height={200} width={200}  alt={"logo"}/>
            </Link>
            {showUpload && (
                <Link to={"/upload"} className={"primary-button w-fit"}>
                    Upload Resume
                </Link>
            )}
        </nav>
    )
}
export default Navbar
