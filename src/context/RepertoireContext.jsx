// src/context/RepertoireContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';

const RepertoireContext = createContext();

export function RepertoireProvider({ children }) {
    const [songs, setSongs] = useState([]);
    const [setlists, setSetlists] = useState([]);
    const [activeSetlistId, setActiveSetlistId] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    // UI Theme persistence pipeline mapping
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // 1. Synchronize Master Songs Inventory Collection in Real-Time
    useEffect(() => {
        const songsRef = collection(db, 'songs');
        const unsubscribe = onSnapshot(songsRef, (snapshot) => {
            const songsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSongs(songsList);
        }, (error) => console.error("Firestore songs sync breakdown:", error));

        return () => unsubscribe();
    }, []);

    // 2. Synchronize Show Setlists Collection in Real-Time
    useEffect(() => {
        const setlistsRef = collection(db, 'setlists');
        const unsubscribe = onSnapshot(setlistsRef, (snapshot) => {
            const setlistsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSetlists(setlistsList);
        }, (error) => console.error("Firestore setlists sync breakdown:", error));

        return () => unsubscribe();
    }, []);

    // 3. Mutation Operations: Songs Infrastructure
    const addSong = async (songData) => {
        try {
            await addDoc(collection(db, 'songs'), {
                name: songData.name || 'Untitled Track',
                artist: songData.artist || '',
                key: songData.key || '',
                bpm: songData.bpm ? parseInt(songData.bpm, 10) : null,
                voiceType: songData.voiceType || 'Unassigned'
            });
        } catch (error) {
            console.error("Failed adding tracking data node:", error);
        }
    };

    const deleteSong = async (songId) => {
        try {
            await deleteDoc(doc(db, 'songs', songId));
            // Structural fallback cleanup: remove song relation pointer from all existing setlists
            setlists.forEach(async (list) => {
                if (list.songIds.includes(songId)) {
                    await removeSongFromSetlist(list.id, songId);
                }
            });
        } catch (error) {
            console.error("Purge mutation pipeline failed:", error);
        }
    };

    // 4. Mutation Operations: Setlists Workspaces
    const createSetlist = async (name) => {
        try {
            const docRef = await addDoc(collection(db, 'setlists'), {
                name: name,
                songIds: []
            });
            setActiveSetlistId(docRef.id);
        } catch (error) {
            console.error("Failed creating setup workspace matrix:", error);
        }
    };

    const deleteSetlist = async (setlistId) => {
        try {
            await deleteDoc(doc(db, 'setlists', setlistId));
            if (activeSetlistId === setlistId) {
                setActiveSetlistId('');
            }
        } catch (error) {
            console.error("Failed purging active setlist workspace:", error);
        }
    };

    const addSongToSetlist = async (setlistId, songId) => {
        try {
            const setlistRef = doc(db, 'setlists', setlistId);
            await updateDoc(setlistRef, {
                songIds: arrayUnion(songId)
            });
        } catch (error) {
            console.error("Relational index push failure:", error);
        }
    };

    const removeSongFromSetlist = async (setlistId, songId) => {
        try {
            const setlistRef = doc(db, 'setlists', setlistId);
            await updateDoc(setlistRef, {
                songIds: arrayRemove(songId)
            });
        } catch (error) {
            console.error("Relational index removal failure:", error);
        }
    };

    return (
        <RepertoireContext.Provider value={{
            songs,
            setlists,
            activeSetlistId,
            setActiveSetlistId,
            darkMode,
            setDarkMode,
            addSong,
            deleteSong,
            createSetlist,
            deleteSetlist,
            addSongToSetlist,
            removeSongFromSetlist
        }}>
            {children}
        </RepertoireContext.Provider>
    );
}

export function useRepertoire() {
    const context = useContext(RepertoireContext);
    if (!context) {
        throw new Error('useRepertoire must be wrapped inside a RepertoireProvider node context');
    }
    return context;
}