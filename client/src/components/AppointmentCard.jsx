const AppointmentCard = ({ appointment }) => {
  const date = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });

  return (
    <div className={`p-6 rounded-xl shadow-md border-l-4 transition-transform hover:-translate-y-1 ${appointment.isAvailable ? 'bg-white border-green-500' : 'bg-gray-50 border-gray-400'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-royal-blue">{date}</h3>
          <p className="text-gray-600 font-medium text-lg mt-1">{appointment.time}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${appointment.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
          {appointment.isAvailable ? 'Available' : 'Full'}
        </span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <svg className="w-5 h-5 mr-2 text-royal-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        <span>{appointment.slots} slot{appointment.slots !== 1 ? 's' : ''} remaining</span>
      </div>

      <button 
        disabled={!appointment.isAvailable}
        className={`w-full py-2 rounded-lg font-bold transition-colors ${appointment.isAvailable ? 'bg-royal-gold text-royal-blue hover:bg-yellow-500' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        {appointment.isAvailable ? 'Book Now' : 'Unavailable'}
      </button>
    </div>
  );
};

export default AppointmentCard;
