import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTradeEntry = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user)
  const [trade, setTrade] = useState({
    ticker: "",
    type: "Buy",
    entryPrice: "",
    exitPrice: "",
    stopLoss: "",
    quantity: "",
    pnl: "",
    date: "",
    strategy: "",
    reason: "",
    marketCondition: "Bullish",
  });

  const handleChange = (name, value) => {
    setTrade({ ...trade, [name]: value });
  };

   // Calculate PnL when Entry Price, Exit Price, or Quantity changes
   useEffect(() => {
    const { entryPrice, exitPrice, quantity } = trade;
    if (entryPrice && exitPrice && quantity) {
      const pnl = (parseFloat(exitPrice) - parseFloat(entryPrice)) * parseInt(quantity);
      setTrade((prev) => ({
        ...prev,
        pnl: isNaN(pnl) ? "" : pnl.toFixed(2), // Keep 2 decimal places
      }));
    }
  }, [trade.entryPrice, trade.exitPrice, trade.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if(!user){
      toast.error("You have to logged in first");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trade),
      });
      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error adding trade:", error);
    }
  };

  return (
    <div className="max-w-7xl w-xl mx-auto p-10 mt-32 bg-white shadow-2xl rounded-lg mb-10">
      <img src="/images/logo.png" alt="" className="h-40 mx-auto"/>
      <h2 className="text-3xl font-extrabold mb-2 text-center tracking-wider">Add New Trade Entry</h2>
      <p className="text-center text-md tracking-widest">📈 Trade Smart, Track Better.</p>
      <form onSubmit={handleSubmit} className="space-y-4 w-full mt-8">
        <Input name="ticker" placeholder="Ticker Symbol (e.g., AAPL)" onChange={(e) => handleChange(e.target.name, e.target.value)} required />

        {/* Select for Trade Type */}
        <Select onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger className='font-semibold'>
            <SelectValue placeholder="Select Trade Type"/>
          </SelectTrigger>
          <SelectContent className='font-bold'>
            <SelectItem value="Buy" className='text-green-700'>Buy</SelectItem>
            <SelectItem value="Sell" className='text-red-700'>Sell</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Input name="entryPrice" type="number" placeholder="Entry Price" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
          <Input name="exitPrice" type="number" placeholder="Exit Price" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        </div>

        <div className="flex gap-2">
          <Input name="stopLoss" type="number" placeholder="Stop-Loss Price" onChange={(e) => handleChange(e.target.name, e.target.value)} />
          <Input name="quantity" type="number" placeholder="Quantity" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        </div>
        <Input name="pnl" type="number" placeholder="Total PnL" value={trade.pnl} onChange={(e) => handleChange(e.target.name, e.target.value)} />
        <Input name="date" type="date" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        <Input name="strategy" placeholder="Strategy Used" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        <Textarea name="reason" placeholder="Reason for Trade" onChange={(e) => handleChange(e.target.name, e.target.value)} />

        {/* Select for Market Condition */}
        <Select onValueChange={(value) => handleChange("marketCondition", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Market Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bullish">Bullish</SelectItem>
            <SelectItem value="Bearish">Bearish</SelectItem>
            <SelectItem value="Sideways">Sideways</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
          <Button type="button" className="bg-gray-400 hover:bg-gray-500 text-white" onClick={() => navigate("/dashboard")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTradeEntry;
