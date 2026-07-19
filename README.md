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

The hero ships as a real-photo poster. To turn on the video loop:

1. Add `assets/hero-loop.webm` and/or `assets/hero-loop.mp4`.
2. Add the `data-hero-video` attribute to `<div class="hero__media"
   id="hero-media">` in `index.html`.

`app.js` then swaps the loop in (muted, looped, playsInline) — except for
visitors with reduced-motion or data-saver enabled, who keep the still
photo.

## Vendored

- `qr.js` — qrcode-generator 1.4.4 (MIT, Kazuhiko Arase), renders the
  desktop SMS QR code.
- `assets/fonts/` — Barlow / Barlow Condensed (OFL), self-hosted latin
  subsets.
