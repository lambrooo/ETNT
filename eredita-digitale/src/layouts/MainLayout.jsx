import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Nav, Row, Col } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaHome, 
  FaTachometerAlt, 
  FaBox, 
  FaUserFriends, 
  FaCog, 
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import backgroundImage from '../assets/images/background-home.png';

const MainLayout = ({ children, title, onLogout }) => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 80]);
  
  const navItems = [
    { path: '/home', name: 'Home', icon: <FaHome /> },
    { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/create-package', name: 'Crea Pacchetto', icon: <FaBox /> },
    { path: '/contacts', name: 'Contatti', icon: <FaUserFriends /> },
    { path: '/settings', name: 'Impostazioni', icon: <FaCog /> },
  ];

  return (
    <div className="min-vh-100 position-relative overflow-hidden d-flex flex-column" style={{ backgroundColor: '#000' }}>
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
      
      {/* Barra di navigazione */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black bg-opacity-50 shadow-sm sticky-top backdrop-blur" style={{ zIndex: 1030 }}>
        <Container>
          <Link className="navbar-brand fw-bold" to="/home">Eredità Digitale</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Nav className="me-auto">
              {navItems.map((item) => (
                <Nav.Item key={item.path}>
                  <Link 
                    to={item.path} 
                    className="nav-link d-flex align-items-center px-3 py-2"
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </Nav.Item>
              ))}
            </Nav>
            <Button 
              variant="outline-light" 
              onClick={onLogout}
              className="d-flex align-items-center"
              style={{ borderRadius: '2rem' }}
            >
              <FaSignOutAlt className="me-2" />
              Disconnetti
            </Button>
          </div>
        </Container>
      </nav>
      
      {/* Contenuto principale */}
      <main className="position-relative flex-grow-1" style={{ zIndex: 2 }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 position-relative bg-black bg-opacity-50" style={{ zIndex: 2 }}>
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
                  <li className="mb-2"><FaEnvelope className="me-2" size={12} />support@etnt.com</li>
                  <li className="mb-2"><FaPhone className="me-2" size={12} />Telefono: +39 123 456 7890</li>
                  <li className="d-flex justify-content-center gap-3 mt-2">
                    <a href="#" className="text-white-50"><FaFacebookF /></a>
                    <a href="#" className="text-white-50"><FaTwitter /></a>
                    <a href="#" className="text-white-50"><FaInstagram /></a>
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

export default MainLayout;