import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/skeleton/Skeleton";
import "./featuredProperties.scss";
import { useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "@trendyol-js/react-carousel";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const FeaturedProperties = () => {
  const [isMobile, setIsMobile] = useState(false);
  let { data, loading, error } = useFetch(
    "https://booknow-com.onrender.com/api/hotels?featured=true"
  );

  data = data.slice(0, 6);

  const navigate = useNavigate();
  const openHotel = (itemId) => {
    navigate(`/hotels/${itemId}`);
  };

  const getRandomNumber = () => {
    const min = 5;
    const max = 10;
    const includeDecimal = Math.random() < 0.5;
    let randomNumber;

    if (includeDecimal) {
      randomNumber = Math.random() * (max - min) + min;
    } else {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var roundedNumber = parseFloat(randomNumber.toFixed(1));
    return roundedNumber;
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  console.log("data", data);
  return (
    <div className="fp">
      {loading ? (
        <Skeleton />
      ) : (
        <Carousel 
          rightArrow={<FontAwesomeIcon icon={faArrowRight}/>}
          leftArrow={<FontAwesomeIcon icon={faArrowLeft}/>}
          show={3}
          slide={1}
          transition={0.9}
          swiping={true}
        >
          {data.map((item) => (
            <div
              className="fpItem"
              key={item._id}
              onClick={() => {
                openHotel(item._id);
              }}
            >
              <img src={item.photos[0]} alt="" className="fpImg" />
              <div className="bottom-container">
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <div className="price-container">
                  <span className="fpPrice">
                    Starting from ${item.cheapestPrice}
                  </span>
                  <span className="fpRating">{getRandomNumber()}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default FeaturedProperties;
