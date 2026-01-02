import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/api';
import toast from 'react-hot-toast';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const ResumeUpload = ({ onUploadSuccess }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const data = await resumeService.uploadResume(file, user?.user_id || 1);
      
      setUploadedFile({
        name: file.name,
        size: file.size,
        resume_id: data.resume_id
      });
      
      toast.success('Resume uploaded successfully!');
      
      if (onUploadSuccess) {
        onUploadSuccess({
          resume_id: data.resume_id,
          filename: file.name,
          text_preview: data.text_preview
        });
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.detail || error.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  }, [user, onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Upload size={24} style={{ display: 'inline', marginRight: '8px' }} />
          Upload Your Resume
        </h3>
        <p className="text-gray-600">
          Upload your resume in PDF, DOC, or DOCX format to get started with AI-powered analysis.
        </p>
      </div>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`upload-zone ${isDragActive ? 'active' : ''} ${uploading ? 'loading' : ''}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #e2e8f0',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>
                Uploading and processing...
              </p>
            </div>
          ) : isDragActive ? (
            <div style={{ textAlign: 'center' }}>
              <Upload size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#667eea' }}>
                Drop your resume here
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Upload size={48} style={{ color: '#6b7280', marginBottom: '16px' }} />
              <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Drag & drop your resume here
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                or click to select a file
              </p>
              <button className="btn btn-primary" style={{ pointerEvents: 'none' }}>
                Choose File
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ background: '#f0fdf4', border: '1px solid #22c55e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <CheckCircle size={32} style={{ color: '#22c55e' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', color: '#15803d' }}>
                Resume Uploaded Successfully!
              </h4>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
              </p>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="btn btn-secondary"
            >
              Upload New
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ResumeUpload;