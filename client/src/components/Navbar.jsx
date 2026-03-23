import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <nav className="bg-royal-blue text-royal-light shadow-md py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold font-serif tracking-wide text-royal-gold">
        Royal<span className="text-royal-light">Appointments</span>
      </Link>
      
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-royal-gold transition-colors font-medium">Home</Link>
        {userInfo ? (
          <>
            <Link to="/admin" className="hover:text-royal-gold transition-colors font-medium">Dashboard</Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login" className="bg-royal-gold hover:bg-yellow-500 text-royal-blue px-4 py-2 rounded-md font-medium transition-colors">
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
