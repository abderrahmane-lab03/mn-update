import { useState, useEffect, lazy, Suspense } from 'react';
import { Download } from 'lucide-react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getEntriesAsync } from './services/storage';
import { MovieEntry } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AppContextProvider } from './context/AppContext';

// Lazy load views for code splitting
const Home = lazy(() => import('./views/Home').then(m => ({ default: m.Home })));
const Details = lazy(() => import('./views/Details').then(m => ({ default: m.Details })));
const IntroPage = lazy(() => import('./views/IntroPage').then(m => ({ default: m.IntroPage })));
const AddMovie = lazy(() => import('./views/AddMovie').then(m => ({ default: m.AddMovie })));

const SELECTED_USER_KEY = 'movie-night-selected-user';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

// Loading fallback component for Suspense boundaries
const LoadingFallback = () => (
  <div className="min-h-screen bg-night-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block">
        <div className="animate-spin w-12 h-12 border-4 border-popcorn border-t-transparent rounded-full mb-4"></div>
      </div>
      <p className="text-ink-300 text-lg font-bold">Loading Cinema...</p>
    </div>
  </div>
);

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    try {
      return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => {
      setIsInstalled(standaloneQuery.matches);
    };

    if (standaloneQuery.matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    standaloneQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      standaloneQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  if (!canInstall || isInstalled) return null;

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-white/10 bg-night-900/90 px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-black/40 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-popcorn/60 hover:text-popcorn focus:outline-none focus:ring-2 focus:ring-popcorn"
      aria-label="Install this app"
    >
      <Download size={16} />
      Install App
    </button>
  );
};

const AppContent = () => {
  const [entries, setEntries] = useState<MovieEntry[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<'jojo' | 'dodo' | null>(() => {
    try {
      const storedUser = localStorage.getItem(SELECTED_USER_KEY);
      return storedUser === 'jojo' || storedUser === 'dodo' ? storedUser : null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (selectedUser) {
        localStorage.setItem(SELECTED_USER_KEY, selectedUser);
      } else {
        localStorage.removeItem(SELECTED_USER_KEY);
      }
    } catch {
      // ignore localStorage failures
    }
  }, [selectedUser]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEntriesAsync();
        setEntries(data);
        if (location.pathname !== '/') {
          setShowIntro(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const reloadEntries = async () => {
    const data = await getEntriesAsync();
    setEntries(data);
  };

  const navigateTo = (view: 'home' | 'details', id?: string) => {
    navigate(view === 'details' && id ? `/movie/${id}` : '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <IntroPage 
              entries={entries}
              onContinue={() => setShowIntro(false)}
            />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="home-page"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Home
                      entries={entries}
                      onNavigate={navigateTo}
                      selectedUser={selectedUser}
                      onSelectUser={setSelectedUser}
                    />
                  </motion.div>
                } 
              />
              <Route 
                path="/add" 
                element={
                  <motion.div
                    key="add-page"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AddMovie />
                  </motion.div>
                } 
              />
              <Route 
                path="/movie/:id" 
                element={
                  <motion.div
                    key={`movie-details-${location.pathname}`}
                    initial={{ opacity: 0, y: 16, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MovieDetails
                      entries={entries}
                      onBack={() => navigateTo('home')}
                      selectedUser={selectedUser}
                      reloadEntries={reloadEntries}
                    />
                  </motion.div>
                } 
              />
              <Route 
                path="*" 
                element={
                  <motion.div
                    key="not-found"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Home
                      entries={entries}
                      onNavigate={navigateTo}
                      selectedUser={selectedUser}
                      onSelectUser={setSelectedUser}
                    />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        )}
      </AnimatePresence>
    </Suspense>
  );
};

const MovieDetails = ({ entries, onBack, selectedUser, reloadEntries }: { entries: MovieEntry[]; onBack: () => void; selectedUser?: 'jojo' | 'dodo' | null; reloadEntries: () => Promise<void> }) => {
  const { id } = useParams<{ id: string }>();
  const entry = entries.find(e => e.id === id);
  
  if (!entry) {
    return (
      <div className="min-h-screen bg-night-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-ink-300 mb-4 font-bold">Title not found</p>
          <button onClick={onBack} className="px-5 py-2.5 bg-popcorn text-night-900 rounded-xl font-black hover:bg-popcorn/90 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <Details entry={entry} onBack={onBack} selectedUser={selectedUser} onRatingUpdate={reloadEntries} />;
};

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppContextProvider>
        <div className="min-h-screen bg-night-900 text-ink-100 font-sans selection:bg-popcorn selection:text-night-900">
          <AppContent />
          <ScrollToTopButton />
          <InstallAppButton />
        </div>
      </AppContextProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
