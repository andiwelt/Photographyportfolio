import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: number;
  src: string;
  category: string;
  title: string;
  type: 'image' | 'video';
  span?: string; // CSS grid span
  aspectRatio?: string; // aspect ratio class
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544124094-8aea0374da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MDI0MTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Portrait',
    title: 'Natural Light Portrait',
    type: 'image',
    span: 'col-span-8 row-span-2',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBuYXR1cmV8ZW58MXx8fHwxNzYwMjI5MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Landscape',
    title: 'Mountain Vista',
    type: 'image',
    span: 'col-span-4 row-span-2',
    aspectRatio: 'aspect-[2/3]',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1554793000-245d3a3c2a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjAyMjk3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Architecture',
    title: 'Urban Geometry',
    type: 'image',
    span: 'col-span-4 row-span-1',
    aspectRatio: 'aspect-[3/2]',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1628803184377-c5167a0cb6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjAyOTc4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Street',
    title: 'City Life',
    type: 'image',
    span: 'col-span-4 row-span-1',
    aspectRatio: 'aspect-[3/2]',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzYwMjQ0MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    title: 'Editorial Style',
    type: 'image',
    span: 'col-span-4 row-span-1',
    aspectRatio: 'aspect-[3/2]',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjAyNzc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Landscape',
    title: 'Misty Sunrise',
    type: 'image',
    span: 'col-span-6 row-span-2',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1614088459293-5669fadc3448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NjAyNjkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Travel',
    title: 'Island Paradise',
    type: 'image',
    span: 'col-span-6 row-span-2',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYwMjI3NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    title: 'Culinary Art',
    type: 'image',
    span: 'col-span-3 row-span-1',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1679824244922-5d1b14c3ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMGFuaW1hbHxlbnwxfHx8fDE3NjAyODQ0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Wildlife',
    title: 'Wild Beauty',
    type: 'image',
    span: 'col-span-3 row-span-1',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1514747975201-4715db583da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc2MDIwNTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Landscape',
    title: 'Ocean Waves',
    type: 'image',
    span: 'col-span-3 row-span-1',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1549887534-1541e9326642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NjAyMjUyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Abstract',
    title: 'Abstract Forms',
    type: 'image',
    span: 'col-span-3 row-span-1',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MDI4NzQwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Landscape',
    title: 'Mountain Sunrise',
    type: 'image',
    span: 'col-span-5 row-span-2',
    aspectRatio: 'aspect-[3/2]',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzfGVufDF8fHx8MTc2MDI5MzIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Urban',
    title: 'City Lights',
    type: 'image',
    span: 'col-span-4 row-span-2',
    aspectRatio: 'aspect-[2/3]',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzaWdufGVufDF8fHx8MTc2MDI5NDQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Minimal',
    title: 'Minimalist Design',
    type: 'image',
    span: 'col-span-3 row-span-2',
    aspectRatio: 'aspect-[2/3]',
  },
];

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;

      if (e.key === 'Escape') {
        setSelectedMedia(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, currentIndex]);

  const openMedia = (item: MediaItem, index: number) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + mediaItems.length) % mediaItems.length
      : (currentIndex + 1) % mediaItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaItems[newIndex]);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0F0F0F]">
      {/* Header Section */}
      <header className="relative bg-[#0F0F0F] text-white pt-12 pb-12">
        <div className="max-w-[1320px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 
              className="mb-4"
              style={{
                fontSize: '52px',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Andrey Prokhorov
            </h1>
            <p 
              className="mx-auto"
              style={{
                fontSize: '17px',
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: '58%',
                opacity: 0.75
              }}
            >
              Quiet moments shaped by light, composition, and time.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Editorial Grid Layout */}
      <div className="max-w-[1320px] mx-auto p-8 pt-8">
        <div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
              className={`${item.span} relative overflow-hidden cursor-pointer group`}
              onClick={() => openMedia(item, index)}
            >
              <div className={`w-full h-full ${item.aspectRatio}`}>
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                  />
                )}
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 ease-out bg-[rgba(0,0,0,0)]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0F0F]"
            onClick={() => setSelectedMedia(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-colors duration-200"
              aria-label="Close"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-6 z-[110] text-white/60 text-sm">
              {currentIndex + 1} / {mediaItems.length}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-6 z-[110] text-white/60 hover:text-white transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-6 z-[110] text-white/60 hover:text-white transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={40} strokeWidth={1.5} />
            </button>

            {/* Media content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative max-w-[92vw] max-h-[92vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-[92vh] w-auto h-auto object-contain border border-[#E5E5E5]/20"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[92vh] w-auto h-auto object-contain border border-[#E5E5E5]/20"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}