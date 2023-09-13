
import "./userModal.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import signout from "../../assets/signout.svg";
import close from "../../assets/close.svg"
import settings from "../../assets/settings.svg"
import dashboard from "../../assets/dashboard.svg"
import { AuthContext } from "../../context/AuthContext";

const UserModal = () => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    const openHotel = (itemId) => {
        navigate(`/hotels/${itemId}`);
    };
    const LogOut = () => {
        localStorage.removeItem('user');
        dispatch({ type: "LOGOUT"});
        navigate(`/`);
    };

    const goDashboard = () => {
        navigate(`/dashboard`);
    };



    return (
        <div className="dropDownProfile">
            <div className="dropDown-container">
                <button onClick={goDashboard}>
                <img src={dashboard} alt="" />
                    Dashboard
                    </button>
                <button>
                <img src={settings} alt="" />
                    Settings
                </button>
                <button onClick={LogOut}>
                    <img src={signout} alt="" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserModal;