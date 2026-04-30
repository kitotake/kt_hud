// ============================================================
// HUD — Root feature component
// ============================================================
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayerStats } from '../components/PlayerStats/PlayerStats';
import { VehicleHud } from '../components/VehicleHud/VehicleHud';
import { useHudSync } from '../hooks/useHud';
import { useHudStore } from '../store/hudStore';
import styles from './Hud.module.scss';

export const Hud: React.FC = () => {
  // Initialize NUI sync
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
          {/* Bottom-left: Player vital stats */}
          <div className={styles.bottomLeft}>
            <PlayerStats />
          </div>

          {/* Bottom-center: Vehicle HUD */}
          <div className={styles.bottomCenter}>
            <VehicleHud />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};