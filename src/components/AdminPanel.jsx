import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { THEME_PRESETS } from '../data/defaultWeddingData';
import {
  Palette,
  Type,
  Calendar,
  MapPin,
  Lock,
  Users,
  Save,
  Download,
  Upload,
  RotateCcw,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function AdminPanel() {
  const {
    data,
    isAdminOpen,
    setIsAdminOpen,
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
  } = useWedding();

  const [activeTab, setActiveTab] = useState('themes');
  const [saveToast, setSaveToast] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  if (!isAdminOpen) return null;

  const triggerToast = (msg = 'Changes saved in real-time!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const familyAlbum = data.familyAlbum || data.gallery?.familyAlbum || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-neutral-900">
                  Wedding Studio Customizer
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Live Preview
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Customize colors, ombre effects, calligraphy names, venues, and private passcode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {saveToast}
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar Tabs */}
        <div className="flex flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-64 border-r border-neutral-100 bg-neutral-50/60 p-4 space-y-1.5 overflow-y-auto">
            {[
              { id: 'themes', label: 'Theme & Palettes', icon: Palette, desc: 'Coral, Green, Taupe, Ombre' },
              { id: 'hero', label: 'Names & Calligraphy', icon: Type, desc: 'Bride & Groom names' },
              { id: 'events', label: 'Pre-Wedding Events', icon: Calendar, desc: 'Haldi, Mehndi, Sangeet' },
              { id: 'venue', label: 'Venues & Reception', icon: MapPin, desc: 'Locations & Timings' },
              { id: 'family', label: 'Family Passcode', icon: Lock, desc: 'Secret PIN & Family photos' },
              { id: 'vendors', label: 'Wedding Artisans', icon: Users, desc: 'Planners, caterers, florists' },
              { id: 'settings', label: 'Backup & Reset', icon: Save, desc: 'Export / Import JSON' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white shadow-md'
                      : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                  <div>
                    <span className="block text-sm font-semibold leading-tight">{tab.label}</span>
                    <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-white/80' : 'text-neutral-400'}`}>
                      {tab.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white">
            
            {/* 1. THEMES & COLOR PALETTES */}
            {activeTab === 'themes' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    Vibrant Wedding Palette & Ombre Themes
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Switch curated cultural presets featuring Powder Pink, Coral Haze, Garden Green, and Taupe.
                  </p>
                </div>

                {/* Preset Themes */}
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
                            <h4 className="font-semibold text-sm text-neutral-900">{preset.name}</h4>
                            {isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-palette-oxblood text-white">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 mb-3">{preset.description}</p>
                          
                          {/* Color Swatches */}
                          <div className="flex items-center gap-1.5">
                            {Object.entries(preset.colors).slice(0, 6).map(([k, hex]) => (
                              <div
                                key={k}
                                className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                                style={{ backgroundColor: hex }}
                                title={`${k}: ${hex}`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Color Pickers */}
                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Fine-Tune Active Colors</h4>
                    <p className="text-xs text-neutral-500">Live preview directly updates the website background, cards, and ombre borders.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: 'powderPink', label: 'Powder Pink', current: data.theme?.colors?.powderPink },
                      { key: 'coralHaze', label: 'Coral Haze', current: data.theme?.colors?.coralHaze },
                      { key: 'gardenGreen', label: 'Garden Green', current: data.theme?.colors?.gardenGreen },
                      { key: 'taupe', label: 'Taupe (Rich Warm)', current: data.theme?.colors?.taupe },
                      { key: 'oxblood', label: 'Oxblood Royal', current: data.theme?.colors?.oxblood },
                      { key: 'gold', label: 'Champagne Gold', current: data.theme?.colors?.gold },
                    ].map((col) => (
                      <div key={col.key} className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200">
                        <div>
                          <span className="text-xs font-semibold text-neutral-800 block">{col.label}</span>
                          <span className="text-[11px] font-mono text-neutral-400">{col.current}</span>
                        </div>
                        <input
                          type="color"
                          value={col.current || '#E27D60'}
                          onChange={(e) => {
                            updateCustomColors(col.key, e.target.value);
                            triggerToast();
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300 p-0.5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. NAMES & CALLIGRAPHY */}
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    Couple Names & Calligraphy Art
                  </h3>
                  <p className="text-sm text-neutral-500">
                    The hero section displays only the names in cursive calligraphy art.
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-palette-coral-haze/30 focus:outline-none text-neutral-900 font-serif text-lg font-bold"
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-palette-coral-haze/30 focus:outline-none text-neutral-900 font-serif text-lg font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Monogram (Logo Initial)
                    </label>
                    <input
                      type="text"
                      value={data.hero.monogram}
                      onChange={(e) => {
                        updateHero({ monogram: e.target.value });
                        triggerToast();
                      }}
                      placeholder="e.g. A & M"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-palette-coral-haze/30 focus:outline-none text-neutral-900 text-sm font-semibold"
                    />
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
                </div>

                {/* Calligraphy Preview and Replay */}
                <div className="p-6 rounded-2xl border border-neutral-200 bg-palette-powder-pink/20 text-center space-y-3">
                  <p className="text-xs uppercase tracking-widest text-palette-oxblood font-bold">
                    Live Calligraphy Handwriting Test
                  </p>
                  <div className="font-calligraphy text-5xl sm:text-6xl text-palette-oxblood py-2">
                    {data.hero.groomName} & {data.hero.brideName}
                  </div>
                  <button
                    onClick={() => {
                      replayCalligraphy();
                      triggerToast('Replaying calligraphy animation on hero!');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white text-xs font-serif uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Test Handwriting Animation</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. PRE-WEDDING EVENTS */}
            {activeTab === 'events' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      Pre-Wedding Functions & Rituals
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Haldi, Mehndi, Sangeet, or any custom cultural celebrations.
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
                        description: "An intimate sundowner to welcome out-of-town guests with artisanal hors d'oeuvres and acoustic melodies.",
                        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
                        badge: "Welcome Soirée"
                      });
                      triggerToast('Added new event card!');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-palette-coral-haze text-white text-xs font-bold hover:bg-palette-coral-haze-dark transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Event</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.preWeddingEvents.map((event, index) => (
                    <div
                      key={event.id || index}
                      className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                        <span className="font-serif font-bold text-neutral-800 text-lg">
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
                          <label className="font-semibold text-neutral-700 block mb-1">Venue Setting</label>
                          <input
                            type="text"
                            value={event.venueName}
                            onChange={(e) => {
                              const updated = [...data.preWeddingEvents];
                              updated[index].venueName = e.target.value;
                              updatePreWeddingEvents(updated);
                            }}
                            className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-neutral-700 block mb-1">Event Theme</label>
                          <input
                            type="text"
                            value={event.theme}
                            onChange={(e) => {
                              const updated = [...data.preWeddingEvents];
                              updated[index].theme = e.target.value;
                              updatePreWeddingEvents(updated);
                            }}
                            className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white font-medium"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="font-semibold text-neutral-700 block mb-1">Dress Code Text</label>
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
                          <div>
                            <label className="font-semibold text-neutral-700 block mb-1">Swatch</label>
                            <input
                              type="color"
                              value={event.dressCodeColorHex || '#E27D60'}
                              onChange={(e) => {
                                const updated = [...data.preWeddingEvents];
                                updated[index].dressCodeColorHex = e.target.value;
                                updatePreWeddingEvents(updated);
                              }}
                              className="w-9 h-9 rounded-lg border border-neutral-300 p-0.5 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label className="font-semibold text-neutral-700 block mb-1">Floral Decor Image URL (No couples)</label>
                          <input
                            type="text"
                            value={event.image}
                            onChange={(e) => {
                              const updated = [...data.preWeddingEvents];
                              updated[index].image = e.target.value;
                              updatePreWeddingEvents(updated);
                            }}
                            className="w-full p-2.5 rounded-lg border border-neutral-200 bg-white font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. VENUES & RECEPTION */}
            {activeTab === 'venue' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    Ceremony & Reception Locations
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Manage venues, addresses, timings, and transportation details.
                  </p>
                </div>

                {/* Ceremony Venue */}
                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-4">
                  <h4 className="font-serif font-bold text-lg text-palette-oxblood">
                    1. The Wedding Ceremony
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Venue Name</label>
                      <input
                        type="text"
                        value={data.venue.ceremony.venueName}
                        onChange={(e) => {
                          updateVenue({
                            ceremony: { ...data.venue.ceremony, venueName: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Timing</label>
                      <input
                        type="text"
                        value={data.venue.ceremony.timing}
                        onChange={(e) => {
                          updateVenue({
                            ceremony: { ...data.venue.ceremony, timing: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-neutral-700 block mb-1">Address & City</label>
                      <input
                        type="text"
                        value={data.venue.ceremony.locationAddress}
                        onChange={(e) => {
                          updateVenue({
                            ceremony: { ...data.venue.ceremony, locationAddress: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-neutral-700 block mb-1">Floral Mandap Image URL</label>
                      <input
                        type="text"
                        value={data.venue.ceremony.image}
                        onChange={(e) => {
                          updateVenue({
                            ceremony: { ...data.venue.ceremony, image: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Reception Gala */}
                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-4">
                  <h4 className="font-serif font-bold text-lg text-palette-oxblood">
                    2. The Grand Gala Reception
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Venue Name</label>
                      <input
                        type="text"
                        value={data.venue.reception.venueName}
                        onChange={(e) => {
                          updateVenue({
                            reception: { ...data.venue.reception, venueName: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Timing</label>
                      <input
                        type="text"
                        value={data.venue.reception.timing}
                        onChange={(e) => {
                          updateVenue({
                            reception: { ...data.venue.reception, timing: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-neutral-700 block mb-1">Address & City</label>
                      <input
                        type="text"
                        value={data.venue.reception.locationAddress}
                        onChange={(e) => {
                          updateVenue({
                            reception: { ...data.venue.reception, locationAddress: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-neutral-700 block mb-1">Chandelier & Banquet Image URL</label>
                      <input
                        type="text"
                        value={data.venue.reception.image}
                        onChange={(e) => {
                          updateVenue({
                            reception: { ...data.venue.reception, image: e.target.value }
                          });
                          triggerToast();
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. FAMILY ALBUM PASSCODE & PHOTOS */}
            {activeTab === 'family' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    Private Family Pictures Passcode Security
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Guests must enter this password to view private family captures and heirloom memories.
                  </p>
                </div>

                {/* Password Protection Card */}
                <div className="p-6 rounded-2xl border-2 border-palette-coral-haze/40 bg-palette-powder-pink/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-palette-coral-haze" />
                    <h4 className="font-serif font-bold text-lg text-palette-oxblood">
                      Secret PIN Settings
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        Family Passcode (Secret PIN)
                      </label>
                      <input
                        type="text"
                        value={familyAlbum.password || 'royal2025'}
                        onChange={(e) => {
                          updateFamilyAlbum({ password: e.target.value });
                          triggerToast('Passcode updated!');
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white font-mono text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        Hint Text (Shown to guests)
                      </label>
                      <input
                        type="text"
                        value={familyAlbum.hint || ''}
                        onChange={(e) => {
                          updateFamilyAlbum({ hint: e.target.value });
                          triggerToast();
                        }}
                        placeholder="e.g. Passcode: royal2025"
                        className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Private Family Photos Manager */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-neutral-800 uppercase tracking-wider">
                      Family Album Photos ({familyAlbum.privatePhotos?.length || 0})
                    </h4>
                    <button
                      onClick={() => {
                        addFamilyPhoto({
                          caption: "Heirloom Family Toast & Heritage Blessings",
                          date: "Private Keepsake",
                          url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
                        });
                        triggerToast('Added photo to private family album');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Family Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1">
                    {(familyAlbum.privatePhotos || []).map((photo) => (
                      <div key={photo.id} className="p-3 rounded-xl border border-neutral-200 bg-white flex items-center gap-3">
                        <img src={photo.url} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-semibold text-neutral-800 truncate">{photo.caption}</p>
                          <span className="text-[10px] text-neutral-400">{photo.date}</span>
                        </div>
                        <button
                          onClick={() => {
                            deleteFamilyPhoto(photo.id);
                            triggerToast('Family photo removed');
                          }}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. VENDORS & DREAM TEAM */}
            {activeTab === 'vendors' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      Event Managers, Caterers & Artisans
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Showcase the creators and companies behind your wedding production.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addVendor({
                        category: "Wedding Cake & Confectionery",
                        companyName: "Sugar & Velvet Atelier",
                        leadName: "Chef Camille",
                        website: "https://example.com",
                        instagram: "@sugarandvelvet",
                        notes: "Handcrafted four-tier sugar-flower wedding cake and bespoke dessert bar."
                      });
                      triggerToast('Added new vendor');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-palette-coral-haze text-white text-xs font-bold hover:bg-palette-coral-haze-dark transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Artisan</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(data.vendors?.list || []).map((vendor, index) => (
                    <div key={vendor.id || index} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={vendor.category}
                          onChange={(e) => {
                            const updated = [...data.vendors.list];
                            updated[index].category = e.target.value;
                            updateVendors({ list: updated });
                          }}
                          className="font-serif font-bold text-palette-oxblood text-xs uppercase tracking-wider bg-transparent border-b border-neutral-300 pb-0.5 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            deleteVendor(vendor.id);
                            triggerToast('Vendor removed');
                          }}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <input
                          type="text"
                          value={vendor.companyName}
                          placeholder="Company Name"
                          onChange={(e) => {
                            const updated = [...data.vendors.list];
                            updated[index].companyName = e.target.value;
                            updateVendors({ list: updated });
                          }}
                          className="w-full p-2 rounded-lg border border-neutral-200 bg-white font-semibold text-neutral-800"
                        />
                        <input
                          type="text"
                          value={vendor.leadName}
                          placeholder="Lead Name / Founder"
                          onChange={(e) => {
                            const updated = [...data.vendors.list];
                            updated[index].leadName = e.target.value;
                            updateVendors({ list: updated });
                          }}
                          className="w-full p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 italic"
                        />
                        <textarea
                          rows={2}
                          value={vendor.notes}
                          placeholder="Contribution / Notes"
                          onChange={(e) => {
                            const updated = [...data.vendors.list];
                            updated[index].notes = e.target.value;
                            updateVendors({ list: updated });
                          }}
                          className="w-full p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. BACKUP, EXPORT & RESET */}
            {activeTab === 'settings' && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    Backup, Export & Reset
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Export your custom wedding configuration to a JSON file, or restore defaults.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Download Configuration (JSON)</h4>
                    <p className="text-xs text-neutral-500">
                      Save a copy of your customized colors, events, and family settings.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      exportConfig();
                      triggerToast('Configuration downloaded!');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-palette-oxblood text-white text-xs font-semibold hover:bg-palette-oxblood-dark transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                  <h4 className="font-bold text-neutral-900 text-sm">Import Configuration</h4>
                  <textarea
                    rows={4}
                    placeholder="Paste JSON configuration here..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-white font-mono text-xs"
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
                        triggerToast('Configuration imported successfully!');
                      } else {
                        setImportError(res.error || 'Failed to import JSON');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Apply Imported Configuration</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl border border-red-200 bg-red-50/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">Reset to Default Template</h4>
                    <p className="text-xs text-red-700">
                      Restores default couple names, events, and vibrant palette settings.
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

        {/* Bottom Drawer Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-sans">
            Antigravity Wedding Portfolio Studio • All edits are preserved locally
          </span>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white font-serif text-xs uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
          >
            Done & View Live Site
          </button>
        </div>

      </div>
    </div>
  );
}
