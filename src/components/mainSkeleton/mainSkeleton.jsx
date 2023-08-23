import "./mainSkeleton.scss";
import "../propertyList/PropertyList";

const mainSkeleton = () => {
    return (
        <div className="featured">

            <div className="featuredItem">
                <div className="featuredImg skeleton"/>
                <div className="featuredTitles">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>

            <div className="featuredItem">
            <div className="featuredImg skeleton"/>
                <div className="featuredTitles">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>

            <div className="featuredItem">
            <div className="featuredImg skeleton"/>
                <div className="featuredTitles">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>

        </div>
    );
};

export default mainSkeleton;
