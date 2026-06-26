// web/src/features/components/PlayerStats/VitalBar.tsx
// ============================================================
// VitalBar — Nouveau visuel pour Health / Armor
// Badge circulaire (anneau de progression en conic-gradient)
// + barre épaisse animée avec glow/shimmer.
// Remplace l'ancien StatBar pour ces deux stats désormais que
// Hunger / Thirst / Stress ont été retirés du HUD.
// ============================================================
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './VitalBar.module.scss';

interface VitalBarProps {
  value: number;        // 0–100
  max?: number;
  color: string;        // CSS var ou hex
  icon: React.ReactNode;
  label: string;
}

export const VitalBar: React.FC<VitalBarProps> = ({
  value,
  max = 100,
  color,
  icon,
  label,
}) => {
  const pct = useMemo(() => Math.max(0, Math.min(100, (value / max) * 100)), [value, max]);
  const isCritical = pct <= 25;

  return (
    <div
      className={clsx(styles.vitalBar, { [styles.critical]: isCritical })}
      style={{ '--stat-color': color, '--pct': pct } as React.CSSProperties}
    >
      <div className={styles.badge}>
        <div className={styles.badgeInner}>{icon}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{Math.round(value)}</span>
        </div>
        <div className={styles.track}>
          <motion.div
            className={styles.fill}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
};