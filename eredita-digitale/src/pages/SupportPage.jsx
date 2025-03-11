import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaComments, 
  FaHeadset, 
  FaSearchPlus, 
  FaQuestionCircle,
  FaArrowRight,
  FaCheckCircle,
  FaUserCircle,
  FaRegLightbulb,
  FaBook,
  FaInfoCircle,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaSpinner,
  FaKey, 
  FaBox, 
  FaUserFriends, 
  FaLock, 
  FaShieldAlt, 
  FaCloudUploadAlt, 
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaFileAlt,
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaCheck,
  FaStar,
  FaHeart,
  FaPlay,
  FaChevronDown,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

// Definizione di stili globali CSS per risolvere problemi di UI
const GlobalStyles = () => (
  <style>
    {`
      /* Controllo dello scrolling */
      html, body {
        scroll-behavior: auto !important;
        overflow-x: hidden;
      }
      
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

      /* Stili per testimonials */
      .testimonial-card {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .testimonial-card:hover {
        transform: translateY(-10px);
      }

      .testimonial-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.1);
      }

      .testimonial-quote {
        position: relative;
        font-style: italic;
        line-height: 1.6;
      }
    `}
  </style>
);

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
              <p className="text-white-50 small">Preparazione dell'eredità digitale...</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente per forzare lo scroll all'inizio quando il pathname cambia
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Tentativo aggiuntivo dopo le animazioni
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return null;
};

