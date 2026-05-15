import { useState, useEffect } from 'react';
import { useRepertoire } from '../context/RepertoireContext';
import { Music, Plus, Save, X } from 'lucide-react';

export default function SongForm() {
    const { addSong, updateSong, editingSong, setEditingSong, darkMode } = useRepertoire();
    const [formData, setFormData] = useState({
        name: '', artist: '', key: '', bpm: '', genre: '', voiceType: 'Male', description: ''
    });

    // Automatically sync form when a song is selected for editing
    useEffect(() => {
        if (editingSong) {
            setFormData(editingSong);
        } else {
            setFormData({ name: '', artist: '', key: '', bpm: '', genre: '', voiceType: 'Male', description: '' });
        }
    }, [editingSong]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        if (editingSong) {
            updateSong(formData);
        } else {
            addSong(formData);
        }

        // Reset form after submission
        setFormData({ name: '', artist: '', key: '', bpm: '', genre: '', voiceType: 'Male', description: '' });
    };

    const inputClass = `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-zinc-700' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
        }`;

    return (
        <form onSubmit={handleSubmit} className={`p-6 rounded-xl shadow-lg border w-full transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Music className={editingSong ? "text-amber-400" : "text-blue-500"} size={24} />
                    <h2 className="text-xl font-bold">
                        {editingSong ? 'Edit Song' : 'Add New Song'}
                    </h2>
                </div>
                {editingSong && (
                    <button type="button" onClick={() => setEditingSong(null)} className="text-zinc-400 hover:text-red-500 p-1">
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Song Title</label>
                    <input type="text" required placeholder="e.g., Comfortably Numb" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                </div>

                <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Artist / Band</label>
                    <input type="text" placeholder="e.g., Pink Floyd" value={formData.artist} onChange={(e) => setFormData({ ...formData, artist: e.target.value })} className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Key / Tuning</label>
                        <input type="text" placeholder="e.g., Bm" value={formData.key} onChange={(e) => setFormData({ ...formData, key: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>BPM</label>
                        <input type="number" placeholder="e.g., 127" value={formData.bpm} onChange={(e) => setFormData({ ...formData, bpm: e.target.value })} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Genre</label>
                        <input type="text" placeholder="e.g., Rock" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Vocal Profile</label>
                        <select value={formData.voiceType} onChange={(e) => setFormData({ ...formData, voiceType: e.target.value })} className={inputClass}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Duet">Duet</option>
                            <option value="Instrumental">Instrumental</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>Performance Notes</label>
                    <textarea placeholder="Arrangement cues..." rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} />
                </div>

                <button
                    type="submit"
                    className={`w-full font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2 text-white ${editingSong ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                >
                    {editingSong ? <Save size={20} /> : <Plus size={20} />}
                    {editingSong ? 'Save Modifications' : 'Commit to Repertoire'}
                </button>
            </div>
        </form>
    );
}