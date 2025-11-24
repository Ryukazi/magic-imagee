import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

interface GalleryItem {
    id: number;
    url: string;
    prompt: string;
    model: string;
    author: string;
}

const Gallery: React.FC = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                // Fetching from the public db.json file
                const response = await axios.get('/db.json');
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="text-center mb-12 space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                >
                    Community Showcase
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg"
                >
                    Explore amazing creations from our community
                </motion.p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
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
                                    <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">
                                        {item.model}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && images.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No images in the gallery yet.</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;
