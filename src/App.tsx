import { useState } from 'react';
import { ReservationProvider } from './contexts/ReservationContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyHogarthSection } from './components/WhyHogarthSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import  BookingSection  from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingBookButton } from './components/FloatingBookButton';
import  Dashboard  from './components/Dashboard';
import { ServiceBookingPage } from './components/ServiceBookingPage';

export type ActiveNav =
  | 'home'
  | 'membership'
  | 'reformer-pilates'
  | 'gym-fitness'
  | 'tennis-swim'
  | 'beauty-spa'
  | null;

export default function App() {
  const [currentView, setCurrentView] =
    useState<'landing' | 'dashboard' | 'service-booking'>('landing');

  const [selectedService, setSelectedService] =
    useState<ActiveNav>(null);

  const [activeNav, setActiveNav] = useState<ActiveNav>('home');

  const handleNavigate = (view: 'landing' | 'dashboard') => {
    setCurrentView(view);
    setActiveNav(view === 'landing' ? 'home' : null);
    window.scrollTo(0, 0);
  };

  const handleServiceSelect = (service: ActiveNav) => {
    setSelectedService(service);
    setActiveNav(service);
    setCurrentView('service-booking');
    window.scrollTo(0, 0);
  };

  const handleMembershipClick = () => {
    setActiveNav('membership');
    setCurrentView('landing');

    setTimeout(() => {
      document
        .querySelector('#why-hogarth')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleJoinUsClick = () => {
    setActiveNav(null);
    setCurrentView('landing');

    setTimeout(() => {
      document
        .querySelector('#booking-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <ReservationProvider>
      <Header
        currentView={currentView}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onServiceSelect={handleServiceSelect}
        onMembershipClick={handleMembershipClick}
        onJoinUsClick={handleJoinUsClick}
      />

      {currentView === 'landing' && (
        <>
        <div className="
  pt-[64px]
  sm:pt-[70px]
  md:pt-[90px]
">
  <HeroSection />
          <ServicesSection onServiceSelect={handleServiceSelect} />
          <WhyHogarthSection />
          <TestimonialsSection />
          <div id="booking-section">
            <BookingSection />
          </div>
          <Footer />
          <FloatingBookButton />
</div>
          
        </>
      )}

      {currentView === 'service-booking' && selectedService && (
        <div className="
  pt-[64px]
  sm:pt-[70px]
  md:pt-[90px]
">
  <ServiceBookingPage
          serviceType={selectedService}
          onBack={() => handleNavigate('landing')}
        />
</div>
        
      )}

      {currentView === 'dashboard' && 
      <div className="
  pt-[64px]
  sm:pt-[70px]
  md:pt-[90px]
"><Dashboard /></div> }
    </ReservationProvider>
  );
}
