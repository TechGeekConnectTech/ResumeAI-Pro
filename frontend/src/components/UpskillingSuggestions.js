import React, { useState } from 'react';
import { BookOpen, ExternalLink, Clock, AlertCircle, CheckCircle, Star } from 'lucide-react';

const UpskillingSuggestions = ({ upskillingSuggestions }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  if (!upskillingSuggestions || upskillingSuggestions.length === 0) {
    return null;
  }

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
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

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertCircle size={16} />;
      case 'medium':
        return <Clock size={16} />;
      case 'low':
        return <CheckCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <BookOpen size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Upskilling Recommendations
        </h3>
        <p className="text-gray-600">
          Personalized learning paths to bridge your skills gap and enhance your job prospects.
        </p>
      </div>

      <div className="grid" style={{ gap: '16px' }}>
        {upskillingSuggestions.map((suggestion, index) => (
          <div key={index} className="card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
              onClick={() => toggleExpanded(index)}
            >
              <div style={{ flex: '1' }}>
                <h4 style={{ margin: '0 0 8px 0', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={20} style={{ color: '#f59e0b' }} />
                  {suggestion.skill}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    className="skill-tag"
                    style={{
                      background: getPriorityColor(suggestion.priority),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {getPriorityIcon(suggestion.priority)}
                    {suggestion.priority} Priority
                  </span>
                  <span
                    className="skill-tag"
                    style={{ background: '#eff6ff', color: '#1d4ed8' }}
                  >
                    <Clock size={14} style={{ marginRight: '4px' }} />
                    {suggestion.estimated_time}
                  </span>
                </div>
              </div>
              <div
                style={{
                  transform: expandedItems.has(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '20px',
                  color: '#6b7280'
                }}
              >
                ▼
              </div>
            </div>

            {/* Expanded Content */}
            {expandedItems.has(index) && (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <h5 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#374151' }}>
                  Recommended Learning Resources
                </h5>
                <div className="grid" style={{ gap: '12px' }}>
                  {suggestion.resources?.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="card"
                      style={{
                        background: 'white',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <BookOpen size={16} style={{ color: '#667eea' }} />
                        <span style={{ fontWeight: '500' }}>{resource}</span>
                      </div>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => {
                          // In a real app, this would open the actual resource
                          window.open(`https://www.google.com/search?q=${encodeURIComponent(resource)}`, '_blank');
                        }}
                      >
                        <ExternalLink size={14} />
                        Access
                      </button>
                    </div>
                  )) || (
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      No specific resources available. Consider searching for online courses, tutorials, or documentation.
                    </p>
                  )}
                </div>

                {/* Learning Path */}
                <div style={{ marginTop: '16px' }}>
                  <h5 style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#374151' }}>
                    Suggested Learning Path
                  </h5>
                  <div className="card" style={{ background: '#fffbeb', border: '1px solid #f59e0b' }}>
                    <div className="grid" style={{ gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: '#f59e0b', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          1
                        </div>
                        <span style={{ fontSize: '14px' }}>
                          Start with fundamentals and basic concepts
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: '#f59e0b', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          2
                        </div>
                        <span style={{ fontSize: '14px' }}>
                          Practice with hands-on projects and exercises
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: '#f59e0b', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          3
                        </div>
                        <span style={{ fontSize: '14px' }}>
                          Build portfolio projects to demonstrate proficiency
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: '#22c55e', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          ✓
                        </div>
                        <span style={{ fontSize: '14px', color: '#22c55e', fontWeight: '500' }}>
                          Ready to apply for positions requiring this skill
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Your Learning Journey</h4>
        <div className="grid grid-3">
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {upskillingSuggestions.length}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>Skills to Learn</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {upskillingSuggestions.filter(s => s.priority === 'High').length}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>High Priority</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {upskillingSuggestions.reduce((total, suggestion) => {
                const months = suggestion.estimated_time.match(/(\d+)/)?.[0] || 1;
                return total + parseInt(months);
              }, 0)}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>Months Est.</div>
          </div>
        </div>
        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
          <p style={{ margin: '0', fontSize: '14px', textAlign: 'center' }}>
            💡 <strong>Pro Tip:</strong> Focus on high-priority skills first for maximum impact on your job prospects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpskillingSuggestions;