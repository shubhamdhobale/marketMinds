import { ShieldCheck, Info, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-16 px-6 md:px-20 text-gray-800 mt-16">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="text-green-600" size={32} />
          <h1 className="text-4xl font-bold text-green-700">Privacy Policy</h1>
        </div>
        <p className="text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-blue-600">MarketMinds</span>, your privacy is our top priority. This document outlines how we collect, use, and protect your information.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Info className="text-blue-500" /> Information We Collect
            </h2>
            <p className="mt-2 text-gray-600">
              We collect personal info (like name, email, payment details) only to improve your experience. We never sell your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="text-purple-500" /> How We Use It
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>To complete purchases and manage subscriptions</li>
              <li>To personalize your experience</li>
              <li>To improve customer service and troubleshoot issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="text-red-500" /> Your Control
            </h2>
            <p className="mt-2 text-gray-600">
              You can request to access, modify, or delete your data anytime by emailing us. We use secure protocols to keep your data safe.
            </p>
          </div>
        </section>

        <div className="mt-10 text-sm text-gray-500">
          Last updated: April 2025 | Questions? Contact - support@marketminds.com
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;