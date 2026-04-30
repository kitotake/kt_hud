// ============================================================
// VehicleHud — Speedometer + Fuel + Gear display
// ============================================================
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVehicleStats } from '../../hooks/useHud';
import styles from './VehicleHud.module.scss';
import clsx from 'clsx';

export const VehicleHud: React.FC = () => {
  const { speed, fuel, gear, rpm, inVehicle } = useVehicleStats();

  const fuelPct  = Math.max(0, Math.min(100, fuel));
  const rpmPct   = Math.max(0, Math.min(100, (rpm ?? 0) * 100));
  const fuelLow  = fuelPct <= 20;

  return (
    <AnimatePresence>
      {inVehicle && (
        <motion.div
          className={styles.vehicleHud}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Speedometer */}
          <div className={styles.speedBlock}>
            <span className={styles.speedValue}>{Math.round(speed)}</span>
            <span className={styles.speedUnit}>km/h</span>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Gear */}
          <div className={styles.gearBlock}>
            <span className={styles.gearLabel}>GEAR</span>
            <span className={styles.gearValue}>
              {gear === 0 ? 'N' : gear}
            </span>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Fuel */}
          <div className={styles.fuelBlock}>
            {/* Fuel icon */}
            <svg className={clsx(styles.fuelIcon, { [styles.fuelIconLow]: fuelLow })} viewBox="0 0 24 24" fill="none">
              <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 22h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 8h1a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V9l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

            <div className={styles.fuelTrack}>
              <span className={styles.fuelValue}>{Math.round(fuel)}%</span>
              <div className={styles.fuelBar}>
                <motion.div
                  className={clsx(styles.fuelFill, { [styles.fuelFillLow]: fuelLow })}
                  animate={{ width: `${fuelPct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          {/* RPM bar */}
          {rpm !== undefined && (
            <div className={styles.rpmBar}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(styles.rpmSegment, {
                    [styles.rpmActive]:    (i + 1) * 10 <= rpmPct,
                    [styles.rpmDanger]:   i >= 8,
                  })}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};