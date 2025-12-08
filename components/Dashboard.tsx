import { useState } from 'react';
import {
  Calendar,
  Clock,
  Mail,
  User,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
} from 'lucide-react';
import { useReservations, Reservation } from '../contexts/ReservationContext';

export function Dashboard() {
  const { reservations, updateReservationStatus, deleteReservation } = useReservations();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const filteredReservations = filterStatus === 'all'
    ? reservations
    : reservations.filter((res) => res.status === filterStatus);

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return '#10B981'; // green
      case 'pending':
        return '#F59E0B'; // orange
      case 'cancelled':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <div className="bg-[#1E293B] border-b border-gray-700 px-8 py-6">
        <h1 className="text-[48px] m-0 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
          ADMIN DASHBOARD
        </h1>
        <p className="text-gray-400 mt-2">Manage reservations and monitor club activity</p>
      </div>

      <div className="px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 hover:border-[#D4AF37] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                <Activity size={28} style={{ color: '#D4AF37' }} />
              </div>
              <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {stats.total}
              </span>
            </div>
            <p className="text-gray-400 text-[14px] uppercase tracking-wide">Total Reservations</p>
          </div>

          <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 hover:border-[#F59E0B] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#F59E0B]/20 rounded-lg">
                <AlertCircle size={28} style={{ color: '#F59E0B' }} />
              </div>
              <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {stats.pending}
              </span>
            </div>
            <p className="text-gray-400 text-[14px] uppercase tracking-wide">Pending Approval</p>
          </div>

          <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 hover:border-[#10B981] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#10B981]/20 rounded-lg">
                <CheckCircle size={28} style={{ color: '#10B981' }} />
              </div>
              <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {stats.confirmed}
              </span>
            </div>
            <p className="text-gray-400 text-[14px] uppercase tracking-wide">Confirmed</p>
          </div>

          <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 hover:border-[#EF4444] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#EF4444]/20 rounded-lg">
                <XCircle size={28} style={{ color: '#EF4444' }} />
              </div>
              <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {stats.cancelled}
              </span>
            </div>
            <p className="text-gray-400 text-[14px] uppercase tracking-wide">Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-400 uppercase text-[14px] tracking-wide">Filter:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-2 rounded-lg transition-all ${
                filterStatus === 'all'
                  ? 'bg-[#D4AF37] text-black'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-6 py-2 rounded-lg transition-all ${
                filterStatus === 'pending'
                  ? 'bg-[#F59E0B] text-black'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-6 py-2 rounded-lg transition-all ${
                filterStatus === 'confirmed'
                  ? 'bg-[#10B981] text-black'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
            >
              Confirmed ({stats.confirmed})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-6 py-2 rounded-lg transition-all ${
                filterStatus === 'cancelled'
                  ? 'bg-[#EF4444] text-black'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
            >
              Cancelled ({stats.cancelled})
            </button>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-[#1E293B] rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-[32px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '2px' }}>
              RESERVATIONS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0F172A]">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-400 uppercase text-[12px] tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 uppercase text-[12px] tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 uppercase text-[12px] tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 uppercase text-[12px] tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 uppercase text-[12px] tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      No reservations found
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="border-t border-gray-700 hover:bg-[#0F172A] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                            <User size={20} style={{ color: '#D4AF37' }} />
                          </div>
                          <div>
                            <div className="font-medium">{reservation.name}</div>
                            <div className="text-gray-400 text-[14px] flex items-center gap-1">
                              <Mail size={12} />
                              {reservation.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#2E7D32]/20 text-[#A8D5BA] rounded-full text-[14px]">
                          {reservation.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[14px]">
                            <Calendar size={14} style={{ color: '#D4AF37' }} />
                            {formatDate(reservation.date)}
                          </div>
                          <div className="flex items-center gap-2 text-[14px] text-gray-400">
                            <Clock size={14} />
                            {reservation.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-[14px] flex items-center gap-2 w-fit"
                          style={{
                            backgroundColor: `${getStatusColor(reservation.status)}20`,
                            color: getStatusColor(reservation.status),
                          }}
                        >
                          {getStatusIcon(reservation.status)}
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {reservation.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                className="p-2 bg-[#10B981]/20 hover:bg-[#10B981]/40 rounded-lg transition-all"
                                title="Confirm"
                              >
                                <CheckCircle size={18} style={{ color: '#10B981' }} />
                              </button>
                              <button
                                onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                className="p-2 bg-[#EF4444]/20 hover:bg-[#EF4444]/40 rounded-lg transition-all"
                                title="Cancel"
                              >
                                <XCircle size={18} style={{ color: '#EF4444' }} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteReservation(reservation.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} style={{ color: '#EF4444' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </div>
  );
}
