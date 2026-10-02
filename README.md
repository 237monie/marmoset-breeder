# Canopy Hollow — Marmoset Nursery

A static website for a family-run marmoset nursery, with five pages: Home, Available Babies, Our Monkeys, About Us and Contact Us.

No build step is needed. Open `index.html` in a browser, or serve the folder with any static host such as GitHub Pages.

## Editing content

Almost everything is controlled from **`assets/js/site-data.js`**:

- **Brand and contact:** name, phone, email, location, WhatsApp, social links.
- **Pricing:** female and male prices, plus the deposit shown at checkout.
- **Babies:** name, species, sex, age, status (`available`, `reserved`, `sold`, `coming-soon`), description and photos.
- **Gallery, "Life With Our Monkeys" and the "Growing Together" timeline:** photo paths and captions.

Photos live in `images/`.

## Cart and checkout

Visitors can add available babies to a cart. The cart is stored in their browser. At checkout they enter their contact details and address, and the request is emailed to the breeder.

To receive requests directly instead of through the visitor's email app, set `contact.formEndpoint` in `site-data.js` to a form service endpoint, for example Formspree.

## Structure

```
index.html              Home
available-babies.html   Catalogue, detail panel, cart
our-monkeys.html        Photo gallery with lightbox
about-us.html           Breeder story
contact-us.html         Contact details, inquiry and checkout form
assets/css/style.css    All styles
assets/js/site-data.js  Editable content
assets/js/main.js       Site behaviour
images/                 Photos
```
