import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ResumeUpload from '../components/ResumeUpload';
import RoleMatching from '../components/RoleMatching';
import SkillsGapAnalysis from '../components/SkillsGapAnalysis';
import ResumeScoreDashboard from '../components/ResumeScoreDashboard';
import UpskillingSuggestions from '../components/UpskillingSuggestions';
import InterviewQuestionsPredictor from '../components/InterviewQuestionsPredictor';
import { User, LogOut, Upload, Target, TrendingUp, Award, BookOpen, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');
  const [resumeData, setResumeData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const handleResumeUpload = (data) => {
    setResumeData(data);
    setActiveTab('role-matching');
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setActiveTab('score-dashboard');
  };

  const tabs = [
    { id: 'upload', label: 'Upload Resume', icon: Upload, disabled: false },
    { id: 'role-matching', label: 'Role Matching', icon: Target, disabled: !resumeData },
    { id: 'score-dashboard', label: 'Resume Score', icon: Award, disabled: !analysisData },
    { id: 'skills-gap', label: 'Skills Gap', icon: TrendingUp, disabled: !analysisData },
    { id: 'upskilling', label: 'Upskilling', icon: BookOpen, disabled: !analysisData },
    { id: 'interview-prep', label: 'Interview Prep', icon: MessageCircle, disabled: !analysisData },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '16px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>
                🤖 AI Resume Analyser
              </h1>
              <p style={{ margin: '4px 0 0 0', opacity: '0.9' }}>
                Intelligent resume analysis and career guidance
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} />
                <span>Welcome, {user?.username}</span>
              </div>
              <button
                onClick={logout}
                className="btn"
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'flex', overflowX: 'auto', gap: '0' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    borderRadius: '0',
                    borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                    opacity: tab.disabled ? 0.5 : 1,
                    cursor: tab.disabled ? 'not-allowed' : 'pointer',
                    padding: '16px 24px',
                    background: activeTab === tab.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    color: activeTab === tab.id ? '#667eea' : '#6b7280',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                  disabled={tab.disabled}
                >
                  <Icon size={20} />
                  <span style={{ display: 'block', fontSize: '12px', marginTop: '4px' }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '32px 0' }}>
        <div className="container">
          {/* Progress Indicator */}
          {resumeData && (
            <div className="card" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>Analysis Progress</h4>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${analysisData ? '100%' : resumeData ? '33%' : '0%'}`
                      }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#667eea' }}>
                    {analysisData ? '100%' : resumeData ? '33%' : '0%'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Complete</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'upload' && (
            <div>
              <ResumeUpload onUploadSuccess={handleResumeUpload} />
              {!resumeData && (
                <div className="card" style={{ marginTop: '24px', background: '#f0f9ff', border: '1px solid #3b82f6' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#1d4ed8' }}>Getting Started</h4>
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    <div>
                      <h5 style={{ margin: '0 0 8px 0' }}>📋 What You'll Get:</h5>
                      <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                        <li>Comprehensive resume analysis</li>
                        <li>Skills gap identification</li>
                        <li>Personalized upskilling recommendations</li>
                        <li>Interview question predictions</li>
                        <li>Resume score and improvement tips</li>
                      </ul>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 8px 0' }}>🚀 How It Works:</h5>
                      <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                        <li>Upload your resume (PDF/DOC)</li>
                        <li>Select the target role</li>
                        <li>Get AI-powered analysis</li>
                        <li>Receive personalized recommendations</li>
                        <li>Prepare for interviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'role-matching' && resumeData && (
            <RoleMatching 
              resumeId={resumeData.resume_id} 
              onRoleMatch={handleAnalysisComplete}
            />
          )}

          {activeTab === 'score-dashboard' && analysisData && (
            <ResumeScoreDashboard scoreData={analysisData.resume_score} />
          )}

          {activeTab === 'skills-gap' && analysisData && (
            <SkillsGapAnalysis skillsData={analysisData.skills_analysis} />
          )}

          {activeTab === 'upskilling' && analysisData && (
            <UpskillingSuggestions upskillingSuggestions={analysisData.upskilling_suggestions} />
          )}

          {activeTab === 'interview-prep' && analysisData && (
            <InterviewQuestionsPredictor interviewQuestions={analysisData.interview_questions} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: '#1f2937', 
        color: 'white', 
        padding: '32px 0',
        marginTop: '64px'
      }}>
        <div className="container text-center">
          <p style={{ margin: '0 0 8px 0' }}>
            Built with ❤️ using React and AI technology
          </p>
          <p style={{ margin: '0', fontSize: '14px', opacity: '0.7' }}>
            © 2026 AI Resume Analyser. Empowering your career journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;