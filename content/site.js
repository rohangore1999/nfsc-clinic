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
    name: "Dr. Nikhil Angre, MDS | F.F.P.S | F.H.R.S",
    credentials: "MDS — Oral & Maxillofacial Surgery",
    degree: "Maxillofacial Surgeon | Fellow in Facial Plastic Surgery & Hair Transplant Surgery",
    experienceLine: "5+ Years Surgical Experience",
    role: "Maxillofacial & Aesthetic Surgeon",
    bioShort:
      "Personalized facial surgery and hair restoration by Dr. Nikhil — combining surgical precision with artistic vision in a calm, premium environment.",
    bioLong:
      "A pioneer in facial surgical aesthetics, Dr. Nikhil combines artistic vision with meticulous surgical precision to deliver natural, transformative results.",
    bioFull:
      "Dr. Nikhil Angre, MDS, is a highly skilled Maxillofacial Surgeon with specialized fellowship training in Facial Plastic Surgery and Hair Transplant Surgery. With over 5 years of clinical and surgical experience, he focuses on delivering natural, transformative results through a patient-centered approach that prioritizes both aesthetics and safety.",
    expertiseTitle: "Areas of Expertise",
    expertiseAreas: [
      {
        title: "Facial Plastic & Cosmetic Surgery",
        description: "Advanced rejuvenation and contouring procedures tailored for natural harmony:",
        bullets: [
          "Facelift & Necklift",
          "Blepharoplasty (Eyelid Surgery)",
          "Rhinoplasty (Nose Reshaping)",
          "V-Line Jaw Contouring & Chin Augmentation",
          "Facial Fat Grafting & Lip Reshaping"
        ]
      },
      {
        title: "Maxillofacial Surgery & Reconstruction",
        description: "Expert management of complex facial and jaw conditions:",
        bullets: [
          "Maxillofacial Trauma & Fracture Surgery",
          "Orthognathic (Jaw Correction) Surgery",
          "Facial Reconstruction Procedures",
          "Jaw Cysts and Tumor Management",
        ]
      },
      {
        title: "Aesthetics & Hair Restoration",
        description: "Minimally invasive treatments and advanced hair restoration:",
        bullets: [
          "Botox & Dermal Fillers",
          "Anti-Aging Aesthetic Solutions",
          "Hair Transplant Surgery (FUE/FUT)",
          "Beard & Eyebrow Transplant Surgery",
        ]
      }
    ],
    whyChooseTitle: "Why Choose Dr. Nikhil Angre?",
    whyChooseParagraphs: [
      "At NFSC – Dr. Nikhil Face Surgical & Aesthetic Centre, Kandivali West, patients receive comprehensive care utilizing state-of-the-art technology. From advanced minimally invasive treatments to complex maxillofacial reconstruction, every procedure is meticulously planned.",
      "Dr. Angre combines surgical precision, artistic vision, and advanced techniques to achieve natural-looking, balanced, and long-lasting results. His expertise in both cosmetic and reconstructive facial surgery ensures comprehensive care with a strong focus on safety, aesthetics, and patient satisfaction."
    ],
    whyChoosePatientsld: "Why Patients Trust Dr. Nikhil Angre",
    bullets: [
      "Board Certified Facial Plastic Surgeon",
      "International Fellowship Trained",
      "Renowned for Minimally Invasive Techniques",
    ],
    specialties: [
      "Fellowship-Trained Specialist",
      "5+ Years Surgical Experience",
      "Personalized Treatment Plans",
      "Natural-Looking Results",
      "State-of-the-Art Facility",
      "Ethical Patient-Centered Care"
    ],
    whyChoosePatientstext: [
      "Transforming Faces. Restoring Confidence. Enhancing Lives.",
      "NFSC – Dr. Nikhil Face Surgical & Aesthetic Centre, Kandivali West, Mumbai."
    ],
    quote:
      "Every face tells a story. My role is to help you tell yours with confidence.",
    philosophyQuote:
      "I believe every patient deserves results that feel entirely authentic to who they are, achieved through the highest standards of medical safety.",
  },

  hero: {
    h1: "Expert Facial Surgery & Aesthetic Treatments",
    subhead: "Where surgical precision meets aesthetic artistry.",
    primaryCta: "Book Your Consultation",
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
        title: "Facial Plastic Surgery",
        href: "/treatments/facial-plastic-surgery",
        icon: "scissors",
        image: "/images/treatments/facial-plastic-surgery.jpeg",
      },
      {
        title: "Non Surgical Facial Aesthetics",
        href: "/treatments/non-surgical-facial-aesthetics",
        icon: "wind",
        image: "/images/treatments/non-surgical-facial-aesthetics.jpg",
      },
      {
        title: "Cosmetic Treatments",
        href: "/treatments/cosmetic-treatments",
        icon: "droplet",
        image: "/images/treatments/cosmetic-treatments.jpeg",
      },
      {
        title: "Maxillofacial & Oral Surgery",
        href: "/treatments/maxillofacial-and-oral-surgery",
        icon: "wind",
        image: "/images/treatments/maxillofacial-and-oral-surgery.png",
      },
      {
        title: "Dental Treatments",
        href: "/treatments/dental",
        icon: "wind",
        image: "/images/treatments/dental.jpg",
      },
      {
        title: "Dermatology",
        href: "/treatments/dermatology",
        icon: "wind",
        image: "/images/treatments/dermatology.png",
      },
      {
        title: "Hair Treatments",
        href: "/treatments/hair-treatments",
        icon: "wind",
        image: "/images/treatments/hair-treatments.png",
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
        slug: "facial-plastic-surgery",
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
    { number: "5+", label: "Years of Surgical Experience" },
    { number: "200+", label: "Successful Procedures (Career Total)" },
  ],

  ctaBanner: {
    title: "Begin Your Aesthetic Journey",
    subtitle: "Book your consultation — we'll guide you through every step",
    fields: {
      name: "Your Name",
      phone: "Phone Number",
      email: "Email Address",
      treatment: "Treatment Interest",
      message: "Tell us about your goals (optional)",
      submit: "Book Now",
    },
    treatmentOptions: [
      "Facial Plastic Surgery",
      "Non-Surgical Facial Aesthetics",
      "Cosmetic Treatments",
      "Maxillofacial & Oral Surgery",
      "Dental",
      "Dermatology",
      "Hair Treatments",
      "Other",
    ],
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
          image: "/images/Advanced_tech/Microscope.jpeg",
        },
        {
          icon: "zap",
          title: "Advanced Laser System",
          description: "Minimally invasive precision for skin and hair",
          tag: "Skin & Hair",
          image: "/images/Advanced_tech/Laser_system.jpeg",
        },
        {
          icon: "rotateCw",
          title: "High-Speed PRP Centrifuge",
          description: "Optimized growth factor concentration",
          tag: "PRP Therapy",
          image: "/images/Advanced_tech/PRP_centrifuge.jpeg",
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
      "Clinic",
      "Facial Plastic Surgery",
      "maxillofacial & oral surgery",
    ],
    // TODO: replace placeholder items with real before/after photo pairs.
    // Each item: title, category, timeline.
    items: [
      {
        title: "Rhinoplasty",
        category: "Facial Plastic Surgery",
        timeline: "6 months post-procedure",
        imageBefore: "/images/gallery/rhinoplasty-before.png",
        imageAfter: "/images/gallery/rhinoplasty-after.png",
      },
      {
        title: "Facelift",
        category: "Facial Plastic Surgery",
        timeline: "1 year post-procedure",
        imageBefore: "/images/gallery/facelift-before.png",
        imageAfter: "/images/gallery/facelift-after.png",
      },
      {
        title: "Chin Augmentation",
        category: "Facial Plastic Surgery",
        timeline: "1 year post-procedure",
        imageBefore: "/images/gallery/chinaugmentation-before.png",
        imageAfter: "/images/gallery/chinaugmentation-after.png",
      },
      {
        title: "Buccal Fat Removal",
        category: "Facial Plastic Surgery",
        timeline: "1 year post-procedure",
        imageBefore: "/images/gallery/buccal-fat-removal-before.png",
        imageAfter: "/images/gallery/buccal-fat-removal-after.png",
      },
      {
        title: "Neck Lift Surgery",
        category: "Facial Plastic Surgery",
        timeline: "1 year post-procedure",
        imageBefore: "/images/gallery/necklift-before.png",
        imageAfter: "/images/gallery/necklift-after.png",
      },
      {
        title: "Blepharoplasty",
        category: "Facial Plastic Surgery",
        timeline: "3 months post-procedure",
        imageBefore: "/images/gallery/blepharoplasty-before.png",
        imageAfter: "/images/gallery/blepharoplasty-after.png",
      },
      {
        title: "Orthognathic Surgery",
        category: "maxillofacial & oral surgery",
        timeline: "3 months post-procedure",
        imageBefore: "/images/gallery/orthognatic-before.png",
        imageAfter: "/images/gallery/orthognatic-after.png",
      },
      {
        title: "Tongue Tie Surgery",
        category: "maxillofacial & oral surgery",
        timeline: "3 months post-procedure",
        imageBefore: "/images/gallery/Tongue_tie_before.png",
        imageAfter: "/images/gallery/Tongue_tie_after.png",
      },
      { title: "Reception 1", category: "Clinic", timeline: "Facility", image: "/images/Clinic/Reception1.jpeg" },
      { title: "Reception 2", category: "Clinic", timeline: "Facility", image: "/images/Clinic/Reception2.jpeg" },
      { title: "Reception 3", category: "Clinic", timeline: "Facility", image: "/images/Clinic/Reception3.jpeg" },
      { title: "Dermatology 1", category: "Clinic", timeline: "Facility", image: "/images/Clinic/DermatRoom1.jpeg" },
      { title: "Dermatology 2", category: "Clinic", timeline: "Facility", image: "/images/Clinic/DermatRoom2.jpeg" },
      { title: "Surgery 1", category: "Clinic", timeline: "Facility", image: "/images/Clinic/SurgeryRoom1.jpeg" },
      { title: "Surgery 2", category: "Clinic", timeline: "Facility", image: "/images/Clinic/SurgeryRoom2.jpeg" },
      { title: "Smile Studio 1", category: "Clinic", timeline: "Facility", image: "/images/Clinic/SmileStudio1.jpeg" },
      { title: "Smile Studio 2", category: "Clinic", timeline: "Facility", image: "/images/Clinic/SmileStudio2.jpeg" },
      { title: "Doctor's Consultation", category: "Clinic", timeline: "Facility", image: "/images/Clinic/NikhilRoom.jpeg" },
      { title: "Waiting Area 1", category: "Clinic", timeline: "Facility", image: "/images/Clinic/WaitingRoom1.jpeg" },
      { title: "Waiting Area 2", category: "Clinic", timeline: "Facility", image: "/images/Clinic/WaitingRoom2.jpeg" },
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
    // Real Google reviews — verified patients (source: Google Business Profile, July 2026)
    featured: [
      {
        quote:
          "I recently underwent buccal fat removal surgery with Dr. Nikhil Angre, and I'm very satisfied with my overall experience. The entire team was professional, caring, and made me feel at ease throughout the process.",
        rating: 5,
        author: "Neha Dhadve",
        treatment: "Buccal Fat Removal",
        timeline: "Google Review",
      },
      {
        quote:
          "I am extremely happy with my ear repair surgery. From consultation to the final result, the entire experience was smooth, professional, and reassuring. Dr. Nikhil and the team truly exceeded my expectations.",
        rating: 5,
        author: "Bhavana Dhamane",
        treatment: "Ear Repair Surgery",
        timeline: "Google Review",
      },
      {
        quote:
          "Very nice consultation, service, genuine advice for any procedure. Thanks Dr Nikhil for your valuable time. Highly recommended.",
        rating: 5,
        author: "Archana Dhamane",
        treatment: "Consultation",
        timeline: "Google Review",
      },
    ],
    statsStrip: [
      { icon: "star", label: "5.0 ★ Google Rating" },
      { icon: "heart", label: "100% Would Recommend" },
      { icon: "verified", label: "Verified Google Reviews" },
    ],
    filters: [
      "All Reviews",
      "Facial Surgery",
      "Dental",
      "Dermatology",
      "5 Star Only",
    ],
    reviews: [
      {
        rating: 5,
        text: "I'm genuinely impressed with the overall experience and care I received. Dr. Nikhil has completely earned my trust and I would highly recommend NFSC to anyone looking for quality aesthetic care.",
        author: "Rohan Gore",
        initials: "RG",
        category: "Facial Surgery",
        treatment: "Aesthetic Consultation",
      },
      {
        rating: 5,
        text: "We had a great experience at the clinic. My mom underwent an ear lobe surgery here, and the entire procedure went very smoothly. The team was attentive and made her feel comfortable throughout.",
        author: "Pari Kini",
        initials: "PK",
        category: "Facial Surgery",
        treatment: "Ear Lobe Surgery",
      },
      {
        rating: 5,
        text: "I had a great and non-painful experience with my tooth extraction — completely smooth. Everything was handled with great care and professionalism from start to finish.",
        author: "Priti Karelia",
        initials: "PK",
        category: "Dental",
        treatment: "Tooth Extraction",
      },
      {
        rating: 5,
        text: "I recently visited Dr. Nikhil Face Surgical and Aesthetic Centre in Kandivali and had an amazing experience. I got laser treatment done and the results have been wonderful.",
        author: "Aishwarya Angre",
        initials: "AA",
        category: "Dermatology",
        treatment: "Laser Treatment",
      },
      {
        rating: 5,
        text: "The doctor was very professional, patient, and took time to understand my concerns. The procedure was clearly explained at every step. Truly a comforting experience.",
        author: "Abhidnya Kadam",
        initials: "AK",
        category: "Facial Surgery",
        treatment: "Aesthetic Procedure",
      },
      {
        rating: 5,
        text: "Some people choose a profession. Some people truly live it. Dr. Nikhil is one of those rare doctors who genuinely cares about his patients.",
        author: "Vrushti Lopen",
        initials: "VL",
        category: "Facial Surgery",
        treatment: "General",
      },
      {
        rating: 5,
        text: "Dr. Nikhil is a very good person. The clinic is well-maintained and the staff is warm and welcoming. Highly satisfied with my visit.",
        author: "Sanket Warlikar",
        initials: "SW",
        category: "Facial Surgery",
        treatment: "General",
      },
    ],
    googleCta: {
      title: "See all our reviews on Google",
      subtitle: "We value every patient's feedback",
      // Reuses site.contact.mapDirectionsUrl — the Google Maps place page
      // shows the clinic's reviews tab. Single source of truth.
      reviewUrl: "https://g.page/r/CcQbxPTHKRwxEBM/review",
      reviewCta: "Leave a Review",
      reviewSubtitle: "Takes less than a minute",
    },
  },

  contact: {
    address:
      "1st floor, Avenue Building, Hemukalani Cross Rd 4, near by KES International School, Sambhav Darshan, Hemu Colony, Irani Wadi, Kandivali West, Mumbai, Maharashtra 400067, India",
    postalCode: "400067",
    phone: "+91 9372933315",
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
      { name: "Instagram", href: "https://www.instagram.com/dr.nikhil_nfsc/", icon: "instagram" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/nfscdrnikhil", icon: "linkedin" },
      { name: "YouTube", href: "https://youtube.com/@nfsc_dr.nikhilangre?si=aSPxW08BDjC8kwlS", icon: "youtube" },
    ],
    copyright:
      "© 2026 NFSC — Dr. Nikhil Face Surgical & Aesthetic Centre. All rights reserved.",
    quickLinks: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    treatments: [
      { label: "Facial plastic Surgery", href: "/treatments/facial-plastic-surgery" },
      { label: "Non-Surgical Facial Aesthetics", href: "/treatments/non-surgical-facial-aesthetics" },
      { label: "Cosmetic Treatments", href: "/treatments/cosmetic-treatments" },
      { label: "Maxillofacial & Oral Surgery", href: "/treatments/maxillofacial-and-oral-surgery" },
      { label: "Dental", href: "/treatments/dental" },
      { label: "Dermatology", href: "/treatments/dermatology" },
      { label: "Hair Treatment", href: "/treatments/hair-treatments" },
    ],
  },
};
