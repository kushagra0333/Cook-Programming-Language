
import React from 'react';
import { Moon, Sun, BookOpen, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <header className="header-container">
      <div className="header-branding">
        <h1 className="main-title">cook.</h1>
        <div className="subtitle">
          The chillest programming language for chefs.
        </div>
      </div>
      
      <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: location.pathname === '/' ? 1 : 0.7 }}>
            <Terminal size={20} />
            <span style={{ fontWeight: 500 }}>Playground</span>
         </Link>
         <Link to="/docs" className={`nav-link ${location.pathname === '/docs' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: location.pathname === '/docs' ? 1 : 0.7 }}>
            <BookOpen size={20} />
            <span style={{ fontWeight: 500 }}>Docs</span>
         </Link>
         
        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
          {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
