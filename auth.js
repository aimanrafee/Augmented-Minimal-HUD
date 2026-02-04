/**
 * AUTH.JS - SOLID 2050 CORE SECURITY
 * Menguruskan Login, PIN Dinamik, dan Akses User
 */

let users = []; // Akan diisi dari users.json
let currentUser = null;
let inputPin = "";

/**
 * 1. INISIALISASI: Memanggil data dari users.json
 */
async function initAuth() {
    try {
        const response = await fetch('./users.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        users = data.users;
        console.log("Solid Security: Pilot Data Synchronized.");
    } catch (error) {
        console.warn("Security Alert: Using Fail-safe Local Data.", error);
        // Fallback jika users.json tiada
        users = [{ id: 'admin', name: 'COMMANDER 2050', pin: '2050', avatar: '☢️' }];
    }
    renderUserGrid();
}

/**
 * 2. PAPARAN: Menjana grid user pada UI
 */
function renderUserGrid() {
    const userGrid = document.getElementById('user-selection');
    if (!userGrid) return;

    userGrid.innerHTML = ""; 
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
}

/**
 * 3. PROSES: Pilih User & Sedia Input PIN
 */
function selectUser(user) {
    currentUser = user;
    inputPin = ""; 
    updatePinDisplay();
    
    document.getElementById('user-selection').classList.add('hidden');
    document.getElementById('pin-section').classList.remove('hidden');
    document.getElementById('selected-user-name').innerText = `PILOT: ${user.name}`;
}

/**
 * 4. LOGIK: Input PIN & Feedback Visual
 */
document.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.innerText;
        
        // Haptic Feedback Visual
        btn.style.background = "var(--primary-color)";
        btn.style.color = "black";
        setTimeout(() => {
            btn.style.background = "";
            btn.style.color = "";
        }, 100);

        if (!isNaN(val)) {
            if (inputPin.length < 4) {
                inputPin += val;
                updatePinDisplay();
            }
            if (inputPin.length === 4) {
                setTimeout(verifyPin, 300);
            }
        } 
        else if (btn.classList.contains('reset')) {
            inputPin = "";
            updatePinDisplay();
        } 
        else if (btn.classList.contains('cancel')) {
            inputPin = "";
            document.getElementById('pin-section').classList.add('hidden');
            document.getElementById('user-selection').classList.remove('hidden');
        }
    });
});

/**
 * 5. UI: Kemaskini paparan PIN (*)
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
 * 6. SECURITY: Pengesahan & Akses HUD
 */
function verifyPin() {
    if (inputPin === currentUser.pin) {
        console.log(`Access Granted: ${currentUser.name} Online.`);
        
        const loginScreen = document.getElementById('login-screen');
        loginScreen.style.opacity = "0"; 
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            document.getElementById('main-hud').classList.remove('hidden');
            
            // Panggil Enjin Utama di app.js
            if (typeof startHUD === "function") {
                startHUD(); 
            }
        }, 500);
    } else {
        alert("ACCESS DENIED: PIN INCORRECT");
        inputPin = "";
        updatePinDisplay();
    }
}

// Jalankan sistem sebaik sahaja fail dimuatkan
window.addEventListener('DOMContentLoaded', initAuth);
