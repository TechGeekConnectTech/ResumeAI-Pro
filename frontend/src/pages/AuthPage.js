import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { ArrowLeft } from 'lucide-react';

const AuthPage = ({ onBackToHome }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            zIndex: 1000
          }}
          onMouseOver={e => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={e => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      )}
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: 'white' 
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '0.5rem' 
          }}>
            ResumeAI Pro
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            opacity: '0.9' 
          }}>
            Intelligent Career Acceleration Platform
          </p>
        </div>
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;