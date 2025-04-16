
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-10 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      <div className="border border-gray-600 rounded-lg p-6">
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        <div className="h-48 bg-gray-800 rounded w-full mt-6"></div>        
      </div>
    </div>
  );
};

export default Loader;
