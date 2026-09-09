import React, { useState, useMemo } from 'react';
import { Play, Info, Star, Clock, Film, Tv, Sparkles, Shuffle } from 'lucide-react';
import { MovieEntry } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface NetflixHeroProps {
  entries: MovieEntry[];
  onNavigate: (view: 'details', id: string) => void;
  selectedUser?: 'jojo' | 'dodo' | null;
}

export const NetflixHero: React.FC<NetflixHeroProps> = ({ entries, onNavigate }) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  // Filter valid entries that have a poster or capture
  const eligibleEntries = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    return entries;
  }, [entries]);

  // Pick random index when entries change or when shuffle is clicked
  const handleShuffle = () => {
    if (eligibleEntries.length <= 1) return;
    const nextIdx = Math.floor(Math.random() * eligibleEntries.length);
    setRandomIndex(nextIdx);
  };

  const current = eligibleEntries[randomIndex % eligibleEntries.length] || eligibleEntries[0];

  if (!current) return null;

  const bgImage = current.captures?.[0] || current.posterUrl || 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1600&q=80';
  const posterImage = current.posterUrl || current.captures?.[0] || bgImage;

  const avgRating = current.ratings 
    ? ((current.ratings.jojo + current.ratings.dodo) / 2).toFixed(1)
    : (current.rating ? current.rating.toFixed(1) : null);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl bg-night-900 min-h-[260px] sm:min-h-0">
      {/* Background Layer: Cinematic Backdrop Image for Mobile & Ambient for Desktop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithSkeleton
          src={bgImage}
          alt={current.title}
          className="w-full h-full object-cover object-center opacity-40 sm:opacity-20 transition-transform duration-700 scale-105"
          containerClassName="w-full h-full"
        />
        {/* Gradients to guarantee text readability on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/80 to-night-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-night-900 via-night-900/90 to-transparent"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-between gap-6 sm:gap-8 lg:gap-10">
        {/* Left Column: Title, Metadata, Description & Action Buttons */}
        <div className="flex-1 min-w-0 w-full flex flex-col justify-center text-left">
          {/* Top Row: Spotlight Badge & Shuffle Button */}
          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
            
            <span className="bg-white/10 backdrop-blur-md text-ink-200 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
              {current.type === 'tv' ? <Tv size={12} /> : <Film size={12} />}
              {current.type === 'tv' ? 'TV SERIES' : 'MOVIE'}
            </span>
            
            {eligibleEntries.length > 1 && (
              <button
                type="button"
                onClick={handleShuffle}
                title="Pick another random movie"
                className="px-2.5 py-1 bg-white/10 hover:bg-[#fbbf24] hover:text-night-900 text-white font-bold text-[10px] sm:text-xs rounded-full border border-white/10 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
              >
                <Shuffle size={12} />
                <span>Shuffle</span>
              </button>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md break-words">
            {current.title}
          </h1>

          {/* Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-ink-200 font-medium">
            {/* Dual Rating Badges */}
            {avgRating && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full shadow">
                <Star size={13} className="text-[#fbbf24] fill-[#fbbf24]" />
                <span className="font-extrabold text-[#fbbf24] text-xs sm:text-sm">{avgRating} / 5</span>
              </div>
            )}

            {/* Release/Watch Date */}
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold text-white border border-white/10">
              {new Date(current.date).getFullYear()}
            </span>

            {/* Duration */}
            {current.duration && (
              <span className="flex items-center gap-1 text-ink-300 text-xs sm:text-sm">
                <Clock size={12} />
                {current.duration}
              </span>
            )}

            {/* Genres */}
            {current.genres && current.genres.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {current.genres.slice(0, 3).map((genre) => (
                  <span key={genre} className="text-[10px] sm:text-xs uppercase font-bold text-ink-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description / Story Snippet */}
          {(current.story || current.reason) && (
            <p className="text-xs sm:text-sm md:text-base text-ink-200/90 font-sans line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              {current.story || current.reason}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('details', current.id)}
              className="flex items-center gap-2 bg-[#fbbf24] hover:bg-amber-400 text-night-900 font-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
            >
              <Play size={16} className="fill-night-900" />
              <span>Play Now</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('details', current.id)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Info size={16} />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Resolution Poster Card (Visible on Tablet & PC, hidden on mobile) */}
        <div className="hidden sm:block shrink-0 self-center">
          <div className="w-36 sm:w-44 md:w-52 lg:w-60 xl:w-64 aspect-[2/3] rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 bg-black/80">
            <ImageWithSkeleton
              src={posterImage}
              alt={current.title}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
