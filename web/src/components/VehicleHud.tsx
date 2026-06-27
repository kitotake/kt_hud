// ============================================================
// components/VehicleHud.tsx — compact : vitesse + fuel
// ============================================================
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHudStore } from '../store';
import styles from './VehicleHud.module.scss';

const FuelIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 22h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 8h1a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1 1 1 0 0 0 1-1V9l-2-2"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const VehicleHud: React.FC = () => {
  const { inVehicle, speed, fuel } = useHudStore((s) => s.vehicle);
  const fuelPct = Math.max(0, Math.min(100, fuel));
  const fuelLow = fuelPct <= 20;

  return (
    <AnimatePresence>
      {inVehicle && (
        <motion.div
          className={styles.wrap}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Vitesse */}
          <div className={styles.speedBlock}>
            <span className={styles.speedVal}>{Math.round(speed)}</span>
            <span className={styles.speedUnit}>km/h</span>
          </div>

          {/* Séparateur */}
          <div className={styles.sep} />

          {/* Fuel */}
          <div className={styles.fuelBlock}>
            <div className={styles.fuelTop}>
              <FuelIcon />
              <span
                className={styles.fuelPct}
                style={{ color: fuelLow ? 'var(--danger)' : 'var(--fuel)' }}
              >
                {Math.round(fuelPct)}%
              </span>
            </div>
            <div className={styles.fuelTrack}>
              <motion.div
                className={styles.fuelFill}
                animate={{ width: `${fuelPct}%` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                style={{
                  background: fuelLow ? 'var(--danger)' : 'var(--fuel)',
                  boxShadow:  fuelLow
                    ? '0 0 8px rgba(231,76,60,0.6)'
                    : '0 0 8px rgba(255,211,42,0.5)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
