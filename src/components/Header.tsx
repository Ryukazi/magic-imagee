import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="w-full p-6 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg shadow-lg shadow-primary/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    MagicGen
                </h1>
            </div>
            <nav>
                <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                    Gallery
                </a>
                <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                    About
                </a>
            </nav>
        </header>
    );
};

export default Header;
