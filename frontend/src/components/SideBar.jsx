import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../redux/authSlice.js";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast(
      (t) => (
        <div>
          <p className="font-semibold">Are you sure you want to logout?</p>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                dispatch(logout());
                navigate("/signin");
                toast.dismiss(t.id);
                toast.success("Logged out successfully!");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <div className="mt-24">
          <h2 className="text-2xl font-bold cursor-pointer"><Link to='/profile'>Dashboard</Link> </h2>
          <ul className="mt-6">
            <li className="py-2 cursor-pointer"><Link to="/newtrade">Add New Trade</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/tradehistory">Trade History</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/tradesummary">Trade Summary</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/equitychart">Success Curve</Link></li>
            <li className="py-2 cursor-pointer" onClick={handleLogout}>Logout              
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default SideBar