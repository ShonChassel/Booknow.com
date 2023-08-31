
import "./userModal.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const UserModal = () => {
    const navigate = useNavigate();

    const openHotel = (itemId) => {
        navigate(`/hotels/${itemId}`);
    };



    return (
        <div className="dropDownProfile">
            <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    );
};

export default UserModal;