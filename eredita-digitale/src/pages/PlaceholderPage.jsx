import { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHome, FaArrowLeft, FaTools } from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

// Componente per animazioni al scroll
const RevealOnScroll = ({ children, direction = "bottom", delay = 0, duration = 0.5, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();
  
  React.useEffect(() => {
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

const PlaceholderPage = ({ onLogout }) => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 80]);
  
  // Estrai il nome della pagina dall'URL
  const currentPath = location.pathname.substring(1); // Rimuove la "/" iniziale
  const pageName = currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, ' ');
  
  // Stili condivisi
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  };
  
  const appleStyle = {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  
  };
  
  return (
    <div className="overflow-hidden">
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
          background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <MainLayout onLogout={onLogout}>
        <Container className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "calc(100vh - 200px)" }}>
          <RevealOnScroll direction="bottom" duration={0.5}>
            <Card style={glassStyle} className="border-0 text-center p-5">
              <Card.Body>
                <div className="mb-4">
                  <FaTools className="text-primary" style={{ fontSize: '4rem' }} />
                </div>
                <h1 className="display-5 fw-bold mb-3" style={appleStyle}>Pagina in costruzione</h1>
                <p className="lead text-white-50 mb-4">
                  La pagina <span className="text-white fw-medium">{pageName}</span> è in fase di sviluppo. 
                  Torna presto per vedere le nuove funzionalità!
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                  <Link to="/home">
                    <Button variant="primary" className="px-4 py-2 fw-semibold" style={{ borderRadius: '2rem' }}>
                      <FaHome className="me-2" />
                      Torna alla Home
                    </Button>
                  </Link>
                  <Button 
                    variant="outline-light" 
                    className="px-4 py-2" 
                    style={{ borderRadius: '2rem' }}
                    onClick={() => window.history.back()}
                  >
                    <FaArrowLeft className="me-2" />
                    Torna indietro
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </RevealOnScroll>
        </Container>
      </MainLayout>
    </div>
  );
};

// Importazioni necessarie 
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useInView, useAnimation } from 'framer-motion';

export default PlaceholderPage;