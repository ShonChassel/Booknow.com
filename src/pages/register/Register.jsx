import "./register.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = ({ inputs, title }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

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
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dirvusyaz/image/upload",
                data
            );

            const { url } = uploadRes.data;

            const newUser = { ...info, img: url };
            console.log(newUser);

            dispatch({ type: "LOGIN_START" });
            const res = await axios.post("/auth/register",newUser);
            console.log('res',res);
            dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
            // localStorage.setItem("user", JSON.stringify(newUser))
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image:{" "}
                                    <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            <input
                                onChange={handleChange}
                                type="username"
                                placeholder="username"
                                id="username"
                            />
                            <input
                                onChange={handleChange}
                                type="email"
                                placeholder="email"
                                id="email"
                            />
                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="password"
                                id="password"
                            />

                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
