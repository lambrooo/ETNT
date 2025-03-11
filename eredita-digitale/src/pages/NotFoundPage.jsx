import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center"
      >
        <div className="relative mb-6">
          <div className="text-[120px] md:text-[150px] font-bold text-white opacity-10 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Pagina non trovata</h1>
          </div>
        </div>
        
        <p className="text-white/80 text-xl mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium shadow-soft hover:shadow-lg transition-all duration-300 animated-button flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Torna alla home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" />
            Torna indietro
          </button>
        </div>
      </motion.div>
      
      {/* Effetti di sfondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary-600/20 blur-3xl"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;