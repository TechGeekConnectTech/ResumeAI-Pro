import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Phone, User, Lock } from 'lucide-react';

const Register = ({ onSwitchToLogin }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
      
      toast.success('Registration successful!');
      login({ 
        user_id: response.user_id, 
        username: formData.username,
        email: formData.email 
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="card-header text-center">
        <UserPlus size={48} style={{ margin: '0 auto 16px', color: '#667eea' }} />
        <h2 className="card-title">Create Account</h2>
        <p className="text-gray-600">Join AI Resume Analyser today</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            <User size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Phone size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-100 ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline bg-none border-none cursor-pointer"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;