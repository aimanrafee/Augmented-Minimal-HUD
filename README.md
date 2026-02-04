# ☢️ Augmented Minimal HUD | Solid 2050 Core

![License](https://img.shields.io/badge/OS-Solid--2050-cyan)
![Platform](https://img.shields.io/badge/Platform-PWA--Mobile--Tablet-black)
![Status](https://img.shields.io/badge/Status-Beta--Sovereign-green)

**Augmented Minimal HUD** adalah satu sistem operasi paparan (HUD OS) berasaskan HTML/JS yang dioptimumkan untuk automotif masa depan. Dibangunkan di bawah visi **Solid 2050**, sistem ini mengutamakan kawalan mutlak pengguna melalui pemprosesan **Offline Smartest Algorithm**.

---

## 🚀 Ciri-Ciri Utama (Core Features)

* **Sovereign Authentication**: Sistem "Lockdown" dengan grid pemilihan pilot dan pengesahan PIN 4-digit yang dinamik melalui `users.json`.
* **iPadOS Style Multi-Window**: Antaramuka tetingkap yang boleh digerakkan (*draggable*), ditindan (*stackable*), dan ditutup secara bebas untuk multi-tasking premium.
* **Offline-First Architecture**: Berjalan 100% tanpa internet menggunakan Service Workers (PWA), memastikan HUD sentiasa sedia walaupun di kawasan terpencil.
* **Real-time Telemetry**: Data kelajuan (GPS KM/H) dan arah kompas (N/S/E/W) yang tepat terus ke paparan utama.
* **Mirror Mode**: Sokongan pantulan horizontal (HUD Flip) untuk penggunaan cermin depan (Windshield) kereta.
* **Premium Glassmorphism**: UI yang menggunakan kesan kabur (*backdrop-filter*) dan neon glow untuk estetik Audi & Aston Martin.

---

## 🛠️ Arkitektur Sistem

Sistem ini dibina dengan struktur modular yang sangat bersih:

| Fail | Fungsi |
| :--- | :--- |
| `index.html` | Struktur teras, tetingkap dialer, monitor stats, dan system dock. |
| `style.css` | Tema ATOM Sovereign, kesan kaca (blur), dan animasi neon. |
| `auth.js` | Logik pengesahan pilot, integrasi JSON, dan kawalan akses. |
| `app.js` | Enjin Speedometer, pengurusan tetingkap draggable, dan PWA registration. |
| `users.json` | Pangkalan data pilot (PIN, Avatar, Nama) yang boleh dikemaskini. |
| `manifest.json` | Konfigurasi Fullscreen Kiosk Mode untuk peranti tablet. |
| `service-worker.js` | Pengurus Cache untuk kestabilan fungsi 100% Offline. |

---

## 🔧 Panduan Pemasangan (Deployment)

1.  **Muat Naik**: Simpan semua fail di atas ke dalam satu repository GitHub (Contoh: `Augmented-Minimal-HUD`).
2.  **GitHub Pages**: Aktifkan di `Settings > Pages`.
3.  **Install App**:
    * Buka URL anda di Chrome (Android) atau Safari (iOS).
    * Pilih **"Add to Home Screen"**.
    * Luncurkan dari skrin utama untuk mod **Full Kiosk** (tanpa URL bar).

---

## 🔐 Kredensial Pilot Default

| Pilot | PIN |
| :--- | :--- |
| **COMMANDER 2050** | `2050` |
| **GUEST PILOT** | `1234` |

---

## 📡 Visi Solid 2050
> *"Menghasilkan algoritma tetingkap tuntas yang tidak bergantung kepada awan (Cloud), memberikan kawalan mutlak kepada pilot di jalan raya dengan latensi sifar."*

---
**Developed by Gemini Solid 2050 Collaborator**
