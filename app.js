/**
 * APP.JS - THE ENGINE (SOLID 2050 CORE)
 * Menguruskan Navigasi, Windows, dan Sensor Data
 */

// Fungsi Utama: Hanya berjalan selepas Login Berjaya
function startHUD() {
    console.log("HUD Core Online. Initializing Systems...");
    
    // 1. Jalankan Jam
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Jalankan GPS Speedometer
    initSpeedometer();

    // 3. Aktifkan Sistem Draggable untuk Multi-Window
    initDraggableWindows();

    // 4. Aktifkan Logik Smart Dialer
    initDialerLogic();
    
    console.log("All Systems Nominal.");
}

// --- 1. LOGIK JAM & SISTEM INFO ---
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ms-MY', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const timeDisplay = document.getElementById('system-time');
    if (timeDisplay) timeDisplay.innerText = timeStr;
}

// --- 2. LOGIK SPEEDOMETER (GPS SENSOR) ---
function initSpeedometer() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            // Tukar m/s ke KM/H
            let speed = position.coords.speed; 
            if (speed === null || speed < 0) speed = 0;
            let kmh = Math.round(speed * 3.6);
            
            const speedEl = document.getElementById('current-speed');
            if (speedEl) speedEl.innerText = kmh.toString().padStart(2, '0');
            
            // Logik Kompas (Arah)
            const heading = position.coords.heading;
            if (heading !== null) {
                const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                const index = Math.round(heading / 45) % 8;
                const dirEl = document.getElementById('current-direction');
                if (dirEl) dirEl.innerText = directions[index];
            }
        }, (error) => {
            console.warn("GPS Access Denied or Unavailable:", error.message);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    } else {
        console.error("Geolocation is not supported by this device.");
    }
}

// --- 3. LOGIK MULTI-WINDOW (DRAGGABLE) ---
function initDraggableWindows() {
    const windows = ['window-dialer', 'window-stats'];
    windows.forEach(id => {
        const win = document.getElementById(id);
        if (win) makeDraggable(win);
    });
}

function makeDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.window-header');

    if (header) {
        header.onmousedown = dragMouseDown;
        header.ontouchstart = dragMouseDown; // Support Tablet
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // e.preventDefault(); // Dibuang untuk benarkan klik pada butang dalam header
        
        // Dapatkan posisi mouse/touch
        pos3 = (e.clientX || (e.touches ? e.touches[0].clientX : 0));
        pos4 = (e.clientY || (e.touches ? e.touches[0].clientY : 0));
        
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;

        // Bawa tetingkap yang sedang diheret ke depan
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = "10");
        elmnt.style.zIndex = "100";
    }

    function elementDrag(e) {
        e = e || window.event;
        const clientX = (e.clientX || (e.touches ? e.touches[0].clientX : 0));
        const clientY = (e.clientY || (e.touches ? e.touches[0].clientY : 0));
        
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        
        // Tetapkan posisi baru
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

// --- 4. LOGIK SMART DIALER ---
function initDialerLogic() {
    const dialerInput = document.getElementById('dialer-input');
    const keys = document.querySelectorAll('.dialer-content .key');

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const val = key.innerText;

            if (!isNaN(val) || val === "*" || val === "#") {
                dialerInput.innerText += val;
            } else if (key.classList.contains('delete-button')) {
                dialerInput.innerText = dialerInput.innerText.slice(0, -1);
            } else if (key.classList.contains('call-button')) {
                const num = dialerInput.innerText;
                if (num) window.location.href = `tel:${num}`;
            }
        });
    });
}

// --- 5. LOGIK MIRROR MODE ---
const mirrorBtn = document.getElementById('toggle-mirror');
if (mirrorBtn) {
    mirrorBtn.addEventListener('click', () => {
        document.body.classList.toggle('mirror-mode');
        // Visual feedback pada butang
        mirrorBtn.style.color = document.body.classList.contains('mirror-mode') ? "var(--accent-color)" : "white";
    });
}
