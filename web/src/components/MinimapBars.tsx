// ============================================================
// components/MinimapBars.tsx
// HP  → arc SVG autour de la minimap cercle
// Armor → barre droite sous la minimap
// + masque CSS qui force la minimap native en cercle
// ============================================================
import React from 'react';
import { motion } from 'framer-motion';
import { useHudStore } from '../store';
import styles from './MinimapBars.module.scss';

// ── Couleurs dynamiques ───────────────────────────────────────
function hpColor(p: number) {
  return p > 50 ? '#2ecc71' : p > 25 ? '#f39c12' : '#e74c3c';
}

// ── Géométrie ─────────────────────────────────────────────────
// La minimap GTA native fait ~148×148px en résolution 1080p
// Elle est positionnée à ~6px du bord gauche, ~20px du bas (safe area)
const MAP_W    = 148;   // largeur minimap native
const MAP_H    = 148;   // hauteur minimap native
const CX       = MAP_W / 2;
const CY       = MAP_H / 2;
const STROKE   = 7;
const GAP      = 5;     // espace entre minimap et arc
const ARC_R    = MAP_W / 2 + GAP + STROKE / 2;

// Arc HP : de 195° à 345° (bas gauche → bas droite, évite le haut)
const A_START  = 195;
const A_END    = 345;
const A_SPAN   = A_END - A_START;

// Barre armor sous la minimap
const ARMOR_H    = 6;
const ARMOR_GAP  = 10;
const ARMOR_CR   = 14;  // arrondi aux extrémités
const ARMOR_X1   = ARMOR_CR;
const ARMOR_X2   = MAP_W - ARMOR_CR;
const ARMOR_SPAN = ARMOR_X2 - ARMOR_X1;

// Offset de la minimap native dans le coin bas gauche
const MAP_OFFSET_X = 6;   // px depuis le bord gauche
const MAP_OFFSET_Y = 20;  // px depuis le bas

function polarXY(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcD(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarXY(cx, cy, r, start);
  const e = polarXY(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

// Hauteur SVG = minimap + arc dépassant + armor sous
const SVG_W    = MAP_W + (ARC_R + STROKE) * 2;
const SVG_H    = MAP_H + (ARC_R + STROKE) * 2 + ARMOR_GAP + ARMOR_H + 4;
// Centre de la minimap dans le SVG
const SCX      = SVG_W / 2;
const SCY      = ARC_R + STROKE + MAP_H / 2;

export const MinimapBars: React.FC = () => {
  const health      = useHudStore((s) => s.health);
  const armor       = useHudStore((s) => s.armor);
  const minimapShape = useHudStore((s) => s.minimapShape);

  const hp  = Math.max(0, Math.min(100, health));
  const ap  = Math.max(0, Math.min(100, armor));

  const hpCol  = hpColor(hp);
  const hpCrit = hp <= 25;
  const arCrit = ap <= 25 && ap > 0;

  const fillEnd   = A_START + (hp / 100) * A_SPAN;
  const trackArc  = arcD(SCX, SCY, ARC_R, A_START, A_END);
  const fillArc   = hp > 0 ? arcD(SCX, SCY, ARC_R, A_START, fillEnd) : '';

  const arFillLen = (ap / 100) * ARMOR_SPAN;
  const arFillX2  = SCX - MAP_W / 2 + ARMOR_CR + arFillLen;
  const arY       = SCY + MAP_H / 2 + ARMOR_GAP;
  const arX1      = SCX - MAP_W / 2 + ARMOR_CR;
  const arX2      = SCX + MAP_W / 2 - ARMOR_CR;

  // Décalage du SVG pour aligner avec la minimap native
  const svgLeft = MAP_OFFSET_X - (SCX - MAP_W / 2);
  const svgBottom = MAP_OFFSET_Y - (SVG_H - (SCY + MAP_H / 2 + ARMOR_GAP + ARMOR_H + 4));

  return (
    <div className={styles.wrap}>

      {/* Masque circulaire — cache les coins de la minimap native */}
      {minimapShape === 'circle' && (
        <div
          className={styles.circleClip}
          style={{
            bottom: MAP_OFFSET_Y,
            left:   MAP_OFFSET_X,
          }}
        />
      )}

      {/* SVG des barres — positionné par rapport à la minimap */}
      <svg
        width={SVG_W}
        height={SVG_H}
        style={{
          display:  'block',
          overflow: 'visible',
          position: 'absolute',
          left:     svgLeft,
          bottom:   svgBottom,
        }}
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

        {/* ── Barre Armor (sous la minimap) ── */}
        <line
          x1={arX1} y1={arY}
          x2={arX2} y2={arY}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={ARMOR_H}
          strokeLinecap="round"
        />
        {ap > 0 && (
          <motion.line
            x1={arX1}     y1={arY}
            x2={arFillX2} y2={arY}
            stroke="#4db8ff"
            strokeWidth={ARMOR_H}
            strokeLinecap="round"
            filter="url(#arGlow)"
            animate={{ opacity: arCrit ? [1, 0.2, 1] : 1 }}
            transition={arCrit
              ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0 }}
          />
        )}
      </svg>
    </div>
  );
};