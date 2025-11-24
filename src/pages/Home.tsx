import React from 'react';
import ImageGenerator from '../components/ImageGenerator';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            <ImageGenerator />
        </div>
    );
};

export default Home;
