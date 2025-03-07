import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades, logout } from "../redux/authSlice.js";
import Dashboard from "../components/Dashboard.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user & trades from Redux store
  const { user, trades, loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserTrades()); // Fetch user's trades
  }, [dispatch ]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/signin");
    }
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <div className="mt-24">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <ul className="mt-6">
            <li className="py-2 cursor-pointer"><Link to="/newtrade">Add New Trade</Link></li>
            <li className="py-2 cursor-pointer"><Link to="/tradehistory">Trade History</Link></li>
            <li className="py-2 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </aside>

      {/* User's Trades Section */}
      {/* <div className="mt-10 w-3/4">
        <h2 className="text-xl font-bold mb-4 text-center">My Trades</h2>
        {tradeLoading && <p>Loading trades...</p>}
        {tradeError && <p className="text-red-500">{tradeError}</p>}

        {!tradeLoading && !tradeError && trades.length === 0 && (
          <p className="text-gray-500 text-center">No trades found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trades.map((trade) => (
            <div key={trade._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">{trade.ticker}</h3>
              <p className="text-gray-600">Type: {trade.type}</p>
              <p>Entry: ${trade.entryPrice}</p>
              <p>Exit: ${trade.exitPrice}</p>
              <p className={trade.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                PNL: ${trade.pnl}
              </p>

              <p className="text-gray-500 text-sm">Date: {new Date(trade.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>  */}
      <Dashboard/>
    </div>
  );
};

export default Profile;
