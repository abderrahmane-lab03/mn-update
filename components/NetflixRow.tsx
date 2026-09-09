import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieEntry } from '../types';
import { MovieCard } from './MovieCard';

interface NetflixRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  entries: MovieEntry[];
  onNavigate: (view: 'details', id: string) => void;
  selectedUser?: 'jojo' | 'dodo' | null;
}

export const NetflixRow: React.FC<NetflixRowProps> = ({
  title,
  subtitle,
  icon,
  entries,
  onNavigate,
  selectedUser,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (entries.length === 0) return null;

  return (
    <section className="mb-12 relative group/row">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#fbbf24] rounded-xl shadow-inner">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              {title}
              <span className="text-xs font-bold text-ink-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 normal-case">
                {entries.length}
              </span>
            </h2>
            {subtitle && (
              <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label={`Scroll ${title} left`}
            className="p-2 rounded-full bg-white/5 hover:bg-[#fbbf24] text-white hover:text-night-900 border border-white/10 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label={`Scroll ${title} right`}
            className="p-2 rounded-full bg-white/5 hover:bg-[#fbbf24] text-white hover:text-night-900 border border-white/10 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Cards Container */}
      <div
        ref={rowRef}
        className="flex items-stretch gap-4 overflow-x-auto scrollbar-none py-2 px-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="w-[180px] min-[400px]:w-[210px] sm:w-[230px] md:w-[250px] shrink-0"
          >
            <MovieCard
              entry={entry}
              onClick={() => onNavigate('details', entry.id)}
              selectedUser={selectedUser}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
