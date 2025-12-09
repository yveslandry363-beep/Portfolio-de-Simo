
import React from 'react';
import ImageLoader from './ImageLoader';

interface GalleryProps {
    id: number;
}

const Gallery: React.FC<GalleryProps> = ({ id }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
        <div className="space-y-8">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
                <ImageLoader 
                    src={`https://picsum.photos/seed/${id + 10}/800/1000`} 
                    alt="Gallery 1" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                />
            </div>
            <div className="aspect-square w-full overflow-hidden rounded-lg">
                <ImageLoader 
                    src={`https://picsum.photos/seed/${id + 11}/800/800`} 
                    alt="Gallery 2" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                />
            </div>
        </div>
        <div className="space-y-8 md:pt-20">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
                <ImageLoader 
                    src={`https://picsum.photos/seed/${id + 12}/1200/600`} 
                    alt="Gallery 3" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                />
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                <ImageLoader 
                    src={`https://picsum.photos/seed/${id + 13}/800/1200`} 
                    alt="Gallery 4" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                />
            </div>
        </div>
    </div>
  );
};

export default Gallery;
