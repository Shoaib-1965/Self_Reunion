
import React from 'react';
import { GeneratedImage, Page } from '../types';

interface GalleryScreenProps {
  images: GeneratedImage[];
  onSelectImage: (image: GeneratedImage) => void;
  onNavigate: (page: Page) => void;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ images, onSelectImage, onNavigate }) => {

  const handleImageClick = (image: GeneratedImage) => {
    onSelectImage(image);
    onNavigate(Page.RESULT);
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <h2 className="text-2xl font-semibold mb-2">Your Gallery is Empty</h2>
        <p>Create your first "Time Hug" to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map(image => (
        <div key={image.id} className="aspect-square bg-white/10 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105" onClick={() => handleImageClick(image)}>
          <img src={image.src} alt={`Generated on ${new Date(image.timestamp).toLocaleDateString()}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default GalleryScreen;
