import "./list.scss"
import Sidebar from "../../../dashCmp/sidebar/Sidebar";
import Navbar from "../../../dashCmp/navbar/Navbar";
import Datatable from "../../../dashCmp/datatable/Datatable"

const List = ({columns}) => {
  console.log(columns);
  return (
    <div className="list">
      <Sidebar/>
      <div className="dashboard-listContainer">
        <Navbar/>
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List