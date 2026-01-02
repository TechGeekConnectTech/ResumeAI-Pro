import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const SkillsGapAnalysis = ({ skillsData }) => {
  if (!skillsData) {
    return null;
  }

  const { matched_skills, missing_skills, skill_gaps } = skillsData;

  const getSkillLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return '#22c55e';
      case 'intermediate':
        return '#f59e0b';
      case 'beginner':
        return '#ef4444';
      case 'none':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <TrendingUp size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Skills Gap Analysis
        </h3>
        <p className="text-gray-600">Detailed breakdown of your skills compared to job requirements.</p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        {/* Matched Skills */}
        <div className="card" style={{ background: '#f0fdf4', border: '1px solid #22c55e' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={20} />
            Matched Skills ({matched_skills?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {matched_skills?.map((skill, index) => (
              <span key={index} className="skill-tag" style={{ background: '#dcfce7', color: '#15803d' }}>
                {skill}
              </span>
            )) || <p className="text-gray-600">No matched skills found</p>}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="card" style={{ background: '#fef2f2', border: '1px solid #ef4444' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={20} />
            Missing Skills ({missing_skills?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {missing_skills?.map((skill, index) => (
              <span key={index} className="skill-tag missing">
                {skill}
              </span>
            )) || <p className="text-gray-600">No missing skills identified</p>}
          </div>
        </div>
      </div>

      {/* Detailed Skill Gaps */}
      {skill_gaps && skill_gaps.length > 0 && (
        <div>
          <h4 style={{ margin: '0 0 16px 0' }}>Skill Gap Details</h4>
          <div className="grid" style={{ gap: '16px' }}>
            {skill_gaps.map((gap, index) => (
              <div key={index} className="card" style={{ background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h5 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{gap.skill}</h5>
                    <span
                      className="skill-tag"
                      style={{
                        background: getImportanceColor(gap.importance),
                        color: 'white',
                        fontSize: '11px'
                      }}
                    >
                      {gap.importance} Priority
                    </span>
                  </div>
                </div>

                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                      Current Level
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: getSkillLevelColor(gap.current_level)
                        }}
                      />
                      <span style={{ fontWeight: '500' }}>{gap.current_level}</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                      Required Level
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: getSkillLevelColor(gap.required_level)
                        }}
                      />
                      <span style={{ fontWeight: '500' }}>{gap.required_level}</span>
                      <TrendingUp size={16} style={{ color: '#22c55e' }} />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Skill Gap</span>
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>
                      {gap.current_level === 'None' ? 100 : gap.current_level === 'Beginner' ? 75 : gap.current_level === 'Intermediate' ? 25 : 0}% to close
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${gap.current_level === 'None' ? 0 : gap.current_level === 'Beginner' ? 25 : gap.current_level === 'Intermediate' ? 75 : 100}%`,
                        background: getSkillLevelColor(gap.current_level)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="card" style={{ marginTop: '24px', background: '#eff6ff', border: '1px solid #3b82f6' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#1d4ed8' }}>Skills Summary</h4>
        <div className="grid grid-3">
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>
              {matched_skills?.length || 0}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Skills Matched</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
              {missing_skills?.length || 0}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Skills Missing</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
              {skill_gaps?.filter(gap => gap.importance === 'High').length || 0}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>High Priority Gaps</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGapAnalysis;