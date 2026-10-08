# SNEAK PEAK // Sneaker Archive & Paper Store

A boutique sneaker archive and web store built with **React**, **React Router v6**, **Context + useReducer**, and **pure Vanilla CSS with tokens** (zero external UI library dependencies). 

Designed with a warm tactile **"paper store"** aesthetic—featuring warm paper backgrounds, ink-black typography, dynamic accent tints, monospace spec prices, and a cart styled as an authentic **perforated boutique receipt**.

---

## 🌟 Key Features

| Feature | Implementation | Description |
|---|---|---|
| **URL-Synced Filters** | `useProductFilters.js` + `useDebounce.js` | Filters (`?q=`, `?cat=`, `?sort=`) sync two-way with the URL; search input is locally responsive and debounced into query parameters. |
| **Monospace Receipt Cart** | `Receipt.jsx` + `CartLine.jsx` | Full receipt styling with sawtooth perforated tear edges, integer currency calculations, subtotal/tax ledger, and vector barcodes. |
| **Undo on Remove** | `CartContext.jsx` + `ToastViewport.jsx` | Decrementing at quantity 1 or clicking "remove" dispatches `REMOVE` and presents a toast notification with an interactive **Undo** button. |
| **Command Palette** | `CommandPalette.jsx` + `useHotkey.js` | Accessible search dialog with `role="dialog"` and `role="listbox"`, opened with <kbd>Ctrl+K</kbd> / <kbd>⌘K</kbd>, navigable with arrow keys & <kbd>Enter</kbd>. |
| **Cross-Tab Sync** | `CartContext.jsx` + `storage` event | Listens to `window.addEventListener('storage')` to seamlessly synchronize cart changes across multiple open browser tabs. |
| **Recently Viewed** | `useRecentlyViewed.js` | Stores the last 6 viewed silhouettes in `localStorage`, pushed automatically from `ProductPage`. |
| **Smart Empty State** | `EmptyState.jsx` | Analyzes query terms and suggests other categories where matching sneakers exist, with one-click filter resetting. |
| **Dynamic Accent Tint** | `ProductPage.jsx` | Injects each sneaker's hand-picked accent color into the page via CSS variables (`style={{ '--accent': product.accent }}`). |
| **API Latency & Defect Flags** | `productsApi.js` | Simulated async latency (600ms), testable with `?slow=1` (3000ms delay) and `?error=1` (rejection with retry mechanism). |
| **Mobile Bottom Sheet** | `FilterSheet.jsx` | On mobile viewports, filters glide up in a bottom sheet drawer with thumb-reachable cart actions. |

---

## 📁 Folder Structure

