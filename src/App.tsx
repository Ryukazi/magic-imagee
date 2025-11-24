import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden relative">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col items-center p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <footer className="p-6 text-center text-gray-500 text-sm border-t border-white/5">
            <p>© {new Date().getFullYear()} MagicGen. Powered by AI.</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
