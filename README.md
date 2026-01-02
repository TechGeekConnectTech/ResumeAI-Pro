# 🤖 AI Resume Analyser

An intelligent resume analysis platform that helps job seekers optimize their resumes, identify skills gaps, and prepare for interviews using AI-powered insights.

## ✨ Features

### 🎯 Core Functionality
1. **User Authentication**: Secure user registration and login system
2. **Resume Upload**: Support for PDF and DOC format resume uploads
3. **Role Matching**: Match resumes against specific job roles and descriptions
4. **Skills Gap Analysis**: Identify missing skills and competency gaps
5. **Resume Scoring**: Comprehensive scoring based on job description alignment
6. **Upskilling Suggestions**: Personalized learning paths and resource recommendations
7. **Interview Preparation**: AI-generated interview questions with answer tips

### 🚀 Advanced Features
- **Interactive Dashboards**: Visual analytics with charts and progress indicators
- **Practice Mode**: Interactive interview question practice session
- **Mobile Responsive**: Optimized for all device sizes
- **Real-time Analysis**: Instant feedback and recommendations
- **Progress Tracking**: Multi-step workflow with visual progress indicators

## 🏗 Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Database**: SQLAlchemy ORM with PostgreSQL/SQLite support
- **Authentication**: Secure user authentication system
- **File Processing**: Resume parsing and analysis capabilities
- **AI Integration**: Ready for AI/ML model integration

### Frontend (React)
- **Framework**: React 18 with functional components
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API
- **Charts**: Recharts for data visualization
- **File Upload**: React Dropzone for resume uploads
- **Icons**: Lucide React for consistent iconography

## 📁 Project Structure

```
AI-Analyser/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   │   ├── user.py     # User model
│   │   │   ├── resume.py   # Resume model
│   │   │   └── role.py     # Role model
│   │   └── routers/        # API endpoints
│   │       └── auth_router.py
│   ├── database.py         # Database configuration
│   ├── dependencies.py     # Common dependencies
│   ├── main.py            # FastAPI app entry point
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── index.css      # Global styles
│   ├── package.json       # Node.js dependencies
│   └── README.md         # Frontend documentation
├── setup-frontend.sh     # Frontend setup script
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Initialize Database**
   ```bash
   python create_all.py
   ```

3. **Start Backend Server**
   ```bash
   uvicorn main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Run Setup Script**
   ```bash
   ./setup-frontend.sh
   ```

2. **Or Manual Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

## 💻 Usage Guide

### 1. User Registration/Login
- Create an account or login with existing credentials
- Secure authentication with form validation

### 2. Upload Resume
- Drag and drop or click to upload PDF/DOC resume
- File validation and progress indicators
- Support for files up to 5MB

### 3. Select Target Role
- Choose from predefined roles or enter custom job description
- Detailed job description input for accurate analysis

### 4. AI Analysis Process
- Automatic resume parsing and content extraction
- Skills matching against job requirements
- Comprehensive scoring algorithm

### 5. View Results
- **Resume Score Dashboard**: Overall score with category breakdowns
- **Skills Gap Analysis**: Matched vs missing skills visualization
- **Upskilling Suggestions**: Personalized learning recommendations
- **Interview Questions**: AI-generated questions with practice mode

## 🎨 User Interface

### Dashboard Features
- **Progress Tracking**: Visual indicators for analysis completion
- **Interactive Charts**: Bar charts, pie charts, and progress bars
- **Responsive Design**: Mobile-first approach with tablet/desktop optimization
- **Intuitive Navigation**: Tab-based interface with logical flow

### Mobile Experience
- Touch-friendly interface elements
- Optimized layouts for small screens
- Swipe gestures for navigation
- Compressed data visualization

## 🔧 Configuration

### Backend Configuration
- Database URL configuration in `database.py`
- CORS settings for frontend integration
- File upload size limits and supported formats

### Frontend Configuration
- API base URL configuration in `services/api.js`
- Proxy settings in `package.json`
- Responsive breakpoints in CSS

