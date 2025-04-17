import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import jsPDF from "jspdf";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // const searchQuery = useSearchParams()[0];
  const referenceNum = searchParams.get("referance");
  const plan = searchParams.get("plan") || "Pro";
  const amount = searchParams.get("amount") || "499";
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();


  const planBenefits = {
    Pro: [
      "Advanced analytics dashboard",
      "Export trades to Excel/CSV",
      "Priority customer support",
    ],
    Premium: [
      "All Pro features",
      "AI-powered trade suggestions",
      "Unlimited trade logs",
      "Personalized insights",
    ],
  };

  const handleInvoiceDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("MarketMinds - Payment Invoice", 20, 20);

    // Divider
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Body content
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(`Reference ID: ${referenceNum}`, 20, 40);
    doc.text(`Plan Purchased: ${plan}`, 20, 50);
    doc.text(`Amount Paid: ₹${amount}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 80);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Note: This is a system-generated invoice for your payment confirmation.", 20, 100);

    // Save the PDF
    doc.save("MarketMinds_Invoice.pdf");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate("/profile"); 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 h-screen bg-gray-50 text-center px-6 mt-10">
      <Confetti width={width} height={height} />
      <CheckCircle2 size={80} className="text-green-500 animate-bounce" />
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-lg text-gray-800">
        Thank you for purchasing the{" "}
        <span className="font-semibold text-blue-500">{plan}</span> plan.
      </p>
      <p className="text-gray-600">
        Reference ID:{" "}
        <span className="font-mono text-black bg-white px-2 py-1 rounded shadow-sm">{referenceNum}</span>
      </p>

      <p className="text-sm text-gray-500">
        🎉 A receipt has been sent to your registered email.
      </p>

      <div className="w-full max-w-md mt-4 text-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">{plan} Plan Benefits:</h2>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {planBenefits[plan]?.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#4ECCA3] text-white px-4 py-2 rounded hover:bg-[#3bbd94] transition-all"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all"
        >
          Back to Home
        </button>
        <button
          onClick={handleInvoiceDownload}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          <Download size={16} /> Download Invoice
        </button>
      </div>

      <p className="text-xs mt-4 text-gray-400">
        (Pro and Premium features are in development. You’ll be notified when they’re live.)
      </p>

      <p className="text-sm mt-4 text-gray-400">Redirecting to your profile in {countdown}s...</p>
    </div>
  );
};

export default PaymentSuccess;
