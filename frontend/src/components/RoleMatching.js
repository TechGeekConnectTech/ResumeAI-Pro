import React, { useState, useEffect } from 'react';
import { roleService, resumeService } from '../services/api';
import toast from 'react-hot-toast';
import { Briefcase, Search, ArrowRight, Target } from 'lucide-react';

const RoleMatching = ({ resumeId, onRoleMatch }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    // Mock roles data since we don't have the backend endpoint yet
    setRoles([
      {
        role_id: 1,
        role_name: 'Software Developer',
        role_description: 'Develop and maintain web applications using modern technologies'
      },
      {
        role_id: 2,
        role_name: 'Data Scientist',
        role_description: 'Analyze complex datasets and build machine learning models'
      },
      {
        role_id: 3,
        role_name: 'Product Manager',
        role_description: 'Lead product development and strategy for digital products'
      },
      {
        role_id: 4,
        role_name: 'UI/UX Designer',
        role_description: 'Design intuitive and engaging user interfaces and experiences'
      },
      {
        role_id: 5,
        role_name: 'DevOps Engineer',
        role_description: 'Manage CI/CD pipelines and cloud infrastructure'
      }
    ]);
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Set default job description based on role
    const defaultDescriptions = {
      'Software Developer': 'Looking for a skilled software developer with experience in JavaScript, React, Node.js, and database management. Should have strong problem-solving skills and experience with agile development methodologies.',
      'Data Scientist': 'Seeking a data scientist proficient in Python, R, machine learning algorithms, statistical analysis, and data visualization. Experience with big data technologies and cloud platforms preferred.',
      'Product Manager': 'Need an experienced product manager with strong analytical skills, experience in product strategy, user research, and cross-functional team leadership. Background in tech products required.',
      'UI/UX Designer': 'Looking for a creative UI/UX designer with expertise in design tools (Figma, Sketch), user research, wireframing, prototyping, and responsive design principles.',
      'DevOps Engineer': 'Seeking a DevOps engineer with experience in containerization (Docker, Kubernetes), CI/CD pipelines, cloud platforms (AWS, Azure), and infrastructure as code.'
    };
    setJobDescription(defaultDescriptions[role.role_name] || role.role_description);
  };

  const handleAnalyze = async () => {
    if (!selectedRole || !jobDescription.trim()) {
      toast.error('Please select a role and provide job description');
      return;
    }

    setAnalyzing(true);
    try {
      const analysisData = await resumeService.analyzeResume(resumeId, jobDescription);
      
      toast.success('Analysis completed successfully!');
      onRoleMatch && onRoleMatch(analysisData);
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.response?.data?.detail || error.message || 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Target size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Role Matching & Analysis
        </h3>
        <p className="text-gray-600">Select a role to match your resume against and get detailed analysis.</p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div>
          <label className="form-label">Available Roles</label>
          <div className="grid" style={{ gap: '12px' }}>
            {roles.map((role) => (
              <div
                key={role.role_id}
                onClick={() => handleRoleSelect(role)}
                className={`card ${selectedRole?.role_id === role.role_id ? 'selected' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: selectedRole?.role_id === role.role_id ? '2px solid #667eea' : '1px solid #e2e8f0',
                  background: selectedRole?.role_id === role.role_id ? '#eff6ff' : 'white',
                  padding: '16px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Briefcase size={20} style={{ color: '#667eea' }} />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{role.role_name}</h4>
                    <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>{role.role_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="form-label">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="form-input"
            rows={8}
            placeholder="Enter the job description for more accurate analysis..."
            disabled={!selectedRole}
          />
          <p className="text-gray-600" style={{ fontSize: '12px', marginTop: '8px' }}>
            The more detailed the job description, the more accurate the analysis will be.
          </p>
        </div>
      </div>

      {selectedRole && (
        <div className="card" style={{ background: '#f8fafc', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0' }}>Selected Role: {selectedRole.role_name}</h4>
              <p style={{ margin: '0', color: '#6b7280' }}>Ready to analyze your resume against this role</p>
            </div>
            <ArrowRight size={24} style={{ color: '#667eea' }} />
          </div>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        className={`btn btn-primary ${analyzing ? 'loading' : ''}`}
        disabled={!selectedRole || !jobDescription.trim() || analyzing}
        style={{ width: '100%' }}
      >
        <Search size={20} />
        {analyzing ? 'Analyzing Resume...' : 'Analyze Resume'}
      </button>

      {analyzing && (
        <div className="card" style={{ marginTop: '16px', background: '#fef3c7' }}>
          <p style={{ margin: '0', textAlign: 'center' }}>
            🤖 Our AI is analyzing your resume against the selected role. This may take a few moments...
          </p>
        </div>
      )}
    </div>
  );
};

export default RoleMatching;