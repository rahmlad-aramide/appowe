import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(null);

    const addProverbIdToHistory = async (proverbId) => {
        try {
          const historyJson = await AsyncStorage.getItem('proverbHistory');
          const history = historyJson ? JSON.parse(historyJson) : [];
          const historySet = new Set([proverbId, ...history]);
          const updatedHistory = Array.from(historySet).slice(0, 20);
          setHistory(updatedHistory);
          await AsyncStorage.setItem('proverbHistory', JSON.stringify(updatedHistory));
        } catch (e) {
          console.error('Failed to add proverb ID to history:', e);
        }
      };
      
      const fetchHistory = async () => {
        const historyJson = await AsyncStorage.getItem('proverbHistory');
        const historyIds = historyJson ? JSON.parse(historyJson) : [];
        setHistory(historyIds);
      };

      useEffect(() => {
        fetchHistory();
      }, []);


    return (
        <HistoryContext.Provider value={{ history, addProverbIdToHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
