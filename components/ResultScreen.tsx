
import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon, ShareIcon, ArrowLeftIcon } from './Icons';

interface ResultScreenProps {
  image: GeneratedImage;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ image, onBack }) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `self-reunion-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const file = new File([blob], `self-reunion-${image.id}.png`, { type: blob.type });

      if (navigator.share) {
        await navigator.share({
          title: 'My Self Reunion Moment',
          text: 'I embraced my past, today. Created with Self Reunion.',
          files: [file],
        });
      } else {
        alert('Share feature is not available on this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Could not share the image.');
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 mb-4">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
          <span>Back to Gallery</span>
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50">
          <img src={image.src} alt="Generated self reunion" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="flex-shrink-0 grid grid-cols-2 gap-4 mt-6">
        <button onClick={handleDownload} className="flex items-center justify-center space-x-2 w-full py-3 text-lg font-semibold text-white rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20">
            <DownloadIcon className="w-6 h-6" />
            <span>Download</span>
        </button>
        <button onClick={handleShare} className="flex items-center justify-center space-x-2 w-full py-3 text-lg font-semibold text-white rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20">
            <ShareIcon className="w-6 h-6" />
            <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
