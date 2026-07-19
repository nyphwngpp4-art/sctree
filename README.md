# SC Tree Service LLC — demo site

Theme C (Land & Ranch). Trade: tree service, Brownwood / Early / Lake
Brownwood, TX. Hook: a 30+ year tree business with no gallery, no
storm/emergency page, and no proof of insurance displayed — this site is
what SC Tree looks like the moment it starts showing the work instead of
just naming it.

## Deploy

First time only (creates the Pages project):
```
npx wrangler pages project create agavi-demo-sc-tree --production-branch=main
```

Deploy / redeploy:
```
npx wrangler pages deploy sites/sc-tree --project-name=agavi-demo-sc-tree --commit-dirty=true
```

Live URL: https://agavi-demo-sc-tree.pages.dev
(deployment alias printed by wrangler on each deploy, e.g.
https://e2607b12.agavi-demo-sc-tree.pages.dev)

## Variation lever picked

Per design-system §6, this slug is pre-assigned: **green-forward palette +
tick divider + cream paper**. Built to that assignment:

- vs. **hot-fence** (its Theme C sibling: also green-forward + cream paper,
  but **horizon** divider and restrained title-case copy): this site uses
  the **tick** divider instead — a picket/barbed rhythm that reads more
  "cutting" than fence's calm land-and-sky horizon line, appropriate for a
  trade that's about removal and cleanup rather than boundary-building.
- vs. **lucky-t-feed** (brown/tan-forward palette + horizon divider + kraft
  paper): opposite palette direction entirely (green/timber here vs.
  brown/grain there), so all three Theme C siblings read as one family with
  three distinct trades, not clones.
- The **cream header** (plain rule underbar, no solid color bar) was chosen
  over a bordered-plate wordmark or an accent underbar because the
  centerpiece — the before/after gallery plus the storm callout — needed to
  be the one section that visually outweighs everything else on the page.
  A quieter header keeps that contrast intact.

## Centerpiece

One centerpiece section (`#work`) carries two pieces, per the brief:
1. A six-pair before/after gallery (`.ph-pair` frames, all labeled photo
   placeholders — nothing pulled from real photos yet).
2. A storm-damage callout inside the same panel, with a direct call CTA to
   325-642-7438 and an `ASK OWNER` slot for response time (no 24-hour or
   emergency-availability claim is made anywhere on the page).

## Walk-in checklist — placeholders to close before presenting

Count: **9 checklist items** (13 instances on the page — the phone number
and address repeat across header, hero, storm CTA, hours, action bar, and
footer, but those are confirmed facts, not placeholders).

| # | Where on page | What it says | Ask who | Notes |
|---|---|---|---|---|
| 1 | Trust bar, "Insured" stat | `ASK OWNER — insured? bonded?` (styled slot) | Owner | Facebook posts (business's own group post) claim "Insured," but this was not independently confirmed — do not publish insured/bonded status either way until the owner confirms it directly. |
| 2 | Centerpiece, storm callout | `ASK OWNER — storm response time` (styled slot) | Owner | No 24-hour or emergency-response claim is made anywhere on the page per instruction. If the owner wants to advertise a response time (same-day, next-day, etc.), get the real answer and add it here. |
| 3–8 | Centerpiece, before/after gallery (6 pairs) | `PHOTO — [job], pull from Facebook` / `pull from Facebook or Yelp` | Owner / presenter | The SC Tree Facebook page and the Yelp listing (54 photos referenced in the verifier's search-index snapshot) are the two real photo sources. Pull matching before/after pairs for: large tree removal, storm-damaged tree cleanup, stump grinding, canopy trimming, debris hauled off, and hazard-tree removal near a structure. If a true before/after pair isn't available for a given job type, swap in whatever single strong photo exists rather than leaving a mismatched pair. |
| — | Hours block (body) + footer (repeats) | `Mon–Fri: ASK OWNER`, `Sat–Sun: ASK OWNER` | Owner | No hours data was found anywhere in research — nothing to seed this with. |
| — | Reviews section, 3 review-slot cards | "Paste one real Google or Facebook review here." | Presenter | Factory-wide design-director ruling for this batch: **all** review cards ship as labeled slots, no real quote goes on the page. See the candidate quote below. |
| 9 | Hero background photo | Generic licensed industry photo (oak canopy, not SC Tree's premises) | Presenter | Credit already placed in the footer ("Background photo: Acabashi / CC BY-SA 4.0") — required by the license, do not remove. Offer to swap the hero for the owner's own job-site photos after the walk-in once real photos are pulled. |

**Candidate review quote (verify before pasting, do not print as-is):**
Donnie Bingham, via Facebook — *"They did a great job! Their price was
unbeatable"* — sourced from a search-engine cached snippet of the Facebook
page, not a direct re-fetch, so it's flagged moderate-confidence in
verification.md. **Before the walk-in: open the live SC Tree Facebook page,
confirm this review exists word-for-word (and that the reviewer's name is
still Donnie / Donnie Bingham), then paste it verbatim into one review slot.**
Note it also contains the word "price" — that's the customer's own word
inside their quote, not house copy, so it's fine to keep verbatim once
confirmed; just don't let it read as the business's own pricing claim.

## Facts used, and why

- **Phone**: 325-642-7438 — confirmed identical across BBB, the business's
  own website (homepage + contact page), a Facebook group post, and the
  LeadStal directory. Used as the single `tel:+13256427438` link everywhere
  (6 instances: header, hero, storm CTA, hours, action bar, footer).
- **Address**: 4402 Edgewood Dr, Brownwood, TX 76801 — consistent across
  BBB, LeadStal, and Chamber of Commerce. No NAP conflict found (the
  business's own site just abbreviates it to "Edgewood Drive, Brownwood,
  TX" without the number, which isn't a genuine conflict) — published as a
  plain confirmed address, not a VERIFY slot.
- **Tenure**: BBB says 34 years (started 1/1/1992); the business's own site
  says "over 30 years." Per instruction, used exactly **"over 30 years"**
  everywhere — true under either figure and matches the business's own
  self-description.
- **Owner name**: Saul Contreras surfaced via BBB but is intentionally NOT
  published anywhere on the site or in this README's page copy — it's only
  referenced here, internally, for the operator's awareness. The page uses
  no owner name at all (no "family-run" framing either, to avoid implying
  an unconfirmed structure).
- **Insurance/bonding**: NOT stated as true or false anywhere. Their own
  Facebook marketing claims "Insured," but that's unverified by the
  research pass — shipped as a labeled `ASK OWNER` slot in the trust bar
  (checklist item 1).
- **Storm/emergency framing**: the storm section is a call CTA only. No
  24-hour or emergency response-time claim appears anywhere — response
  time is a labeled `ASK OWNER` slot (checklist item 2).
- **Reviews**: BBB A+, Facebook 100% recommend (8 reviews), and a 5.0
  aggregator index all confirm live, intact reputation — but per the
  factory-wide design-director ruling for this batch, **zero real quote
  cards go on the page**. All three review cards are labeled slots. The one
  moderate-confidence candidate quote (Donnie, sourced from a cached
  Facebook snippet, not a live re-fetch) lives only in this README as a
  walk-in checklist item to verify and paste, never printed on the page
  itself.
- **No numerals for reputation** anywhere — no star ratings, review counts,
  or percentages. Reputation is carried by the "On Google & Facebook"
  trust-bar line and the Facebook link in Find Us.
- **Services**: Tree Removal, Tree Trimming, Stump Grinding, Debris
  Removal, and Storm Damage Cleanup — all five are listed directly on the
  business's own current Weebly site, not invented.
- **"Free estimates"**: their own site and a Facebook group post both
  advertise free estimates. Left off this demo entirely — a zero-price
  claim is still a pricing claim, and demos never show pricing of any kind.
  If the owner wants it on the real site, that's their call at launch, not
  ours to add here.
- **License**: tree service is not a state-licensed trade in Texas — no
  license language appears anywhere, per claims-safety §6.

## Self-check performed

- Renders at 375px (single-column stack; the before/after pairs stay
  readable at two columns per pair; mobile sticky action bar present,
  hides at ≥860px per base.css).
- All phone instances use `tel:+13256427438` (6 instances) — matches
  325-642-7438 exactly.
- Zero numerals for ratings, review counts, or percentages anywhere
  (checked via grep for digit+star/review/% patterns — none found; the
  only digits on the page are the phone number, address, "over 30 years"
  tenure phrasing, and CSS font-weight values).
- Zero unlabeled placeholders — every `ASK OWNER` / photo slot / review
  slot carries a visible mono label and an HTML comment saying who to ask
  or where to pull from.
- Zero banned words (solutions, seamless, elevate, unparalleled, passion,
  cutting-edge) — checked via grep, none found.
- Zero exclamation marks in visible copy (grep matches were all `<!--`
  HTML comment markers, not punctuation).
- Footer credit present: "Site concept by Agavi AI · agaviai.com".
- No pricing anywhere in the site's own copy (including no "free
  estimates" language — see note above).
- Hero now uses the factory-wide `.hero--photo` pattern (design-system
  amendment): `assets/hero.jpg` (oak canopy, licensed, generic — not SC
  Tree's premises) full-bleed under a Theme C green-brown tint, preloaded
  with `fetchpriority="high"` for LCP, `width`/`height` set to prevent
  layout shift. Attribution required by the CC BY-SA 4.0 license is in the
  footer: "Background photo: Acabashi / CC BY-SA 4.0". Hero copy, CTAs, and
  `tel:` links are unchanged from the flat-hero version.
