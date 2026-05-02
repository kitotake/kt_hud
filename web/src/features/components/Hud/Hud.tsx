// ============================================================
// HUD — Root feature component
// FIX: déplacé dans features/components/Hud/Hud.tsx pour correspondre
// au barrel index.ts et à l'import dans features/index.ts
// ============================================================
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayerStats } from '../PlayerStats/PlayerStats';
import { VehicleHud } from '../VehicleHud/VehicleHud';
import { useHudSync } from '../../hooks/useHud';
import { useHudStore } from '../../store/hudStore';
import styles from './Hud.module.scss';

export const Hud: React.FC = () => {
  useHudSync();
  const visible = useHudStore((s) => s.visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.hudRoot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.bottomLeft}>
            <PlayerStats />
          </div>
          <div className={styles.bottomCenter}>
            <VehicleHud />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hud;