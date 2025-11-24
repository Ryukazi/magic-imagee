import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="w-full p-6 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    MagicGen
                </h1>
            </Link>
            <nav className="flex gap-4">
                <Link
                    to="/gallery"
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                >
                    Gallery
                </Link>
                <Link
                    to="/about"
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                >
                    About
                </Link>
            </nav>
        </header>
    );
};

export default Header;

