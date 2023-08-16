import "./skeleton.scss";
import "../propertyList/PropertyList";

const Skeleton = () => {
    return (
        <div className="pList skeleton">
            <div className="pListItem">
                <div className="pListImg img-skeleton skeleton"></div>
                <div className="pListTitles">
                    <h1 className="skeleton-txt"></h1>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
