import "./register.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api,url } from "../../slice/api";

import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import show_icon from "../../assets/show.svg";
import hide_icon from "../../assets/hide.svg";

// axios.defaults.withCredentials = true

const Register = ({ inputs, title }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [toggle, setToggle] = useState(false)

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        data.append("file", file);
        data.append("upload_preset", "upload");

        dispatch({ type: "LOGIN_START" });
        try {
            
            const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dirvusyaz/image/upload',{
                method: 'POST',
                body: data
            }).then(r => r.json())

        
            const { url } = uploadRes;
            

            const newUser = { ...info, img: url };

            dispatch({ type: "LOGIN_START" });
            const res = await axios.post(`https://booknow-com.onrender.com/api/auth/register`, newUser,{withCredentials: true,});
            
            dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
            localStorage.setItem("user", JSON.stringify(newUser))
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const Home = () => {
        navigate("/");
    };
    

    return (
        <div className="register">
            <header className="register-header">
                <p onClick={Home}>Booknow.com</p>
            </header>

            <div className="newContainer">
                <form>
                    <div className="header1">
                        <div className="text">Sign Up</div>
                        <div className="underline"></div>
                    </div>

                    <div className="formImg">
                        <label htmlFor="file">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </label>

                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="inputs">
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
                            <img src={email_icon} alt="" />
                            <input
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                                id="email"
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
                            <img src={!toggle ? hide_icon : show_icon } alt="" onClick={() => setToggle(!toggle)} className="show-password" />
                        </div>

                        <button className="submit" onClick={handleClick}>
                            Sign Up
                        </button>
                        {error && <span>{error.message}</span>}
                        <span className={`${loading ? "loader" : ""}`}></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
