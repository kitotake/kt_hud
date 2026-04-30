// ============================================================
// StatBar — Animated stat bar with icon + label
// ============================================================
import React, { useMemo } from 'react';
import styles from './StatBar.module.scss';
import clsx from 'clsx';

interface StatBarProps {
  value: number;       // 0–100
  max?: number;
  color: string;       // CSS var or hex
  icon: React.ReactNode;
  label?: string;
  variant?: 'horizontal' | 'compact';
  className?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  value,
  max = 100,
  color,
  icon,
  label,
  variant = 'horizontal',
  className,
}) => {
  const pct = useMemo(() => Math.max(0, Math.min(100, (value / max) * 100)), [value, max]);

  const isLow = pct <= 25;
  const isMed = pct > 25 && pct <= 50;

  return (
    <div
      className={clsx(styles.statBar, styles[variant], className, {
        [styles.low]: isLow,
        [styles.med]: isMed,
      })}
      style={{ '--stat-color': color, '--fill-pct': `${pct}%` } as React.CSSProperties}
    >
      <div className={styles.icon}>{icon}</div>

      <div className={styles.track}>
        {label && (
          <div className={styles.meta}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{Math.round(value)}</span>
          </div>
        )}
        <div className={styles.bar}>
          <div className={styles.fill} />
        </div>
      </div>
    </div>
  );
};