import { useState } from 'react';
import {
  Calendar,
  Clock,
  Mail,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  LayoutDashboard,
  BarChart3,
  Phone,
  LogOut,
  Activity,
  Award,
  Users,
  TrendingUp,
  Target
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for demonstration
const mockReservations = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    service: 'Reformer Pilates',
    date: '2025-12-22',
    time: '10:00',
    status: 'confirmed',
    createdAt: '2025-12-18T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    service: 'Personal Training',
    date: '2025-12-23',
    time: '14:00',
    status: 'pending',
    createdAt: '2025-12-19T14:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1234567892',
    service: 'HIIT Class',
    date: '2025-12-24',
    time: '16:00',
    status: 'confirmed',
    createdAt: '2025-12-20T16:00:00Z'
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1234567893',
    service: 'Personal Training',
    date: '2025-12-21',
    time: '09:00',
    status: 'pending',
    createdAt: '2025-12-17T09:00:00Z'
  },
  {
    id: '5',
    name: 'Tom Wilson',
    email: 'tom@example.com',
    phone: '+1234567894',
    service: 'HIIT Class',
    date: '2025-12-25',
    time: '18:00',
    status: 'cancelled',
    createdAt: '2025-12-19T18:00:00Z'
  }
];

function Analytics({ reservations }) {
  // Service popularity data
  const serviceData = reservations.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.service);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: curr.service, count: 1 });
    }
    return acc;
  }, []);

  // Status distribution data
  const statusData = [
    { name: 'Confirmed', value: reservations.filter((r) => r.status === 'confirmed').length, color: '#10B981' },
    { name: 'Pending', value: reservations.filter((r) => r.status === 'pending').length, color: '#74726f' },
    { name: 'Cancelled', value: reservations.filter((r) => r.status === 'cancelled').length, color: '#EF4444' },
  ];

  // Peak booking hours
  const hourData = reservations.reduce((acc, curr) => {
    const hour = curr.time.split(':')[0] + ':00';
    const existing = acc.find((item) => item.hour === hour);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ hour, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

  // Conversion metrics
  const conversionRate = reservations.length > 0
    ? ((reservations.filter((r) => r.status === 'confirmed').length / reservations.length) * 100).toFixed(1)
    : 0;

  const cancellationRate = reservations.length > 0
    ? ((reservations.filter((r) => r.status === 'cancelled').length / reservations.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 w-full">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#10B981] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/20 rounded-lg">
              <Target size={20} className="text-[#10B981]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Conversion</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {conversionRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#EF4444] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EF4444]/20 rounded-lg">
              <TrendingUp size={20} className="text-[#EF4444]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Cancellation</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {cancellationRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <Award size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Total Services</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {serviceData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#A8D5BA] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#A8D5BA]/20 rounded-lg">
              <Users size={20} className="text-[#A8D5BA]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Customers</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {new Set(reservations.map((r) => r.email)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <Award size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Top Service</p>
              <p className="text-lg font-bold text-white truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {serviceData.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <Clock size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide">Peak Time</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {hourData.sort((a, b) => b.count - a.count)[0]?.hour || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Distribution */}
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 md:p-6 border border-white/40">
          <h2 className="text-xl md:text-2xl mb-4 text-white uppercase tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}>
            Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Popularity */}
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 md:p-6 border border-white/40">
          <h2 className="text-xl md:text-2xl mb-4 text-white uppercase tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}>
            Popular Services
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '10px' }} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  color: '#fff'
                }}
                labelStyle={{ color: '#D4AF37' }}
              />
              <Bar dataKey="count" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [reservations, setReservations] = useState(mockReservations);
  const [filterStatus, setFilterStatus] = useState('all');
  const [serviceFilter, setServiceFilter] = useState("All");
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const extractDate = (d) => {
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

  const [fromDate, setFromDate] = useState(sevenDaysAgo);
  const [toDate, setToDate] = useState(today);
  const [appliedFrom, setAppliedFrom] = useState(sevenDaysAgo);
  const [appliedTo, setAppliedTo] = useState(today);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyDateFilter = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAppliedFrom(fromDate);
      setAppliedTo(toDate);
      setIsLoading(false);
    }, 1000);
  };

  const updateReservationStatus = (id, status) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
  };

  const filteredReservations = reservations.filter((res) => {
    const statusMatch = filterStatus === "all" ? true : res.status === filterStatus;
    const serviceMatch = serviceFilter === "All" ? true : res.service === serviceFilter;
    
    let dateMatch = true;
    if (appliedFrom || appliedTo) {
      const entryDate = extractDate(res.createdAt);
      if (appliedFrom && entryDate < appliedFrom) dateMatch = false;
      if (appliedTo && entryDate > appliedTo) dateMatch = false;
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#74726f';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white flex overflow-hidden">
      {/* Sidebar - Always Visible */}
<div className="w-12 md:w-16 lg:w-24 fixed left-0 top-0 bottom-0 bg-[#0a0e14] border-r border-white/10 shadow-[8px_0_25px_rgba(0,0,0,0.6)] z-40 flex flex-col">
        {/* Logo */}
        <div className="p-2 md:p-3 lg:p-4 flex justify-center border-b border-white/30">
          <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-[#D4AF37] rounded-md flex items-center justify-center">
  <span className="text-sm md:text-lg lg:text-2xl font-bold text-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>H</span>
</div>
        </div>
        
        {/* Navigation */}
        <nav className="p-2 md:p-3 lg:p-4 flex-1">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center justify-center p-2 md:p-2.5 lg:p-3 rounded-lg mb-2 md:mb-3 transition-all ${
              activeSection === 'dashboard'
                ? 'bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:bg-[rgba(212,175,55,0.08)] hover:text-white border border-transparent hover:border-[#D4AF37]/30'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          
          <button
            onClick={() => setActiveSection('analytics')}
            className={`w-full flex items-center justify-center p-2 md:p-2.5 lg:p-3 rounded-lg transition-all ${
              activeSection === 'analytics'
                ? 'bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:bg-[rgba(212,175,55,0.08)] hover:text-white border border-transparent hover:border-[#D4AF37]/30'
            }`}
            title="Analytics"
          >
            <BarChart3 size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </nav>

        {/* Profile Button */}
        <div className="p-2 md:p-3 lg:p-4 relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 text-xs md:text-sm lg:text-base rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold shadow-lg hover:bg-[#c9a32f] transition mx-auto">
            A
          </button>
          
          {showProfileMenu && (
            <div className="absolute bottom-full left-2 md:left-3 lg:left-4 mb-2 w-36 md:w-40 bg-[#0b0f1a] border border-white/20 rounded-lg shadow-xl">
              <button 
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 md:px-4 py-2 text-red-400 hover:bg-white/5 transition text-sm"
              >
                <LogOut size={14} className="md:w-4 md:h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-12 md:ml-16 lg:ml-24 min-h-screen w-full max-w-full overflow-x-hidden">
        {activeSection === 'dashboard' ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-b border-white/40 px-3 md:px-6 lg:px-8 py-3 md:py-5 lg:py-6">
              <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Manage bookings and monitor club activity</p>
            </div>

          <div className="px-2 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-full">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-3 md:p-5 lg:p-6 border border-white/40 hover:border-[#d3b03c] transition-all">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 lg:p-3 bg-[#D4AF37]/20 rounded-lg">
                      <Activity size={18} className="text-[#D4AF37] md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {stats.total}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-wide">Total Bookings</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-3 md:p-5 lg:p-6 border border-white/40 hover:border-white transition-all">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 lg:p-3 bg-[#74726f]/20 rounded-lg">
                      <AlertCircle size={18} className="text-[#74726f] md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {stats.pending}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-wide">Pending</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-3 md:p-5 lg:p-6 border border-white/40 hover:border-[#10B981] transition-all">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 lg:p-3 bg-[#10B981]/20 rounded-lg">
                      <CheckCircle size={18} className="text-[#10B981] md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {stats.confirmed}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-wide">Confirmed</p>
                </div>

                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-3 md:p-5 lg:p-6 border border-white/40 hover:border-[#EF4444] transition-all">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 lg:p-3 bg-[#EF4444]/20 rounded-lg">
                      <XCircle size={18} className="text-[#EF4444] md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {stats.cancelled}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-wide">Cancelled</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-3 md:p-4 lg:p-6 border border-white/40 mb-4 md:mb-6">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4">
                  <span className="text-gray-400 uppercase text-[10px] md:text-xs lg:text-sm tracking-wide w-full sm:w-auto mb-1 sm:mb-0">Status:</span>
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-2 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[10px] md:text-xs lg:text-sm ${
                      filterStatus === 'all'
                        ? 'bg-[#D4AF37] text-black font-semibold'
                        : 'bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37]'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-2 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[10px] md:text-xs lg:text-sm ${
                      filterStatus === 'pending'
                        ? 'bg-[#74726f] text-white font-semibold'
                        : 'bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37]'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    Pending ({stats.pending})
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`px-2 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[10px] md:text-xs lg:text-sm ${
                      filterStatus === 'confirmed'
                        ? 'bg-[#10B981] text-black font-semibold'
                        : 'bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37]'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    Confirmed ({stats.confirmed})
                  </button>
                  <button
                    onClick={() => setFilterStatus('cancelled')}
                    className={`px-2 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-lg transition-all text-[10px] md:text-xs lg:text-sm ${
                      filterStatus === 'cancelled'
                        ? 'bg-[#EF4444] text-black font-semibold'
                        : 'bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/20 text-gray-400 hover:text-white hover:border-[#D4AF37]'
                    }`}
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    Cancelled ({stats.cancelled})
                  </button>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl border border-white/40 overflow-hidden w-full">
                <div className="p-3 md:p-4 lg:p-6 border-b border-white/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}>
                    Bookings
                  </h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 md:gap-3 w-full lg:w-auto">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="text-[10px] md:text-xs text-gray-400 mb-1">From:</label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30 text-gray-200 text-xs md:text-sm px-2 py-1 rounded-md w-full"
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="text-[10px] md:text-xs text-gray-400 mb-1">To:</label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30 text-gray-200 text-xs md:text-sm px-2 py-1 rounded-md w-full"
                      />
                    </div>
                    <button
                      onClick={handleApplyDateFilter}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-[#D4AF37] text-black rounded-lg font-semibold hover:bg-[#c9a32f] transition w-full sm:w-auto sm:mt-4 text-xs md:text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0">
                  <table className="w-full">
                    <thead className="bg-[rgba(212,175,55,0.08)] border-b border-[#D4AF37]/50 text-[#D4AF37]">
                      <tr>
                        <th className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left uppercase text-[10px] md:text-xs lg:text-sm tracking-wider">
                          Customer
                        </th>
                        <th className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left uppercase text-[10px] md:text-xs lg:text-sm tracking-wider">
                          <div>Service</div>
                          <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="mt-1 md:mt-2 bg-[rgba(212,175,55,0.08)] border border-[#D4AF37]/30 text-gray-200 text-[10px] md:text-xs lg:text-sm px-1 md:px-2 py-1 rounded-md focus:outline-none focus:border-[#D4AF37] w-full max-w-[120px] md:max-w-[160px]"
                          >
                            {uniqueServices.map((service) => (
                              <option key={service} value={service} className="text-black">
                                {service}
                              </option>
                            ))}
                          </select>
                        </th>
                        <th className="hidden sm:table-cell px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left uppercase text-[10px] md:text-xs lg:text-sm tracking-wider">
  Date & Time
</th>
                        <th className="hidden sm:table-cell px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left uppercase text-[10px] md:text-xs lg:text-sm tracking-wider">
  Status
</th>
                        <th className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left uppercase text-[10px] md:text-xs lg:text-sm tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={5} className="sm:table-cell py-10 text-center">
                            <div className="flex justify-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-400 mt-3 text-xs md:text-sm">Loading...</p>
                          </td>
                        </tr>
                      ) : filteredReservations.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-xs md:text-sm">
                            No reservations found
                          </td>
                        </tr>
                      ) : (
                        filteredReservations.map((reservation) => (
                          <tr
                            key={reservation.id}
                            className="border-b border-white/20 hover:bg-[#0F172A] transition-colors"
                          >
                            
<td className="px-1 md:px-4 lg:px-6 py-3 md:py-4 max-w-[120px] md:max-w-none">
  <div className="flex items-center gap-1 md:gap-3">
    <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
      <User size={12} className="text-[#D4AF37] md:w-5 md:h-5" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-medium text-[10px] md:text-sm lg:text-base truncate">{reservation.name}</div>
      <div className="text-gray-400 text-[9px] md:text-xs flex items-center gap-1 truncate">
        <Mail size={7} className="md:w-2.5 md:h-2.5 flex-shrink-0" />
        <span className="truncate">{reservation.email}</span>
      </div>
      <div className="text-gray-400 text-[9px] md:text-xs flex items-center gap-1 mt-0.5">
        <Phone size={7} className="md:w-2.5 md:h-2.5 flex-shrink-0" />
        <span className="truncate">{reservation.phone}</span>
      </div>
    </div>
  </div>
</td>
                           <td className="px-1 md:px-4 lg:px-6 py-3 md:py-4">
  <span className="px-1 md:px-2 lg:px-3 py-0.5 md:py-1 bg-[#2E7D32]/20 text-[#A8D5BA] rounded-full text-[9px] md:text-xs whitespace-nowrap block max-w-[80px] md:max-w-none truncate">
    {reservation.service}
  </span>
</td>
                            
<td className="hidden sm:table-cell px-2 md:px-4 lg:px-6 py-3 md:py-4">
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs lg:text-sm">
      <Calendar size={10} className="text-[#D4AF37] flex-shrink-0 md:w-3 md:h-3" />
      <span className="whitespace-nowrap">{formatDate(reservation.date)}</span>
    </div>
    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs lg:text-sm text-gray-400">
      <Clock size={10} className="flex-shrink-0 md:w-3 md:h-3" />
      {reservation.time}
    </div>
  </div>
</td>


<td className="hidden sm:table-cell px-2 md:px-4 lg:px-6 py-3 md:py-4">
  <span
    className="px-1.5 md:px-2 lg:px-3 py-1 rounded-full text-[10px] md:text-xs flex items-center gap-1 md:gap-2 w-fit"
    style={{
      backgroundColor: `${getStatusColor(reservation.status)}20`,
      color: getStatusColor(reservation.status),
    }}
  >
    {getStatusIcon(reservation.status)}
    <span className="whitespace-nowrap">
      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
    </span>
  </span>
</td>
                            <td className="px-2 md:px-4 lg:px-6 py-3 md:py-4">
                              <div className="flex flex-col gap-1.5 md:gap-2">
                                {reservation.status === "pending" && (
                                  <>
                                    
                                 
<button
  onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
  className="flex items-center justify-center gap-1 px-1.5 md:px-3 py-1 md:py-2 bg-[#10B981]/20 hover:bg-[#10B981]/40 text-[#10B981] font-semibold rounded-lg transition-all text-[9px] md:text-xs whitespace-nowrap"
>
  <CheckCircle size={10} className="md:w-3.5 md:h-3.5" /> 
  <span className="hidden xs:inline">Confirm</span>
  <span className="xs:hidden">Confirm</span>
</button>
                                  </>
                                )}
                                {reservation.status === "confirmed" && (
                                  <span className="flex items-center gap-1 md:gap-2 text-[#10B981] font-semibold text-[10px] md:text-xs">
                                    <CheckCircle size={12} className="md:w-3.5 md:h-3.5" /> Done
                                  </span>
                                )}
                                {reservation.status === "cancelled" && (
                                  <span className="flex items-center gap-1 md:gap-2 text-[#EF4444] font-semibold text-[10px] md:text-xs">
                                    <XCircle size={12} className="md:w-3.5 md:h-3.5" /> Cancelled
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
          <div className="px-3 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-b border-white/40 px-3 md:px-6 lg:px-8 py-3 md:py-5 lg:py-6 rounded-xl mb-4 md:mb-6">
              <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Performance insights and booking trends</p>
            </div>
            <Analytics reservations={reservations} />
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(212, 175, 55, 0.3) transparent;
        }
        
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: rgba(212, 175, 55, 0.3);
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background-color: #D4AF37;
        }
      `}</style>
    </div>
  );
}