# SEO + AdSense checklist (FormReady India)

## Do before applying (code is ready, these are your inputs)
1. Copy `.env.example` to `.env.local` and set NEXT_PUBLIC_CONTACT_EMAIL (real mailbox on your domain), NEXT_PUBLIC_OWNER_NAME, NEXT_PUBLIC_LOCATION.
2. Deploy on your own domain (formreadyindia.com), HTTPS on. AdSense does not approve free subdomains like *.vercel.app.
3. Search Console: add the domain, set NEXT_PUBLIC_GSC_TOKEN, submit https://formreadyindia.com/sitemap.xml, then request indexing for the home page, /tools, /guides and your top 10 tool pages.
4. Wait until Search Console shows most pages as indexed before applying.
5. Apply in AdSense, paste the site, add the verification snippet if asked (or set NEXT_PUBLIC_ADSENSE_CLIENT, which loads the script).

## After approval
- Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX and put the same id in public/ads.txt.
- Create ad units and set NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE. `<AdSlot slot=... />` shows nothing until configured.
- In AdSense > Privacy & messaging, enable Google's consent message for EEA/UK traffic.
- Keep ads away from buttons, one or two per page, never on empty pages.

## Keep publishing
Add 2 to 4 new guides per month in src/data/guides.ts, written from real experience of the topic.
