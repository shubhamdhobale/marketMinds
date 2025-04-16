import Layout from "./Layout.jsx";

const Loader = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-white mt-10 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    </Layout>
  );
};

export default Loader;
