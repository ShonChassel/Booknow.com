import useFetch from "../../hooks/useFetch";
import Skeleton from "../../components/skeleton/Skeleton";
import "./propertyList.css";

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType");
    const images = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://a0.muscache.com/im/pictures/8d9afde8-3412-4ca5-92a3-de1c8c628360.jpg?im_w=720",
    ];

    return (
      
        <div className="pList">
            {loading ? (
                <Skeleton/>
            ) : (
                <>
                    {data &&
                        images.map((img,i) => (
                            <div className="pListItem" key={i}>
                                <img
                                    src={img}
                                    alt=""
                                    className="pListImg"
                                />
                                <div className="pListTitles">
                                    <h1>{data[i]?.type}</h1>
                                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default PropertyList;
