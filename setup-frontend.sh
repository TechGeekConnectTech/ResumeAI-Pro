#!/bin/bash

# AI Resume Analyser Frontend Setup Script

echo "🤖 AI Resume Analyser Frontend Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Navigate to frontend directory
cd frontend

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Frontend setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Make sure your backend API is running on http://localhost:8000"
echo "2. Start the frontend development server:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. The application will open at http://localhost:3000"
echo ""
echo "🔧 Available Scripts:"
echo "   npm start     - Start development server"
echo "   npm run build - Build for production"
echo "   npm test      - Run tests"
echo ""
echo "📖 For more information, check the README.md file in the frontend directory"