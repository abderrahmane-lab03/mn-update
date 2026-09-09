import { useState, memo } from 'react';
import { Play, Star, Clock, Tv, Film } from 'lucide-react';
import { MovieEntry } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface MovieCardProps {
  entry: MovieEntry;
  onClick: () => void;
  selectedUser?: 'jojo' | 'dodo' | null;
}

export const MovieCard = memo(({ entry, onClick, selectedUser }: MovieCardProps) => {
  const [imgError, setImgError] = useState(false);

  const jojoRating = entry.ratings?.jojo;
  const dodoRating = entry.ratings?.dodo;
  const avgRating = entry.ratings 
    ? ((entry.ratings.jojo + entry.ratings.dodo) / 2).toFixed(1) 
    : (entry.rating ? entry.rating.toFixed(1) : null);

  const displayImage = entry.posterUrl || entry.captures?.[0] || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

  return (
    <button
      type="button"
      aria-label={`View details for ${entry.title}`}
      onClick={onClick}
      className="group relative flex flex-col w-full bg-[#1e293b]/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#fbbf24]/50 hover:shadow-[#fbbf24]/10 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
    >
      {/* Netflix Poster Frame (2:3 Aspect Ratio) */}
      <div className="relative w-full aspect-[2/3] bg-black/80 overflow-hidden">
        {!imgError ? (
          <ImageWithSkeleton
            src={displayImage}
            alt={entry.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            containerClassName="w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-night-800 text-ink-400 p-4 text-center text-xs">
            {entry.title}
          </div>
        )}

        {/* Netflix Card Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

        {/* Top Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Media Type Badge */}
          <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white font-black text-[9px] uppercase px-2 py-1 rounded-md tracking-wider flex items-center gap-1 shadow-md">
            {entry.type === 'tv' ? <Tv size={10} className="text-[#c084fc]" /> : <Film size={10} className="text-[#fbbf24]" />}
            {entry.type === 'tv' ? 'TV' : 'MOVIE'}
          </span>

          {/* Rating Badge */}
          {avgRating && (
            <span className="bg-[#fbbf24] text-night-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
              <Star size={10} className="fill-night-900" />
              {avgRating}
            </span>
          )}
        </div>

        {/* Netflix Play Hover Circle Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="w-14 h-14 rounded-full bg-[#fbbf24] text-night-900 flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={26} className="fill-night-900 ml-1" />
          </div>
        </div>

        {/* Bottom Poster Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col justify-end">
          <h3 className="text-base sm:text-lg font-black text-white leading-tight mb-1 group-hover:text-[#fbbf24] transition-colors drop-shadow">
            {entry.title}
          </h3>

          {/* Details Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-300 font-medium">
            <span>{new Date(entry.date).getFullYear()}</span>
            <span>•</span>
            {entry.duration && (
              <span className="flex items-center gap-1 text-ink-200">
                <Clock size={11} />
                {entry.duration}
              </span>
            )}
            {entry.genres?.[0] && (
              <>
                <span>•</span>
                <span className="uppercase text-[9px] font-bold text-[#fbbf24]/90 bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-1.5 py-0.5 rounded">
                  {entry.genres[0]}
                </span>
              </>
            )}
          </div>

          {/* Dual Rating User Breakdown */}
          {jojoRating !== undefined && dodoRating !== undefined && (
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-3 text-[10px]">
              <span className={`font-bold ${selectedUser === 'jojo' ? 'text-popcorn scale-105' : 'text-ink-300'}`}>
                JoJo: <span className="text-[#fbbf24]">{jojoRating}★</span>
              </span>
              <span className={`font-bold ${selectedUser === 'dodo' ? 'text-[#c084fc] scale-105' : 'text-ink-300'}`}>
                DoDo: <span className="text-[#c084fc]">{dodoRating}★</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
});
