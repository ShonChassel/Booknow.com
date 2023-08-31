
import "./userModal.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import signout from "../../assets/signout.svg";
import close from "../../assets/close.svg"

const UserModal = () => {
    const navigate = useNavigate();

    const openHotel = (itemId) => {
        navigate(`/hotels/${itemId}`);
    };



    return (
        <div className="dropDownProfile">
            <div className="dropDown-container">
                <button>Dashboard</button>
                <button>Settings</button>
                <button>
                    <img src={signout} alt="" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserModal;