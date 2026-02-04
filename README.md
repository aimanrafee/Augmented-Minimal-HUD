# ☢️ Augmented Minimal HUD | Solid 2050 Core

![License](https://img.shields.io/badge/OS-Solid--2050-cyan)
![Platform](https://img.shields.io/badge/Platform-PWA--Mobile--Tablet-black)
![Offline](https://img.shields.io/badge/Offline-Smartest--Algorithm-green)

**Augmented Minimal HUD** adalah sebuah sistem operasi paparan (HUD OS) berasaskan HTML/JS yang dioptimumkan untuk kegunaan automotif masa depan. Dibangunkan dengan visi **Solid 2050**, sistem ini mengutamakan privasi penuh melalui pemprosesan **Offline Smartest Algorithm**.

---

## 🚀 Ciri-Ciri Utama (Core Features)

* **Kiosk Mode Authentication**: Sistem "Lockdown" dengan akaun pengguna dan pengesahan PIN 4-digit yang dinamik.
* **iPadOS Style Multi-Window**: Antaramuka tetingkap yang boleh digerakkan (*draggable*) dan ditindan (*stackable*) untuk multi-tasking yang lancar.
* **Offline-First (PWA)**: Berjalan 100% tanpa internet menggunakan Service Workers. Sesuai untuk kawasan pedalaman atau bawah tanah.
* **Real-time Telemetry**: Data kelajuan (GPS) dan arah kompas yang tepat terus ke paparan HUD.
* **Mirror Mode**: Sokongan pantulan horizontal untuk penggunaan cermin depan (Windshield) kereta.
* **Smart Dialer**: Sistem panggilan bersepadu yang boleh diakses melalui dock sistem.

---

## 🛠️ Infrastruktur Teknologi

Sistem ini dibina menggunakan **ATOM Sovereign Framework**:

* **Frontend**: HTML5, CSS3 (Glassmorphism & Neon UI)
* **Logic Engine**: Vanilla JavaScript (ES6+)
* **Data Management**: Dynamic JSON (Internal Fetch)
* **App Protocol**: Progressive Web App (PWA) dengan manifest.json

---

## 📁 Struktur Fail

| Fail | Fungsi |
| :--- | :--- |
| `index.html` | Struktur UI, Multi-Window, dan System Dock |
| `style.css` | Tema ATOM Sovereign, kesan kaca, dan animasi HUD |
| `auth.js` | Gatekeeper sistem, logik PIN, dan integrasi user |
| `app.js` | Enjin Speedometer, GPS, dan pendaftaran Service Worker |
| `users.json` | Pangkalan data pilot dan kod akses (PIN) |
| `manifest.json` | Konfigurasi Fullscreen Kiosk Mode & Ikon App |
| `service-worker.js` | Pengurus Cache untuk kestabilan 100% Offline |

---

## 🔧 Cara Pemasangan (Deployment)

1.  **Clone Repo**: Muat naik semua fail ke dalam satu repository GitHub.
2.  **Enable GitHub Pages**: Pergi ke `Settings > Pages` dan aktifkan branch `main`.
3.  **Install as App**:
    * Buka URL GitHub Pages anda di Chrome (Android) atau Safari (iOS).
    * Pilih **"Add to Home Screen"**.
    * Aplikasi kini akan muncul di skrin utama tablet/telefon anda sebagai OS Kiosk yang penuh.

---

## 🔐 Log Masuk Lalai (Default Credentials)

Gunakan maklumat berikut untuk ujian awal sistem:

* **Pilot**: COMMANDER 2050
* **PIN**: `2050`

---

## 📡 Visi Solid 2050
> *"Menghasilkan algoritma tetingkap tuntas yang tidak bergantung kepada awan (Cloud), memberikan kawalan mutlak kepada pilot di jalan raya."*

---
**Developed by Gemini Solid 2050 Collaborator**
