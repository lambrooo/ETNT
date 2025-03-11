import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaKey, 
  FaLock, 
  FaUserFriends, 
  FaBox, 
  FaCloudUploadAlt,
  FaArrowRight,
  FaChevronDown,
  FaFileAlt,
  FaSpinner,
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaChevronRight,
  FaShieldAlt,
  FaRegLightbulb
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

// GlobalStyles component for consistency
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

      /* Custom accordion styles */
      .custom-accordion .accordion-button {
        background-color: transparent;
        box-shadow: none;
        color: white;
        padding: 1rem 1.5rem;
      }

      .custom-accordion .accordion-button:not(.collapsed) {
        background-color: rgba(255, 255, 255, 0.03);
        color: white;
      }

      .custom-accordion .accordion-button:focus {
        box-shadow: none;
        border-color: rgba(255, 255, 255, 0.1);
      }

      .custom-accordion .accordion-button::after {
        display: none;
      }

      .custom-accordion .accordion-icon {
        transition: transform 0.3s ease;
      }

      .custom-accordion .accordion-button:not(.collapsed) .accordion-icon {
        transform: rotate(180deg);
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

const FaqPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
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

  // FAQ data with categories
  const faqItems = [
    {
      id: 1,
      question: "Cos'è ETNT e come funziona?",
      answer: "ETNT (Eternity) è una piattaforma che ti consente di organizzare, proteggere e trasferire la tua eredità digitale. Puoi creare pacchetti personalizzati che contengono foto, password, documenti e altri contenuti digitali, specificando chi potrà accedervi in futuro. La piattaforma garantisce che i tuoi ricordi e dati importanti vengano trasferiti ai tuoi cari secondo le tue volontà.",
      category: "general"
    },
    {
      id: 2,
      question: "I miei dati sono al sicuro?",
      answer: "Assolutamente. La sicurezza è la nostra priorità. Utilizziamo la crittografia end-to-end per proteggere tutti i tuoi dati sensibili. I pacchetti digitali vengono archiviati in modo sicuro e possono essere aperti solo dai destinatari designati. Il nostro sistema è progettato per rispettare tutte le normative sulla privacy, incluso il GDPR.",
      category: "security"
    },
    {
      id: 3,
      question: "Che tipo di contenuti posso includere nei miei pacchetti digitali?",
      answer: "Puoi includere praticamente qualsiasi tipo di contenuto digitale: documenti (PDF, Word, ecc.), foto, video, messaggi personali, password e credenziali di account, istruzioni specifiche, e molto altro. Ogni pacchetto può essere personalizzato con contenuti diversi per destinatari diversi.",
      category: "packages"
    },
    {
      id: 4,
      question: "Come vengono attivati i pacchetti di eredità digitale?",
      answer: "I pacchetti possono essere attivati in due modi principali: in caso di decesso (confermato da 2/3 dei contatti nella tua rete familiare) o in caso di perdita/distruzione dell'hardware. Puoi personalizzare queste impostazioni secondo le tue preferenze nelle impostazioni di sicurezza.",
      category: "packages"
    },
    {
      id: 5,
      question: "Posso modificare il contenuto dei pacchetti dopo averli creati?",
      answer: "Sì, puoi modificare, aggiornare o rimuovere contenuti dai tuoi pacchetti in qualsiasi momento. Ti consigliamo di rivedere periodicamente i tuoi pacchetti per assicurarti che contengano informazioni aggiornate, soprattutto per quanto riguarda password e documenti importanti.",
      category: "packages"
    },
    {
      id: 6,
      question: "Come funziona l'albero genealogico su ETNT?",
      answer: "L'albero genealogico di ETNT si crea automaticamente man mano che inviti familiari alla piattaforma. Quando crei un pacchetto, indichi il destinatario e il grado di parentela. Questa persona riceverà un invito e, una volta accettato, entrerà a far parte del tuo albero genealogico digitale. Ogni membro può arricchire il proprio profilo con foto, informazioni e contenuti che desidera condividere con la famiglia.",
      category: "genealogy"
    },
    {
      id: 7,
      question: "Quanto costa utilizzare ETNT?",
      answer: "ETNT offre un piano base gratuito che include la creazione di pacchetti digitali essenziali e un albero genealogico di base. Per funzionalità avanzate, come spazio di archiviazione aggiuntivo, crittografia avanzata e opzioni di personalizzazione premium, offriamo abbonamenti a vari livelli. Visita la sezione 'Piani e Prezzi' per maggiori dettagli.",
      category: "subscription"
    },
    {
      id: 8,
      question: "Posso revocare l'accesso a un pacchetto che ho già condiviso?",
      answer: "Sì, hai pieno controllo sui tuoi pacchetti. Puoi revocare l'accesso in qualsiasi momento dalle impostazioni del pacchetto. Tieni presente che se un destinatario ha già scaricato i contenuti del pacchetto, non sarà possibile recuperare questi dati già scaricati.",
      category: "security"
    },
    {
      id: 9,
      question: "ETNT può essere utilizzato per trasferire beni digitali di valore come criptovalute?",
      answer: "ETNT è principalmente progettato per gestire l'eredità digitale non patrimoniale, come foto, documenti e password. Per beni digitali di valore economico come criptovalute, raccomandiamo di consultare un esperto legale o notaio. Tuttavia, puoi utilizzare ETNT per conservare istruzioni sicure su come accedere a questi asset, che verranno trasmesse ai tuoi eredi designati.",
      category: "legal"
    },
    {
      id: 10,
      question: "Come posso contattare il supporto se ho problemi?",
      answer: "Il nostro team di supporto è disponibile attraverso vari canali. Puoi inviarci un'email a support@etnt.com, utilizzare il modulo di contatto nella sezione 'Supporto', o chattare con il nostro assistente virtuale disponibile 24/7. Per gli abbonati premium, offriamo anche supporto telefonico dedicato.",
      category: "support"
    }
  ];

  // Categories with icons
  const categories = [
    { id: 'all', name: 'Tutte le FAQ', icon: <FaQuestionCircle /> },
    { id: 'general', name: 'Generale', icon: <FaKey /> },
    { id: 'security', name: 'Sicurezza', icon: <FaLock /> },
    { id: 'packages', name: 'Pacchetti', icon: <FaBox /> },
    { id: 'genealogy', name: 'Albero Genealogico', icon: <FaUserFriends /> },
    { id: 'subscription', name: 'Abbonamenti', icon: <FaCloudUploadAlt /> },
    { id: 'legal', name: 'Aspetti Legali', icon: <FaFileAlt /> },
    { id: 'support', name: 'Supporto', icon: <FaQuestionCircle /> }
  ];

  // Filter FAQs based on search term and category
  const filteredFaqs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Create enhanced reveal animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
      
      {/* Global styles */}
      <GlobalStyles />
      
      {/* Loading screen */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Effetti di luce ambientale */}
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
              <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill d-inline-block">
                Risorse
              </span>
              <h1 className="display-4 fw-bold mb-4" style={appleStyle}>
                Domande <span style={gradientTextStyle}>Frequenti</span>
              </h1>
              <p className="lead text-white-50 mb-5 mx-auto" style={{ maxWidth: '700px', fontWeight: 300 }}>
                Trova rapidamente risposte alle domande più comuni su ETNT, la tua eredità digitale
                e come configurare al meglio la piattaforma.
              </p>
              
              {/* Search bar */}
              <div className="position-relative mx-auto mb-5" style={{ maxWidth: '600px' }}>
                <motion.div 
                  className="p-2 rounded-pill d-flex align-items-center glass-premium"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="ps-3 pe-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <FaSearch className="text-primary" />
                    </motion.div>
                  </div>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-transparent shadow-none text-white" 
                    placeholder="Cerca una domanda..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ outline: 'none' }}
                  />
                </motion.div>
              </div>
            </motion.div>
            
            <Row>
              {/* Category selection */}
              <Col lg={3} className="mb-4 mb-lg-0">
                <motion.div 
                  className="sticky-lg-top pt-lg-4"
                  style={{ top: '100px' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="glass-premium rounded-4 p-4 mb-4">
                    <h5 className="fw-semibold mb-4 text-white">Categorie</h5>
                    <div className="d-flex flex-column gap-2">
                      {categories.map((category) => (
                        <motion.button
                          key={category.id}
                          className={`btn btn-${activeCategory === category.id ? 'primary' : 'outline-light'} rounded-pill text-start d-flex align-items-center py-2 px-3`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          <span className="me-2">{category.icon}</span>
                          {category.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass-premium rounded-4 p-4">
                    <h5 className="fw-semibold mb-3 text-white">Hai altre domande?</h5>
                    <p className="text-white-50 mb-4">Non hai trovato la risposta che cercavi? Contatta il nostro team di supporto.</p>
                    <Link to="/support">
                      <motion.button
                        className="btn btn-primary rounded-pill w-100 d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Contatta il Supporto <FaArrowRight className="ms-2" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </Col>
              
              {/* FAQ accordions */}
              <Col lg={9}>
                <AnimatePresence>
                  {filteredFaqs.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Accordion className="custom-accordion">
                        {filteredFaqs.map((faq, index) => (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <Card className="mb-3 border-0 rounded-4 overflow-hidden glass-premium">
                              <Accordion.Item eventKey={faq.id.toString()} className="border-0 bg-transparent">
                                <Accordion.Header className="px-4 py-3 border-0">
                                  <span className="fw-semibold text-white">{faq.question}</span>
                                  <FaChevronDown className="accordion-icon ms-auto" />
                                </Accordion.Header>
                                <Accordion.Body className="px-4 py-3 text-white-50" style={{ fontWeight: 300 }}>
                                  {faq.answer}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Card>
                          </motion.div>
                        ))}
                      </Accordion>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="text-center py-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaQuestionCircle size={50} className="text-white-50 mb-3" />
                      <h4 className="mb-3 text-white">Nessun risultato trovato</h4>
                      <p className="text-white-50">Prova a modificare i termini di ricerca o cambia categoria.</p>
                      <Button 
                        variant="outline-light" 
                        className="mt-3 rounded-pill"
                        onClick={() => {
                          setSearchTerm('');
                          setActiveCategory('all');
                        }}
                      >
                        Resetta ricerca
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Col>
            </Row>
          </Container>
        </section>
      </MainLayout>
    </div>
  );
};

export default FaqPage;