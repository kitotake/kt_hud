// ============================================================
// components/MinimapBars.tsx
// HP  → arc SVG sous minimap cercle
// Armor → barre droite en dessous (séparée)
// ============================================================
import React from 'react';
import { motion } from 'framer-motion';
import { useHudStore } from '../store';
import styles from './MinimapBars.module.scss';

// ── Couleurs dynamiques ───────────────────────────────────────
function hpColor(p: number)    { return p > 50 ? '#2ecc71' : p > 25 ? '#f39c12' : '#e74c3c'; }
function armorColor()          { return '#4db8ff'; }

// ── Géométrie arc HP (cercle minimap) ────────────────────────
const MAP_W  = 148;
const R      = 74;
const CX     = MAP_W / 2;
const CY     = R;
const STROKE = 7;
const GAP    = 5;
const ARC_R  = R + GAP + STROKE / 2;
const A_START = 205;
const A_END   = 335;
const A_SPAN  = A_END - A_START;

function polarXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcD(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarXY(cx, cy, r, start);
  const e = polarXY(cx, cy, r, end);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${end - start > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
}

// Hauteur SVG = point le plus bas de l'arc + marge
const ARC_BOTTOM = CY + ARC_R + STROKE / 2 + 2;
// Barre armor : juste sous le SVG arc
const ARMOR_H    = 7;
const ARMOR_GAP  = 6;
const ARMOR_CR   = 12;
const ARMOR_X1   = ARMOR_CR;
const ARMOR_X2   = MAP_W - ARMOR_CR;
const ARMOR_SPAN = ARMOR_X2 - ARMOR_X1;

export const MinimapBars: React.FC = () => {
  const health = useHudStore((s) => s.health);
  const armor  = useHudStore((s) => s.armor);

  const hp  = Math.max(0, Math.min(100, health));
  const ap  = Math.max(0, Math.min(100, armor));

  const hpCol    = hpColor(hp);
  const arCol    = armorColor();
  const hpCrit   = hp <= 25;
  const arCrit   = ap <= 25 && ap > 0;

  const fillEnd  = A_START + (hp / 100) * A_SPAN;
  const trackArc = arcD(CX, CY, ARC_R, A_START, A_END);
  const fillArc  = hp > 0 ? arcD(CX, CY, ARC_R, A_START, fillEnd) : '';

  const arFillLen = (ap / 100) * ARMOR_SPAN;
  const arFillX2  = ARMOR_X1 + arFillLen;

  // Hauteur totale SVG = arc + gap + armor
  const svgH = ARC_BOTTOM + ARMOR_GAP + ARMOR_H + 4;

  return (
    <div className={styles.wrap}>
      <svg
        width={MAP_W}
        height={svgH}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="hpGlow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="arGlow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Arc HP ── */}
        <path
          d={trackArc}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {hp > 0 && (
          <motion.path
            d={fillArc}
            fill="none"
            stroke={hpCol}
            strokeWidth={STROKE}
            strokeLinecap="round"
            filter="url(#hpGlow)"
            animate={{ opacity: hpCrit ? [1, 0.2, 1] : 1 }}
            transition={hpCrit
              ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0 }}
            style={{ transition: 'stroke 0.35s ease' }}
          />
        )}

        {/* ── Barre Armor (droite, sous l'arc) ── */}
        {(() => {
          const y = ARC_BOTTOM + ARMOR_GAP;
          return (
            <>
              <line
                x1={ARMOR_X1} y1={y}
                x2={ARMOR_X2} y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={ARMOR_H}
                strokeLinecap="round"
              />
              {ap > 0 && (
                <motion.line
                  x1={ARMOR_X1} y1={y}
                  x2={arFillX2} y2={y}
                  stroke={arCol}
                  strokeWidth={ARMOR_H}
                  strokeLinecap="round"
                  filter="url(#arGlow)"
                  animate={{ opacity: arCrit ? [1, 0.2, 1] : 1 }}
                  transition={arCrit
                    ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0 }}
                  style={{ transition: 'stroke 0.35s ease' }}
                />
              )}
            </>
          );
        })()}
      </svg>
    </div>
  );
};
