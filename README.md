# Snowboard Afghanistan website

A static website (plain HTML, CSS and JavaScript). No build step and no dependencies.

## What's inside

```
index.html      Home
about.html      About Us, Mission & Vision
team.html       Our Team
news.html       News & Events
partners.html   Our Partners
404.html        "Page not found" page (Vercel uses it automatically)
site.css        Shared styles for the inner pages
site.js         Shared animations and menu
img/            All photos and logos (keep this folder next to the pages)
vercel.json     Vercel settings (image caching, security headers)
```

All file names are lowercase. Keep them that way: Vercel's servers treat `Logo.png` and `logo.png` as different files.

## Preview on your computer

Double-click `index.html`, or run a tiny local server from this folder:

```
npx serve .
```

## Put it on GitHub

1. Create a new empty repository on github.com (for example `snowboard-afghanistan`).
2. Upload the **contents** of this folder (not the folder itself), so `index.html` sits at the top level of the repository. You can drag and drop the files on GitHub's "uploading an existing file" page, or use the command line:

```
cd snowboard-afghanistan
git init
git add .
git commit -m "New Snowboard Afghanistan website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/snowboard-afghanistan.git
git push -u origin main
```

## Deploy on Vercel

1. Go to vercel.com, choose **Add New → Project**, and import the GitHub repository.
2. Framework preset: **Other**. Leave Build Command and Output Directory empty.
3. Click **Deploy**. Every future push to `main` redeploys the site automatically.
4. To use afghanistansnowboard.org, open the project's **Settings → Domains**, add the domain, and follow the DNS instructions Vercel shows.

## Links you may want to update later

- Join / volunteer form: Google Form link (search the HTML files for `docs.google.com/forms`)
- Donate: PayPal link (search for `paypal.com`)
- GoFundMe: search for `gofundme.com`
- The contact form on the home page opens the visitor's email app addressed to president.afg.snowboarding@gmail.com. To receive messages without that step, connect a form service such as Formspree and point the form at it.
