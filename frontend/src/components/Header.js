import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      padding: '16px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <div>
            <h1 style={{ margin: '0', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '700' }}>
              � ResumeAI Pro
            </h1>
            <p style={{ margin: '4px 0 0 0', opacity: '0.9', fontSize: 'clamp(12px, 2vw, 14px)' }}>
              Intelligent Career Acceleration Platform
            </p>
          </div>

          {/* Desktop Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-menu">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} />
              <span style={{ fontSize: '14px' }}>Welcome, {user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="btn"
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 16px'
              }}
            >
              <LogOut size={16} />
              <span style={{ marginLeft: '4px' }}>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'rgba(102, 126, 234, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '16px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              display: 'none'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                <User size={20} />
                <span>Welcome, {user?.username}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="btn"
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  width: '100%'
                }}
              >
                <LogOut size={16} />
                <span style={{ marginLeft: '4px' }}>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
            .mobile-menu {
              display: block !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;