/**
 * Single source of truth for NFSC site copy.
 * Extracted from the Stitch design (screen a90c3d9d…) and reconciled with PLAN.md.
 * Edit copy here, not in components.
 */

export const site = {
  name: "NFSC",
  fullName: "Dr. Nikhil Face Surgical & Aesthetic Centre",
  tagline: "Where surgical precision meets aesthetic artistry",
  city: "Mumbai",

  doctor: {
    name: "Dr. Nikhil",
    credentials: "MDS — Oral & Maxillofacial Surgery",
    degree: "MDS, Maxillofacial Surgery",
    experienceLine: "10+ Years Surgical Experience",
    role: "Maxillofacial & Aesthetic Surgeon",
    bioShort:
      "Personalized facial surgery and hair restoration by Dr. Nikhil — combining surgical precision with artistic vision in a calm, premium environment.",
    bioLong:
      "A pioneer in facial surgical aesthetics, Dr. Nikhil combines artistic vision with meticulous surgical precision to deliver natural, transformative results.",
    bioFull:
      "With over a decade of specialized experience in facial aesthetics and reconstructive surgery, Dr. Nikhil brings a blend of artistic vision and rigorous medical precision to every procedure. His philosophy centers on enhancing natural beauty while prioritizing structural integrity and patient safety.",
    bullets: [
      "Board Certified Facial Plastic Surgeon",
      "International Fellowship Trained",
      "Renowned for Minimally Invasive Techniques",
    ],
    specialties: ["Rhinoplasty", "Facial Contouring", "Orthognathic Surgery"],
    quote:
      "Every face tells a story. My role is to help you tell yours with confidence.",
    philosophyQuote:
      "I believe every patient deserves results that feel entirely authentic to who they are, achieved through the highest standards of medical safety.",
  },

  hero: {
    h1: "Expert Facial Surgery & Aesthetic Treatments",
    subhead: "Where surgical precision meets aesthetic artistry.",
    primaryCta: "Book Free Consultation",
    secondaryCta: "Call Now",
    socialProof: "Trusted by patients across Mumbai",
    pills: [
      "Rhinoplasty",
      "Facelift",
      "Hair Transplant",
      "PRP Therapy",
      "Blepharoplasty",
    ],
    cards: [
      {
        title: "Facial Surgery",
        href: "/treatments/facial-surgery",
        icon: "scissors",
      },
      {
        title: "Hair Treatments",
        href: "/treatments/hair-treatments",
        icon: "wind",
      },
      {
        // No /skin route yet — link to treatments index for now.
        title: "Skin Treatments",
        href: "/treatments",
        icon: "droplet",
      },
    ],
  },

  whyChoose: {
    title: "Why Choose NFSC",
    subtitle: "What sets us apart",
    cards: [
      {
        icon: "medical_services",
        title: "Expert Surgeon",
        description:
          "Specialized experience in facial aesthetics and reconstructive surgery.",
      },
      {
        icon: "biotech",
        title: "Advanced Technology",
        description:
          "Latest minimally invasive techniques for precise, safe procedures.",
      },
      {
        icon: "volunteer_activism",
        title: "Personalized Care",
        description:
          "Custom treatment plans designed around your individual goals.",
      },
    ],
    keywords: [
      "Safe Procedures",
      "Latest Equipment",
      "Custom Plans",
      "Certified Clinic",
    ],
  },

  treatments: {
    title: "Our Treatments",
    subtitle: "Comprehensive surgical and aesthetic solutions",
    rows: [
      {
        index: "01",
        slug: "facial-surgery",
        label: "FACIAL SURGERY",
        title: "Facial Surgery",
        icon: "scissors",
        description:
          "Specialized surgical procedures designed to enhance your natural facial features with precision and artistry.",
        procedures: [
          "Rhinoplasty",
          "Facelift",
          "Blepharoplasty",
          "Jaw Contouring",
          "Otoplasty",
        ],
      },
      {
        index: "02",
        slug: "hair-treatments",
        label: "HAIR TREATMENTS",
        title: "Hair Treatments",
        icon: "wind",
        description:
          "Advanced hair restoration and scalp treatments utilizing the latest technology to regain your confidence.",
        procedures: [
          "Hair Transplant",
          "PRP Therapy",
          "Mesotherapy",
          "GFC Treatment",
        ],
      },
    ],
  },

  stats: [
    { number: "10+", label: "Years of Surgical Experience" },
    { number: "500+", label: "Successful Procedures (Career Total)" },
  ],

  ctaBanner: {
    title: "Begin Your Aesthetic Journey",
    subtitle: "Book your free consultation — we'll guide you through every step",
    fields: {
      name: "Your Name",
      phone: "Phone Number",
      email: "Email Address",
      treatment: "Treatment Interest",
      message: "Tell us about your goals (optional)",
      submit: "Book Now",
    },
    fallback: "or call",
    visit: "Visit Our Clinic",
  },

  trustIcons: [
    { icon: "verified_user", label: "Safe Procedures" },
    { icon: "medical_services", label: "Certified Clinic" },
    { icon: "volunteer_activism", label: "Personalized Care" },
    { icon: "precision_manufacturing", label: "Advanced Technology" },
  ],

  about: {
    equipment: {
      title: "Advanced Technology",
      subtitle: "Equipped with the latest in surgical and aesthetic technology",
      items: [
        {
          icon: "microscope",
          title: "Digital Surgical Microscope",
          description: "Precision visualization for complex procedures",
          tag: "Facial Surgery",
        },
        {
          icon: "zap",
          title: "Advanced Laser System",
          description: "Minimally invasive precision for skin and hair",
          tag: "Skin & Hair",
        },
        {
          icon: "rotateCw",
          title: "High-Speed PRP Centrifuge",
          description: "Optimized growth factor concentration",
          tag: "PRP Therapy",
        },
      ],
    },
    values: {
      title: "Our Core Values",
      items: [
        {
          number: "01",
          title: "Safety First",
          description:
            "Uncompromising adherence to international medical standards and rigorous safety protocols in every procedure.",
        },
        {
          number: "02",
          title: "Personalized Approach",
          description:
            "Tailored treatment plans designed specifically to match your unique anatomy and aesthetic goals.",
        },
        {
          number: "03",
          title: "Honest Guidance",
          description:
            "Transparent consultations providing realistic expectations and clear, evidence-based recommendations.",
        },
      ],
    },
    doctorProfile: {
      eyebrow: "Lead Surgeon",
    },
    philosophy: {
      image: "/images/nikhil/about-nikhil2.jpg",
      imageAlt: "Dr. Nikhil at work, the art of surgery",
    },
    team: {
      title: "Our Team",
      subtitle: "Dedicated professionals committed to your care",
      members: [
        {
          name: "Dr. Pandharinath Khade",
          image: "/images/team/Dr-Pandharinath-Khade.jpeg",
          role: "Associate Doctor",
          degree: "MBBS, DDVL, DNB Dermatology",
          specialties: [
            "Clinical Dermatology",
            "Aesthetic Dermatology",
            "Dermatosurgery",
          ],
          experience: "6+ Years Experience",
        },
        {
          name: "Dr. Pooja Golwade",
          image: "/images/team/Dr-Pooja-Golwade.jpeg",
          role: "Associate Doctor",
          degree: "MBBS, MD, DNB Dermatology",
          specialties: [
            "Clinical Dermatology",
            "Cosmetic Dermatology",
            "Trichology",
          ],
          experience: "5+ Years Experience",
        },
      ],
    },
    clinic: {
      eyebrow: "Our Clinic",
      title: "A Space Designed for Your Comfort",
      description:
        "We have meticulously designed our facility to evoke tranquility and trust. Moving away from traditional clinical aesthetics, NFSC blends high-end architectural design with uncompromising medical functionality to create an environment where healing begins the moment you enter.",
      features: [
        {
          icon: "compass",
          title: "State-of-the-Art",
          description:
            "Equipped with the latest advancements in surgical technology.",
        },
        {
          icon: "sparkles",
          title: "Sterile Environment",
          description:
            "Exceeding international standards for surgical hygiene and safety.",
        },
        {
          icon: "heartHandshake",
          title: "Patient-First Design",
          description:
            "Private recovery suites focusing on discretion and peace.",
        },
      ],
    },
  },

  gallery: {
    title: "Transformations",
    subtitleParts: ["Real patients", "Real results", "Real confidence"],
    filters: [
      "All",
      "Facial Surgery",
      "Hair Treatments",
      "Rhinoplasty",
      "Facelift",
    ],
    // TODO: replace placeholder items with real before/after photo pairs.
    // Each item: title, category, timeline.
    items: [
      {
        title: "Rhinoplasty",
        category: "Facial Surgery",
        timeline: "6 months post-procedure",
      },
      {
        title: "Facelift",
        category: "Facial Surgery",
        timeline: "1 year post-procedure",
      },
      {
        title: "Hair Transplant",
        category: "Hair Treatments",
        timeline: "9 months post-procedure",
      },
      {
        title: "Blepharoplasty",
        category: "Facial Surgery",
        timeline: "3 months post-procedure",
      },
      {
        title: "PRP Therapy",
        category: "Hair Treatments",
        timeline: "6 months post-procedure",
      },
      {
        title: "Jaw Contouring",
        category: "Facial Surgery",
        timeline: "1 year post-procedure",
      },
      {
        title: "Otoplasty",
        category: "Facial Surgery",
        timeline: "4 months post-procedure",
      },
      {
        title: "GFC Treatment",
        category: "Hair Treatments",
        timeline: "5 months post-procedure",
      },
    ],
    disclaimer:
      "All photos are of real patients of Dr. Nikhil Face Surgical & Aesthetic Centre. These images have not been retouched or altered in any way. Results may vary depending on individual anatomy and post-operative care.",
  },

  testimonials: {
    title: "Patient Stories",
    subtitleParts: [
      "Hear from those who trusted us with their transformation",
      "Real experiences",
      "Real results",
    ],
    // TODO: replace placeholder testimonials with real, consented reviews
    // before launch. Authentic reviews matter for trust + Google E-E-A-T.
    featured: [
      {
        quote:
          "The level of care and precision at NFSC is unparalleled. I felt completely understood during my consultation, and the results are incredibly natural. It has truly restored my confidence.",
        rating: 5,
        author: "Rajesh M.",
        treatment: "Rhinoplasty",
        timeline: "3 months post-procedure",
      },
      {
        quote:
          "From consultation to recovery, every step was handled with care and professionalism. Dr. Nikhil's attention to detail is remarkable, and the outcome speaks for itself.",
        rating: 5,
        author: "Priya S.",
        treatment: "Facelift",
        timeline: "6 months post-procedure",
      },
      {
        quote:
          "After years of hesitation, I am so glad I chose NFSC for my hair transplant. The procedure was painless, the team was supportive, and the result feels completely natural.",
        rating: 5,
        author: "Vikram K.",
        treatment: "Hair Transplant",
        timeline: "1 year post-procedure",
      },
    ],
    statsStrip: [
      { icon: "star", label: "4.9 ★ Average Rating" },
      { icon: "heart", label: "100% Would Recommend" },
      { icon: "verified", label: "Verified Patient Reviews" },
    ],
    filters: [
      "All Reviews",
      "Facial Surgery",
      "Hair Treatments",
      "5 Star Only",
    ],
    reviews: [
      {
        rating: 5,
        text:
          "The team at NFSC made me feel so comfortable from day one. The results of my facelift exceeded all my expectations and look completely natural.",
        author: "Sarah A.",
        initials: "SA",
        category: "Facial Surgery",
        treatment: "Facelift",
      },
      {
        rating: 5,
        text:
          "Dr. Nikhil's expertise is evident from the first consultation. My rhinoplasty was a transformative experience and the recovery was smoother than expected.",
        author: "Aarav G.",
        initials: "AG",
        category: "Facial Surgery",
        treatment: "Rhinoplasty",
      },
      {
        rating: 5,
        text:
          "I struggled with hair loss for years. The PRP treatments at NFSC made a remarkable difference and I now feel confident again.",
        author: "Kabir T.",
        initials: "KT",
        category: "Hair Treatments",
        treatment: "PRP Therapy",
      },
      {
        rating: 5,
        text:
          "My blepharoplasty results are subtle yet transformative. I look refreshed without anyone being able to tell I had work done.",
        author: "Meera P.",
        initials: "MP",
        category: "Facial Surgery",
        treatment: "Blepharoplasty",
      },
      {
        rating: 4,
        text:
          "Excellent clinic experience overall. Communication was clear at every stage and the staff were welcoming. Recovery took a little longer than I anticipated.",
        author: "Rohan D.",
        initials: "RD",
        category: "Facial Surgery",
        treatment: "Jaw Contouring",
      },
      {
        rating: 5,
        text:
          "The hair transplant procedure was meticulously planned. Watching my hairline restore over months has been incredible. Truly a confidence-changing experience.",
        author: "Neha R.",
        initials: "NR",
        category: "Hair Treatments",
        treatment: "Hair Transplant",
      },
      {
        rating: 5,
        text:
          "Dr. Nikhil takes the time to understand exactly what you want. The result of my rhinoplasty is exactly the natural refinement I had hoped for.",
        author: "Ishaan V.",
        initials: "IV",
        category: "Facial Surgery",
        treatment: "Rhinoplasty",
      },
      {
        rating: 5,
        text:
          "GFC treatment delivered noticeable density and shine within months. The clinic environment is peaceful and the team is genuinely caring.",
        author: "Aanya B.",
        initials: "AB",
        category: "Hair Treatments",
        treatment: "GFC Treatment",
      },
      {
        rating: 5,
        text:
          "My otoplasty experience was exceptional. The honesty during consultation and the precision of the procedure made all the difference.",
        author: "Dev L.",
        initials: "DL",
        category: "Facial Surgery",
        treatment: "Otoplasty",
      },
    ],
    googleCta: {
      title: "See all our reviews on Google",
      subtitle: "We value every patient's feedback",
      // Reuses site.contact.mapDirectionsUrl — the Google Maps place page
      // shows the clinic's reviews tab. Single source of truth.
    },
  },

  contact: {
    address:
      "1st floor, Avenue Building, Hemukalani Cross Rd 4, near KES International School, Sambhav Darshan, Hemu Colony, Irani Wadi, Kandivali West, Mumbai, Maharashtra 400067",
    postalCode: "400067",
    phone: "+91 7020089539",
    email: "nikhilangre597@gmail.com",
    hours: "Mon–Sun • 10AM–8PM",
    // Iframe-friendly embed (q-based search lands on the clinic pin without an API key).
    mapEmbedUrl:
      "https://maps.google.com/maps?q=NFSC+-+Dr.+Nikhil+Face+Surgical+%26+Aesthetic+Centre%2C+Kandivali+West%2C+Mumbai&output=embed",
    // Full Google Maps URL with lat/long + CID — used by both the footer
    // "Get Directions" link and the CTA banner "Visit Our Clinic" button.
    mapDirectionsUrl:
      "https://www.google.com/maps?ll=19.200452,72.841788&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&cid=3538749345988090820",
  },

  footer: {
    about:
      "Elevating confidence through expert facial surgical and aesthetic care in a world-class environment.",
    // TODO: replace placeholder hrefs with real social URLs before launch.
    socials: [
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "YouTube", href: "#", icon: "youtube" },
    ],
    copyright:
      "© 2026 NFSC — Dr. Nikhil Face Surgical & Aesthetic Centre. All rights reserved.",
    quickLinks: [
      { label: "About", href: "/about" },
      { label: "Treatments", href: "/treatments" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    treatments: [
      { label: "Facial Surgery", href: "/treatments/facial-surgery" },
      { label: "Hair Treatments", href: "/treatments/hair-treatments" },
      { label: "Rhinoplasty", href: "/treatments/facial-surgery#rhinoplasty" },
      { label: "Hair Transplant", href: "/treatments/hair-treatments#hair-transplant" },
    ],
  },
};
