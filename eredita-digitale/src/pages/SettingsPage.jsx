import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaUserCircle, 
  FaLock, 
  FaBell, 
  FaShieldAlt, 
  FaSave, 
  FaMobileAlt, 
  FaEnvelope, 
  FaCheck,
  FaIdCard,
  FaCreditCard,
  FaExclamationTriangle,
  FaDownload,
  FaTrash,
  FaCloudDownloadAlt,
  FaHistory,
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaBox,
  FaUserFriends,
  FaKey,
  FaSpinner
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';
import { Link, useLocation } from 'react-router-dom';

// Componente per il caricamento iniziale
const LoadingScreen = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0a0e17',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  transition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              >
                <FaSpinner className="text-primary mb-3" size={40} />
              </motion.div>
              <h3 className="text-white fw-light" style={{ letterSpacing: '0.1em' }}>ETNT</h3>
              <p className="text-white-50 small">Caricamento impostazioni...</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Definizione di stili globali CSS per risolvere problemi di UI
const GlobalStyles = () => (
  <style>
    {`
      /* Correzioni per animazioni sincronizzate */
      .transition-group {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      /* Posizionamento coerente per badge */
      .badge-container {
        position: relative;
        display: inline-flex;
        z-index: 10;
      }
      
      .badge-fixed {
        position: absolute;
        white-space: nowrap;
        z-index: 20;
        transform: none !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
      }
      
      .badge-top-left {
        top: -10px;
        left: -10px;
      }
      
      .badge-top-right {
        top: -10px;
        right: -10px;
      }
      
      .badge-bottom-left {
        bottom: -10px;
        left: -10px;
      }
      
      .badge-bottom-right {
        bottom: -10px;
        right: -10px;
      }
      
      /* Miglioramenti per mobile */
      @media (max-width: 767.98px) {
        .card-3d-container {
          transform: scale(0.85);
          margin: 0 auto;
        }
        
        .row-compact {
          margin-left: -5px;
          margin-right: -5px;
        }
        
        .row-compact > [class*='col-'] {
          padding-left: 5px;
          padding-right: 5px;
        }
        
        .device-showcase {
          transform: scale(0.75);
          margin-top: -2rem;
          margin-bottom: -2rem;
        }
        
        /* Centraggio migliore per testi su mobile */
        .text-center-sm {
          text-align: center !important;
        }
        
        .mx-auto-sm {
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
      
      /* Effetto glassmorphism migliorato */
      .glass-premium {
        background: rgba(25, 35, 55, 0.6) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        box-shadow: 
          0 10px 25px rgba(0, 0, 0, 0.8),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
      }
      
      /* Miglioramenti all'animazione hamburger */
      .hamburger-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
      }
      
      .hamburger-icon .line {
        display: block;
        height: 2px;
        width: 100%;
        background-color: white;
        transition: all 0.3s ease-in-out;
      }
      
      .hamburger-icon .line.open:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      .hamburger-icon .line.open:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger-icon .line.open:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
      
      /* Stile menu mobile ottimizzato */
      @media (max-width: 991.98px) {
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 20, 30, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding-top: 80px;
          z-index: 1050;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-menu .navbar-nav {
          margin-bottom: 2rem;
          width: 100%;
          max-width: 300px;
        }
        
        .mobile-menu .nav-item {
          margin-bottom: 0.75rem;
          text-align: center;
        }
        
        .mobile-menu .nav-link {
          font-size: 1.25rem;
          padding: 0.75rem 1.5rem;
        }
      }
      
      /* Stile per il scroll orizzontale - migliorato */
      .scroll-container {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      
      .scroll-x-on-mobile {
        display: flex;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding-bottom: 20px; /* Spazio per scrollbar */
      }
      
      .scroll-x-on-mobile::-webkit-scrollbar {
        height: 4px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 2px;
      }
      
      .scroll-x-on-mobile::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
      
      .scroll-x-on-mobile > * {
        scroll-snap-align: center;
        flex: 0 0 auto;
      }
      
      .scroll-indicator-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 8px 0;
      }
      
      .scroll-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
      }
      
      .scroll-indicator.active {
        width: 20px;
        border-radius: 4px;
        background: rgba(13, 110, 253, 0.8);
      }

      /* Form e controlli migliorati */
      .form-control, .form-select {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 1rem !important;
        color: white !important;
        padding: 0.75rem 1rem !important;
        height: auto !important;
        transition: all 0.3s ease !important;
      }

      .form-control:focus, .form-select:focus {
        background: rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15) !important;
        border-color: rgba(13, 110, 253, 0.5) !important;
      }

      .form-control::placeholder, .form-select::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }

      /* Toggle switch premium */
      .form-switch .form-check-input {
        height: 1.5rem !important;
        width: 3rem !important;
        border: none !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(255, 255, 255, 0.8)'/%3e%3c/svg%3e") !important;
      }

      .form-switch .form-check-input:checked {
        background-color: #0d6efd !important;
        border-color: #0d6efd !important;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e") !important;
      }

      .form-switch .form-check-input:focus {
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
        border-color: transparent !important;
      }

      /* Bottoni premium */
      .btn-primary, .btn-success, .btn-info, .btn-warning {
        border-radius: 2rem !important;
        padding: 0.6rem 1.5rem !important;
        border: none !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
      }

      .btn-primary:hover, .btn-success:hover, .btn-info:hover, .btn-warning:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
      }

      .btn-outline-light {
        border-radius: 2rem !important;
        padding: 0.6rem 1.5rem !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        background: rgba(255, 255, 255, 0.05) !important;
        transition: all 0.3s ease !important;
      }

      .btn-outline-light:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3) !important;
      }

      /* Tab navigation premium */
      .nav-pills .nav-link {
        border-radius: 2rem !important;
        padding: 0.75rem 1.5rem !important;
        transition: all 0.3s ease !important;
        color: white !important;
      }

      .nav-pills .nav-link:not(.active) {
        background: rgba(255, 255, 255, 0.05) !important;
      }

      .nav-pills .nav-link.active {
        background: linear-gradient(90deg, #0d6efd, #1e88e5) !important;
        box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3) !important;
      }

      .nav-pills .nav-link:hover:not(.active) {
        background: rgba(255, 255, 255, 0.1) !important;
        transform: translateY(-3px) !important;
      }
    `}
  </style>
);

