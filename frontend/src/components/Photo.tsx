import React, { useState, useEffect } from 'react';

interface PhotoProps {
  urls: string[]; // Array of image URLs
  alt: string;
}

const Photo: React.FC<PhotoProps> = ({ urls, alt }) => {
  const [currentUrl, setCurrentUrl] = useState(urls[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % urls.length;
      setCurrentUrl(urls[nextIndex]);
      setCurrentIndex(nextIndex);
    }, 2500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, urls]);

  return <img src={currentUrl} alt={alt} style={{ width: '100%', height: 'auto' }} />;
};

export default Photo;
