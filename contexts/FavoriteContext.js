import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(null);
    
      const fetchFavorites = async () => {
        const favoritesJSON = await AsyncStorage.getItem('favorites');
        setFavorites(favoritesJSON ? JSON.parse(favoritesJSON) : []);
      };
    
      const addFavorite = async (id) => {
        const updatedFavorites = [...favorites, id];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      };
    
      const removeFavorite = async (id) => {
        const updatedFavorites = favorites.filter(fav => fav !== id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      };

      useEffect(()=>{
        fetchFavorites()
      },[])
    return (
        <FavoritesContext.Provider value={{ favorites, fetchFavorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
