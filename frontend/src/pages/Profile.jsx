import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades, logout } from "../redux/authSlice.js";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user & trades from Redux store
  const { user, trades, loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserTrades()); // Fetch user's trades
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="border border-black p-8 w-96 rounded-md shadow-2xl flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#0A192F]">User Profile</h1>
        {user ? (
          <div className="mt-4 text-center">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Link to="/newtrade">
              <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">Add new Trade</button>
            </Link>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>

      {/* User's Trades Section */}
      <div className="mt-10 w-3/4">
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
              <p>PNL: ${trade.pnl}</p>
              <p className="text-gray-500 text-sm">Date: {new Date(trade.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
