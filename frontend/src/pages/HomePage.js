import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain, Target, TrendingUp, FileText, Users, Shield, ArrowRight, Check, Star } from 'lucide-react';
import PlatformScreenshot from '../components/PlatformScreenshot';

const HomePage = ({ onGetStarted }) => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms analyze your resume against job requirements using state-of-the-art natural language processing."
    },
    {
      icon: <Target size={24} />,
      title: "Smart Role Matching",
      description: "Get precise role compatibility scores and discover which positions align best with your skillset."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Skills Gap Analysis", 
      description: "Identify missing skills and get actionable insights on what to learn next to advance your career."
    },
    {
      icon: <FileText size={24} />,
      title: "Resume Optimization",
      description: "Receive detailed scoring and recommendations to improve your resume's effectiveness."
    },
    {
      icon: <Users size={24} />,
      title: "Interview Preparation",
      description: "Get personalized interview questions tailored to your experience and target role."
    },
    {
      icon: <Shield size={24} />,
      title: "Upskilling Roadmap",
      description: "Receive customized learning paths with resources to bridge skill gaps and boost your career."
    }
  ];

  const benefits = [
    "Increase interview callback rates by 40%",
    "Identify missing skills in minutes",
    "Get personalized career guidance",
    "Access AI-powered insights",
    "Track your progress over time",
    "Stay competitive in the job market"
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Upload Resume",
      description: "Simply upload your resume in PDF, DOC, or DOCX format"
    },
    {
      step: "2", 
      title: "Select Target Role",
      description: "Choose your desired job role or paste a job description"
    },
    {
      step: "3",
      title: "Get AI Analysis", 
      description: "Receive comprehensive analysis, scoring, and recommendations"
    },
    {
      step: "4",
      title: "Improve & Succeed",
      description: "Follow personalized suggestions to enhance your profile"
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>ResumeAI Pro</span>
              <span style={{ 
                fontSize: '0.6em',
                fontWeight: '600',
                opacity: '0.9'
              }}>
                Intelligent Career Acceleration Platform
              </span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              marginBottom: '2.5rem',
              opacity: '0.95',
              maxWidth: '700px',
              margin: '0 auto 2.5rem'
            }}>
              Transform your career with AI-powered resume analysis, smart role matching, 
              and personalized upskilling recommendations. Get hired faster with data-driven insights.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={onGetStarted}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.target.style.transform = 'translateY(0)'}
              >
                Get Started Free <ArrowRight size={18} />
              </button>
              <button 
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.borderColor = 'white';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Platform Screenshot */}
          <PlatformScreenshot />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Powerful AI-Driven Features
            </h2>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to accelerate your career and land your dream job
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  color: '#667eea'
                }}>
                  {feature.icon}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginLeft: '0.75rem',
                    color: '#1e293b'
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              How It Works
            </h2>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Get started in minutes with our simple 4-step process
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem'
          }}>
            {howItWorks.map((step, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 auto 1.5rem'
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1e293b'
                }}>
                  {step.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#1e293b'
              }}>
                Why Choose ResumeAI Pro?
              </h2>
              <p style={{ 
                fontSize: '1.2rem',
                color: '#64748b',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Join thousands of professionals who have accelerated their careers with our AI-powered platform.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      color: '#10b981',
                      backgroundColor: '#d1fae5',
                      borderRadius: '50%',
                      padding: '4px'
                    }}>
                      <Check size={16} />
                    </div>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '3rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '0.5rem'
              }}>
                10K+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '2rem' }}>
                Resumes Analyzed Successfully
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.25rem',
                marginBottom: '1rem'
              }}>
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={20} fill="currentColor" />
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                4.9/5 Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>
            Ready to Accelerate Your Career?
          </h2>
          <p style={{ 
            fontSize: '1.2rem',
            opacity: '0.9',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Join thousands of professionals who have transformed their careers with ResumeAI Pro. 
            Get started today and unlock your potential.
          </p>
          <button 
            onClick={onGetStarted}
            style={{
              padding: '1.25rem 3rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              background: 'white',
              color: '#1e293b',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            Get Started Free <ArrowRight size={20} />
          </button>
          <p style={{ 
            fontSize: '0.9rem',
            opacity: '0.7',
            marginTop: '1rem'
          }}>
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;