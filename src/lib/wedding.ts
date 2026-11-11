export type NavItem = {
  id: string;
  label: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  time: string;
  endTime: string;
  startIso: string;
  endIso: string;
  venue: string;
  address: string;
  note: string;
  mapEmbed: string;
  mapLink: string;
  directionsLink: string;
};

export const couple = {
  bride: {
    fullName: "Marvie Dane Tupas",
    firstName: "Marvie Dane",
  },
  groom: {
    fullName: "Arnulfo Bernaje Jr",
    firstName: "Arnulfo Jr",
  },
  displayNames: "Arnulfo Jr & Marvie Dane",
  shortNames: "Arnulfo & Marvie",
  hashtag: "#ArnulfoAndMarvie2027",
};

export const weddingDate = {
  day: "Friday",
  dateLabel: "April 23, 2027",
  longLabel: "Friday, April 23, 2027",
  target: "2027-04-23T14:00:00+08:00",
  city: "Bacolod City, Negros Occidental",
  region: "Western Visayas, Philippines",
};

export const verse = {
  text: "The Lord has done great things for us, and we are filled with joy.",
  citation: "Psalm 126:3",
};

export const invitation = {
  kicker: "Our forever begins…",
  welcome:
    "Together with our families, we invite you to celebrate the beginning of our forever.",
  storyLead: "Two lives, one vow, and a joy we cannot keep to ourselves.",
  story:
    "What began as an ordinary meeting grew into a love we now commend to God. Through quiet faithfulness, shared laughter, and the grace that carried us here, we found a home in each other.",
  storyClose:
    "On this Friday in April, surrounded by the people who have shaped our lives, we will make our vows and begin the rest of our days as one. We are filled with joy — and we cannot wait to share it with you.",
};

export const rsvp = {
  deadlineLabel: "March 15, 2027",
  deadlineIso: "2027-03-15",
  contactName: "Marvie Dane Tupas",
  phoneDisplay: "0450 306 579",
  whatsapp: "https://wa.me/61450306579",
};

export const navItems: NavItem[] = [
  { id: "welcome", label: "Welcome" },
  { id: "story", label: "Our Story" },
  { id: "schedule", label: "Schedule & Venues" },
  { id: "attire", label: "Wedding Attire" },
  { id: "stay", label: "Where to Stay" },
  { id: "transport", label: "Transportation" },
  { id: "menu", label: "Menu" },
  { id: "gifts", label: "Tokens of Love" },
  { id: "entourage", label: "Entourage" },
  { id: "rsvp", label: "RSVP" },
  { id: "faq", label: "Q&A" },
];

const lourdesQuery = encodeURIComponent(
  "Our Lady of Lourdes Parish, Barangay Granada, Bacolod City, Negros Occidental",
);
const anyagQuery = encodeURIComponent(
  "Anyag Leisure Farm & Resort, HDA Sto. Domingo, Brgy. Granada, Bacolod City",
);

