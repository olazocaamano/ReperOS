import { useState } from 'react';
import { useRepertoire } from '../context/RepertoireContext';
import { FileDown, Plus, Trash2, ListMusic, Layers, Eye } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function SetlistBuilder({ isMobile, onMobileExpand }) {
    const {
        songs, setlists, createSetlist, deleteSetlist,
        activeSetlistId, setActiveSetlistId, removeSongFromSetlist, darkMode
    } = useRepertoire();

    const [newListName, setNewListName] = useState('');
    const currentSetlist = setlists.find(sl => sl.id === activeSetlistId);
    const setlistSongs = currentSetlist ? currentSetlist.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) : [];

    const handleCreate = (e) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        createSetlist(newListName);
        setNewListName('');
    };

    // High-reliability clean text-based PDF export formatted to American Letter size on standard white paper
    const handleExportPDF = () => {
        if (!currentSetlist || setlistSongs.length === 0) return;

        try {
            // Initialize jsPDF configuration targeting standard US 'Letter' measurements in millimeters
            // Letter standard dimensions: 215.9mm x 279.4mm
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'letter'
            });

            const pageWidth = 215.9;
            let currentY = 20; // Structural top padding margin

            // 1. Document Canvas Reset - Force pristine white sheet background color properties
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, pageWidth, 279.4, 'F');

            // 2. Render Document Header Banner Area
            pdf.setFont('Helvetica', 'bold');
            pdf.setFontSize(24);
            pdf.setTextColor(24, 24, 27); // zinc-900 absolute pitch text color
            pdf.text(currentSetlist.name, 20, currentY);

            currentY += 7;
            pdf.setFont('Helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(113, 113, 122); // zinc-500 subtle gray sub-headline text
            pdf.text(`Total Tracks: ${setlistSongs.length}  |  Generated Workspace Document`, 20, currentY);

            currentY += 5;
            // Draw minimal clean structural rule divider line underneath header
            pdf.setDrawColor(228, 228, 231); // zinc-200 border hex tint
            pdf.setLineWidth(0.5);
            pdf.line(20, currentY, pageWidth - 20, currentY);

            currentY += 12;

            // 3. Render Track List Lineup Rows Sequentially
            setlistSongs.forEach((song, index) => {
                // Simple pagination fallback threshold safety boundary check
                if (currentY > 255) {
                    pdf.addPage('letter', 'p');
                    // Clear background color setup for subsequent pages as well
                    pdf.setFillColor(255, 255, 255);
                    pdf.rect(0, 0, pageWidth, 279.4, 'F');
                    currentY = 20;
                }

                // Generate dynamic background row card borders for structural alignment contrast
                pdf.setFillColor(244, 244, 245); // zinc-100 container row fill background
                pdf.setDrawColor(228, 228, 231); // zinc-200 boundary edge stroke
                pdf.roundedRect(19, currentY - 5, pageWidth - 38, 14, 2, 2, 'FD');

                // Draw structural song position index badge counter
                pdf.setFont('Courier', 'bold');
                pdf.setFontSize(10);
                pdf.setTextColor(161, 161, 170); // zinc-400 number indicator
                const numericalPrefix = String(index + 1).padStart(2, '0');
                pdf.text(numericalPrefix, 24, currentY + 3);

                // Render Master Track Metadata Title Layout Block
                pdf.setFont('Helvetica', 'bold');
                pdf.setFontSize(11);
                pdf.setTextColor(24, 24, 27); // zinc-900 track heading text

                let songHeaderString = song.name;
                if (song.artist) {
                    songHeaderString += `  -  ${song.artist}`;
                }
                pdf.text(songHeaderString, 34, currentY + 1);

                // Render Performance Spec Sub-badges (Duration, Key, BPM, Vocals)
                pdf.setFont('Helvetica', 'normal');
                pdf.setFontSize(9);

                let metaSegmentX = 34;

                if (song.duration) {
                    pdf.setTextColor(59, 130, 246); // blue-500 duration text color
                    pdf.text(song.duration, metaSegmentX, currentY + 5.5);
                    metaSegmentX += pdf.getTextWidth(song.duration) + 3;

                    pdf.setTextColor(212, 212, 216); // zinc-300 delimiter point dot
                    pdf.text('·', metaSegmentX, currentY + 5.5);
                    metaSegmentX += 3;
                }

                if (song.key) {
                    pdf.setTextColor(217, 119, 6); // amber-600 key tuning text color
                    pdf.text(song.key, metaSegmentX, currentY + 5.5);
                    metaSegmentX += pdf.getTextWidth(song.key) + 3;

                    pdf.setTextColor(212, 212, 216); // zinc-300 delimiter point dot
                    pdf.text('·', metaSegmentX, currentY + 5.5);
                    metaSegmentX += 3;
                }

                if (song.bpm) {
                    pdf.setTextColor(220, 38, 38); // red-600 dynamic cadence beat metric tone
                    const bpmString = `${song.bpm} BPM`;
                    pdf.text(bpmString, metaSegmentX, currentY + 5.5);
                    metaSegmentX += pdf.getTextWidth(bpmString) + 3;

                    pdf.setTextColor(212, 212, 216);
                    pdf.text('·', metaSegmentX, currentY + 5.5);
                    metaSegmentX += 3;
                }

                pdf.setTextColor(113, 113, 122); // zinc-500 standard vocal role descriptor profile
                pdf.text(song.voiceType, metaSegmentX, currentY + 5.5);

                // Offset layout tracking baseline pivot position marker to next item iteration
                currentY += 18;
            });

            // 4. Fire localized browser filesystem save dispatch stream event
            const cleanFileName = currentSetlist.name.replace(/\s+/g, '_');
            pdf.save(`Setlist_${cleanFileName}.pdf`);

        } catch (error) {
            console.error("PDF engine document generation layer collapsed:", error);
            alert("Error printing layout list structure. Falling back safely.");
        }
    };

    return (
        <div className="space-y-6 w-full">
            {/* Setlist Management Dashboard Card Control Panel */}
            <div className={`p-6 rounded-xl border shadow-lg transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                <div className="flex items-center gap-2 mb-4">
                    <Layers className="text-emerald-500" size={22} />
                    <h2 className="text-xl font-bold">Setlist Manager</h2>
                </div>

                <form onSubmit={handleCreate} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Gig Name / Date..."
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className={`flex-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-zinc-700' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                            }`}
                    />
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors cursor-pointer">
                        <Plus size={18} />
                    </button>
                </form>

                {setlists.length > 0 && (
                    <div>
                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Select Active Workspace
                        </label>
                        <select
                            value={activeSetlistId}
                            onChange={(e) => setActiveSetlistId(e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors ${darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                                }`}
                        >
                            <option value="">-- Select Setlist --</option>
                            {setlists.map(sl => (
                                <option key={sl.id} value={sl.id}>{sl.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Target Active Lineup Paper Sheet Workspace Interface */}
            {currentSetlist ? (
                <div className={`rounded-xl border overflow-hidden shadow-lg transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                    }`}>
                    {/* Top Header Utility Action Control Bar */}
                    <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'bg-zinc-800/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <ListMusic size={18} /> Lineup
                        </span>
                        <div className="flex gap-2">
                            {/* Omit PDF Generation engine render block context if executed within APK bundle wrapper */}
                            {!isMobile && (
                                <button
                                    onClick={handleExportPDF}
                                    disabled={setlistSongs.length === 0}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <FileDown size={14} /> Export PDF
                                </button>
                            )}

                            {/* Trigger viewport matrix expansion swap if executing workspace context within a mobile device */}
                            {isMobile && (
                                <button
                                    onClick={() => onMobileExpand(currentSetlist.id)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                                    title="Open Live Stage Viewport"
                                >
                                    <Eye size={14} /> Live View
                                </button>
                            )}

                            <button
                                onClick={() => deleteSetlist(currentSetlist.id)}
                                className={`p-1.5 rounded-md border transition-colors cursor-pointer ${darkMode ? 'bg-zinc-800 hover:bg-red-950/40 border-zinc-700 text-red-400' : 'bg-zinc-100 hover:bg-red-50 border-zinc-200 text-red-600'
                                    }`}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>

                    {/* VIRTUAL WORKSPACE VISUAL DISPLAY: Stays beautiful pure black on screen */}
                    <div id="printable-setlist" className={`p-6 space-y-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
                        <div className={`border-b pb-3 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                            <h1 className="text-2xl font-bold tracking-wide">{currentSetlist.name}</h1>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                Total Items: {setlistSongs.length}
                            </p>
                        </div>

                        {setlistSongs.length === 0 ? (
                            <p className="text-zinc-500 text-center py-12 text-sm italic">
                                Workspace empty. Click "+" elements on inventory lists.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {setlistSongs.map((song, index) => (
                                    <div key={`${song.id}-${index}`} className={`group p-3 rounded-lg border flex justify-between items-center ${darkMode ? 'bg-zinc-900/60 border-zinc-900' : 'bg-zinc-50 border-zinc-100'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center border ${darkMode ? 'bg-black text-zinc-600 border-zinc-900' : 'bg-white text-zinc-400 border-zinc-200'
                                                }`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <h4 className="text-sm font-bold">{song.name}</h4>
                                                    {song.artist && <span className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>- {song.artist}</span>}
                                                </div>

                                                <div className="flex gap-2 mt-0.5 text-[11px] font-medium">
                                                    {song.duration && <span className="text-blue-500">{song.duration}</span>}
                                                    {song.duration && (song.key || song.bpm) && <span className="text-zinc-600">·</span>}
                                                    {song.key && <span className="text-amber-500">{song.key}</span>}
                                                    {song.key && song.bpm && <span className="text-zinc-600">·</span>}
                                                    {song.bpm && <span className="text-red-400">{song.bpm} BPM</span>}
                                                    <span className="text-zinc-600">·</span>
                                                    <span className={`${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{song.voiceType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeSongFromSetlist(currentSetlist.id, song.id)}
                                            className="text-zinc-400 hover:text-red-500 p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={`border border-dashed rounded-xl p-8 text-center text-sm ${darkMode ? 'border-zinc-800 text-zinc-600' : 'border-zinc-300 text-zinc-400'
                    }`}>
                    No show setup active. Use the manager above to build a list.
                </div>
            )}
        </div>
    );
}