// MainLayout migliorato
const MainLayout = ({ children, title, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/home', name: 'Home', icon: <FaHome /> },
    { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/create-package', name: 'Crea Pacchetto', icon: <FaBox /> },
    { path: '/contacts', name: 'Contatti', icon: <FaUserFriends /> },
    { path: '/settings', name: 'Impostazioni', icon: <FaCog /> },
  ];

  // Chiudi il menu quando cambi pagina
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div style={{ 
      backgroundColor: '#0a0e17',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Navbar */}
      <motion.nav 
        className="navbar navbar-expand-lg navbar-dark position-sticky top-0"
        style={{ 
          zIndex: 1000,
          backgroundImage: 'linear-gradient(to bottom, rgba(10, 14, 23, 0.95), rgba(10, 14, 23, 0.9) 60%, rgba(10, 14, 23, 0.85))',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <motion.div 
              className="me-2 d-flex justify-content-center align-items-center"
              whileHover={{ rotate: 10 }}
            >
              <FaKey className="text-primary" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="fw-bold"
              style={{ letterSpacing: '0.05em' }}
            >
              ETNT
            </motion.span>
          </Link>
          
          <button 
            className={`navbar-toggler border-0 shadow-none ${isMenuOpen ? 'collapsed' : ''}`} 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ zIndex: 1100 }}
          >
            <div className="hamburger-icon">
              <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
            </div>
          </button>
          
          <AnimatePresence>
            {(isMenuOpen || window.innerWidth >= 992) && (
              <motion.div 
                className={`navbar-collapse ${isMenuOpen ? 'show mobile-menu' : 'collapse'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="navbar-nav mx-auto">
                  {navItems.map((item) => (
                    <li className="nav-item mx-1" key={item.path}>
                      <Link 
                        className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center ${location.pathname === item.path ? 'active bg-primary bg-opacity-25' : ''}`} 
                        to={item.path}
                      >
                        <motion.span 
                          className="me-2"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {item.icon}
                        </motion.span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline-light" 
                    className="rounded-pill px-4"
                    onClick={onLogout}
                  >
                    Logout
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.nav>
      
      {/* Main content */}
      <div className="position-relative" style={{ zIndex: 3 }}>
        {children}
      </div>
      
      {/* Footer minimale */}
      <footer className="py-4 position-relative" style={{ zIndex: 3 }}>
        <Container>
          <div className="border-top border-white border-opacity-10 pt-4 text-center text-white-50">
            <Row className="mb-3">
              <Col md={4} className="mb-3 mb-md-0">
                <h5 className="text-white mb-3 fs-6">Links Rapidi</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2"><Link to="/dashboard" className="text-white-50 text-decoration-none">Dashboard</Link></li>
                  <li className="mb-2"><Link to="/create-package" className="text-white-50 text-decoration-none">Crea Pacchetto</Link></li>
                  <li><Link to="/contacts" className="text-white-50 text-decoration-none">Gestisci Contatti</Link></li>
                </ul>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <h5 className="text-white mb-3 fs-6">Risorse</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2"><Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link></li>
                  <li className="mb-2"><Link to="/support" className="text-white-50 text-decoration-none">Supporto</Link></li>
                  <li><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5 className="text-white mb-3 fs-6">Contatti</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2">support@etnt.com</li>
                  <li className="mb-2">Telefono: +39 123 456 7890</li>
                  <li className="d-flex justify-content-center gap-2 mt-2">
                    <Link to="#" className="text-white-50"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="#" className="text-white-50"><i className="fab fa-twitter"></i></Link>
                    <Link to="#" className="text-white-50"><i className="fab fa-instagram"></i></Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <p className="mb-0 small">© 2025 ETNT - Eredità Digitale. Tutti i diritti riservati.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

// Componente che anima elementi ogni volta che entrano nel viewport
const RevealOnScroll = ({ children, direction = "bottom", delay = 0, duration = 0.5, ...props }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  
  // Rimuoviamo "once: true" per far sì che l'animazione si ripeta ogni volta che l'elemento entra/esce dal viewport
  const isInView = useInView(ref, { amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "bottom" ? 20 : direction === "top" ? -20 : 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const SettingsPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 80]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simuliamo un caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Stato per le impostazioni dell'utente
  const [userSettings, setUserSettings] = useState({
    profile: {
      name: 'Mario Bianchi',
      email: 'mario.bianchi@example.com',
      phone: '+39 333 1234567',
    },
    security: {
      twoFactorAuth: true,
      passwordReset: '6 mesi fa',
      notifyOnLogin: true,
    },
    notifications: {
      email: true,
      pushNotifications: false,
      smsNotifications: true,
      notifyInactivity: true,
      notifyHeirs: true,
    },
    inheritance: {
      inactivityPeriod: '30',
      verificationMethod: 'automated',
      automaticTransfer: false,
    }
  });
  
  // Stato per il messaggio di successo
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Gestisce i cambiamenti nei campi di input
  const handleChange = (section, field, value) => {
    setUserSettings({
      ...userSettings,
      [section]: {
        ...userSettings[section],
        [field]: typeof value === 'boolean' ? value : value.trim()
      }
    });
  };
  
  // Gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuliamo un salvataggio
    setShowSuccess(true);
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  // Stili condivisi
  const glassStyle = {
    background: 'rgba(25, 35, 55, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  };
  
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };
  
  // Stile per il gradiente del testo
  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #2196f3, #a56eff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };
  
  // Componente per il toggle switch in stile Apple migliorato
  const AppleToggle = ({ checked, onChange, label }) => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <span className="text-white">{label}</span>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
  
  // Componente per il profilo utente
  const ProfileSettings = () => (
    <Card className="glass-premium border-0 mb-4 rounded-4 overflow-hidden">
      <Card.Body className="p-4 p-lg-5">
        <div className="d-flex flex-column flex-md-row align-items-md-center mb-5">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4 mb-md-0 me-md-4" 
            style={{ width: '100px', height: '100px', boxShadow: '0 10px 25px rgba(13, 110, 253, 0.2)' }}
          >
            <FaUserCircle className="text-primary" size={60} />
          </motion.div>
          
          <div>
            <h3 className="h4 fw-semibold mb-1" style={appleStyle}>{userSettings.profile.name}</h3>
            <p className="text-white-50 mb-0">{userSettings.profile.email}</p>
            <motion.div whileHover={{ x: 5 }}>
              <Button variant="link" className="text-primary p-0 mt-1">Cambia foto profilo</Button>
            </motion.div>
          </div>
        </div>
        
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium text-white-50">Nome completo</Form.Label>
          <Form.Control
            type="text"
            value={userSettings.profile.name}
            onChange={(e) => handleChange('profile', 'name', e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium text-white-50">Email</Form.Label>
          <Form.Control
            type="email"
            value={userSettings.profile.email}
            onChange={(e) => handleChange('profile', 'email', e.target.value)}
          />
          <Form.Text className="text-white-50">
            L'email viene utilizzata per le notifiche e per l'accesso
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium text-white-50">Numero di telefono</Form.Label>
          <Form.Control
            type="tel"
            value={userSettings.profile.phone}
            onChange={(e) => handleChange('profile', 'phone', e.target.value)}
          />
          <Form.Text className="text-white-50">
            Il numero viene utilizzato per la verifica in due passaggi
          </Form.Text>
        </Form.Group>
        
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              className="px-4 py-2 fw-semibold rounded-pill"
              onClick={handleSubmit}
            >
              <FaSave className="me-2" />
              Salva modifiche
            </Button>
          </motion.div>
        </div>
      </Card.Body>
    </Card>
  );
  
  // Componente per le impostazioni di sicurezza
  const SecuritySettings = () => (
    <Card className="glass-premium border-0 mb-4 rounded-4 overflow-hidden">
      <Card.Body className="p-4 p-lg-5">
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(13, 110, 253, 0.2)' }}
            >
              <FaShieldAlt className="text-primary" size={28} />
            </motion.div>
            <h3 className="h4 fw-semibold mb-0" style={appleStyle}>Protezione account</h3>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.security.twoFactorAuth}
              onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
              label="Autenticazione a due fattori"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Aumenta la sicurezza richiedendo un secondo metodo di verifica quando accedi
            </p>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.security.notifyOnLogin}
              onChange={(e) => handleChange('security', 'notifyOnLogin', e.target.checked)}
              label="Notifiche di accesso"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Ricevi una notifica quando viene effettuato l'accesso al tuo account
            </p>
          </div>
          
          <div className="d-flex justify-content-between mb-4 pb-4 border-bottom border-white border-opacity-10">
            <div>
              <h4 className="h6 mb-1 fw-medium">Ultimo cambio password</h4>
              <p className="text-white-50 mb-0">{userSettings.security.passwordReset}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline-light"
                size="sm"
                className="px-3 py-1 rounded-pill"
              >
                Cambia password
              </Button>
            </motion.div>
          </div>
          
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="h6 mb-1 fw-medium">Dispositivi collegati</h4>
              <p className="text-white-50 mb-0">2 dispositivi attivi</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline-light"
                size="sm"
                className="px-3 py-1 rounded-pill"
              >
                Gestisci
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div>
          <div className="d-flex align-items-center mb-4">
            <motion.div 
              whileHover={{ rotate: -10 }}
              className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(255, 193, 7, 0.2)' }}
            >
              <FaExclamationTriangle className="text-warning" size={28} />
            </motion.div>
            <h3 className="h4 fw-semibold mb-0" style={appleStyle}>Area avanzata</h3>
          </div>
          
          <Row className="g-3">
            <Col md={6}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline-light"
                  className="w-100 px-3 py-3 text-start rounded-4"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FaDownload size={18} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-medium">Esporta dati</h5>
                      <p className="mb-0 small text-white-50">Scarica tutti i tuoi dati</p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Col>
            
            <Col md={6}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline-danger"
                  className="w-100 px-3 py-3 text-start rounded-4"
                  style={{ background: 'rgba(220, 53, 69, 0.1)' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FaTrash size={18} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-medium">Elimina account</h5>
                      <p className="mb-0 small text-white-50">Rimuovi definitivamente l'account</p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
  
  // Componente per le impostazioni di notifica
  const NotificationSettings = () => (
    <Card className="glass-premium border-0 mb-4 rounded-4 overflow-hidden">
      <Card.Body className="p-4 p-lg-5">
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(13, 202, 240, 0.2)' }}
            >
              <FaBell className="text-info" size={28} />
            </motion.div>
            <h3 className="h4 fw-semibold mb-0" style={appleStyle}>Preferenze di notifica</h3>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.notifications.email}
              onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
              label="Notifiche via email"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Ricevi aggiornamenti e notifiche via email
            </p>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.notifications.pushNotifications}
              onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
              label="Notifiche push"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Ricevi notifiche push sul tuo dispositivo
            </p>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.notifications.smsNotifications}
              onChange={(e) => handleChange('notifications', 'smsNotifications', e.target.checked)}
              label="Notifiche SMS"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Ricevi notifiche tramite SMS
            </p>
          </div>
        </div>
        
        <div>
          <div className="d-flex align-items-center mb-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(25, 135, 84, 0.2)' }}
            >
              <FaIdCard className="text-success" size={28} />
            </motion.div>
            <h3 className="h4 fw-semibold mb-0" style={appleStyle}>Notifiche del sistema</h3>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.notifications.notifyInactivity}
              onChange={(e) => handleChange('notifications', 'notifyInactivity', e.target.checked)}
              label="Avvisi di inattività"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Ricevi notifiche prima dell'attivazione dell'eredità digitale
            </p>
          </div>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.notifications.notifyHeirs}
              onChange={(e) => handleChange('notifications', 'notifyHeirs', e.target.checked)}
              label="Notifica agli eredi"
            />
            <p className="text-white-50 mb-0 mt-n3 ms-0">
              Notifica ai contatti designati quando vengono aggiunti a un pacchetto
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
  
  // Componente per le impostazioni di eredità
  const InheritanceSettings = () => (
    <Card className="glass-premium border-0 mb-4 rounded-4 overflow-hidden">
      <Card.Body className="p-4 p-lg-5">
        <div className="mb-5">
          <div className="d-flex align-items-start mb-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(13, 110, 253, 0.2)' }}
            >
              <FaIdCard className="text-primary" size={28} />
            </motion.div>
            <div>
              <h3 className="h4 fw-semibold mb-1" style={appleStyle}>
                Configurazione <span style={gradientTextStyle}>eredità</span>
              </h3>
              <p className="text-white-50">Imposta le preferenze per il trasferimento della tua eredità digitale</p>
            </div>
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium text-white-50">Periodo di inattività prima dell'attivazione</Form.Label>
            <Form.Select
              value={userSettings.inheritance.inactivityPeriod}
              onChange={(e) => handleChange('inheritance', 'inactivityPeriod', e.target.value)}
            >
              <option value="7">7 giorni</option>
              <option value="14">14 giorni</option>
              <option value="30">30 giorni</option>
              <option value="60">60 giorni</option>
              <option value="90">90 giorni</option>
              <option value="180">6 mesi</option>
              <option value="365">1 anno</option>
            </Form.Select>
            <Form.Text className="text-white-50">
              Periodo di inattività dopo il quale verrà attivato il processo di trasferimento
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium text-white-50">Metodo di verifica</Form.Label>
            <Form.Select
              value={userSettings.inheritance.verificationMethod}
              onChange={(e) => handleChange('inheritance', 'verificationMethod', e.target.value)}
            >
              <option value="automated">Automatico (sistema)</option>
              <option value="trusted-contact">Contatto fidato</option>
              <option value="legal">Rappresentante legale</option>
            </Form.Select>
            <Form.Text className="text-white-50">
              Come verificare il tuo stato prima di attivare il trasferimento
            </Form.Text>
          </Form.Group>
          
          <div className="mb-4">
            <AppleToggle
              checked={userSettings.inheritance.automaticTransfer}
              onChange={(e) => handleChange('inheritance', 'automaticTransfer', e.target.checked)}
              label="Trasferimento automatico"
            />
            <p className="text-white-50 mb-4 mt-n3 ms-0">
              Trasferimento automatico senza conferma agli eredi
            </p>
          </div>
          
          <hr className="border-white border-opacity-10 my-4" />
          
          <div className="glass-premium p-4 rounded-3">
            <div className="d-flex">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  flexShrink: 0,
                  boxShadow: '0 10px 25px rgba(255, 193, 7, 0.2)'
                }}
              >
                <FaExclamationTriangle className="text-warning" size={28} />
              </motion.div>
              <div>
                <h4 className="h5 fw-semibold mb-2" style={appleStyle}>Verifica sistema di attivazione</h4>
                <p className="text-white-50 mb-3">
                  Consigliamo di eseguire periodicamente un test del sistema di attivazione per assicurarsi che funzioni correttamente.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline-light"
                    className="px-3 py-2 rounded-pill"
                  >
                    Esegui test di attivazione
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="d-flex align-items-start mb-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" 
              style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(25, 135, 84, 0.2)' }}
            >
              <FaCloudDownloadAlt className="text-success" size={28} />
            </motion.div>
            <div>
              <h3 className="h4 fw-semibold mb-1" style={appleStyle}>Backup e storia</h3>
              <p className="text-white-50">Gestisci i tuoi dati e visualizza la cronologia delle attività</p>
            </div>
          </div>
          
          <Row className="g-3">
            <Col md={6}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline-light"
                  className="w-100 px-3 py-3 text-start rounded-4"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FaCloudDownloadAlt size={18} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-medium">Esporta configurazione</h5>
                      <p className="mb-0 small text-white-50">Backup delle impostazioni</p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Col>
            
            <Col md={6}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline-light"
                  className="w-100 px-3 py-3 text-start rounded-4"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FaHistory size={18} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-medium">Cronologia accessi</h5>
                      <p className="mb-0 small text-white-50">Visualizza gli accessi recenti</p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
  
  return (
    <div className="overflow-hidden">
      {/* Stili globali per correggere problemi UI */}
      <GlobalStyles />
      
      {/* Loading screen */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Background con parallax */}
      <motion.div 
        style={{ 
          y: backgroundY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: `linear-gradient(rgba(10, 14, 23, 0.85), rgba(10, 14, 23, 0.85)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Effetti di luce ambientale */}
      <div 
        className="position-fixed" 
        style={{ 
          top: '10%', 
          left: '5%', 
          width: '30%', 
          height: '30%',
          background: 'radial-gradient(circle, rgba(13,110,253,0.15) 0%, rgba(13,110,253,0) 70%)',
          filter: 'blur(120px)',
          zIndex: 2,
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      ></div>
      
      <div 
        className="position-fixed" 
        style={{ 
          bottom: '5%', 
          right: '10%', 
          width: '25%', 
          height: '25%',
          background: 'radial-gradient(circle, rgba(165,110,255,0.1) 0%, rgba(165,110,255,0) 70%)',
          filter: 'blur(100px)',
          zIndex: 2,
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      ></div>
      
      <MainLayout onLogout={onLogout}>
        <Container className="pb-5">
          {/* Header con titolo */}
          <header className="text-center text-lg-start pt-4 pb-5">
            <RevealOnScroll direction="bottom" duration={0.4}>
              <h1 className="display-4 fw-bold mb-0" style={appleStyle}>
                Impostazioni <span style={gradientTextStyle}>account</span>
              </h1>
              <p className="text-white-50 lead">Personalizza la tua esperienza e configura il tuo account</p>
            </RevealOnScroll>
          </header>
          
          {/* Messaggio di successo */}
          {showSuccess && (
            <RevealOnScroll direction="bottom" duration={0.4}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="success" className="mb-4 d-flex align-items-center border-0 rounded-3 bg-success bg-opacity-25 py-3">
                  <FaCheck className="me-2" size={18} />
                  <span className="fw-medium">Impostazioni salvate con successo</span>
                </Alert>
              </motion.div>
            </RevealOnScroll>
          )}
          
          {/* Tabs di navigazione */}
          <RevealOnScroll direction="bottom" duration={0.4}>
            <div className="mb-4">
              <Tab.Container id="settings-tabs" defaultActiveKey="profile" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <div className="mb-4 glass-premium rounded-pill p-2 shadow-sm">
                  <Nav variant="pills" className="flex-nowrap overflow-auto pb-0" style={{ gap: '0.5rem' }}>
                    <Nav.Item className="flex-1">
                      <Nav.Link 
                        eventKey="profile" 
                        className="text-center px-4 py-2 rounded-pill"
                      >
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                          <FaUserCircle className="me-sm-2 mb-1 mb-sm-0" />
                          <span>Profilo</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-1">
                      <Nav.Link 
                        eventKey="security" 
                        className="text-center px-4 py-2 rounded-pill"
                      >
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                          <FaLock className="me-sm-2 mb-1 mb-sm-0" />
                          <span>Sicurezza</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-1">
                      <Nav.Link 
                        eventKey="notifications" 
                        className="text-center px-4 py-2 rounded-pill"
                      >
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                          <FaBell className="me-sm-2 mb-1 mb-sm-0" />
                          <span>Notifiche</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-1">
                      <Nav.Link 
                        eventKey="inheritance" 
                        className="text-center px-4 py-2 rounded-pill"
                      >
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                          <FaIdCard className="me-sm-2 mb-1 mb-sm-0" />
                          <span>Eredità</span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProfileSettings />
                    </motion.div>
                  )}
                  
                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SecuritySettings />
                    </motion.div>
                  )}
                  
                  {activeTab === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NotificationSettings />
                    </motion.div>
                  )}
                  
                  {activeTab === 'inheritance' && (
                    <motion.div
                      key="inheritance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InheritanceSettings />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tab.Container>
            </div>
          </RevealOnScroll>
        </Container>
      </MainLayout>
    </div>
  );
};

export default SettingsPage;