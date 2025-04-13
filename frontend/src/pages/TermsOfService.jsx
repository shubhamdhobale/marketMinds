import { ScrollText, CheckCircle, XCircle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen  py-16 px-6 md:px-20 text-gray-800 mt-16">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <ScrollText className="text-yellow-600" size={32} />
          <h1 className="text-4xl font-bold text-yellow-700">Terms of Service</h1>
        </div>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <CheckCircle className="text-green-500" /> Acceptance of Terms
            </h2>
            <p className="mt-2 text-gray-600">
              By accessing MarketMinds, you agree to be bound by these Terms and applicable laws. If you disagree, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <CheckCircle className="text-blue-500" /> User Responsibilities
            </h2>
            <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
              <li>Provide accurate personal info during registration and payment</li>
              <li>Use the service only for legal and intended purposes</li>
              <li>Do not misuse or exploit site features</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              <XCircle className="text-red-500" /> Limitations
            </h2>
            <p className="mt-2 text-gray-600">
              We are not liable for indirect or accidental losses from using the platform. Access may be revoked if policies are violated.
            </p>
          </div>

          <div className="mt-10 text-sm text-gray-500">
            Last updated: April 2025 | For questions, reach us at support@marketminds.com
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
