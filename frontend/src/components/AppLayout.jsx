import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative min-h-screen px-4 py-4 text-text md:px-6">
      <div className="particle-layer" />
      <div className="mx-auto flex max-w-[1600px] gap-5">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-8">
          <Topbar onOpenMenu={() => setMobileNavOpen(true)} />
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 p-4 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 240 }}
              className="max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex justify-end">
                <button onClick={() => setMobileNavOpen(false)} className="sg-button-secondary px-3 py-2">
                  Close
                </button>
              </div>
              <Sidebar mobile onNavigate={() => setMobileNavOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
