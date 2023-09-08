
import "./userModal.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import signout from "../../assets/signout.svg";
import close from "../../assets/close.svg"
import settings from "../../assets/settings.svg"
import dashboard from "../../assets/dashboard.svg"

const UserModal = () => {
    const navigate = useNavigate();

    const openHotel = (itemId) => {
        navigate(`/hotels/${itemId}`);
    };
    const LogOut = () => {
        localStorage.removeItem('user');
        navigate(`/`);
    };



    return (
        <div className="dropDownProfile">
            <div className="dropDown-container">
                <button>
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