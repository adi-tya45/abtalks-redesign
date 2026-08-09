import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Code, Briefcase, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChallengeDay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, success

  useEffect(() => {
    fetch(`https://abtalks-api-xyz.onrender.com/api/day/${id}`)
      .then(res => res.json())
      .then(data => setTask(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };

  if (!task) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-500 animate-spin" /></div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* App Bar */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4 flex items-center gap-4 z-20">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full border border-white/10 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div>
          <h1 className="font-bold text-sm">Day {id}</h1>
          <p className="text-[10px] text-purple-400 font-medium tracking-widest uppercase">Challenge Details</p>
        </div>
      </div>

      <div className="p-6 flex-1 pb-80">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black mb-4 leading-tight">{task.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-400 text-sm leading-relaxed mb-8">
          {task.description}
        </motion.p>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="font-bold text-sm mb-4 text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" /> Acceptance Criteria
          </h3>
          <ul className="space-y-4">
            {task.requirements.map((req, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300 items-start bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

{/* Responsive Proof of Work Drawer */}
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "spring", bounce: 0, duration: 0.6 }} className="fixed bottom-0 w-full max-w-7xl bg-zinc-900 border-t border-white/10 p-6 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-30">
        {status === 'success' ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Proof Submitted</h3>
            <p className="text-xs text-slate-400">Streak updated. See you tomorrow.</p>
          </motion.div>
        ) : (
<form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white">Submit Proof of Work</h4>
              <span className="text-[10px] bg-zinc-800 text-slate-300 px-2 py-1 rounded">Required</span>
            </div>
            
            {/* Swapped Github for Code here */}
            <div className="relative group">
              <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input required type="url" placeholder="GitHub Commit URL" className="w-full bg-black border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
            </div>
            
            {/* Swapped Linkedin for Briefcase here */}
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input required type="url" placeholder="LinkedIn Post URL" className="w-full bg-black border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
            </div>
            
            <button disabled={status === 'loading'} type="submit" className="mt-2 w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all">
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Day ' + id}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}