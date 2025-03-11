import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Dropdown } from 'react-bootstrap';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaBox, 
  FaPlus, 
  FaUserFriends, 
  FaLock, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaChartLine, 
  FaBell, 
  FaCalendarAlt,
  FaShieldAlt,
  FaArrowRight,
  FaClock,
  FaEllipsisH,
  FaDownload,
  FaShareAlt,
  FaCog,
  FaSyncAlt,
  FaChevronUp,
  FaChevronDown,
  FaInfoCircle,
  FaSearch,
  FaCheckCircle,
  FaExclamationCircle,
  FaFingerprint,
  FaHome,
  FaTachometerAlt,
  FaKey,
  FaSpinner
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

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
              <p className="text-white-50 small">Caricamento dashboard...</p>
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
    `}
  </style>
);

// MainLayout migliorato per evitare elementi fluttuanti
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

const DashboardPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 80]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simuliamo un caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Dati di esempio per i pacchetti
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: 'Documenti personali',
      description: 'Password, documenti d\'identità e contratti importanti',
      recipients: 3,
      files: 12,
      lastUpdate: '2 giorni fa',
      status: 'active',
      icon: <FaLock />,
      color: 'primary'
    },
    {
      id: 2,
      title: 'Ricordi di famiglia',
      description: 'Foto e video delle vacanze e momenti speciali',
      recipients: 5,
      files: 156,
      lastUpdate: '1 settimana fa',
      status: 'active',
      icon: <FaUserFriends />,
      color: 'success'
    },
    {
      id: 3,
      title: 'Account social',
      description: 'Credenziali per i miei account social e istruzioni',
      recipients: 2,
      files: 5,
      lastUpdate: '3 settimane fa',
      status: 'active',
      icon: <FaBox />,
      color: 'info'
    }
  ]);
  
  // Dati delle attività recenti
  const recentActivities = [
    {
      id: 1,
      type: 'edit',
      description: 'Hai modificato il pacchetto "Documenti personali"',
      date: '2 giorni fa',
      icon: <FaEdit />,
      color: 'primary'
    },
    {
      id: 2,
      type: 'add',
      description: 'Hai aggiunto 5 nuovi file al pacchetto "Ricordi di famiglia"',
      date: '1 settimana fa',
      icon: <FaPlus />,
      color: 'success'
    },
    {
      id: 3,
      type: 'contact',
      description: 'Hai designato Marco Rossi come destinatario del pacchetto "Account social"',
      date: '3 settimane fa',
      icon: <FaUserFriends />,
      color: 'info'
    }
  ];
  
  // Statistiche per la dashboard
  const stats = [
    { id: 1, name: 'Pacchetti', value: packages.length, icon: <FaBox />, color: 'primary' },
    { id: 2, name: 'Contatti', value: 7, icon: <FaUserFriends />, color: 'info' },
    { id: 3, name: 'Sicurezza', value: 'Alta', icon: <FaShieldAlt />, color: 'success' },
    { id: 4, name: 'File', value: 173, icon: <FaBox />, color: 'warning' },
  ];
  
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
  
  // Componente carta con effetti hover
  const GlassCard = ({ children, color = "primary", className = "", ...props }) => {
    return (
      <motion.div
        style={{
          ...glassStyle,
          overflow: 'hidden'
        }}
        whileHover={{ 
          y: -10, 
          scale: 1.02,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`glass-premium ${className}`}
        {...props}
      >
        <div className={`bg-${color}`} style={{ height: '4px' }}></div>
        {children}
      </motion.div>
    );
  };
  
  // Componente statico carta
  const StaticGlassCard = ({ children, color = "primary", className = "", ...props }) => {
    return (
      <div
        style={{
          ...glassStyle,
          overflow: 'hidden'
        }}
        className={`glass-premium ${className}`}
        {...props}
      >
        <div className={`bg-${color}`} style={{ height: '4px' }}></div>
        {children}
      </div>
    );
  };
  
  // Componente della carta pacchetto
  const PackageCard = ({ pkg, index }) => {
    return (
      <RevealOnScroll 
        direction="bottom" 
        delay={index * 0.1} 
        duration={0.4}
      >
        <GlassCard color={pkg.color} className="h-100">
          <div className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <div 
                  className={`bg-${pkg.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3`} 
                  style={{ width: '48px', height: '48px' }}
                >
                  <span className={`text-${pkg.color}`}>{pkg.icon}</span>
                </div>
                <div>
                  <h3 className="fw-semibold mb-0" style={{ fontSize: '1.2rem', ...appleStyle }}>
                    {pkg.title}
                  </h3>
                  <p className="text-white-50 mb-0 small">Aggiornato {pkg.lastUpdate}</p>
                </div>
              </div>
              
              <Dropdown>
                <Dropdown.Toggle 
                  variant="link" 
                  id={`dropdown-${pkg.id}`}
                  className="text-white-50 p-0 border-0 shadow-none"
                  style={{ background: 'transparent' }}
                >
                  <FaEllipsisH />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end bg-dark border-0" style={{
                  background: 'rgba(30, 30, 30, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                }}>
                  <Dropdown.Item className="text-white-50 d-flex align-items-center">
                    <FaDownload className="me-2" /> Scarica
                  </Dropdown.Item>
                  <Dropdown.Item className="text-white-50 d-flex align-items-center">
                    <FaShareAlt className="me-2" /> Condividi
                  </Dropdown.Item>
                  <Dropdown.Divider className="border-white border-opacity-10" />
                  <Dropdown.Item className="text-danger d-flex align-items-center">
                    <FaTrash className="me-2" /> Elimina
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
            <p className="text-white-50 mb-3" style={{ fontSize: '0.95rem' }}>{pkg.description}</p>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-white-50 small">Completezza</span>
                <span className="text-white-50 small">{pkg.files > 50 ? '75%' : '50%'}</span>
              </div>
              <ProgressBar 
                variant={pkg.color} 
                now={pkg.files > 50 ? 75 : 50} 
                style={{ height: '6px', borderRadius: '3px' }}
              />
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-4 small">
              <div className="text-white-50">
                <FaUserFriends className="me-1" />
                <span className="text-white fw-semibold">{pkg.recipients}</span> destinatari
              </div>
              <div className="text-white-50">
                <FaBox className="me-1" />
                <span className="text-white fw-semibold">{pkg.files}</span> file
              </div>
            </div>
            
            <div className="d-flex gap-2">
              <Link to={`/view-package/${pkg.id}`} className="flex-grow-1">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{ borderRadius: '1.25rem' }}
                >
                  <FaEye className="me-2" />
                  Visualizza
                </Button>
              </Link>
              
              <Link to={`/edit-package/${pkg.id}`} className="flex-grow-1">
                <Button 
                  variant={pkg.color}
                  size="sm"
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{ borderRadius: '1.25rem' }}
                >
                  <FaEdit className="me-2" />
                  Modifica
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </RevealOnScroll>
    );
  };
  
  // Component per la timeline
  const ActivityTimeline = ({ activities }) => {
    const [expanded, setExpanded] = useState(false);
    const visibleActivities = expanded ? activities : activities.slice(0, 2);
    
    return (
      <div className="position-relative">
        {visibleActivities.map((activity, index) => (
          <RevealOnScroll 
            key={activity.id}
            direction="bottom" 
            delay={index * 0.1} 
            duration={0.3}
          >
            <div className="position-relative">
              <div className={`p-4 border-start border-${activity.color} border-3 ms-3 mb-3`} style={{
                marginLeft: '1.5rem',
                background: `linear-gradient(90deg, rgba(${activity.color === 'primary' ? '13,110,253' : activity.color === 'success' ? '25,135,84' : '13,202,240'}, 0.1) 0%, rgba(0,0,0,0) 100%)`,
                borderRadius: '0.5rem'
              }}>
                <div className="d-flex">
                  {/* Punto sulla timeline */}
                  <div 
                    className={`position-absolute bg-${activity.color} rounded-circle d-flex align-items-center justify-content-center`} 
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      left: '0',
                      transform: 'translateX(-50%)',
                      border: '3px solid rgba(30, 30, 30, 0.8)',
                      zIndex: 2
                    }}
                  >
                    {activity.icon}
                  </div>
                  
                  <div className="ms-3">
                    <p className="text-white mb-1 fw-medium">{activity.description}</p>
                    <p className="text-white-50 small mb-0 d-flex align-items-center">
                      <FaClock className="me-1" size={12} />
                      {activity.date}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Linea verticale */}
              {index < visibleActivities.length - 1 && (
                <div 
                  className="position-absolute bg-white bg-opacity-20" 
                  style={{ 
                    width: '1px',
                    height: '2rem',
                    left: '1.5rem',
                    top: '3.5rem',
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              )}
            </div>
          </RevealOnScroll>
        ))}
        
        {activities.length > 2 && (
          <div className="text-center mt-1">
            <Button 
              variant="link" 
              className="text-white-50 text-decoration-none fw-medium small p-2"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Mostra meno <FaChevronUp size={10} className="ms-1" />
                </>
              ) : (
                <>
                  Mostra altre {activities.length - 2} attività <FaChevronDown size={10} className="ms-1" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  // Widget sicurezza migliorato
  const SecurityWidget = () => {
    const securityItems = [
      { id: 1, name: "Autenticazione a due fattori", active: true },
      { id: 2, name: "Cifratura avanzata", active: true },
      { id: 3, name: "Controllo accessi", active: true },
      { id: 4, name: "Protezione ripristino", active: false }
    ];
    
    return (
      <div className="glass-premium h-100 rounded-4 overflow-hidden">
        <div className="p-3 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Sicurezza</h5>
          <Badge bg="success" pill>Protetto</Badge>
        </div>
        <div className="p-3 d-flex flex-column">
          <div className="text-center mb-3">
            <motion.div 
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              animate={{ 
                boxShadow: ['0 0 0 rgba(25, 135, 84, 0.2)', '0 0 15px rgba(25, 135, 84, 0.5)', '0 0 0 rgba(25, 135, 84, 0.2)'] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '80px',
                height: '80px',
                background: 'rgba(25,135,84,0.2)',
                border: '2px solid rgba(25,135,84,0.5)'
              }}
            >
              <FaFingerprint size={30} className="text-success" />
            </motion.div>
            <h3 className="h4 mb-0">85%</h3>
            <p className="text-white-50 mt-1 mb-3 small">
              Punteggio sicurezza
            </p>
          </div>
          
          <ul className="list-unstyled mb-0">
            {securityItems.map(item => (
              <li key={item.id} className="d-flex align-items-center mb-2">
                <div className={item.active ? 'text-success me-2' : 'text-warning me-2'}>
                  {item.active ? <FaCheckCircle /> : <FaExclamationCircle />}
                </div>
                <span className={item.active ? 'text-white' : 'text-white-50'}>
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="mt-3 text-center">
            <Link to="/settings">
              <Button 
                variant="success" 
                size="sm"
                className="rounded-pill px-3 py-2 fw-semibold"
              >
                <FaShieldAlt className="me-2" />
                Migliora sicurezza
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  // Widget notifiche migliorato
  const NotificationsWidget = () => {
    const notifications = [
      { id: 1, text: "Marco ha accettato l'invito", time: "1 ora fa", read: false },
      { id: 2, text: "Pacchetto 'Documenti' completato al 75%", time: "12 ore fa", read: false },
      { id: 3, text: "Promemoria: aggiorna password", time: "1 giorno fa", read: true }
    ];
    
    return (
      <div className="glass-premium h-100 rounded-4 overflow-hidden">
        <div className="p-3 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Notifiche</h5>
          <Badge bg="danger" pill>{notifications.filter(n => !n.read).length}</Badge>
        </div>
        <div className="p-3">
          {notifications.map(notification => (
            <motion.div 
              key={notification.id}
              whileHover={{ x: 5 }}
              className={`px-3 py-2 my-2 ${notification.read ? '' : 'border-start border-3 border-primary'}`}
              style={{
                borderRadius: '0.5rem',
                background: notification.read ? 'transparent' : 'rgba(13, 110, 253, 0.05)',
                cursor: 'pointer'
              }}
            >
              <p className="mb-1 fw-medium small" style={{opacity: notification.read ? 0.7 : 1}}>
                {notification.text}
              </p>
              <p className="mb-0 text-white-50" style={{fontSize: '0.75rem'}}>
                {notification.time}
              </p>
            </motion.div>
          ))}
          
          <div className="text-center mt-3">
            <Button 
              variant="link" 
              className="text-white-50 text-decoration-none p-0 small"
              style={{ fontSize: '0.85rem' }}
            >
              Vedi tutte le notifiche
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
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
          {/* Header della Dashboard con tabs */}
          <header className="pt-4 pb-5">
            <RevealOnScroll direction="bottom" duration={0.4}>
              <Row className="align-items-center mb-4">
                <Col>
                  <h1 className="display-4 fw-bold mb-0" style={appleStyle}>
                    Dashboard <span style={gradientTextStyle}>personale</span>
                  </h1>
                  <p className="text-white-50 lead mb-0">Gestione della tua eredità digitale</p>
                </Col>
                <Col xs="auto" className="d-none d-md-block">
                  <div className="position-relative">
                    <input 
                      type="text" 
                      className="form-control bg-dark bg-opacity-50 border-0 text-white ps-4 pe-5"
                      placeholder="Cerca pacchetti o file..."
                      style={{ 
                        borderRadius: '2rem',
                        width: '300px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <FaSearch className="position-absolute text-white-50" style={{ right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </Col>
              </Row>
              
              <div className="d-flex align-items-center border-bottom border-white border-opacity-10 pb-2 mb-2">
                <div 
                  className={`px-4 py-2 me-3 position-relative cursor-pointer ${activeTab === 'dashboard' ? 'text-white' : 'text-white-50'}`} 
                  onClick={() => setActiveTab('dashboard')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fw-medium">Dashboard</span>
                  {activeTab === 'dashboard' && (
                    <motion.div 
                      layoutId="activeTab"
                      className="position-absolute bg-primary" 
                      style={{ 
                        height: '2px', 
                        left: 0, 
                        right: 0, 
                        bottom: '-2px',
                        borderRadius: '1px' 
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <div 
                  className={`px-4 py-2 me-3 position-relative ${activeTab === 'analytics' ? 'text-white' : 'text-white-50'}`} 
                  onClick={() => setActiveTab('analytics')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fw-medium">Analytics</span>
                  {activeTab === 'analytics' && (
                    <motion.div 
                      layoutId="activeTab"
                      className="position-absolute bg-primary" 
                      style={{ 
                        height: '2px', 
                        left: 0, 
                        right: 0, 
                        bottom: '-2px',
                        borderRadius: '1px'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <div 
                  className={`px-4 py-2 position-relative ${activeTab === 'settings' ? 'text-white' : 'text-white-50'}`} 
                  onClick={() => setActiveTab('settings')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fw-medium">Impostazioni</span>
                  {activeTab === 'settings' && (
                    <motion.div 
                      layoutId="activeTab"
                      className="position-absolute bg-primary" 
                      style={{ 
                        height: '2px', 
                        left: 0, 
                        right: 0, 
                        bottom: '-2px',
                        borderRadius: '1px'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </header>
          
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Statistiche */}
                <section className="mb-5">
                  <Row className="g-4">
                    {stats.map((stat, index) => (
                      <Col sm={6} xl={3} key={stat.id}>
                        <RevealOnScroll 
                          direction="bottom" 
                          delay={index * 0.1} 
                          duration={0.4}
                        >
                          <div className="glass-premium rounded-4 text-center p-4 h-100">
                            <div 
                              className={`bg-${stat.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`} 
                              style={{ width: '64px', height: '64px' }}
                            >
                              <span className={`text-${stat.color}`}>{stat.icon}</span>
                            </div>
                            <h2 className="h3 fw-bold mb-1">{stat.value}</h2>
                            <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>{stat.name}</p>
                          </div>
                        </RevealOnScroll>
                      </Col>
                    ))}
                  </Row>
                </section>
                
                {/* I tuoi pacchetti */}
                <section className="mb-5">
                  <RevealOnScroll direction="bottom" duration={0.4}>
                    <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
                      <div>
                        <h2 className="h3 fw-bold mb-0" style={appleStyle}>I tuoi pacchetti</h2>
                        <p className="text-white-50 mb-3 mb-md-0">Gestisci i tuoi pacchetti di eredità digitale</p>
                      </div>
                      <Link to="/create-package">
                        <Button
                          variant="primary"
                          className="d-flex align-items-center fw-semibold px-4 py-2"
                          style={{ borderRadius: '2rem' }}
                        >
                          <FaPlus className="me-2" size={12} />
                          Nuovo pacchetto
                        </Button>
                      </Link>
                    </div>
                  </RevealOnScroll>
                  
                  <Row className="g-4">
                    {packages.map((pkg, index) => (
                      <Col lg={4} key={pkg.id}>
                        <PackageCard pkg={pkg} index={index} />
                      </Col>
                    ))}
                    
                    {/* Card per creare un nuovo pacchetto */}
                    <Col lg={4}>
                      <RevealOnScroll 
                        direction="bottom" 
                        delay={packages.length * 0.1} 
                        duration={0.4}
                      >
                        <Link to="/create-package" className="text-decoration-none">
                          <motion.div
                            style={{
                              ...glassStyle,
                              borderStyle: 'dashed',
                              borderWidth: '2px',
                              background: 'rgba(255, 255, 255, 0.03)',
                              height: '100%'
                            }}
                            whileHover={{ 
                              y: -10, 
                              scale: 1.02,
                              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                            }}
                            className="text-center d-flex align-items-center justify-content-center p-4 rounded-4"
                          >
                            <div className="py-5">
                              <motion.div 
                                className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{ width: '64px', height: '64px' }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FaPlus className="text-white" size={24} />
                              </motion.div>
                              <h3 className="fw-semibold mb-2" style={{ fontSize: '1.2rem', ...appleStyle }}>
                                Crea nuovo pacchetto
                              </h3>
                              <p className="text-white-50 mb-0">
                                Aggiungi un nuovo pacchetto di eredità digitale
                              </p>
                            </div>
                          </motion.div>
                        </Link>
                      </RevealOnScroll>
                    </Col>
                  </Row>
                </section>
                
                {/* Sezione attività e info */}
                <section>
                  <Row className="g-4">
                    <Col lg={7}>
                      <RevealOnScroll direction="bottom" duration={0.4}>
                        <div className="glass-premium rounded-4 h-100">
                          <div className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <div>
                                <h3 className="h5 fw-bold mb-0" style={appleStyle}>Timeline attività</h3>
                                <p className="text-white-50 mb-0 small">Cronologia delle operazioni</p>
                              </div>
                            </div>
                            
                            <ActivityTimeline activities={recentActivities} />
                          </div>
                        </div>
                      </RevealOnScroll>
                    </Col>
                    
                    {/* Colonna con due card */}
                    <Col lg={5}>
                      <Row className="g-4 h-100">
                        <Col lg={12}>
                          <RevealOnScroll direction="bottom" duration={0.4} delay={0.1}>
                            <SecurityWidget />
                          </RevealOnScroll>
                        </Col>
                        
                        <Col lg={12}>
                          <RevealOnScroll direction="bottom" duration={0.4} delay={0.2}>
                            <NotificationsWidget />
                          </RevealOnScroll>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </section>
              </motion.div>
            )}
            
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center py-5">
                  <div className="glass-premium p-5 rounded-4">
                    <h3 className="mb-4 fw-bold">Analytics</h3>
                    <p className="text-white-50">Questa sezione è in fase di sviluppo.</p>
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        transition: { duration: 3, repeat: Infinity, ease: "linear" }
                      }}
                      className="my-4"
                    >
                      <FaChartLine className="text-primary" size={48} />
                    </motion.div>
                    <p className="mb-0 text-white-50">Presto disponibili statistiche dettagliate sui tuoi pacchetti e contatti</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center py-5">
                  <div className="glass-premium p-5 rounded-4">
                    <h3 className="mb-4 fw-bold">Impostazioni</h3>
                    <p className="text-white-50">Questa sezione è in fase di sviluppo.</p>
                    <motion.div
                      animate={{ 
                        rotate: [0, 20, 0, -20, 0],
                        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="my-4"
                    >
                      <FaCog className="text-primary" size={48} />
                    </motion.div>
                    <p className="mb-0 text-white-50">Presto disponibili configurazioni avanzate per la tua eredità digitale</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Promemoria e Consigli */}
          <section className="mt-5">
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div 
                className="glass-premium rounded-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,110,253,0.1), rgba(25,135,84,0.1))'
                }}
              >
                <div className="p-4 text-center text-lg-start">
                  <Row className="align-items-center">
                    <Col lg={8}>
                      <div className="d-flex align-items-center mb-3 justify-content-center justify-content-lg-start">
                        <FaBell className="text-warning me-2" />
                        <Badge 
                          bg="warning" 
                          text="dark"
                          style={{ 
                            fontWeight: 500, 
                            textTransform: 'uppercase', 
                            fontSize: '0.7rem',
                            letterSpacing: '0.05em' 
                          }}
                        >
                          Promemoria
                        </Badge>
                      </div>
                      <h3 className="fw-semibold mb-3" style={{ fontSize: '1.5rem', ...appleStyle }}>
                        Aggiorna le tue preferenze di sicurezza
                      </h3>
                      <p className="text-white-50 mb-4 mb-lg-0">
                        L'ultima verifica delle tue impostazioni di sicurezza è stata 3 mesi fa. Ti consigliamo di rivedere e aggiornare le tue preferenze per mantenere al sicuro la tua eredità digitale.
                      </p>
                    </Col>
                    <Col lg={4} className="text-center text-lg-end">
                      <Link to="/settings">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="primary" 
                            className="fw-semibold px-4 py-2 rounded-pill"
                          >
                            <FaShieldAlt className="me-2" />
                            Aggiorna sicurezza
                          </Button>
                        </motion.div>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </div>
            </RevealOnScroll>
          </section>
        </Container>
      </MainLayout>
    </div>
  );
};

export default DashboardPage;