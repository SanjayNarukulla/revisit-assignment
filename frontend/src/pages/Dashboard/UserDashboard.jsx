import Sidebar from "../../components/Sidebar";
import Categories from "./Categories";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar role="admin" />
      <div className="flex-1">
        
        <Categories />
      </div>
    </div>
  );
};

export default AdminDashboard;
