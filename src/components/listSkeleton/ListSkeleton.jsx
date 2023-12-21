import "./listSkeleton.scss";

const ListSkeleton = () => {
    return (
        <div>

            <div className="searchItem skeleton">
                <div className="siImg skeleton"/>
                <div className="lsTitle">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>

            <div className="searchItem skeleton">
                <div className="siImg skeleton"/>
                <div className="lsTitle">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>
            
            <div className="searchItem skeleton">
                <div className="siImg skeleton"/>
                <div className="lsTitle">
                    <h1> </h1>
                    <h2></h2>
                </div>
            </div>
            
        </div>
    );
};

export default ListSkeleton;