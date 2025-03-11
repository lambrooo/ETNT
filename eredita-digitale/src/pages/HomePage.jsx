import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaKey, 
  FaBox, 
  FaUserFriends, 
  FaLock, 
  FaChevronRight, 
  FaShieldAlt, 
  FaCloudUploadAlt, 
  FaRegLightbulb,
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaArrowRight,
  FaFileAlt,
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaCheck,
  FaQuestionCircle,
  FaStar,
  FaSpinner,
  FaHeart,
  FaPlay,
  FaChevronDown,
  FaQuoteLeft,
  FaQuoteRight,
  FaThumbsUp,
  FaWifi,
  FaTasks,
  FaChartLine,
  FaRocket,
  FaShieldVirus,
  FaHandshake,
  FaLaptopCode
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

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
      
      /* Testo chiaro migliorato con massima leggibilità */
      .text-white-70 {
        color: rgba(255, 255, 255, 0.95) !important;
      }
      
      .text-white-80 {
        color: rgba(255, 255, 255, 0.97) !important;
      }
      
      .text-white-85 {
        color: rgba(255, 255, 255, 0.98) !important;
      }
      
      .text-white-90 {
        color: rgba(255, 255, 255, 0.99) !important;
      }
      
      /* Assicuriamo che i link siano sempre visibili */
      a.text-white-70, a.text-white-80, a.text-white-85, a.text-white-90 {
        color: rgba(255, 255, 255, 0.99) !important;
      }
      
      /* Rendiamo visibilissimi i testi in piccole dimensioni */
      small.text-white-70, small.text-white-80, 
      small.text-white-85, small.text-white-90, 
      .small.text-white-70, .small.text-white-80,
      .small.text-white-85, .small.text-white-90 {
        color: rgba(255, 255, 255, 0.99) !important;
        font-weight: 400 !important;
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
              <p           className="text-white-90 small">Preparazione dell'eredità digitale...</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
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
          <div className="border-top border-white border-opacity-10 pt-4 text-center text-white">
            <Row className="mb-3">
              <Col md={4} className="mb-3 mb-md-0">
                <h5 className="text-white mb-3 fs-6">Links Rapidi</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2"><Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link></li>
                  <li className="mb-2"><Link to="/create-package" className="text-white text-decoration-none">Crea Pacchetto</Link></li>
                  <li><Link to="/contacts" className="text-white text-decoration-none">Gestisci Contatti</Link></li>
                </ul>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <h5 className="text-white mb-3 fs-6">Risorse</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2"><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
                  <li className="mb-2"><Link to="/support" className="text-white text-decoration-none">Supporto</Link></li>
                  <li><Link to="/privacy" className="text-white text-decoration-none">Privacy</Link></li>
                </ul>
              </Col>
              <Col md={4}>
                <h5 className="text-white mb-3 fs-6">Contatti</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2">support@etnt.com</li>
                  <li className="mb-2">Telefono: +39 123 456 7890</li>
                  <li className="d-flex justify-content-center gap-2 mt-2">
                    <Link to="#" className="text-white-90"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="#" className="text-white-90"><i className="fab fa-twitter"></i></Link>
                    <Link to="#" className="text-white-90"><i className="fab fa-instagram"></i></Link>
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

// Componente bottone video demo - migliorato con effetti più controllati
const VideoButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div
      className="d-inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Button 
        variant="light" 
        className="position-relative px-4 py-3 rounded-pill d-flex align-items-center"
        style={{
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <motion.div
          className="play-icon-container d-flex align-items-center justify-content-center me-2"
          style={{
            background: '#0d6efd',
            width: '32px',
            height: '32px',
            borderRadius: '50%'
          }}
          animate={{
            scale: isHovering ? [1, 1.2, 1] : 1
          }}
          transition={{
            duration: 0.8,
            repeat: isHovering ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <FaPlay className="text-white" size={12} />
        </motion.div>
        <span className="fw-medium">Guarda la demo</span>
        
        {/* Animazione di onda quando in hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="position-absolute"
              style={{
                inset: 0,
                background: 'rgba(13, 110, 253, 0.1)',
                zIndex: -1
              }}
              initial={{ scale: 0, opacity: 0.8, borderRadius: '50%' }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

// NUOVO: Card 3D migliorata con dimensioni perfette
const PackageCard3DImproved = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Dimensioni calibrate per allinearsi con elementi a sinistra
  const cardHeight = 530;
  const cardWidth = 340;
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    
    setRotateY(posX * 0.01);
    setRotateX(-posY * 0.01);
  };
  
  const handleMouseEnter = () => {
    setScale(1.02);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };
  
  // Stile per l'effetto glass
  const glassStyle = {
    background: 'rgba(25, 35, 55, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
  };
  
  // Contenuto del pacchetto
  const filesList = [
    { type: 'Documento', name: 'Testamento.pdf', icon: '📄', color: 'primary' },
    { type: 'Credenziali', name: 'Account bancario', icon: '🔐', color: 'warning' },
    { type: 'Foto', name: 'Album vacanze', icon: '🖼️', color: 'success' },
    { type: 'Video', name: 'Messaggio personale', icon: '🎬', color: 'danger' },
  ];

  // Componente per i file
  const FileItem = ({ file }) => (
    <div className="d-flex align-items-center mb-2">
      <div 
        className={`me-2 rounded-circle d-flex align-items-center justify-content-center bg-${file.color} bg-opacity-10`}
        style={{ 
          width: '28px', 
          height: '28px', 
          fontSize: '14px', 
          flexShrink: 0,
          border: `1px solid rgba(var(--bs-${file.color}-rgb), 0.2)`
        }}
      >
        {file.icon}
      </div>
      <div className="d-flex justify-content-between align-items-center w-100">
        <span 
          className="text-white text-truncate me-2" 
          style={{ 
            maxWidth: '130px',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={file.name}
        >
          {file.name}
        </span>
        <Badge 
          bg="dark"
          className="text-white-70 small ms-auto"
                            style={{ fontSize: '0.7rem', opacity: 0.99, flexShrink: 0 }}
        >
          {file.type}
        </Badge>
      </div>
    </div>
  );
  
  const infoBoxStyle = {
    borderRadius: '0.75rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '0.75rem',
    marginBottom: '0.75rem'
  };
  
  return (
    <div 
      className="card-3d-container position-relative mx-auto"
      style={{ 
        perspective: '1500px',
        width: cardWidth,
        height: cardHeight
      }}
    >
      <motion.div
        className="card-3d-wrapper"
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          transform: `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(${scale})
          `,
          transition: 'transform 0.1s'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ 
          rotateX: [0, 2, 0, -2, 0],
          rotateY: [0, 3, 0, -3, 0],
          y: [0, -5, 0, -3, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div 
          style={{ 
            ...glassStyle, 
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
          }} 
          className="position-relative text-start"
        >
          {/* Intestazione con badge */}
          <div className="position-relative mb-3" style={{ transform: 'translateZ(30px)' }}>
            {/* Badge Premium */}
            <div 
              style={{ 
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                transform: 'translateZ(40px)',
                zIndex: 20
              }}
            >
              <Badge 
                bg="primary" 
                className="px-3 py-2" 
                style={{ 
                  borderRadius: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                Premium
              </Badge>
            </div>
            
            {/* Badge Crittografia */}
            <div 
              style={{ 
                position: 'absolute',
                top: '-0.5rem',
                left: '-0.5rem',
                transform: 'translateZ(40px)',
                zIndex: 20
              }}
            >
              <Badge 
                bg="info" 
                className="px-3 py-2 d-flex align-items-center" 
                style={{ 
                  borderRadius: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <FaLock className="me-2" /> Crittografia avanzata
              </Badge>
            </div>
            
            {/* Intestazione pacchetto */}
            <div className="d-flex justify-content-between align-items-center mt-4 pt-1">
              <h3 className="fs-4 fw-semibold mb-1">Pacchetto Eredità Digitale</h3>
              <FaKey size={24} className="text-primary" style={{ filter: 'drop-shadow(0 2px 5px rgba(13, 110, 253, 0.5))' }} />
            </div>
            <div className="text-white-90 small mb-0">Creato: 15 Febbraio 2025</div>
          </div>
          
          {/* Contenuti del pacchetto */}
          <div style={{ transform: 'translateZ(20px)', flex: '1' }}>
            <div style={infoBoxStyle}>
              <div className="text-white-90 small mb-2 fw-medium">Contenuti</div>
              {filesList.map((file, index) => (
                <FileItem file={file} key={index} />
              ))}
            </div>
            
            {/* Sezione destinatari */}
            <div className="d-flex mb-2" style={{ transform: 'translateZ(25px)' }}>
              <div className="bg-light bg-opacity-10 rounded-circle p-2 me-3" style={{ flexShrink: 0 }}>
                <FaUserFriends className="text-light" />
              </div>
              <div>
                <div className="text-white-90 small">Destinatari</div>
                <div className="text-white fw-bold">3 persone</div>
              </div>
            </div>
            
            {/* Sezione sicurezza */}
            <div className="d-flex mb-3" style={{ transform: 'translateZ(30px)' }}>
              <div className="bg-light bg-opacity-10 rounded-circle p-2 me-3" style={{ flexShrink: 0 }}>
                <FaLock className="text-light" />
              </div>
              <div>
                <div className="text-white-90 small">Sicurezza</div>
                <div className="text-white fw-bold">Crittografia avanzata</div>
              </div>
            </div>
            
            {/* Badge documenti protetti */}
            <div className="mt-2 mb-3 text-center" style={{ transform: 'translateZ(20px)' }}>
              <Badge 
                bg="success" 
                className="px-3 py-2 d-flex align-items-center justify-content-center w-75 mx-auto" 
                style={{ 
                  borderRadius: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <FaFileAlt className="me-2" /> Documenti protetti
              </Badge>
            </div>
          </div>
          
          {/* Bottone CTA - Posizionato a fondo card */}
          <div 
            className="mt-auto" 
            style={{ 
              transform: 'translateZ(35px)', 
              position: 'relative', 
              zIndex: 30
            }}
          >
            <Link to="/dashboard" className="d-block w-100">
              <Button 
                variant="primary" 
                className="w-100 rounded-pill fw-medium py-2"
                style={{
                  border: 'none',
                  boxShadow: '0 5px 15px rgba(13, 110, 253, 0.3)'
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  Visualizza Dettagli <FaChevronRight size={12} className="ms-2" />
                </span>
              </Button>
            </Link>
          </div>
          
          {/* Effetto di profondità per il bordo */}
          <div 
            style={{ 
              position: 'absolute',
              inset: '0',
              borderRadius: '1.5rem',
              transform: 'translateZ(-10px) scale(1.05)',
              background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.2), rgba(0, 0, 0, 0))',
              border: '1px solid rgba(13, 110, 253, 0.15)',
              filter: 'blur(2px)',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      </motion.div>
    </div>
  );
};

// NUOVA: HeroSection migliorata con posizionamento corretto della card
const HeroSection = ({ onGetStarted }) => {
  // Stile per il gradiente del testo
  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #fff 30%, #e2e2e2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
  };
  
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };
  
  return (
    <section className="py-5 position-relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <RevealOnScroll direction="bottom" delay={0.3} duration={0.4}>
              <div className="text-start text-center-sm">
                <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-4 px-3 py-2 rounded-pill d-inline-block">
                  La tua presenza digitale, protetta per sempre
                </span>
                
                <h1 
                  className="display-2 fw-bold mb-4 mx-auto-sm" 
                  style={{ 
                    ...appleStyle, 
                    maxWidth: '800px',
                    ...gradientTextStyle
                  }}
                >
                  Il futuro del tuo patrimonio digitale è nelle tue mani
                </h1>
                
                <div className="title-marker mb-4 mx-auto-sm"></div>
                
                <                p className="lead text-white mb-5 mx-auto-sm" style={{ maxWidth: '550px', fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.6 }}>
                  Proteggi, organizza e trasferisci i tuoi beni digitali in modo 
                  <span className="text-white fw-normal"> sicuro e semplice</span>. Costruisci la tua eredità digitale con pochi clic.
                </p>
                
                <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start">
                  <Link to="/create-package">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg"
                        variant="primary" 
                        className="px-4 py-3 fw-semibold d-flex align-items-center"
                        style={{
                          borderRadius: '2rem',
                          minWidth: '160px',
                          boxShadow: '0 5px 15px rgba(13, 110, 253, 0.3)'
                        }}
                        onClick={onGetStarted}
                      >
                        Inizia ora 
                        <motion.div 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                          <FaArrowRight className="ms-2" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                  
                  <VideoButton />
                </div>
                
                <div className="d-flex align-items-center text-white-90 mt-4 small justify-content-center justify-content-lg-start">
                  <div className="d-flex me-4">
                    <FaShieldAlt className="me-2 text-primary" />
                    <span>100% Sicuro</span>
                  </div>
                  <div className="d-flex">
                    <FaLock className="me-2 text-primary" />
                    <span>Privacy Garantita</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </Col>
          
          <Col lg={6}>
            <RevealOnScroll direction="bottom" delay={0.5} duration={0.5}>
              {/* Nuovo contenitore per posizionamento corretto */}
              <div className="position-relative" style={{
                // Allineamento verticale preciso con testi a sinistra
                marginTop: '-40px',
                height: '600px', // Assicuriamo spazio sufficiente
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PackageCard3DImproved />
              </div>
            </RevealOnScroll>
          </Col>
        </Row>
        
        {/* Indicatore di scroll */}
        <div className="text-center mt-5 d-none d-lg-block">
          <motion.div 
            className="scroll-indicator mx-auto"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
              position: 'relative'
            }}
          >
            <motion.div 
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              animate={{ 
                y: [0, 20, 0],
                opacity: [1, 0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.div>
                      <                p className="text-white mb-0 small">Scorri per saperne di più</p>
        </div>
      </Container>
    </section>
  );
};

// NUOVA: Sezione "Esperienza senza confini" completamente rinnovata
const ExperienceSection = () => {
  const devices = [
    {
      id: 1,
      name: "Desktop",
      icon: <FaDesktop size={32} />,
      color: "primary",
      features: ["Dashboard completa", "Gestione avanzata", "Sicurezza premium"]
    },
    {
      id: 2,
      name: "Tablet",
      icon: <FaTabletAlt size={32} />,
      color: "info",
      features: ["Interfaccia adattiva", "Navigazione intuitiva", "Esperienza fluida"]
    },
    {
      id: 3,
      name: "Mobile",
      icon: <FaMobileAlt size={32} />,
      color: "success",
      features: ["Notifiche push", "Facile da usare", "Sempre con te"]
    }
  ];

  // Stile Apple per i titoli
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };
  
  return (
    <section className="py-5 my-5 position-relative overflow-hidden">
      {/* Effetti di sfondo */}
      <div className="position-absolute" style={{
        top: '10%',
        left: '5%',
        width: '40%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(13, 202, 240, 0.08) 0%, rgba(13, 202, 240, 0) 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div className="position-absolute" style={{
        bottom: '10%',
        right: '5%',
        width: '30%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(13, 110, 253, 0.08) 0%, rgba(13, 110, 253, 0) 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <RevealOnScroll direction="bottom" duration={0.4}>
          <div className="text-center mb-5">
            <span className="badge bg-info bg-opacity-10 text-info fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
              Perfetto su ogni dispositivo
            </span>
            <h2 className="display-4 fw-bold mb-3" style={appleStyle}>
              Esperienza senza confini
            </h2>
                                <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontWeight: 400 }}>
              Accedi alla tua eredità digitale da qualsiasi dispositivo, in qualsiasi momento
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Nuova sezione devices */}
        <div className="row g-4 position-relative">
          {devices.map((device, index) => (
            <div className="col-md-4" key={device.id}>
              <RevealOnScroll 
                direction="bottom"
                delay={0.1 * index} 
                duration={0.4}
              >
                <motion.div
                  whileHover={{ 
                    y: -15,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="h-100"
                >
                  <div className="glass-premium p-4 text-center rounded-4 border border-opacity-10 border-light h-100 d-flex flex-column position-relative overflow-hidden">
                    {/* Effetto glow */}
                    <div className="position-absolute" style={{
                      top: '-50px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle, rgba(var(--bs-${device.color}-rgb), 0.15) 0%, rgba(var(--bs-${device.color}-rgb), 0) 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(30px)',
                      pointerEvents: 'none'
                    }}></div>
                    
                    {/* Device icon con animazione */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0], 
                        scale: [1, 1.05, 1] 
                      }}
                      transition={{ 
                        duration: 3 + index, 
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                      className={`bg-${device.color} bg-opacity-10 rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4`}
                      style={{ 
                        width: '100px', 
                        height: '100px',
                        boxShadow: `0 15px 30px -10px rgba(var(--bs-${device.color}-rgb), 0.3)`
                      }}
                    >
                      <div className={`text-${device.color}`}>{device.icon}</div>
                    </motion.div>
                    
                    {/* Device name */}
                    <h3 className="fw-bold mb-3">{device.name}</h3>
                    
                    {/* Features */}
                    <div className="mt-3">
                      {device.features.map((feature, i) => (
                        <div key={i} className="d-flex align-items-center mb-2 justify-content-center">
                          <div className={`text-${device.color} me-2`}>
                            <FaCheck size={12} />
                          </div>
                          <span className="text-white-90">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mockup device visualization */}
                    <div className="mt-auto pt-4">
                      <div 
                        className="border border-light border-opacity-10 rounded-3 p-2 mx-auto"
                        style={{
                          width: '80%',
                          background: 'rgba(255, 255, 255, 0.03)',
                          boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        <div className="d-flex justify-content-between mb-2">
                          <div className="bg-white bg-opacity-50 rounded-pill" style={{height: '4px', width: '30%'}}></div>
                          <div className="bg-white bg-opacity-20 rounded-pill" style={{height: '4px', width: '15%'}}></div>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <div className="bg-white bg-opacity-20 rounded-pill" style={{height: '4px', width: '40%'}}></div>
                          <div className="bg-white bg-opacity-50 rounded-pill" style={{height: '4px', width: '25%'}}></div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="bg-white bg-opacity-30 rounded-pill" style={{height: '4px', width: '35%'}}></div>
                          <div className="bg-white bg-opacity-30 rounded-pill" style={{height: '4px', width: '35%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connessione */}
                    <div className="mt-3 position-relative">
                      <Badge 
                        bg={device.color} 
                        className="position-relative px-3 py-2" 
                        style={{ 
                          borderRadius: '1rem',
                          boxShadow: `0 5px 15px rgba(var(--bs-${device.color}-rgb), 0.2)`
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div 
                            className="me-2 rounded-circle bg-white" 
                            style={{
                              width: '6px',
                              height: '6px',
                              boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)'
                            }}
                          ></div>
                          <span>Connesso</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
        
        {/* Linea di connessione tra i dispositivi */}
        <div className="position-absolute" style={{
          top: '50%',
          left: '15%',
          right: '15%',
          height: '3px',
          background: 'linear-gradient(90deg, rgba(13, 110, 253, 0.3), rgba(13, 202, 240, 0.3), rgba(25, 135, 84, 0.3))',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <motion.div
            animate={{ 
              x: ['0%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '50px',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))'
            }}
          />
        </div>
      </Container>
    </section>
  );
};

// Componente migliorato per le feature cards
const FeatureCard = ({ feature, index }) => {
  return (
    <Col md={6} key={feature.id}>
      <RevealOnScroll 
        direction="bottom"
        delay={0.1 * index} 
        duration={0.4}
      >
        <motion.div
          whileHover={{ 
            scale: 1.03, 
            y: -8,
            transition: { duration: 0.2 } 
          }}
          className="h-100"
        >
          <div className="glass-premium p-4 h-100 rounded-4 border border-opacity-25 border-light position-relative overflow-hidden">
            {/* Premium background gradient effect */}
            <div className="position-absolute" style={{
              top: index % 2 === 0 ? '-80px' : 'auto',
              bottom: index % 2 === 1 ? '-80px' : 'auto',
              left: index % 2 === 0 ? '-30px' : 'auto',
              right: index % 2 === 1 ? '-30px' : 'auto',
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, rgba(${getColorCode(feature.colorCode)}, 0.15) 0%, rgba(${getColorCode(feature.colorCode)}, 0) 70%)`,
              borderRadius: '50%',
              filter: 'blur(30px)',
              zIndex: 0
            }}></div>
            
            <div className="position-relative z-2">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center p-3 me-3"
                  style={{ 
                    background: `rgba(${getColorCode(feature.colorCode)}, 0.15)`,
                    boxShadow: `0 8px 16px -4px rgba(${getColorCode(feature.colorCode)}, 0.2)`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="fw-semibold text-white mb-0" style={{ fontSize: '1.4rem' }}>
                  {feature.title}
                </h3>
              </div>
              <p className="text-white mb-0" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>
      </RevealOnScroll>
    </Col>
  );
};

// Componente migliorato per le card dei passi
const StartWithCard = ({ card, index }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4" key={card.id}>
      <RevealOnScroll 
        direction="bottom"
        delay={0.1 * index} 
        duration={0.4}
      >
        <motion.div
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            transition: { duration: 0.2 } 
          }}
          className="h-100"
        >
          <Link to={card.link} className="text-decoration-none">
            <div className="glass-premium h-100 text-white border-0 overflow-hidden text-center text-lg-start rounded-4 position-relative">
              {/* Premium glow effect */}
              <div className="position-absolute" style={{
                top: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, rgba(${getColorCode(card.color)}, 0.15) 0%, rgba(${getColorCode(card.color)}, 0) 70%)`,
                borderRadius: '50%',
                filter: 'blur(30px)',
                zIndex: 0
              }}></div>
              
              {/* Premium top border */}
              <div className="position-relative">
                <div className={`bg-${card.color} rounded-top-4`} style={{ 
                  height: '6px',
                  background: `linear-gradient(90deg, rgba(${getColorCode(card.color)}, 0.8), rgba(${getColorCode(card.color)}, 0.4))`
                }}></div>
                
                <Card.Body className="p-4 position-relative z-2">
                  <div 
                    className={`bg-${card.color} bg-opacity-15 rounded-circle d-flex align-items-center justify-content-center mb-4 mx-auto mx-lg-0`} 
                    style={{ 
                      width: '70px', 
                      height: '70px',
                      boxShadow: `0 8px 20px rgba(${getColorCode(card.color)}, 0.2)`
                    }}
                  >
                    {card.icon}
                  </div>
                  
                  <Card.Title className="fw-semibold mb-3" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 600 }}>
                    {card.title}
                  </Card.Title>
                  
                  <Card.Text className="text-white mb-4" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                    {card.description}
                  </Card.Text>
                  
                  <motion.div
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className={`text-${card.color} d-flex align-items-center justify-content-center justify-content-lg-start fw-medium`}>
                      <span className="me-2">Scopri di più</span>
                      <motion.div 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                      >
                        <FaArrowRight size={14} />
                      </motion.div>
                    </div>
                  </motion.div>
                </Card.Body>
              </div>
            </div>
          </Link>
        </motion.div>
      </RevealOnScroll>
    </div>
  );
};

// Set esteso di testimonials
const allTestimonials = [
  {
    id: 1,
    quote: "Ho trovato finalmente tranquillità sapendo che i miei cari potranno accedere ai miei documenti importanti quando ne avranno bisogno. L'interfaccia è incredibilmente intuitiva.",
    author: "Marco Bianchi",
    role: "Professionista IT",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 2,
    quote: "Come avvocato, consiglio ETNT a tutti i miei clienti. La sicurezza è impeccabile e il sistema di gestione dei contatti è estremamente flessibile e conforme alle normative vigenti.",
    author: "Laura Verdi",
    role: "Avvocato",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 3,
    quote: "Ho configurato tutto il mio patrimonio digitale in meno di un'ora. La possibilità di personalizzare pacchetti diversi per familiari diversi è geniale.",
    author: "Paolo Rossi",
    role: "Imprenditore",
    avatar: "/api/placeholder/50/50",
    rating: 4,
    verified: true
  },
  {
    id: 4,
    quote: "Il processo di designazione dei contatti fidati è intuitivo e sicuro. Mi sento finalmente sollevato sapendo che ho pianificato in anticipo per la mia eredità digitale.",
    author: "Anna Neri",
    role: "Consulente Finanziario",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 5,
    quote: "Finalmente un servizio che prende sul serio la privacy. Ogni aspetto di ETNT è stato progettato pensando alla sicurezza, e si nota in ogni dettaglio dell'interfaccia.",
    author: "Roberto Marino",
    role: "Esperto di Cybersecurity",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 6,
    quote: "La funzionalità di creazione dei pacchetti è incredibilmente flessibile. Posso decidere esattamente quali dati condividere con quali persone, e quando.",
    author: "Giulia Esposito",
    role: "Manager",
    avatar: "/api/placeholder/50/50",
    rating: 4,
    verified: true
  },
  {
    id: 7,
    quote: "L'esperienza mobile è eccezionale. Posso aggiornare i miei pacchetti e gestire i contatti ovunque mi trovi, con la stessa facilità della versione desktop.",
    author: "Stefano Conti",
    role: "Sviluppatore Mobile",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 8,
    quote: "Dopo una perdita in famiglia, ho capito quanto sia importante pianificare la propria eredità digitale. ETNT ha reso questo processo non solo semplice, ma anche confortevole.",
    author: "Martina Rizzo",
    role: "Insegnante",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 9,
    quote: "L'assistenza clienti è straordinaria. Hanno risposto a tutte le mie domande in meno di un'ora e mi hanno guidato passo dopo passo nell'impostazione del mio primo pacchetto.",
    author: "Luca Ferrari",
    role: "Architetto",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 10,
    quote: "Uso ETNT non solo per me, ma anche per aiutare i miei genitori anziani a organizzare la loro eredità digitale. L'interfaccia è così intuitiva che anche loro possono usarla facilmente.",
    author: "Chiara Bonfiglio",
    role: "Operatore Sanitario",
    avatar: "/api/placeholder/50/50",
    rating: 4,
    verified: true
  },
  {
    id: 11,
    quote: "Ho confrontato diverse soluzioni per la gestione dell'eredità digitale e ETNT è nettamente superiore in termini di facilità d'uso e sicurezza.",
    author: "Antonio Moretti",
    role: "Analista di Sistemi",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  },
  {
    id: 12,
    quote: "La funzionalità di verifica dell'identità per i beneficiari è brillante. Mi dà la tranquillità di sapere che solo le persone giuste avranno accesso ai miei dati.",
    author: "Elena Vinci",
    role: "Responsabile HR",
    avatar: "/api/placeholder/50/50",
    rating: 5,
    verified: true
  }
];

// Nuova sezione Testimonials premium con selezione casuale
const TestimonialsSection = () => {
  // Utilizziamo useState per mantenere i testimonial selezionati casualmente al caricamento della pagina
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  
  // Seleziona 3 testimonial casuali al caricamento del componente
  useEffect(() => {
    // Funzione per selezionare n elementi casuali da un array
    const getRandomItems = (arr, n) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };
    
    // Seleziona 3 testimonial casuali
    setDisplayedTestimonials(getRandomItems(allTestimonials, 3));
  }, []);
  
  // Stili Apple per i titoli
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };
  
  // Stile per il gradiente del testo
  const gradientText = {
    background: 'linear-gradient(90deg, #2196f3, #a56eff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    display: 'inline-block'
  };
  
  return (
    <section className="py-5 my-5">
      <Container>
        <RevealOnScroll direction="bottom" duration={0.4}>
          <div className="text-center mb-5">
            <span className="badge bg-success bg-opacity-10 text-success fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
              Opinioni dei clienti
            </span>
            <h2 className="display-4 fw-bold mb-3" style={appleStyle}>
              La <span style={gradientText}>fiducia</span> dei nostri utenti
            </h2>
            <p className="lead text-white-70 mb-0 mx-auto" style={{ maxWidth: '650px', fontWeight: 300 }}>
              Scopri cosa pensano le persone che hanno già scelto ETNT per proteggere la loro eredità digitale
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Testimonial cards */}
        <Row className="g-4">
          {displayedTestimonials.map((testimonial, index) => (
            <Col lg={4} md={6} key={testimonial.id}>
              <RevealOnScroll 
                direction="bottom"
                delay={0.1 * index} 
                duration={0.4}
              >
                <motion.div
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                    transition: { duration: 0.2 } 
                  }}
                  className="h-100"
                >
                  <div className="glass-premium h-100 rounded-4 p-4 position-relative overflow-hidden">
                    {/* Premium subtle glow effect */}
                    <div className="position-absolute" style={{
                      top: '-50px',
                      right: '-50px',
                      width: '120px',
                      height: '120px',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      zIndex: 0
                    }}></div>
                    
                    <div className="position-relative z-2">
                      {/* Rating stars */}
                      <div className="d-flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonial.rating ? "text-warning" : "text-white"} 
                            size={16}
                          />
                        ))}
                        {testimonial.verified && (
                          <span className="ms-2 text-primary d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
                            <FaCheck className="me-1" /> Verificato
                          </span>
                        )}
                      </div>
                      
                      {/* Quote */}
                      <div className="mb-4 text-white" style={{ fontStyle: 'italic', lineHeight: 1.6, fontWeight: 400 }}>
                        <FaQuoteLeft className="text-primary opacity-50 me-2" size={16} />
                        {testimonial.quote}
                        <FaQuoteRight className="text-primary opacity-50 ms-2" size={16} />
                      </div>
                      
                      {/* User info */}
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle overflow-hidden me-3" style={{ width: '50px', height: '50px' }}>
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="w-100 h-100 object-fit-cover"
                          />
                        </div>
                        <div>
                          <h6 className="mb-1 fw-semibold text-white">{testimonial.author}</h6>
                          <p className="mb-0 text-white small">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Helper function per ottenere codici colore
const getColorCode = (color) => {
  switch(color) {
    case 'primary': return '13, 110, 253';
    case 'success': return '25, 135, 84';
    case 'info': return '13, 202, 240';
    case 'warning': return '255, 193, 7';
    case 'danger': return '220, 53, 69';
    case 'purple': return '165, 110, 255';
    default: return '13, 110, 253';
  }
};

const HomePage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  
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
  
  // Parallax effects - enhanced for premium feel
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 100]);
  const backgroundScale = useTransform(scrollY, [0, 2000], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollY, [0, 1000], [0.85, 0.95]);
  const backgroundBlur = useTransform(scrollY, [0, 2000], [0, 3]);
  
  // Gestisce lo scroll nelle sezioni orizzontali
  const handleScroll = (index) => {
    setActiveScrollIndex(index);
  };
  
  // Le card per "Inizia con"
  const startWithCards = [
    {
      id: 1,
      title: 'Crea il tuo primo pacchetto',
      description: 'Inizia a organizzare i tuoi documenti digitali, password e file preziosi',
      icon: <FaBox className="text-primary" size={24} />,
      link: '/create-package',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Aggiungi i tuoi contatti',
      description: 'Seleziona le persone fidate che potranno accedere alla tua eredità digitale',
      icon: <FaUserFriends className="text-purple" size={24} />,
      link: '/contacts',
      color: 'purple'
    },
    {
      id: 3,
      title: 'Configura la sicurezza',
      description: 'Imposta le opzioni di protezione per i tuoi dati sensibili',
      icon: <FaLock className="text-success" size={24} />,
      link: '/settings',
      color: 'success'
    }
  ];
  
  // Features 
  const features = [
    {
      id: 1,
      title: 'Pacchetti personalizzati',
      description: 'Crea diversi pacchetti per differenti tipi di contenuti e destinatari',
      icon: <FaBox className="text-warning" size={36} />,
      colorCode: 'warning'
    },
    {
      id: 2,
      title: 'Sicurezza avanzata',
      description: 'Crittografia end-to-end per proteggere i tuoi dati più sensibili',
      icon: <FaShieldAlt className="text-primary" size={36} />,
      colorCode: 'primary'
    },
    {
      id: 3,
      title: 'Facilità di accesso',
      description: 'Processi semplificati per garantire che i tuoi eredi possano accedere ai dati',
      icon: <FaRegLightbulb className="text-info" size={36} />,
      colorCode: 'info'
    },
    {
      id: 4,
      title: 'Integrazione con servizi cloud',
      description: 'Collega i tuoi account cloud per un trasferimento facilitato',
      icon: <FaCloudUploadAlt className="text-success" size={36} />,
      colorCode: 'success'
    }
  ];

  // Stile glass migliorato
  const glassStyle = {
    background: 'rgba(25, 35, 55, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
  };
  
  const gradientText = {
    background: 'linear-gradient(90deg, #2196f3, #a56eff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    display: 'inline-block'
  };
  
  // Stile Apple per i titoli
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
        {/* SEZIONE AGGIORNATA: Hero Section con card migliorata */}
        <HeroSection onGetStarted={() => {}} />
        
        {/* SEZIONE AGGIORNATA: "Esperienza senza confini" completamente rinnovata */}
        <ExperienceSection />
        
        {/* Sezione "Inizia con" - Stile Apple */}
        <section className="py-5 my-5">
          <Container>
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div className="text-center mb-5">
                <span className="badge bg-success bg-opacity-10 text-success fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                  Semplice e intuitivo
                </span>
                <h2 className="display-4 fw-bold mb-3" style={appleStyle}>Bastano pochi passi</h2>
                <p className="lead text-white mb-0 mx-auto" style={{ maxWidth: '650px', fontWeight: 400 }}>
                  Proteggi la tua eredità digitale in modo semplice e veloce
                </p>
              </div>
            </RevealOnScroll>
            
            {/* Scroll container migliorato per mobile */}
            <div className="scroll-container">
              <div className="scroll-x-on-mobile row g-4">
                {startWithCards.map((card, index) => (
                  <StartWithCard card={card} index={index} key={card.id} />
                ))}
              </div>
              
              {/* Indicatori scroll per mobile */}
              <div className="scroll-indicator-container d-md-none">
                {startWithCards.map((_, index) => (
                  <div 
                    key={index} 
                    className={`scroll-indicator ${activeScrollIndex === index ? 'active' : ''}`}
                    onClick={() => handleScroll(index)}
                  ></div>
                ))}
              </div>
            </div>
          </Container>
        </section>
        
        {/* Sezione caratteristiche - Stile Apple */}
        <section className="py-5 my-5">
          <Container>
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div className="text-center mb-5">
                <span className="badge bg-info bg-opacity-10 text-info fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                  Funzionalità esclusive
                </span>
                <h2 className="display-4 fw-bold mb-3" style={appleStyle}>
                  Perché scegliere <span style={gradientText}>ETNT</span>
                </h2>
                <p className="lead text-white mx-auto" style={{ maxWidth: '650px', fontWeight: 400 }}>
                  La nostra piattaforma offre strumenti avanzati per la gestione sicura del tuo patrimonio digitale
                </p>
              </div>
            </RevealOnScroll>
            
            <Row className="g-4 row-compact">
              {features.map((feature, index) => (
                <FeatureCard feature={feature} index={index} key={feature.id} />
              ))}
            </Row>
          </Container>
        </section>
        
        {/* Sezione Testimonials con selezione casuale */}
        <TestimonialsSection />
        
        {/* Call to action finale - Stile Apple */}
        <section className="py-5 my-5">
          <Container>
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div className="glass-premium p-5 text-center position-relative overflow-hidden rounded-4">
                {/* Effetti luminosi */}
                <div className="position-absolute" style={{
                  top: '-120px',
                  left: '10%',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(13,110,253,0.2) 0%, rgba(13,110,253,0) 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }}></div>
                
                <div className="position-absolute" style={{
                  bottom: '-100px',
                  right: '10%',
                  width: '250px',
                  height: '250px',
                  background: 'radial-gradient(circle, rgba(165,110,255,0.2) 0%, rgba(165,110,255,0) 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }}></div>
                
                <div className="position-relative">
                  <RevealOnScroll direction="bottom" delay={0.1} duration={0.3}>
                    <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                      Inizia oggi
                    </span>
                  </RevealOnScroll>
                  
                  <RevealOnScroll direction="bottom" delay={0.15} duration={0.3}>
                    <h2 className="display-4 fw-bold mb-4" style={appleStyle}>
                      Proteggi il tuo <span style={gradientText}>futuro digitale</span>
                    </h2>
                  </RevealOnScroll>
                  
                  <RevealOnScroll direction="bottom" delay={0.2} duration={0.3}>
                    <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontWeight: 400 }}>
                      Non lasciare che i tuoi beni digitali vadano persi. Inizia oggi a costruire la tua eredità digitale.
                    </p>
                  </RevealOnScroll>
                  
                  <RevealOnScroll direction="bottom" delay={0.25} duration={0.3}>
                    <Link to="/create-package">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          size="lg" 
                          variant="primary" 
                          className="px-5 py-3 fw-semibold d-flex align-items-center mx-auto"
                          style={{
                            borderRadius: '2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            minWidth: '260px',
                            boxShadow: '0 10px 25px rgba(13, 110, 253, 0.4)'
                          }}
                        >
                          <FaHeart className="me-2" />
                          Crea il tuo primo pacchetto
                          <FaChevronRight className="ms-2" />
                        </Button>
                      </motion.div>
                    </Link>
                  </RevealOnScroll>
                </div>
              </div>
            </RevealOnScroll>
          </Container>
        </section>
      </MainLayout>
    </div>
  );
};

export default HomePage;