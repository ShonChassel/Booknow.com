import axios from "axios";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { api, url } from "../../slice/api";

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
            const res = await axios.post(`${url}/auth/login`, credentials,);

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            navigate("/login");
        }
    };

    const Home = () => {
        navigate("/");
    };
    const Register = () => {
        navigate("/register");
    };

    return (
        <div className="login">
            <header className="login-header">
                <p onClick={Home}>Booknow.com</p>
            </header>


            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>

                    <div className="input-box">
                        <img src={user_icon} alt="" />
                        <input type="text" onChange={handleChange} id="username" placeholder="Username" required />
                    </div>

                    <div className="input-box">
                        <img src={password_icon} alt="" />
                        <input type={!toggle ? "password" : "text"} onChange={handleChange} id="password" placeholder="Password" required />
                        <img
                            src={!toggle ? hide_icon : show_icon}
                            alt=""
                            onClick={() => setToggle(!toggle)}
                            className="show-password"
                        />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn" onClick={handleClick}>
                        Login
                    </button>

                    <div className="register-link">
                        <p>Don't have an account? <a onClick={Register}>Register</a></p>

                    </div>
                    {error && <span>{error.message}</span>}
                    <span className={`${loading ? "loader" : ""}`}></span>
                </form>


            </div>

        </div>
    );
};

export default Login;
