#!/bin/bash

echo "🚀 Banking Fraud Detection AI - Setup Script"
echo "============================================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.9+"
    exit 1
fi

echo "✓ Python found"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Train model
echo "🤖 Training fraud detection model..."
python3 ml_model/train_model.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Run backend: python backend/app.py"
echo "3. Open frontend: http://localhost:8000/frontend/index.html"
echo ""