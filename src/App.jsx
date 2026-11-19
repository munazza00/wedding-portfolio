import React from 'react';
import { WeddingProvider } from './context/WeddingContext';
import MotionBackground from './components/MotionBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PreWeddingSection from './components/PreWeddingSection';
import VenueSection from './components/VenueSection';
import FamilyPicturesSection from './components/FamilyPicturesSection';
import FamilyAlbumModal from './components/FamilyAlbumModal';
import VendorsSection from './components/VendorsSection';
import GuestWishbook from './components/GuestWishbook';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  return (
    <WeddingProvider>
      <div className="relative min-h-screen text-[var(--color-text-main)] overflow-x-hidden selection:bg-palette-coral-haze selection:text-white transition-colors duration-700">
        
        {/* 1. Motion-Driven Visuals: Falling Rose Petals, Garden Green Leaves, Golden Stardust & Glowing Orbs */}
        <MotionBackground />

        {/* 2. Fixed Luxury Royal Header Navigation with Royal Crest Logo */}
        <Navbar />

        {/* 3. Hero Section: ONLY Groom & Bride Names in Calligraphy Art with Grand Botanical Arch & Golden Quill Nib */}
        <HeroSection />

        {/* 4. Pre-Wedding Festivities: Vibrant Ombre Cards (Haldi, Mehndi, Sangeet) with 100% Floral Decor */}
        <PreWeddingSection />

        {/* 5. Sacred Venues & Grand Reception Gala */}
        <VenueSection />

        {/* 6. Dedicated Password-Protected Family Pictures Vault */}
        <FamilyPicturesSection />

        {/* 7. Wedding Artisans & Event Management Team */}
        <VendorsSection />

        {/* 8. Love & Blessings Digital Guestbook */}
        <GuestWishbook />

        {/* 9. Royal Footer with Monogram Crest */}
        <Footer />

        {/* Password-Protected Family Album Gateway Modal */}
        <FamilyAlbumModal />

        {/* Customizable Studio Admin Panel */}
        <AdminPanel />
      </div>
    </WeddingProvider>
  );
}
