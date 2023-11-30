import React from 'react';

interface PhotoProps {
  url: string;
  alt: string;
}

const Photo: React.FC<PhotoProps> = ({ url, alt }) => (
  <img src={url} alt={alt} style={{ width: '100%', height: 'auto' }} />
);

export default Photo;
