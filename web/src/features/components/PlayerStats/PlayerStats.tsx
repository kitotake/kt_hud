// features/components/PlayerStats/PlayerStats.tsx
// FIX #1 : import SCSS corrigé → PlayerStats.module.scss (P majuscule)
// MAJ : Hunger / Thirst / Stress retirés du HUD.
// Health et Armor restent seuls, avec le nouveau visuel VitalBar.
import React from 'react';
import { motion } from 'framer-motion';
import { VitalBar } from './VitalBar';
import { useHudStats } from '../../hooks/useHud';
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

// ── Animations ────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// ── Component ─────────────────────────────────
export const PlayerStats: React.FC = () => {
  const { health, armor } = useHudStats();

  return (
    <motion.div
      className={styles.playerStats}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <VitalBar value={health} color="var(--health-color)" icon={<HeartIcon />} label="HEALTH" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <VitalBar value={armor} color="var(--armor-color)" icon={<ShieldIcon />} label="ARMOR" />
      </motion.div>
    </motion.div>
  );
};