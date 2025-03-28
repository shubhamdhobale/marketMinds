import { useState } from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    category: "Trading Tips",
    img: "https://infobeat.com/wp-content/uploads/2020/09/5-Options-Trading-Tips-and-Strategies.png",
    title: "How to Manage Risk in Trading",
    excerpt: "Learn the essential strategies for risk management...",
    content: "Risk management is crucial for long-term success in trading. Many traders focus on maximizing profits but overlook the importance of minimizing losses. The foundation of risk management involves position sizing, stop-loss placement, and proper leverage usage. One of the most effective strategies is the 1-2% rule, where traders risk only 1-2% of their capital per trade to prevent devastating losses. Additionally, traders should implement a risk-reward ratio, ensuring that potential rewards outweigh potential losses. Hedging strategies, such as options or inverse ETFs, can also mitigate risks in volatile markets. By maintaining strict discipline and following these principles, traders can safeguard their capital and enhance consistency in their trading journey.",
  },
  {
    id: 2,
    category: "Market Analysis",
    img : "https://www.aimtechnologies.co/wp-content/uploads/2024/01/Market-Trend-Analysis.png",
    title: "Understanding Market Trends",
    excerpt: "A deep dive into market trends and how to analyze them...",
    content: "Market trends play a vital role in trading, helping traders make informed decisions. There are three primary trends: uptrends, downtrends, and sideways trends. Traders can identify these trends using technical indicators such as moving averages, trendlines, and support/resistance levels. The Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD) are commonly used to assess trend strength. Additionally, fundamental factors such as economic data, interest rate decisions, and geopolitical events significantly impact market direction. Successful traders combine both technical and fundamental analysis to develop a comprehensive understanding of market movements, allowing them to execute well-informed trades with higher probabilities of success.",
  },
  {
    id: 3,
    category: "Psychology",
    img : "https://primexbt.com/media/2020/05/image1-4.png",
    title: "Mastering Trading Psychology",
    excerpt: "Emotional control is key to consistent trading success...",
    content: "Many traders fail not due to a lack of strategy but because of emotional decision-making. Fear, greed, and overconfidence can lead to impulsive trading, revenge trading, and excessive risk-taking. To master trading psychology, traders must develop a disciplined mindset and establish clear trading rules. Keeping a trading journal to document emotions and decisions can help traders recognize patterns in their behavior. Practicing mindfulness, setting realistic expectations, and following a structured trading plan can improve emotional control. By maintaining psychological discipline, traders can execute trades objectively and enhance long-term success.",
  },
  {
    id: 4,
    category: "Technical Analysis",
    img: "https://cdn.prod.website-files.com/593e207ebedace68bd410daa/6540f79db8b0bbcd01ef1663_Asset%203%404x-8.png",
    title: "How to Use Moving Averages in Trading",
    excerpt: "Moving averages are powerful tools for identifying trends and reversals...",
    content: "Moving averages are one of the most widely used technical indicators in trading. The Simple Moving Average (SMA) calculates the average price over a set period, while the Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive to price changes. Traders commonly use the 50-day and 200-day moving averages to determine long-term trends, while shorter EMAs like the 9-day and 21-day help identify short-term trends. Moving average crossovers, such as the golden cross (bullish) and death cross (bearish), provide strong signals for potential entries and exits. When combined with other indicators like MACD or Bollinger Bands, moving averages become even more powerful in confirming trading opportunities.",
  },
  {
    id: 5,
    category: "Risk Management",
    img :"https://bpcdn.co/images/2022/08/05111137/avoid-loss.png",
    title: "How to Set Stop-Loss and Take-Profit Levels",
    excerpt: "Learn the best strategies for setting stop-loss and take-profit points...",
    content: "Setting appropriate stop-loss and take-profit levels is essential for risk management and protecting capital. A stop-loss prevents excessive losses by automatically closing a trade at a predetermined price, while a take-profit locks in gains when a trade reaches a target price. Traders should determine stop-loss levels based on support and resistance levels, Average True Range (ATR), or percentage-based risk management. A well-placed stop-loss allows room for natural price fluctuations while limiting downside risk. Similarly, take-profit levels should be based on realistic expectations and aligned with the risk-reward ratio. By consistently applying these principles, traders can optimize their profit potential while maintaining control over their risks.",
  },
  {
    id: 6,
    category: "Day Trading",
    img: "https://learn.moneysukh.com/wp-content/uploads/2024/03/How-to-Read-Analyse-Use-Candlestick-Chart-Patterns-for-Trading.png",
    title: "Best Strategies for Day Trading Success",
    excerpt: "Day trading requires quick decision-making and effective strategies...",
    content: "Day trading involves executing multiple trades within a single trading day, requiring quick decision-making and a strong strategy. Some of the best strategies include scalping, momentum trading, and breakout trading. Scalping focuses on capturing small price movements with high-frequency trades, while momentum trading involves identifying stocks with strong volume and price movement. Breakout trading capitalizes on stocks breaking through support or resistance levels. Traders should use indicators like VWAP, MACD, and RSI to improve accuracy. Risk management is crucial in day trading, with tight stop-losses and disciplined execution playing a key role in success. By staying focused, adapting to market conditions, and following a well-defined strategy, traders can maximize their intraday profits.",
  },
  {
    id: 7,
    category: "Swing Trading",
    img: "https://dss-www-production.s3.amazonaws.com/uploads/2022/12/What-proportion-of-day-traders-find-themselves-profitable.png",
    title: "How to Identify Swing Trading Opportunities",
    excerpt: "Swing trading involves capturing medium-term price movements...",
    content: "Swing trading is a trading style that aims to capture price swings over a few days to several weeks. It differs from day trading, which involves shorter timeframes, and long-term investing, which focuses on years. To identify swing trading opportunities, traders analyze chart patterns like flags, triangles, and head-and-shoulders formations. Indicators such as RSI, Stochastic Oscillator, and Fibonacci retracements help traders time entries and exits. Risk management in swing trading involves using wider stop-losses compared to day trading while targeting higher risk-reward ratios. Patience and discipline are key to successfully executing swing trades and maximizing profits from market fluctuations.",
  },
  {
    id: 8,
    category: "Fundamental Analysis",
    img : "https://static.vecteezy.com/system/resources/previews/020/176/533/non_2x/fundamental-analysis-is-a-method-of-assessing-the-intrinsic-value-of-a-security-by-analyzing-various-macroeconomic-and-microeconomic-factors-vector.jpg",
    title: "How to Analyze Financial Statements for Stock Trading",
    excerpt: "Understanding financial statements is essential for stock traders...",
    content: "Fundamental analysis helps traders assess a company's financial health by analyzing key financial statements: the income statement, balance sheet, and cash flow statement. The income statement shows a company’s profitability, while the balance sheet reveals assets, liabilities, and shareholder equity. The cash flow statement highlights how cash is generated and used. Traders use key financial ratios such as Price-to-Earnings (P/E), Price-to-Book (P/B), and Return on Equity (ROE) to evaluate a stock’s valuation. By combining fundamental analysis with technical analysis, traders can make more informed investment decisions and identify stocks with strong growth potential.",
  },
  {
    id: 9,
    category: "Algorithmic Trading",
    img: "https://hmatrading.in/wp-content/uploads/2024/02/algo-trading-software-1024x1024.jpg",
    title: "An Introduction to Algorithmic Trading Strategies",
    excerpt: "Learn how algorithmic trading can automate and optimize your trades...",
    content: "Algorithmic trading uses computer programs to execute trades based on predefined criteria. These strategies can range from simple moving average crossovers to complex high-frequency trading models. Common algorithmic trading strategies include mean reversion, trend-following, and arbitrage. Backtesting and optimization are essential to ensure an algorithm performs well under different market conditions. While algorithmic trading offers speed and efficiency, it requires strong programming skills and risk management to prevent unexpected losses. Traders can leverage Python libraries like Pandas, NumPy, and TA-Lib to develop and test their algorithms effectively.",
  }
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setExpandedPost(null);
  };

  const handleExpand = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen mt-40 md:px-4 px-10 mb-20">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        Explore Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">
          Blog & Resources
        </span>
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto px-4">
        {[
          "All",
          "Trading Tips",
          "Market Analysis",
          "Psychology",
          "Technical Analysis",
          "Risk Management",
          "Day Trading",
          "Swing Trading",
          "Fundamental Analysis",
          "Algorithmic Trading",
        ].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#4ECCA3] text-white shadow-md"
                : "bg-gray-500 text-white hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 ">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            layout
            className={`p-6 rounded-lg shadow-xl bg-white transition-transform hover:scale-95 duration-300 ${
              expandedPost === post.id ? "scale-105 z-10 col-span-1" : ""
            }`}
          >
            <img src={post.img} alt="" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {expandedPost === post.id ? post.content : post.excerpt}
            </p>
            <button
              onClick={() => handleExpand(post.id)}
              className="text-[#4ECCA3] font-medium underline hover:text-[#00c3ff] transition-all duration-300"
            >
              {expandedPost === post.id ? "Show Less" : "Read More"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
