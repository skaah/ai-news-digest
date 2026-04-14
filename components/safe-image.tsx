'use client';

import { useState, useRef, useEffect } from 'react';

interface SafeImageProps {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}

export function SafeImage({ src, fallback, alt, className }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setCurrentSrc(fallback);
    }
  }, [fallback]);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
