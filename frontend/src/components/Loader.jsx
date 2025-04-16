
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen z-50">
      {/* Animation Container */}
      <div className="flex gap-4 pt-10 pb-6">
        <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
          <div className="w-1 h-6 bg-green-500"></div>
          <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
          <div className="w-1 h-6 bg-green-500"></div>
        </div>

        <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.2s]">
          <div className="w-1 h-6 bg-red-500"></div>
          <div className="w-3 h-12 bg-red-500 rounded-sm"></div>
          <div className="w-1 h-6 bg-red-500"></div>
        </div>

        <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
          <div className="w-1 h-6 bg-green-500"></div>
          <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
          <div className="w-1 h-6 bg-green-500"></div>
        </div>
      </div>

      {/* Text Below Animation */}
      <p className="text-black text-2xl font-bold mt-2">Loading...</p>
    </div>

  );
};

export default Loader;
