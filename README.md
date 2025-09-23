
# CurrencyXchange Frontend

[![License](https://img.shields.io/github/license/oussama-zbair/CurrencyXchange-Frontend)](https://github.com/oussama-zbair/CurrencyXchange-Frontend/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/oussama-zbair/CurrencyXchange-Frontend?style=social)](https://github.com/oussama-zbair/CurrencyXchange-Frontend/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/oussama-zbair/CurrencyXchange-Frontend)](https://github.com/oussama-zbair/CurrencyXchange-Frontend/commits/main)
[![Frontend Status](https://img.shields.io/badge/status-live-brightgreen)](https://green-sea-0ad5cce03.1.azurestaticapps.net/)

> Beautiful, responsive, and real-time currency converter built with React, TypeScript, Tailwind, and modern UI libraries.

---

## 🚀 Features

- 🔁 **Real-time Currency Conversion:** Instantly convert between 180+ currencies.
- 💡 **Responsive & Animated UI:** Mobile-friendly with smooth transitions.
- 🌓 **Dark Mode Ready:** Toggle between light and dark themes.
- 🧩 **Accessible UI Components:** Built with Radix primitives.
- 🔔 **User Feedback:** Interactive toasts via Sonner.
- 🌐 **Geolocation-based Currency Defaults.**
- 🧭 **Minimalist Navigation:** Fixed nav with responsive drawer.
- 🧑‍💻 **Personal Portfolio Sections:** About, Tech Stack, and Contact.

## 🛠️ Tech Stack

| Tech                | Description                                 |
|---------------------|---------------------------------------------|
| React 18            | Frontend framework                          |
| TypeScript          | Type safety and better DX                   |
| Tailwind CSS        | Utility-first styling                       |
| Vite                | Fast build tool                             |
| Radix UI            | Accessible components                       |
| Lucide Icons        | Elegant icons                               |
| TanStack Query      | Fetching/caching abstraction                |
| React Router        | Routing                                     |
| Sonner              | Toast notification system                   |
| Other               | clsx, zod, vaul, OTP, embla-carousel-react |

## 📁 Project Structure

```plaintext
src/
  components/
    ui/                # Reusable UI components
    AboutSection.tsx   # About the developer
    ContactSection.tsx # Email/social links
    CurrencyConverter.tsx # Main feature
    Footer.tsx         # Tech stack / links
    HeroSection.tsx    # Welcome banner
    Navigation.tsx     # Topbar menu
  hooks/               # Custom logic hooks
  lib/                 # Utility functions
  pages/               # Pages & routes
  App.tsx              # Root component
  main.tsx             # Bootstrap React
public/                # Static assets (icons, fonts)
```

## 🖥️ Getting Started

```sh
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview build
npm run preview
```

## 📚 Learn More

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Sonner](https://sonner.emilkowal.dev/)

---

### 🔗 Live Demo

▶️ [Launch App](https://green-sea-0ad5cce03.1.azurestaticapps.net/)

---

> 💬 This is the frontend part only. Backend (Spring Boot + WebFlux) hosted separately.
