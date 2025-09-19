# CurrencyXchange Frontend

CurrencyXchange is a modern currency converter web application built as a personal portfolio project. This repository contains the **frontend** codebase, showcasing best practices in React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Currency Conversion:** Instantly convert between 180+ currencies.
- **Responsive Design:** Mobile-first layout for seamless experience on all devices.
- **Animated UI:** Smooth transitions, interactive elements, and visually appealing effects.
- **Accessible Components:** Custom UI built with [Radix UI](https://www.radix-ui.com/) primitives for accessibility.
- **Theming:** Toggle between light and dark modes.
- **Toast Notifications:** User feedback via custom and Sonner toasts.
- **Navigation:** Fixed navigation bar with mobile menu support.
- **Portfolio Sections:** About, Contact, and Tech Stack sections for demonstration.

## 🛠️ Tech Stack

- **React 18** – UI library for building interactive interfaces.
- **TypeScript** – Type-safe development for maintainable code.
- **Tailwind CSS** – Utility-first CSS framework for rapid styling.
- **Vite** – Fast development server and build tool.
- **Radix UI** – Accessible, unstyled UI primitives (Accordion, Dialog, Dropdown, etc.).
- **Lucide Icons** – Beautiful SVG icon set.
- **Sonner** – Toast notification library.
- **React Router** – Client-side routing.
- **TanStack Query** – Data fetching and caching.
- **Other Libraries:** class-variance-authority, clsx, embla-carousel-react, recharts, zod, vaul, input-otp.

## 📁 Project Structure

```plaintext
src/
  components/
    ui/                # Custom UI components (Accordion, Button, Card, etc.)
    AboutSection.tsx   # About section
    ContactSection.tsx # Contact section
    CurrencyConverter.tsx # Main converter logic
    Footer.tsx         # Footer with tech stack
    HeroSection.tsx    # Landing hero section
    Navigation.tsx     # Top navigation bar
  hooks/               # Custom React hooks
  lib/                 # Utility functions
  pages/               # Page components (Index, NotFound)
  App.tsx              # App entry point
  main.tsx             # React root
public/                # Static assets
```

## 🖥️ Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview production build:**
   ```sh
   npm run preview
   ```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Sonner Toasts](https://sonner.emilkowal.dev/)

---

**Note:** This is the frontend part. Backend (Java Spring Boot) for real-time exchange rates is planned for future releases.

---

