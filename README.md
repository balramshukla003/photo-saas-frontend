# PhotoPrint — Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

The user interface for PhotoPrint — a passport photo processing app built for stationery shops. Upload a customer photo, process it automatically, preview 20 passport photos on an A4 sheet, and print directly.

---

## What it looks like

> 📸 Add your screenshots here after running the app
>
> Suggested screenshots:
> - Login page
> - Photo upload screen
> - A4 preview with processed photos
> - Profile / license screen

---

## What this app does

- Customer photo is uploaded by the shop owner
- Background is removed and image is enhanced automatically
- 20 passport-size photos (35mm × 45mm) are arranged on an A4 sheet
- One click sends it directly to the printer
- Login is protected by a license system — access works only until the license expiry date

---

## Before you start

Make sure these are running first:

| What | Where to get it |
|---|---|
| Node.js 18+ | https://nodejs.org |
| Backend API | See [photo-saas-backend] repo |

---

## Setup

**1. Clone this repo**
```bash
git clone https://github.com/balramshukla003/photo-saas-frontend
cd photo-saas-frontend
```

**2. Install packages**
```bash
npm install
```

**3. Create a `.env` file** in the root folder with this content:
```
VITE_API_BASE_URL=http://localhost:5000
```
> Change the URL if your backend runs on a different port.

**4. Start the app**
```bash
npm run dev
```

Open your browser at **http://localhost:5173**

---

## Login

Use the credentials created by the backend admin:

```
Email    : admin@photoprint.com
Password : 12345678
```

---

## How to use

1. Log in with your email and password
2. Go to **Photo Print** from the top menu
3. Click the upload area or drag and drop a photo
4. Click **Process Photo** — background is removed and image is enhanced
5. The A4 preview loads with 20 passport photos arranged automatically
6. Click **Print A4** to open the print dialog and print

---

## Pages

| Page | What it does |
|---|---|
| `/login` | Sign in screen |
| `/photo` | Upload, process and print photos |
| `/profile` | View your account and license expiry |

---

## Related repos

| Repo | Purpose |
|---|---|
| [photoprint-backend](photo-saas-backend) | .NET Core 8 API |
| [photo-saas-python](photo-saas-python) | Scripts to add users and reset passwords |
