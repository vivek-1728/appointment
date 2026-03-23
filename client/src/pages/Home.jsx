import { useState, useEffect } from 'react';
import api from '../services/api';
import AppointmentCard from '../components/AppointmentCard';
import AnnouncementCard from '../components/AnnouncementCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, annRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/announcements')
        ]);
        
        let filteredApps = appRes.data;
        if (filterDate) {
          const filter = new Date(filterDate).toDateString();
          filteredApps = appRes.data.filter(app => new Date(app.date).toDateString() === filter);
        }

        setAppointments(filteredApps);
        setAnnouncements(annRes.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load data.');
        setLoading(false);
      }
    };
    fetchData();
  }, [filterDate]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-royal-blue leading-tight tracking-tight">
          Welcome to <span className="text-royal-gold">Royal Appointments</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Effortlessly view our upcoming schedule and stay updated with our latest professional announcements.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-12">
        <section className="md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-3xl font-bold font-serif text-royal-blue border-b-2 border-royal-gold pb-2 inline-block">Upcoming Appointments</h2>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border focus-within:ring-2 focus-within:ring-royal-gold transition-all">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <input 
                type="date" 
                className="outline-none text-gray-700 bg-transparent cursor-pointer"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              {filterDate && (
                <button onClick={() => setFilterDate('')} className="text-red-500 hover:text-red-700 ml-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {appointments.length > 0 ? (
              appointments.map(app => (
                <AppointmentCard key={app._id} appointment={app} />
              ))
            ) : (
              <div className="col-span-2 bg-white p-8 text-center rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No appointments scheduled {filterDate && 'for this date'}.</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold font-serif text-royal-blue border-b-2 border-royal-gold pb-2 inline-block">Latest Announcements</h2>
          <div className="space-y-6">
            {announcements.length > 0 ? (
              announcements.map(ann => (
                <AnnouncementCard key={ann._id} announcement={ann} />
              ))
            ) : (
              <div className="bg-white p-6 text-center rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No announcements at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
