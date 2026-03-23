import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [loading, setLoading] = useState(true);
  
  // States
  const [appointments, setAppointments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Form states
  const [appForm, setAppForm] = useState({ date: '', time: '', slots: 1, isAvailable: true });
  const [annForm, setAnnForm] = useState({ title: '', description: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, annRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/announcements')
      ]);
      setAppointments(appRes.data);
      setAnnouncements(annRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for Appointments
  const handleAppSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', appForm);
      toast.success('Appointment created');
      setAppForm({ date: '', time: '', slots: 1, isAvailable: true });
      fetchData();
    } catch (error) {
      toast.error('Failed to create appointment');
    }
  };

  const deleteApp = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const toggleAppAvailability = async (app) => {
    try {
      await api.put(`/appointments/${app._id}`, { ...app, isAvailable: !app.isAvailable });
      toast.success('Availability toggled');
      fetchData();
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  // Handlers for Announcements
  const handleAnnSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/announcements', annForm);
      toast.success('Announcement created');
      setAnnForm({ title: '', description: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create announcement');
    }
  };

  const deleteAnn = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await api.delete(`/announcements/${id}`);
      toast.success('Announcement deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete announcement');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`${activeTab === 'appointments' ? 'border-royal-gold text-royal-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-bold text-lg transition-colors`}
          >
            Manage Appointments
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`${activeTab === 'announcements' ? 'border-royal-gold text-royal-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-bold text-lg transition-colors`}
          >
            Manage Announcements
          </button>
        </nav>
      </div>

      {activeTab === 'appointments' && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-bold mb-4 text-royal-blue">Add Appointment</h3>
            <form onSubmit={handleAppSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" required value={appForm.date} onChange={e => setAppForm({...appForm, date: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-gold focus:border-royal-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input type="time" required value={appForm.time} onChange={e => setAppForm({...appForm, time: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-gold focus:border-royal-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slots</label>
                <input type="number" min="1" required value={appForm.slots} onChange={e => setAppForm({...appForm, slots: parseInt(e.target.value)})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-gold focus:border-royal-gold" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={appForm.isAvailable} onChange={e => setAppForm({...appForm, isAvailable: e.target.checked})} className="h-4 w-4 text-royal-gold focus:ring-royal-gold border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Is Available</label>
              </div>
              <button type="submit" className="w-full bg-royal-blue text-white py-2 rounded-md font-bold hover:bg-opacity-90">Create Appointment</button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-royal-blue">Existing Appointments</h3>
            <div className="bg-white rounded-xl shadow overflow-hidden border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map(app => (
                    <tr key={app._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{new Date(app.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{app.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.slots}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {app.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => toggleAppAvailability(app)} className="text-indigo-600 hover:text-indigo-900 mr-4">Toggle</button>
                        <button onClick={() => deleteApp(app._id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No appointments found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-bold mb-4 text-royal-blue">Add Announcement</h3>
            <form onSubmit={handleAnnSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" required value={annForm.title} onChange={e => setAnnForm({...annForm, title: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-gold focus:border-royal-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea required rows={4} value={annForm.description} onChange={e => setAnnForm({...annForm, description: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-gold focus:border-royal-gold" />
              </div>
              <button type="submit" className="w-full bg-royal-blue text-white py-2 rounded-md font-bold hover:bg-opacity-90">Create Announcement</button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-royal-blue">Existing Announcements</h3>
            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann._id} className="bg-white p-4 rounded-xl shadow border flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-royal-blue">{ann.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">{new Date(ann.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-700">{ann.description}</p>
                  </div>
                  <button onClick={() => deleteAnn(ann._id)} className="text-red-600 hover:text-red-800 bg-red-50 px-3 py-1 rounded transition-colors">Delete</button>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="bg-white p-6 text-center rounded-xl border border-dashed"><p className="text-gray-500">No announcements found.</p></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
