import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  className,
  ...rest
}) => (
  <button
    className={clsx(styles.btn, styles[variant], styles[size], className, {
      [styles.loading]: loading,
    })}
    disabled={disabled || loading}
    {...rest}
  >
    {loading && <span className={styles.spinner} />}
    {!loading && icon && iconPosition === 'left' && (
      <span className={styles.icon}>{icon}</span>
    )}
    {children && <span className={styles.label}>{children}</span>}
    {!loading && icon && iconPosition === 'right' && (
      <span className={styles.icon}>{icon}</span>
    )}
  </button>
);