import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import pickle
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_synthetic_data(n_samples=10000):
    """Generate synthetic banking transaction data"""
    np.random.seed(42)
    
    data = {
        'amount': np.random.exponential(200, n_samples),
        'merchant_category': np.random.randint(0, 10, n_samples),
        'transaction_type': np.random.randint(0, 5, n_samples),
        'time_hour': np.random.randint(0, 24, n_samples),
        'days_since_last_transaction': np.random.randint(0, 30, n_samples),
        'transaction_count_24h': np.random.randint(0, 20, n_samples),
        'amount_variance': np.random.normal(1, 0.3, n_samples),
        'location_change': np.random.randint(0, 2, n_samples),
        'device_change': np.random.randint(0, 2, n_samples),
        'velocity_score': np.random.normal(50, 20, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Generate labels (fraud detection)
    # Fraud indicators: high amount, unusual time, location/device change, high velocity
    fraud_probability = (
        (df['amount'] > 500) * 0.3 +
        ((df['time_hour'] < 6) | (df['time_hour'] > 23)) * 0.2 +
        (df['location_change'] == 1) * 0.2 +
        (df['device_change'] == 1) * 0.2 +
        (df['velocity_score'] > 70) * 0.1
    )
    
    df['is_fraud'] = (np.random.random(n_samples) < fraud_probability).astype(int)
    
    return df

def train_model():
    """Train fraud detection model"""
    logger.info("Generating synthetic data...")
    df = generate_synthetic_data(10000)
    
    logger.info(f"Dataset shape: {df.shape}")
    logger.info(f"Fraud rate: {df['is_fraud'].mean():.2%}")
    
    # Prepare features and labels
    X = df.drop('is_fraud', axis=1)
    y = df['is_fraud']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    logger.info("Training models...")
    
    # Train Random Forest
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    rf_model.fit(X_train_scaled, y_train)
    
    # Train Gradient Boosting
    gb_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
    gb_model.fit(X_train_scaled, y_train)
    
    # Evaluate models
    rf_pred = rf_model.predict(X_test_scaled)
    gb_pred = gb_model.predict(X_test_scaled)
    
    logger.info("\n=== Random Forest Performance ===")
    logger.info(f"ROC-AUC: {roc_auc_score(y_test, rf_model.predict_proba(X_test_scaled)[:, 1]):.4f}")
    logger.info(classification_report(y_test, rf_pred))
    
    logger.info("\n=== Gradient Boosting Performance ===")
    logger.info(f"ROC-AUC: {roc_auc_score(y_test, gb_model.predict_proba(X_test_scaled)[:, 1]):.4f}")
    logger.info(classification_report(y_test, gb_pred))
    
    # Use best model (Gradient Boosting usually performs better)
    best_model = gb_model
    
    # Create ml_model directory if it doesn't exist
    os.makedirs('ml_model', exist_ok=True)
    
    # Save model and scaler
    logger.info("Saving model and scaler...")
    with open('ml_model/model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    
    with open('ml_model/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    
    logger.info("Model training complete!")
    
    # Print feature importance
    logger.info("\nFeature Importance:")
    for feature, importance in zip(X.columns, best_model.feature_importances_):
        logger.info(f"{feature}: {importance:.4f}")

if __name__ == '__main__':
    train_model()