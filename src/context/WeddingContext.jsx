import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultWeddingData, THEME_PRESETS } from '../data/defaultWeddingData';

const WeddingContext = createContext();

// Updated cache key to ensure fresh vibrant palette and user-provided prewedding images are loaded
const STORAGE_KEY = 'wedding_portfolio_custom_data_v4';

export function WeddingProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      // Clear legacy storage keys if present
      localStorage.removeItem('wedding_portfolio_custom_data');
      localStorage.removeItem('wedding_portfolio_custom_data_v1');
      localStorage.removeItem('wedding_portfolio_custom_data_v2');
      localStorage.removeItem('wedding_portfolio_custom_data_v3');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.preWeddingEvents)) {
          parsed.preWeddingEvents = parsed.preWeddingEvents.map((evt) => {
            if (evt.id === 'haldi' || evt.title?.toLowerCase().includes('haldi')) {
              return { ...evt, image: '/images/prewedding-haldi.jpg' };
            }
            if (evt.id === 'mehndi' || evt.title?.toLowerCase().includes('mehndi')) {
              return { ...evt, image: '/images/prewedding-mehndi.jpg' };
            }
            if (evt.id === 'sangeet' || evt.title?.toLowerCase().includes('sangeet')) {
              return { ...evt, image: '/images/prewedding-sangeet.jpg' };
            }
            return evt;
          });
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved wedding data:', e);
    }
    return defaultWeddingData;
  });

  // Ensure state always has the latest images even if HMR preserves old in-memory state
  useEffect(() => {
    setData((prev) => {
      let needsUpdate = false;
      const updatedEvents = (prev.preWeddingEvents || []).map((evt) => {
        if (
          (evt.id === 'haldi' || evt.title?.toLowerCase().includes('haldi')) &&
          (!evt.image || evt.image.includes('unsplash.com'))
        ) {
          needsUpdate = true;
          return { ...evt, image: '/images/prewedding-haldi.jpg' };
        }
        if (
          (evt.id === 'mehndi' || evt.title?.toLowerCase().includes('mehndi')) &&
          (!evt.image || evt.image.includes('unsplash.com'))
        ) {
          needsUpdate = true;
          return { ...evt, image: '/images/prewedding-mehndi.jpg' };
        }
        if (
          (evt.id === 'sangeet' || evt.title?.toLowerCase().includes('sangeet')) &&
          (!evt.image || evt.image.includes('unsplash.com'))
        ) {
          needsUpdate = true;
          return { ...evt, image: '/images/prewedding-sangeet.jpg' };
        }
        return evt;
      });
      return needsUpdate ? { ...prev, preWeddingEvents: updatedEvents } : prev;
    });
  }, []);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isFamilyUnlocked, setIsFamilyUnlocked] = useState(false);
  const [calligraphyKey, setCalligraphyKey] = useState(1);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  // Apply vibrant CSS custom variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const colors = data.theme?.colors || defaultWeddingData.theme.colors;

    root.style.setProperty('--color-powder-pink', colors.powderPink || '#F7D6D0');
    root.style.setProperty('--color-powder-pink-light', colors.powderPinkLight || '#FDF4F2');
    root.style.setProperty('--color-coral-haze', colors.coralHaze || '#E27D60');
    root.style.setProperty('--color-coral-haze-dark', colors.coralHazeDark || '#C45F42');
    root.style.setProperty('--color-garden-green', colors.gardenGreen || '#2D5A3E');
    root.style.setProperty('--color-garden-green-light', colors.gardenGreenLight || '#4E7A5E');
    root.style.setProperty('--color-garden-green-pale', colors.gardenGreenPale || '#E8EFEA');
    root.style.setProperty('--color-taupe', colors.taupe || '#8B7355');
    root.style.setProperty('--color-taupe-light', colors.taupeLight || '#C7B5A3');
    root.style.setProperty('--color-taupe-pale', colors.taupePale || '#F4EFEB');
    root.style.setProperty('--color-oxblood', colors.oxblood || '#5C131F');
    root.style.setProperty('--color-gold', colors.gold || '#D4AF37');
    root.style.setProperty('--color-text-main', colors.textMain || '#241A18');
    root.style.setProperty('--color-text-muted', colors.textMuted || '#6B554E');
  }, [data.theme]);

  const replayCalligraphy = () => {
    setCalligraphyKey(prev => prev + 1);
  };

  const selectThemePreset = (presetKey) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      setData(prev => ({
        ...prev,
        theme: preset
      }));
    }
  };

  const updateCustomColors = (colorKey, colorValue) => {
    setData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          [colorKey]: colorValue
        }
      }
    }));
  };

  const updateHero = (newHero) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...newHero }
    }));
  };

  const updatePreWeddingEvents = (newEvents) => {
    setData(prev => ({
      ...prev,
      preWeddingEvents: newEvents
    }));
  };

  const addPreWeddingEvent = (event) => {
    setData(prev => ({
      ...prev,
      preWeddingEvents: [...prev.preWeddingEvents, { ...event, id: 'event_' + Date.now() }]
    }));
  };

  const deletePreWeddingEvent = (id) => {
    setData(prev => ({
      ...prev,
      preWeddingEvents: prev.preWeddingEvents.filter(e => e.id !== id)
    }));
  };

  const updateVenue = (venueData) => {
    setData(prev => ({
      ...prev,
      venue: { ...prev.venue, ...venueData }
    }));
  };

  const updateFamilyAlbum = (familyAlbumData) => {
    setData(prev => ({
      ...prev,
      familyAlbum: {
        ...prev.familyAlbum,
        ...familyAlbumData
      }
    }));
  };

  const addFamilyPhoto = (photo) => {
    setData(prev => ({
      ...prev,
      familyAlbum: {
        ...prev.familyAlbum,
        privatePhotos: [
          ...(prev.familyAlbum?.privatePhotos || []),
          { ...photo, id: 'fam_' + Date.now() }
        ]
      }
    }));
  };

  const deleteFamilyPhoto = (id) => {
    setData(prev => ({
      ...prev,
      familyAlbum: {
        ...prev.familyAlbum,
        privatePhotos: prev.familyAlbum.privatePhotos.filter(p => p.id !== id)
      }
    }));
  };

  const updateVendors = (vendorsData) => {
    setData(prev => ({
      ...prev,
      vendors: { ...prev.vendors, ...vendorsData }
    }));
  };

  const addVendor = (vendor) => {
    setData(prev => ({
      ...prev,
      vendors: {
        ...prev.vendors,
        list: [...prev.vendors.list, { ...vendor, id: 'vendor_' + Date.now() }]
      }
    }));
  };

  const deleteVendor = (id) => {
    setData(prev => ({
      ...prev,
      vendors: {
        ...prev.vendors,
        list: prev.vendors.list.filter(v => v.id !== id)
      }
    }));
  };

  const addGuestWish = (wish) => {
    setData(prev => ({
      ...prev,
      guestWishes: [
        {
          id: 'wish_' + Date.now(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          ...wish
        },
        ...(prev.guestWishes || [])
      ]
    }));
  };

  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wedding_config_${data.hero.groomName}_${data.hero.brideName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfig = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.preWeddingEvents) {
        setData(parsed);
        return { success: true };
      }
      return { success: false, error: "Invalid configuration format." };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const resetToDefault = () => {
    setData(defaultWeddingData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <WeddingContext.Provider value={{
      data,
      isAdminOpen,
      setIsAdminOpen,
      isFamilyModalOpen,
      setIsFamilyModalOpen,
      isFamilyUnlocked,
      setIsFamilyUnlocked,
      calligraphyKey,
      replayCalligraphy,
      selectThemePreset,
      updateCustomColors,
      updateHero,
      updatePreWeddingEvents,
      addPreWeddingEvent,
      deletePreWeddingEvent,
      updateVenue,
      updateFamilyAlbum,
      addFamilyPhoto,
      deleteFamilyPhoto,
      updateVendors,
      addVendor,
      deleteVendor,
      addGuestWish,
      exportConfig,
      importConfig,
      resetToDefault,
    }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
}
