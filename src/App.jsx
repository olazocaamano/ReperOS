import { useRef, useEffect, useState } from 'react';
import SongForm from './components/SongForm';
import SetlistBuilder from './components/SetlistBuilder';
import { useRepertoire } from './context/RepertoireContext';
import { Trash2, Edit3, Plus, Download, Upload, Sun, Moon, ListMusic, ArrowLeft, Music, Play, Square, RotateCcw } from 'lucide-react';
import { Device } from '@capacitor/device';

export default function App() {
  const {
    songs, deleteSong, setEditingSong, activeSetlistId,
    addSongToSetlist, importData, setlists, darkMode, setDarkMode
  } = useRepertoire();

  const fileInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // State variables handling mobile full-screen setlist expansion matrix
  const [activeMobileView, setActiveMobileView] = useState('dashboard'); // 'dashboard' or 'expanded-setlist'
  const [selectedMobileListId, setSelectedMobileListId] = useState('');
  const [mobileActiveSongs, setMobileActiveSongs] = useState([]);

  // Live performance stopwatch state variables
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const calculateTotalSetlistDuration = (activeSongsArray) => {
    let totalSeconds = 0;

    activeSongsArray.forEach(song => {
      if (!song || !song.duration) return;
      const parts = song.duration.split(':');
      if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10) || 0;
        const seconds = parseInt(parts[1], 10) || 0;
        totalSeconds += (minutes * 60) + seconds;
      }
    });

    if (totalSeconds === 0) return '0 min';

    const finalMinutes = Math.floor(totalSeconds / 60);
    const finalSeconds = totalSeconds % 60;

    return finalSeconds > 0
      ? `${finalMinutes} min ${finalSeconds} s`
      : `${finalMinutes} min`;
  };

  // 1. Evaluate device footprint context to optimize desktop vs native APK execution
  useEffect(() => {
    const checkPlatform = async () => {
      const info = await Device.getInfo();
      setIsMobile(info.platform === 'android' || info.platform === 'ios');
    };
    checkPlatform();
  }, []);

  // 2. Map structural relational song arrays whenever a mobile setlist entity triggers
  useEffect(() => {
    if (!selectedMobileListId) {
      setMobileActiveSongs([]);
      return;
    }
    const targetList = setlists.find(l => l.id === selectedMobileListId);
    if (targetList && targetList.songIds) {
      const resolvedSongs = targetList.songIds
        .map(id => songs.find(s => s.id === id))
        .filter(Boolean);
      setMobileActiveSongs(resolvedSongs);
    } else {
      setMobileActiveSongs([]);
    }
  }, [selectedMobileListId, setlists, songs]);

  // 3. Operational lifecycle management hook for the performance stage stopwatch
  useEffect(() => {
    let internalInterval = null;

    if (isStopwatchRunning) {
      internalInterval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (internalInterval) clearInterval(internalInterval);
    };
  }, [isStopwatchRunning]);

  const handleExportData = () => {
    const dataPayload = JSON.stringify({ songs, setlists }, null, 2);
    const dataBlob = new Blob([dataPayload], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.download = `ReperOS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    url.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.songs || parsed.setlists) {
          importData(parsed.songs || [], parsed.setlists || []);
          alert('System recovery successful! Loaded operational state.');
        } else {
          alert('File format mismatch.');
        }
      } catch (err) {
        alert('Parsing failure.');
      }
    };
    fileReader.readAsText(file);
  };

  // Helper function to trigger full-screen setlist view overrides on mobile
  const openMobileSetlist = (id) => {
    setSelectedMobileListId(id);
    setActiveMobileView('expanded-setlist');
  };

  // Helper utility to parse time into MM:SS:MS format
  const formatStopwatchTime = (totalMilliseconds) => {
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  // =========================================================================
  // 📱 CONDITIONAL OVERRIDE: DETACHED FULL-SCREEN MOBILE SETLIST VIEW
  // =========================================================================
  if (isMobile && activeMobileView === 'expanded-setlist') {
    const totalDurationText = calculateTotalSetlistDuration(mobileActiveSongs);
    return (
      <div className={`min-h-screen p-4 font-sans select-none transition-colors duration-200 ${darkMode ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
        <div className="max-w-md mx-auto space-y-4">

          {/* Back Navigation Navigation Block */}
          <button
            onClick={() => {
              setActiveMobileView('dashboard');
              setIsStopwatchRunning(false); // Safety override to stall execution on exit if preferred
            }}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>

          {/* Enhanced Stage Viewport Header Node with Integrated Live Performance Stopwatch */}
          <header className={`p-5 rounded-2xl border shadow-lg text-center space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div>
              <h2 className="text-xl font-black text-blue-500 tracking-wide">
                {setlists.find(l => l.id === selectedMobileListId)?.name || 'Show Setlist'}
              </h2>
              <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {mobileActiveSongs.length} temas • Duración estimada: <span className="font-bold text-blue-500">{totalDurationText}</span>
              </p>
            </div>

            {/* Live Stopwatch UI Matrix Block */}
            <div className={`p-3 rounded-xl border flex items-center justify-between mx-auto max-w-[280px] ${darkMode ? 'bg-black border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
              }`}>
              <div className="font-mono text-2xl font-black tracking-widest text-emerald-500 pl-2">
                {formatStopwatchTime(stopwatchTime)}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                  className={`p-2 rounded-lg text-white font-bold transition-colors ${isStopwatchRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  title={isStopwatchRunning ? "Pause timer" : "Start timer"}
                >
                  {isStopwatchRunning ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                </button>
                <button
                  onClick={() => {
                    setIsStopwatchRunning(false);
                    setStopwatchTime(0);
                  }}
                  className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                  title="Reset timer"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </header>

          <main className="space-y-3">
            {mobileActiveSongs.length > 0 ? (
              mobileActiveSongs.map((song, index) => (
                <div
                  key={song.id || index}
                  className={`p-4 rounded-xl border flex justify-between items-center shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800/80' : 'bg-white border-zinc-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${darkMode ? 'bg-black border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                      }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold tracking-wide">{song.name}</h3>
                      {song.artist && <p className={`text-xs mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>by {song.artist}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {song.duration && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${darkMode ? 'border-blue-500/20 bg-black text-blue-400' : 'border-blue-200 bg-blue-50 text-blue-700'
                        }`}>
                        {song.duration}
                      </span>
                    )}
                    {song.key && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${darkMode ? 'border-amber-500/20 bg-black text-amber-400' : 'border-amber-200 bg-amber-50 text-amber-700'
                        }`}>
                        {song.key}
                      </span>
                    )}
                    {song.bpm && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${darkMode ? 'border-red-500/20 bg-black text-red-400' : 'border-red-200 bg-red-50 text-red-700'
                        }`}>
                        {song.bpm} BPM
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center text-sm py-16 border border-dashed rounded-xl ${darkMode ? 'border-zinc-800 text-zinc-500' : 'border-zinc-300 text-zinc-400'}`}>
                <Music className="mx-auto mb-2 opacity-40" size={28} />
                No tracks mapped to this setlist workspace.
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 🖥️ STANDARD VIEWPORT RENDERING NODE (Muestra todo en Web y APK Dashboard)
  // =========================================================================
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-8">

        {/* Main Structural Banner */}
        <header className={`p-6 rounded-2xl border flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-xl transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {/* Omit target trailing string "Web" when executing inside native mobile APK wrapper */}
              ReperOS {!isMobile && <span className="text-blue-500">Web</span>}
            </h1>
            <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-500'} text-sm mt-0.5`}>
              Modular performance logistics and arrangement tracking workspace.
            </p>
          </div>

          {/* Action Clusters & Theme Toggle Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-amber-400' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-indigo-600'
                }`}
              title="Toggle Layout Skin"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={handleExportData}
              className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                }`}
            >
              <Download size={14} /> Export Backup
            </button>
            <button
              onClick={() => fileInputRef.current.click()}
              className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                }`}
            >
              <Upload size={14} /> Import Backup
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImportData} accept=".json" className="hidden" />
          </div>
        </header>

        {/* Layout Functional Grid Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">

          <div className="md:col-span-1">
            <SongForm />
          </div>

          {/* Central Track Inventory Column */}
          <div className={`md:col-span-2 lg:col-span-2 p-6 rounded-xl border shadow-lg transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ListMusic className={darkMode ? "text-blue-400" : "text-blue-500"} size={24} />
                <h2 className="text-xl font-bold">Track Inventory</h2>
              </div>
              <span className="text-xs font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30 px-2.5 py-1 rounded-full">
                {songs.length} Tracks Tracked
              </span>
            </div>

            {songs.length === 0 ? (
              <p className={`text-center py-16 text-sm italic ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Inventory void. Commit entries using the management console.
              </p>
            ) : (
              <div className={`space-y-3 max-h-[600px] overflow-y-auto pr-2 transition-colors
                [&::-webkit-scrollbar]:w-1
                ${darkMode ? '[&::-webkit-scrollbar-track]:bg-zinc-900' : '[&::-webkit-scrollbar-track]:bg-white'}
                ${darkMode ? '[&::-webkit-scrollbar-thumb]:bg-zinc-800' : '[&::-webkit-scrollbar-thumb]:bg-zinc-200'}
                [&::-webkit-scrollbar-thumb]:rounded-full
                ${darkMode ? 'hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700' : 'hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300'}
              `}>
                {songs.map((song) => (
                  <div key={song.id} className={`p-4 rounded-lg border flex justify-between items-start gap-4 transition-colors ${darkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div>
                          <h3 className="text-md font-bold leading-tight inline-block">{song.name}</h3>
                          {song.artist && <span className={`text-xs ml-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>by {song.artist}</span>}
                        </div>
                      </div>

                      {/* Dynamic Metadata Badges including BPM and Duration */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {song.duration && <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-900 text-blue-400 border-blue-400/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{song.duration}</span>}
                        {song.key && <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-900 text-amber-400 border-amber-400/20' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{song.key}</span>}
                        {song.bpm && <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-900 text-red-400 border-red-400/20' : 'bg-red-50 text-red-700 border-red-200'}`}>{song.bpm} BPM</span>}
                        {song.genre && <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-900 text-emerald-400 border-emerald-400/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{song.genre}</span>}
                        <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-900 text-blue-400 border-blue-400/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{song.voiceType}</span>
                      </div>

                      {song.description && <p className={`text-xs italic pt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>"{song.description}"</p>}
                    </div>

                    {/* Action Clusters Buttons */}
                    <div className="flex items-center gap-1">
                      {activeSetlistId && (
                        <button
                          onClick={() => addSongToSetlist(activeSetlistId, song.id)}
                          className={`p-1.5 transition-colors ${darkMode ? 'text-zinc-400 hover:text-emerald-400' : 'text-zinc-500 hover:text-emerald-600'}`}
                          title="Add to target setlist"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingSong({ ...song, duration: song.duration || '' })}
                        className={`p-1.5 transition-colors ${darkMode ? 'text-zinc-400 hover:text-amber-400' : 'text-zinc-500 hover:text-amber-600'}`}
                        title="Edit specifications"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => deleteSong(song.id)}
                        className={`p-1.5 transition-colors ${darkMode ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-500 hover:text-red-600'}`}
                        title="Purge record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Master Setlist panel handling logic - Relaying mobile triggers */}
          <div className="md:col-span-3 lg:col-span-1">
            <SetlistBuilder isMobile={isMobile} onMobileExpand={openMobileSetlist} />
          </div>

        </div>
      </div>
    </div>
  );
}