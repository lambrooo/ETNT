import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaTachometerAlt, FaBox, FaAddressBook, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const navigationItems = [
  { path: '/home', name: 'Home', icon: <FaHome /> },
  { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
  { path: '/create-package', name: 'Crea Pacchetto', icon: <FaBox /> },
  { path: '/contacts', name: 'Contatti', icon: <FaAddressBook /> },
  { path: '/settings', name: 'Impostazioni', icon: <FaCog /> },
];

const Navigation = ({ onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Controlla se siamo su mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Chiudi il menu se clicchiamo fuori su mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  // Chiudi il menu mobile quando cambiamo pagina
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile navigation toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button 
          className="menu-button p-2 rounded-full bg-white/10 backdrop-blur-md text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Eredità Digitale</h2>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
            >
              <span className="text-lg mr-3"><FaSignOutAlt /></span>
              <span>Disconnetti</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mobile-menu fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-primary-700 to-secondary-800 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Eredità Digitale</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 mt-auto border-t border-white/10">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onLogout}
                className="flex items-center w-full px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
              >
                <span className="text-lg mr-3"><FaSignOutAlt /></span>
                <span>Disconnetti</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;