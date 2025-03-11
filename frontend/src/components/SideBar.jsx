import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../redux/authSlice.js";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
      if (window.confirm("Are you sure you want to logout?")) {
        dispatch(logout());
        navigate("/signin");
      }
    };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <div className="mt-24">
          <h2 className="text-2xl font-bold cursor-pointer"><Link to='/profile'>Dashboard</Link> </h2>
          <ul className="mt-6">
            <li className="py-2 cursor-pointer"><Link to="/newtrade">Add New Trade</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/tradehistory">Trade History</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/tradesummary">Trade Summary</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/equitychart">Success Curve</Link></li>
            <li className="py-2 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default SideBar