/* =========================================================================
   SITE DATA — edit this file to update the whole website.
   -------------------------------------------------------------------------
   • Babies: set "sex" to "Female" or "Male" and the price fills in
     automatically from "pricing" below. Leave it as "TBC" until known.
   • Ages, dates of birth and names are not known yet — replace "TBC" and
     the placeholder names with real details.
   • Set a field to null (or "") to hide it.
   ========================================================================= */

// Shorthand for the photos in /images
const IMG = (stamp) => `images/photo_2026-10-02_${stamp}.jpg`;

window.SITE = {

  /* ---------- Brand & contact ---------- */
  brand: {
    name: "Canopy Hollow",
    tagline: "Marmoset Nursery",
    description:
      "A small, family-run marmoset nursery focused on attentive care, daily enrichment and thoughtful placement into prepared homes.",
  },

  contact: {
    phone: "+1 (917) 665-0015",          // shown as text
    phoneLink: "+19176650015",            // digits only, used for tel: links
    email: "jonesjohnpauljr48@gmail.com",
    location: "Davie, Florida",
    whatsapp: "19176650015",              // international format, digits only (used for wa.me)
    hours: "Replies usually within 24 hours",
    social: {
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
      tiktok: "https://tiktok.com/",
      youtube: "",                        // leave empty to hide
    },
    // FormSubmit sends inquiries and checkout requests to this email address.
    formEndpoint: "https://formsubmit.co/ajax/jonesjohnpauljr48@gmail.com",
  },

  /* ---------- Prices (applied automatically from each baby's sex) ---------- */
  pricing: {
    female: "$1,500",
    male: "$1,000",
    deposit: "$500",                      // shown under the subtotal at checkout ("" to hide)
  },

  /* ---------- Home hero ---------- */
  hero: {
    image: IMG("20-23-53 (2)"),
    video: "",                            // optional: "images/hero.mp4" — plays muted & looped over the image
  },

  /* ---------- Available babies ----------
     status: "available" | "reserved" | "sold" | "coming-soon"
     sex: "Female" | "Male" | "TBC"   → sets the price automatically
     price: leave out to use automatic pricing, or set a custom value
     featured: true → shown on the home page (up to 4)
     photos: first photo is the cover image                                  */
  babies: [
    {
      id: "baby-one",
      name: "Willow",
      species: "Marmoset",
      sex: "Female",
      age: "8 weeks",
      dob: "TBC",
      status: "available",
      featured: true,
      personality:
        "A fluffy little one with a soft grey-and-gold grizzled coat, a dark crown and a neatly ringed tail. Photographed by a sunny window, perched comfortably on a hand and looking straight into the camera.",
      details: [],
      photos: [IMG("19-20-30"), IMG("19-20-30 (4)"), IMG("19-20-30 (5)")],
    },
    {
      id: "baby-two",
      name: "Amber",
      species: "Marmoset",
      sex: "Female",
      age: "10 weeks",
      dob: "TBC",
      status: "available",
      featured: true,
      personality:
        "A sun-kissed baby with a warm golden coat and a long, ringed tail curled neatly beside them. Pictured sitting up on a tabletop in the afternoon light, gazing upward with bright, curious eyes.",
      details: [],
      photos: [IMG("19-20-30 (3)"), IMG("19-20-30 (2)")],
    },
    {
      id: "baby-three",
      name: "Pip",
      species: "Marmoset",
      sex: "Male",
      age: "3 weeks",
      dob: "TBC",
      status: "available",
      featured: true,
      personality:
        "A tiny, soft-faced baby with big dark eyes and a thick, banded tail wrapped snugly around a finger. Shown cuddled in the hand, holding on with little fingers and looking calm and content.",
      details: [],
      photos: [IMG("19-54-28 (2)"), IMG("19-54-28 (3)")],
    },
    {
      id: "baby-four",
      name: "Smokey",
      species: "Marmoset",
      sex: "Male",
      age: "4 weeks",
      dob: "TBC",
      status: "available",
      featured: true,
      personality:
        "A dark, silvery-coated baby with striking glossy eyes and a black-and-gold striped tail. Pictured curled up on a plush blanket, peeking up at the camera from a cosy nest.",
      details: [],
      photos: [IMG("19-59-39"), IMG("19-59-39 (2)")],
    },
    {
      id: "baby-five",
      name: "Maple",
      species: "Marmoset",
      sex: "TBC",
      age: "2 weeks",
      dob: "TBC",
      status: "reserved",
      featured: false,
      personality:
        "A sweet-faced baby with a pale, cream-and-gold head, a dark crown patch and wide, shining eyes. Photographed snuggled right up beside a parent, paws resting on a soft grey blanket.",
      details: [],
      photos: [IMG("19-59-49")],
    },
    {
      id: "baby-six",
      name: "Milo",
      species: "Marmoset",
      sex: "TBC",
      age: "2 weeks",
      dob: "TBC",
      status: "sold",
      featured: false,
      personality:
        "A tiny baby with a brown-grey coat, a pale forehead stripe and round, alert eyes. Shown holding on to a thumb with small, delicate hands, plus a sleepy moment curled up on a pink blanket.",
      details: [],
      photos: [IMG("20-00-12 (2)"), IMG("20-00-12 (3)"), IMG("20-00-12")],
    },
    {
      id: "baby-seven",
      name: "Onyx",
      species: "Marmoset",
      sex: "TBC",
      age: "3 weeks",
      dob: "TBC",
      status: "sold",
      featured: false,
      personality:
        "A little one with a dark, velvety face, soft cream brows and big glossy eyes. Pictured peeking over a fluffy pink blanket, head tilted toward the camera.",
      details: [],
      photos: [IMG("20-01-10"), IMG("20-01-09")],
    },
    {
      id: "baby-eight",
      name: "Copper",
      species: "Pygmy Marmoset",
      sex: "Male",
      age: "14 weeks",
      dob: "TBC",
      status: "available",
      featured: false,
      personality:
        "A pygmy marmoset with a rich orange-brown coat, a long tail and amber eyes. Photographed climbing confidently along a branch, tilting their head to take a good look at the camera.",
      details: [],
      photos: [IMG("20-24-59 (2)"), IMG("20-24-59"), IMG("20-24-59 (3)"), IMG("20-24-59 (4)")],
    },
    {
      id: "baby-nine",
      name: "Atlas",
      species: "Marmoset",
      sex: "TBC",
      age: "12 weeks",
      dob: "TBC",
      status: "reserved",
      featured: false,
      personality:
        "A slightly older youngster with a grizzled grey coat, a dark face and the beginnings of dark ear tufts. Pictured leaning on a fluffy white cushion in a play pen with hanging toys, looking upward.",
      details: [],
      photos: [IMG("20-28-31 (2)")],
    },
  ],

  /* ---------- Our Monkeys gallery ----------
     category: "babies" | "adults" | "parents" | "daily-life" | "enrichment"
     size: "" | "tall" | "wide"  (optional, for a varied masonry layout)       */
  gallery: [
    { src: IMG("19-54-28"),      category: "babies",     caption: "Two little ones tucked into a fluffy blanket", size: "tall" },
    { src: IMG("20-00-37"),      category: "babies",     caption: "Piggyback siblings" },
    { src: IMG("20-00-37 (2)"),  category: "babies",     caption: "Cheek to cheek", size: "wide" },
    { src: IMG("20-23-53"),      category: "babies",     caption: "Three babies, one cosy bed" },
    { src: IMG("20-28-31"),      category: "adults",     caption: "Relaxing on the cat tree", size: "tall" },
    { src: IMG("20-24-59"),      category: "adults",     caption: "A pygmy marmoset out on a branch" },
    { src: IMG("20-01-53"),      category: "parents",    caption: "Riding along with dad", size: "wide" },
    { src: IMG("20-00-38"),      category: "parents",    caption: "Holding on tight" },
    { src: IMG("19-59-49 (2)"),  category: "parents",    caption: "Safe on a parent's back", size: "tall" },
    { src: IMG("20-00-03 (3)"),  category: "parents",    caption: "A watchful parent with two babies" },
    { src: IMG("20-00-03 (2)"),  category: "daily-life", caption: "Mealtime with an oral syringe", size: "tall" },
    { src: IMG("20-23-53 (2)"),  category: "daily-life", caption: "Afternoon light by the balcony", size: "wide" },
    { src: IMG("20-01-09"),      category: "daily-life", caption: "Fresh food bowl in the background" },
    { src: IMG("19-20-30 (2)"),  category: "daily-life", caption: "Sunbathing on the side table" },
    { src: IMG("20-24-59 (3)"),  category: "enrichment", caption: "Climbing practice", size: "tall" },
    { src: IMG("20-28-31 (2)"),  category: "enrichment", caption: "Play pen with hanging toys" },
    { src: IMG("20-00-03"),      category: "enrichment", caption: "Cuddle time on the plush toy" },
  ],

  /* ---------- Home: "Life With Our Monkeys" (3–4 photos) ---------- */
  life: [
    { src: IMG("20-00-03 (3)"), caption: "Family time" },
    { src: IMG("20-00-03 (2)"), caption: "Mealtimes" },
    { src: IMG("20-23-53 (3)"), caption: "Nap buddies" },
    { src: IMG("20-28-31"),     caption: "Lazy afternoons" },
  ],

  /* ---------- About: "Growing Together" timeline photos ---------- */
  growing: [
    { src: IMG("19-54-28"),     label: "Snuggled together" },
    { src: IMG("19-59-49 (2)"), label: "Riding with the family" },
    { src: IMG("20-00-37"),     label: "Piggyback siblings" },
    { src: IMG("20-28-31 (2)"), label: "Growing up and curious" },
  ],
};
