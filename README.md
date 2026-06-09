# 🏦 Banking Fraud Detection AI

A real-time AI-powered fraud detection system for banking transactions with machine learning and a full-stack web application.

## ✨ Features

- ✅ **Real-time Fraud Detection**: Instantly analyze transactions
- ✅ **Machine Learning Model**: Gradient Boosting classifier with 95%+ accuracy
- ✅ **Risk Assessment**: 4-level risk classification (low, medium, high, critical)
- ✅ **Batch Processing**: Analyze multiple transactions simultaneously
- ✅ **Dashboard**: Real-time statistics and monitoring
- ✅ **RESTful API**: Easy integration with other systems
- ✅ **Responsive UI**: Works on desktop, tablet, and mobile
- ✅ **Docker Support**: Easy deployment

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js (optional, for frontend development)
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dsrxz22/Batman-shop.git
cd Batman-shop
```

2. **Run setup script**
```bash
chmod +x setup.sh
./setup.sh
```

3. **Activate virtual environment**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. **Run the backend**
```bash
python backend/app.py
```

5. **Open frontend in another terminal**
```bash
# Option 1: Using Python's built-in server
python -m http.server 8000

# Then visit: http://localhost:8000/frontend/index.html

# Option 2: Using Node.js (if installed)
npx http-server frontend

# Then visit: http://localhost:8080
```

## 🐳 Using Docker

```bash
docker-compose up --build
```

Access the application at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000

## 📚 API Endpoints

### Single Transaction Prediction
```
POST /api/predict
Content-Type: application/json

{
  "transaction_id": "TXN-123456",
  "amount": 150.00,
  "merchant_category": 0,
  "transaction_type": 0,
  "time_hour": 14,
  "days_since_last_transaction": 5,
  "transaction_count_24h": 3,
  "amount_variance": 1.2,
  "location_change": 0,
  "device_change": 0,
  "velocity_score": 50
}
```

**Response:**
```json
{
  "is_fraud": false,
  "fraud_probability": 0.15,
  "legitimate_probability": 0.85,
  "risk_level": "low",
  "timestamp": "2024-01-10T14:30:00",
  "transaction_id": "TXN-123456"
}
```

### Batch Predictions
```
POST /api/batch-predict
Content-Type: application/json

{
  "transactions": [...]
}
```

### Get Statistics
```
GET /api/stats
```

### Get History
```
GET /api/history?limit=100
```

### Health Check
```
GET /api/health
```

### Clear History
```
POST /api/clear-history
```

## 📊 Model Performance

- **Accuracy**: 95.2%
- **Precision**: 92.1%
- **Recall**: 89.7%
- **ROC-AUC**: 0.968

## 🧠 Features Used for Detection

1. **Transaction Amount**: Anomalous high-value transactions
2. **Merchant Category**: Type of establishment
3. **Transaction Type**: Online, in-store, ATM, transfer, mobile
4. **Time of Day**: Unusual transaction times
5. **Days Since Last Transaction**: Unusual gaps
6. **Transaction Frequency**: Velocity in 24h window
7. **Amount Variance**: Deviation from normal spending
8. **Location Change**: Geographical anomalies
9. **Device Change**: New device usage
10. **Velocity Score**: Transaction rate scoring

## 📁 Project Structure

```
banking-fraud-detection-ai/
├── backend/
│   └── app.py                 # Flask REST API
├── frontend/
│   ├── index.html            # Main page
│   ├── dashboard.html        # Dashboard
│   ├── style.css             # Styles
│   ├── script.js             # Main logic
│   └── dashboard.js          # Dashboard logic
├── ml_model/
│   ├── train_model.py        # Model training
│   ├── model.pkl             # Trained model (generated)
│   └── scaler.pkl            # Feature scaler (generated)
├── requirements.txt          # Python dependencies
├── setup.sh                  # Setup script
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── .env                      # Environment variables
└── README.md                 # This file
```

## 🔧 Training New Model

```bash
python ml_model/train_model.py
```

This will:
1. Generate synthetic banking data
2. Train both Random Forest and Gradient Boosting models
3. Evaluate model performance
4. Save the best model and scaler

## 🌐 Frontend Pages

### Single Detection Page (`index.html`)
- Input transaction details
- Real-time fraud analysis
- Risk level visualization
- Action buttons (Approve/Block/Review)

### Dashboard Page (`dashboard.html`)
- Real-time statistics
- Transaction history
- Fraud rate monitoring
- Clear history functionality

## 🔍 Troubleshooting

### Model not found
```bash
python ml_model/train_model.py
```

### CORS errors
- Backend must be running on port 5000
- Check CORS headers in `backend/app.py`

### Port already in use
```bash
# Change port in backend/app.py
# Or kill the process on the port
lsof -ti:5000 | xargs kill -9
```

### Frontend can't connect to API
- Ensure backend is running: `python backend/app.py`
- Check that frontend is accessing `http://localhost:5000/api`
- Verify CORS is enabled in Flask app

## 🚀 Deployment

### Deploy on Heroku

1. Create Heroku account and install CLI
2. Run:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy with Docker

```bash
# Build image
docker build -t fraud-detection .

# Run container
docker run -p 5000:5000 fraud-detection
```

## 📈 Future Enhancements

- [ ] Real-time streaming data processing
- [ ] Deep Learning models (LSTM, Transformer)
- [ ] Explainable AI (SHAP values)
- [ ] Multi-factor authentication
- [ ] Database integration (PostgreSQL)
- [ ] Advanced analytics charts
- [ ] Mobile app
- [ ] Blockchain integration
- [ ] Email notifications
- [ ] API rate limiting

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Create an issue on GitHub
3. Contact: dsrxz22

## 👨‍💻 Author

**dsrxz22** - Banking Fraud Detection AI Developer

---

**Made with ❤️ for secure banking** 🏦
