import { useRef } from 'react';
import SongForm from './components/SongForm';
import SetlistBuilder from './components/SetlistBuilder';
import { useRepertoire } from './context/RepertoireContext';
import { Trash2, Edit3, Plus, Download, Upload, Sun, Moon } from 'lucide-react';

export default function App() {
  const {
    songs, deleteSong, setEditingSong, activeSetlistId,
    addSongToSetlist, importData, setlists, darkMode, setDarkMode
  } = useRepertoire();
  const fileInputRef = useRef(null);

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
    URL.revokeObjectURL(url);
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

  return (
    // Dynamic theme assignment node - True Black implementation
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-black text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-8">

        {/* Main Structural Banner */}
        <header className={`p-6 rounded-2xl border flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-xl transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              ReperOS <span className="text-blue-500">Web</span>
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
              <h2 className="text-xl font-bold">Track Inventory</h2>
              <span className="text-xs font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30 px-2.5 py-1 rounded-full">
                {songs.length} Tracks Tracked
              </span>
            </div>

            {songs.length === 0 ? (
              <p className={`text-center py-16 text-sm italic ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Inventory void. Commit entries using the management console.
              </p>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
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

                      {/* Dynamic Metadata Badges including BPM */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
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
                        onClick={() => setEditingSong(song)}
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

          <div className="md:col-span-3 lg:col-span-1">
            <SetlistBuilder />
          </div>

        </div>
      </div>
    </div>
  );
}