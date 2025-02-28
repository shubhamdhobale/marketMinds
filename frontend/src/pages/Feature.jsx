
const Feature = () => {
  return (
    <section className="py-16 px-8 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-gray-900">Why Choose MarketMinds?</h2>
    <div className="grid md:grid-cols-3 gap-8 mt-10">
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <img alt="Analytics" className="h-40 w-full object-cover rounded-lg" />
        <h3 className="text-xl font-semibold mt-4">Advanced Analytics</h3>
        <p className="text-gray-600 mt-2">Visualize your performance with charts, P&L summaries, and key metrics.</p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <img alt="Risk Management" className="h-40 w-full object-cover rounded-lg" />
        <h3 className="text-xl font-semibold mt-4">Risk Management</h3>
        <p className="text-gray-600 mt-2">Understand your exposure, optimize risk, and improve profitability.</p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <img src="https://source.unsplash.com/600x400/?finance,charts" alt="Trade Tracking" className="h-40 w-full object-cover rounded-lg" />
        <h3 className="text-xl font-semibold mt-4">Trade Tracking</h3>
        <p className="text-gray-600 mt-2">Log trades with ease and gain valuable insights on your performance.</p>
      </div>
    </div>
  </section>
  )
}

export default Feature