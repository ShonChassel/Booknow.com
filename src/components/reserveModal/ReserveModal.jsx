import "./reserve.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import PayButton from "../PayButton/PayButton";

import Air from "../../assets/roomIcons/Air.svg";
import Flat from "../../assets/roomIcons/Flat-screen.svg";
import FreeWiFi from "../../assets/roomIcons/FreeWiFi.svg";
import MiniBar from "../../assets/roomIcons/MiniBar.svg";
import Private from "../../assets/roomIcons/Private.svg";
import Terrace from "../../assets/roomIcons/Terrace.svg";

const ReserveModal = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(
        `https://booknow-com.onrender.com/api/hotels/rooms/${hotelId}`
    );
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [roomsOrder, setRoomsOrder] = useState([]);
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;

        console.log(value,value);
        setSelectedRooms((prevSelectedRooms) =>
            isChecked
                ? [...prevSelectedRooms, value]
                : prevSelectedRooms.filter((item) => item !== value)
        );

        
        let updatedRoomsOrder = [...roomsOrder];

        if (isChecked) {
            
            data.forEach((room1) => {
                room1.roomNumbers.forEach((room2) => {
                    if (room2._id === value) {
                        updatedRoomsOrder = [...updatedRoomsOrder, room1];
                    }
                });
            });
        } else {
            
            updatedRoomsOrder = updatedRoomsOrder.filter((room1) => {
                return room1.roomNumbers.every((room2) => room2._id !== value);
            });
        }

        setRoomsOrder(updatedRoomsOrder);

        if (!isChecked && selectedRooms.length === 1) {
            setRoomsOrder([]);
        }
    };

    const navigate = useNavigate();

    const handleReserve = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(
                        `https://booknow-com.onrender.com/api/rooms/availability/${roomId}`,
                        {
                            dates: alldates,
                        }
                    );
                    console.log("res.data", res.data);
                    return res.data;
                })
            );
            setOpen(false);
            // navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <div onClick={() => setOpen(false)} className="rClose" >X</div>
                {data.map((item) => (
                    <div className="rItem" key={item._id} onClick={handleSelect}>
                        {/* <img src={item.photos[1]} alt="" /> */}
                        <SimpleImageSlider
                            width={300}
                            height={200}
                            images={item.photos}
                            showBullets={true}
                            showNavs={true}
                        />
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rIcons">
                                <div><img src={Air} alt=""/>Air conditioning</div>
                                <div><img src={Private} alt=""/>Private Bathroom</div>
                                <div><img src={Flat} alt=""/>Flat-screen TV</div>
                                <div><img src={MiniBar} alt=""/>Bathroom</div>
                                <div><img src={FreeWiFi} alt=""/>Free WiFi</div>
                            </div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}$</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {/* <button className="rButton" onClick={handleReserve}>
                    Reserve Now!
                </button> */}
                <button className="rButton">
                    <PayButton cartItems={roomsOrder} />
                </button>
            </div>
        </div>
    );
};

export default ReserveModal;
