import { Link } from 'react-router-dom';
import { Terminal, Code2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative pb-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[390px] h-[400px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="p-6 pt-12 flex-1 z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-12">
          <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <Terminal className="text-purple-400 w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">ABTalks</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[2.75rem] leading-[1.1] font-extrabold mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">midnight</span><br/> coding club.
        </motion.h1>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg mb-10 leading-relaxed">
          60 days. 1 commit a day. Built specifically for Indian college students who do their best work after 12 AM.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <div className="flex gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <Code2 className="text-blue-400 w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Build Daily</h3>
              <p className="text-slate-400 text-xs mt-1">Real-world tasks designed for mobile viewing.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <ShieldCheck className="text-green-400 w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Get Recruited</h3>
              <p className="text-slate-400 text-xs mt-1">Build a public proof-of-work portfolio.</p>
            </div>
          </div>
        </motion.div>
      </div>

{/* Sticky Responsive CTA */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring" }} className="fixed bottom-0 w-full max-w-7xl p-6 bg-gradient-to-t from-black via-black to-transparent z-50">
        <Link to="/dashboard" className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          Join the 60-Day Challenge <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
}