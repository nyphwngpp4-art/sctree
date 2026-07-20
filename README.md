# SC Tree Service LLC — website concept

Static site (plain HTML/CSS/JS, no build step) for SC Tree Service LLC,
Brownwood, TX. Deployed on Cloudflare Pages at https://sctree.agaviai.com.

## Pages

- `/` — customer website
- `/saul/` — private owner preview (noindex, excluded from sitemap,
  disallowed in robots.txt)

## Deploy

```
npx wrangler pages deploy . --project-name=agavi-demo-sc-tree --commit-dirty=true
```

`_redirects` shadows this README so it is never publicly readable on the
deployed site.

## Fact policy

Every claim on the customer site is verified:

- "Insured", "Free Estimates": advertised on the business's own website.
- "Serving Central Texas since 1992": business start date per owner-provided
  brief (BBB lists the 1992 start date).
- Review quotes: verbatim excerpts from reviews published on
  sctreeservicellc.com/reviews.html, with the reviewer attribution as
  published there. Ellipses mark elision; nothing is paraphrased.
- Photos: real SC Tree Service job photos supplied by the client. No stock,
  no generated imagery.
- Not stated anywhere (unverified): bonded, licensed, certified arborist,
  BBB accreditation, response times, 24/7 availability, hours of operation.

## Hero video

Active. The hero loop was generated from the real climber photo
(Seedance image-to-video, 7s, 16:9) and ships as `assets/hero-loop.mp4`
(H.264, preferred, 1.1 MB) with `assets/hero-loop.webm` (VP9 fallback for
codec-less Chromium builds). `app.js` swaps it in over the real-photo
poster (muted, looped, playsInline) — except for visitors with
reduced-motion or data-saver enabled, who keep the still photo. To disable,
remove the `data-hero-video` attribute from `#hero-media` in `index.html`.

## Vendored

- `qr.js` — qrcode-generator 1.4.4 (MIT, Kazuhiko Arase), renders the
  desktop SMS QR code.
- `assets/fonts/` — Barlow / Barlow Condensed (OFL), self-hosted latin
  subsets.
