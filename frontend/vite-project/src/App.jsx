import { useState } from "react";
import { 
  FiMail, 
  FiUser, 
  FiTarget, 
  FiCopy, 
  FiCheck, 
  FiInfo,
  FiChevronRight,
  FiShield,
  FiZap,
  FiClock
} from "react-icons/fi";
import { 
  HiOutlineBriefcase, 
  HiOutlineEmojiHappy, 
  HiOutlineHand 
} from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import { TbSparkles } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [tone, setTone] = useState("professional");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    if (!purpose || !name) return;

    setLoading(true);
    setEmail("");
    setCopied(false);

    const res = await fetch("http://localhost:3000/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purpose,
        recipient_name: name,
        tone,
      }),
    });

    const data = await res.json();
    setEmail(data.email);
    setLoading(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 mb-8 text-center text-white overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 border border-white/20">
              <FiMail className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3">
              <TbSparkles className="w-8 h-8" />
              AI Email Generator
              <TbSparkles className="w-8 h-8" />
            </h1>
            <p className="text-blue-100 text-lg font-light max-w-lg mx-auto mb-6">
              Create perfectly crafted professional emails with artificial intelligence
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-blue-100">
                <FiZap className="w-4 h-4" />
                <span className="text-sm">Instant Generation</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <FiShield className="w-4 h-4" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <FiClock className="w-4 h-4" />
                <span className="text-sm">Time-Saving</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Form Section */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  Recipient Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    placeholder="e.g. John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiTarget className="w-4 h-4" />
                  Email Purpose
                </label>
                <div className="relative">
                  <FiTarget className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    placeholder="e.g. Job Application Follow-up"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                <FiInfo className="w-4 h-4" />
                Tone & Style
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { 
                    value: "professional", 
                    label: "Professional", 
                    icon: <HiOutlineBriefcase className="w-6 h-6" />,
                    description: "Formal business tone"
                  },
                  { 
                    value: "friendly", 
                    label: "Friendly", 
                    icon: <HiOutlineEmojiHappy className="w-6 h-6" />,
                    description: "Casual & approachable"
                  },
                  { 
                    value: "polite", 
                    label: "Polite", 
                    icon: <HiOutlineHand className="w-6 h-6" />,
                    description: "Respectful & courteous"
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTone(option.value)}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 ${
                      tone === option.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                    }`}
                  >
                    <div className={`p-3 rounded-lg mb-3 ${
                      tone === option.value ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {option.icon}
                    </div>
                    <span className="text-sm font-semibold mb-1">{option.label}</span>
                    <span className="text-xs text-gray-500 text-center">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateEmail}
              disabled={loading || !purpose || !name}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                  <span>Generating Email...</span>
                </>
              ) : (
                <>
                  <RiSendPlaneLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Generate Professional Email</span>
                  <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          {email && (
            <div className="border-t pt-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <TbSparkles className="w-5 h-5 text-blue-600" />
                    Generated Email
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">AI-crafted email ready to use</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      <span>Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-5 h-5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-1">
                {/* Email header simulation */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-medium text-gray-600">New Message</div>
                  </div>
                </div>
                
                <textarea
                  readOnly
                  rows={12}
                  value={email}
                  className="w-full bg-transparent px-6 py-5 font-sans text-gray-700 focus:outline-none resize-none leading-relaxed text-[15px]"
                  style={{ lineHeight: '1.7' }}
                />
                
                {/* Email footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      AI Generated Content
                    </span>
                    <span className="flex items-center gap-2">
                      <TbSparkles className="w-4 h-4" />
                      Powered by AI
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Pro Tip:</span> You can edit this email directly in the text area above. 
                      Personalize it further by adding specific details or adjusting the tone to match your style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <FiShield className="w-4 h-4" />
            Your data is never stored • Powered by advanced AI • No registration required
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Craft professional emails in seconds. Start communicating better today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;