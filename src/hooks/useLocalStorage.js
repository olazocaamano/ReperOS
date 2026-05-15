import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // Attempt to retrieve data stored in LocalStorage
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error leyendo LocalStorage", error);
            return initialValue;
        }
    });

    // Save to LocalStorage every time the value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error guardando en LocalStorage", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}