import React from 'react';
import { FileText, TrendingUp, Target, Users, Star } from 'lucide-react';

const PlatformScreenshot = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '900px',
      margin: '2rem auto',
      border: '1px solid #e2e8f0'
    }}>
      {/* Mock Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '2px solid #f1f5f9',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#1e293b' }}>ResumeAI Pro</span>
        </div>
        <div style={{
          background: '#10b981',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          John Doe
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main Analysis Area */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Resume Analysis Complete</h3>
                <p style={{ margin: '0', opacity: '0.9', fontSize: '0.9rem' }}>Software Engineer Position</p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '80px'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>87%</div>
                <div style={{ fontSize: '0.7rem', opacity: '0.8' }}>Match Score</div>
              </div>
            </div>
          </div>

          {/* Skills Analysis */}
          <div style={{
            background: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} style={{ color: '#667eea' }} />
              Skills Analysis
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Matched Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Python', 'React', 'Node.js', 'SQL'].map(skill => (
                    <span key={skill} style={{
                      background: '#dcfce7',
                      color: '#15803d',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Missing Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Docker', 'AWS'].map(skill => (
                    <span key={skill} style={{
                      background: '#fef2f2',
                      color: '#dc2626',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Upload Section */}
          <div style={{
            border: '2px dashed #cbd5e1',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '1.5rem',
            background: '#f8fafc'
          }}>
            <FileText size={32} style={{ color: '#667eea', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Resume Uploaded</div>
            <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.25rem' }}>✓ Analysis Complete</div>
          </div>

          {/* Quick Stats */}
          <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#374151' }}>Quick Stats</h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Experience Match</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#10b981' }}>92%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Skills Coverage</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#f59e0b' }}>75%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>ATS Score</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#667eea' }}>89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem 0',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <button style={{
          background: '#667eea',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <TrendingUp size={14} />
          View Details
        </button>
        <button style={{
          background: 'transparent',
          color: '#667eea',
          border: '1px solid #667eea',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Users size={14} />
          Get Suggestions
        </button>
      </div>

      {/* Watermark */}
      <div style={{
        textAlign: 'center',
        marginTop: '1rem',
        padding: '0.5rem',
        fontSize: '0.7rem',
        color: '#94a3b8',
        borderTop: '1px solid #f1f5f9'
      }}>
        ResumeAI Pro Platform Interface Preview
      </div>
    </div>
  );
};

export default PlatformScreenshot;