import React, { useEffect, useState, useRef } from 'react';
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

// PrivacyPage Component
const PrivacyPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Punti della privacy policy
  const privacyPoints = [
    {
      id: 1,
      title: "Raccolta Dati",
      description: "Raccogliamo solo i dati essenziali per offrirti i nostri servizi. Questi includono i tuoi dati di contatto, i contenuti che carichi nei pacchetti di eredità digitale e le informazioni sui destinatari. I tuoi dati sono crittografati e protetti con i più alti standard di sicurezza.",
      icon: <FaShieldAlt className="text-primary" size={24} />
    },
    {
      id: 2,
      title: "Utilizzo dei Dati",
      description: "I tuoi dati vengono utilizzati esclusivamente per gestire il servizio ETNT. Non condividiamo mai i tuoi dati con terze parti, né li utilizziamo per scopi di marketing senza il tuo esplicito consenso.",
      icon: <FaLock className="text-primary" size={24} />
    },
    {
      id: 3,
      title: "Controllo dell'Utente",
      description: "Hai sempre il pieno controllo sui tuoi dati. Puoi modificare, esportare o eliminare i tuoi dati in qualsiasi momento. La nostra piattaforma è progettata per garantire la massima trasparenza e controllo.",
      icon: <FaUserFriends className="text-primary" size={24} />
    },
    {
      id: 4,
      title: "Sicurezza",
      description: "Utilizziamo la crittografia end-to-end per proteggere i tuoi dati. I nostri sistemi sono regolarmente sottoposti a test di sicurezza e audit per garantire la protezione dei tuoi dati contro accessi non autorizzati.",
      icon: <FaKey className="text-primary" size={24} />
    }
  ];
  
  // FAQ sulla privacy
  const privacyFaq = [
    {
      id: 1,
      question: "Chi può accedere ai miei pacchetti di eredità digitale?",
      answer: "Solo i destinatari che hai specificamente designato possono accedere ai tuoi pacchetti, e solo dopo che le condizioni di trasferimento sono state verificate. Puoi gestire le autorizzazioni per ogni singolo contatto."
    },
    {
      id: 2,
      question: "Come viene verificato il mio decesso?",
      answer: "Il nostro sistema richiede la conferma da parte di più contatti fidati che hai designato. In alternativa, i tuoi eredi possono fornire documentazione ufficiale come un certificato di morte."
    },
    {
      id: 3,
      question: "I miei dati sono al sicuro?",
      answer: "Assolutamente. Utilizziamo la crittografia end-to-end e adottiamo rigorose misure di sicurezza per proteggere tutti i dati archiviati nella nostra piattaforma."
    },
    {
      id: 4,
      question: "Posso modificare o eliminare i contenuti del mio pacchetto?",
      answer: "Sì, hai il pieno controllo sui contenuti dei tuoi pacchetti. Puoi aggiungere, modificare o eliminare qualsiasi elemento in qualsiasi momento."
    },
    {
      id: 5,
      question: "Chi ha accesso alle mie informazioni all'interno di ETNT?",
      answer: "Nessuno ha accesso ai contenuti specifici dei tuoi pacchetti, nemmeno il nostro team. Abbiamo accesso solo ai metadati necessari per gestire il servizio, come i dettagli dell'account e le statistiche di utilizzo."
    }
  ];
  
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
        <section className="py-5">
          <Container>
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div className="text-center mb-5">
                <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                  Sicurezza & Privacy
                </span>
                <h1 className="display-4 fw-bold mb-3" style={appleStyle}>
                  Informativa sulla <span style={gradientTextStyle}>Privacy</span>
                </h1>
                <p className="lead text-white-50 mb-5 mx-auto" style={{ maxWidth: '650px', fontWeight: 300 }}>
                  La tua privacy è la nostra priorità. Scopri come proteggiamo i tuoi dati e rispettiamo la tua riservatezza.
                </p>
              </div>
            </RevealOnScroll>
            
            {/* Sezione principale della privacy policy */}
            <Row className="mb-5">
              <Col lg={8} className="mx-auto">
                <RevealOnScroll direction="bottom" delay={0.1} duration={0.5}>
                  <Card className="glass-premium p-4 mb-4">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-4">
                        <motion.div 
                          className="bg-primary bg-opacity-10 rounded-circle p-3 me-3"
                          animate={{
                            boxShadow: ['0 0 0px rgba(13, 110, 253, 0.2)', '0 0 20px rgba(13, 110, 253, 0.5)', '0 0 0px rgba(13, 110, 253, 0.2)']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <FaShieldAlt className="text-primary" size={24} />
                          </motion.div>
                        </motion.div>
                        <div>
                          <h2 className="mb-0 fs-3" style={appleStyle}>La nostra filosofia sulla privacy</h2>
                        </div>
                      </div>
                      
                      <p className="text-white-50 mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        In ETNT, crediamo che la privacy sia un diritto fondamentale. Gestendo dati sensibili e memorie preziose, prendiamo molto sul serio la protezione dei tuoi dati. La nostra filosofia è semplice: i tuoi dati appartengono a te, e solo tu decidi chi può accedervi e quando.
                      </p>
                      
                      <p className="text-white-50" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Ogni aspetto della nostra piattaforma è progettato con la privacy come considerazione principale, dalla crittografia end-to-end alla gestione granulare dei permessi dei tuoi contatti.
                      </p>
                    </Card.Body>
                  </Card>
                </RevealOnScroll>
                
                {/* Card dei punti principali della privacy */}
                {privacyPoints.map((point, index) => (
                  <RevealOnScroll key={point.id} direction="bottom" delay={0.1 * (index + 1)} duration={0.5}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Card className="glass-premium p-4 mb-4">
                        <Card.Body>
                          <div className="d-flex align-items-center mb-3">
                            <motion.div 
                              className="bg-primary bg-opacity-10 rounded-circle p-3 me-3"
                              animate={{
                                scale: [1, 1.05, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: index * 0.5
                              }}
                            >
                              {point.icon}
                            </motion.div>
                            <h3 className="mb-0 fs-4" style={appleStyle}>{point.title}</h3>
                          </div>
                          <p className="text-white-50 mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                            {point.description}
                          </p>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </Col>
            </Row>
            
            {/* Sezione FAQ sulla privacy */}
            <Row className="mb-5">
              <Col lg={8} className="mx-auto">
                <RevealOnScroll direction="bottom" duration={0.5}>
                  <h2 className="text-center text-white mb-4 fs-1" style={appleStyle}>
                    Domande frequenti sulla <span style={gradientTextStyle}>privacy</span>
                  </h2>
                  
                  <Accordion className="mb-4">
                    {privacyFaq.map((faq, index) => (
                      <RevealOnScroll key={faq.id} direction="bottom" delay={0.1 * index} duration={0.3}>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Accordion.Item 
                            eventKey={faq.id.toString()}
                            className="mb-3 overflow-hidden"
                            style={{ 
                              background: 'rgba(25, 35, 55, 0.7)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '1rem'
                            }}
                          >
                            <Accordion.Header className="border-0">
                              <div className="d-flex align-items-center py-2">
                                <motion.div
                                  animate={{ rotate: [-3, 3, -3] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.3 }}
                                  className="me-3"
                                >
                                  <FaQuestionCircle className="text-primary" />
                                </motion.div>
                                <span className="text-white">{faq.question}</span>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body className="text-white-50 border-top border-white border-opacity-10 pt-3">
                              {faq.answer}
                            </Accordion.Body>
                          </Accordion.Item>
                        </motion.div>
                      </RevealOnScroll>
                    ))}
                  </Accordion>
                </RevealOnScroll>
                
                {/* Note legali */}
                <RevealOnScroll direction="bottom" delay={0.3} duration={0.5}>
                  <Card 
                    className="mb-4 border-0"
                    style={{ 
                      background: 'rgba(25, 35, 55, 0.5)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <motion.div 
                          className="bg-primary bg-opacity-10 rounded-circle p-2 me-3"
                          animate={{
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity
                          }}
                        >
                          <FaFileAlt className="text-primary" />
                        </motion.div>
                        <h3 className="mb-0 fs-5">Note legali</h3>
                      </div>
                      <p className="text-white-50 small mb-0">
                        Questa informativa sulla privacy è stata aggiornata il 15 febbraio 2025. Ci riserviamo il diritto di apportare modifiche a questa informativa in qualsiasi momento, notificandoti eventuali modifiche sostanziali. L'uso continuato di ETNT dopo eventuali modifiche costituisce l'accettazione delle stesse. Per qualsiasi domanda sulla nostra informativa sulla privacy, contattaci all'indirizzo privacy@etnt.com.
                      </p>
                    </Card.Body>
                  </Card>
                </RevealOnScroll>
              </Col>
            </Row>
            
            {/* Call to action */}
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <RevealOnScroll direction="bottom" delay={0.4} duration={0.5}>
                  <motion.div
                    whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Card 
                      className="glass-premium p-4 border-0"
                      style={{ 
                        borderRadius: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg, rgba(25, 35, 55, 0.6), rgba(25, 35, 55, 0.8))'
                      }}
                    >
                      {/* Effetti luminosi */}
                      <motion.div 
                        className="position-absolute" 
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{ 
                          top: '-50px', 
                          left: '30%', 
                          width: '40%', 
                          height: '100px',
                          background: 'radial-gradient(circle, rgba(13,110,253,0.2) 0%, rgba(13,110,253,0) 70%)',
                          filter: 'blur(30px)',
                          pointerEvents: 'none'
                        }}
                      />
                      
                      <Card.Body className="p-4">
                        <h3 className="text-white mb-3" style={appleStyle}>Hai domande sulla privacy?</h3>
                        <p className="text-white-50 mb-4">
                          Il nostro team dedicato è a tua disposizione per aiutarti con qualsiasi domanda o preoccupazione sulla privacy dei tuoi dati.
                        </p>
                        <Link to="/support">
                          <motion.button
                            className="btn btn-primary rounded-pill px-4 py-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Contatta il Supporto <FaChevronRight className="ms-2" size={12} />
                          </motion.button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </RevealOnScroll>
              </Col>
            </Row>
          </Container>
        </section>
      </MainLayout>
    </div>
  );
};

export default PrivacyPage;