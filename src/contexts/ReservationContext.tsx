import { createContext, useContext, useState, ReactNode } from 'react';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([
    // Mock data for demonstration
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: "1234567890",
      service: 'Reformer Pilates',
      date: '2025-12-10',
      time: '10:00 AM',
      status: 'confirmed',
      createdAt: '2025-12-05T14:30:00Z',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: "1234565690",
      service: 'Personal Training',
      date: '2025-12-08',
      time: '2:00 PM',
      status: 'pending',
      createdAt: '2025-12-06T09:15:00Z',
    },
    {
      id: '3',
      name: 'Emma Williams',
      email: 'emma.w@example.com',
      phone: "1532867890",
      service: 'HIIT Class',
      date: '2025-12-09',
      time: '6:00 PM',
      status: 'confirmed',
      createdAt: '2025-12-06T11:20:00Z',
    },
  ]);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      phone: reservation.phone, 
    };
    setReservations((prev) => [newReservation, ...prev]);
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservationStatus,
       
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationProvider');
  }
  return context;
}
