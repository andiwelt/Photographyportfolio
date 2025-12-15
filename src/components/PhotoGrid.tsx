import { motion } from 'motion/react';
import { useState } from 'react';

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => onPhotoClick(photo)}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm">{photo.title}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
