// Wallet state
const walletState = {
    balance: 1000.00, // Initial USDT balance
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Example wallet address
    networkFees: {
        BEP20: 0.5,
        ERC20: 2.0,
        TRC20: 1.0
    },
    transactions: []
};

// DOM Elements
const depositSection = document.getElementById('deposit-section');
const withdrawSection = document.getElementById('withdraw-section');
const networkSelector = document.getElementById('network-selector');
const walletAddress = document.getElementById('wallet-address');
const copyAddressBtn = document.getElementById('copy-address');
const withdrawForm = document.getElementById('withdraw-form');
const recipientAddress = document.getElementById('recipient-address');
const withdrawAmount = document.getElementById('withdraw-amount');
const maxBtn = document.getElementById('max-btn');
const availableBalance = document.getElementById('available-balance');
const networkFee = document.getElementById('network-fee');
const totalAmount = document.getElementById('total-amount');
const submitWithdrawBtn = document.getElementById('submit-withdraw');
const depositNav = document.getElementById('deposit-nav');
const withdrawNav = document.getElementById('withdraw-nav');

// Initialize QR Code
const qr = new QRCode(document.getElementById('qr-code'), {
    text: walletState.address,
    width: 180,
    height: 180,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize wallet address display
    walletAddress.textContent = walletState.address;
    
    // Initialize available balance
    updateAvailableBalance();
    
    // Show deposit section by default
    showDepositSection();
});

// Update withdrawal form based on network and amount
withdrawAmount.addEventListener('input', updateWithdrawalForm);
networkSelector.addEventListener('change', updateWithdrawalForm);

// Copy address button
copyAddressBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(walletAddress.textContent)
        .then(() => {
            copyAddressBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyAddressBtn.textContent = 'Copy';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy address:', err);
        });
});

// Max button
maxBtn.addEventListener('click', () => {
    const fee = walletState.networkFees[networkSelector.value];
    const maxAmount = Math.max(0, walletState.balance - fee);
    withdrawAmount.value = maxAmount.toFixed(2);
    updateWithdrawalForm();
});

// Navigation
depositNav.addEventListener('click', showDepositSection);
withdrawNav.addEventListener('click', showWithdrawSection);

// Form submission
withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawAmount.value);
    const fee = walletState.networkFees[networkSelector.value];
    const total = amount + fee;
    
    if (total > walletState.balance) {
        alert('Insufficient balance');
        return;
    }
    
    if (!recipientAddress.value) {
        alert('Please enter a recipient address');
        return;
    }
    
    // Process withdrawal (mock)
    walletState.balance -= total;
    walletState.transactions.push({
        type: 'withdrawal',
        amount: amount,
        fee: fee,
        network: networkSelector.value,
        recipient: recipientAddress.value,
        timestamp: new Date()
    });
    
    // Reset form
    withdrawForm.reset();
    updateAvailableBalance();
    alert('Withdrawal successful!');
});

// Helper Functions
function showDepositSection() {
    depositSection.classList.remove('hidden');
    withdrawSection.classList.add('hidden');
    depositNav.classList.add('active');
    withdrawNav.classList.remove('active');
}

function showWithdrawSection() {
    withdrawSection.classList.remove('hidden');
    depositSection.classList.add('hidden');
    withdrawNav.classList.add('active');
    depositNav.classList.remove('active');
}

function updateWithdrawalForm() {
    const amount = parseFloat(withdrawAmount.value) || 0;
    const fee = walletState.networkFees[networkSelector.value];
    const total = amount + fee;
    
    networkFee.textContent = `${fee} USDT`;
    totalAmount.textContent = `${total.toFixed(2)} USDT`;
    
    // Update submit button state
    submitWithdrawBtn.disabled = total > walletState.balance || amount <= 0;
}

function updateAvailableBalance() {
    const balance = walletState.balance.toFixed(2);
    availableBalance.textContent = `Available: ${balance} USDT`;
}

// Simulate deposit for testing
function simulateDeposit(amount) {
    walletState.balance += amount;
    walletState.transactions.push({
        type: 'deposit',
        amount: amount,
        network: networkSelector.value,
        timestamp: new Date()
    });
    updateAvailableBalance();
}

// Optional: Uncomment to simulate deposits periodically
/*
setInterval(() => {
    const randomAmount = Math.random() * 100;
    simulateDeposit(randomAmount);
}, 30000);
*/ 