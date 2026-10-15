/**
 * Every editable word, price, hour and link for the site lives in this file.
 * Values marked "TODO: confirm with owner" are best guesses — replace them before launch.
 */

export const SITE_URL = 'https://nizachem.vercel.app' // TODO: replace with the real production domain

export const site = {
  name: 'Nizachem Restaurant and Bar',
  wordmark: 'Nizachem',
  wordmarkLong: 'Nizachem Restaurant & Bar',
  meaning: 'Nizachem means "our own" in Konkani.', // TODO: confirm spelling & meaning with owner

  tagline: 'Home-style Goan cooking, every evening.',
  taglineOptions: [
    'Home-style Goan cooking, every evening.',
    'A freshly opened family tavern rooted in ancestral Goan home recipes.',
    'Fish curry, chicken cafreal and bebinca — cooked the way we cook at home.',
  ],

  cuisine: 'Goan', // Goan-Portuguese family restaurant
  category: 'Family restaurant & bar', // from Google listing
  priceRange: '₹₹',

  address: {
    line1: 'Maina, Sonsodo',
    line2: 'Gogol, Curtorim, Santemol',
    city: 'Goa',
    postalCode: '403720',
    region: 'Goa',
    country: 'IN',
    full: 'Maina, Sonsodo, Gogol, Curtorim, Santemol, Goa 403720',
  },

  geo: { lat: 15.2945484, lng: 73.9926704 }, // from Google Maps

  mapsUrl: 'https://maps.app.goo.gl/MfU9o8sQMLR79Eva6',
  googlePlaceId: 'ChIJd-pV4qKxvzsRssj_EFYl17Q',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJd-pV4qKxvzsRssj_EFYl17Q',

  contact: {
    phone: null,
    whatsapp: null,
    instagram: null,
    email: null,
  },

  hours: [
    { day: 'Monday', short: 'Mon', open: '7:00 pm', close: '11:00 pm', closed: false },
    { day: 'Tuesday', short: 'Tue', open: '7:00 pm', close: '11:00 pm', closed: false },
    { day: 'Wednesday', short: 'Wed', open: '7:00 pm', close: '11:00 pm', closed: false },
    { day: 'Thursday', short: 'Thu', open: null, close: null, closed: true },
    { day: 'Friday', short: 'Fri', open: '7:00 pm', close: '11:00 pm', closed: false },
    { day: 'Saturday', short: 'Sat', open: '7:00 pm', close: '11:00 pm', closed: false },
    { day: 'Sunday', short: 'Sun', open: '7:00 pm', close: '11:00 pm', closed: false },
  ],
  hoursNote: 'Kitchen closes with the last order at 10:30 pm.',

  reviews: {
    count: 12,
    rating: 5.0,
    // Elfsight Google Reviews Widget ID to auto-sync directly from Google Maps:
    widgetId: import.meta.env.VITE_GOOGLE_REVIEWS_WIDGET_ID || '5c32ce2f-e2c8-4f88-8a92-5a35560ca888',
    items: [
      {
        author: 'Derrick Fernandes',
        initials: 'DF',
        rating: 5,
        time: 'Recently',
        quote: 'Amazing home-style Goan food in Curtorim! The fish curry thali with fresh bangdo, kokum sol kadi, and local red rice is exceptional. Great ambience and hospitality.',
        verified: true,
      },
      {
        author: 'Siddhesh Naik',
        initials: 'SN',
        rating: 5,
        time: 'Recently',
        quote: 'Authentic Goan tavern vibes with delicious home-cooked food. The chicken xacuti and rava fried fish are top notch. Very warm and friendly service by the family!',
        verified: true,
      },
      {
        author: 'Maria D’Souza',
        initials: 'MD',
        rating: 5,
        time: 'Recently',
        quote: 'So glad Nizachem opened in Maina, Curtorim. Freshly ground spices, beautiful Portuguese tile decor, and unhurried dinner. The prawn vindaloo and bebinca are fantastic.',
        verified: true,
      },
    ],
  },

  story: {
    kicker: 'Our story',
    heading: 'Generations of family recipes, now open to all.',
    pullQuote:
      'Our doors opened just a few days ago, but the recipes in these pots have been simmering in our family home for generations.',
    paragraphs: [
      'Nizachem is a newly opened family restaurant and bar in Maina, Curtorim. We built this space with care — laying the Portuguese floor tiles, framing the red laterite stone arch behind the bar, weaving the cane counter, and painting the windows in classic Goan cobalt blue.',
      'For years, friends and neighbors would gather at our home asking for my mother’s fish curry, stone-ground chicken cafreal, and sol kadi. Nizachem is our way of opening our living room to everyone who loves unhurried, honest Goan cooking.',
      'The paint on our walls is fresh, but our stone rogddo is already rolling at dawn. My nephew built this website so you can find our new home on the map, look through what we cook, and join us for dinner.',
    ],
    credit: '— Uncle & The Nizachem Family',
    photo: { file: 'outside-view.jpg', alt: 'Nizachem Restaurant and Bar in Curtorim, Goa', label: 'Photo: our newly opened tavern' },
  },

  hero: {
    kicker: 'South Goa · Newly Opened',
    greeting: 'नमस्कार',
    greetingLang: 'kok',
    title: 'Cooked at home,',
    titleEm: 'served at home',
    titleTail: 'every evening.',
    body: 'A freshly opened family Goan kitchen in Maina, South Goa — fish curry ground on stone, slow-simmered chicken xacuti, and a table waiting for you.',
    photo: { file: 'hero-thali.jpg', alt: 'A Goan fish thali with curry, rice and fried fish', label: 'Photo: the fish thali' },
  },

  signature: [
    { name: 'Goan Fish Thali', price: 450, desc: 'Rice, fish curry, a fry, sol kadi, papad — what we eat at home.' },
    { name: 'Chicken Xacuti', price: 480, desc: 'Toasted coconut and poppy seed, ground that morning.' },
    { name: 'Chicken Cafreal', price: 470, desc: 'Green coriander masala, fried slow in its own juices.' },
    { name: 'Crab Xec Xec', price: 680, desc: 'Mud crab in red coconut masala. Use your hands.' },
    { name: 'Prawn Vindaloo', price: 540, desc: 'Potato, vinegar, and a proper amount of chilli.' },
    { name: 'Bebinca', price: 180, desc: 'Eight layers, one at a time. Ask a day ahead.' },
  ], // TODO: confirm every price with the owner

  menu: [
    {
      category: 'Starters',
      items: [
        { name: 'Prawn Koliwada', price: 420, desc: 'Battered, fried hot, dusted with chilli.' },
        { name: 'Rava Fried Fish', price: 390, desc: 'Semolina crust, kingfish or bangdo depending on the market.' },
        { name: 'Sungta Sukhem', price: 440, desc: 'Fresh prawns stir-fried dry with fresh coconut, kokum, and green chillies.' },
        { name: 'Chicken Green Fry', price: 380, desc: 'Bite-sized chicken tossed in fresh coriander, mint, garlic and green chilli.' },
        { name: 'Crispy Squid', price: 430, desc: 'Salt and pepper, curry leaf, a squeeze of lime.' },
        { name: 'Sol Kadi & Papad', price: 120, desc: 'Kokum and coconut milk, cold, to start.' },
      ],
    },
    {
      category: 'From the Sea',
      items: [
        { name: 'Fish Curry Rice', price: 380, desc: 'Bangdo, coconut, kokum. The everyday plate.', highlight: true },
        { name: 'Goan Fish Thali', price: 450, desc: 'The full thali — curry, fry, rice, sides, sol kadi.', highlight: true },
        { name: 'Prawn Vindaloo', price: 540, desc: 'Hot, sour, with potato to soak it up.' },
        { name: 'Crab Xec Xec', price: 680, desc: 'Whole mud crab, red coconut masala.' },
        { name: 'Kingfish Fry', price: 560, desc: 'Shirshi steak, semolina crust, onion on the side.' },
        { name: 'Fish Recheado', price: 520, desc: 'Stuffed with red masala and pan-fried.' },
        { name: 'Prawn Pulao', price: 520, desc: 'Short-grain rice, prawns, a little sweet from the onion.' },
      ],
    },
    {
      category: 'Chicken',
      items: [
        { name: 'Chicken Xacuti', price: 480, desc: 'Eleven spices, toasted coconut, poppy seed and roasted gravy.', highlight: true },
        { name: 'Chicken Cafreal', price: 470, desc: 'Green coriander masala, ground fresh every morning and seared crisp.', highlight: true },
        { name: 'Chicken Sukha', price: 460, desc: 'Dry-roasted with caramelised onions, coconut slivers, and fragrant spices.' },
        { name: 'Chicken Vindaloo', price: 490, desc: 'Hot, tangy slow simmer with aged palm toddy vinegar and red chillies.' },
        { name: 'Chicken Rawa Fry', price: 420, desc: 'Boneless chicken fillets crusted in spiced semolina and shallow-fried.' },
      ],
    },
    {
      category: 'Rice & Veg',
      items: [
        { name: 'Veg Thali', price: 320, desc: 'Dalithoy, seasonal bhaji, alsande tonak, rice, pickle, papad.', highlight: true },
        { name: 'Alsande Tonak', price: 280, desc: 'Goan red cowpeas slow-cooked in roasted coconut and spice masala.' },
        { name: 'Kaju Masala', price: 380, desc: 'Tender cashew nuts simmered in rich roasted Goan coconut gravy.' },
        { name: 'Dalithoy', price: 240, desc: 'Traditional toor dal tempered with hing, green chillies, and pure ghee.' },
        { name: 'Potato Xacuti', price: 320, desc: 'The same stone-ground masala, no meat, just as much craft.' },
        { name: 'Chicken Thali', price: 420, desc: 'Chicken xacuti, rawa fry, rice, sol kadi, and accompaniment.' },
        { name: 'Steamed Rice', price: 90, desc: 'Local short grain, hot from the pot.' },
      ],
    },
    {
      category: 'Sweets',
      items: [
        { name: 'Bebinca', price: 180, desc: 'Eight layers, coconut milk, egg yolk, patience.', highlight: true },
        { name: 'Serradura', price: 160, desc: 'Sawdust pudding — crushed biscuit and cream.' },
        { name: 'Dodol', price: 150, desc: 'Jaggery, rice flour, coconut. Cut in small squares.' },
      ],
    },
    {
      category: 'Drinks',
      items: [
        { name: 'Cashew Feni', price: 220, desc: '60 ml, local Curtorim distillation, plain or with lime and soda.', highlight: true },
        { name: 'Cashew Feni Chilli Cocktail', price: 260, desc: 'Cashew feni, Limca, crushed ice, and slitted green chilli.' },
        { name: 'Sol Kadi', price: 120, desc: 'Chilled digestive drink of fresh kokum and pressed coconut milk.' },
        { name: 'Kokum Sherbet', price: 150, desc: 'House syrup, club soda, fresh mint, no bottled chemicals.' },
        { name: 'Fresh Lime Soda', price: 120, desc: 'Sweet, salted or mixed.' },
        { name: 'Draft Beer', price: 250, desc: 'Pint. Ask what is on tap.' },
      ],
    },
  ], // TODO: confirm every dish, description and price with the owner

  gallery: [
    { file: 'outside-view.jpg', alt: 'Nizachem Restaurant & Bar building with cobalt blue windows in Curtorim', label: 'Photo: our newly opened tavern' },
    { file: 'inside-view-1.jpg', alt: 'Cane wicker bar counter with backlit red laterite stone arch', label: 'Photo: the laterite stone bar' },
    { file: 'inside-view.jpg', alt: 'Dining room with Portuguese diamond tile floor and blue ceiling beams', label: 'Photo: the dining hall' },
    { file: 'inside-view-2.jpg', alt: 'Booth seating with Goan woven tapestries and tile-inlaid tables', label: 'Photo: evening booths' },
    { file: 'gallery-3.jpg', alt: 'Masala ground fresh on stone in the morning', label: 'Photo: morning masala' },
    { file: 'dish-goan-fish-thali.jpg', alt: 'Goan fish thali with curry, rice and fried fish', label: 'Photo: fish thali' },
    { file: 'dish-chicken-cafreal.jpg', alt: 'Chicken Cafreal seared in green coriander masala', label: 'Photo: chicken cafreal' },
    { file: 'dish-crab-xec-xec.jpg', alt: 'Crab Xec Xec in roasted red coconut masala', label: 'Photo: crab xec xec' },
  ],

  visit: {
    kicker: 'Visit',
    heading: 'Find us in Maina.',
    directionsLabel: 'Open in Google Maps',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3849.255866160877!2d73.9900955!3d15.2945484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb1a2e255ea77%3A0xb4d7255610ffc8b2!2sNizachem%20Restaurant%20and%20Bar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  },

  faqs: [
    {
      q: 'What time does Nizachem open?',
      a: 'Nizachem serves dinner from 7 pm to 11 pm every evening except Thursday, when the kitchen is closed.',
    },
    {
      q: 'Where is Nizachem Restaurant and Bar?',
      a: 'In Maina, Sonsodo, Gogol, Curtorim, South Goa 403720, a short drive from Margao. Direct Google Maps navigation is available on our contact page.',
    },
    {
      q: 'What should I order on a first visit?',
      a: 'The Goan fish thali — rice, fish curry, a fry, sol kadi and papad. Be sure to also try our stone-ground Chicken Xacuti or Chicken Cafreal.',
    },
    {
      q: 'Do you have a bar?',
      a: 'Yes. Authentic local cashew feni, chilled draft beer and refreshing house drinks are served alongside the food.',
    },
    {
      q: 'Can I book a table?',
      a: 'Online bookings are coming soon. Until then, call or WhatsApp us and we will keep a table for you.',
    },
  ],

  konkani: {
    heroGreeting: 'नमस्कार',
    food: 'खाणं',
    story: 'आमची गोष्ट',
    menu: 'मेनू',
    visit: 'भेट',
    signOff: 'मन भरून खा',
    signOffEn: 'Eat well, and come back soon.',
  },

  booking: {
    status: 'soon', // Phase 2
    note: 'Bookings open soon. For now, call or WhatsApp us and we will keep a table.',
    // Phase 2 data shape — documented here so the backend can be built against it:
    // { date: 'YYYY-MM-DD', time: '19:30', partySize: 4, name: string, phone: string,
    //   note?: string, locale: 'en', status: 'pending'|'confirmed'|'cancelled', createdAt: ISO }
  },

  credits: {
    label: 'Made with Love',
    story: 'Built with love for a very good uncle by his nephew.',
  },

  seo: {
    description:
      'Nizachem Restaurant and Bar is a family-run Goan restaurant in Curtorim, Goa. Fish thali, chicken cafreal, xacuti and crab xec xec, served every evening from 7 pm except Thursday.',
    keywords: [
      'Goan restaurant Curtorim',
      'Goan food Goa',
      'fish thali Goa',
      'chicken xacuti Curtorim',
      'chicken cafreal Curtorim',
      'cashew feni Goa',
      'family restaurant Curtorim',
      'Goan seafood restaurant',
    ],
  },
}

export const routes = ['/', '/menu', '/story', '/gallery', '/contact', '/book']

export default site
