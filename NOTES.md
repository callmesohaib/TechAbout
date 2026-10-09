# Notes — PKHosting live pricing audit + trade-offs

Audited: [https://www.pkhosting.com/](https://www.pkhosting.com/) and [https://www.pkhosting.com/pricing/](https://www.pkhosting.com/pricing/) on 9 Oct 2026.

## Six observations (element → consequence)

1. **Billing period control (`Monthly` / `Annually` / `2 years` / `3 years` buttons with `aria-pressed`)**  
   Consequence: shoppers can jump across term lengths in one place, but four modes make the savings math harder to scan than a simple monthly/annual pair. Annual copy on cards explicitly says **“10× monthly”**, which is the commercial rule this assessment reuses.

2. **“Save up to 16%” / “Save up to 36%” chips on multi-year buttons**  
   Consequence: the toggle itself markets the discount before the user commits. Peak savings sit on the longest term, which nudges upgrades but can understate what a one-year buyer actually gets.

3. **Header currency control (`aria-label="Change currency"`, default `PKR`)**  
   Consequence: prices are presented as switchable display currency from the chrome, not a separate settings page. Local buyers stay in rupees by default; overseas visitors can reframe totals without leaving the pricing section.

4. **Plan emphasis badge (`Best Value` on Professional Hosting)**  
   Consequence: visual hierarchy steers mid/high shared plans. For this VPS demo I mirrored the idea with a **Most popular** badge on Growth instead of inventing a fifth “value” tier.

5. **Wide comparison `<table>` on `/pricing/`**  
   Consequence: many plan columns force horizontal reading on phones. The page remains usable if the table scrolls inside a region; if the whole document scrolls sideways, mobile trust drops. This build isolates overflow to `.table-scroll`.

6. **Footer “We accept” payment strip (local `/payments/*.svg` logos)**  
   Consequence: payment trust is established before checkout. Logos are first-party assets (not random hotlinks). At audit time the strip showed **Stripe, PayPal, JazzCash, Easypaisa, Bank account** (five marks). The brief referred to eight; treating Stripe as the card rail likely collapses Visa/Mastercard/Amex-style brands into one mark on the current site.

## Trade-offs in this submission

### State persistence
- **Choice:** `localStorage` keys `pkhosting-vps-period` and `pkhosting-vps-currency`.
- **Why:** Survives reload without cookies, accounts, or a backend — fits a static offline page.
- **Cost:** Cleared storage or private-mode restrictions fall back to Monthly + PKR. No cross-device sync (acceptable for a demo).

### Payment methods (cuts)
Live strip at audit: Stripe, PayPal, JazzCash, Easypaisa, Bank account.

This demo footer lists **five text labels** (no hotlinked logos):

| Kept | Why |
| --- | --- |
| JazzCash | Dominant PK mobile wallet for consumer VPS top-ups |
| Easypaisa | Same — coverage outside Jazz-heavy regions |
| Bank transfer | Still common for agency / higher Dedicated Core invoices |
| Visa / Mastercard | Card path Pakistani and diaspora buyers expect (Stripe-class rail, named as cards) |
| PayPal | Useful for remote clients paying agencies in PK |

**Dropped / not listed as separate marks**

- **Stripe as a brand** — buyers recognise card schemes more than the processor; naming Visa/Mastercard covers the same rail without a sixth logo slot.
- **Extra card schemes (Amex, UnionPay, etc.)** if counted toward an older “eight” — low share for a PK-focused VPS SKU; clutters the footer for little conversion.
- **Apple Pay / Google Pay** — nice on mobile checkout, weak as static footer proof without a real wallet flow.
- **Raast / other rails** — emerging; not worth a demo footer line without product confirmation.

### Other deliberate cuts
- No 2-year / 3-year terms (assessment asks Monthly/Annually only).
- No external fonts, analytics, or CDN — keeps the page offline and under 300 KB.
- FAQ uses native `<details>` so expand/collapse works with JavaScript disabled.
