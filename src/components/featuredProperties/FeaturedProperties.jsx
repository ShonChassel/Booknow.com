import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/skeleton/Skeleton";
import "./featuredProperties.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const FeaturedProperties = () => {
    const [isMobile, setIsMobile] = useState(false);
    let { data, loading, error } = useFetch(
        "https://booknow-com.onrender.com/api/hotels?featured=true"
    );

    data = data.slice(0, 4);

    const navigate = useNavigate();
    const openHotel = (itemId) => {
        navigate(`/hotels/${itemId}`);
    };

    // const handleResize = () => {
    //     if (window.innerWidth < 720) {
    //         setIsMobile(true);
    //     } else {
    //         setIsMobile(false);
    //     }
    //     console.log("isMobile", isMobile);
    // };

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);
    // });

    
    

    console.log("data", data);
    return (
        <div className="fp">
            {loading ? (
                <Skeleton />
            ) : (
                <>
                
                    {data.map((item) => (
                        <div className="fpItem" key={item._id} onClick={() => {openHotel(item._id);}}> 
                            <img src={item.photos[0]} alt="" className="fpImg"/>
                            <div className="bottom-container">
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>  
                            </div>
                        </div>
                    ))}
                
                </>
            )}
        </div>
    );
};

export default FeaturedProperties;
