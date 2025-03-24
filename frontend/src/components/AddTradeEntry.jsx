import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import SideBar from "./SideBar.jsx";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import logo from "../assets/images/logo.png";
import marketData from "../MarketPairs.json";
import { VITE_API_BASE_URL } from "./index.js";

const AddTradeEntry = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [trade, setTrade] = useState({
    ticker: "",
    type: "Buy",
    entryTime: "",
    exitTime: "",
    entryPrice: "",
    exitPrice: "",
    stopLoss: "",
    quantity: "",
    pnl: "",
    date: "",
    strategy: "",
    reason: "",
    marketCondition: "Bullish"
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (name, value) => {
    setTrade(prev => ({ ...prev, [name]: value }));
  };

  useEffect(
    () => {
      const { entryPrice, exitPrice, quantity } = trade;
      if (entryPrice && exitPrice && quantity) {
        const pnl =
          (parseFloat(exitPrice) - parseFloat(entryPrice)) * parseInt(quantity);
        setTrade(prev => ({
          ...prev,
          pnl: isNaN(pnl) ? "" : pnl.toFixed(2)
        }));
      }
    },
    [trade.entryPrice, trade.exitPrice, trade.quantity]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      toast.error("You have to log in first");
      navigate("/signin");
      return;
    }

    const token = localStorage.getItem("token");
    // console.log("Token being sent:", token);

    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(`${VITE_API_BASE_URL}trade/newtrade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(trade)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Trade entry added successfully!");
        navigate("/profile");
      } else {
        toast.error(data.message || "Failed to add trade.");
      }
    } catch (error) {
      console.error("Error adding trade:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const tickerList = useMemo(
    () => [
      ...marketData.crypto_pairs.fiat,
      ...marketData.crypto_pairs.crypto_to_crypto,
      ...marketData.crypto_pairs.stablecoin,
      ...marketData.forex_pairs.major,
      ...marketData.forex_pairs.minor,
      ...marketData.us_stocks.tech,
      ...marketData.us_stocks.finance,
      ...marketData.us_stocks.healthcare,
      ...marketData.us_stocks.consumer,
      ...marketData.us_stocks.energy,
      ...marketData.indian_stocks.it,
      ...marketData.indian_stocks.banking,
      ...marketData.indian_stocks.energy,
      ...marketData.indian_stocks.auto,
      ...marketData.indian_stocks.indian_indices
    ],
    []
  );

  useEffect(
    () => {
      setFilteredTickers(
        tickerList.filter(ticker =>
          ticker.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    },
    [searchTerm, tickerList]
  );

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.trim() !== "");
  };

  const handleSelectTicker = ticker => {
    setSearchTerm(ticker);
    handleChange("ticker", ticker);
    setShowDropdown(false);
  };

  return (
    <div className="flex max-w-7xl min-h-screen md:flex-row flex-col">
      <button
        className="md:hidden p-2 bg-gray-800 text-white mt-24 rounded-lg px-4 cursor-pointer py-2 ml-6 md:ml-0 w-1/2"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      <div className="md:block hidden min-h-screen">
        {/* Sidebar */}
        <SideBar />
      </div>

      {/* Mobile Menu */}
      {sidebarOpen &&
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed right-0 w-full sm:w-full h-screen bg-[#11224097] p-6 flex flex-col items-center text-xl gap-6 shadow-lg z-50 top-20"
        >
          <button
            className="absolute top-4 right-4 text-[#4ECCA3]"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={28} />
          </button>
          {[
            "newtrade",
            "tradehistory",
            "tradesummary",
            "equitychart",
            "Log Out"
          ].map(item =>
            <Link
              key={item}
              to={`/${item}`}
              className="text-[#E2E8F0] tracking-wider hover:underline transition duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          )}
        </motion.div>}

      <div className="bg-white shadow-2xl mx-auto rounded-lg mb-10 md:mt-32 mt-8 w-full max-w-lg p-6 sm:p-10">
        <img src={logo} alt="Logo" className="h-32 sm:h-40 mx-auto" />
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center tracking-wider">
          Add New Trade Entry
        </h2>
        <p className="text-center text-sm sm:text-md tracking-widest">
          📈 Trade Smart, Track Better.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-6">
          <div
            style={{ position: "relative" }}
            className="flex gap-4 items-center "
          >
            <label htmlFor="ticker">Select Ticker:</label>
            <input
              type="text"
              placeholder="Search ticker (e.g., AAPL)"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              style={{
                width: "50%",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />

            {/* Dropdown List (Auto appears when searching) */}
            {showDropdown &&
              filteredTickers.length > 0 &&
              <ul
                style={{
                  position: "absolute",
                  width: "50%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "80px",
                  padding: "0",
                  listStyle: "none",
                  zIndex: 1000
                }}
              >
                {filteredTickers.map((ticker, index) =>
                  <li
                    key={index}
                    onClick={() => handleSelectTicker(ticker)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
                    onMouseEnter={e =>
                      (e.target.style.backgroundColor = "#f0f0f0")}
                    onMouseLeave={e =>
                      (e.target.style.backgroundColor = "white")}
                  >
                    {ticker}
                  </li>
                )}
              </ul>}
          </div>

          <div className="flex flex-row gap-2 md:gap-4">
            <Select onValueChange={value => handleChange("type", value)}>
              <SelectTrigger className="w-full sm:w-auto font-semibold">
                <SelectValue placeholder="Select Trade Type" />
              </SelectTrigger>
              <SelectContent className="font-bold">
                <SelectItem value="Buy" className="text-green-700">
                  Buy
                </SelectItem>
                <SelectItem value="Sell" className="text-red-700">
                  Sell
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="date"
              type="date"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="flex gap-4 md:gap-4 flex-row items-center">
            <label htmlFor="entryTime" className="text-gray-600 text-sm">
              Entry Time:
            </label>
            <input
              name="entryTime"
              id="entryTime"
              type="time"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="border p-2 rounded-md w-full sm:w-auto"
            />
            <label htmlFor="exitTime" className="text-gray-600 text-sm">
              Exit Time:
            </label>
            <input
              name="exitTime"
              id="exitTime"
              type="time"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="border p-2 rounded-md w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-row gap-2">
            <Input
              name="entryPrice"
              type="number"
              placeholder="Entry Price"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="w-full sm:w-auto"
            />
            <Input
              name="exitPrice"
              type="number"
              placeholder="Exit Price"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-row gap-2">
            <Input
              name="stopLoss"
              type="number"
              placeholder="Stop-Loss Price"
              onChange={e => handleChange(e.target.name, e.target.value)}
              className="w-full sm:w-auto"
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              onChange={e => handleChange(e.target.name, e.target.value)}
              required
              className="w-full sm:w-auto"
            />
          </div>

          <Input
            name="pnl"
            type="number"
            placeholder="Total PnL"
            value={trade.pnl}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
          <Input
            name="strategy"
            placeholder="Strategy Used"
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
            className="w-full"
          />
          <Textarea
            name="reason"
            placeholder="Reason for Trade"
            onChange={e => handleChange(e.target.name, e.target.value)}
            className="w-full"
          />

          <Select
            onValueChange={value => handleChange("marketCondition", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Market Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bullish">Bullish</SelectItem>
              <SelectItem value="Bearish">Bearish</SelectItem>
              <SelectItem value="Sideways">Sideways</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-row gap-4 justify-center">
            <Button
              type="submit"
              className="bg-[#4ECCA3] hover:bg-[#4ecca2e1] text-white w-full sm:w-auto cursor-pointer"
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white w-full sm:w-auto cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTradeEntry;
