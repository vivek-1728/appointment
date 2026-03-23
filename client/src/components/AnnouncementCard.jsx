const AnnouncementCard = ({ announcement }) => {
  const date = new Date(announcement.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-royal-gold transition-colors">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-royal-gold bg-yellow-50 px-2 py-1 rounded">Update</span>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
      <h3 className="text-xl font-bold text-royal-blue mb-2">{announcement.title}</h3>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{announcement.description}</p>
    </div>
  );
};

export default AnnouncementCard;
