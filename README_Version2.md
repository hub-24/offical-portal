# HUB-24 — ELDOCTOOOR Portal (Landing + SPA)

This repository contains the landing page (index.html) and the HUB-24 SPA code.

Landing page:
- The root `index.html` is the public landing page for https://www.eldoctooor.ae.
- The landing page includes the AdSense publisher script (client: ca-pub-8167320193401713) and links to the SPA portal.

SPA:
- The React SPA sits in src/ (App.tsx, components, etc.) and uses AdSlot components to render ad units.
- Logos should be placed under `src/assets/logos/`:
  - logo-5.png ... logo-12.png

Ad slots (example IDs used; you said you will create ad units in AdSense):
- 8090293603
- 2323735685
- 1716456944
- 6414189784
- 6214879235
- 8841042573

Deployment:
- Vercel recommended (`vercel.json` provided).
- Add domain `www.eldoctooor.ae` in Vercel and follow the DNS instructions there. After DNS records are updated, Vercel will serve the landing page.

AdSense:
- Ensure the ad units are created and allowed in your AdSense account for the domain.
- AdSense may take some time to activate serving.

How to push
1. Create a feature branch:
   git checkout -b feat/landing-ads-theme

2. Add files:
   (Copy the files above into the specified paths, upload logos to `src/assets/logos/`)

3. Commit & push:
   git add .
   git commit -m "feat: landing + adsense + ad slots + theme selector + footer"
   git push origin feat/landing-ads-theme

4. Open a PR and merge to main, or push to main directly.

If you want, I can paste additional file contents or small helper scripts. Thank you.