

const Profile = () => {

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-xl font-bold text-gray-800">Welcome,  !</h2>
        <p className="text-gray-600 mt-2">Email: </p>
        <p className="text-gray-500 text-sm mt-1">Joined: </p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