## 🎯 AI Features (Ready for Integration)

### Current Mock Implementation
The frontend includes mock AI responses for demonstration:
- Skills extraction and matching
- Resume scoring algorithms
- Learning path recommendations
- Interview question generation

### Integration Points
- Resume parsing service integration
- NLP models for skills extraction
- ML models for scoring algorithms
- External learning resource APIs

## 📊 Sample Analysis Results

### Resume Score Categories
- **Technical Skills**: Matching against job requirements
- **Experience**: Relevant work experience evaluation
- **Education**: Educational background assessment
- **Achievements**: Quantifiable accomplishments analysis

### Skills Gap Analysis
- Visual representation of matched vs missing skills
- Priority-based skill gap identification
- Learning difficulty estimation
- Time investment recommendations

## 🚀 Deployment

### Backend Deployment
```bash
# Production build
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# With Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Frontend Deployment
```bash
# Build for production
cd frontend
npm run build

# Deploy to web server
# Serve the build folder with any static file server
```

### Docker Deployment (Optional)
```dockerfile
# Example Dockerfile for backend
FROM python:3.9
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🧪 Testing

### Backend Testing
```bash
# Unit tests (to be implemented)
pytest tests/

# API testing with curl
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test&password=test123&email=test@example.com"
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔒 Security Considerations

### Backend Security
- Password hashing (to be implemented)
- Input validation and sanitization
- File upload security checks
- SQL injection prevention with ORM

### Frontend Security
- XSS prevention with React's built-in protections
- Secure API communication
- File upload validation
- Authentication token management

## 📈 Performance Optimization

### Backend Performance
- Database query optimization
- File processing efficiency
- Caching strategies for AI results
- Rate limiting for API endpoints

### Frontend Performance
- Lazy loading for components
- Image optimization for uploads
- Bundle size optimization
- Efficient re-rendering patterns

## 🛣 Roadmap

### Phase 1 (Current)
- ✅ Basic UI/UX implementation
- ✅ File upload functionality
- ✅ Mock AI analysis results
- ✅ Responsive design

### Phase 2 (Next)
- [ ] Real AI integration
- [ ] Advanced resume parsing
- [ ] User dashboard enhancements
- [ ] Analytics and reporting

### Phase 3 (Future)
- [ ] Real-time collaboration
- [ ] Job board integration
- [ ] Resume builder
- [ ] Advanced analytics

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Set up both backend and frontend development environments
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### Coding Standards
- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript
- Write meaningful commit messages
- Add comments for complex logic

## 📚 Documentation

### API Documentation
- FastAPI automatic documentation at `http://localhost:8000/docs`
- Interactive API testing interface
- Comprehensive endpoint documentation

### Frontend Documentation
- Component documentation in `/frontend/README.md`
- Storybook integration (planned)
- Usage examples and best practices

## ❓ FAQ

**Q: What file formats are supported for resume upload?**
A: Currently supports PDF, DOC, and DOCX formats up to 5MB.

**Q: How accurate is the AI analysis?**
A: The current implementation uses mock data for demonstration. Real AI integration will provide actual analysis results.

**Q: Is the application mobile-friendly?**
A: Yes, the frontend is built with a mobile-first approach and is fully responsive.

**Q: Can I customize the job roles?**
A: Yes, you can select from predefined roles or enter a custom job description for analysis.

## 🐛 Known Issues

### Current Limitations
- AI analysis uses mock data
- No real resume parsing implemented yet
- Limited file format support
- Basic authentication without JWT tokens

### Planned Fixes
- Integration with real AI services
- Enhanced file processing
- Improved security implementation
- Advanced analytics features

## 📞 Support

For technical support or questions:
1. Check the documentation in respective README files
2. Review the FAQ section above
3. Submit an issue on the project repository
4. Contact the development team

## 📄 License

This project is part of the AI Resume Analyser platform. All rights reserved.

---

**Built with ❤️ using React, FastAPI, and AI technology**

*Empowering job seekers to achieve their career goals through intelligent resume analysis and personalized guidance.*
