import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/skeleton/Skeleton";
import "./featuredProperties.css";
import { useHistory, useNavigate } from 'react-router-dom';

const FeaturedProperties = () => {
    let { data, loading, error } = useFetch(
        "https://booknow-com.onrender.com/api/hotels?featured=true"
    );

    console.log("data", data);
    data = data.slice(0, 4);

    const navigate = useNavigate();
    const openHotel = (itemId) => {
      navigate(`/hotels/${itemId}`);
  };

    return (
        <div className="fp">
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    {data.map((item) => (
                        <div
                            className="fpItem"
                            key={item._id}
                            onClick={() => {
                              openHotel(item._id);
                          }}
                        >
                            <img
                                src={
                                    item.photos[0]
                                        ? item.photos[0]
                                        : "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
                                }
                                alt=""
                                className="fpImg"
                            />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">
                                Starting from ${item.cheapestPrice}
                            </span>
                            {item.rating && (
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default FeaturedProperties;
