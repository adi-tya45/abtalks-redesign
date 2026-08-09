import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';

export default function App() {
  return (
    <Router>
      {/* 🚀 Unlocked width: Now responsive up to massive laptop screens */}
      <div className="max-w-7xl w-full mx-auto min-h-screen bg-black text-white relative border-x border-zinc-900 overflow-x-hidden font-sans shadow-2xl">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:id" element={<ChallengeDay />} />
        </Routes>
      </div>
    </Router>
  );
}