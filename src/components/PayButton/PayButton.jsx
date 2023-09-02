import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { url } from "../../slice/api";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import "./PayButton.scss";

const PayButton = ({ cartItems }) => {
    console.log("cartItems", cartItems);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { dates } = useContext(SearchContext);
    const [order, setOrder] = useState();
    // console.log("dates", dates);
    
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    let days;

    const setDays = () => {
        if (dates.length === 0) {
            console.log("No dates available.");
            return;
        }

        if (!dates[0].endDate) {
            dates[0].endDate = new Date();
        }

        days = dayDifference(dates[0].endDate, dates[0].startDate);
        console.log("days", days);
    };

    setDays();

    const handleCheckout = () => {

        axios
            .post(`${url}/stripe/create-checkout-session`, {
                cartItems,
                userId: user._id,
                days,
            })
            .then((response) => {
                console.log(response.data.url);
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    return <button className="PayButton" onClick={() => handleCheckout()}>Check out</button>;
};

export default PayButton;
