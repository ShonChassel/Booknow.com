import Sidebar from "../../../dashCmp/components/sidebar/Sidebar";
import Navbar from "../../../dashCmp/components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../dashCmp/components/widget/Widget";
import Featured from "../../../dashCmp/components/featured/Featured";
import Chart from "../../../dashCmp/components/chart/Chart";
import Table from "../../../dashCmp/components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
