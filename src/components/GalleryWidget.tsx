import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { supabase, type GalleryImage } from '../lib/supabase';

export default function GalleryWidget() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error loading images:', error);
      return;
    }

    if (data) {
      setImages(data);
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) return;

    const maxOrder = images.length > 0 ? Math.max(...images.map(img => img.order_index)) : -1;

    const { error } = await supabase
      .from('gallery_images')
      .insert([{ url: newImageUrl, order_index: maxOrder + 1 }]);

    if (error) {
      console.error('Error adding image:', error);
      return;
    }

    setNewImageUrl('');
    setIsAddingImage(false);
    loadImages();
  };

  const animateScrollBy = (container: HTMLDivElement, distance: number, duration = 600) => {
    // Manual smooth scroll to control speed (ms)
    const start = container.scrollLeft;
    const startTime = performance.now();
    const target = start + distance;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // easeInOutQuad
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      container.scrollLeft = start + (target - start) * eased;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const getStep = () => {
    const wrapper = scrollRef.current;
    const row = rowRef.current;
    if (!wrapper || !row) return 0;
    const tileWidth = wrapper.clientWidth / 3; // exactly 3 in view
    const styles = getComputedStyle(row);
    const gap = parseFloat(styles.columnGap || '16');
    return tileWidth + gap;
  };

  const handlePrevious = () => {
    if (currentIndex <= 0) return;
    const step = getStep();
    if (scrollRef.current && step) {
      animateScrollBy(scrollRef.current, -step, 650); // slower transition
    }
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, images.length - 3);
    if (currentIndex >= maxIndex) return;
    const step = getStep();
    if (scrollRef.current && step) {
      animateScrollBy(scrollRef.current, step, 650); // slower transition
    }
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="w-6 h-6 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex-1 mx-4">
          <div className="title-pill">
            <span className="text-white text-[16px] font-semibold">Gallery</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddingImage(true)}
            className="btn-neu"
          >
            + ADD IMAGE
          </button>

          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="icon-btn icon-btn--primary"
          >
            <ChevronLeft className="w-5 h-5 text-[#6F787C]" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= Math.max(0, images.length - 3)}
            className="icon-btn"
          >
            <ChevronRight className="w-5 h-5 text-[#6F787C]" />
          </button>
        </div>
      </div>

      <div className="gallery-scroll" ref={scrollRef}>
        <div className="gallery-row" ref={rowRef} style={{ ['--gap' as any]: '16px' }}>
          {images.map((image) => (
            <div key={image.id} className="gallery-tile">
              <img src={image.url} alt="Gallery" />
            </div>
          ))}
        </div>
      </div>

      {isAddingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#363C43] rounded-lg p-6 w-96 shadow-2xl">
            <h3 className="text-white text-lg font-medium mb-4">Add New Image</h3>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full bg-[#2a2f35] text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddImage}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingImage(false);
                  setNewImageUrl('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
