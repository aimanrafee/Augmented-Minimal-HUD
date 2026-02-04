/**
 * APP.JS - THE ENGINE (SOLID 2050 CORE)
 * Menguruskan Offline Registration, Navigasi, Windows, Sensor Data, & Map Mode
 */

// ==========================================
// 1. PENDAFTARAN SERVICE WORKER (OFFLINE ENGINE)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Solid Offline Engine: Online (Scope: ' + registration.scope + ')');
            })
            .catch((error) => {
                console.log('Solid Offline Engine: Failed to register: ', error);
            });
    });
}

// ==========================================
// 2. HUD CORE ENGINE (Jalan selepas Login)
// ==========================================
function startHUD() {
    console.log("HUD Core Online. Initializing Systems...");
    
    // Jalankan Sistem Info (Masa & Bateri)
    updateClock();
    setInterval(updateClock, 1000);
    initBatteryStatus();

    // Jalankan GPS Speedometer
    initSpeedometer();

    // Aktifkan Sistem Draggable untuk Multi-Window
    initDraggableWindows();

    // Aktifkan Logik Smart Dialer
    initDialerLogic();

    // Aktifkan Logik Mirror & Map Mode
    initModeControllers();
    
    console.log("All Systems Nominal.");
}

// --- LOGIK JAM & BATERI ---
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

function initBatteryStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBatt = () => {
                const battEl = document.getElementById('battery-status');
                if (battEl) battEl.innerText = `🔋 ${Math.round(battery.level * 100)}%`;
            };
            updateBatt();
            battery.addEventListener('levelchange', updateBatt);
        });
    }
}

// --- LOGIK SPEEDOMETER (GPS SENSOR) ---
function initSpeedometer() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            // Tukar m/s ke KM/H (Meter per second * 3.6)
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

            // Kemaskini Info Navigasi
            const navInfo = document.getElementById('nav-info');
            if (navInfo) navInfo.innerText = `ALGORITHM: ACTIVE [LAT: ${position.coords.latitude.toFixed(2)}]`;
            
        }, (error) => {
            console.warn("GPS Access Denied:", error.message);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    }
}

// --- LOGIK MULTI-WINDOW (DRAGGABLE SYSTEM) ---
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
        header.ontouchstart = dragMouseDown; 
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // Dapatkan posisi mouse/touch awal
        pos3 = (e.clientX || (e.touches ? e.touches[0].clientX : 0));
        pos4 = (e.clientY || (e.touches ? e.touches[0].clientY : 0));
        
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;

        // Bawa tetingkap ke depan (Z-Index)
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
        
        // Update Posisi CSS
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

// --- LOGIK SMART DIALER ---
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

// --- LOGIK MODE CONTROLLERS (MIRROR & MAPS) ---
function initModeControllers() {
    // 1. Mirror Mode
    const mirrorBtn = document.getElementById('toggle-mirror');
    if (mirrorBtn) {
        mirrorBtn.addEventListener('click', () => {
            document.body.classList.toggle('mirror-mode');
            mirrorBtn.style.background = document.body.classList.contains('mirror-mode') ? "var(--primary-color)" : "";
            mirrorBtn.style.color = document.body.classList.contains('mirror-mode') ? "black" : "white";
        });
    }

    // 2. Map Mode (Trigger CSS Transformation)
    // Fungsi ini dipanggil dari index.html: toggleMapMode()
}

/**
 * FUNGSI GLOBAL UNTUK TOGGLE MAPS
 * Dipanggil terus dari butang dock
 */
function toggleMapMode() {
    document.body.classList.toggle('map-mode-active');
    const mapBtn = document.querySelector('button[onclick="toggleMapMode()"]');
    
    if (document.body.classList.contains('map-mode-active')) {
        mapBtn.style.background = "var(--primary-color)";
        mapBtn.style.color = "black";
        mapBtn.innerHTML = "🗺️ HUD";
    } else {
        mapBtn.style.background = "";
        mapBtn.style.color = "white";
        mapBtn.innerHTML = "🗺️ MAPS";
    }
}
