#!/bin/bash

# 🚀 Emotion Analysis API - Getting Started Script
# This script helps you get started with the API

echo "🧠 Emotion Analysis API - Setup Wizard"
echo "======================================"
echo ""

# Check Node.js version
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old ($NODE_VERSION)"
    echo "   Please upgrade to Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) found"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Check if server is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use"
    echo "   The server might already be running"
    echo ""
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo "🎯 Starting development server..."
echo ""
echo "📝 Important notes:"
echo "   • First request will take 10-30 seconds (model downloads)"
echo "   • Subsequent requests are fast (100-500ms)"
echo "   • Press Ctrl+C to stop the server"
echo ""
echo "🔗 API Endpoints:"
echo "   • POST http://localhost:3000/api/analyze"
echo "   • GET  http://localhost:3000/api/history"
echo "   • GET  http://localhost:3000/api/stats"
echo ""
echo "🧪 Test after server starts:"
echo '   curl -X POST http://localhost:3000/api/analyze \'
echo '     -H "Content-Type: application/json" \'
echo '     -d '"'"'{"text": "I am so happy today!"}'"'"
echo ""
echo "📖 Documentation:"
echo "   • Quick Start: QUICKSTART.md"
echo "   • Full Docs:   README.md"
echo "   • Architecture: ARCHITECTURE.md"
echo ""

read -p "Press Enter to start the server..."

npm run dev
