import Sidebar from "../../../dashCmp/sidebar/Sidebar";
import Navbar from "../../../dashCmp/navbar/Navbar";
import "./home.scss";
import Widget from "../../../dashCmp/widget/Widget";
import Featured from "../../../dashCmp/featured/Featured";
import Chart from "../../../dashCmp/chart/Chart";
import Table from "../../../dashCmp/table/Table";

const Home = () => {
  return (
    <div className="dashboard-home">
      <Sidebar />

      <div className="dashboard-homeContainer">
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
          {/* <Table /> */}
        </div>

      </div>
    </div>
  );
};

export default Home;
