import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Sparkles, Copy, Brain, Briefcase } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDesc) return alert("Please upload a Resume and Job Description");

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDesc', jobDesc);

    try {
      const res = await axios.post('http://localhost:5001/api/generate', formData);
      setLetter(res.data.letter);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || "Error: Backend is not running on port 5001!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience - Light Mode */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Subtle white/blue glows instead of deep colors */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[100px]" />
      </div>

      {/* Floating 3D Widgets - Light Cards */}
      <FloatingCard
        delay={0}
        icon={<Upload size={24} className="text-blue-500" />}
        text="1. Upload Resume"
        className="absolute top-24 left-10 hidden lg:flex shadow-xl bg-white/90 border-white/50"
      />
      <FloatingCard
        delay={2}
        icon={<Brain size={24} className="text-indigo-500" />}
        text="2. AI Analysis"
        className="absolute bottom-40 right-10 hidden lg:flex shadow-xl bg-white/90 border-white/50"
      />
      <FloatingCard
        delay={4}
        icon={<CheckCircle size={24} className="text-emerald-500" />}
        text="3. Get Hired"
        className="absolute top-32 right-20 hidden lg:flex shadow-xl bg-white/90 border-white/50"
      />

      {/* Hero Section */}
      <div className="text-center mb-10 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-4 py-1.5 mb-6 shadow-sm"
        >
          <span className="text-blue-900 font-semibold text-sm tracking-wide">✨ POWERED BY GEMINI 2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white drop-shadow-sm tracking-tight"
        >
          Stay on top of every <br /> application, effortlessly.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-900/80 mt-6 text-xl max-w-2xl mx-auto font-medium"
        >
          Simplify your workflow, collaborate with AI, and get hired faster — all in one app.
        </motion.p>
      </div>

      {/* Main Glass Panel - Light Version */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl bg-white/60 backdrop-blur-xl border border-white/60 rounded-[3rem] p-2 shadow-2xl ring-1 ring-white/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/50 rounded-[2.5rem] p-8 lg:p-12 border border-white/40 h-auto lg:h-[600px] shadow-inner">

          {/* Col 1: Upload */}
          <div className="flex flex-col gap-6 md:border-r border-slate-200/50 pr-8 pb-8 md:pb-0">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <Upload size={18} className="text-blue-500" /> Upload Resume
            </h2>
            <div className="relative group flex-1 border-2 border-dashed border-blue-200/60 rounded-3xl hover:border-blue-400 transition-all duration-300 bg-blue-50/50 hover:bg-white flex flex-col items-center justify-center text-center p-8 cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform text-blue-500">
                <FileText size={36} />
              </div>
              <p className="text-base text-slate-600 font-semibold group-hover:text-blue-600">
                {file ? file.name : "Click to Upload PDF"}
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Max 5MB</p>
            </div>
          </div>

          {/* Col 2: Job Desc */}
          <div className="flex flex-col gap-6 px-8 md:border-r border-slate-200/50 py-8 md:py-0">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-500" /> Job Description
            </h2>
            <textarea
              placeholder="Paste the Job Description here (e.g. 'We are looking for a Senior React Engineer...')"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="flex-1 w-full bg-white border border-slate-200/60 rounded-3xl p-6 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-blue-300 resize-none font-medium text-sm leading-relaxed shadow-sm transition-all"
            />
          </div>

          {/* Col 3: Preview */}
          <div className="flex flex-col gap-6 pl-8 pt-8 md:pt-0 relative">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-500" /> AI Preview
            </h2>

            <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 p-8 overflow-y-auto relative custom-scrollbar shadow-sm">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-sm z-10 rounded-3xl">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-blue-500 font-semibold animate-pulse">Crafting your letter...</p>
                </div>
              ) : letter ? (
                <div className="prose prose-sm max-w-none text-slate-600">
                  <p className="whitespace-pre-wrap leading-relaxed">{letter}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-40 space-y-4">
                  <div className="w-full h-3 bg-slate-100 rounded-full"></div>
                  <div className="w-5/6 h-3 bg-slate-100 rounded-full"></div>
                  <div className="w-4/5 h-3 bg-slate-100 rounded-full"></div>
                  <p className="text-xs font-semibold text-slate-400 text-center mt-2">Ready to generate</p>
                </div>
              )}
            </div>

            {letter && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigator.clipboard.writeText(letter)}
                className="absolute bottom-6 right-6 bg-white text-slate-700 p-3 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all"
                title="Copy to Clipboard"
              >
                <Copy size={20} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={handleSubmit}
            className="bg-white text-blue-600 font-bold py-5 px-16 rounded-full shadow-2xl border border-white/50 text-xl flex items-center gap-3 hover:shadow-blue-200/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? "Working..." : "Generate Letter"}
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-20 z-10 text-blue-900/40 font-semibold text-sm uppercase tracking-widest">
        ResuMate AI 2026
      </div>
    </div>
  );
}

function FloatingCard({ icon, text, className, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className={`glass-card p-5 rounded-2xl border flex items-center gap-4 ${className}`}
    >
      <div className="bg-blue-50 p-2.5 rounded-xl">
        {icon}
      </div>
      <div>
        <span className="block font-bold text-slate-700 text-sm">{text}</span>
        <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Step {text[0]}</span>
      </div>
    </motion.div>
  );
}

export default App;