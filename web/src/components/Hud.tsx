// ============================================================
// components/Hud.tsx — layout racine
// ============================================================
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHudStore } from '../store';
import { MinimapBars } from './MinimapBars';
import { VehicleHud }  from './VehicleHud';
import styles from './Hud.module.scss';

export const Hud: React.FC = () => {
  const visible = useHudStore((s) => s.visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.root}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Bas gauche — sur la minimap FiveM */}
          <div className={styles.minimapZone}>
            <MinimapBars />
          </div>

          {/* Centre bas — véhicule */}
          <div className={styles.vehicleZone}>
            <VehicleHud />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
