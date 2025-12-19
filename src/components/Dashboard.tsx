import { useState } from 'react';
import logo from "../components/assets/logo.png";

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
  LayoutDashboard,
  BarChart3,
  Phone,
  LogOut,
} from 'lucide-react';
import { useReservations } from '../contexts/ReservationContext';
import type { Reservation } from '../contexts/ReservationContext';
import { Analytics } from './Analytics.tsx';

export function Dashboard() {


  const extractDate = (d: string) => {
  const x = new Date(d);
  const year = x.getFullYear();
  const month = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
  };
  

  const today = extractDate(new Date().toISOString());
const sevenDaysAgo = extractDate(
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
);

  
  const { reservations, updateReservationStatus } = useReservations();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [serviceFilter, setServiceFilter] = useState("All");
  const [activeSection, setActiveSection] = useState<'dashboard' | 'analytics'>('dashboard');
  const [fromDate, setFromDate] = useState<string | null>(sevenDaysAgo);
  const [toDate, setToDate] = useState<string | null>(today);

  const [appliedFrom, setAppliedFrom] = useState<string | null>(sevenDaysAgo);
  const [appliedTo, setAppliedTo] = useState<string | null>(today);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  
  const handleApplyDateFilter = () => {
  setIsLoading(true);  //bydeafault start loading

  setTimeout(() => {
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setIsLoading(false); //discontinue after time
  }, 3000); 
  };



  const filteredReservations =
    reservations.filter((res) => {
      const statusMatch =
        filterStatus === "all" ? true : res.status === filterStatus;

      const serviceMatch =
        serviceFilter === "All" ? true : res.service === serviceFilter;
      
      
let dateMatch = true;

if (appliedFrom || appliedTo) {
  const entryDate = extractDate(res.createdAt);  // pure: "2025-12-12"

  if (appliedFrom) {
    if (entryDate < appliedFrom) dateMatch = false;  // inclusive
  }

  if (appliedTo) {
    if (entryDate > appliedTo) dateMatch = false;    // inclusive
  }
}
      return statusMatch && serviceMatch && dateMatch;
    });
  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  };

  const uniqueServices = ["All", ...new Set(reservations.map(r => r.service))];

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return '#10B981'; // green
      case 'pending':
        return '#74726f'; // orange
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
    <div className="min-h-screen bg-gold-dust text-white pt-[80px] flex">
      {/* Sidebar */}
      <div className="
    w-24
    fixed left-0 top-[80px] bottom-0
    bg-gold-dust
    border-r border-white/10
    shadow-[8px_0_25px_rgba(0,0,0,0.6)]
    z-40
  ">
        <div >
          <div className="p-4 flex justify-center border-b border-white/30">
          <img src={logo} alt="Hogarth Logo" className="w-24 opacity-90 shadow-[0_10px_50px_rgba(0,0,0,0.6)] border border-yellow-500 rounded-md" />
        </div>
        </div>
        
        <nav className="p-4">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-3 transition-all ${
              activeSection === 'dashboard'
                ? 'bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:bg-[rgba(212,175,55,0.08)] hover:text-white border border-transparent hover:border-[#D4AF37]/30'
            }`}
            style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px', fontSize: '18px' }}
          >
            <LayoutDashboard size={22} />
          
          </button>
          
          <button
            onClick={() => setActiveSection('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'analytics'
                ? 'bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:bg-[rgba(212,175,55,0.08)] hover:text-white border border-transparent hover:border-[#D4AF37]/30'
            }`}
            >
            <BarChart3 size={22} />
            </button>
            {showProfileMenu && (
             <div className="absolute bottom-16 left-4 w-40 bg-[#0b0f1a] border border-white/20 rounded-lg shadow-xl">
               <button
                 className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 transition"
                 onClick={() => {
                   console.log("Logout clicked");
                   // logout logic here
                 }}
               >
                  <LogOut size={16} />
                 Logout
               </button>
             </div>
           )}
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <button
           onClick={() => setShowProfileMenu(!showProfileMenu)}
           className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold shadow-lg"
          >
                A
          </button>
 
