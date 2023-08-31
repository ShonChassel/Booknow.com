import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModal from "../userModal/userModal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import arrow from "../../assets/arrow_down.svg";
import close from "../../assets/close.svg";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { user } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();

    const Login = () => {
        navigate("/login");
    };
    const Register = () => {
        navigate("/register");
    };
    
    return (
        <div className="navbar">
            
            <div className="navContainer">
                <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "none" }}
                >
                    <span className="logo">Booknow.com</span>
                </Link>
                {user ? (
                    <div className={`user ${toggle ? "open" : ""}`}>
                        
                        <img className="userImg" src={user.img  ? user.img : 'https://res.cloudinary.com/dirvusyaz/image/upload/v1672414295/login_e5hmrq.svg'} alt="" />
                        <div> {user.username} </div>
                        <img src={!toggle ? arrow : close } alt="" onClick={() => setToggle(!toggle)} className="chevron" />
                        {toggle && <UserModal />}
                    </div>
                ) : (
                    <div className="navItems">
                        <button className="navButton"onClick={Register}>Register</button>
                        <button className="navButton" onClick={Login}>
                            Login
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Navbar;
