import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../redux/authSlice.js";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center h-screen mt-40">
      <div className="border border-black p-8 w-96 rounded-md shadow-2xl flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#0A192F]">User Profile</h1>
        {user ? (
          <div className="mt-4 text-center">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Link to='/newtrade'>
              <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-green-700">Add new Trade</button>
            </Link>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