// MainLayout migliorato per evitare elementi fluttuanti
const MainLayout = ({ children, title, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll al top quando viene montato il layout
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  
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

const SupportPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  
  // Parallax effects - enhanced for premium feel
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 100]);
  const backgroundScale = useTransform(scrollY, [0, 2000], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollY, [0, 1000], [0.85, 0.95]);
  const backgroundBlur = useTransform(scrollY, [0, 2000], [0, 3]);
  
  // Scroll reset più aggressivo con tentativi multipli
  useEffect(() => {
    // Reset scroll in modo aggressivo
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // Per Safari
    document.documentElement.scrollTop = 0; // Per Chrome, Firefox, IE e Opera
    
    // Forzalo anche dopo un po' di tempo
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });
    }, 200);
    
    // Gestione del loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Ancora uno scroll al top dopo il caricamento
      window.scrollTo(0, 0);
    }, 1000);
    
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset after 5 seconds for demo
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          category: 'general'
        });
      }, 5000);
    }, 1000);
  };

  // Support categories
  const supportCategories = [
    { id: 'general', name: 'Informazioni Generali', icon: <FaInfoCircle />, color: 'primary' },
    { id: 'technical', name: 'Supporto Tecnico', icon: <FaHeadset />, color: 'info' },
    { id: 'billing', name: 'Fatturazione', icon: <FaBook />, color: 'warning' },
    { id: 'feature', name: 'Suggerimenti', icon: <FaRegLightbulb />, color: 'success' }
  ];

  // FAQ quick links
  const faqLinks = [
    'Come funziona ETNT?',
    'Come creare un pacchetto eredità',
    'Impostazioni di sicurezza',
    'Gestione dei contatti',
    'Opzioni di abbonamento'
  ];

  // Office locations
  const officeLocations = [
    {
      city: 'Milano',
      address: 'Via Dante 12, 20121',
      hours: 'Lun-Ven: 9:00 - 18:00',
      phone: '+39 02 1234 5678'
    },
    {
      city: 'Roma',
      address: 'Via del Corso 303, 00186',
      hours: 'Lun-Ven: 9:00 - 18:00',
      phone: '+39 06 8765 4321'
    }
  ];

  // Create enhanced reveal animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Card animation
  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03, 
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Glassmorphism style
  const glassStyle = {
    background: 'rgba(25, 35, 55, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)'
  };
  
  // Style for gradient text
  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #2196f3, #a56eff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };
  
  // Apple style for headings
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };

  return (
    <div className="overflow-hidden">
      {/* Componente che forza lo scroll in cima quando cambia route */}
      <ScrollToTop />
      
      {/* Stili globali per correggere problemi UI */}
      <GlobalStyles />
      
      {/* Loading screen */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Background con parallax migliorato */}
      <motion.div 
        style={{ 
          y: backgroundY,
          scale: backgroundScale,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: `linear-gradient(135deg, rgba(10, 14, 23, 0.85), rgba(5, 10, 20, 0.9)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `blur(${backgroundBlur}px)`,
          transition: 'filter 0.3s ease-out'
        }}
      />
      
      {/* Effetti di luce ambientale - migliorati */}
      <motion.div 
        className="position-fixed" 
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ 
          top: '10%', 
          left: '5%', 
          width: '35%', 
          height: '35%',
          background: 'radial-gradient(circle, rgba(13,110,253,0.15) 0%, rgba(13,110,253,0) 75%)',
          filter: 'blur(120px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      
      <motion.div 
        className="position-fixed"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        style={{ 
          bottom: '5%', 
          right: '10%', 
          width: '30%', 
          height: '30%',
          background: 'radial-gradient(circle, rgba(165,110,255,0.12) 0%, rgba(165,110,255,0) 70%)',
          filter: 'blur(100px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      
      <MainLayout onLogout={onLogout}>
        <section className="py-5 position-relative" style={{ zIndex: 3 }}>
          <Container>
            {/* Header */}
            <motion.div 
              className="text-center mb-5"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="badge bg-info bg-opacity-10 text-info fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                Risorse
              </span>
              <h1 className="display-4 fw-bold mb-4" style={appleStyle}>
                Supporto <span style={gradientTextStyle}>ETNT</span>
              </h1>
              <p className="lead text-white-50 mb-5 mx-auto" style={{ maxWidth: '700px', fontWeight: 300 }}>
                Siamo qui per aiutarti. Trova le risposte che cerchi o contattaci direttamente,
                il nostro team è a tua disposizione.
              </p>
            </motion.div>
            
            {/* Support Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Row className="g-4 mb-5">
                {supportCategories.map((category, index) => (
                  <Col md={6} lg={3} key={category.id}>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="h-100"
                    >
                      <Card className="h-100 border-0 rounded-4 overflow-hidden text-center" style={glassStyle}>
                        <Card.Body className="p-4 d-flex flex-column align-items-center">
                          <div 
                            className={`bg-${category.color} bg-opacity-15 rounded-circle d-flex align-items-center justify-content-center mb-4`}
                            style={{ 
                              width: '80px', 
                              height: '80px',
                              boxShadow: `0 10px 25px rgba(var(--bs-${category.color}-rgb), 0.2)`
                            }}
                          >
                            <motion.div 
                              className={`text-${category.color}`}
                              animate={{ 
                                scale: [1, 1.2, 1],
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                                delay: index * 0.5
                              }}
                            >
                              {React.cloneElement(category.icon, { size: 36 })}
                            </motion.div>
                          </div>
                          <h3 className="fw-semibold mb-3">{category.name}</h3>
                          <p className="text-white-50 mb-4" style={{ fontWeight: 300 }}>
                            {category.id === 'general' && 'Informazioni sull\'utilizzo di ETNT e configurazione iniziale.'}
                            {category.id === 'technical' && 'Assistenza tecnica, risoluzione problemi e configurazioni avanzate.'}
                            {category.id === 'billing' && 'Gestione abbonamenti, fatturazione e pagamenti.'}
                            {category.id === 'feature' && 'Inviaci i tuoi suggerimenti per migliorare ETNT.'}
                          </p>
                          <Button 
                            variant={category.color} 
                            className="mt-auto rounded-pill px-4"
                            href="#contact-form"
                            onClick={() => setFormData({...formData, category: category.id})}
                          >
                            Contattaci <FaChevronRight className="ms-2" size={12} />
                          </Button>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
            
            <Row className="g-5 mb-5">
              {/* FAQ Quick Links */}
              <Col lg={4} className="mb-4 mb-lg-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="h-100 border-0 rounded-4 overflow-hidden" style={glassStyle}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-warning bg-opacity-15 rounded-circle p-3 me-3">
                          <motion.div
                            animate={{ rotate: [-3, 3, -3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaQuestionCircle className="text-warning" size={24} />
                          </motion.div>
                        </div>
                        <h3 className="fw-semibold mb-0">Domande Frequenti</h3>
                      </div>
                      
                      <p className="text-white-50 mb-4" style={{ fontWeight: 300 }}>
                        Risposte rapide alle domande più comuni dei nostri utenti.
                      </p>
                      
                      <div className="mb-4">
                        {faqLinks.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                          >
                            <Link 
                              to="/faq" 
                              className="d-flex align-items-center py-3 border-bottom border-white border-opacity-10 text-decoration-none text-white"
                            >
                              <motion.div
                                whileHover={{ x: 5 }}
                                className="d-flex align-items-center w-100"
                              >
                                <FaArrowRight className="text-primary me-3" size={12} />
                                <span>{faq}</span>
                              </motion.div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      
                      <Link to="/faq">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button variant="outline-light" className="rounded-pill w-100">
                            Visualizza tutte le FAQ
                          </Button>
                        </motion.div>
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              
              {/* Office Locations */}
              <Col lg={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card className="border-0 rounded-4 overflow-hidden" style={glassStyle}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success bg-opacity-15 rounded-circle p-3 me-3">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaHeadset className="text-success" size={24} />
                          </motion.div>
                        </div>
                        <h3 className="fw-semibold mb-0">Contattaci Direttamente</h3>
                      </div>
                      
                      <Row>
                        <Col md={6} className="mb-4">
                          <div className="d-flex mb-3">
                            <div className="me-3">
                              <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <FaEnvelope className="text-primary" size={24} />
                              </motion.div>
                            </div>
                            <div>
                              <h5 className="fw-semibold">Email</h5>
                              <p className="text-white-50 mb-0">support@etnt.com</p>
                              <p className="text-white-50 mb-0">info@etnt.com</p>
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                          <div className="d-flex mb-3">
                            <div className="me-3">
                              <motion.div
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <FaPhoneAlt className="text-primary" size={24} />
                              </motion.div>
                            </div>
                            <div>
                              <h5 className="fw-semibold">Telefono</h5>
                              <p className="text-white-50 mb-0">+39 02 1234 5678</p>
                              <p className="text-white-50 mb-0">Lun-Ven: 9:00 - 18:00</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      <h4 className="fw-semibold mb-4">Le nostre sedi</h4>
                      
                      <Row className="g-4">
                        {officeLocations.map((office, index) => (
                          <Col md={6} key={index}>
                            <motion.div
                              whileHover={{ scale: 1.02, y: -5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Card className="border-0 rounded-4 h-100" style={{
                                background: 'rgba(25, 35, 55, 0.4)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.04)'
                              }}>
                                <Card.Body className="p-4">
                                  <h5 className="fw-semibold mb-3">{office.city}</h5>
                                  <div className="d-flex mb-2">
                                    <FaMapMarkerAlt className="text-primary me-3 mt-1" />
                                    <p className="text-white-50 mb-0">{office.address}</p>
                                  </div>
                                  <div className="d-flex mb-2">
                                    <FaClock className="text-primary me-3 mt-1" />
                                    <p className="text-white-50 mb-0">{office.hours}</p>
                                  </div>
                                  <div className="d-flex">
                                    <FaPhoneAlt className="text-primary me-3 mt-1" />
                                    <p className="text-white-50 mb-0">{office.phone}</p>
                                  </div>
                                </Card.Body>
                              </Card>
                            </motion.div>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
            
            {/* Contact Form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-5"
            >
              <Card className="border-0 rounded-4 overflow-hidden" style={{
                ...glassStyle,
                background: 'linear-gradient(145deg, rgba(25, 35, 55, 0.6), rgba(15, 25, 45, 0.8))'
              }}>
                <Card.Body className="p-4 p-md-5">
                  <Row>
                    <Col lg={5} className="mb-4 mb-lg-0">
                      <div className="pe-lg-4">
                        <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                          Assistenza
                        </span>
                        <h2 className="fw-bold mb-4" style={appleStyle}>
                          Inviaci un <span style={gradientTextStyle}>messaggio</span>
                        </h2>
                        <p className="text-white-50 mb-4" style={{ fontWeight: 300 }}>
                          Compila il modulo per ricevere assistenza personalizzata dal nostro team di supporto.
                          Ti risponderemo entro 24 ore lavorative.
                        </p>
                        
                        <div className="d-flex align-items-center mb-4">
                          <div 
                            className="bg-info bg-opacity-15 rounded-circle d-flex align-items-center justify-content-center p-3 me-3"
                            style={{ 
                              minWidth: '60px', 
                              height: '60px'
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotateY: [0, 180, 360]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            >
                              <FaComments className="text-info" size={24} />
                            </motion.div>
                          </div>
                          <div>
                            <h5 className="fw-semibold mb-1">Chat dal vivo</h5>
                            <p className="text-white-50 mb-0" style={{ fontWeight: 300 }}>
                              Disponibile dal lunedì al venerdì, dalle 9:00 alle 18:00.
                            </p>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-center">
                          <div 
                            className="bg-success bg-opacity-15 rounded-circle d-flex align-items-center justify-content-center p-3 me-3"
                            style={{ 
                              minWidth: '60px', 
                              height: '60px'
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                            >
                              <FaSearchPlus className="text-success" size={24} />
                            </motion.div>
                          </div>
                          <div>
                            <h5 className="fw-semibold mb-1">Guida in linea</h5>
                            <p className="text-white-50 mb-0" style={{ fontWeight: 300 }}>
                              Esplora la nostra knowledge base per guide dettagliate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col lg={7}>
                      <AnimatePresence mode="wait">
                        {formSubmitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center p-5"
                          >
                            <motion.div 
                              className="bg-success bg-opacity-15 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                              animate={{
                                boxShadow: ['0 0 0px rgba(25, 135, 84, 0.3)', '0 0 30px rgba(25, 135, 84, 0.7)', '0 0 0px rgba(25, 135, 84, 0.3)']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                              style={{ width: '100px', height: '100px' }}
                            >
                              <FaCheckCircle className="text-success" size={50} />
                            </motion.div>
                            <h3 className="fw-bold mb-3">Messaggio Inviato!</h3>
                            <p className="text-white-50 mb-4">
                              Grazie per averci contattato. Riceverai una risposta dal nostro team di supporto entro 24 ore lavorative.
                            </p>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                variant="outline-light" 
                                className="rounded-pill px-4"
                                onClick={() => setFormSubmitted(false)}
                              >
                                Invia un altro messaggio
                              </Button>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <Col md={6} className="mb-3">
                                  <Form.Group controlId="formName">
                                    <Form.Label className="text-white-50">Nome completo</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      required
                                      className="bg-dark bg-opacity-50 border-0 text-white rounded-pill px-4 py-3"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <Form.Group controlId="formEmail">
                                    <Form.Label className="text-white-50">Email</Form.Label>
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                      className="bg-dark bg-opacity-50 border-0 text-white rounded-pill px-4 py-3"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              
                              <Row className="mb-3">
                                <Col md={6} className="mb-3 mb-md-0">
                                  <Form.Group controlId="formSubject">
                                    <Form.Label className="text-white-50">Oggetto</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="subject"
                                      value={formData.subject}
                                      onChange={handleInputChange}
                                      required
                                      className="bg-dark bg-opacity-50 border-0 text-white rounded-pill px-4 py-3"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group controlId="formCategory">
                                    <Form.Label className="text-white-50">Categoria</Form.Label>
                                    <Form.Select
                                      name="category"
                                      value={formData.category}
                                      onChange={handleInputChange}
                                      className="bg-dark bg-opacity-50 border-0 text-white rounded-pill px-4 py-3"
                                    >
                                      <option value="general">Informazioni Generali</option>
                                      <option value="technical">Supporto Tecnico</option>
                                      <option value="billing">Fatturazione</option>
                                      <option value="feature">Suggerimenti</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>
                              
                              <Form.Group className="mb-4" controlId="formMessage">
                                <Form.Label className="text-white-50">Messaggio</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  name="message"
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  required
                                  className="bg-dark bg-opacity-50 border-0 text-white rounded-4 px-4 py-3"
                                />
                              </Form.Group>
                              
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="privacyCheck"
                                    required
                                  />
                                  <label className="form-check-label text-white-50" htmlFor="privacyCheck">
                                    Ho letto e accetto la <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                                  </label>
                                </div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="rounded-pill px-4 py-3 fw-semibold"
                                  >
                                    Invia Messaggio <FaArrowRight className="ms-2" />
                                  </Button>
                                </motion.div>
                              </div>
                            </Form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>
          </Container>
        </section>
      </MainLayout>
    </div>
  );
};

export default SupportPage;