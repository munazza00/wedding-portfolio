import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { THEME_PRESETS } from '../data/defaultWeddingData';
import RoyalLogo from './RoyalLogo';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sliders,
  Palette,
  Type,
  Calendar,
  MapPin,
  Users,
  HeartHandshake,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export default function BackofficePage() {
  const {
    data,
    navigate,
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
    exportConfig,
    importConfig,
    resetToDefault,
    replayCalligraphy,
    updateBackofficePassword,
  } = useWedding();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('wedding_backoffice_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  // Login Form State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Backoffice Dashboard State
  const [activeTab, setActiveTab] = useState('themes');
  const [saveToast, setSaveToast] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [passwordToast, setPasswordToast] = useState('');

  const triggerToast = (msg = 'Changes saved in real-time!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = data.backofficePassword || '19112026';

    if (passwordInput.trim() === correctPassword) {
      try {
        sessionStorage.setItem('wedding_backoffice_authenticated', 'true');
      } catch (err) {
        console.error(err);
      }
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect passcode. Access is restricted to authorized coordinators.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('wedding_backoffice_authenticated');
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setPasswordInput('');
    setLoginError('');
  };

  const familyAlbum = data.familyAlbum || data.gallery?.familyAlbum || {};

  // 1. PASSWORD GATE SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-[#FAF3EE] relative overflow-hidden select-none">
        
        {/* Ambient Warm Golden & Oxblood Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-palette-coral-haze/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-palette-garden-green/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Link */}
        <header className="w-full max-w-4xl flex items-center justify-between relative z-10 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-serif tracking-wider uppercase text-palette-oxblood hover:text-palette-coral-haze font-bold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Public Website</span>
          </button>

          <span className="text-[11px] font-mono uppercase tracking-widest text-palette-muted bg-white/70 px-3 py-1 rounded-full border border-palette-taupe-light/50">
            Endpoint: /backoffice
          </span>
        </header>

        {/* Center Gateway Card */}
        <main className="w-full max-w-md relative z-10 my-auto">
          <div
            className={`vibrant-ombre-card p-8 sm:p-10 bg-white/95 backdrop-blur-md text-center transition-all duration-300 ${
              isShaking ? 'animate-shake ring-2 ring-red-400' : ''
            }`}
          >
            {/* Royal Wax Seal Lock Emblem */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8C1D30] via-[#5C131F] to-[#380911] p-1 shadow-[0_10px_25px_rgba(92,19,31,0.45)] border-2 border-[#D4AF37]">
              <div className="w-full h-full rounded-full border border-dashed border-[#F3E5AB]/60 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                <Lock className="w-8 h-8 text-[#F3E5AB]" />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-palette-powder-pink/80 border border-palette-coral-haze/30 text-[10px] uppercase font-serif tracking-widest font-bold text-palette-oxblood">
                <ShieldCheck className="w-3.5 h-3.5 text-palette-coral-haze" />
                <span>Restricted Access</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-palette-oxblood tracking-tight">
                Palace Backoffice
              </h1>
              <p className="text-xs text-palette-muted leading-relaxed max-w-xs mx-auto">
                Authorized administrative suite for wedding scenographers and curators. Enter passcode to proceed.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  placeholder="Enter Passcode (19112026)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  className="w-full px-4 py-3.5 pr-11 rounded-2xl border-2 border-palette-taupe-light/50 bg-neutral-50/60 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-palette-coral-haze font-mono text-center tracking-wider transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-left">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green text-white font-serif text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-coral-glow hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Backoffice</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-palette-muted">
              <span>Default Key:</span>
              <code className="bg-neutral-100 px-2 py-0.5 rounded text-palette-oxblood font-bold font-mono">
                19112026
              </code>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full max-w-4xl text-center relative z-10 py-4 text-xs text-palette-muted font-serif">
          <span>Palace Heritage Management • Secured Wedding Backoffice</span>
        </footer>
      </div>
    );
  }

  // 2. AUTHENTICATED BACKOFFICE DASHBOARD
  return (
    <div className="min-h-screen w-full bg-[#FAF3EE] flex flex-col selection:bg-palette-coral-haze selection:text-white">
      
      {/* Top Backoffice Control Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-palette-coral-haze/20 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-palette-oxblood">
                  Palace Backoffice Studio
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Authenticated
                </span>
              </div>
              <p className="text-[11px] text-palette-muted hidden md:block">
                Live Customization Engine • Changes sync in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {saveToast}
              </span>
            )}

            {/* Back to Public Website */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-palette-coral-haze/40 text-palette-oxblood hover:text-palette-coral-haze hover:border-palette-coral-haze text-xs font-serif uppercase tracking-wider font-bold transition-all shadow-xs"
              title="View Public Wedding Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>

            {/* Lock / Log Out */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-serif uppercase tracking-wider font-semibold transition-all"
              title="Lock Backoffice Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto w-full flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden flex-1 flex flex-col min-h-[750px]">
          
          <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50/70 p-3 sm:p-4 space-y-1.5 overflow-x-auto md:overflow-y-auto flex md:flex-col flex-shrink-0">
              {[
                { id: 'themes', label: 'Theme & Palettes', icon: Palette, desc: 'Coral, Green, Taupe' },
                { id: 'hero', label: 'Names & Calligraphy', icon: Type, desc: 'Bride & Groom names' },
                { id: 'events', label: 'Pre-Wedding Events', icon: Calendar, desc: 'Haldi, Mehndi, Sangeet' },
                { id: 'venue', label: 'Venues & Reception', icon: MapPin, desc: 'Locations & Timings' },
                { id: 'family', label: 'Family Vault Passcode', icon: Lock, desc: 'Protected album' },
                { id: 'vendors', label: 'Wedding Artisans', icon: HeartHandshake, desc: 'Managers & Vendors' },
                { id: 'system', label: 'Backoffice & Backup', icon: Sliders, desc: 'Key, Export & Import' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all flex-shrink-0 md:flex-shrink ${
                      isActive
                        ? 'bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-coral-haze text-white shadow-md'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">{tab.label}</div>
                      <div className={`text-[10px] truncate hidden sm:block ${isActive ? 'text-white/80' : 'text-neutral-400'}`}>
                        {tab.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </aside>

            {/* Tab Content Panel */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white">
              
              {/* 1. THEMES & COLOR PALETTES */}
              {activeTab === 'themes' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">
                      Vibrant Wedding Palette & Ombre Themes
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Curated cultural palettes featuring Powder Pink, Coral Haze, Garden Green, and Warm Taupe.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
                      Cultural Color Presets
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(THEME_PRESETS).map((preset) => {
                        const isCurrent = data.theme?.id === preset.id;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => {
                              selectThemePreset(preset.id);
                              triggerToast(`Switched to ${preset.name}`);
                            }}
                            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                              isCurrent
                                ? 'border-palette-coral-haze bg-palette-powder-pink/20 shadow-md ring-2 ring-palette-coral-haze/30'
                                : 'border-neutral-200 hover:border-neutral-400 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-sm text-neutral-900">{preset.name}</h3>
                              {isCurrent && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-palette-oxblood text-white">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 mb-3">{preset.description}</p>
                            <div className="flex items-center gap-1.5">
                              {Object.values(preset.colors).slice(0, 7).map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Color Pickers */}
                  <div className="border-t border-neutral-100 pt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-3">
                      Fine-Tune Signature Colors
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Powder Pink', key: 'powderPink' },
                        { label: 'Coral Haze', key: 'coralHaze' },
                        { label: 'Garden Green', key: 'gardenGreen' },
                        { label: 'Warm Taupe', key: 'taupe' },
                        { label: 'Royal Oxblood', key: 'oxblood' },
                        { label: 'Metallic Gold', key: 'gold' },
                      ].map((item) => (
                        <div key={item.key} className="p-3 rounded-xl border border-neutral-200 bg-neutral-50/50">
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1.5">{item.label}</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={data.theme?.colors?.[item.key] || '#E27D60'}
                              onChange={(e) => {
                                updateCustomColors(item.key, e.target.value);
                                triggerToast();
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300"
                            />
                            <span className="font-mono text-xs text-neutral-700">
                              {data.theme?.colors?.[item.key]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. NAMES & CALLIGRAPHY */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">
                      Hero Couple Names & Calligraphy
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Configure the couple's names rendered on the royal palace arch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Groom's Name
                      </label>
                      <input
                        type="text"
                        value={data.hero.groomName}
                        onChange={(e) => {
                          updateHero({ groomName: e.target.value });
                          triggerToast();
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-palette-coral-haze/30 focus:outline-none text-neutral-900 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Bride's Name
                      </label>
                      <input
                        type="text"
                        value={data.hero.brideName}
                        onChange={(e) => {
                          updateHero({ brideName: e.target.value });
                          triggerToast();
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-palette-coral-haze/30 focus:outline-none text-neutral-900 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Calligraphy Writing Speed ({data.hero.calligraphySpeed || 1.8}s)
                    </label>
                    <input
                      type="range"
                      min="0.8"
                      max="3.5"
                      step="0.1"
                      value={data.hero.calligraphySpeed || 1.8}
                      onChange={(e) => {
                        updateHero({ calligraphySpeed: parseFloat(e.target.value) });
                        triggerToast();
                      }}
                      className="w-full mt-2 accent-palette-coral-haze"
                    />
                  </div>

                  <div className="p-6 rounded-2xl border border-neutral-200 bg-palette-powder-pink/20 text-center space-y-3">
                    <p className="text-xs uppercase tracking-widest text-palette-oxblood font-bold">
                      Live Calligraphy Preview
                    </p>
                    <div className="font-calligraphy text-4xl sm:text-5xl text-palette-oxblood py-2">
                      {data.hero.groomName} & {data.hero.brideName}
                    </div>
                    <button
                      onClick={() => {
                        replayCalligraphy();
                        triggerToast('Calligraphy animation replayed!');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white text-xs font-serif uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Test Calligraphy Reset</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. PRE-WEDDING EVENTS */}
              {activeTab === 'events' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900 mb-1">
                        Pre-Wedding Festivities Cards
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-500">
                        Manage Haldi, Mehndi, Sangeet, and custom cultural ceremonies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        addPreWeddingEvent({
                          title: "Cocktail Evening & Welcome Toast",
                          subtitle: "Under Starlit Skies",
                          date: "Wednesday, November 26, 2025",
                          time: "6:30 PM Onwards",
                          theme: "Emerald Garden & Coral Velvet",
                          dressCode: "Garden Green & Coral Accents",
                          dressCodeColorHex: "#2D5A3E",
                          arrangedBy: "Joint Celebration",
                          venueName: "The Lakeside Deck",
                          description: "An intimate sundowner to welcome out-of-town guests with artisanal treats.",
                          image: "/images/prewedding-haldi.jpg",
                          badge: "Welcome Soirée"
                        });
                        triggerToast('Added new event card!');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-palette-coral-haze text-white text-xs font-bold hover:bg-palette-coral-haze-dark transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Event</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.preWeddingEvents.map((event, index) => (
                      <div
                        key={event.id || index}
                        className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <span className="font-serif font-bold text-neutral-800 text-base">
                            #{index + 1} {event.title}
                          </span>
                          <button
                            onClick={() => {
                              deletePreWeddingEvent(event.id);
                              triggerToast('Event deleted');
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Event Title</label>
                            <input
                              type="text"
                              value={event.title}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].title = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Subtitle / Calligraphy</label>
                            <input
                              type="text"
                              value={event.subtitle}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].subtitle = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Arranged By</label>
                            <select
                              value={event.arrangedBy}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].arrangedBy = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white font-medium"
                            >
                              <option value="Groom's Family">Groom's Family</option>
                              <option value="Bride's Family">Bride's Family</option>
                              <option value="Joint Celebration">Joint Celebration</option>
                            </select>
                          </div>

                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Date</label>
                            <input
                              type="text"
                              value={event.date}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].date = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Time</label>
                            <input
                              type="text"
                              value={event.time}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].time = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Dress Code</label>
                            <input
                              type="text"
                              value={event.dressCode}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].dressCode = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-neutral-700 block mb-1 text-xs">Description</label>
                          <textarea
                            rows={2}
                            value={event.description}
                            onChange={(e) => {
                              const updated = [...data.preWeddingEvents];
                              updated[index].description = e.target.value;
                              updatePreWeddingEvents(updated);
                            }}
                            className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. VENUES & RECEPTION */}
              {activeTab === 'venue' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">
                      Sacred Venues & Ceremony Destinations
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Configure wedding ceremony mandap and gala reception details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ceremony */}
                    <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                      <h3 className="font-serif font-bold text-neutral-900 text-base">
                        Wedding Ceremony Mandap
                      </h3>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Venue Name</label>
                        <input
                          type="text"
                          value={data.venue.ceremony.venueName}
                          onChange={(e) => {
                            updateVenue({ ceremony: { venueName: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Address</label>
                        <input
                          type="text"
                          value={data.venue.ceremony.locationAddress}
                          onChange={(e) => {
                            updateVenue({ ceremony: { locationAddress: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Date & Timing</label>
                        <input
                          type="text"
                          value={data.venue.ceremony.timing}
                          onChange={(e) => {
                            updateVenue({ ceremony: { timing: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Reception */}
                    <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                      <h3 className="font-serif font-bold text-neutral-900 text-base">
                        Grand Gala Reception
                      </h3>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Venue Name</label>
                        <input
                          type="text"
                          value={data.venue.reception.venueName}
                          onChange={(e) => {
                            updateVenue({ reception: { venueName: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Address</label>
                        <input
                          type="text"
                          value={data.venue.reception.locationAddress}
                          onChange={(e) => {
                            updateVenue({ reception: { locationAddress: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1 text-xs">Date & Timing</label>
                        <input
                          type="text"
                          value={data.venue.reception.timing}
                          onChange={(e) => {
                            updateVenue({ reception: { timing: e.target.value } });
                            triggerToast();
                          }}
                          className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. FAMILY VAULT PASSCODE */}
              {activeTab === 'family' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">
                      Private Family Pictures Vault
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Configure the passcode that protects private heirloom family pictures on the main website.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-palette-coral-haze/30 bg-palette-powder-pink/20 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-palette-oxblood mb-1">
                        Family Vault Passcode
                      </label>
                      <input
                        type="text"
                        value={familyAlbum.password || 'royal2025'}
                        onChange={(e) => {
                          updateFamilyAlbum({ password: e.target.value });
                          triggerToast();
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white font-mono text-sm font-bold text-palette-oxblood"
                      />
                      <p className="text-[11px] text-palette-muted mt-1">
                        Guests must enter this code on the website to view private family pictures.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-palette-oxblood mb-1">
                        Vault Title
                      </label>
                      <input
                        type="text"
                        value={familyAlbum.title || 'The Heirloom Family Vault'}
                        onChange={(e) => {
                          updateFamilyAlbum({ title: e.target.value });
                          triggerToast();
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 6. WEDDING ARTISANS & VENDORS */}
              {activeTab === 'vendors' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900 mb-1">
                        Wedding Artisans & Curators
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-500">
                        Credits for wedding planners, decorators, photographers, and chefs.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        addVendor({
                          category: "Scenography & Florals",
                          companyName: "Royal Floral Scenographers",
                          leadPerson: "Creative Director",
                          notes: "Floral mandap and hanging chandeliers.",
                          instagram: "@royalflorals",
                          website: ""
                        });
                        triggerToast('Added new artisan!');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-palette-coral-haze text-white text-xs font-bold hover:bg-palette-coral-haze-dark transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Artisan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(data.vendors?.list || []).map((vendor, idx) => (
                      <div key={vendor.id || idx} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-neutral-800 text-sm">{vendor.companyName}</span>
                          <button
                            onClick={() => {
                              deleteVendor(vendor.id);
                              triggerToast('Artisan removed');
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-neutral-500">{vendor.category} • {vendor.leadPerson}</p>
                        <p className="text-neutral-600 italic">{vendor.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. SYSTEM & BACKOFFICE PASSCODE SETTINGS */}
              {activeTab === 'system' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 mb-1">
                      Backoffice Security & Configuration Backups
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Manage administrative credentials for the /backoffice endpoint and export JSON snapshots.
                    </p>
                  </div>

                  {/* Backoffice Passcode Manager */}
                  <div className="p-6 rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-br from-white via-palette-powder-pink/15 to-[#FDF7F4] space-y-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-[#AA7C11]" />
                      <h3 className="font-serif font-bold text-base text-palette-oxblood">
                        Backoffice Endpoint Passcode (/backoffice)
                      </h3>
                    </div>
                    <p className="text-xs text-palette-muted leading-relaxed">
                      This passcode guards this administrative page. The requested default is <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#D4AF37]/40 text-palette-oxblood">19112026</code>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Current or New Backoffice Passcode
                        </label>
                        <input
                          type="text"
                          value={newAdminPassword || data.backofficePassword || '19112026'}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="e.g. 19112026"
                          className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white font-mono text-sm font-bold text-palette-oxblood focus:ring-2 focus:ring-palette-coral-haze/30"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const val = (newAdminPassword || data.backofficePassword || '19112026').trim();
                          if (val) {
                            updateBackofficePassword(val);
                            setPasswordToast('Backoffice passcode updated successfully!');
                            triggerToast('Backoffice passcode updated!');
                            setTimeout(() => setPasswordToast(''), 3000);
                          }
                        }}
                        className="self-end sm:self-auto mt-auto px-5 py-2.5 rounded-xl bg-palette-oxblood text-white font-serif text-xs uppercase tracking-wider font-bold hover:bg-palette-oxblood-dark transition-all shadow-sm"
                      >
                        Update Key
                      </button>
                    </div>

                    {passwordToast && (
                      <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{passwordToast}</span>
                      </p>
                    )}
                  </div>

                  {/* JSON Export & Import */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm mb-1">Download Configuration (JSON)</h3>
                        <p className="text-xs text-neutral-500">
                          Export your complete customized wedding site configuration to a portable JSON backup.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          exportConfig();
                          triggerToast('Configuration JSON downloaded!');
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-palette-oxblood text-white text-xs font-semibold hover:bg-palette-oxblood-dark transition-all shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup JSON</span>
                      </button>
                    </div>

                    <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                      <h3 className="font-bold text-neutral-900 text-sm">Import Configuration</h3>
                      <textarea
                        rows={3}
                        placeholder="Paste JSON configuration snapshot here..."
                        value={importJsonText}
                        onChange={(e) => setImportJsonText(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white font-mono text-xs"
                      />
                      {importError && (
                        <p className="text-xs text-red-600 font-medium">{importError}</p>
                      )}
                      <button
                        onClick={() => {
                          const res = importConfig(importJsonText);
                          if (res.success) {
                            setImportJsonText('');
                            setImportError('');
                            triggerToast('Configuration restored successfully!');
                          } else {
                            setImportError(res.error || 'Failed to import JSON');
                          }
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Apply Snapshot</span>
                      </button>
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-6 rounded-2xl border border-red-200 bg-red-50/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-red-900 text-sm">Reset to Default Signature Template</h3>
                      <p className="text-xs text-red-700">
                        Restores default themes, events, and original couple settings.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to reset all wedding customizations to default?")) {
                          resetToDefault();
                          triggerToast('Reset to default template!');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-300 bg-white hover:bg-red-100 text-red-700 text-xs font-semibold transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Bottom Footer */}
          <footer className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
            <span>Palace Backoffice Suite • Endpoint: /backoffice</span>
            <button
              onClick={() => navigate('/')}
              className="text-palette-oxblood hover:underline font-semibold"
            >
              ← Back to Live Public Site
            </button>
          </footer>

        </div>
      </main>

    </div>
  );
}
