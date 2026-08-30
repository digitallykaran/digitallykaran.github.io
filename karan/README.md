# Karan Deepak Arora — Executive NetSuite Portfolio & Consulting Platform

An enterprise-grade, SEO-optimized personal portfolio and consulting platform for **Karan Deepak Arora** (Senior NetSuite ERP Techno-Functional Consultant & MBA in Finance Scholar).

---

## 🌟 Key Features

- **Executive Aesthetic**: Premium Dark/Light mode theme with subtle slate & indigo/cyan accents and glassmorphism cards.
- **Interactive NetSuite 3-Way Match Simulator**: Live code simulation of PO vs. Item Receipt vs. Vendor Bill automated reconciliation.
- **Detailed Project Case Studies**: Structured architecture breakdowns, business context, implementation plans, and ROI metrics.
- **Consulting Services Engine**: Tailored service packages with an interactive consultation booking form.
- **SEO & Knowledge Graph Ready**: Full Schema.org JSON-LD structured data (`Person` & `ProfessionalService`), OpenGraph tags, `sitemap.xml`, and `robots.txt` linked to [LinkedIn](https://www.linkedin.com/in/digitallykaran).
- **Zero Build Dependency**: 100% pure semantic HTML5, modern CSS3, and vanilla ES6 JavaScript — runs instantly anywhere without `npm build` overhead.

---

## 🚀 How to Host on GitHub Pages (Free)

### Method A: Direct Repository Hosting
1. Create a new repository on GitHub (e.g. `karan-portfolio` or `digitallykaran.github.io`).
2. Push the contents of the `karan/` folder to your repository:
   ```bash
   cd karan
   git init
   git add .
   git commit -m "Initial commit of executive portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings** &rarr; **Pages**.
4. Under **Branch**, select `main` and root `/` folder, then click **Save**.
5. Your website will be live at `https://<your-username>.github.io/<repo-name>/` in ~60 seconds!

---

## ⚡ How to Host on Vercel (Free & Instant)

### Option 1: Via Vercel CLI
```bash
cd karan
npx vercel
```
Follow the 2-step prompt and your site will be deployed instantly with custom domain support.

### Option 2: Via Vercel Web Dashboard
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** &rarr; **Project**.
3. Import your GitHub repository or drag-and-drop the `karan` folder.
4. Click **Deploy**. Vercel will automatically recognize the static files and pre-configured `vercel.json`!

---

## 📂 Project Structure

```
karan/
├── index.html                   # Semantic HTML5, Schema.org JSON-LD, SEO Meta
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for search engines
├── vercel.json                  # Vercel caching & security headers
├── README.md                    # Deployment guide
└── assets/
    ├── css/
    │   └── style.css            # Executive CSS design system
    ├── js/
    │   ├── main.js              # Theme switcher, dynamic experience calculator, filtering
    │   └── simulation.js        # NetSuite 3-Way Match reconciliation engine
    ├── docs/
    │   └── Karan_Arora_Resume.pdf # Bundled ATS resume PDF
    └── images/
        └── og-preview.png       # OpenGraph share preview banner
```

---

© 2026 Karan Deepak Arora. All rights reserved.
