const API_BASE_URL = 'http://localhost:5000/api';

// Load dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadHistory();
    // Refresh every 5 seconds
    setInterval(loadStats, 5000);
    setInterval(loadHistory, 5000);
});

async function loadStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        const data = await response.json();

        document.getElementById('totalTransactions').textContent = data.total_transactions;
        document.getElementById('fraudsDetected').textContent = data.frauds_detected;
        document.getElementById('fraudRate').textContent = data.fraud_rate.toFixed(2) + '%';
        document.getElementById('avgFraudProb').textContent = (data.avg_fraud_probability * 100).toFixed(2) + '%';
        document.getElementById('highRiskTxns').textContent = data.high_risk_transactions;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/history?limit=10`);
        const data = await response.json();
        const historyDiv = document.getElementById('transactionHistory');

        if (data.transactions.length === 0) {
            historyDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No transactions yet</p>';
            return;
        }

        let html = '<table style="width: 100%; border-collapse: collapse;">';
        html += '<thead style="background: #f8fafc; border-bottom: 2px solid var(--border-color);">';
        html += '<tr><th style="padding: 1rem; text-align: left;">Transaction ID</th><th style="text-align: left;">Status</th><th style="text-align: left;">Fraud Probability</th><th style="text-align: left;">Risk Level</th><th style="text-align: left;">Time</th></tr>';
        html += '</thead><tbody>';

        data.transactions.reverse().forEach(txn => {
            const fraudProb = (txn.fraud_probability * 100).toFixed(2);
            const statusClass = txn.is_fraud ? 'fraud' : 'legitimate';
            const statusText = txn.is_fraud ? '⚠️ Fraud' : '✓ Legitimate';
            const riskColor = {
                'critical': '#ef4444',
                'high': '#f59e0b',
                'medium': '#2563eb',
                'low': '#10b981'
            }[txn.risk_level];

            html += `<tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 1rem;">${txn.transaction_id}</td>
                <td style="padding: 1rem;">${statusText}</td>
                <td style="padding: 1rem;">${fraudProb}%</td>
                <td style="padding: 1rem; color: ${riskColor}; font-weight: bold;">${txn.risk_level.toUpperCase()}</td>
                <td style="padding: 1rem;">${new Date(txn.timestamp).toLocaleTimeString()}</td>
            </tr>`;
        });

        html += '</tbody></table>';
        historyDiv.innerHTML = html;
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

async function clearHistory() {
    if (confirm('Are you sure you want to clear all transaction history?')) {
        try {
            await fetch(`${API_BASE_URL}/clear-history`, { method: 'POST' });
            loadStats();
            loadHistory();
            alert('History cleared!');
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    }
}