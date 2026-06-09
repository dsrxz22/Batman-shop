const API_BASE_URL = 'http://localhost:5000/api';

// Form submission
document.getElementById('fraudForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await analyzeFraud();
});

async function analyzeFraud() {
    const transactionData = {
        transaction_id: document.getElementById('transactionId').value,
        amount: parseFloat(document.getElementById('amount').value),
        merchant_category: parseInt(document.getElementById('merchantCategory').value),
        transaction_type: parseInt(document.getElementById('transactionType').value),
        time_hour: parseInt(document.getElementById('timeHour').value),
        days_since_last_transaction: parseInt(document.getElementById('daysSinceLastTransaction').value),
        transaction_count_24h: parseInt(document.getElementById('transactionCount24h').value),
        amount_variance: parseFloat(document.getElementById('amountVariance').value),
        location_change: parseInt(document.getElementById('locationChange').value),
        device_change: parseInt(document.getElementById('deviceChange').value),
        velocity_score: parseFloat(document.getElementById('velocityScore').value)
    };

    try {
        hideError();
        document.querySelector('.btn-analyze').disabled = true;
        document.querySelector('.btn-analyze').textContent = 'Analyzing...';

        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        displayResults(result, transactionData);

    } catch (error) {
        console.error('Error:', error);
        showError(`Error analyzing transaction: ${error.message}`);
    } finally {
        document.querySelector('.btn-analyze').disabled = false;
        document.querySelector('.btn-analyze').textContent = 'Analyze Transaction';
    }
}

function displayResults(result, transactionData) {
    const resultsSection = document.getElementById('resultsSection');
    const fraudProb = (result.fraud_probability * 100).toFixed(2);
    const legitimateProb = (result.legitimate_probability * 100).toFixed(2);

    // Update status
    const statusBadge = document.getElementById('resultStatus');
    statusBadge.textContent = result.is_fraud ? '⚠️ FRAUD DETECTED' : '✓ LEGITIMATE';
    statusBadge.className = `status-badge ${result.is_fraud ? 'fraud' : 'legitimate'}`;

    // Update timestamp
    document.getElementById('resultTimestamp').textContent = new Date(result.timestamp).toLocaleString();

    // Update probabilities
    document.getElementById('fraudBar').style.width = fraudProb + '%';
    document.getElementById('fraudProb').textContent = fraudProb + '%';

    document.getElementById('legitimateBar').style.width = legitimateProb + '%';
    document.getElementById('legitimateProb').textContent = legitimateProb + '%';

    // Update risk level
    const riskLevel = document.getElementById('riskLevel');
    riskLevel.className = `risk-level ${result.risk_level}`;
    riskLevel.textContent = `Risk Level: ${result.risk_level.toUpperCase()}`;

    // Update transaction details
    document.getElementById('detailTxnId').textContent = result.transaction_id;
    document.getElementById('detailAmount').textContent = '$' + transactionData.amount.toFixed(2);
    document.getElementById('detailTime').textContent = new Date(result.timestamp).toLocaleString();

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function approveTransaction() {
    alert('✓ Transaction approved!');
}

function blockTransaction() {
    alert('✕ Transaction blocked!');
}

function reviewTransaction() {
    alert('⚠ Transaction flagged for manual review!');
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}