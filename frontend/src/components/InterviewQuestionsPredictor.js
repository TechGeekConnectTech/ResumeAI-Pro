import React, { useState } from 'react';
import { MessageCircle, Eye, EyeOff, Lightbulb, Clock, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const InterviewQuestionsPredictor = ({ interviewQuestions }) => {
  const [showAnswerTips, setShowAnswerTips] = useState(new Set());
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!interviewQuestions || interviewQuestions.length === 0) {
    return null;
  }

  const toggleAnswerTip = (index) => {
    const newShowTips = new Set(showAnswerTips);
    if (newShowTips.has(index)) {
      newShowTips.delete(index);
    } else {
      newShowTips.add(index);
    }
    setShowAnswerTips(newShowTips);
  };

  const copyQuestion = (question) => {
    navigator.clipboard.writeText(question);
    toast.success('Question copied to clipboard!');
  };

  const getQuestionCategory = (question) => {
    const technical = ['code', 'programming', 'technical', 'algorithm', 'database', 'API', 'framework'];
    const behavioral = ['tell me', 'describe', 'experience', 'situation', 'challenge', 'team', 'conflict'];
    const company = ['why', 'company', 'role', 'motivation', 'interest'];

    const lowerQuestion = question.toLowerCase();
    
    if (technical.some(keyword => lowerQuestion.includes(keyword))) {
      return { type: 'Technical', color: '#3b82f6', icon: '⚡' };
    } else if (behavioral.some(keyword => lowerQuestion.includes(keyword))) {
      return { type: 'Behavioral', color: '#22c55e', icon: '🧠' };
    } else if (company.some(keyword => lowerQuestion.includes(keyword))) {
      return { type: 'Company-Specific', color: '#f59e0b', icon: '🏢' };
    } else {
      return { type: 'General', color: '#6b7280', icon: '❓' };
    }
  };

  const getAnswerTip = (question) => {
    const category = getQuestionCategory(question);
    
    switch (category.type) {
      case 'Technical':
        return "💡 Structure your answer: Explain the concept clearly, provide a practical example, and mention any relevant experience you have with the technology.";
      case 'Behavioral':
        return "💡 Use the STAR method: Situation, Task, Action, Result. Be specific about your role and the positive outcome.";
      case 'Company-Specific':
        return "💡 Show you've researched the company. Connect your skills and goals with their mission and values. Be genuine about your interest.";
      default:
        return "💡 Keep your answer concise and relevant. Provide specific examples from your experience to support your points.";
    }
  };

  // Group questions by category
  const questionsByCategory = interviewQuestions.reduce((acc, question, index) => {
    const category = getQuestionCategory(question);
    if (!acc[category.type]) {
      acc[category.type] = { ...category, questions: [] };
    }
    acc[category.type].questions.push({ question, index });
    return acc;
  }, {});

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <MessageCircle size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Interview Questions Predictor
        </h3>
        <p className="text-gray-600">
          AI-generated interview questions based on your resume and the target role.
        </p>
      </div>

      {/* Practice Mode Toggle */}
      <div className="card" style={{ background: '#f0f9ff', border: '1px solid #3b82f6', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#1d4ed8' }}>Practice Mode</h4>
            <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
              Test yourself with one question at a time
            </p>
          </div>
          <button
            className={`btn ${practiceMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setPracticeMode(!practiceMode)}
          >
            {practiceMode ? 'Exit Practice' : 'Start Practice'}
          </button>
        </div>
      </div>

      {practiceMode ? (
        /* Practice Mode View */
        <div className="card" style={{ background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              Question {currentQuestionIndex + 1} of {interviewQuestions.length}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                style={{ padding: '8px 12px' }}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentQuestionIndex(Math.min(interviewQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === interviewQuestions.length - 1}
                style={{ padding: '8px 12px' }}
              >
                Next
              </button>
            </div>
          </div>

          <div className="card" style={{ background: 'white', border: '2px solid #3b82f6' }}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>
                    {getQuestionCategory(interviewQuestions[currentQuestionIndex]).icon}
                  </span>
                  <span
                    className="skill-tag"
                    style={{
                      background: getQuestionCategory(interviewQuestions[currentQuestionIndex]).color,
                      color: 'white'
                    }}
                  >
                    {getQuestionCategory(interviewQuestions[currentQuestionIndex]).type}
                  </span>
                </div>
                <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
                  {interviewQuestions[currentQuestionIndex]}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleAnswerTip(currentQuestionIndex)}
                  style={{ fontSize: '14px' }}
                >
                  <Lightbulb size={16} />
                  {showAnswerTips.has(currentQuestionIndex) ? 'Hide Tip' : 'Show Answer Tip'}
                </button>
                {showAnswerTips.has(currentQuestionIndex) && (
                  <div className="card" style={{ marginTop: '12px', background: '#fffbeb', border: '1px solid #f59e0b' }}>
                    <p style={{ margin: '0', fontSize: '14px' }}>
                      {getAnswerTip(interviewQuestions[currentQuestionIndex])}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => copyQuestion(interviewQuestions[currentQuestionIndex])}
                className="btn btn-secondary"
                style={{ padding: '8px' }}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="progress-bar" style={{ marginTop: '16px' }}>
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / interviewQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        /* Full List View */
        <div>
          {Object.entries(questionsByCategory).map(([category, data]) => (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                margin: '0 0 16px 0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: data.color 
              }}>
                <span style={{ fontSize: '20px' }}>{data.icon}</span>
                {category} Questions ({data.questions.length})
              </h4>

              <div className="grid" style={{ gap: '12px' }}>
                {data.questions.map(({ question, index }) => (
                  <div key={index} className="card" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 12px 0', fontWeight: '500' }}>
                          {question}
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn btn-secondary"
                            onClick={() => toggleAnswerTip(index)}
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            {showAnswerTips.has(index) ? <EyeOff size={14} /> : <Eye size={14} />}
                            {showAnswerTips.has(index) ? 'Hide Tip' : 'Answer Tip'}
                          </button>
                        </div>
                        {showAnswerTips.has(index) && (
                          <div className="card" style={{ marginTop: '12px', background: '#fffbeb', border: '1px solid #f59e0b' }}>
                            <p style={{ margin: '0', fontSize: '14px' }}>
                              {getAnswerTip(question)}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => copyQuestion(question)}
                        className="btn btn-secondary"
                        style={{ padding: '8px' }}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginTop: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Interview Preparation Summary</h4>
        <div className="grid grid-3">
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {interviewQuestions.length}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>Total Questions</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {Object.keys(questionsByCategory).length}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>Categories</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '24px', fontWeight: '700' }}>
              {Math.ceil(interviewQuestions.length * 3)}
            </div>
            <div style={{ fontSize: '14px', opacity: '0.9' }}>Min. Practice</div>
          </div>
        </div>
        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
          <p style={{ margin: '0', fontSize: '14px', textAlign: 'center' }}>
            🎯 <strong>Pro Tip:</strong> Practice each question out loud and time yourself. Aim for 2-3 minutes per answer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsPredictor;