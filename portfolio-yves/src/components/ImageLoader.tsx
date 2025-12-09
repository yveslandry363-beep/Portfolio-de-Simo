
import React, { useState } from 'react';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className, containerClassName, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to generate format-specific URLs if they exist
  // In a real app, you'd probably pass a base path and the loader would find optimized versions
  // For now, we will try to assume a structure or just use the src as is, but implementing the <picture> structure
  // allows us to easily plugin the optimized assets later.

  const generateSources = () => {
    // This is a placeholder logic. In production, you might have generated .avif and .webp variants.
    // Example: src = "image.jpg" -> "image.avif", "image.webp"
    // For now, we return empty to just use the main src, but the structure is ready.
    return (
      <>
        {/* <source srcSet={src.replace(/\.(jpg|png)$/, '.avif')} type="image/avif" /> */}
        {/* <source srcSet={src.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" /> */}
      </>
    );
  };

  return (
    <div className={`relative overflow-hidden bg-gray-900 ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-10" />
      )}
      <picture>
        {generateSources()}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </picture>
    </div>
  );
};

export default ImageLoader;
