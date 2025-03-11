import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CreatePackagePage from './pages/CreatePackagePage';
import ContactsPage from './pages/ContactsPage';
import SettingsPage from './pages/SettingsPage';
import PlaceholderPage from './pages/PlaceholderPage';
// New Pages
import FaqPage from './pages/FaqPage';
import SupportPage from './pages/SupportPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un controllo dell'autenticazione
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (credentials) => {
    // Per ora accettiamo qualsiasi login come richiesto
    console.log('Login con:', credentials);
    localStorage.setItem('user', JSON.stringify({ email: credentials.email }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        {/* Utilizziamo le pagine corrette invece di PlaceholderPage */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/create-package" 
          element={isAuthenticated ? <CreatePackagePage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/contacts" 
          element={isAuthenticated ? <ContactsPage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <SettingsPage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        {/* Per qualsiasi altra rotta non gestita, mostriamo ancora la PlaceholderPage */}
        <Route 
          path="*" 
          element={isAuthenticated ? <PlaceholderPage onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        {/* New routes for resources pages */}
<Route path="/faq" element={<FaqPage onLogout={handleLogout} />} />
<Route path="/support" element={<SupportPage onLogout={handleLogout} />} />
<Route path="/privacy" element={<PrivacyPage onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;