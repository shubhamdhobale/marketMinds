import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades} from "../redux/authSlice.js";
import Dashboard from "../components/Dashboard.jsx";
import SideBar from "../components/SideBar.jsx";

const Profile = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserTrades()); 
  }, [dispatch ]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex min-h-screen">
      <SideBar/>

      <Dashboard/>
    </div>
  );
};

export default Profile;
