import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Award, TrendingUp, Star, Target } from 'lucide-react';

const ResumeScoreDashboard = ({ scoreData }) => {
  if (!scoreData) {
    return null;
  }

  const { overall_score, category_scores } = scoreData;

  // Prepare data for charts
  const categoryData = Object.entries(category_scores || {}).map(([key, value]) => ({
    name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: value,
    fullMark: 100
  }));

  const pieData = categoryData.map((item, index) => ({
    ...item,
    color: ['#667eea', '#f59e0b', '#22c55e', '#ef4444'][index % 4]
  }));

  const getScoreColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#84cc16';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Award size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Resume Score Dashboard
        </h3>
        <p className="text-gray-600">Comprehensive analysis of your resume performance against job requirements.</p>
      </div>

      {/* Overall Score */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginBottom: '24px' }}>
        <div className="text-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <Star size={32} />
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1' }}>
                {overall_score || 0}
              </div>
              <div style={{ fontSize: '14px', opacity: '0.9' }}>out of 100</div>
            </div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '600' }}>
            {getScoreLabel(overall_score || 0)}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8', marginTop: '4px' }}>
            Your resume matches {overall_score || 0}% of the job requirements
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
        {/* Category Scores Bar Chart */}
        <div className="card">
          <h4 style={{ margin: '0 0 16px 0' }}>Category Breakdown</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                labelStyle={{ color: '#1f2937' }}
              />
              <Bar 
                dataKey="score" 
                fill="#667eea"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Scores Pie Chart */}
        <div className="card">
          <h4 style={{ margin: '0 0 16px 0' }}>Score Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="score"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-2" style={{ gap: '8px', marginTop: '16px' }}>
            {pieData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: item.color
                  }}
                />
                <span>{item.name}: {item.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Category Cards */}
      <div className="grid grid-2" style={{ gap: '16px' }}>
        {categoryData.map((category, index) => (
          <div key={index} className="card" style={{ background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h5 style={{ margin: '0', fontWeight: '600' }}>{category.name}</h5>
              <div
                style={{
                  background: getScoreColor(category.score),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {category.score}%
              </div>
            </div>

            <div className="progress-bar" style={{ marginBottom: '8px' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${category.score}%`,
                  background: getScoreColor(category.score)
                }}
              />
            </div>

            <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>
              {getScoreLabel(category.score)} - {category.score >= 80 ? 'Strong performance' : category.score >= 60 ? 'Room for improvement' : 'Needs attention'}
            </p>
          </div>
        ))}
      </div>

      {/* Improvement Suggestions */}
      <div className="card" style={{ marginTop: '24px', background: '#fffbeb', border: '1px solid #f59e0b' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#d97706', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={20} />
          Score Improvement Tips
        </h4>
        <div className="grid" style={{ gap: '12px' }}>
          {overall_score < 90 && (
            <>
              {category_scores?.technical_skills < 80 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} style={{ color: '#d97706' }} />
                  <span style={{ fontSize: '14px' }}>
                    Add more relevant technical skills mentioned in the job description
                  </span>
                </div>
              )}
              {category_scores?.experience < 80 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} style={{ color: '#d97706' }} />
                  <span style={{ fontSize: '14px' }}>
                    Highlight more relevant work experience and achievements
                  </span>
                </div>
              )}
              {category_scores?.education < 80 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} style={{ color: '#d97706' }} />
                  <span style={{ fontSize: '14px' }}>
                    Include relevant certifications and educational background
                  </span>
                </div>
              )}
              {category_scores?.achievements < 80 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} style={{ color: '#d97706' }} />
                  <span style={{ fontSize: '14px' }}>
                    Add more quantifiable achievements and project outcomes
                  </span>
                </div>
              )}
            </>
          )}
          {overall_score >= 90 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={16} style={{ color: '#22c55e' }} />
              <span style={{ fontSize: '14px' }}>
                Excellent! Your resume is well-aligned with the job requirements.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreDashboard;