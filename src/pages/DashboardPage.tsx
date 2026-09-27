import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  FileText,
  ExternalLink,
  Search,
  Grid3x3,
  List,
  Library,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  Bookmark,
  Settings,
  Menu,
  X,
  Calendar,
  FileType,
  Image as ImageIcon,
  Film,
  Music,
  File,
  ShieldAlert,
  BookmarkCheck,
} from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { faculties } from '../data/faculties';
import { getMaterialsByFaculty } from '../services/materialsService';
import { DriveFile } from '../services/facultyService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useBookmarks } from '../contexts/bookmarkContext';

/* ============================================================
   HELPERS
   ============================================================ */
const getFileIcon = (mimeType: string) => {
  if (!mimeType) return File;
  if (mimeType.includes('pdf')) return FileText;
  if (mimeType.includes('image')) return ImageIcon;
  if (mimeType.includes('video')) return Film;
  if (mimeType.includes('audio')) return Music;
  return FileType;
};

const getFileColor = (mimeType: string) => {
  if (!mimeType) return '#B8935A';
  if (mimeType.includes('pdf')) return '#EF4444';
  if (mimeType.includes('image')) return '#10B981';
  if (mimeType.includes('video')) return '#8B5CF6';
  if (mimeType.includes('audio')) return '#F59E0B';
  if (mimeType.includes('document')) return '#0EA5E9';
  return '#B8935A';
};

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getFacultyShortName = (name: string) => {
  return name.replace('Faculty Of ', '').trim();
};

/* ============================================================
   SIDEBAR
   ============================================================ */
type SidebarView = 'dashboard' | 'bookmarks';

function Sidebar({
  isOpen,
  onClose,
  currentFaculty,
  userFaculty,
  activeView,
  onChangeView,
  onLogout,
  bookmarkCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentFaculty?: string;
  userFaculty?: string;
  activeView: SidebarView;
  onChangeView: (view: SidebarView) => void;
  onLogout: () => void;
  bookmarkCount: number;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0F0F0F] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-carton to-amber-500 flex items-center justify-center">
                <BookOpen size={20} className="text-black" />
              </div>
              <div>
                <div className="font-serif font-bold text-white leading-none">
                  MCF
                </div>
                <div className="text-[10px] text-carton tracking-widest uppercase">
                  E-Library
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-carton to-amber-500 flex items-center justify-center text-black font-bold">
              {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                {user?.fullName || 'Student'}
              </div>
              <div className="text-xs text-white/50 truncate">
                {userFaculty ? getFacultyShortName(userFaculty) : 'Student'}
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-[10px] text-white/40 tracking-widest uppercase px-3 mb-3">
            Main
          </div>

          {/* Dashboard */}
          <button
            onClick={() => {
              onChangeView('dashboard');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-carton/20 to-transparent border-l-2 border-carton text-carton'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => {
              onChangeView('bookmarks');
              onClose();
            }}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeView === 'bookmarks'
                ? 'bg-gradient-to-r from-carton/20 to-transparent border-l-2 border-carton text-carton'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-3">
              <Bookmark size={18} />
              Bookmarks
            </span>
            {bookmarkCount > 0 && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeView === 'bookmarks'
                    ? 'bg-carton text-black'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Profile / Settings */}
          <button
            onClick={() => {
              navigate('/profile');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings size={18} />
            Profile Settings
          </button>

          {/* Current Faculty */}
          {currentFaculty && (
            <>
              <div className="text-[10px] text-white/40 tracking-widest uppercase px-3 mt-6 mb-3">
                Current Faculty
              </div>
              <div className="px-3 py-2 text-sm text-white/80 font-medium flex items-center gap-2">
                <ShieldAlert size={14} className="text-carton" />
                {getFacultyShortName(currentFaculty)}
              </div>
            </>
          )}
        </nav>

        {/* Bottom — Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ============================================================
   MATERIAL CARD
   ============================================================ */
function MaterialCard({
  material,
  onClick,
  onBookmark,
  bookmarked,
  index,
}: {
  material: DriveFile;
  onClick: () => void;
  onBookmark: (e: React.MouseEvent) => void;
  bookmarked: boolean;
  index: number;
}) {
  const Icon = getFileIcon(material.mimeType);
  const color = getFileColor(material.mimeType);
  const ext = material.mimeType?.split('/').pop()?.toUpperCase() || 'FILE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onClick={onClick}
      className="group relative bg-[#141414] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all hover:-translate-y-1"
    >
      {/* Thumbnail / Preview */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}25 0%, ${color}08 100%)`,
        }}
      >
        {material.thumbnailLink ? (
          <img
            src={material.thumbnailLink}
            alt={material.name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          >
            <Icon size={28} style={{ color }} />
          </div>
        )}

        {/* Top-right badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider"
          style={{ background: `${color}25`, color }}
        >
          {ext}
        </div>

        {/* Bookmark button (top-left) */}
        <button
          onClick={onBookmark}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-carton text-black'
              : 'bg-black/50 text-white/70 hover:bg-black/80 hover:text-white'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-white text-sm leading-snug line-clamp-2 mb-2 group-hover:text-carton transition-colors">
          {material.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(material.modifiedTime)}
          </span>
          {material.size && (
            <span>{(parseInt(material.size) / 1024).toFixed(0)} KB</span>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center gap-2 text-carton text-xs font-semibold">
          <ExternalLink size={14} />
          Open in Drive
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   MATERIAL LIST ROW
   ============================================================ */
function MaterialRow({
  material,
  onClick,
  onBookmark,
  bookmarked,
}: {
  material: DriveFile;
  onClick: () => void;
  onBookmark: (e: React.MouseEvent) => void;
  bookmarked: boolean;
}) {
  const Icon = getFileIcon(material.mimeType);
  const color = getFileColor(material.mimeType);
  const ext = material.mimeType?.split('/').pop()?.toUpperCase() || 'FILE';

  return (
    <div className="group grid grid-cols-12 gap-4 items-center p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors">
      <div className="col-span-6 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          onClick={onClick}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div className="min-w-0 cursor-pointer" onClick={onClick}>
          <div className="text-sm font-semibold text-white truncate group-hover:text-carton transition-colors">
            {material.name}
          </div>
          <div className="text-xs text-white/40">{ext}</div>
        </div>
      </div>

      <div className="col-span-3 text-xs text-white/50 flex items-center gap-1">
        <Calendar size={12} />
        {formatDate(material.modifiedTime)}
      </div>

      <div className="col-span-2 text-xs text-white/50">
        {material.size ? `${(parseInt(material.size) / 1024).toFixed(0)} KB` : '—'}
      </div>

      <div className="col-span-1 flex justify-end gap-2">
        <button
          onClick={onBookmark}
          className={`p-1.5 rounded-lg transition-colors ${
            bookmarked
              ? 'text-carton bg-carton/10'
              : 'text-white/40 hover:text-carton hover:bg-carton/10'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={onClick}
          className="p-1.5 rounded-lg text-white/40 hover:text-carton hover:bg-carton/10 transition-colors"
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ACCESS DENIED
   ============================================================ */
function AccessDenied({ userFaculty }: { userFaculty: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#141414] border border-red-500/20 rounded-3xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={28} className="text-red-400" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white mb-3">
          Access Denied
        </h2>
        <p className="text-white/60 text-sm mb-2">
          You don't have permission to view materials from another faculty.
        </p>
        <p className="text-xs text-white/40 mb-6">
          You belong to{' '}
          <span className="text-carton font-semibold">
            {getFacultyShortName(userFaculty)}
          </span>
          . Only your own faculty's materials are accessible.
        </p>
        <button
          onClick={() =>
            navigate(`/dashboard/${encodeURIComponent(userFaculty)}`)
          }
          className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-carton to-amber-500 text-black font-semibold hover:scale-[1.02] transition-all"
        >
          Go to My Faculty
        </button>
      </motion.div>
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="relative border border-white/5 rounded-2xl p-4 bg-white/[0.02] overflow-hidden">
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-30"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
          {label}
        </div>
        <div className="font-serif text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN DASHBOARD
   ============================================================ */
const DashboardPage = () => {
  const { facultyName } = useParams<{ facultyName: string }>();
  const [materials, setMaterials] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<SidebarView>('dashboard');

  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const navigate = useNavigate();

  const decodedFacultyName = facultyName ? decodeURIComponent(facultyName) : '';
  const faculty = faculties.find((f) => f.name === decodedFacultyName);

  const userFaculty = user?.faculty || '';
  const isOwnFaculty =
    !userFaculty ||
    userFaculty === decodedFacultyName ||
    decodedFacultyName === '';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (facultyName && isOwnFaculty) {
      loadMaterials(decodedFacultyName);
    }
  }, [facultyName, isAuthenticated, isOwnFaculty, navigate]);

  const loadMaterials = async (name: string) => {
    setIsLoading(true);
    try {
      const data = await getMaterialsByFaculty(name);
      setMaterials(data || []);
    } catch (error) {
      console.error('❌ Failed to load materials:', error);
      showToast('error', 'Failed to load materials. Please try again.');
      setMaterials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaterialClick = (webViewLink: string) => {
    if (webViewLink) {
      window.open(webViewLink, '_blank');
      showToast('info', 'Opening material in Google Drive...');
    } else {
      showToast('error', 'Unable to open this material');
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleBookmark(id);
    showToast(
      'success',
      isBookmarked(id) ? 'Removed from bookmarks' : 'Added to bookmarks'
    );
  };

  const handleLogout = () => {
    logout();
    showToast('success', 'Logged out successfully');
    navigate('/');
  };

  const bookmarkedMaterials = useMemo(
    () => materials.filter((m) => bookmarks.includes(m.id)),
    [materials, bookmarks]
  );

  const sourceMaterials =
    activeView === 'bookmarks' ? bookmarkedMaterials : materials;

  const filteredMaterials = sourceMaterials.filter((m) =>
    m.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If user is trying to access another faculty → Access Denied
  if (userFaculty && decodedFacultyName && !isOwnFaculty) {
    return <AccessDenied userFaculty={userFaculty} />;
  }

  // Faculty not found
  if (!faculty) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[#141414] border border-white/10 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-carton/10 border border-carton/30 flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-carton" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            Faculty Not Found
          </h2>
          <p className="text-white/50 text-sm mb-6">
            The requested faculty "{decodedFacultyName}" does not exist.
          </p>
          <button
            onClick={() =>
              userFaculty
                ? navigate(`/dashboard/${encodeURIComponent(userFaculty)}`)
                : navigate('/')
            }
            className="px-6 py-3 rounded-full bg-gradient-to-r from-carton to-amber-500 text-black font-semibold hover:scale-105 transition-all"
          >
            {userFaculty ? 'Go to My Faculty' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentFaculty={faculty.name}
        userFaculty={userFaculty}
        activeView={activeView}
        onChangeView={setActiveView}
        onLogout={handleLogout}
        bookmarkCount={bookmarks.length}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2"
            >
              <Menu size={22} />
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-white/40">Dashboard</span>
              <ChevronRight size={14} className="text-white/30" />
              <span className="text-white font-medium">
                {activeView === 'bookmarks'
                  ? 'Bookmarks'
                  : getFacultyShortName(faculty.name)}
              </span>
            </div>

            <div className="flex-1 max-w-md relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search a book..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-carton/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${
                  view === 'grid'
                    ? 'bg-carton text-black'
                    : 'text-white/50 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${
                  view === 'list'
                    ? 'bg-carton text-black'
                    : 'text-white/50 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 border border-carton/40 bg-carton/10 text-carton px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              {activeView === 'bookmarks' ? (
                <>
                  <BookmarkCheck size={12} />
                  Bookmarks
                </>
              ) : (
                <>
                  <Library size={12} />
                  {getFacultyShortName(faculty.name)}
                </>
              )}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
              {activeView === 'bookmarks' ? 'Your Bookmarks' : faculty.name}
            </h1>
            <p className="text-white/50 text-sm">
              {activeView === 'bookmarks'
                ? `${bookmarks.length} saved material${
                    bookmarks.length === 1 ? '' : 's'
                  }`
                : faculty.description}
            </p>
          </motion.div>

          {/* Stats (only on dashboard view) */}
          {!isLoading && activeView === 'dashboard' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Materials"
                value={materials.length}
                accent="#B8935A"
              />
              <StatCard
                label="PDFs"
                value={
                  materials.filter((m) => m.mimeType?.includes('pdf')).length
                }
                accent="#EF4444"
              />
              <StatCard
                label="Bookmarks"
                value={bookmarks.length}
                accent="#8B5CF6"
              />
              <StatCard
                label="Images"
                value={
                  materials.filter((m) => m.mimeType?.includes('image')).length
                }
                accent="#10B981"
              />
            </div>
          )}

          {/* Materials */}
          {isLoading ? (
            <div className="py-24 text-center">
              <LoadingSpinner size="lg" text="Loading materials..." />
            </div>
          ) : filteredMaterials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center border border-white/5 rounded-3xl bg-white/[0.02]"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                {activeView === 'bookmarks' ? (
                  <Bookmark className="h-9 w-9 text-white/30" />
                ) : (
                  <BookOpen className="h-9 w-9 text-white/30" />
                )}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {searchQuery
                  ? 'No results found'
                  : activeView === 'bookmarks'
                  ? 'No bookmarks yet'
                  : 'No materials yet'}
              </h3>
              <p className="text-white/50 text-sm">
                {searchQuery
                  ? `Nothing matched "${searchQuery}". Try a different search.`
                  : activeView === 'bookmarks'
                  ? 'Click the bookmark icon on any material to save it here.'
                  : 'Check back later for new content.'}
              </p>
            </motion.div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredMaterials.map((material, index) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  index={index}
                  bookmarked={isBookmarked(material.id)}
                  onBookmark={(e) => handleBookmarkClick(e, material.id)}
                  onClick={() => handleMaterialClick(material.webViewLink)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-white/5 rounded-2xl bg-[#0F0F0F] overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/5 text-xs font-semibold text-white/40 tracking-wider uppercase">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {filteredMaterials.map((material) => (
                <MaterialRow
                  key={material.id}
                  material={material}
                  bookmarked={isBookmarked(material.id)}
                  onBookmark={(e) => handleBookmarkClick(e, material.id)}
                  onClick={() => handleMaterialClick(material.webViewLink)}
                />
              ))}
            </div>
          )}

          {/* Results count */}
          {!isLoading && filteredMaterials.length > 0 && (
            <div className="mt-6 text-sm text-white/40 text-center">
              Showing {filteredMaterials.length} of {sourceMaterials.length}{' '}
              results
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;