/**
 * Per-category detail content for /treatments/[slug] pages.
 * Each entry: hero copy, long-form description, procedure list, and FAQs.
 *
 * Add a new category by adding another keyed entry + an entry to
 * `generateStaticParams` in app/treatments/[slug]/page.jsx.
 */
export const treatmentsDetail = {
  "facial-surgery": {
    slug: "facial-surgery",
    title: "Facial Surgery",
    breadcrumbLabel: "Facial Surgery",
    intro:
      "Specialized surgical procedures designed to enhance your natural facial features with precision and artistry.",
    description:
      "Facial surgery at NFSC blends aesthetic vision with surgical precision. Every procedure is shaped around the patient — their bone structure, their goals, and the subtleties that make their face uniquely theirs. The intent is never to standardize beauty, but to refine what is already there with careful, evidence-based technique. Recovery, scarring, and long-term outcomes are planned with the same care as the operation itself.",
    procedures: [
      {
        title: "Rhinoplasty",
        description:
          "Reshaping the nose for both aesthetic refinement and functional improvement, with techniques tailored to skin type and underlying anatomy.",
      },
      {
        title: "Facelift",
        description:
          "Comprehensive rejuvenation that restores youthful contours through natural-looking refinement of the lower face and neck.",
      },
      {
        title: "Blepharoplasty",
        description:
          "Eyelid surgery that refreshes the upper face by removing excess skin and restoring contour around the eyes.",
      },
      {
        title: "Jaw Contouring",
        description:
          "Reshaping the jawline through surgical or non-surgical methods to achieve facial harmony and a refined profile.",
      },
      {
        title: "Otoplasty",
        description:
          "Ear-shaping surgery that addresses prominence or asymmetry for a balanced profile and renewed self-confidence.",
      },
    ],
    faqs: [
      {
        question: "What is the typical recovery period?",
        answer:
          "Recovery varies by procedure. Most patients return to non-strenuous activities within 1–2 weeks; full healing typically takes 4–6 weeks. Detailed aftercare is provided per procedure.",
      },
      {
        question: "Are the results permanent?",
        answer:
          "Most facial surgeries deliver long-lasting structural results. Natural aging continues, but the foundational changes from surgery do not reverse. Periodic non-surgical maintenance can extend the youthful effect.",
      },
      {
        question: "Will the procedures leave visible scars?",
        answer:
          "Incisions are placed in inconspicuous areas — within hairlines, natural folds, or behind the ear. With careful technique and post-operative care, scars are typically faint within 6 months and continue to refine over the following year.",
      },
      {
        question: "How do I prepare for surgery?",
        answer:
          "After your consultation, you'll receive personalized pre-operative instructions covering medication adjustments, fasting timelines, lifestyle preparation, and recovery logistics. We coordinate every step.",
      },
      {
        question: "Is general anesthesia required?",
        answer:
          "It depends on the procedure. Smaller refinements can be performed under local anesthesia with sedation; larger reconstructive procedures require general anesthesia administered by a board-certified anesthesiologist.",
      },
    ],
  },

  "hair-treatments": {
    slug: "hair-treatments",
    title: "Hair Treatments",
    breadcrumbLabel: "Hair Treatments",
    intro:
      "Advanced hair restoration and scalp treatments utilizing the latest technology to regain your confidence.",
    description:
      "Hair restoration at NFSC pairs surgical expertise with regenerative medicine. Each plan begins with a careful diagnosis — pattern, scalp condition, density, and lifestyle factors all shape the protocol. Whether the path is a single FUE transplant or a series of regenerative therapies, the goal is the same: restore hair density that looks and feels naturally yours, without overpromising or rushing biology.",
    procedures: [
      {
        title: "Hair Transplant",
        description:
          "Follicular Unit Extraction (FUE) for natural-looking restoration with minimal downtime and no linear scar.",
      },
      {
        title: "PRP Therapy",
        description:
          "Platelet-Rich Plasma injections that stimulate dormant hair follicles and accelerate regrowth using your body's own growth factors.",
      },
      {
        title: "Mesotherapy",
        description:
          "Targeted micro-injections delivering vitamins, minerals, and amino acids directly to the scalp to nourish follicles.",
      },
      {
        title: "GFC Treatment",
        description:
          "Growth Factor Concentrate therapy — a refined evolution of PRP — for enhanced follicle activation and density.",
      },
    ],
    faqs: [
      {
        question: "How many sessions are required?",
        answer:
          "Most non-surgical treatments (PRP, mesotherapy, GFC) require 4–6 sessions spaced 3–4 weeks apart. Hair transplant is typically a single session, with optional touch-ups at the one-year mark.",
      },
      {
        question: "When will I see results?",
        answer:
          "Initial improvements appear at around 3 months. Optimal results are visible at 6–12 months, with continued refinement up to 18 months for transplants.",
      },
      {
        question: "Are these treatments painful?",
        answer:
          "Discomfort is minimal. Local anesthesia or topical numbing solutions are used during procedures, ensuring comfort throughout. Most patients describe the experience as more relaxing than expected.",
      },
      {
        question: "Are the results permanent?",
        answer:
          "Hair transplant results are permanent — the relocated follicles retain their original growth pattern. Non-surgical treatments may need maintenance every 6–12 months for sustained results.",
      },
      {
        question: "Will my hair look natural?",
        answer:
          "Naturalness is the foundation. Hairline design, follicle direction, and density distribution are planned to match your facial framing — never one-size-fits-all.",
      },
    ],
  },
};

/** Helper for `generateStaticParams` and validation. */
export const treatmentSlugs = Object.keys(treatmentsDetail);
