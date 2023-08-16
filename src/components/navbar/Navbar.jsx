import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();

    const Login = () => {
        navigate("/login");
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
                    <div className="user">
                        <div> {user.username} </div>
                        <img className="userImg" src={user.img} alt="" />{" "}
                    </div>
                ) : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
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
