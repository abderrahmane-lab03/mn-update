import React, { useMemo } from 'react';
import { MovieEntry } from '../types';
import { ArrowRight } from 'lucide-react';
import { calculateIntroStats } from '../utils/introStats';

interface IntroPageProps {
  entries: MovieEntry[];
  onContinue: () => void;
}

export const IntroPage = ({ entries, onContinue }: IntroPageProps) => {

  const timeTogether = useMemo(() => calculateIntroStats(entries), [entries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-900 via-purple-900/20 to-night-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full transition-all duration-1000 opacity-100 scale-100">
        <div className="flex justify-center items-center mb-4 md:mb-6 relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-popcorn to-yellow-400 flex items-center justify-center text-2xl md:text-3xl font-bold text-night-900 shadow-lg shadow-popcorn/50 relative z-10 avatar-A">
            A
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg shadow-purple-400/50 -ml-4 md:-ml-5 relative z-10 avatar-N">
            N
          </div>
          <div className="absolute w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-popcorn/30 to-purple-400/30 blur-xl rounded-full"></div>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xs md:text-sm font-light text-ink-300 uppercase tracking-[0.3em]">
            Our Private Cinema Journal
          </h2>
        </div>

        {/* Main stats card */}
        <div className="bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl mb-6">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-popcorn via-pink-400 to-purple-400 bg-clip-text text-transparent">Moments Together</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 md:gap-6 mb-6">
            {/* Hours */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-popcorn mb-1">{timeTogether.hours}</div>
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold">Hours</div>
            </div>

            {/* Minutes */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-popcorn mb-1">{timeTogether.minutes}</div>
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold">Minutes</div>
            </div>

            {/* Titles */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 mb-1">{timeTogether.titleCount}</div>
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold">Titles</div>
            </div>

            {/* Days */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-400 mb-1">{timeTogether.days}</div>
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold">Days</div>
            </div>
          </div>

          {/* Detailed stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-center">
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold mb-1">Per Month</div>
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">{timeTogether.perMonth}</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-center">
              <div className="text-[10px] md:text-xs text-ink-400 uppercase tracking-widest font-semibold mb-1">Favorite Genre</div>
              <div className="text-xl md:text-2xl font-bold text-purple-400">{timeTogether.favoriteGenre}</div>
            </div>
          </div>

          {/* Journey text */}
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-sm md:text-base text-ink-200 mb-2">
              We've spent <span className="text-popcorn font-bold">{timeTogether.hours}h {timeTogether.minutes}m</span> together watching.
            </p>
            <p className="text-sm md:text-base text-ink-300">
              <span className="text-cyan-400">{timeTogether.titleCount} titles</span> shared. <span className="text-purple-400">{timeTogether.memoryCount} memories</span> made.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="group bg-gradient-to-r from-popcorn to-pink-400 hover:shadow-2xl hover:shadow-popcorn/50 text-night-900 font-bold py-3 px-10 md:px-12 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            View Journal
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
