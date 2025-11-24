import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Download, Share2, Loader2, Sparkles } from 'lucide-react';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const encodedPrompt = encodeURIComponent(prompt);
            const response = await axios.get(
                `https://dens-magic-img.vercel.app/api/generate?prompt=${encodedPrompt}`,
                { responseType: 'blob' }
            );

            const url = URL.createObjectURL(response.data);
            setImageUrl(url);
        } catch (err) {
            console.error(err);
            setError('Failed to generate image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `magic-gen-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 gap-8">
            <div className="text-center space-y-4 mt-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary"
                >
                    Turn your words into art
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg max-w-xl mx-auto"
                >
                    Describe what you want to see, and watch the magic happen instantly.
                </motion.p>
            </div>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={generateImage}
                className="w-full max-w-2xl relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A futuristic cyberpunk city with neon lights..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 px-4 py-3 text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loading || !prompt.trim()}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Wand2 className="w-5 h-5" />
                        )}
                        <span className="hidden sm:inline">{loading ? 'Generating...' : 'Generate'}</span>
                    </button>
                </div>
            </motion.form>

            <div className="w-full max-w-2xl min-h-[400px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
                        >
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <p className="text-gray-400 animate-pulse">Creating your masterpiece...</p>
                        </motion.div>
                    )}

                    {error && !loading && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {imageUrl && !loading && (
                        <motion.div
                            key="image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <img
                                src={imageUrl}
                                alt={prompt}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                <button
                                    onClick={downloadImage}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
                                    title="Download"
                                >
                                    <Download className="w-6 h-6" />
                                </button>
                                <button
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
                                    title="Share"
                                >
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {!imageUrl && !loading && !error && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-600"
                        >
                            <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-gray-700" />
                            </div>
                            <p>Your imagination is the limit</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImageGenerator;
