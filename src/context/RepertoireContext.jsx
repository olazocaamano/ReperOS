import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RepertoireContext = createContext();

export function RepertoireProvider({ children }) {
    const [songs, setSongs] = useLocalStorage('repro-songs', []);
    const [setlists, setSetlists] = useLocalStorage('repro-setlists', []);
    const [darkMode, setDarkMode] = useLocalStorage('repro-theme', true); // Defaulting to Dark Mode
    const [editingSong, setEditingSong] = useState(null);
    const [activeSetlistId, setActiveSetlistId] = useState('');

    // Add a new song to the global repertoire
    const addSong = (song) => {
        setSongs([...songs, { ...song, id: Date.now().toString() }]);
    };

    // Update details of an existing song
    const updateSong = (updatedSong) => {
        setSongs(songs.map(s => s.id === updatedSong.id ? updatedSong : s));
        setEditingSong(null);
    };

    // Delete a song and remove it from all existing setlists
    const deleteSong = (id) => {
        setSongs(songs.filter(s => s.id !== id));
        setSetlists(setlists.map(sl => ({
            ...sl,
            songIds: sl.songIds.filter(sid => sid !== id)
        })));
        if (editingSong?.id === id) setEditingSong(null);
    };

    // Create a brand new empty setlist
    const createSetlist = (name) => {
        const newSetlist = { id: Date.now().toString(), name, songIds: [] };
        setSetlists([...setlists, newSetlist]);
        setActiveSetlistId(newSetlist.id);
    };

    // Delete an entire setlist
    const deleteSetlist = (id) => {
        setSetlists(setlists.filter(sl => sl.id !== id));
        if (activeSetlistId === id) setActiveSetlistId('');
    };

    // Append a song to a specific setlist
    const addSongToSetlist = (setlistId, songId) => {
        setSetlists(setlists.map(sl => {
            if (sl.id === setlistId && !sl.songIds.includes(songId)) {
                return { ...sl, songIds: [...sl.songIds, songId] };
            }
            return sl;
        }));
    };

    // Remove a single instance of a song from a setlist
    const removeSongFromSetlist = (setlistId, songId) => {
        setSetlists(setlists.map(sl => {
            if (sl.id === setlistId) {
                return { ...sl, songIds: sl.songIds.filter(id => id !== songId) };
            }
            return sl;
        }));
    };

    // Overwrite current state with imported data payload
    const importData = (importedSongs, importedSetlists) => {
        if (importedSongs) setSongs(importedSongs);
        if (importedSetlists) setSetlists(importedSetlists);
    };

    return (
        <RepertoireContext.Provider value={{
            songs, addSong, updateSong, deleteSong,
            setlists, createSetlist, deleteSetlist, addSongToSetlist, removeSongFromSetlist,
            editingSong, setEditingSong, activeSetlistId, setActiveSetlistId, importData,
            darkMode, setDarkMode
        }}>
            {children}
        </RepertoireContext.Provider>
    );
}

export function useRepertoire() {
    return useContext(RepertoireContext);
}