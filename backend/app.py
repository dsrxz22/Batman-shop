from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
from datetime import datetime
import logging

app = Flask(__name__)
CORS(app)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load ML model and scaler
try:
    with open('ml_model/model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('ml_model/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    model = None
    scaler = None

# Store transaction history
transactions_history = []

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/predict', methods=['POST'])
def predict_fraud():
    """Predict if transaction is fraudulent"""
    try:
        data = request.json
        
        # Extract features
        features = np.array([[
            data['amount'],
            data['merchant_category'],
            data['transaction_type'],
            data['time_hour'],
            data['days_since_last_transaction'],
            data['transaction_count_24h'],
            data['amount_variance'],
            data['location_change'],
            data['device_change'],
            data['velocity_score']
        ]])
        
        # Normalize features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]
        
        result = {
            'is_fraud': bool(prediction),
            'fraud_probability': float(probability[1]),
            'legitimate_probability': float(probability[0]),
            'risk_level': get_risk_level(probability[1]),
            'timestamp': datetime.now().isoformat(),
            'transaction_id': data.get('transaction_id', 'unknown')
        }
        
        # Store in history
        transactions_history.append(result)
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/batch-predict', methods=['POST'])
def batch_predict():
    """Batch predict multiple transactions"""
    try:
        data = request.json
        transactions = data.get('transactions', [])
        results = []
        
        for transaction in transactions:
            features = np.array([[
                transaction['amount'],
                transaction['merchant_category'],
                transaction['transaction_type'],
                transaction['time_hour'],
                transaction['days_since_last_transaction'],
                transaction['transaction_count_24h'],
                transaction['amount_variance'],
                transaction['location_change'],
                transaction['device_change'],
                transaction['velocity_score']
            ]])
            
            features_scaled = scaler.transform(features)
            prediction = model.predict(features_scaled)[0]
            probability = model.predict_proba(features_scaled)[0]
            
            result = {
                'transaction_id': transaction.get('transaction_id', 'unknown'),
                'is_fraud': bool(prediction),
                'fraud_probability': float(probability[1]),
                'risk_level': get_risk_level(probability[1])
            }
            results.append(result)
        
        return jsonify({
            'total': len(results),
            'frauds_detected': sum(1 for r in results if r['is_fraud']),
            'results': results
        }), 200
        
    except Exception as e:
        logger.error(f"Batch prediction error: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get transaction history"""
    limit = request.args.get('limit', 100, type=int)
    return jsonify({
        'total': len(transactions_history),
        'transactions': transactions_history[-limit:]
    }), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get fraud detection statistics"""
    if not transactions_history:
        return jsonify({
            'total_transactions': 0,
            'frauds_detected': 0,
            'fraud_rate': 0,
            'avg_fraud_probability': 0
        }), 200
    
    frauds = sum(1 for t in transactions_history if t['is_fraud'])
    avg_prob = np.mean([t['fraud_probability'] for t in transactions_history])
    
    return jsonify({
        'total_transactions': len(transactions_history),
        'frauds_detected': frauds,
        'fraud_rate': round(frauds / len(transactions_history) * 100, 2),
        'avg_fraud_probability': round(float(avg_prob), 4),
        'high_risk_transactions': sum(1 for t in transactions_history if t['risk_level'] == 'high')
    }), 200

@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    """Clear transaction history"""
    global transactions_history
    transactions_history = []
    return jsonify({'message': 'History cleared'}), 200

def get_risk_level(probability):
    """Determine risk level based on fraud probability"""
    if probability >= 0.7:
        return 'critical'
    elif probability >= 0.5:
        return 'high'
    elif probability >= 0.3:
        return 'medium'
    else:
        return 'low'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)