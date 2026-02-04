/**
 * AUTH.JS - SOLID 2050 CORE SECURITY
 * Menguruskan Login, PIN, dan Akses User
 */

// 1. DATA PENGGUNA (Offline JSON Style)
const users = [
    { id: 'admin', name: 'COMMANDER 2050', pin: '2050', avatar: '☢️' },
    { id: 'guest', name: 'GUEST PILOT', pin: '1234', avatar: '👤' }
];

let currentUser = null;
let inputPin = "";

/**
 * INISIALISASI: Menjana senarai user pada skrin
 */
function initAuth() {
    const userGrid = document.getElementById('user-selection');
    if (!userGrid) return;

    userGrid.innerHTML = ""; // Reset grid

    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
            <div class="avatar">${user.avatar}</div>
            <p class="hud-text small" style="margin-top:10px;">${user.name}</p>
        `;
        div.onclick = () => selectUser(user);
        userGrid.appendChild(div);
    });
    
    console.log("Security System: Waiting for Pilot Selection...");
}

/**
 * PROSES: Pilih User & Papar PIN Pad
 */
function selectUser(user) {
    currentUser = user;
    inputPin = ""; // Reset sebarang pin lama
    updatePinDisplay();
    
    document.getElementById('user-selection').classList.add('hidden');
    document.getElementById('pin-section').classList.remove('hidden');
    document.getElementById('selected-user-name').innerText = `PILOT: ${user.name}`;
}

/**
 * LOGIK: Input PIN daripada Butang
 */
document.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.innerText;
        
        // Kesan Visual Butang Ditekan
        btn.style.background = "var(--primary-color)";
        btn.style.color = "black";
        setTimeout(() => {
            btn.style.background = "";
            btn.style.color = "";
        }, 100);

        if (!isNaN(val)) {
            // Jika Nombor
            if (inputPin.length < 4) {
                inputPin += val;
                updatePinDisplay();
            }
            
            // Auto-Verify jika sudah 4 digit
            if (inputPin.length === 4) {
                setTimeout(verifyPin, 300);
            }
        } 
        else if (btn.classList.contains('reset')) {
            // Jika CLR (Clear)
            inputPin = "";
            updatePinDisplay();
        } 
        else if (btn.classList.contains('cancel')) {
            // Jika ESC (Back)
            inputPin = "";
            document.getElementById('pin-section').classList.add('hidden');
            document.getElementById('user-selection').classList.remove('hidden');
        }
    });
});

/**
 * UI: Kemaskini paparan bintang (*) PIN
 */
function updatePinDisplay() {
    const display = document.querySelector('.pin-display');
    if (display) {
        display.innerText = inputPin.padEnd(4, "-").replace(/./g, (char, index) => {
            return index < inputPin.length ? "*" : "-";
        });
    }
}

/**
 * SECURITY: Pengesahan PIN & Buka HUD
 */
function verifyPin() {
    if (inputPin === currentUser.pin) {
        console.log(`Access Granted: ${currentUser.name} Authenticated.`);
        
        const loginScreen = document.getElementById('login-screen');
        loginScreen.style.opacity = "0"; // Animasi Fade Out
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            document.getElementById('main-hud').classList.remove('hidden');
            
            // PENTING: Memanggil fungsi Start di app.js
            if (typeof startHUD === "function") {
                startHUD(); 
            } else {
                console.warn("System Warning: startHUD function not found in app.js");
            }
        }, 500);
    } else {
        // Jika Salah PIN
        alert("ACCESS DENIED: PIN INCORRECT");
        inputPin = "";
        updatePinDisplay();
    }
}

// Jalankan sistem auth sebaik sahaja tetingkap dimuatkan
window.addEventListener('DOMContentLoaded', initAuth);
