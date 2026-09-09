import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieEntry, FilterType, SortOption } from '../types';
import { FilterBar } from '../components/FilterBar';
import { NotificationContainer, Notification, NotificationType } from '../components/NotificationToast';
import { NetflixHero } from '../components/NetflixHero';
import { NetflixRow } from '../components/NetflixRow';
import { Search, X, Flame, Star, Tv, Film, Ticket, Popcorn } from 'lucide-react';

interface HomeProps {
  entries: MovieEntry[];
  onNavigate: (view: 'details', id?: string) => void;
  selectedUser?: 'jojo' | 'dodo' | null;
  onSelectUser?: (user: 'jojo' | 'dodo' | null) => void;
}

export const Home = ({ entries, onNavigate, selectedUser, onSelectUser }: HomeProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortOption>('date-desc');
  const [search, setSearch] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastEntriesLength, setLastEntriesLength] = useState(entries.length);

  // Add notification
  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  // Close notification
  const closeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Detect new entries or changes
  useEffect(() => {
    if (entries.length > lastEntriesLength) {
      const newEntry = entries[0];
      const notificationType: NotificationType = newEntry.type === 'tv' ? 'episode-added' : 'movie-added';
      
      addNotification({
        type: notificationType,
        title: newEntry.type === 'tv' ? 'New Episode Added' : 'New Movie Added',
        message: `"${newEntry.title}" has been added to your journal!`,
        duration: 5000,
      });
      
      setLastEntriesLength(entries.length);
    } else if (entries.length < lastEntriesLength) {
      setLastEntriesLength(entries.length);
    }
  }, [entries, lastEntriesLength, addNotification]);

  const processEntries = useCallback((status: 'watched' | 'upcoming') => {
    const searchLower = search.toLowerCase();
    return entries
      .filter(e => e.status === status)
      .filter(e => {
        if (filter === 'all') return true;
        if (filter === 'documentary') {
          return e.genres?.some((g) => g.toLowerCase().includes('documentary')) ?? false;
        }
        return e.type === filter;
      })
      .filter(e => {
        if (!search.trim()) return true;
        return e.title.toLowerCase().includes(searchLower) ||
               e.originalTitle?.toLowerCase().includes(searchLower) ||
               e.genres?.some(g => g.toLowerCase().includes(searchLower)) ||
               e.story?.toLowerCase().includes(searchLower);
      })
      .sort((a, b) => {
        if (sort === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sort === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        return 0;
      });
  }, [entries, filter, sort, search]);

  const watchedList = useMemo(() => processEntries('watched'), [processEntries]);
  const upcomingList = useMemo(() => processEntries('upcoming'), [processEntries]);

  // Netflix Specific Rows
  const topRatedList = useMemo(() => {
    return [...watchedList]
      .filter(e => e.ratings || e.rating)
      .sort((a, b) => {
        const aScore = a.ratings ? (a.ratings.jojo + a.ratings.dodo) : (a.rating || 0) * 2;
        const bScore = b.ratings ? (b.ratings.jojo + b.ratings.dodo) : (b.rating || 0) * 2;
        return bScore - aScore;
      });
  }, [watchedList]);

  const tvSeriesList = useMemo(() => {
    return watchedList.filter(e => e.type === 'tv');
  }, [watchedList]);

  const moviesList = useMemo(() => {
    return watchedList.filter(e => e.type === 'movie');
  }, [watchedList]);

  const searchSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    const searchLower = search.toLowerCase();
    return entries
      .filter(e => 
        e.title.toLowerCase().includes(searchLower) ||
        e.originalTitle?.toLowerCase().includes(searchLower) ||
        e.genres?.some(g => g.toLowerCase().includes(searchLower))
      )
      .slice(0, 8);
  }, [entries, search]);

  return (
    <div className="min-h-screen bg-night-900 text-ink-100 pb-24 pt-6 sm:pt-8 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Netflix Hero Featured Spotlight */}
      <NetflixHero
        entries={entries}
        onNavigate={(view, id) => onNavigate(view, id)}
        selectedUser={selectedUser}
      />

      {/* Netflix Search & Quick Filter Bar */}
      <div className="mb-10 space-y-4">
        <div className="relative flex items-center z-40">
          <Search size={20} className="absolute left-4 text-ink-400 pointer-events-none" />
          <input
            type="text"
            role="searchbox"
            aria-label="Search movies, TV shows, genres, and stories"
            placeholder="Search titles, actors, genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-white placeholder-ink-400 focus:outline-none focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/30 transition-all font-medium text-sm sm:text-base shadow-xl"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-4 text-ink-400 hover:text-white rounded transition-colors p-1"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        {showSuggestions && search.trim() !== '' && searchSuggestions.length > 0 && (
          <div className="absolute left-4 right-4 sm:left-8 sm:right-8 mt-2 bg-night-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
            {searchSuggestions.map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  setSearch('');
                  setShowSuggestions(false);
                  onNavigate('details', entry.id);
                }}
                className="w-full px-4 py-3 hover:bg-white/10 text-left border-b border-white/5 last:border-b-0 flex items-center gap-3 transition-colors"
              >
                {entry.posterUrl && (
                  <img
                    src={entry.posterUrl}
                    alt={entry.title}
                    className="w-10 h-14 object-cover rounded shadow"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate text-sm">{entry.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#fbbf24] uppercase font-bold">{entry.type}</span>
                    {entry.ratings && (
                      <span className="text-[10px] text-ink-300">★ {((entry.ratings.jojo + entry.ratings.dodo) / 2).toFixed(1)}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Filter Pills */}
        <FilterBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </div>

      {/* Netflix Horizontal Category Rows */}
      <div className="space-y-6">
        {/* Row 1: Trending & Watched Together */}
        <NetflixRow
          title="Trending & Watched Together"
          subtitle="Our Shared Cinematic Memory"
          icon={<Flame size={20} />}
          entries={watchedList}
          onNavigate={(view, id) => onNavigate(view, id)}
          selectedUser={selectedUser}
        />

        {/* Row 2: Top Rated Together */}
        {topRatedList.length > 0 && (
          <NetflixRow
            title="Top Rated by JoJo & DoDo"
            subtitle="5-Star Fan Favorites"
            icon={<Star size={20} />}
            entries={topRatedList}
            onNavigate={(view, id) => onNavigate(view, id)}
            selectedUser={selectedUser}
          />
        )}

        {/* Row 3: TV Series & Shows */}
        {tvSeriesList.length > 0 && (
          <NetflixRow
            title="TV Series & Shows"
            subtitle="Multi-episode adventures"
            icon={<Tv size={20} />}
            entries={tvSeriesList}
            onNavigate={(view, id) => onNavigate(view, id)}
            selectedUser={selectedUser}
          />
        )}

        {/* Row 4: Feature Films */}
        {moviesList.length > 0 && (
          <NetflixRow
            title="Feature Movies"
            subtitle="Full-length films"
            icon={<Film size={20} />}
            entries={moviesList}
            onNavigate={(view, id) => onNavigate(view, id)}
            selectedUser={selectedUser}
          />
        )}

        {/* Row 5: Upcoming Movie Nights */}
        <NetflixRow
          title="Next Movie Night Queue"
          subtitle="Coming soon to our couch"
          icon={<Ticket size={20} />}
          entries={upcomingList}
          onNavigate={(view, id) => onNavigate(view, id)}
          selectedUser={selectedUser}
        />
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-10 border-t border-white/10 text-center text-ink-400">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[#fbbf24] font-black text-xs uppercase tracking-widest">
            <Popcorn size={16} />
            <span>Two Seats, One Screen</span>
          </div>
          <p className="text-xs text-ink-300 opacity-60">
            &copy; {new Date().getFullYear()} Private Cinema Journal for JoJo & DoDo
          </p>
          
        </div>
      </footer>

      {/* Notification Toast */}
      <NotificationContainer notifications={notifications} onClose={closeNotification} />
    </div>
  );
};

export default Home;
