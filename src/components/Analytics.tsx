import { useReservations } from '../contexts/ReservationContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calendar, Users, Target, Clock, Award } from 'lucide-react';

export function Analytics() {
  const { reservations } = useReservations();

  // Service popularity data
  const serviceData = reservations.reduce((acc: any[], curr) => {
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

  // Bookings over time (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        fullDate: date.toISOString().split('T')[0],
      });
    }
    return days;
  };

  const last7Days = getLast7Days();
  const timelineData = last7Days.map((day) => ({
    date: day.date,
    bookings: reservations.filter((r) => r.date === day.fullDate).length,
  }));

  // Peak booking hours
  const hourData = reservations.reduce((acc: any[], curr) => {
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
    <div className="space-y-6 max-w-[1400px] ">
      {/* Key Metrics - Compact 2 rows */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl py-4 px-2 sm:p-4 border border-white/40 hover:border-[#10B981] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/20 rounded-lg">
              <Target size={20} style={{ color: '#10B981' }} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wide">Conversion</p>
              <p className="text-[28px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {conversionRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl py-4 px-2 sm:p-4border border-white/40 hover:border-[#EF4444] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EF4444]/20 rounded-lg">
              <TrendingUp size={20} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <p className="text-gray-400  text-[11px] uppercase tracking-wide">Cancellation</p>
              <p className="text-[28px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {cancellationRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl  py-4 px-2 sm:p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <Award size={20} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wide">Total Services</p>
              <p className="text-[28px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {serviceData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl  py-4 px-2 sm:p-4 border border-white/40 hover:border-[#A8D5BA] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#A8D5BA]/20 rounded-lg">
              <Users size={20} style={{ color: '#A8D5BA' }} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wide">Customers</p>
              <p className="text-[28px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {new Set(reservations.map((r) => r.email)).size}
              </p>
            </div>
          </div>
        </div>

        <div className=" sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl py-4 px-2 sm:p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 mt-3 bg-[#D4AF37]/20 rounded-lg">
              <Award size={20} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wide">Top Service</p>
              <p className="w-18 m-0 mt-1 truncate max-w-[150px]" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {serviceData.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className=" sm:w-96 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl  py-4 px-2 sm:p-4 border border-white/40 hover:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
              <Clock size={20} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] uppercase tracking-wide">Peak Time</p>
              <p className="text-[28px] m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
                {hourData.sort((a, b) => b.count - a.count)[0]?.hour || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid - Compact 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        

        {/* Status Distribution */}
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl  py-4 px-2 sm:p-4 border border-white/40">
          <h2 className="text-[20px] mb-3 m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '2px' }}>
            STATUS DISTRIBUTION
          </h2>
          <ResponsiveContainer width="100%" height={220}>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Popularity */}
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-[0_10px_50px_rgba(0,0,0,0.6)] rounded-xl p-4 border border-white/40">
          <h2 className="text-[20px] mb-3 m-0" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '2px' }}>
            POPULAR SERVICES
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  border: '1px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
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
