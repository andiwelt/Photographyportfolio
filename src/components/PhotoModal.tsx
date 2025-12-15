import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
}

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="max-w-6xl max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <div className="text-white mt-6 text-center">
            <h3 className="text-xl">{photo.title}</h3>
            <p className="text-white/60 text-sm mt-2">{photo.category}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
