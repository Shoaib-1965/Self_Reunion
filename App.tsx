
import React, { useState, useCallback, useEffect } from 'react';
import { Page, GeneratedImage } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import MainLayout from './components/MainLayout';
import UploadScreen from './components/UploadScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultScreen from './components/ResultScreen';
import GalleryScreen from './components/GalleryScreen';
import ProfileScreen from './components/ProfileScreen';
import { generateHugImage } from './services/geminiService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.UPLOAD);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<GeneratedImage | null>(null);
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    try {
      const storedGallery = localStorage.getItem('selfReunionGallery');
      if (storedGallery) {
        setGallery(JSON.parse(storedGallery));
      }
    } catch (e) {
      console.error("Failed to parse gallery from localStorage", e);
      localStorage.removeItem('selfReunionGallery');
    }
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentPage(Page.UPLOAD);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleCreateTimeHug = async (childPhoto: string, currentPhoto: string) => {
    setProcessing(true);
    setError(null);
    setCurrentPage(Page.PROCESSING);

    try {
      const resultImage = await generateHugImage(childPhoto, currentPhoto);
      const newImage: GeneratedImage = {
        id: `sr-${Date.now()}`,
        src: resultImage,
        timestamp: Date.now(),
      };
      
      setCurrentResult(newImage);
      const updatedGallery = [newImage, ...gallery];
      setGallery(updatedGallery);
      localStorage.setItem('selfReunionGallery', JSON.stringify(updatedGallery));
      
      setCurrentPage(Page.RESULT);
    } catch (err) {
      console.error(err);
      setError('Failed to create your Time Hug. Please try again.');
      setCurrentPage(Page.UPLOAD);
    } finally {
      setProcessing(false);
    }
  };

  const renderContent = () => {
    if (processing) return <ProcessingScreen />;
    switch (currentPage) {
      case Page.UPLOAD:
        return <UploadScreen onCreate={handleCreateTimeHug} error={error} />;
      case Page.GALLERY:
        return <GalleryScreen images={gallery} onSelectImage={setCurrentResult} onNavigate={handleNavigate} />;
      case Page.PROFILE:
        return <ProfileScreen onLogout={handleLogout} />;
      case Page.PROCESSING:
        return <ProcessingScreen />;
       case Page.RESULT:
        return currentResult ? <ResultScreen image={currentResult} onBack={() => handleNavigate(Page.GALLERY)} /> : <UploadScreen onCreate={handleCreateTimeHug} error="No result found. Please create a new image." />;
      default:
        return <UploadScreen onCreate={handleCreateTimeHug} error={error} />;
    }
  };

  if (!isAuthenticated) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  return (
    <MainLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderContent()}
    </MainLayout>
  );
};

export default App;
