# 📁 Structure du projet KT_HUD

```bash
KT_HUD/
│   .gitignore
│   fxmanifest.lua
│
├── client/
│   └── main.lua
│
├── server/
│   └── main.lua
│
├── shared/
│   └── config.lua
│
└── web/
    │   .gitignore
    │   eslint.config.js
    │   index.html
    │   package-lock.json
    │   package.json
    │   README.md
    │   tsconfig.app.json
    │   tsconfig.json
    │   tsconfig.node.json
    │   vite.config.ts
    │
    ├── dist/                  # Build final (à ignorer dans Git)
    │   │   favicon.svg
    │   │   icons.svg
    │   │   index.html
    │   │
    │   └── assets/
    │       ├── index-BVrhnIFu.js
    │       └── index-VkDRvK7d.css
    │
    ├── public/                # Assets statiques
    │   ├── favicon.svg
    │   └── icons.svg
    │
    └── src/
        │   main.tsx           # Entrée React
        │
        ├── app/
        │   │   App.tsx
        │   │
        │   └── store/
        │       └── uiStore.ts
        │
        ├── assets/
        │   ├── hero.png
        │   ├── react.svg
        │   └── vite.svg
        │
        ├── core/              # Logique système (NUI, events, bridge)
        │   │   index.ts
        │   │
        │   ├── bridge/
        │   │   ├── devTools.ts
        │   │   └── nuiBridge.ts
        │   │
        │   ├── events/
        │   │   └── eventBus.ts
        │   │
        │   └── nui/
        │       ├── fetchNui.ts
        │       └── useNuiMessage.ts
        │
        ├── design-system/     # Design system (tokens, thèmes, mixins)
        │   │   index.scss
        │   │
        │   ├── mixins/
        │   │   └── _mixins.scss
        │   │
        │   ├── themes/
        │   │   └── _variables.scss
        │   │
        │   └── tokens/
        │       ├── _colors.scss
        │       └── _spacing.scss
        │
        ├── features/          # Logique métier (HUD, etc.)
        │   │   index.ts
        │   │
        │   ├── components/
        │   │   │   index.ts
        │   │   │
        │   │   ├── Hud/
        │   │   │   ├── Hud.module.scss
        │   │   │   └── Hud.tsx
        │   │   │
        │   │   ├── PlayerStats/
        │   │   │   ├── PlayerStats.module.scss
        │   │   │   └── PlayerStats.tsx
        │   │   │
        │   │   ├── StatBar/
        │   │   │   ├── StatBar.module.scss
        │   │   │   └── StatBar.tsx
        │   │   │
        │   │   └── VehicleHud/
        │   │       ├── VehicleHud.module.scss
        │   │       └── VehicleHud.tsx
        │   │
        │   ├── hooks/
        │   │   └── useHud.ts
        │   │
        │   └── store/
        │       ├── hudStore.ts
        │       └── types.ts
        │
        ├── providers/         # Providers React globaux
        │   ├── StoreProvider.tsx
        │   └── ThemeProvider.tsx
        │
        ├── shared/            # Composants & types réutilisables
        │   ├── components/
        │   │   │   index.ts
        │   │   │
        │   │   ├── Button/
        │   │   │   ├── Button.module.scss
        │   │   │   └── Button.tsx
        │   │   │
        │   │   └── ErrorBoundary/
        │   │       └── ErrorBoundary.tsx
        │   │
        │   └── types/
        │       └── index.ts
        │
        └── styles/
            └── globals.scss   # Styles globaux
```

---

## 🧠 Notes

* `core/` → logique technique (NUI, events, bridge)
* `features/` → logique métier (HUD, stats, véhicule…)
* `shared/` → composants réutilisables
* `design-system/` → système de design (tokens, thèmes)
* `providers/` → contextes React globaux
* `dist/` → build final (à ne **pas versionner**)

---

## ⚠️ Bonnes pratiques

* Ignorer `dist/` dans `.gitignore`
* Éviter les fichiers vides inutiles
* Garder `shared/` uniquement pour du code vraiment réutilisable
* Structurer `features/` par fonctionnalité (ex: `hud/`)

---
