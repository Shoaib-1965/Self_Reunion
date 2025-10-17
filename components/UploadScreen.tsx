
import React, { useState, useRef } from 'react';
import { fileToBase64 } from '../utils/imageUtils';
import { PlusIcon } from './Icons';

interface UploadScreenProps {
  onCreate: (childPhoto: string, currentPhoto: string) => void;
  error: string | null;
}

const ImageUploader: React.FC<{ onImageUpload: (base64: string) => void, label: string }> = ({ onImageUpload, label }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
      onImageUpload(base64);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-white/30 transition-all hover:border-purple-400" onClick={handleClick}>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      {imagePreview ? (
        <img src={imagePreview} alt={`${label} preview`} className="w-full h-full object-cover rounded-2xl" />
      ) : (
        <>
          <PlusIcon className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-gray-300 font-semibold">{label}</span>
        </>
      )}
    </div>
  );
};

const UploadScreen: React.FC<UploadScreenProps> = ({ onCreate, error }) => {
  const [childPhoto, setChildPhoto] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  const canCreate = childPhoto && currentPhoto;

  const handleCreate = () => {
    if (canCreate) {
      onCreate(childPhoto, currentPhoto);
    }
  };

  return (
    <div className="flex flex-col items-center h-full space-y-6">
      <p className="text-center text-gray-300">Upload two photos to create your time hug.</p>
      
      {error && <p className="text-red-400 bg-red-500/20 p-3 rounded-lg text-center">{error}</p>}
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <ImageUploader label="Childhood Photo" onImageUpload={setChildPhoto} />
        <ImageUploader label="Current Photo" onImageUpload={setCurrentPhoto} />
      </div>
      
      <button
        onClick={handleCreate}
        disabled={!canCreate}
        className="w-full py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all transform disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:scale-105 hover:enabled:shadow-purple-500/50"
      >
        Create Your Time Hug
      </button>
    </div>
  );
};

export default UploadScreen;
