// features/components/PlayerStats/PlayerStats.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatBar } from '../StatBar/StatBar';
import { useHudStats } from '../../hooks/useHud';
import { useHudStore } from '../../store/hudStore';
import styles from './PlayerStats.module.scss';

// ── Icons ─────────────────────────────────────
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8.17-15.03-8.17-15.03 0h15.03zM1 17h15v2H1z"/>
  </svg>
);

const DropIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
  </svg>
);

// ── Animations ────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const barVariants = {
  hidden:  { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: 'auto', marginTop: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

// ── Toggle Button ─────────────────────────────
interface ToggleBtnProps {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ active, onClick, label, color }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? color : 'rgba(255,255,255,0.05)',
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
      color: active ? '#0a0a14' : 'rgba(255,255,255,0.4)',
      borderRadius: '999px',
      fontSize: '9px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '2px 8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      pointerEvents: 'auto',
      lineHeight: 1.6,
    }}
  >
    {label}
  </button>
);

// ── Component ─────────────────────────────────
export const PlayerStats: React.FC = () => {
  const { health, armor, hunger, thirst } = useHudStats();
  const showHunger  = useHudStore((s) => s.showHunger);
  const showThirst  = useHudStore((s) => s.showThirst);
  const toggleHunger = useHudStore((s) => s.toggleHunger);
  const toggleThirst = useHudStore((s) => s.toggleThirst);

  return (
    <motion.div
      className={styles.playerStats}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Toggle row */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
        <ToggleBtn
          active={showHunger}
          onClick={toggleHunger}
          label="Hunger"
          color="var(--hunger-color)"
        />
        <ToggleBtn
          active={showThirst}
          onClick={toggleThirst}
          label="Thirst"
          color="var(--thirst-color)"
        />
      </div>

      {/* Health — always visible */}
      <motion.div variants={itemVariants}>
        <StatBar value={health} color="var(--health-color)" icon={<HeartIcon />} label="HEALTH" />
      </motion.div>

      {/* Armor — always visible */}
      <motion.div variants={itemVariants}>
        <StatBar value={armor} color="var(--armor-color)" icon={<ShieldIcon />} label="ARMOR" />
      </motion.div>

      {/* Hunger — togglable */}
      <AnimatePresence initial={false}>
        {showHunger && (
          <motion.div
            key="hunger"
            variants={barVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            <StatBar value={hunger} color="var(--hunger-color)" icon={<HamburgerIcon />} label="HUNGER" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thirst — togglable */}
      <AnimatePresence initial={false}>
        {showThirst && (
          <motion.div
            key="thirst"
            variants={barVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            <StatBar value={thirst} color="var(--thirst-color)" icon={<DropIcon />} label="THIRST" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};