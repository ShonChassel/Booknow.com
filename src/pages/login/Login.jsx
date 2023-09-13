import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { api } from "../../slice/api";

import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Github from "../../assets/github.png";

import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";
import show_icon from "../../assets/show.svg";
import hide_icon from "../../assets/hide.svg";

const Login = () => {
    const [toggle, setToggle] = useState(false);
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(credentials);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://booknow-com.onrender.com/api/auth/login",credentials);

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            navigate("/login");
        }
    };

    const google = () => {
        window.open("http://localhost:8800/api/auth/google", "_self");
    };

    const Home = () => {
        navigate("/");
    };

    return (
        <div className="login">
            <header className="login-header">
                <p onClick={Home}>Booknow.com</p>
            </header>

            <h1 className="loginTitle"> Login </h1>
            <div className="wrap">
                <div className="left">
                    <div className="loginButton google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginButton facebook">
                        <img src={Facebook} alt="" className="icon" />
                        Facebook
                    </div>
                    <div className="loginButton github">
                        <img src={Github} alt="" className="icon" />
                        Github
                    </div>
                </div>

                <div className="center-line">
                    <div className="line" />
                    <div className="or">OR</div>
                </div>

                <div className="right">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input
                            onChange={handleChange}
                            type="username"
                            placeholder="Username"
                            id="username"
                        />
                    </div>

                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            onChange={handleChange}
                            type={!toggle ? "password" : "text"}
                            placeholder="Password"
                            id="password"
                        />
                        <img
                            src={!toggle ? hide_icon : show_icon}
                            alt=""
                            onClick={() => setToggle(!toggle)}
                            className="show-password"
                        />
                    </div>
                    <button className="submit" onClick={handleClick}>
                        Login
                    </button>
                    {error && <span>{error.message}</span>}
                    <span className={`${loading ? "loader" : ""}`}></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
