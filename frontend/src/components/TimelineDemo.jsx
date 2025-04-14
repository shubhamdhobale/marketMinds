import { FaChartLine, FaClipboardList, FaRocket, FaUserCheck } from "react-icons/fa";
import { Timeline } from "../components/ui/Timeline.tsx";

export function TimelineDemo() {

  const data = [
    {
      title: "Sign up and create your profile",
      icon : <FaUserCheck className="text-[#4ECCA3] size-8 md:size-16"/>,
      content: (
        <div>
          <p
            className=" text-xs md:text-lg font-normal mb-8">
            Creating your <span className="font-bold">MarketMinds</span> account is quick and easy. Just provide basic details like your name, email, and password to set up your profile. Once registered, you can customize your trading dashboard, set preferences, and discover MarketMinds to your specific trading style.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="/register-ss.png"
              alt="register template"   
              className="rounded-lg object-contain  w-full shadow-2xl hover:scale-90 duration-500" />
            <img
              src="/login-ss.png"
              alt="login template"   
              className="rounded-lg object-contain  w-full shadow-2xl hover:scale-90 duration-500" />
          </div>
        </div>
      ),
    },
    {
      title: "Log Your Trades",
      icon : <FaClipboardList className="text-[#00c3ff] size-8 md:size-12"/>,
      content: (
        <div>
          <p
            className="text-xs md:text-lg font-normal mb-4">
            Effortlessly record every trade you make with detailed insights including:<br/>
✔ Entry & exit points 📈<br/>
✔ Stop-loss & take-profit levels 🛑<br/>
✔ Trading strategy used 🧠<br/>
✔ Market conditions at the time 🌍<br/>
✔ Emotional state & trading psychology 🧘<br/>
          </p>
          <p
            className="text-xs md:text-lg font-normal mb-8">
            By consistently logging trades, you gain clarity on your performance, helping you identify strengths and areas for improvement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="/log trades.png"
              alt="hero template"
              className="rounded-lg object-contain h-60 md:h-52 lg:h-72 w-full " />
              
          </div>
        </div>
      ),
    },
    {
      title: "Analyze and optimize your trading strategy",
      icon : <FaChartLine className="text-[#4ECCA3] size-8 md:size-16" />,
      content: (
        <div>
          <p
            className="text-xs md:text-lg font-normal mb-4 tracking-wide">
            Leverage AI-powered analytics to gain deep insights into your trading patterns. MarketMinds offers:
          </p>
          <div className="text-xs md:text-lg font-normal mb-4 tracking-wide">
          ✔ Performance Reports – Track win rates, risk-reward ratios, and profitability over time. <br/>
          ✔ AI-Driven Insights – Identify trends, common mistakes, and areas for growth. <br/>
          ✔ Customizable Dashboards – Visualize trade history, success metrics, and trading psychology factors in an easy-to-understand format.<br/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <img
              src="/trade calender.png"
              alt="hero template"
              className="rounded-lg h-60 md:h-52 lg:h-72 object-contain w-full" />
            <img
              src="/trade performance.png"
              alt="feature template"
              className="rounded-lg object-contain  w-full" />
            
          </div>
        </div>
      ),
    },
    {
      title: "Improve consistency & grow profits",
      icon : <FaRocket className="text-red-600 size-8 md:size-16" />,
      content: (
        <div>
          <p
            className="text-xs md:text-lg font-normal mb-4">
            The key to long-term trading success is consistency. MarketMinds helps traders:<br/>
          </p>
          <div className="text-xs md:text-lg font-normal mb-4">
          ✅ Develop discipline by following structured trading plans 📅<br/>
✅ Stay accountable with performance tracking and trade journaling 📝<br/>
✅ Reduce emotional trading and impulsive decisions 🤯<br/>
✅ Identify profitable setups and optimize risk management 📊<br/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <img
              src="/trade history.png"
              alt="hero template"
              className="rounded-lg object-contain w-full " />
            <img
              src="/trade summary.png"
              alt="feature template"
              className=" object-contain w-full " />
           
          </div>
        </div>
      ),
    },
  ];

  return (
    (<div className="w-full max-w-5xl">
      <Timeline data={data} />
    </div>)
  );
}
