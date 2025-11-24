import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, History as HistoryIcon } from 'lucide-react';
import { getHistory, removeFromHistory, type HistoryItem } from '../utils/storage';

const History: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleDelete = (id: string) => {
        const updatedHistory = removeFromHistory(id);
        setHistory(updatedHistory);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="text-center mb-12 space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                >
                    Your Creation History
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg"
                >
                    {history.length} {history.length === 1 ? 'masterpiece' : 'masterpieces'} created so far
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {history.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            layout
                            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-square"
                        >
                            <img
                                src={item.url}
                                alt={item.prompt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white font-medium line-clamp-2 mb-2">{item.prompt}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full w-fit mb-1">
                                            {item.model}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-200 backdrop-blur-md transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {history.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    <HistoryIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No history yet. Start creating!</p>
                </div>
            )}
        </div>
    );
};

export default History;
