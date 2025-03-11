import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Tabs, Tab, Nav } from 'react-bootstrap';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaUserMinus, 
  FaSearch, 
  FaEnvelope, 
  FaPhone, 
  FaEllipsisH, 
  FaSortAlphaDown, 
  FaSortAlphaUp,
  FaUserFriends,
  FaTimes,
  FaSave,
  FaFilter,
  FaCheck,
  FaChartPie,
  FaProjectDiagram,
  FaUsers,
  FaSitemap,
  FaKey,
  FaBox,
  FaLock,
  FaShieldAlt,
  FaChevronRight,
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaInfoCircle
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// Importa il componente GraphsModal
import GraphsModal from '../components/GraphsModal';

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
                <FaUserFriends className="text-primary mb-3" size={40} />
              </motion.div>
              <h3 className="text-white fw-light" style={{ letterSpacing: '0.1em' }}>ETNT</h3>
              <p className="text-white-50 small">Caricamento contatti...</p>
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

const ContactsPage = ({ onLogout }) => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 80]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Stati per il componente
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showGraphsModal, setShowGraphsModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [filterRelation, setFilterRelation] = useState('all');
  const [activeGraphTab, setActiveGraphTab] = useState('familyTree');
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  
  // Simuliamo un caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Form per nuovo contatto - esteso con nuovi campi
  const [newContactData, setNewContactData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    role: '',
    inheritanceAccess: 'limitato',
    status: 'in attesa'
  });
  
  // Dati di esempio per i contatti - estesi con nuovi campi
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Marco Rossi', email: 'marco.rossi@example.com', phone: '+39 123 456 7890', relationship: 'Familiare', role: 'padre', inheritanceAccess: 'totale', status: 'confermato', avatar: '👨‍💼' },
    { id: 2, name: 'Giulia Verdi', email: 'giulia.verdi@example.com', phone: '+39 234 567 8901', relationship: 'Familiare', role: 'madre', inheritanceAccess: 'parziale', status: 'confermato', avatar: '👩‍💼' },
    { id: 3, name: 'Luca Bianchi', email: 'luca.bianchi@example.com', phone: '+39 345 678 9012', relationship: 'Collega', role: 'collega', inheritanceAccess: 'limitato', status: 'in attesa', avatar: '👨‍💻' },
    { id: 4, name: 'Sara Neri', email: 'sara.neri@example.com', phone: '+39 456 789 0123', relationship: 'Familiare', role: 'sorella', inheritanceAccess: 'parziale', status: 'confermato', avatar: '👩‍⚕️' },
    { id: 5, name: 'Paolo Gialli', email: 'paolo.gialli@example.com', phone: '+39 567 890 1234', relationship: 'Amico', role: 'amico', inheritanceAccess: 'limitato', status: 'confermato', avatar: '👨‍🔧' },
    { id: 6, name: 'Anna Viola', email: 'anna.viola@example.com', phone: '+39 678 901 2345', relationship: 'Legale', role: 'avvocato', inheritanceAccess: 'specifico', status: 'confermato', avatar: '👩‍⚖️' },
    { id: 7, name: 'Roberto Blu', email: 'roberto.blu@example.com', phone: '+39 789 012 3456', relationship: 'Collega', role: 'collega', inheritanceAccess: 'limitato', status: 'in attesa', avatar: '👨‍💻' },
  ]);
  
  // Lista di relazioni disponibili
  const relationships = ['Familiare', 'Amico', 'Collega', 'Legale', 'Altro'];
  
  // Lista di ruoli specifici
  const roles = {
    'Familiare': ['padre', 'madre', 'fratello', 'sorella', 'figlio', 'figlia', 'nonno', 'nonna', 'zio', 'zia', 'cugino', 'cugina', 'altro'],
    'Amico': ['amico', 'amica', 'migliore amico', 'migliore amica', 'conoscente', 'altro'],
    'Collega': ['collega', 'manager', 'dipendente', 'partner', 'cliente', 'fornitore', 'altro'],
    'Legale': ['avvocato', 'notaio', 'consulente', 'commercialista', 'altro'],
    'Altro': ['altro']
  };
  
  // Lista di livelli di accesso
  const accessLevels = ['totale', 'parziale', 'limitato', 'specifico'];
  
  // Filtra i contatti in base alla ricerca e alla relazione
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = (
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search) ||
      contact.relationship.toLowerCase().includes(search.toLowerCase())
    );
    
    const matchesRelation = filterRelation === 'all' || contact.relationship === filterRelation;
    
    return matchesSearch && matchesRelation;
  });
  
  // Ordina i contatti
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  
  // Gestisce il cambio di input nel form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Se cambia la relazione, imposta un ruolo di default
    if (name === 'relationship' && value) {
      setNewContactData({
        ...newContactData,
        [name]: value,
        role: roles[value] ? roles[value][0] : ''
      });
    } else {
      setNewContactData({
        ...newContactData,
        [name]: value
      });
    }
  };
  
  // Gestisce l'aggiunta di un nuovo contatto
  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      ...newContactData,
      avatar: '👤'
    };
    
    setContacts([...contacts, newContact]);
    setNewContactData({
      name: '',
      email: '',
      phone: '',
      relationship: '',
      role: '',
      inheritanceAccess: 'limitato',
      status: 'in attesa'
    });
    setShowAddContactModal(false);
  };
  
  // Gestisce l'avvio della modifica di un contatto
  const handleEditStart = (contact) => {
    setCurrentContact(contact);
    setNewContactData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      relationship: contact.relationship,
      role: contact.role || '',
      inheritanceAccess: contact.inheritanceAccess || 'limitato',
      status: contact.status || 'in attesa'
    });
    setShowEditContactModal(true);
  };
  
  // Gestisce il salvataggio delle modifiche a un contatto
  const handleEditSave = () => {
    setContacts(contacts.map(c => 
      c.id === currentContact.id 
        ? { ...c, ...newContactData }
        : c
    ));
    setShowEditContactModal(false);
  };
  
  // Gestisce l'eliminazione di un contatto
  const handleDeleteContact = (contactId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo contatto?')) {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    }
  };
  
  // Gestisce il cambio di direzione dell'ordinamento
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
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
  
  // Componente per il menu a tre puntini
  const ContactMenu = ({ contact }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const actions = [
      { id: 'edit', name: 'Modifica', icon: <FaUserEdit /> },
      { id: 'delete', name: 'Elimina', icon: <FaUserMinus /> }
    ];
    
    return (
      <div className="position-relative">
        <Button
          variant="link"
          className="text-white-50 p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaEllipsisH />
        </Button>
        
        {isOpen && (
          <>
            <div
              className="fixed-top w-100 h-100"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent' }}
            />
            <div 
              className="position-absolute end-0 mt-1 z-10" 
              style={{ 
                ...glassStyle, 
                minWidth: '160px',
                zIndex: 1000
              }}
            >
              <div className="py-1">
                {actions.map(action => (
                  <Button
                    key={action.id}
                    variant="link"
                    className="d-flex align-items-center w-100 text-white-50 text-decoration-none px-3 py-2 text-start"
                    onClick={() => {
                      if (action.id === 'edit') {
                        handleEditStart(contact);
                      } else if (action.id === 'delete') {
                        handleDeleteContact(contact.id);
                      }
                      setIsOpen(false);
                    }}
                  >
                    <span className="me-2">{action.icon}</span>
                    {action.name}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  // Componente per il modale di aggiungi contatto - esteso con nuovi campi
  const AddContactModal = () => (
    <Modal
      show={showAddContactModal}
      onHide={() => setShowAddContactModal(false)}
      centered
      contentClassName="bg-dark border-0"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Modal.Header className="border-0">
        <Modal.Title className="fw-semibold" style={appleStyle}>Aggiungi contatto</Modal.Title>
        <Button variant="link" className="text-white p-0 shadow-none" onClick={() => setShowAddContactModal(false)}>
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newContactData.name}
              onChange={handleInputChange}
              placeholder="Es: Mario Rossi"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newContactData.email}
              onChange={handleInputChange}
              placeholder="Es: mario.rossi@example.com"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={newContactData.phone}
              onChange={handleInputChange}
              placeholder="Es: +39 123 456 7890"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Relazione</Form.Label>
            <Form.Select
              name="relationship"
              value={newContactData.relationship}
              onChange={handleInputChange}
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            >
              <option value="">Seleziona una relazione</option>
              {relationships.map(rel => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          {/* Nuovo campo: Ruolo specifico */}
          {newContactData.relationship && (
            <Form.Group className="mb-3">
              <Form.Label>Ruolo specifico</Form.Label>
              <Form.Select
                name="role"
                value={newContactData.role}
                onChange={handleInputChange}
                className="py-2 bg-white bg-opacity-10 border-0 text-white"
                style={{ borderRadius: '0.8rem' }}
                required
              >
                <option value="">Seleziona un ruolo</option>
                {roles[newContactData.relationship]?.map(role => (
                  <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          
          {/* Nuovo campo: Livello di accesso */}
          <Form.Group className="mb-3">
            <Form.Label>Livello di accesso all'eredità</Form.Label>
            <Form.Select
              name="inheritanceAccess"
              value={newContactData.inheritanceAccess}
              onChange={handleInputChange}
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            >
              <option value="totale">Totale - Accesso completo</option>
              <option value="parziale">Parziale - Accesso a pacchetti selezionati</option>
              <option value="limitato">Limitato - Accesso solo a contenuti specifici</option>
              <option value="specifico">Specifico - Configurazione personalizzata</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button 
          variant="outline-light" 
          onClick={() => setShowAddContactModal(false)}
          className="px-3 py-2"
          style={{ borderRadius: '2rem' }}
        >
          Annulla
        </Button>
        <Button 
          variant="primary" 
          onClick={handleAddContact}
          disabled={!newContactData.name || !newContactData.email || !newContactData.relationship || !newContactData.role}
          className="px-3 py-2 fw-semibold"
          style={{ borderRadius: '2rem' }}
        >
          <FaSave className="me-2" />
          Salva contatto
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
  // Componente per il modale di modifica contatto - esteso con nuovi campi
  const EditContactModal = () => (
    <Modal
      show={showEditContactModal}
      onHide={() => setShowEditContactModal(false)}
      centered
      contentClassName="bg-dark border-0"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Modal.Header className="border-0">
        <Modal.Title className="fw-semibold" style={appleStyle}>Modifica contatto</Modal.Title>
        <Button variant="link" className="text-white p-0 shadow-none" onClick={() => setShowEditContactModal(false)}>
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newContactData.name}
              onChange={handleInputChange}
              placeholder="Es: Mario Rossi"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newContactData.email}
              onChange={handleInputChange}
              placeholder="Es: mario.rossi@example.com"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={newContactData.phone}
              onChange={handleInputChange}
              placeholder="Es: +39 123 456 7890"
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Relazione</Form.Label>
            <Form.Select
              name="relationship"
              value={newContactData.relationship}
              onChange={handleInputChange}
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            >
              <option value="">Seleziona una relazione</option>
              {relationships.map(rel => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          {/* Nuovo campo: Ruolo specifico */}
          {newContactData.relationship && (
            <Form.Group className="mb-3">
              <Form.Label>Ruolo specifico</Form.Label>
              <Form.Select
                name="role"
                value={newContactData.role}
                onChange={handleInputChange}
                className="py-2 bg-white bg-opacity-10 border-0 text-white"
                style={{ borderRadius: '0.8rem' }}
                required
              >
                <option value="">Seleziona un ruolo</option>
                {roles[newContactData.relationship]?.map(role => (
                  <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          
          {/* Nuovo campo: Livello di accesso */}
          <Form.Group className="mb-3">
            <Form.Label>Livello di accesso all'eredità</Form.Label>
            <Form.Select
              name="inheritanceAccess"
              value={newContactData.inheritanceAccess}
              onChange={handleInputChange}
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            >
              <option value="totale">Totale - Accesso completo</option>
              <option value="parziale">Parziale - Accesso a pacchetti selezionati</option>
              <option value="limitato">Limitato - Accesso solo a contenuti specifici</option>
              <option value="specifico">Specifico - Configurazione personalizzata</option>
            </Form.Select>
          </Form.Group>
          
          {/* Nuovo campo: Stato */}
          <Form.Group className="mb-3">
            <Form.Label>Stato</Form.Label>
            <Form.Select
              name="status"
              value={newContactData.status}
              onChange={handleInputChange}
              className="py-2 bg-white bg-opacity-10 border-0 text-white"
              style={{ borderRadius: '0.8rem' }}
              required
            >
              <option value="confermato">Confermato</option>
              <option value="in attesa">In attesa</option>
              <option value="rifiutato">Rifiutato</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button 
          variant="outline-light" 
          onClick={() => setShowEditContactModal(false)}
          className="px-3 py-2"
          style={{ borderRadius: '2rem' }}
        >
          Annulla
        </Button>
        <Button 
          variant="primary" 
          onClick={handleEditSave}
          disabled={!newContactData.name || !newContactData.email || !newContactData.relationship || !newContactData.role}
          className="px-3 py-2 fw-semibold"
          style={{ borderRadius: '2rem' }}
        >
          <FaCheck className="me-2" />
          Salva modifiche
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
  // Componente per visualizzare l'albero genealogico
  const FamilyTreeView = () => {
    // Filtra solo i contatti familiari
    const familyContacts = contacts.filter(contact => contact.relationship === 'Familiare');
    
    // Funzione per ottenere il colore in base allo stato
    const getStatusColor = (status) => {
      switch(status) {
        case 'confermato': return '#4CAF50';
        case 'in attesa': return '#FFC107';
        case 'rifiutato': return '#F44336';
        default: return '#9E9E9E';
      }
    };
    
    // Raggruppa i contatti per ruolo
    const parents = familyContacts.filter(c => c.role === 'padre' || c.role === 'madre');
    const siblings = familyContacts.filter(c => c.role === 'fratello' || c.role === 'sorella');
    const children = familyContacts.filter(c => c.role === 'figlio' || c.role === 'figlia');
    const others = familyContacts.filter(c => 
      c.role !== 'padre' && c.role !== 'madre' && 
      c.role !== 'fratello' && c.role !== 'sorella' &&
      c.role !== 'figlio' && c.role !== 'figlia'
    );
    
    // Stile comune per i box dei membri della famiglia
    const familyMemberStyle = {
      ...glassStyle,
      padding: '1rem',
      textAlign: 'center',
      minWidth: '130px',
      transition: 'all 0.2s ease'
    };
    
    // Funzione per gestire la modifica di un contatto dall'albero
    const handleTreeNodeEdit = (contact) => {
      // Prima chiudiamo il modale dei grafici, poi apriamo quello di modifica
      setShowGraphsModal(false);
      // Usiamo setTimeout per evitare problemi di transizione tra i modali
      setTimeout(() => {
        handleEditStart(contact);
      }, 300);
    };
    
    return (
      <div className="py-4">
        <div className="family-tree-container" style={{ position: 'relative' }}>
          {/* Livello genitori */}
          {parents.length > 0 && (
            <>
              <div className="mb-2 text-center">
                <span className="badge bg-primary bg-opacity-25 text-primary mb-3">Genitori</span>
              </div>
              <div className="d-flex justify-content-center gap-4 mb-5">
                {parents.map(parent => (
                  <div 
                    key={parent.id} 
                    className="p-3 text-center position-relative" 
                    style={{
                      ...familyMemberStyle,
                      background: 'rgba(70, 130, 180, 0.2)',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => handleTreeNodeEdit(parent)}
                  >
                    <div 
                      className="position-absolute top-0 start-100 translate-middle rounded-circle" 
                      style={{
                        width: '1.2rem', 
                        height: '1.2rem', 
                        backgroundColor: getStatusColor(parent.status),
                        border: '2px solid rgba(0, 0, 0, 0.3)'
                      }}
                    ></div>
                    <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>{parent.avatar}</div>
                    <div className="fw-medium">{parent.name}</div>
                    <div className="text-white-50 small">{parent.role.charAt(0).toUpperCase() + parent.role.slice(1)}</div>
                  </div>
                ))}
              </div>
              
              {/* Linea di connessione verticale */}
              <div className="d-flex justify-content-center mb-4">
                <div style={{ width: '2px', height: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
              </div>
            </>
          )}
          
          {/* Livello utente e fratelli/sorelle (stesso livello) */}
          <div className="mb-2 text-center">
            <span className="badge bg-success bg-opacity-25 text-success mb-3">Tu e i tuoi fratelli</span>
          </div>
          <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
            {/* Fratelli/sorelle a sinistra */}
            {siblings.filter((_, index) => index < Math.ceil(siblings.length / 2)).map(sibling => (
              <div 
                key={sibling.id} 
                className="p-3 text-center position-relative" 
                style={{
                  ...familyMemberStyle,
                  background: 'rgba(138, 43, 226, 0.2)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handleTreeNodeEdit(sibling)}
              >
                <div 
                  className="position-absolute top-0 start-100 translate-middle rounded-circle" 
                  style={{
                    width: '1.2rem', 
                    height: '1.2rem', 
                    backgroundColor: getStatusColor(sibling.status),
                    border: '2px solid rgba(0, 0, 0, 0.3)'
                  }}
                ></div>
                <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>{sibling.avatar}</div>
                <div className="fw-medium">{sibling.name}</div>
                <div className="text-white-50 small">{sibling.role.charAt(0).toUpperCase() + sibling.role.slice(1)}</div>
              </div>
            ))}
            
            {/* Utente (sempre al centro) */}
            <div 
              className="p-3 text-center position-relative" 
              style={{
                ...familyMemberStyle,
                background: 'rgba(76, 175, 80, 0.2)',
                border: '2px solid rgba(76, 175, 80, 0.5)',
                zIndex: 2
              }}
            >
              <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>👤</div>
              <div className="fw-bold">Tu</div>
              <div className="text-white-50 small">Utente</div>
            </div>
            
            {/* Fratelli/sorelle a destra */}
            {siblings.filter((_, index) => index >= Math.ceil(siblings.length / 2)).map(sibling => (
              <div 
                key={sibling.id} 
                className="p-3 text-center position-relative" 
                style={{
                  ...familyMemberStyle,
                  background: 'rgba(138, 43, 226, 0.2)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handleTreeNodeEdit(sibling)}
              >
                <div 
                  className="position-absolute top-0 start-100 translate-middle rounded-circle" 
                  style={{
                    width: '1.2rem', 
                    height: '1.2rem', 
                    backgroundColor: getStatusColor(sibling.status),
                    border: '2px solid rgba(0, 0, 0, 0.3)'
                  }}
                ></div>
                <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>{sibling.avatar}</div>
                <div className="fw-medium">{sibling.name}</div>
                <div className="text-white-50 small">{sibling.role.charAt(0).toUpperCase() + sibling.role.slice(1)}</div>
              </div>
            ))}
          </div>
          
          {/* Linea di connessione verticale per figli (solo se ci sono) */}
          {children.length > 0 && (
            <div className="d-flex justify-content-center mb-4">
              <div style={{ width: '2px', height: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
            </div>
          )}
          
          {/* Livello figli */}
          {children.length > 0 && (
            <>
              <div className="mb-2 text-center">
                <span className="badge bg-warning bg-opacity-25 text-warning mb-3">Figli</span>
              </div>
              <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
                {children.map(child => (
                  <div 
                    key={child.id} 
                    className="p-3 text-center position-relative" 
                    style={{
                      ...familyMemberStyle,
                      background: 'rgba(255, 152, 0, 0.2)',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => handleTreeNodeEdit(child)}
                  >
                    <div 
                      className="position-absolute top-0 start-100 translate-middle rounded-circle" 
                      style={{
                        width: '1.2rem', 
                        height: '1.2rem', 
                        backgroundColor: getStatusColor(child.status),
                        border: '2px solid rgba(0, 0, 0, 0.3)'
                      }}
                    ></div>
                    <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>{child.avatar}</div>
                    <div className="fw-medium">{child.name}</div>
                    <div className="text-white-50 small">{child.role.charAt(0).toUpperCase() + child.role.slice(1)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Altri familiari */}
          {others.length > 0 && (
            <>
              <div className="mt-5 pt-3 border-top border-white border-opacity-10">
                <div className="mb-2 text-center">
                  <span className="badge bg-secondary bg-opacity-25 text-white-50 mb-3">Altri familiari</span>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {others.map(other => (
                    <div 
                      key={other.id} 
                      className="p-3 text-center position-relative" 
                      style={{
                        ...familyMemberStyle,
                        background: 'rgba(255, 193, 7, 0.2)',
                        scale: '0.9',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={() => handleTreeNodeEdit(other)}
                    >
                      <div 
                        className="position-absolute top-0 start-100 translate-middle rounded-circle" 
                        style={{
                          width: '1.2rem', 
                          height: '1.2rem', 
                          backgroundColor: getStatusColor(other.status),
                          border: '2px solid rgba(0, 0, 0, 0.3)'
                        }}
                      ></div>
                      <div className="mb-2 mx-auto" style={{ fontSize: '1.8rem' }}>{other.avatar}</div>
                      <div className="fw-medium">{other.name}</div>
                      <div className="text-white-50 small">{other.role.charAt(0).toUpperCase() + other.role.slice(1)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Legenda */}
          <div 
            className="mt-5 p-3 mx-auto" 
            style={{
              ...glassStyle,
              maxWidth: '300px'
            }}
          >
            <h6 className="fw-semibold mb-3 text-center">Legenda</h6>
            <div className="d-flex align-items-center mb-2">
              <div style={{ width: '1rem', height: '1rem', backgroundColor: '#4CAF50', borderRadius: '50%' }}></div>
              <span className="ms-2 text-white-50 small">Confermato</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div style={{ width: '1rem', height: '1rem', backgroundColor: '#FFC107', borderRadius: '50%' }}></div>
              <span className="ms-2 text-white-50 small">In attesa</span>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '1rem', height: '1rem', backgroundColor: '#F44336', borderRadius: '50%' }}></div>
              <span className="ms-2 text-white-50 small">Rifiutato</span>
            </div>
          </div>
          
          {/* Messaggio a fondo pagina */}
          <div className="text-center mt-5">
            <p className="text-white-50 small">
              <FaInfoCircle className="me-1" />
              Clicca su un familiare per visualizzare o modificare i dettagli
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Componente per la visualizzazione del grafico a torta della distribuzione dei contatti
  const ContactDistributionView = () => {
    // Calcola la distribuzione dei contatti per tipo di relazione
    const relationshipDistribution = contacts.reduce((acc, contact) => {
      const relationship = contact.relationship;
      if (!acc[relationship]) {
        acc[relationship] = 0;
      }
      acc[relationship]++;
      return acc;
    }, {});
    
    // Prepara i dati per il grafico
    const pieData = Object.keys(relationshipDistribution).map(key => ({
      name: key,
      value: relationshipDistribution[key]
    }));
    
    // Colori per le diverse relazioni
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    
    // Calcola la distribuzione per livello di accesso
    const accessDistribution = contacts.reduce((acc, contact) => {
      const access = contact.inheritanceAccess;
      if (!acc[access]) {
        acc[access] = 0;
      }
      acc[access]++;
      return acc;
    }, {});
    
    // Prepara i dati per il grafico a barre
    const barData = Object.keys(accessDistribution).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: accessDistribution[key]
    }));
    
    return (
      <div className="py-4">
        <Row>
          <Col md={6}>
            <div className="mb-4 glass-premium">
              <div className="p-3 border-bottom border-white border-opacity-10">
                <h5 className="mb-0 fw-semibold">Distribuzione per relazione</h5>
              </div>
              <div className="p-3">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} contatti`, 'Numero']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.85)', 
                        borderRadius: '0.5rem',
                        border: 'none'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4 glass-premium">
              <div className="p-3 border-bottom border-white border-opacity-10">
                <h5 className="mb-0 fw-semibold">Livelli di accesso</h5>
              </div>
              <div className="p-3">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={barData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <YAxis 
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} contatti`, 'Numero']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.85)', 
                        borderRadius: '0.5rem',
                        border: 'none'
                      }}
                    />
                    <Bar dataKey="count" name="Numero di contatti" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  
  // Componente per la visualizzazione della rete di relazioni - VERSIONE INTERATTIVA
  const RelationshipNetworkView = () => {
    // Stati per zoom e pan
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    
    // Stati per i nodi
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);
    
    // SVG dimensioni
    const svgWidth = 800;
    const svgHeight = 500;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = 200;
    
    // Ref per l'elemento SVG
    const svgRef = useRef(null);
    
    // Inizializza il grafo
    useEffect(() => {
      initializeGraph();
    }, [contacts]);
    
    // Calcola e inizializza il grafo con nodi e collegamenti
    const initializeGraph = () => {
      // Creare nodo centrale (utente)
      const centerNode = { 
        id: 'You', 
        name: 'Tu', 
        type: 'self', 
        x: centerX, 
        y: centerY,
        color: 'rgba(76, 175, 80, 0.7)',
        fixed: true
      };
      
      // Calcola posizioni iniziali
      const initialNodes = [centerNode];
      const newConnections = [];
      
      // Raggruppa contatti per tipo di relazione
      const groupedContacts = contacts.reduce((acc, contact) => {
        if (!acc[contact.relationship]) {
          acc[contact.relationship] = [];
        }
        acc[contact.relationship].push(contact);
        return acc;
      }, {});
      
      // Assegna posizioni iniziali per i nodi in cerchio
      const relationTypes = Object.keys(groupedContacts);
      
      relationTypes.forEach((relationType, groupIndex) => {
        const contacts = groupedContacts[relationType];
        const angleStep = (2 * Math.PI) / relationTypes.length;
        const groupAngle = angleStep * groupIndex;
        
        // Posiziona i contatti in un cluster
        contacts.forEach((contact, contactIndex) => {
          // Calcola l'angolo per questo contatto
          const subAngle = (contactIndex - (contacts.length - 1) / 2) * 0.2;
          const angle = groupAngle + subAngle;
          
          // Posizione sulla circonferenza + un po' di randomizzazione
          const jitter = Math.random() * 20 - 10;
          const distance = radius + jitter;
          
          const node = {
            id: contact.id,
            name: contact.name,
            type: contact.relationship.toLowerCase(),
            role: contact.role,
            color: getTypeColor(contact.relationship.toLowerCase()),
            x: centerX + distance * Math.cos(angle),
            y: centerY + distance * Math.sin(angle),
            status: contact.status,
            contact: contact,
            fixed: false
          };
          
          initialNodes.push(node);
          
          // Crea connessione tra utente e contatto
          newConnections.push({
            source: 'You',
            target: contact.id,
            type: contact.relationship.toLowerCase()
          });
        });
      });
      
      // Aggiungi connessioni tra familiari
      const families = {};
      contacts.filter(c => c.relationship === 'Familiare').forEach(contact => {
        if (!families[contact.role]) {
          families[contact.role] = [];
        }
        families[contact.role].push(contact.id);
      });
      
      // Connetti padre e madre
      if (families['padre'] && families['madre']) {
        families['padre'].forEach(padreId => {
          families['madre'].forEach(madreId => {
            newConnections.push({ source: padreId, target: madreId, type: 'coniuge' });
          });
        });
      }
      
      // Connetti genitori con figli
      if (families['figlio'] || families['figlia']) {
        const figli = [...(families['figlio'] || []), ...(families['figlia'] || [])];
        if (families['padre']) {
          families['padre'].forEach(padreId => {
            figli.forEach(figlioId => {
              newConnections.push({ source: padreId, target: figlioId, type: 'genitore' });
            });
          });
        }
        if (families['madre']) {
          families['madre'].forEach(madreId => {
            figli.forEach(figlioId => {
              newConnections.push({ source: madreId, target: figlioId, type: 'genitore' });
            });
          });
        }
      }
      
      // Connetti fratelli tra loro
      if (families['fratello'] && families['fratello'].length > 1) {
        for (let i = 0; i < families['fratello'].length; i++) {
          for (let j = i + 1; j < families['fratello'].length; j++) {
            newConnections.push({ source: families['fratello'][i], target: families['fratello'][j], type: 'fratello' });
          }
        }
      }
      
      // Connetti sorelle tra loro
      if (families['sorella'] && families['sorella'].length > 1) {
        for (let i = 0; i < families['sorella'].length; i++) {
          for (let j = i + 1; j < families['sorella'].length; j++) {
            newConnections.push({ source: families['sorella'][i], target: families['sorella'][j], type: 'sorella' });
          }
        }
      }
      
      // Connetti fratelli e sorelle
      if (families['fratello'] && families['sorella']) {
        families['fratello'].forEach(fratelloId => {
          families['sorella'].forEach(sorellaId => {
            newConnections.push({ source: fratelloId, target: sorellaId, type: 'fratello' });
          });
        });
      }
      
      setNodes(initialNodes);
      setConnections(newConnections);
    };
    
    // Gestori eventi per zoom e pan
    const handleWheel = (e) => {
      e.preventDefault();
      const scaleAmount = e.deltaY < 0 ? 1.1 : 0.9;
      setScale(prevScale => Math.min(Math.max(0.5, prevScale * scaleAmount), 3));
    };
    
    const handleMouseDown = (e) => {
      // Solo se non si sta cliccando su un nodo
      if (e.target.tagName === 'svg') {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setTranslateX(prevX => prevX + dx);
        setTranslateY(prevY => prevY + dy);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleNodeDragStart = (nodeId, e) => {
      // Evita di trascinare il nodo centrale (utente)
      const node = nodes.find(n => n.id === nodeId);
      if (node.fixed) return;
      
      setSelectedNode(nodeId);
      e.stopPropagation();
    };
    
    const handleNodeDrag = (e) => {
      if (!selectedNode) return;
      
      // Converti la posizione del mouse in coordinate SVG tenendo conto di zoom e pan
      const svg = svgRef.current;
      if (!svg) return;
      
      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      
      // Aggiorna la posizione del nodo
      setNodes(prevNodes => 
        prevNodes.map(node => 
          node.id === selectedNode
            ? { ...node, x: svgPoint.x, y: svgPoint.y }
            : node
        )
      );
    };
    
    const handleNodeDragEnd = () => {
      setSelectedNode(null);
    };
    
    // Funzioni per ottenere i colori
    const getTypeColor = (type) => {
      switch(type.toLowerCase()) {
        case 'familiare': return 'rgba(136, 132, 216, 0.7)';
        case 'amico': return 'rgba(130, 202, 157, 0.7)';
        case 'collega': return 'rgba(255, 198, 88, 0.7)';
        case 'legale': return 'rgba(255, 128, 66, 0.7)';
        default: return 'rgba(131, 166, 237, 0.7)';
      }
    };
    
    const getConnectionColor = (type) => {
      switch(type) {
        case 'familiare': return 'rgba(136, 132, 216, 0.6)';
        case 'amico': return 'rgba(130, 202, 157, 0.6)';
        case 'collega': return 'rgba(255, 198, 88, 0.6)';
        case 'legale': return 'rgba(255, 128, 66, 0.6)';
        case 'coniuge': return 'rgba(255, 64, 129, 0.6)';
        case 'genitore': return 'rgba(0, 136, 254, 0.6)';
        case 'fratello': return 'rgba(255, 187, 40, 0.6)';
        case 'sorella': return 'rgba(255, 187, 40, 0.6)';
        default: return 'rgba(131, 166, 237, 0.6)';
      }
    };
    
    // Zoom in e Zoom out
    const handleZoomIn = () => {
      setScale(prevScale => Math.min(prevScale * 1.2, 3));
    };
    
    const handleZoomOut = () => {
      setScale(prevScale => Math.max(prevScale * 0.8, 0.5));
    };
    
    const handleReset = () => {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      initializeGraph(); // Reset anche delle posizioni dei nodi
    };
    
    return (
      <div className="py-4">
        <div className="glass-premium" style={{ position: 'relative' }}>
          <div className="p-3 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-semibold">Rete delle relazioni</h5>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="d-flex align-items-center justify-content-center" 
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                onClick={handleZoomIn}
                title="Zoom in"
              >
                <i className="fas fa-plus"></i>
              </Button>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="d-flex align-items-center justify-content-center" 
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                onClick={handleZoomOut}
                title="Zoom out"
              >
                <i className="fas fa-minus"></i>
              </Button>
              <Button 
                variant="outline-light" 
                size="sm" 
                className="d-flex align-items-center justify-content-center" 
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                onClick={handleReset}
                title="Reset"
              >
                <i className="fas fa-redo"></i>
              </Button>
            </div>
          </div>
          <div 
            style={{ 
              height: '500px', 
              width: '100%', 
              position: 'relative',
              cursor: isDragging ? 'grabbing' : 'grab',
              overflow: 'hidden'
            }}
          >
            <svg 
              ref={svgRef}
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              style={{ position: 'absolute', top: 0, left: 0 }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <g transform={`translate(${translateX},${translateY}) scale(${scale})`}>
                {/* Connessioni */}
                {connections.map((conn, index) => {
                  const source = nodes.find(n => n.id === conn.source);
                  const target = nodes.find(n => n.id === conn.target);
                  
                  if (!source || !target) return null;
                  
                  // Calcola se uno dei nodi collegati è evidenziato
                  const isHighlighted = 
                    hoveredNode === source.id || 
                    hoveredNode === target.id;
                  
                  return (
                    <line 
                      key={`line-${index}`}
                      x1={source.x} 
                      y1={source.y} 
                      x2={target.x} 
                      y2={target.y} 
                      stroke={getConnectionColor(conn.type)}
                      strokeWidth={isHighlighted ? "3" : "2"}
                      strokeOpacity={isHighlighted ? "0.9" : "0.6"}
                    />
                  );
                })}
                
                {/* Nodi */}
                {nodes.map((node) => {
                  // Determina se questo nodo è evidenziato
                  const isHighlighted = hoveredNode === node.id;
                  const isYou = node.id === 'You';
                  
                  // Raggio leggermente più grande per il nodo centrale
                  const nodeRadius = isYou ? 30 : 22;
                  
                  // Gestisci l'interazione con il nodo
                  const handleNodeMouseDown = (e) => {
                    handleNodeDragStart(node.id, e);
                  };
                  
                  const handleNodeMouseEnter = () => {
                    setHoveredNode(node.id);
                  };
                  
                  const handleNodeMouseLeave = () => {
                    setHoveredNode(null);
                  };
                  
                  return (
                    <g 
                      key={`node-${node.id}`}
                      onMouseDown={handleNodeMouseDown}
                      onMouseEnter={handleNodeMouseEnter}
                      onMouseLeave={handleNodeMouseLeave}
                      style={{ cursor: node.fixed ? 'default' : 'pointer' }}
                    >
                      {/* Cerchio di background per effetto hover */}
                      {isHighlighted && (
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={nodeRadius + 5}
                          fill={node.color}
                          fillOpacity="0.3"
                        />
                      )}
                      
                      {/* Cerchio del nodo */}
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={nodeRadius}
                        fill={node.color}
                        fillOpacity={isHighlighted ? "0.8" : "0.5"}
                        stroke={node.color}
                        strokeOpacity="0.9"
                        strokeWidth={isHighlighted ? "2" : "1.5"}
                      />
                      
                      {/* Indicatore di stato (solo per i contatti) */}
                      {!isYou && node.status && (
                        <circle 
                          cx={node.x + nodeRadius * 0.7} 
                          cy={node.y - nodeRadius * 0.7} 
                          r={5}
                          fill={
                            node.status === 'confermato' ? '#4CAF50' :
                            node.status === 'in attesa' ? '#FFC107' : '#F44336'
                          }
                          stroke="#1a1a1a"
                          strokeWidth="1"
                        />
                      )}
                      
                      {/* Testo del nodo */}
                      <text 
                        x={node.x} 
                        y={node.y - 5} 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        fill="rgba(255, 255, 255, 0.9)"
                        fontSize={isYou ? "14px" : "12px"}
                        fontWeight={isYou ? "bold" : "normal"}
                      >
                        {isYou ? node.name : node.name.split(' ')[0]}
                      </text>
                      
                      {/* Ruolo (solo per i contatti) */}
                      {!isYou && (
                        <text 
                          x={node.x} 
                          y={node.y + 8} 
                          textAnchor="middle" 
                          dominantBaseline="middle"
                          fill="rgba(255, 255, 255, 0.7)"
                          fontSize="9px"
                        >
                          {node.role}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
            
            {/* Tooltip per il nodo selezionato */}
            {hoveredNode && (
              <div 
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '0.75rem',
                  ...glassStyle,
                  background: 'rgba(0, 0, 0, 0.5)',
                  maxWidth: '250px',
                  zIndex: 100
                }}
              >
                {(() => {
                  const node = nodes.find(n => n.id === hoveredNode);
                  if (!node || node.id === 'You') return null;
                  
                  const contact = node.contact;
                  if (!contact) return null;
                  
                  return (
                    <>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">{contact.avatar}</div>
                        <div className="fw-semibold">{contact.name}</div>
                      </div>
                      <div className="text-white-50 small mb-1">
                        <strong>Email:</strong> {contact.email}
                      </div>
                      <div className="text-white-50 small mb-1">
                        <strong>Telefono:</strong> {contact.phone}
                      </div>
                      <div className="text-white-50 small mb-1">
                        <strong>Ruolo:</strong> {contact.role}
                      </div>
                      <div className="text-white-50 small mb-1">
                        <strong>Accesso:</strong> {contact.inheritanceAccess}
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <div 
                          className="rounded-circle me-2" 
                          style={{
                            width: '0.65rem', 
                            height: '0.65rem', 
                            backgroundColor: 
                              contact.status === 'confermato' ? '#4CAF50' :
                              contact.status === 'in attesa' ? '#FFC107' : '#F44336'
                          }}
                        ></div>
                        <span className="text-white-50 small">
                          {contact.status === 'confermato' ? 'Confermato' :
                           contact.status === 'in attesa' ? 'In attesa' : 'Rifiutato'}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
            
            {/* Istruzioni */}
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                padding: '0.75rem',
                ...glassStyle,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 50
              }}
              className="text-white-50 small"
            >
              <div className="fw-semibold mb-1">Interazioni:</div>
              <div>• Trascina lo sfondo per spostare il grafo</div>
              <div>• Rotella del mouse per zoom</div>
              <div>• Trascina i nodi per riposizionarli</div>
              <div>• Passa sopra ai nodi per dettagli</div>
            </div>
            
            {/* Legenda */}
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                padding: '0.75rem',
                ...glassStyle,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 50
              }}
            >
              <div className="small fw-semibold mb-2">Legenda:</div>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center">
                  <div style={{ width: '12px', height: '12px', backgroundColor: getTypeColor('familiare'), borderRadius: '50%' }}></div>
                  <span className="ms-2 small text-white-50">Familiare</span>
                </div>
                <div className="d-flex align-items-center">
                  <div style={{ width: '12px', height: '12px', backgroundColor: getTypeColor('amico'), borderRadius: '50%' }}></div>
                  <span className="ms-2 small text-white-50">Amico</span>
                </div>
                <div className="d-flex align-items-center">
                  <div style={{ width: '12px', height: '12px', backgroundColor: getTypeColor('collega'), borderRadius: '50%' }}></div>
                  <span className="ms-2 small text-white-50">Collega</span>
                </div>
                <div className="d-flex align-items-center">
                  <div style={{ width: '12px', height: '12px', backgroundColor: getTypeColor('legale'), borderRadius: '50%' }}></div>
                  <span className="ms-2 small text-white-50">Legale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render delle statistiche dei contatti
  const renderContactStats = () => {
    const totalContacts = contacts.length;
    
    // Conta i contatti per tipo di relazione
    const relationCounts = contacts.reduce((acc, contact) => {
      acc[contact.relationship] = (acc[contact.relationship] || 0) + 1;
      return acc;
    }, {});
    
    // Conta i contatti per stato
    const statusCounts = contacts.reduce((acc, contact) => {
      acc[contact.status || 'in attesa'] = (acc[contact.status || 'in attesa'] || 0) + 1;
      return acc;
    }, {});
    
    return (
      <Row className="g-4 text-center mb-5">
        <Col sm={4}>
          <div className="glass-premium p-3">
            <div className="text-primary mb-2">
              <FaUserFriends size={22} />
            </div>
            <p className="h2 mb-0 fw-semibold">{totalContacts}</p>
            <p className="text-white-50 small mb-0">Contatti totali</p>
          </div>
        </Col>
        
        <Col sm={4}>
          <div className="glass-premium p-3">
            <div className="text-success mb-2">
              <FaUserFriends size={22} />
            </div>
            <p className="h2 mb-0 fw-semibold">{relationCounts['Familiare'] || 0}</p>
            <p className="text-white-50 small mb-0">Familiari</p>
          </div>
        </Col>
        
        <Col sm={4}>
          <div className="glass-premium p-3">
            <div className="text-warning mb-2">
              <FaUserFriends size={22} />
            </div>
            <p className="h2 mb-0 fw-semibold">{statusCounts['confermato'] || 0}</p>
            <p className="text-white-50 small mb-0">Confermati</p>
          </div>
        </Col>
      </Row>
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
          {/* Header con titolo */}
          <header className="text-center text-lg-start pt-4 pb-5">
            <RevealOnScroll direction="bottom" duration={0.4}>
              <h1 className="display-4 fw-bold mb-0" style={appleStyle}>I tuoi <span style={gradientTextStyle}>contatti</span></h1>
              <p className="text-white-50 lead">Gestisci i destinatari della tua eredità digitale</p>
            </RevealOnScroll>
          </header>
          
          {/* Statistiche contatti */}
          <RevealOnScroll direction="bottom" duration={0.4}>
            {renderContactStats()}
          </RevealOnScroll>
          
          {/* Barra di ricerca e azioni */}
          <RevealOnScroll direction="bottom" duration={0.4}>
            <div className="mb-4 d-flex flex-column flex-md-row gap-3 align-items-md-center">
              <div className="position-relative flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="Cerca contatti..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="py-2 ps-5 bg-white bg-opacity-10 border-0 text-white"
                  style={{ borderRadius: '2rem' }}
                />
                <FaSearch className="position-absolute top-50 translate-middle-y text-white-50 ms-3" />
              </div>
              
              <div className="d-flex gap-2">
                <Button
                  variant="outline-light"
                  className="px-3 py-2 d-flex align-items-center"
                  style={{ borderRadius: '2rem' }}
                  onClick={toggleSortDirection}
                >
                  {sortDirection === 'asc' ? (
                    <>
                      <FaSortAlphaDown className="me-2" /> A-Z
                    </>
                  ) : (
                    <>
                      <FaSortAlphaUp className="me-2" /> Z-A
                    </>
                  )}
                </Button>
                
                <div className="dropdown">
                  <Button
                    variant="outline-light"
                    className="px-3 py-2 d-flex align-items-center dropdown-toggle"
                    style={{ borderRadius: '2rem' }}
                    data-bs-toggle="dropdown"
                  >
                    <FaFilter className="me-2" /> 
                    {filterRelation === 'all' ? 'Tutti' : filterRelation}
                  </Button>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark border-0 glass-premium">
                    <li>
                      <button 
                        className="dropdown-item text-white-50 py-2 px-3"
                        onClick={() => setFilterRelation('all')}
                      >
                        Tutti
                      </button>
                    </li>
                    <div className="dropdown-divider border-white border-opacity-10"></div>
                    {relationships.map(rel => (
                      <li key={rel}>
                        <button 
                          className="dropdown-item text-white-50 py-2 px-3"
                          onClick={() => setFilterRelation(rel)}
                        >
                          {rel}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Pulsante per visualizzare i grafici */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="info"
                    className="px-3 py-2 d-flex align-items-center fw-semibold"
                    style={{ borderRadius: '2rem' }}
                    onClick={() => setShowGraphsModal(true)}
                  >
                    <FaChartPie className="me-2" /> 
                    <span className="d-none d-sm-inline">Grafici</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    className="px-3 py-2 d-flex align-items-center fw-semibold"
                    style={{ borderRadius: '2rem' }}
                    onClick={() => setShowAddContactModal(true)}
                  >
                    <FaUserPlus className="me-2" /> 
                    <span className="d-none d-sm-inline">Aggiungi</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>
          
          {/* Elenco contatti */}
          <RevealOnScroll direction="bottom" duration={0.4}>
            <Card className="glass-premium border-0 overflow-hidden">
              {sortedContacts.length > 0 ? (
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead className="border-bottom border-white border-opacity-10">
                        <tr>
                          <th scope="col" className="fw-semibold ps-4 py-3">Nome</th>
                          <th scope="col" className="fw-semibold py-3 d-none d-md-table-cell">Email</th>
                          <th scope="col" className="fw-semibold py-3 d-none d-lg-table-cell">Telefono</th>
                          <th scope="col" className="fw-semibold py-3">Relazione</th>
                          <th scope="col" className="fw-semibold py-3 d-none d-md-table-cell">Accesso</th>
                          <th scope="col" className="fw-semibold py-3 d-none d-lg-table-cell">Stato</th>
                          <th scope="col" className="fw-semibold py-3 text-end pe-4" width="60"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedContacts.map((contact, index) => (
                          <tr key={contact.id} className="align-middle">
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-10 rounded-circle p-2 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                  <span style={{ fontSize: '1.2rem' }}>{contact.avatar}</span>
                                </div>
                                <div>
                                  <span className="fw-medium d-block">{contact.name}</span>
                                  <small className="text-white-50 d-md-none">{contact.email}</small>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 d-none d-md-table-cell text-white-50">{contact.email}</td>
                            <td className="py-3 d-none d-lg-table-cell text-white-50">{contact.phone}</td>
                            <td className="py-3">
                              <Badge
                                bg={
                                  contact.relationship === 'Familiare' ? 'success' :
                                  contact.relationship === 'Amico' ? 'primary' :
                                  contact.relationship === 'Collega' ? 'info' :
                                  contact.relationship === 'Legale' ? 'warning' : 'secondary'
                                }
                                className="fw-normal"
                                pill
                              >
                                {contact.relationship}
                              </Badge>
                              <div className="small text-white-50 mt-1 d-lg-none">{contact.role}</div>
                            </td>
                            <td className="py-3 d-none d-md-table-cell">
                              <Badge
                                bg={
                                  contact.inheritanceAccess === 'totale' ? 'danger' :
                                  contact.inheritanceAccess === 'parziale' ? 'warning' :
                                  contact.inheritanceAccess === 'limitato' ? 'info' : 'secondary'
                                }
                                className="fw-normal"
                                pill
                              >
                                {contact.inheritanceAccess}
                              </Badge>
                            </td>
                            <td className="py-3 d-none d-lg-table-cell">
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded-circle me-2" 
                                  style={{
                                    width: '0.65rem', 
                                    height: '0.65rem', 
                                    backgroundColor: 
                                      contact.status === 'confermato' ? '#4CAF50' :
                                      contact.status === 'in attesa' ? '#FFC107' : '#F44336'
                                  }}
                                ></div>
                                <span className="text-white-50 small">
                                  {contact.status === 'confermato' ? 'Confermato' :
                                   contact.status === 'in attesa' ? 'In attesa' : 'Rifiutato'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 text-end pe-4">
                              <ContactMenu contact={contact} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              ) : (
                <Card.Body className="text-center py-5">
                  <div className="mb-3">
                    <FaUserFriends size={40} className="text-white-50" />
                  </div>
                  <h3 className="h5 fw-semibold mb-2" style={appleStyle}>Nessun contatto trovato</h3>
                  <p className="text-white-50 mb-4">
                    {search || filterRelation !== 'all'
                      ? 'Nessun contatto corrisponde ai criteri di ricerca'
                      : 'Aggiungi i tuoi primi contatti per la tua eredità digitale'}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="primary"
                      className="px-4 py-2 fw-semibold"
                      style={{ borderRadius: '2rem' }}
                      onClick={() => setShowAddContactModal(true)}
                    >
                      <FaUserPlus className="me-2" />
                      Aggiungi contatto
                    </Button>
                  </motion.div>
                </Card.Body>
              )}
            </Card>
          </RevealOnScroll>
        </Container>
        
        {/* Modali */}
        <AddContactModal />
        <EditContactModal />
        
        {/* Utilizzare il componente GraphsModal importato */}
        <GraphsModal 
          showGraphsModal={showGraphsModal}
          setShowGraphsModal={setShowGraphsModal}
          activeGraphTab={activeGraphTab}
          setActiveGraphTab={setActiveGraphTab}
          contacts={contacts}
          FamilyTreeView={FamilyTreeView}
          ContactDistributionView={ContactDistributionView}
          RelationshipNetworkView={RelationshipNetworkView}
          appleStyle={appleStyle}
        />
      </MainLayout>
    </div>
  );
};

export default ContactsPage;