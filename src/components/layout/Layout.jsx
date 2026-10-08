import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '../CommandPalette';
import { ToastViewport } from '../feedback/ToastViewport';
import { useHotkey } from '../../hooks/useHotkey';
import './Layout.css';

export function Layout() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Command palette hotkey (Ctrl+K / Cmd+K)
  useHotkey('k', () => setIsCmdOpen(true), { withCtrlOrCmd: true });

  return (
    <div className="app-layout">
      <Header onOpenCommandPalette={() => setIsCmdOpen(true)} />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      <ToastViewport />
    </div>
  );
}
