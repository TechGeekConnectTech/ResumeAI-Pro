import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://77.37.45.138:8006';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Services
export const authService = {
  login: async (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  register: async (userData) => {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    formData.append('email', userData.email);
    formData.append('mobile', userData.mobile);
    
    const response = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Resume Services
export const resumeService = {
  uploadResume: async (file, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  analyzeResume: async (resumeId, jobDescription) => {
    const formData = new FormData();
    formData.append('resume_id', resumeId);
    formData.append('job_description', jobDescription);
    
    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getResumeScore: async (resumeId, jobDescription) => {
    const response = await api.get(`/resume/score/${resumeId}`, {
      params: {
        job_description: jobDescription
      }
    });
    return response.data;
  },

  getSkillsGap: async (resumeId, jobDescription) => {
    const response = await api.get(`/resume/skills-gap/${resumeId}`, {
      params: {
        job_description: jobDescription
      }
    });
    return response.data;
  },

  getUpskillingSuggestions: async (resumeId, jobDescription) => {
    // This endpoint might not exist yet, keeping as placeholder
    const response = await api.post('/resume/upskilling', {
      resume_id: resumeId,
      job_description: jobDescription,
    });
    return response.data;
  },

  getInterviewQuestions: async (resumeId) => {
    // This endpoint might not exist yet, keeping as placeholder
    const response = await api.post('/resume/interview-questions', {
      resume_id: resumeId,
    });
    return response.data;
  },
};

// Role Services
export const roleService = {
  getAllRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  },

  matchRole: async (resumeId, roleId) => {
    const response = await api.post('/roles/match', {
      resume_id: resumeId,
      role_id: roleId,
    });
    return response.data;
  },
};

export default api;