```
sneakpeak/
├─ public/
│  ├─ images/                 # Local vector sneaker illustrations (no hotlinking)
│  └─ sneaker-icon.svg
├─ src/
│  ├─ data/
│  │  └─ products.json        # 18 curated sneakers across 5 categories
│  ├─ api/
│  │  └─ productsApi.js       # Simulated async fetch with ?slow=1 & ?error=1 flags
│  ├─ context/
│  │  ├─ ProductsContext.jsx  # Fetch once, exposes { products, status, error, retry }
│  │  ├─ CartContext.jsx      # useReducer + localStorage + cross-tab sync + undo
│  │  └─ ToastContext.jsx     # Actionable toast notifications
│  ├─ hooks/
│  │  ├─ useProductFilters.js # URL <-> { q, cat, sort }
│  │  ├─ useDebounce.js       # Generic input debounce
│  │  ├─ useHotkey.js         # Ctrl/Cmd+K and keyboard bindings
│  │  └─ useRecentlyViewed.js # Local storage FIFO of last 6 viewed sneakers
│  ├─ utils/
│  │  ├─ cartReducer.js       # Pure cart reducer with clamping
│  │  ├─ cartStorage.js       # Defensive localStorage serialization & validation
│  │  ├─ filterProducts.js    # Pure filtering & sorting function
│  │  └─ format.js            # Currency & number formatting with Intl.NumberFormat
│  ├─ components/
│  │  ├─ layout/              # Layout, Header, CartBadge (aria-live), Footer
│  │  ├─ product/             # ProductCard, ProductGrid, ProductSkeleton, RatingStars, RecentlyViewed
│  │  ├─ filters/             # SearchBar, CategoryChips, SortSelect, FilterSheet (mobile)
│  │  ├─ cart/                # CartLine, QuantityStepper, Receipt
│  │  ├─ feedback/            # EmptyState, ErrorState, ToastViewport
│  │  └─ CommandPalette.jsx   # Keyboard-first accessible search modal
│  ├─ pages/
│  │  ├─ ListingPage.jsx      # Archive catalog with filters
│  │  ├─ ProductPage.jsx      # Detail dossier with accent tint & stock alerts
│  │  ├─ CartPage.jsx         # Monospace receipt view
│  │  └─ NotFoundPage.jsx     # Archival 404 handler
│  ├─ styles/
│  │  ├─ tokens.css           # CSS design tokens (Paper, ink, accent, receipt, radii)
│  │  └─ global.css           # Reset, typography, background grain, focus rings
│  ├─ router.jsx              # React Router v6 createBrowserRouter
│  └─ main.jsx                # Provider hierarchy: Products → Toast → Cart → Router
├─ scripts/
│  ├─ generate-images.js      # Vector sneaker art generator
│  └─ test-logic.js           # Unit test suite verifying reducer & filtering logic
├─ package.json
└─ README.md
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **npm**: v9+

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

### 5. Run Verification Tests
```bash
npm test
```
Runs the logic suite validating `cartReducer` operations (add, clamp, remove, clear, hydrate), `filterProducts`, and currency formatting.

---

## 🧪 Testing Query Flags

You can test network latency and error-recovery directly using URL search parameters:

- **Slow Network (`?slow=1`)**:
  [http://localhost:5173/?slow=1](http://localhost:5173/?slow=1)
  *Stretches the simulated API response to 3000ms, showcasing the paper shimmer skeleton loaders.*

- **API Failure (`?error=1`)**:
  [http://localhost:5173/?error=1](http://localhost:5173/?error=1)
  *Rejects the promise, triggering the archival `ErrorState` component with a dynamic **Retry** button.*

- **Normal Mode**:
  [http://localhost:5173/](http://localhost:5173/)
  *Standard 600ms realistic archival retrieval.*

---

## 👟 Data Model (`products.json`)

```json
{
  "id": "deconstructed-blueprint-special-edition",
  "name": "Deconstructed Blueprint Architect Atelier x Sneak Peak Limited Release OG",
  "image": "/images/deconstructed-blueprint-special-edition.svg",
  "price": 34000,
  "category": "collabs",
  "rating": 5.0,
  "ratingCount": 412,
  "description": "An architectural marvel. Features translucent drafting vellum film overlays...",
  "stock": 1,
  "accent": "#4f46e5"
}
```

- **`price`**: Stored as an integer in cents (`34000` = `$340.00`) to guarantee zero floating point arithmetic inaccuracies.
- **`stock`**: Numerical inventory count. Products with `stock: 1` display an urgent archival scarcity badge.
- **`accent`**: Injected directly into CSS custom properties on detail views.

---

## 📜 Design Tokens (`tokens.css`)

The interface is driven by a bespoke token set supporting warm paper mode, system dark mode, and an explicit light/dark switcher:

```css
:root {
  --paper: #f6f1e7;          /* Warm archival paper */
  --ink: #1d1b18;            /* Sumi ink black */
  --muted: #6b645a;          /* Faded pencil graphite */
  --line: #d9d0bf;           /* Bookbinding rule */
  --accent: #c2410c;         /* Wax seal terracotta */
  --card: #fffdf8;           /* Heavy cardstock */
  --font-ui: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## ♿ Accessibility & Micro-Interactions

- **Cart count**: Stored within an `aria-live="polite"` atomic badge with a subtle scale pop animation on update.
- **Keyboard navigation**: Full <kbd>Ctrl+K</kbd> / <kbd>⌘K</kbd> command palette with arrow key selection and focus trap.
- **Focus visibility**: Explicit `:focus-visible` ring across all interactive controls.
- **Motion safety**: Respects `prefers-reduced-motion` to disable animations for sensitive users.
