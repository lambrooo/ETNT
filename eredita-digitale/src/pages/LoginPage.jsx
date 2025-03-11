import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, 
  FaEnvelope, 
  FaKey, 
  FaUserPlus, 
  FaSpinner, 
  FaShieldAlt,
  FaFingerprint
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-login.png';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Stili per il tema premium
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

  // Simuliamo un caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuliamo una richiesta al server
    setTimeout(() => {
      setIsLoggedIn(true);
      
      // Breve delay per mostrare animazione di successo
      setTimeout(() => {
        onLogin({ email, password });
        setIsLoading(false);
      }, 1000);
    }, 1500);
  };

  // Componente per lo schermo di caricamento
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
                <p className="text-white-50 small">Accesso in corso...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Stili CSS globali
  const GlobalStyles = () => (
    <style>
      {`
        body {
          background-color: #0a0e17;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .glass-premium {
          background: rgba(25, 35, 55, 0.6) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.8),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
          border-radius: 1.5rem !important;
        }

        .form-control {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 1rem !important;
          color: white !important;
          padding: 0.75rem 1rem 0.75rem 3rem !important;
          height: auto !important;
          transition: all 0.3s ease !important;
        }

        .form-control:focus {
          background: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15) !important;
          border-color: rgba(13, 110, 253, 0.5) !important;
        }

        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        .login-btn-primary {
          border-radius: 2rem !important;
          padding: 0.75rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px !important;
          position: relative !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
          border: none !important;
          background: linear-gradient(90deg, #0d6efd, #a56eff) !important;
        }

        .login-btn-primary:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
        }

        .login-btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .login-btn-primary:hover::before {
          transform: translateX(100%);
        }

        .login-link {
          color: #a56eff !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
          position: relative !important;
        }

        .login-link:hover {
          color: #0d6efd !important;
        }

        .login-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(90deg, #0d6efd, #a56eff);
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
        }

        .login-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .icon-container {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a56eff;
          z-index: 10;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          z-index: 10;
        }

        .password-toggle:hover {
          color: white;
        }
      `}
    </style>
  );

  return (
    <>
      <GlobalStyles />
      <LoadingScreen isLoading={isLoading && isLoggedIn} />
      
      <div className="min-vh-100 d-flex align-items-center position-relative overflow-hidden">
        {/* Background con sfondo sfocato */}
        <div 
          className="position-fixed" 
          style={{ 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            background: `linear-gradient(rgba(10, 14, 23, 0.85), rgba(10, 14, 23, 0.9)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        ></div>

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
            zIndex: 0,
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
            zIndex: 0,
            opacity: 0.5,
            pointerEvents: 'none'
          }}
        ></div>

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} xl={5}>
              {/* Logo e titolo */}
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-5"
              >
                <div className="d-flex justify-content-center mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.2
                    }}
                    className="position-relative"
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        transition: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        borderRadius: '50%',
                        border: '1px solid rgba(13, 110, 253, 0.3)',
                        borderTopColor: 'rgba(13, 110, 253, 0.8)',
                        borderRightColor: 'rgba(165, 110, 255, 0.8)',
                      }}
                    ></motion.div>
                    <div 
                      className="d-flex align-items-center justify-content-center bg-dark rounded-circle"
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        background: 'rgba(25, 35, 55, 0.6)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <FaKey className="text-primary" size={32} />
                    </div>
                  </motion.div>
                </div>
                <motion.h1 
                  className="text-white fw-bold mb-2"
                  style={appleStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  ETNT
                </motion.h1>
                <motion.p 
                  className="text-white-50 mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Il futuro del tuo <span style={gradientTextStyle}>patrimonio digitale</span>
                </motion.p>
              </motion.div>

              {/* Form di login */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="glass-premium p-4 p-md-5">
                  <h2 className="text-white fw-bold text-center mb-4" style={appleStyle}>
                    Accedi al tuo account
                  </h2>
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="text-white-50">Email</Form.Label>
                      <div className="position-relative">
                        <div className="icon-container">
                          <FaEnvelope />
                        </div>
                        <Form.Control 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mail@esempio.com"
                          required
                        />
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label className="text-white-50">Password</Form.Label>
                      <div className="position-relative">
                        <div className="icon-container">
                          <FaLock />
                        </div>
                        <Form.Control 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                        <button 
                          type="button" 
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Nascondi' : 'Mostra'}
                        </button>
                      </div>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check 
                        type="checkbox" 
                        id="rememberMe" 
                        label="Ricordami" 
                        className="text-white-50"
                      />
                      <a href="#" className="login-link small">
                        Password dimenticata?
                      </a>
                    </div>
                    
                    <div className="d-grid">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="login-btn-primary w-100 py-3"
                          variant="primary"
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Accesso in corso...
                            </>
                          ) : (
                            <>
                              <FaFingerprint className="me-2" /> Accedi
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </Form>
                  
                  <div className="text-center mt-4">
                    <p className="text-white-50 mb-2">Non hai ancora un account?</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline-light" 
                        className="rounded-pill px-4 py-2"
                      >
                        <FaUserPlus className="me-2" /> Registrati ora
                      </Button>
                    </motion.div>
                  </div>
                  
                  <div className="text-center mt-4 pt-3 border-top border-white border-opacity-10">
                    <div className="d-flex align-items-center justify-content-center text-white-50 small">
                      <FaShieldAlt className="me-2 text-primary" />
                      <span>Protetto da cifratura avanzata</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Footer minimale */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center mt-4 text-white-50 small"
              >
                <p className="mb-1">© 2025 ETNT - Eredità Digitale. Tutti i diritti riservati.</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="login-link">Privacy</a>
                  <a href="#" className="login-link">Termini di servizio</a>
                  <a href="#" className="login-link">Supporto</a>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;