# PKHosting VPS Hosting (TechAbout assessment)

Static, offline-first pricing page for an invented PKHosting VPS line. Plain HTML, CSS, and JavaScript only.

## How to open

1. Clone or unzip this repository.
2. Open `index.html` in Chrome or Firefox (double-click, or drag into a window).
3. No build step, server, API keys, or internet required after you have the files.

Optional local server (not required):

```bash
npx --yes serve .
```

## What is included

| Path | Purpose |
| --- | --- |
| `index.html` | Page structure: hero, plans, comparison table, FAQ, footer |
| `css/styles.css` | Layout, responsive rules, focus styles |
| `js/pricing.js` | Billing period, currency conversion, `localStorage`, live region |
| `NOTES.md` | Live PKHosting pricing observations + trade-offs |
| `screenshots/` | Viewport captures (`mobile-view.png`, `ipad-view.png`, `desktop-view.png`) |
| `lighthouse/` | Committed Lighthouse report (`report.html`, `report.json`, `SUMMARY.md`) |

## Pricing rules (implemented)

| Plan | Monthly PKR | Annual shown /mo (`monthly x 10 / 12`) | Annual total (`monthly x 10`) |
| --- | ---: | ---: | ---: |
| Starter | 2,400 | 2,000 | 24,000 |
| Growth | 4,800 | 4,000 | 48,000 |
| Scale | 9,600 | 8,000 | 96,000 |
| Dedicated Core | 19,500 | 16,250 | 195,000 |

- Savings badge = `(monthly x 12) - (monthly x 10)`, computed in JS, not hard-typed on annual view.
- FX (hard-coded): `1 USD = 278.50 PKR`, `1 GBP = 355.00 PKR`.
- PKR amounts are whole numbers; USD/GBP use two decimals.
- Currency + billing period persist across reload via `localStorage`.

## Without JavaScript

- Monthly PKR prices remain visible on the cards in the HTML.
- The full comparison table is in the HTML (not injected).
- FAQ still expands via native `<details>` / `<summary>`.
- Billing/currency controls do not update (expected).

## Browsers tested

- Google Chrome (Windows)
- Mozilla Firefox (Windows)
- Viewports checked: mobile / tablet / desktop (see `screenshots/mobile-view.png`, `ipad-view.png`, `desktop-view.png`)
- Also checked: keyboard tab order, 200% zoom, offline open from disk

## Performance / self-containment

- Zero external network requests (no CDNs, fonts, analytics, or hotlinked logos).
- Target total transfer under 300 KB for local files.

## AI assistant disclosure

**Yes. An AI coding assistant (Cursor) was used** to scaffold files, draft CSS/JS, and help with the live-site NOTES audit. I reviewed pricing math, accessibility behaviour, and copy; I can walk through every decision on a call. This is not unedited boilerplate.

## What is unfinished / would improve with more time

- Real checkout links and inventory (intentionally out of scope).
- Automated unit tests for the FX / annual helpers.
- A tiny set of local WOFF2 faces if brand guidelines demanded custom type without a CDN.
- Prefer `matchMedia` polish for billing control layout on very narrow zoomed viewports.
- Wire "Order" buttons to a mock confirmation panel for richer keyboard demos.

## Time taken

About **5 to 6 hours** end-to-end (audit, build, a11y pass, screenshots, Lighthouse, notes, commits).
