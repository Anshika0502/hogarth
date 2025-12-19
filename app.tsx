import { useState } from 'react';
import { ReservationProvider } from './contexts/ReservationContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyHogarthSection } from './components/WhyHogarthSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingBookButton } from './components/FloatingBookButton';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const handleNavigate = (view: 'landing' | 'dashboard') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <ReservationProvider>
      <div className="min-h-screen">
        <Header onNavigate={handleNavigate} currentView={currentView} />
        
        {currentView === 'landing' ? (
          <>
            <main>
              <HeroSection />
              <ServicesSection />
              <WhyHogarthSection />
              <TestimonialsSection />
              <div id="booking-section">
                <BookingSection />
              </div>
            </main>
            <Footer />
            <FloatingBookButton />
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </ReservationProvider>
  );
}
