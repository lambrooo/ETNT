import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Badge } from 'react-bootstrap';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaRegEdit, 
  FaFileUpload, 
  FaUserFriends, 
  FaCog, 
  FaArrowRight, 
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaCheck,
  FaLock,
  FaImage,
  FaFileAlt,
  FaVideo,
  FaKey,
  FaHome,
  FaBox,
  FaTachometerAlt,
  FaSearch,
  FaShieldAlt,
  FaSpinner,
  FaStar,
  FaMagic,
  FaCloudUploadAlt,
  FaFolder,
  FaRegLightbulb
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
                <FaBox className="text-primary mb-3" size={40} />
              </motion.div>
              <h3 className="text-white fw-light" style={{ letterSpacing: '0.1em' }}>ETNT</h3>
              <p className="text-white-50 small">Preparazione nuovo pacchetto...</p>
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

      /* Stile per drag and drop migliorato */
      .dropzone {
        transition: all 0.3s ease;
        border: 2px dashed rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.03);
      }
      
      .dropzone:hover, .dropzone.active {
        border-color: rgba(13, 110, 253, 0.5);
        background: rgba(13, 110, 253, 0.05);
      }
    `}
  </style>
);

// MainLayout migliorato - corrispondente a quello della HomePage
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

const CreatePackagePage = ({ onLogout }) => {
  const navigate = useNavigate();
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
  
  // Stato per il passo corrente e i dati del form
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: [],
    recipients: [],
    settings: {
      activationDelay: '30', // giorni
      notificationType: 'email',
      encryptionLevel: 'high'
    }
  });
  
  // Calcola la percentuale di completamento
  const progressPercentage = (activeStep / 4) * 100;
  
  // Contatti disponibili (simulati)
  const availableContacts = [
    { id: 1, name: 'Marco Rossi', email: 'marco.rossi@example.com', avatar: '👨‍💼' },
    { id: 2, name: 'Giulia Verdi', email: 'giulia.verdi@example.com', avatar: '👩‍💼' },
    { id: 3, name: 'Luca Bianchi', email: 'luca.bianchi@example.com', avatar: '👨‍💻' },
    { id: 4, name: 'Sara Neri', email: 'sara.neri@example.com', avatar: '👩‍⚕️' },
    { id: 5, name: 'Paolo Gialli', email: 'paolo.gialli@example.com', avatar: '👨‍🔧' },
  ];
  
  // Tipi di file accettati
  const fileTypes = [
    { id: 'document', name: 'Documento', icon: <FaFileAlt className="text-primary" /> },
    { id: 'image', name: 'Immagine', icon: <FaImage className="text-info" /> },
    { id: 'video', name: 'Video', icon: <FaVideo className="text-danger" /> },
    { id: 'password', name: 'Password', icon: <FaKey className="text-warning" /> },
  ];
  
  // Gestisce l'avanzamento o il ritorno nei passi
  const handleStepChange = (direction) => {
    if (direction === 'next' && activeStep < 4) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'prev' && activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Gestisce il cambio di input nei form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Gestisce il cambio delle impostazioni
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        [name]: value
      }
    });
  };
  
  // Simula l'aggiunta di un file
  const handleAddFile = (type) => {
    const newFile = {
      id: Date.now(),
      name: `Nuovo ${type.name.toLowerCase()}`,
      type: type.id,
      icon: type.icon,
      size: '0 KB',
      status: 'pending'
    };
    
    setFormData({
      ...formData,
      files: [...formData.files, newFile]
    });
  };
  
  // Simula la rimozione di un file
  const handleRemoveFile = (fileId) => {
    setFormData({
      ...formData,
      files: formData.files.filter(file => file.id !== fileId)
    });
  };
  
  // Gestisce l'aggiunta di un destinatario
  const handleAddRecipient = (contact) => {
    // Verifica se il contatto è già stato aggiunto
    if (formData.recipients.some(r => r.id === contact.id)) {
      return;
    }
    
    setFormData({
      ...formData,
      recipients: [...formData.recipients, contact]
    });
  };
  
  // Gestisce la rimozione di un destinatario
  const handleRemoveRecipient = (contactId) => {
    setFormData({
      ...formData,
      recipients: formData.recipients.filter(r => r.id !== contactId)
    });
  };
  
  // Simula il salvataggio del pacchetto
  const handleSavePackage = () => {
    console.log('Salvataggio pacchetto:', formData);
    
    // Mostra animazione di successo
    setActiveStep(5); // Un passo "fantasma" per mostrare il successo
    
    // Reindirizza alla dashboard dopo 2 secondi
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  // Stili condivisi  
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
  
  // Definizione dei passaggi
  const steps = [
    { id: 1, name: 'Informazioni', icon: <FaRegEdit /> },
    { id: 2, name: 'Contenuti', icon: <FaFileUpload /> },
    { id: 3, name: 'Destinatari', icon: <FaUserFriends /> },
    { id: 4, name: 'Impostazioni', icon: <FaCog /> },
  ];
  
  // Componente passo di creazione informazioni di base
  const BasicInfoStep = () => (
    <RevealOnScroll direction="bottom" duration={0.4}>
      <Card className="glass-premium border-0 mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
              <FaRegEdit className="text-primary" size={24} />
            </div>
            <h3 className="fw-semibold mb-0" style={appleStyle}>Informazioni di base</h3>
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label className="text-white fw-medium">Nome del pacchetto</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Es: Documenti importanti"
              className="py-3 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            />
            <Form.Text className="text-white-50">
              Dai un nome chiaro al tuo pacchetto di eredità digitale
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="text-white fw-medium">Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descrivi brevemente il contenuto di questo pacchetto"
              className="py-3 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem', minHeight: '120px' }}
              rows={4}
            />
            <Form.Text className="text-white-50">
              Una breve descrizione aiuterà i destinatari a capire cosa contiene il pacchetto
            </Form.Text>
          </Form.Group>
          
          <div className="mt-5 bg-primary bg-opacity-10 p-4 rounded-4 border border-primary border-opacity-25">
            <div className="d-flex">
              <div className="me-3">
                <FaRegLightbulb className="text-primary" size={20} />
              </div>
              <div>
                <h5 className="h6 fw-semibold mb-2">Suggerimento</h5>
                <p className="mb-0 small text-white-50">
                  Un buon nome e una descrizione dettagliata renderanno più facile per i tuoi contatti identificare e comprendere il pacchetto. Considera di includere lo scopo e l'importanza del contenuto.
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <div className="text-center text-lg-end mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('next')}
            variant="primary"
            className="px-4 py-3 fw-semibold"
            style={{ borderRadius: '2rem' }}
            disabled={!formData.title}
          >
            Continua
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
  
  // Componente passo di aggiunta file
  const AddFilesStep = () => (
    <RevealOnScroll direction="bottom" duration={0.4}>
      <Card className="glass-premium border-0 mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
              <FaFileUpload className="text-info" size={24} />
            </div>
            <h3 className="fw-semibold mb-0" style={appleStyle}>Aggiungi contenuti</h3>
          </div>
          
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3 mb-4">
              {fileTypes.map(type => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline-light"
                    className="d-flex align-items-center px-3 py-2"
                    style={{ borderRadius: '2rem' }}
                    onClick={() => handleAddFile(type)}
                  >
                    <span className="me-2">{type.icon}</span>
                    {type.name}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="d-flex align-items-center justify-content-center rounded-4 p-5 dropzone"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                  className="mb-3"
                >
                  <FaCloudUploadAlt className="text-primary" size={48} />
                </motion.div>
                <p className="mb-3 text-white">Trascina qui i file o fai clic per caricare</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    className="px-4 py-2 fw-semibold"
                    style={{ borderRadius: '2rem' }}
                  >
                    <FaFolder className="me-2" />
                    Sfoglia file
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {formData.files.length > 0 ? (
            <div className="mt-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="h5 fw-semibold mb-0 me-3" style={appleStyle}>File aggiunti</h4>
                <Badge bg="primary" pill className="px-3 py-2">{formData.files.length}</Badge>
              </div>
              
              <div className="space-y-3">
                {formData.files.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="glass-premium rounded-4 p-3 d-flex align-items-center justify-content-between mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3 p-2 bg-white bg-opacity-10 rounded-circle">
                        {file.icon}
                      </div>
                      <div>
                        <p className="mb-0 text-white">{file.name}</p>
                        <p className="mb-0 text-white-50 small">{file.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-circle p-1 d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => handleRemoveFile(file.id)}
                    >
                      <FaTimes size={14} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 text-center text-white-50 p-4 glass-premium rounded-4">
              <FaFileAlt className="mb-3 text-white-50" size={32} />
              <p className="mb-0">Nessun file aggiunto. Inizia selezionando un tipo di file.</p>
            </div>
          )}
          
          <div className="mt-5 bg-primary bg-opacity-10 p-4 rounded-4 border border-primary border-opacity-25">
            <div className="d-flex">
              <div className="me-3">
                <FaLock className="text-primary" size={20} />
              </div>
              <div>
                <h5 className="h6 fw-semibold mb-2">Sicurezza garantita</h5>
                <p className="mb-0 small text-white-50">
                  Tutti i file vengono crittografati con standard militari. Solo le persone designate potranno accedervi seguendo le procedure di sicurezza.
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('prev')}
            variant="outline-light"
            className="px-4 py-3"
            style={{ borderRadius: '2rem' }}
          >
            <FaArrowLeft className="me-2" />
            Indietro
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('next')}
            variant="primary"
            className="px-4 py-3 fw-semibold"
            style={{ borderRadius: '2rem' }}
          >
            Continua
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
  
  // Componente passo di designazione dei destinatari
  const DesignateRecipientsStep = () => (
    <RevealOnScroll direction="bottom" duration={0.4}>
      <Card className="glass-premium border-0 mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
              <FaUserFriends className="text-success" size={24} />
            </div>
            <h3 className="fw-semibold mb-0" style={appleStyle}>Scegli i destinatari</h3>
          </div>
          
          {formData.recipients.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="h5 fw-semibold mb-0 me-3" style={appleStyle}>Persone selezionate</h4>
                <Badge bg="success" pill className="px-3 py-2">{formData.recipients.length}</Badge>
              </div>
              
              <Row className="g-3">
                {formData.recipients.map(recipient => (
                  <Col md={6} key={recipient.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                      className="bg-success bg-opacity-10 rounded-4 p-3 d-flex align-items-center justify-content-between border border-success border-opacity-20"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-success bg-opacity-20 rounded-circle p-2 me-3 fs-4">
                          {recipient.avatar}
                        </div>
                        <div>
                          <p className="mb-0 text-white fw-semibold">{recipient.name}</p>
                          <p className="mb-0 text-white-50 small">{recipient.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        className="rounded-circle p-1 d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleRemoveRecipient(recipient.id)}
                      >
                        <FaTimes size={14} />
                      </Button>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          <div>
            <div className="d-flex align-items-center mb-4">
              <h4 className="h5 fw-semibold mb-0" style={appleStyle}>I tuoi contatti</h4>
              <Link to="/contacts" className="ms-auto text-primary text-decoration-none small">
                Gestisci contatti <FaArrowRight className="ms-1" size={10} />
              </Link>
            </div>
            
            <div className="position-relative mb-4">
              <Form.Control
                type="text"
                placeholder="Cerca contatti..."
                className="py-3 ps-4 pe-5 bg-white bg-opacity-10 border-0 text-white"
                style={{ borderRadius: '2rem' }}
              />
              <FaSearch className="position-absolute top-50 translate-middle-y text-white-50" style={{ right: '1rem' }} />
            </div>
            
            <Row className="g-3">
              {availableContacts
                .filter(contact => !formData.recipients.some(r => r.id === contact.id))
                .map(contact => (
                  <Col md={6} key={contact.id}>
                    <motion.div
                      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                      className="glass-premium rounded-4 p-3 d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-white bg-opacity-10 rounded-circle p-2 me-3 fs-4">
                          {contact.avatar}
                        </div>
                        <div>
                          <p className="mb-0 text-white">{contact.name}</p>
                          <p className="mb-0 text-white-50 small">{contact.email}</p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-circle p-1 d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                          onClick={() => handleAddRecipient(contact)}
                        >
                          <FaPlus size={12} />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </Col>
              ))}
            </Row>
            
            <div className="text-center mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline-light"
                  className="px-4 py-2"
                  style={{ borderRadius: '2rem' }}
                  onClick={() => navigate('/contacts')}
                >
                  <FaPlus className="me-2" size={12} />
                  Aggiungi nuovo contatto
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-5 bg-primary bg-opacity-10 p-4 rounded-4 border border-primary border-opacity-25">
            <div className="d-flex">
              <div className="me-3">
                <FaShieldAlt className="text-primary" size={20} />
              </div>
              <div>
                <h5 className="h6 fw-semibold mb-2">Privacy e controllo</h5>
                <p className="mb-0 small text-white-50">
                  I tuoi contatti riceveranno una notifica solo quando il pacchetto sarà attivato. Potrai sempre modificare la lista dei destinatari in qualsiasi momento.
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('prev')}
            variant="outline-light"
            className="px-4 py-3"
            style={{ borderRadius: '2rem' }}
          >
            <FaArrowLeft className="me-2" />
            Indietro
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('next')}
            variant="primary"
            className="px-4 py-3 fw-semibold"
            style={{ borderRadius: '2rem' }}
          >
            Continua
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
  
  // Componente passo di configurazione
  const ConfigurationStep = () => (
    <RevealOnScroll direction="bottom" duration={0.4}>
      <Card className="glass-premium border-0 mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
              <FaCog className="text-warning" size={24} />
            </div>
            <h3 className="fw-semibold mb-0" style={appleStyle}>Impostazioni del pacchetto</h3>
          </div>
          
          <Row className="mb-5">
            <Col lg={6}>
              <h4 className="h5 fw-semibold mb-3" style={appleStyle}>Impostazioni di attivazione</h4>
              
              <Form.Group className="mb-4">
                <Form.Label className="text-white fw-medium">Ritardo di attivazione</Form.Label>
                <Form.Select
                  name="activationDelay"
                  value={formData.settings.activationDelay}
                  onChange={handleSettingsChange}
                  className="py-3 bg-white bg-opacity-10 border-0 text-white"
                  style={{ borderRadius: '0.8rem' }}
                >
                  <option value="7">7 giorni</option>
                  <option value="14">14 giorni</option>
                  <option value="30">30 giorni</option>
                  <option value="60">60 giorni</option>
                  <option value="90">90 giorni</option>
                </Form.Select>
                <Form.Text className="text-white-50">
                  Periodo di inattività prima che il sistema attivi il processo di trasferimento
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="text-white fw-medium">Metodo di notifica</Form.Label>
                <Form.Select
                  name="notificationType"
                  value={formData.settings.notificationType}
                  onChange={handleSettingsChange}
                  className="py-3 bg-white bg-opacity-10 border-0 text-white"
                  style={{ borderRadius: '0.8rem' }}
                >
                  <option value="email">Solo email</option>
                  <option value="sms">Solo SMS</option>
                  <option value="both">Email e SMS</option>
                </Form.Select>
                <Form.Text className="text-white-50">
                  Come verranno notificati i destinatari quando il pacchetto sarà disponibile
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col lg={6}>
              <h4 className="h5 fw-semibold mb-3" style={appleStyle}>Impostazioni di sicurezza</h4>
              
              <Form.Group className="mb-4">
                <Form.Label className="text-white fw-medium">Livello di crittografia</Form.Label>
                <Form.Select
                  name="encryptionLevel"
                  value={formData.settings.encryptionLevel}
                  onChange={handleSettingsChange}
                  className="py-3 bg-white bg-opacity-10 border-0 text-white"
                  style={{ borderRadius: '0.8rem' }}
                >
                  <option value="standard">Standard</option>
                  <option value="high">Alto</option>
                  <option value="very-high">Molto alto</option>
                </Form.Select>
                <Form.Text className="text-white-50">
                  Livelli più alti offrono maggiore sicurezza ma potrebbero richiedere passi aggiuntivi per i destinatari
                </Form.Text>
              </Form.Group>
              
              <div className="mt-4 glass-premium rounded-4 p-3">
                <div className="d-flex mb-2">
                  <div className="me-3">
                    <FaMagic className="text-warning" />
                  </div>
                  <h5 className="h6 fw-semibold mb-0">Funzionalità premium</h5>
                </div>
                <div className="ps-4 mt-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaCheck className="text-success me-2" size={12} />
                    <p className="mb-0 small text-white-50">Verifica biometrica</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaCheck className="text-success me-2" size={12} />
                    <p className="mb-0 small text-white-50">Video message pre-registrato</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheck className="text-success me-2" size={12} />
                    <p className="mb-0 small text-white-50">Backup automatico</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          <div className="glass-premium p-4 rounded-4 mb-4">
            <h4 className="h5 fw-semibold mb-4" style={appleStyle}>Riepilogo del pacchetto</h4>
            
            <Row className="g-4">
              <Col md={4}>
                <div className="bg-white bg-opacity-5 p-3 rounded-3 h-100">
                  <p className="mb-2 small text-white-50">Nome del pacchetto</p>
                  <p className="mb-0 text-white fw-medium">{formData.title || 'Non specificato'}</p>
                </div>
              </Col>
              
              <Col md={4}>
                <div className="bg-white bg-opacity-5 p-3 rounded-3 h-100">
                  <p className="mb-2 small text-white-50">Contenuti</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-white fw-medium me-2">{formData.files.length} file</p>
                    <Badge bg="info" pill>{formData.files.length > 0 ? 'Aggiunti' : 'Vuoto'}</Badge>
                  </div>
                </div>
              </Col>
              
              <Col md={4}>
                <div className="bg-white bg-opacity-5 p-3 rounded-3 h-100">
                  <p className="mb-2 small text-white-50">Destinatari</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-white fw-medium me-2">{formData.recipients.length} persone</p>
                    <Badge bg="success" pill>{formData.recipients.length > 0 ? 'Selezionati' : 'Nessuno'}</Badge>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          
          <div className="p-4 text-center mt-5 bg-white bg-opacity-5 rounded-4 border border-white border-opacity-10">
            <FaStar className="text-warning mb-3" size={24} />
            <h4 className="h5 fw-semibold mb-2" style={appleStyle}>Tutto pronto!</h4>
            <p className="mb-0 text-white-50">
              Il tuo pacchetto è configurato e pronto per essere creato. Successivamente potrai modificarlo dalla tua dashboard.
            </p>
          </div>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleStepChange('prev')}
            variant="outline-light"
            className="px-4 py-3"
            style={{ borderRadius: '2rem' }}
          >
            <FaArrowLeft className="me-2" />
            Indietro
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(13, 110, 253, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSavePackage}
            variant="primary"
            className="px-5 py-3 fw-semibold"
            style={{ borderRadius: '2rem' }}
          >
            Crea pacchetto
            <FaCheck className="ms-2" />
          </Button>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
  
  // Componente di successo
  const SuccessStep = () => (
    <RevealOnScroll direction="bottom" duration={0.4}>
      <Card className="glass-premium border-0 mb-4">
        <Card.Body className="text-center py-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="mb-4 d-inline-flex justify-content-center align-items-center"
          >
            <div className="bg-success bg-opacity-20 text-success rounded-circle p-4" style={{ width: '120px', height: '120px', fontSize: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaCheck size={48} />
            </div>
          </motion.div>
          
          <h2 className="display-5 fw-bold mb-3" style={appleStyle}>Pacchetto creato con <span style={gradientTextStyle}>successo</span>!</h2>
          <p className="lead text-white-50 mb-5">
            Il tuo pacchetto "{formData.title}" è stato creato e configurato correttamente.
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(13, 110, 253, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                className="px-5 py-3 fw-semibold"
                style={{ borderRadius: '2rem' }}
                onClick={() => navigate('/dashboard')}
              >
                Vai alla dashboard
              </Button>
            </motion.div>
          </div>
        </Card.Body>
      </Card>
    </RevealOnScroll>
  );
  
  // Determina quale componente mostrare in base al passo attivo
  const renderStep = () => {
    if (activeStep === 5) return <SuccessStep />;
    
    switch (activeStep) {
      case 1: return <BasicInfoStep />;
      case 2: return <AddFilesStep />;
      case 3: return <DesignateRecipientsStep />;
      case 4: return <ConfigurationStep />;
      default: return <BasicInfoStep />;
    }
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
          {/* Header con titolo */}
          <header className="text-center text-lg-start pt-4 pb-5">
            <RevealOnScroll direction="bottom" duration={0.4}>
              <h1 className="display-4 fw-bold mb-0" style={appleStyle}>Crea <span style={gradientTextStyle}>pacchetto</span></h1>
              <p className="text-white-50 lead">Organizza e proteggi i tuoi beni digitali</p>
            </RevealOnScroll>
          </header>
          
          {/* Stepper */}
          {activeStep < 5 && (
            <RevealOnScroll direction="bottom" duration={0.4}>
              <div className="mb-5">
                <ProgressBar 
                  now={progressPercentage} 
                  className="mb-4 bg-white bg-opacity-10"
                  style={{ height: '8px', borderRadius: '4px' }}
                  variant="primary"
                />
                
                <div className="d-flex justify-content-between">
                  {steps.map(step => (
                    <div 
                      key={step.id} 
                      className={`text-center ${activeStep >= step.id ? 'text-white' : 'text-white-50'}`}
                      style={{ width: '25%' }}
                    >
                      <motion.div 
                        className={`
                          d-inline-flex align-items-center justify-content-center rounded-circle mb-2
                          ${activeStep === step.id 
                            ? 'bg-primary text-white' 
                            : activeStep > step.id 
                              ? 'bg-success text-white' 
                              : 'bg-white bg-opacity-10 text-white-50'
                          }
                        `}
                        style={{ width: '48px', height: '48px' }}
                        whileHover={activeStep >= step.id ? { scale: 1.1 } : {}}
                        animate={{
                          scale: activeStep === step.id ? [1, 1.1, 1] : 1,
                          transition: {
                            duration: 0.5,
                            repeat: activeStep === step.id ? 1 : 0
                          }
                        }}
                      >
                        {activeStep > step.id ? <FaCheck size={20} /> : step.icon}
                      </motion.div>
                      <div className="small fw-medium d-none d-md-block">{step.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}
          
          {/* Contenuto del passo */}
          {renderStep()}
        </Container>
      </MainLayout>
    </div>
  );
};

export default CreatePackagePage;