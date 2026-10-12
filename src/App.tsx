/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WorkshopProvider, useWorkshop } from './context/WorkshopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookServiceModal } from './components/BookServiceModal';
import { JobCardModal } from './components/JobCardModal';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useWorkshop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'register' && <RegisterPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <BookServiceModal />
      <JobCardModal />
    </div>
  );
};

export default function App() {
  return (
    <WorkshopProvider>
      <AppContent />
    </WorkshopProvider>
  );
}