</div>
 
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-24 min-w-0 overflow-x-hidden">
        {activeSection === 'dashboard' ? (
          <>
            {/* Header */}
            <div className=" bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 border-b border-white/40 px-8 py-4 flex items-center justify-between">
              <h1 className="text-[48px] m-0 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                ADMIN DASHBOARD
                <p className="text-gray-400 mt-2">Manage bookings and monitor club activity</p>
              </h1>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-6 border border-white/40
 hover:border-[#d3b03c] transition-all w-72 ">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                      <Activity size={28} style={{ color: '#D4AF37' }} />
                    </div>
                    <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                      {stats.total}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[14px] uppercase tracking-wide">Total Bookings</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-6 border border-white/40
 border hover:border-[white] transition-all w-72">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#74726f] rounded-lg">
                      <AlertCircle size={28} style={{ color: 'black' }} />
                    </div>
                    <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                      {stats.pending}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[14px] uppercase tracking-wide">Pending Approval</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-6 border border-white/40
  hover:border-[#10B981] transition-all w-72">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#10B981]/20 rounded-lg">
                      <CheckCircle size={28} style={{ color: '#10B981' }} />
                    </div>
                    <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                      {stats.confirmed}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[14px] uppercase tracking-wide">Confirmed Sessions</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-6 border border-white/40 hover:border-[#EF4444] transition-all w-72">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#EF4444]/20 rounded-lg">
                      <XCircle size={28} style={{ color: '#EF4444' }} />
                    </div>
                    <span className="text-[36px] font-bold" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                      {stats.cancelled}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[14px] uppercase tracking-wide">Cancelled Sessions</p>
                </div>
              </div>
              


              {/* Filters */}
              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-6 border border-white/40 border mb-6 max-w-7xl">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-gray-400 uppercase text-[14px] tracking-wide">booking status:</span>
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      filterStatus === 'all'
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-[rgba(212,175,55,0.08)] backdrop-blur-sm border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37] transition'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      filterStatus === 'pending'
                        ? 'bg-[rgb(116,114,111)] text-black'
                        : 'bg-[rgba(212,175,55,0.08)] backdrop-blur-sm border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37] transition'
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
                        : 'bg-[rgba(212,175,55,0.08)] backdrop-blur-sm border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37] transition'
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
                        : 'bg-[rgba(212,175,55,0.08)] backdrop-blur-sm border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37] transition'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '1px' }}
                  >
                    Cancelled ({stats.cancelled})
                  </button>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02]
 shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl border border-white/40 border overflow-hidden max-w-7xl overflow-x-auto">
                <div className="p-4 pl-8 border-b   border-white/40 border flex items-center justify-between">
                  <h2 className="text-[32px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '2px' }}>
                    BOOKINGS
                  </h2>
                  <div className="flex items-center mr-10">
                    <th className="px-3 py-2">
                  <div className="flex flex-col ">
                    <label className="text-md text-gray-400 mr-28">From :</label>
                    <input
                    type="date"
                    value={fromDate || ""}
                      className="bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30 
                                 text-gray-200 text-sm px-1 py-1 rounded-md"
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                </th>

                 <th className="px-3 py-2">
                   <div className="flex flex-col">
                     <label className="text-md text-gray-400 mr-28">To :</label>
                     <input
                       type="date"
                       value={toDate || ""}
                       className="bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30 
                                  text-gray-200 text-sm px-1 py-1 rounded-md"
                       onChange={(e) => setToDate(e.target.value)}
                     />
                   </div>
                    </th>
                    <button
                    onClick={() => handleApplyDateFilter()}
                    className="px-4 py-1 ml-4 mt-4 bg-[#D4AF37] text-black rounded-lg font-semibold hover:bg-[#c9a32f]"
                  >
                    Apply
                  </button>

                  </div>
                  

                </div>

                <div className="overflow-x-auto">
                  <table className="w-full ">
                    <thead className="bg-[rgba(212,175,55,0.08)] backdrop-blur-sm border border-[#D4AF37]/20
