import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Twitter, Heart } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-8 gap-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
                    About MagicGen
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    MagicGen is a state-of-the-art AI image generation tool designed to bring your imagination to life.
                    Powered by advanced models, it transforms text into stunning visual art in seconds.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                    {
                        icon: <Code2 className="w-8 h-8 text-primary" />,
                        title: "Modern Tech Stack",
                        description: "Built with React, TypeScript, and Tailwind CSS for a seamless experience."
                    },
                    {
                        icon: <Github className="w-8 h-8 text-purple-400" />,
                        title: "Open Source",
                        description: "The code is available on GitHub. Feel free to contribute!"
                    },
                    {
                        icon: <Heart className="w-8 h-8 text-pink-500" />,
                        title: "User Focused",
                        description: "Designed with simplicity and elegance in mind."
                    }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                        <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
            >
                <a
                    href="https://github.com/Ryukazi/magic-imagee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                >
                    <Github className="w-5 h-5" />
                    <span>View on GitHub</span>
                </a>
                <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-xl text-white transition-all shadow-lg shadow-primary/25"
                >
                    <Twitter className="w-5 h-5" />
                    <span>Follow Updates</span>
                </a>
            </motion.div>
        </div>
    );
};

export default About;
