import "./hotel.scss";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import ReserveModal from "../../components/reserveModal/ReserveModal";

import Concierge from "../../assets/hotelIcons/Concierge.svg";
import Hour from "../../assets/hotelIcons/24-hour.svg";
import Airport from "../../assets/hotelIcons/Airport.svg";
import Business from "../../assets/hotelIcons/Business.svg";
import Designated from "../../assets/hotelIcons/Designated.svg";
import Facilities from "../../assets/hotelIcons/Facilities.svg";
import Ironing from "../../assets/hotelIcons/Ironing.svg";
import Room from "../../assets/hotelIcons/Room.svg";
import Snack from "../../assets/hotelIcons/Snack.svg";

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(
        `https://booknow-com.onrender.com/api/hotels/find/${id}`
    );
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);

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
    };

    setDays();

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };

    
    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                "loading"
            ) : (
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove("l")}
                            />
                            <div className="sliderWrapper">
                                <img
                                    src={data.photos[slideNumber]}
                                    alt=""
                                    className="sliderImg"
                                />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove("r")}
                            />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button className="bookNow" onClick={handleClick}>
                            Reserve or Book Now!
                        </button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this
                            property and get a free airport taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt=""
                                        className="hotelImg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">{data.desc}</p>
                                <div className="facilities">
                                    <p>Most popular facilities</p>
                                    
                                    <div className="facilities-img">
                                        <div><img src={Concierge} alt="" />Concierge</div>
                                        <div><img src={Business} alt="" />Business center</div>
                                        <div><img src={Room} alt="" />Room service</div>
                                        <div><img src={Snack} alt="" />Snack bar</div>
                                        <div><img src={Hour} alt="" />24-hour security</div>
                                        <div><img src={Airport} alt="" />Airport shuttle</div>
                                        <div><img src={Designated} alt="" />Designated smoking area</div>
                                        <div><img src={Facilities} alt="" />Facilities for disabled guests</div>
                                        <div><img src={Ironing} alt="" />Ironing service</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days === 0 || "NaN" ? 1 : days}-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this
                                    property has an excellent location score of
                                    9.8!
                                </span>
                                <h2>
                                    <b>
                                        $
                                        {days === 0 
                                            ? data.cheapestPrice
                                            : days *
                                              data.cheapestPrice *
                                              options.room}
                                    </b>{" "}
                                    ({days === 0 ? 1 : days} nights)
                                </h2>
                                <button onClick={handleClick}>
                                    Reserve or Book Now!
                                </button>
                            </div>
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>
            )}
            {openModal && <ReserveModal setOpen={setOpenModal} hotelId={id} />}
        </div>
    );
};

export default Hotel;