export const events: ScheduleEvent[] = [
  {
    id: "ceremony",
    title: "Wedding Ceremony",
    time: "2:00 PM",
    endTime: "4:00 PM",
    startIso: "2027-04-23T14:00:00+08:00",
    endIso: "2027-04-23T16:00:00+08:00",
    venue: "Our Lady of Lourdes Parish",
    address: "Barangay Granada, Bacolod City, Negros Occidental",
    note: "Join us as we exchange our vows and begin this beautiful new chapter together, surrounded by the family and friends who have shared in our journey.",
    mapEmbed: `https://maps.google.com/maps?q=${lourdesQuery}&z=16&output=embed`,
    mapLink: `https://www.google.com/maps/search/?api=1&query=${lourdesQuery}`,
    directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${lourdesQuery}`,
  },
  {
    id: "cocktail",
    title: "Cocktail Hour",
    time: "4:00 PM",
    endTime: "5:30 PM",
    startIso: "2027-04-23T16:00:00+08:00",
    endIso: "2027-04-23T17:30:00+08:00",
    venue: "Anyag Leisure Farm & Resort",
    address:
      "HDA Sto. Domingo, Brgy. Granada, Bacolod City, Negros Occidental, Philippines",
    note: "Following the ceremony, we invite you to join us for cocktails and canapés as we gather, raise a glass, and celebrate.",
    mapEmbed: `https://maps.google.com/maps?q=${anyagQuery}&z=16&output=embed`,
    mapLink: `https://www.google.com/maps/search/?api=1&query=${anyagQuery}`,
    directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${anyagQuery}`,
  },
  {
    id: "reception",
    title: "Dinner & Reception",
    time: "5:30 PM",
    endTime: "11:00 PM",
    startIso: "2027-04-23T17:30:00+08:00",
    endIso: "2027-04-23T23:00:00+08:00",
    venue: "Anyag Leisure Farm & Resort",
    address:
      "HDA Sto. Domingo, Brgy. Granada, Bacolod City, Negros Occidental, Philippines",
    note: "Join us for an elegant evening of dinner, music, heartfelt toasts, and dancing as we celebrate our marriage and the beginning of our life together.",
    mapEmbed: `https://maps.google.com/maps?q=${anyagQuery}&z=16&output=embed`,
    mapLink: `https://www.google.com/maps/search/?api=1&query=${anyagQuery}`,
    directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${anyagQuery}`,
  },
];

export const attire = {
  theme: "Vintage Elegance",
  intro:
    "We would love to see our family and friends dress up with us. Please come in formal attire that honors our Vintage Elegance theme.",
  ladies:
    "Formal attire in shades of Nude, Olive Green, or Moss Green.",
  gentlemen: "Black suit and bow tie.",
  palette: [
    { name: "Nude", hex: "#DCC3A8" },
    { name: "Olive Green", hex: "#5A6B3A" },
    { name: "Moss Green", hex: "#6E7F4A" },
  ],
  avoid: [
    { name: "White", hex: "#F7F4EF" },
    { name: "Ivory", hex: "#EDE4D4" },
    { name: "Burgundy", hex: "#6B2430" },
  ],
  shoes:
    "Anyag is a leisure farm with gardens and lawn. Ladies, please choose block heels, wedges, or elegant flats rather than stilettos.",
};

export const hotels = [
  {
    name: "Anyag Leisure Farm & Resort",
    distance: "Reception venue",
    note: "Stay where we celebrate. Anyag offers countryside rooms on the same grounds as cocktail hour and dinner — a restful choice if you would like to linger after the last dance.",
    address: "HDA Sto. Domingo, Brgy. Granada, Bacolod City",
    link: "https://www.google.com/maps/search/?api=1&query=Anyag+Leisure+Farm+Resort+Granada+Bacolod",
    image:
      "https://images.unsplash.com/photo-1600585154340-0ef53e42b35f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Eastview Hotel",
    distance: "About 20 minutes",
    note: "A comfortable city stay along Circumferential Road, with a straightforward drive toward Granada for both the ceremony and reception.",
    address: "Carlos Hilado Circumferential Road, Brgy. Villamonte, Bacolod City",
    link: "https://eastviewhotel.com",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Seda Capitol Central",
    distance: "About 25 minutes",
    note: "An elegant downtown hotel beside the Negros Occidental Provincial Capitol — polished rooms, reliable service, and an easy base for exploring Bacolod.",
    address: "Lacson St. cor. North Capitol Road, Bacolod City",
    link: "https://www.sedahotels.com/capitolcentral",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "L'Fisher Hotel",
    distance: "About 25 minutes",
    note: "A Bacolod classic on Lacson Street. Warm hospitality, a central location, and a familiar favorite for many visiting families.",
    address: "14th Lacson Street, Bacolod City",
    link: "https://www.lfisherhotelbacolod.com",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  },
];

export const transport = {
  intro:
    "The ceremony and reception are both in Barangay Granada, so the transfer between church and farm is short. We recommend arriving in Bacolod the night before if you are traveling from another city.",
  items: [
    {
      title: "By air",
      body: "Fly into Bacolod–Silay Airport (BCD). The airport is about 45 minutes from Granada by car, depending on traffic. Taxis and Grab are available at arrivals.",
    },
    {
      title: "Church to reception",
      body: "Our Lady of Lourdes Parish and Anyag Leisure Farm sit in the same barangay. Allow about 10–15 minutes between the ceremony and cocktail hour.",
    },
    {
      title: "Parking",
      body: "Parking is available at the parish grounds and at Anyag. If you prefer not to drive, Grab and private vans are easy to arrange in Bacolod.",
    },
    {
      title: "Getting around",
      body: "Grab operates in Bacolod City. For a seamless day, we suggest booking a car with a driver or traveling with family staying at the same hotel.",
    },
  ],
};

export const menuCourses = [
  { course: "Welcome", dish: "Garden canapés & chilled refreshments" },
  { course: "First", dish: "Seasonal soup, served warm" },
  { course: "Garden", dish: "Greens with olive oil & local greens" },
  { course: "Main", dish: "A plated choice of beef, chicken, or fish" },
  { course: "Sweet", dish: "Wedding cake and a light dessert" },
  { course: "Toast", dish: "Wine, juice, and coffee for the evening" },
];

export const gifts = {
  intro:
    "More than anything, we just want to celebrate, dance, and make unforgettable memories with you on our big day.",
  body: "Should you wish to bless our union with a gift, a monetary contribution toward our future together would mean the world to us. A wedding gift envelope will be available at the reception.",
};

export const entourage = {
  note: "We are gathering the beloved people who will stand with us at the altar. Names of our principal sponsors and wedding party will be shared here as they are confirmed.",
  groups: [
    { title: "Principal Sponsors", names: ["To be announced"] },
    { title: "Best Man & Maid of Honor", names: ["To be announced"] },
    { title: "Groomsmen & Bridesmaids", names: ["To be announced"] },
    { title: "Secondary Sponsors", names: ["To be announced"] },
  ],
};

export const faqs = [
  {
    question: "What is the RSVP deadline?",
    answer:
      "Please RSVP by March 15, 2027 so we can prepare an accurate headcount for church and dinner.",
  },
  {
    question: "Who should I contact if I have questions?",
    answer:
      "Reach Marvie Dane Tupas on WhatsApp at 0450 306 579. We are happy to help.",
  },
  {
    question: "What should I wear?",
    answer:
      "Vintage Elegance. Ladies: formal attire in nude, olive green, or moss green. Gentlemen: black suit and bow tie. Please avoid white, ivory, and burgundy.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "Please follow the names on your invitation. If you hope to bring someone who is not listed, message Marvie before the RSVP deadline.",
  },
  {
    question: "Are children welcome?",
    answer:
      "We adore your little ones. Seating is reserved for named guests, so please RSVP only for those listed on your invitation.",
  },
  {
    question: "Is the celebration indoors or outdoors?",
    answer:
      "The ceremony is in church. Cocktail hour and reception are at Anyag Leisure Farm, with garden grounds and indoor function spaces. April in Bacolod is warm — light, breathable formalwear is ideal.",
  },
  {
    question: "May we take photos?",
    answer:
      "Yes — we would love your photos after the ceremony. We kindly ask for an unplugged Mass: no phones or cameras while we exchange our vows.",
  },
  {
    question: "Do you have a wedding hashtag?",
    answer: `${couple.hashtag} — please tag us if you share photos after the day.`,
  },
];

export const gallery: Record<string, { src: string; alt: string }> = {
  welcome: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    alt: "Couple standing together on their wedding day",
  },
  story: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    alt: "Couple standing together in warm light",
  },
  schedule: {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80",
    alt: "Wedding table with ivory flowers and greenery",
  },
  attire: {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80",
    alt: "Wedding table with ivory flowers and greenery",
  },
  stay: {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80",
    alt: "Hotel pool and gardens at dusk",
  },
  transport: {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80",
    alt: "Resort grounds for guests traveling in",
  },
  menu: {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80",
    alt: "Plated dinner at an elegant reception",
  },
  gifts: {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80",
    alt: "Ivory floral bouquet with greenery",
  },
  entourage: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    alt: "The couple on their wedding day",
  },
  rsvp: {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80",
    alt: "Bouquet and invitation details",
  },
  faq: {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80",
    alt: "Candlelit reception tablescape",
  },
};