border-b border-[#D4AF37]/50
text-[#D4AF37]
">
                      <tr>
                        <th className="px-8 pt-0 text-left uppercase text-[14px] tracking-wider">
                          Customer
                        </th>
                        <th className="px-8 pt-4 text-left uppercase text-[14px] tracking-wider">
                          Service

                          {/* DROPDOWN FILTER */}
                          <div className="relative mt-2 mb-2">
                            <select
                              value={serviceFilter}
                              onChange={(e) => setServiceFilter(e.target.value)}
                              className="bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30
                                             text-gray-200 text-sm px-2 py-1 rounded-md 
                                             focus:outline-none focus:border-[#D4AF37]
                                             hover:border-[#D4AF37] transition w-[160px]"
                            >
                              {uniqueServices.map((service) => (
                                <option key={service} value={service} className="text-black">
                                  {service}
                                </option>
                              ))}
                            </select>
                          </div>
                        </th>

                        <th className="px-6  text-left uppercase text-[14px] tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-8  text-left uppercase text-[14px] tracking-wider">
                          Status
                        </th>
                        <th className="px-6  text-left uppercase text-[14px] tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- LOADER --- */}
                     {isLoading ? (
                       <tr>
                         <td colSpan={5} className="py-10 text-center">
                           <div className="flex justify-center">
                             <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                           </div>
                           <p className="text-gray-400 mt-3 tracking-wide">Loading...</p>
                         </td>
                       </tr>
                     ) : filteredReservations.length === 0 ? (
                       <tr>
                         <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                           No reservations found
                         </td>
                       </tr>
                      ) : (
                        filteredReservations.map((reservation) => (
                          <tr
                            key={reservation.id}
                            className="border border-white/40 hover:bg-[#0F172A] transition-colors"
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
                                  <div className="text-gray-400 text-[14px] flex items-center gap-1 mt-1">
                                   <Phone size={12} />
                                   {reservation.phone}
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
                            <td className="px-6 py-4 align-top">
                              <div className="flex flex-col gap-3">

                                {/* If PENDING → Show Confirm + Cancel */}
                                {reservation.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                      className="flex items-center justify-center gap-2 px-4 py-2 
                                                     bg-[#10B981]/20 hover:bg-[#10B981]/40 
                                                     text-[#10B981] font-semibold rounded-lg transition-all"
                                    >
                                      <CheckCircle size={18} /> Confirm
                                    </button>

                                    <button
                                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                      className="flex items-center justify-center gap-2 px-4 py-2 
                                                     bg-[#EF4444]/20 hover:bg-[#EF4444]/40 
                                                     text-[#EF4444] font-semibold rounded-lg transition-all"
                                    >
                                      <XCircle size={18} /> Cancel
                                    </button>
                                  </>
                                )}
                                {/* After CONFIRMED → show Done ✓ */}
                                {reservation.status === "confirmed" && (
                                  <span className="flex items-center gap-2 text-[#10B981] font-semibold mt-5">
                                    <CheckCircle size={18} /> Done
                                  </span>
                                )}

                                {/* After CANCELLED → show Cancelled ✕ */}
                                {reservation.status === "cancelled" && (
                                  <span className="flex items-center gap-2 text-[#EF4444] font-semibold mt-5">
                                    <XCircle size={18} /> Cancelled
                                  </span>
                                )}
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
          </>
        ) : (
          <div className="px-8 py-8">
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-b border-white/40 px-8 py-6 rounded-xl mb-6">
              <h1 className="text-[48px] m-0 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                ANALYTICS DASHBOARD
              </h1>
              <p className="text-gray-400 mt-2">Performance insights and booking trends</p>
            </div>
            <Analytics />
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </div>
  );
}