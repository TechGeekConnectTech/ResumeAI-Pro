# AI Resume Analyser Frontend

A modern, responsive React application for analyzing resumes and providing AI-powered career guidance.

## Features

### 🎯 Core Functionality
- **User Authentication**: Secure login and registration system
- **Resume Upload**: Drag & drop interface for PDF/DOC resumes
- **Role Matching**: Match resumes against specific job roles
- **Skills Gap Analysis**: Identify missing skills and competency gaps
- **Resume Scoring**: Comprehensive scoring with visual dashboards
- **Upskilling Suggestions**: Personalized learning recommendations
- **Interview Preparation**: AI-generated interview questions with tips

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Interactive Dashboards**: Charts and visualizations using Recharts
- **Progress Tracking**: Visual indicators for analysis completion
- **Practice Mode**: Interactive interview question practice
- **Real-time Feedback**: Toast notifications for user actions

### 🛠 Technical Features
- **Modern React**: Functional components with hooks
- **Context API**: Global state management for authentication
- **File Upload**: React Dropzone for resume uploads
- **API Integration**: Axios for backend communication
- **Responsive Charts**: Recharts for data visualization
- **Icon System**: Lucide React for consistent iconography

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.js        # Navigation header
│   │   ├── Login.js         # Login form
│   │   ├── Register.js      # Registration form
│   │   ├── ResumeUpload.js  # File upload interface
│   │   ├── RoleMatching.js  # Role selection and matching
│   │   ├── SkillsGapAnalysis.js        # Skills analysis display
│   │   ├── ResumeScoreDashboard.js     # Scoring dashboard
│   │   ├── UpskillingSuggestions.js    # Learning recommendations
│   │   └── InterviewQuestionsPredictor.js # Interview prep
│   ├── context/             # React Context providers
│   │   └── AuthContext.js   # Authentication state
│   ├── pages/               # Main page components
│   │   ├── AuthPage.js      # Login/Register page
│   │   └── Dashboard.js     # Main application dashboard
│   ├── services/            # API service layer
│   │   └── api.js          # HTTP client and API calls
│   ├── App.js              # Main application component
│   ├── index.js            # React DOM entry point
│   └── index.css           # Global styles and responsive design
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running on http://localhost:8000

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Setup**
   The application is configured to proxy requests to the backend API at `http://localhost:8000`. If your backend runs on a different port, update the `proxy` field in `package.json`.

3. **Start Development Server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

## API Integration

The frontend expects the following backend endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Resume Management
- `POST /resume/upload` - Upload resume file
- `POST /resume/analyze` - Analyze resume against job description
- `POST /resume/score` - Get resume score
- `POST /resume/skills-gap` - Identify skills gaps
- `POST /resume/upskilling` - Get upskilling suggestions
- `POST /resume/interview-questions` - Generate interview questions

### Role Management
- `GET /roles` - Get available roles
- `POST /roles/match` - Match resume to role

## Component Documentation

### Authentication Flow
- **AuthContext**: Manages user authentication state
- **AuthPage**: Handles login/registration UI switching
- **Login/Register**: Form components with validation

### Dashboard Flow
1. **ResumeUpload**: File upload with validation
2. **RoleMatching**: Role selection and job description input
3. **Analysis Components**: Display results from AI analysis
   - SkillsGapAnalysis: Visual skills comparison
   - ResumeScoreDashboard: Scoring charts and metrics
   - UpskillingSuggestions: Learning path recommendations
   - InterviewQuestionsPredictor: Practice questions with tips

### Key Features

#### Responsive Design
- Mobile-first CSS with breakpoints at 480px, 768px, and 1024px
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized typography scaling

#### Interactive Elements
- Drag & drop file upload with visual feedback
- Progress indicators for multi-step processes
- Expandable content sections
- Copy-to-clipboard functionality
- Practice mode for interview questions

#### Data Visualization
- Bar charts for category breakdowns
- Pie charts for score distribution
- Progress bars for skill levels
- Color-coded skill tags
- Interactive tooltips

## Styling Guidelines

### CSS Architecture
- Global styles in `index.css`
- Component-specific styles using inline styles
- Utility classes for common patterns
- CSS Grid and Flexbox for layouts

### Color Palette
- Primary: `#667eea` (Blue gradient start)
- Secondary: `#764ba2` (Blue gradient end)
- Success: `#22c55e`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Gray scale: `#1f2937` to `#f8fafc`

### Typography
- Font Family: System font stack with fallbacks
- Responsive font sizes using `clamp()`
- Consistent line heights and spacing
- Semantic heading hierarchy

## Performance Considerations

### Optimization Features
- Lazy loading for heavy components
- Memoization for expensive calculations
- Efficient re-rendering with React keys
- Image optimization for uploads
- Bundle splitting for production builds

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content
- Focus management for modals

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Chrome Mobile 80+

## Deployment

### Build Process
1. Run `npm run build` to create production build
2. Deploy the `build` folder to your web server
3. Configure server to serve `index.html` for all routes
4. Set up HTTPS and proper caching headers

### Environment Variables
Configure the following for different environments:
- API base URL
- File upload limits
- Feature flags for beta features

## Contributing

### Development Guidelines
1. Follow React functional component patterns
2. Use meaningful component and variable names
3. Add PropTypes for component props
4. Write unit tests for utility functions
5. Maintain responsive design principles

### Code Style
- Use ES6+ features
- Prefer const/let over var
- Use arrow functions for event handlers
- Keep components under 200 lines
- Extract custom hooks for complex logic

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows requests from frontend origin
2. **File Upload Failures**: Check file size limits and supported formats
3. **Chart Rendering Issues**: Verify Recharts container dimensions
4. **Mobile Layout Problems**: Test on actual devices, not just browser dev tools

### Debug Tools
- React Developer Tools extension
- Redux DevTools for state debugging
- Network tab for API call inspection
- Console for JavaScript errors

## Future Enhancements

### Planned Features
- Real-time collaboration on resume reviews
- Integration with job board APIs
- Resume templates and builders
- Advanced analytics and insights
- Multi-language support
- Offline functionality with PWA features

### Technical Improvements
- Migration to TypeScript
- Implementation of testing framework (Jest/RTL)
- Addition of Storybook for component documentation
- Performance monitoring with analytics
- Enhanced error boundary implementation

## License

This project is part of the AI Resume Analyser platform. All rights reserved.

## Support

For technical support or questions about the frontend application, please refer to the main project documentation or contact the development team.