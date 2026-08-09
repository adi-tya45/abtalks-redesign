import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Activity, Target, Snowflake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [judgeState, setJudgeState] = useState('active');
  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null); // Added error tracking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setErrorMsg(null);
    
    fetch(`http://localhost:3000/api/user?state=${judgeState}`)
      .then(res => {
        if (!res.ok) throw new Error("Backend responded with an error");
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [judgeState]);

  // If the component crashes or network fails, show this HUGE red error on screen
  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">Connection Failed</h1>
        <p className="text-slate-400">Make sure your backend is running on port 3000.</p>
        <p className="text-xs text-slate-500 mt-4 bg-zinc-900 p-3 rounded-lg border border-zinc-800 font-mono text-left w-full max-w-md">
          Error Details: {errorMsg}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative pb-24">
      {/* ⚠️ Judge Edge-Case Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <select 
          className="bg-zinc-900/80 backdrop-blur-md text-xs text-slate-300 px-3 py-2 rounded-full border border-white/10 outline-none focus:border-purple-500 appearance-none shadow-xl"
          value={judgeState}
          onChange={(e) => setJudgeState(e.target.value)}
        >
          <option value="active">🟢 Active Profile</option>
          <option value="firstDay">⚪ First Day</option>
          <option value="missedDay">🔴 Missed Day</option>
          <option value="empty">👻 Empty Profile</option>
        </select>
      </div>

      {/* Header */}
      <div className="px-6 pt-16 pb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[50px] rounded-full" />
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
          <Activity className="w-3 h-3 text-purple-500" /> ABTalks Hub
        </h2>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {loading ? 'Loading...' : userData ? `Hey, ${userData.name}.` : 'Welcome.'}
        </h1>
      </div>

      <div className="px-6 flex-1">
        {loading ? (
           <div className="animate-pulse flex space-x-4 mt-10">
             <div className="flex-1 space-y-6 py-1">
               <div className="h-24 bg-zinc-800 rounded-2xl"></div>
               <div className="space-y-3">
                 <div className="grid grid-cols-3 gap-4">
                   <div className="h-8 bg-zinc-800 rounded col-span-2"></div>
                   <div className="h-8 bg-zinc-800 rounded col-span-1"></div>
                 </div>
                 <div className="h-8 bg-zinc-800 rounded"></div>
               </div>
             </div>
           </div>
        ) : (
        <AnimatePresence mode="wait">
          {!userData ? (
            /* --- EMPTY STATE --- */
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 p-8 bg-zinc-900/50 backdrop-blur-lg border border-dashed border-zinc-700 rounded-3xl text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                <Target className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Select Your Track</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Choose a technology specialization to generate your 60-day roadmap.</p>
              <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-transform">
                Browse Tracks
              </button>
            </motion.div>
          ) : (
            /* --- ACTIVE/MISSED/FIRST DAY STATES --- */
            <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Core Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-500/10 blur-xl rounded-full"/>
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Streak</span>
                  <div className="flex items-end gap-2">
                    <Flame className={`w-7 h-7 ${userData.streak > 0 ? 'text-orange-500' : 'text-zinc-600'}`} />
                    <span className="text-3xl font-black leading-none">{userData.streak}</span>
                  </div>
                </div>
                <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Standing</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <span className="text-sm font-bold truncate">{userData.standing}</span>
                  </div>
                </div>
              </div>

              {/* Edge Case Banners */}
              {judgeState === 'firstDay' && (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-r from-blue-900/40 to-zinc-900 border border-blue-500/30 p-5 rounded-2xl">
                  <h3 className="font-bold text-blue-400 text-sm mb-1">Zero to One 🚀</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Your 60-day journey starts tonight. Complete today's task to establish your streak.</p>
                </motion.div>
              )}

              {judgeState === 'missedDay' && (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-r from-red-900/30 to-zinc-900 border border-red-500/30 p-5 rounded-2xl relative overflow-hidden">
                  <Snowflake className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-500/10 rotate-12" />
                  <h3 className="font-bold text-red-400 text-sm mb-1">Streak in Danger!</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">You missed your commit yesterday. Use a freeze to protect your standing.</p>
                  <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold py-2.5 px-4 rounded-lg w-full flex items-center justify-center gap-2 transition-colors">
                    <Snowflake className="w-4 h-4" /> Activate Streak Freeze
                  </button>
                </motion.div>
              )}

              {/* The "Thoughtful Idea": Midnight Energy Grid */}
              {userData.history && (
                <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-sm text-slate-200">Energy Grid</h3>
                    <span className="text-xs text-purple-400 font-medium">{userData.progress}% Completed</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1.5">
                    {userData.history.map((day, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-sm ${day.completed ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'bg-zinc-800'}`}
                        style={{ opacity: day.completed ? 1 : 0.4 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Task CTA */}
              <div className="pt-2">
                <h3 className="text-sm font-bold mb-3 text-slate-400 uppercase tracking-wider">Tonight's Objective</h3>
                <Link to="/day/12" className="block bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-5 rounded-2xl active:scale-95 transition-transform relative overflow-hidden group">
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-purple-500/10 to-transparent" />
                  <span className="inline-block bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-1 rounded mb-3 border border-purple-500/20">DAY 12</span>
                  <h4 className="text-lg font-bold mb-1 text-white">Build an API Rate Limiter</h4>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-1">Implement a backend mechanism to prevent server overload.</p>
                  <div className="inline-flex items-center text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                    Start Coding <ArrowRight className="w-3 h-3 ml-1.5" />
                  </div>
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>
    </div>
  );
}