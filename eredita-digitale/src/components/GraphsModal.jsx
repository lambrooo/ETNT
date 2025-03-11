// components/GraphsModal.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Modal, Button, Nav, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { 
  FaChartPie, FaInfoCircle, FaProjectDiagram, FaSitemap, FaTimes, 
  FaArrowRight, FaSearch, FaPlus, FaDownload, FaCog, FaFilter,
  FaMagic, FaExpand, FaCompress, FaQuestionCircle, FaEye
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useResizeDetector } from 'react-resize-detector';

// Utility per prevenire lo scroll durante lo zoom
const usePreventScroll = () => {
  useEffect(() => {
    const preventDefault = (e) => {
      if (e.target.closest('.graph-container')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('wheel', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', preventDefault);
    };
  }, []);
};

const GraphsModal = ({ 
  showGraphsModal, 
  setShowGraphsModal, 
  activeGraphTab, 
  setActiveGraphTab, 
  contacts,
  FamilyTreeView,
  ContactDistributionView,
  RelationshipNetworkView,
  appleStyle
}) => {
  usePreventScroll();
  
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoLayout, setIsAutoLayout] = useState(true);
  const [highlightMode, setHighlightMode] = useState(false);
  const [viewMode, setViewMode] = useState('modern'); // 'modern', 'minimal', 'detailed'
  const [showLegend, setShowLegend] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'dark', 'neon', 'elegant'
  
  const graphContainerRef = useRef(null);
  const { width, height } = useResizeDetector({ targetRef: graphContainerRef });
  
  // Simulazione caricamento dati con animazioni fluide
  useEffect(() => {
    if (showGraphsModal) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showGraphsModal, activeGraphTab]);

  const handleZoom = useCallback((event) => {
    if (event.target.closest('.graph-container')) {
      event.preventDefault();
      const delta = event.deltaY * -0.01;
      setZoomLevel(prevZoom => Math.min(200, Math.max(50, prevZoom + delta * 5)));
    }
  }, []);

  useEffect(() => {
    const container = graphContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleZoom, { passive: false });
      return () => container.removeEventListener('wheel', handleZoom);
    }
  }, [handleZoom]);

  // Animazioni e varianti per transizioni fluide
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  // Stili del tema
  const getThemeStyles = () => {
    switch(theme) {
      case 'neon':
        return {
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          accent: 'rgba(103, 232, 249, 0.8)',
          border: 'rgba(103, 232, 249, 0.3)',
          text: '#fff',
          shadow: '0 0 20px rgba(103, 232, 249, 0.4)'
        };
      case 'elegant':
        return {
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          accent: 'rgba(255, 140, 85, 0.8)',
          border: 'rgba(255, 140, 85, 0.3)',
          text: '#fff',
          shadow: '0 0 20px rgba(255, 140, 85, 0.3)'
        };
      default: // dark
        return {
          background: 'linear-gradient(135deg, #121212 0%, #1e1e30 100%)',
          accent: 'rgba(25, 135, 255, 0.8)',
          border: 'rgba(25, 135, 255, 0.3)',
          text: '#fff',
          shadow: '0 0 20px rgba(25, 135, 255, 0.3)'
        };
    }
  };
  
  const themeStyles = getThemeStyles();

  // Componente per la legenda
  const GraphLegend = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="position-absolute end-0 top-0 p-3 m-3 rounded-3"
      style={{ 
        background: 'rgba(0,0,0,0.7)', 
        backdropFilter: 'blur(8px)',
        border: `1px solid ${themeStyles.border}`,
        zIndex: 10,
        maxWidth: '200px'
      }}
    >
      <h6 className="text-white mb-3 d-flex align-items-center">
        <FaInfoCircle className="me-2" style={{ color: themeStyles.accent }} />
        Legenda
      </h6>
      <div className="d-flex flex-column gap-2">
        {activeGraphTab === 'familyTree' && (
          <>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#4CAF50' }}></div>
              <small className="text-white-50">Famiglia diretta</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#2196F3' }}></div>
              <small className="text-white-50">Parenti stretti</small>
            </div>
          </>
        )}
        
        {activeGraphTab === 'distribution' && (
          <>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#E91E63' }}></div>
              <small className="text-white-50">Categoria primaria</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#9C27B0' }}></div>
              <small className="text-white-50">Categoria secondaria</small>
            </div>
          </>
        )}
        
        {activeGraphTab === 'network' && (
          <>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#FF9800' }}></div>
              <small className="text-white-50">Relazione forte</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="rounded-circle me-2" style={{ width: 12, height: 12, backgroundColor: '#607D8B' }}></div>
              <small className="text-white-50">Relazione debole</small>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  // Pannello di controllo per la visualizzazione
  const ControlPanel = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-3 d-flex justify-content-between align-items-center flex-wrap"
    >
      <div className="d-flex align-items-center flex-wrap gap-2 mb-2 mb-sm-0">
        <OverlayTrigger placement="top" overlay={<Tooltip>Filtra contatti</Tooltip>}>
          <Button variant="outline-secondary" size="sm" className="rounded-pill d-flex align-items-center">
            <FaFilter size={12} className="me-1" /> <span className="d-none d-sm-inline">Filtra</span>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>Zoom</Tooltip>}>
          <div className="d-flex align-items-center bg-dark bg-opacity-75 rounded-pill px-1 px-sm-3 py-1 border border-secondary">
            <button 
              className="btn btn-sm px-2 text-white-50"
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            >-</button>
            <span className="mx-1 mx-sm-2 text-white-50 small">{zoomLevel}%</span>
            <button 
              className="btn btn-sm px-2 text-white-50"
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
            >+</button>
          </div>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>Cambia visualizzazione</Tooltip>}>
          <div className="dropdown">
            <Button variant="outline-primary" size="sm" className="rounded-pill dropdown-toggle d-flex align-items-center" 
              data-bs-toggle="dropdown">
              <FaEye size={12} className="me-1" /> <span className="d-none d-sm-inline">Vista</span>
            </Button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><button className="dropdown-item" onClick={() => setViewMode('modern')}>Moderna</button></li>
              <li><button className="dropdown-item" onClick={() => setViewMode('minimal')}>Minimale</button></li>
              <li><button className="dropdown-item" onClick={() => setViewMode('detailed')}>Dettagliata</button></li>
            </ul>
          </div>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>Mostra/nascondi legenda</Tooltip>}>
          <Button 
            variant={showLegend ? "primary" : "outline-secondary"} 
            size="sm" 
            className="rounded-pill d-flex align-items-center"
            onClick={() => setShowLegend(!showLegend)}
            style={{ opacity: showLegend ? 1 : 0.8 }}
          >
            <FaInfoCircle size={12} className="me-1" />
          </Button>
        </OverlayTrigger>
      </div>

      <div className="d-flex gap-2">
        <OverlayTrigger placement="top" overlay={<Tooltip>Esporta grafico</Tooltip>}>
          <Button variant="outline-primary" size="sm" className="rounded-pill d-flex align-items-center">
            <FaDownload size={12} className="me-1" /> <span className="d-none d-sm-inline">Esporta</span>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>Schermo intero</Tooltip>}>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="rounded-pill d-flex align-items-center"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <FaCompress size={12} /> : <FaExpand size={12} />}
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>Impostazioni avanzate</Tooltip>}>
          <div className="dropdown">
            <Button variant="outline-secondary" size="sm" className="rounded-pill d-flex align-items-center" 
              data-bs-toggle="dropdown">
              <FaCog size={12} />
            </Button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              <li><button className="dropdown-item" onClick={() => setTheme('dark')}>Tema Scuro</button></li>
              <li><button className="dropdown-item" onClick={() => setTheme('neon')}>Tema Neon</button></li>
              <li><button className="dropdown-item" onClick={() => setTheme('elegant')}>Tema Elegante</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => setIsAutoLayout(!isAutoLayout)}>
                {isAutoLayout ? "Disattiva Layout Automatico" : "Attiva Layout Automatico"}
              </button></li>
              <li><button className="dropdown-item" onClick={() => setHighlightMode(!highlightMode)}>
                {highlightMode ? "Disattiva Modalità Evidenziazione" : "Attiva Modalità Evidenziazione"}
              </button></li>
            </ul>
          </div>
        </OverlayTrigger>
      </div>
    </motion.div>
  );
  
  // Componente per migliorare l'esperienza di visualizzazione dei grafici
  const EnhancedGraphContainer = ({ children }) => {
    return (
      <div 
      ref={graphContainerRef}
      className="graph-container position-relative rounded-4 border overflow-hidden" 
      style={{ 
        boxShadow: themeStyles.shadow,
        borderColor: themeStyles.border,
        background: 'rgba(0,0,0,0.3)',
        minHeight: '450px',
        height: isFullscreen ? 'calc(100vh - 250px)' : 'auto',
        transition: 'all 0.3s ease'
      }}
    >
      {showLegend && <GraphLegend />}
      
      <div className="graph-content h-100 w-100" style={{
        transform: `scale(${zoomLevel/100})`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease',
        height: '100%'
      }}>
        {children}
      </div>
      
      {/* Overlay per effetti hover */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, center) var(--mouse-y, center), rgba(255,255,255,0.03) 0%, transparent 60%)',
          opacity: highlightMode ? 0.7 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 5
        }}
      />
      
      {/* Indicatore di caricamento/elaborazione */}
      {isLoading && (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center"
          style={{ background: 'rgba(0,0,0,0.7)', zIndex: 10 }}>
          <div className="text-center">
            <div className="spinner-grow text-primary mb-3" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
            <p className="text-white-50">Elaborazione dati in corso...</p>
            <div className="progress mt-3" style={{ width: '200px', height: '4px' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Aggiungi event listener per gli effetti hover
useEffect(() => {
  const handleMouseMove = (e) => {
    if (e.target.closest('.graph-container')) {
      const container = e.target.closest('.graph-container');
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    }
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  return () => document.removeEventListener('mousemove', handleMouseMove);
}, []);

// Stile personalizzato per ogni tipo di grafico
const getGraphComponent = () => {
  // Passa le props necessarie a ciascun componente di visualizzazione
  const graphProps = {
    theme,
    viewMode,
    isAutoLayout,
    highlightMode,
    width,
    height,
    contacts
  };

  switch(activeGraphTab) {
    case 'familyTree':
      return <FamilyTreeView {...graphProps} />;
    case 'distribution':
      return <ContactDistributionView {...graphProps} />;
    case 'network':
      return <RelationshipNetworkView {...graphProps} />;
    default:
      return <div className="text-center text-white-50 p-5">Seleziona una visualizzazione</div>;
  }
};

// Suggerimenti interattivi basati sul grafico corrente
const GraphInsights = () => {
  const insights = {
    familyTree: [
      "Visualizza la struttura gerarchica dei tuoi contatti familiari",
      "Identifica rapidamente i rami familiari più estesi",
      "Esplora i legami tra diverse generazioni"
    ],
    distribution: [
      "Analizza la distribuzione dei contatti per categoria",
      "Identifica i gruppi più numerosi nella tua rete",
      "Ottimizza la gestione dei tuoi contatti più importanti"
    ],
    network: [
      "Scopri connessioni nascoste tra i tuoi contatti",
      "Identifica i contatti centrali nella tua rete",
      "Visualizza la forza delle relazioni con spessori diversi"
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-3 p-3 rounded-3 border border-secondary border-opacity-25"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      <h6 className="text-white-50 d-flex align-items-center mb-3">
        <FaMagic className="me-2" style={{ color: themeStyles.accent }} /> 
        Suggerimenti per questa visualizzazione
      </h6>
      <div className="d-flex flex-wrap gap-2">
        {insights[activeGraphTab]?.map((insight, index) => (
          <div key={index} className="bg-dark bg-opacity-50 p-2 rounded-pill border border-secondary border-opacity-25 small text-white-50">
            <FaQuestionCircle className="me-1" size={12} /> {insight}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

return (
  <Modal
    show={showGraphsModal}
    onHide={() => setShowGraphsModal(false)}
    size={isFullscreen ? "xl" : "lg"}
    centered
    fullscreen={isFullscreen}
    contentClassName="border-0 rounded-4 shadow-lg"
    style={{ 
      backdropFilter: 'blur(15px)',
    }}
    dialogClassName={isFullscreen ? undefined : "modal-90w"}
  >
    <div className="position-absolute top-0 start-0 end-0 bottom-0 overflow-hidden rounded-4" style={{ 
      background: themeStyles.background,
      zIndex: -1
    }}>
      <div className="position-absolute" style={{
        background: `radial-gradient(circle at top right, ${themeStyles.accent}15, transparent 70%)`,
        width: '100%',
        height: '100%'
      }} />
      <div className="position-absolute" style={{
        background: 'radial-gradient(circle at bottom left, rgba(255,105,180,0.1), transparent 70%)',
        width: '100%',
        height: '100%'
      }} />
      {/* Particle effect elements */}
      <div className="particle" style={{
        position: 'absolute',
        width: '2px',
        height: '2px',
        background: themeStyles.accent,
        boxShadow: `0 0 10px ${themeStyles.accent}`,
        top: '20%',
        left: '10%',
        borderRadius: '50%',
        filter: 'blur(1px)',
        animation: 'float 15s infinite linear'
      }}></div>
      <div className="particle" style={{
        position: 'absolute',
        width: '3px',
        height: '3px',
        background: themeStyles.accent,
        boxShadow: `0 0 15px ${themeStyles.accent}`,
        top: '70%',
        left: '85%',
        borderRadius: '50%',
        filter: 'blur(1px)',
        animation: 'float 20s infinite linear'
      }}></div>
    </div>

    <Modal.Header className="border-0 pb-0 position-relative">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Modal.Title className="fw-bold" style={{...appleStyle, zIndex: 10}}>
          <div className="d-flex align-items-center">
            <div className="me-3 text-primary bg-primary bg-opacity-10 p-2 rounded-circle"
              style={{ boxShadow: themeStyles.shadow }}>
              <FaChartPie size={28} />
            </div>
            <div>
              <span className="display-6 fs-4">Visualizzazioni Avanzate</span>
              <p className="text-white-50 mb-0 mt-1 fs-6">Esplora la tua rete con grafici interattivi</p>
            </div>
          </div>
        </Modal.Title>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          variant="link" 
          className="ms-auto p-0 position-relative" 
          onClick={() => setShowGraphsModal(false)}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            border: 'none',
            zIndex: 10
          }}
        >
          <FaTimes className="text-white" size={18} />
        </Button>
      </motion.div>
    </Modal.Header>
    
    <Modal.Body className="p-0 position-relative">
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.p 
          className="text-white-50 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Visualizza la tua rete di contatti attraverso grafici interattivi di qualità professionale. 
          Scopri relazioni nascoste, analizza la distribuzione e ottieni insight preziosi sui tuoi eredi digitali.
        </motion.p>
      </motion.div>
      
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Nav 
            variant="tabs" 
            activeKey={activeGraphTab} 
            onSelect={(k) => setActiveGraphTab(k)}
            className="border-0 mb-1 gap-2"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {[
              { key: 'familyTree', icon: <FaSitemap />, title: 'Albero Familiare' },
              { key: 'distribution', icon: <FaChartPie />, title: 'Distribuzione' },
              { key: 'network', icon: <FaProjectDiagram />, title: 'Rete di Relazioni' }
            ].map((tab, index) => (
              <Nav.Item key={tab.key}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Nav.Link 
                    eventKey={tab.key} 
                    className={`d-flex align-items-center px-4 py-3 border-0 rounded-top ${activeGraphTab === tab.key ? 'bg-primary bg-opacity-10 text-primary' : 'text-white-50'}`}
                    style={{ 
                      borderBottom: activeGraphTab === tab.key ? `2px solid ${themeStyles.accent}` : 'none',
                      margin: '0 2px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="me-2">{tab.icon}</span>
                    <span className="fw-medium">{tab.title}</span>
                  </Nav.Link>
                </motion.div>
              </Nav.Item>
            ))}
          </Nav>
        </motion.div>
      </div>
      
      <div className="px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGraphTab}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <ControlPanel />
            
            <EnhancedGraphContainer>
              {getGraphComponent()}
            </EnhancedGraphContainer>
            
            <GraphInsights />
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal.Body>
    
    <Modal.Footer className="border-0 pt-0 position-relative">
      <div className="d-flex justify-content-between w-100 align-items-center">
        <motion.span 
          className="text-white-50 small d-flex align-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FaInfoCircle className="me-2" /> 
          Stai visualizzando <span className="text-primary mx-1 fw-bold">{contacts.length}</span> contatti
        </motion.span>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="primary" 
            onClick={() => setShowGraphsModal(false)}
            className="px-4 py-2 d-flex align-items-center"
            style={{ 
              borderRadius: '2rem',
              background: `linear-gradient(45deg, ${themeStyles.accent}, ${themeStyles.accent}dd)`,
              border: 'none',
              boxShadow: themeStyles.shadow
            }}
          >
            <span>Chiudi</span>
            <FaArrowRight className="ms-2" />
          </Button>
        </motion.div>
      </div>
    </Modal.Footer>
    
   {/* CSS per le animazioni delle particelle */}
<style jsx>{`
@keyframes float {
0% { transform: translate(0, 0) rotate(0deg); }
25% { transform: translate(10px, 10px) rotate(90deg); }
50% { transform: translate(5px, 15px) rotate(180deg); }
75% { transform: translate(-10px, 5px) rotate(270deg); }
100% { transform: translate(0, 0) rotate(360deg); }
}    .graph-container:hover .particle {
  animation-play-state: running;
}

.graph-container .particle {
  animation-play-state: paused;
}

/* Stili per l'effetto di hover sui nodi del grafico */
.graph-node {
  transition: all 0.3s ease;
}

.graph-node:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px ${themeStyles.accent});
  z-index: 100;
}

.graph-link {
  transition: all 0.3s ease;
}

.graph-link:hover {
  stroke-width: 3;
  filter: drop-shadow(0 0 3px ${themeStyles.accent});
}
`}</style>
</Modal>
);
};

export default GraphsModal;