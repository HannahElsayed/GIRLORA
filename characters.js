/* GIRLORA — characters data + quiz questions + scoring.
   Classic script (works from file://). Exposes window.GIRLORA. */
(function () {
  var characters = [
    {
      slug: "soft-power", num: "I", emoji: "🌸",
      name: "The Soft Power Girl",
      tagline: "Gentle on the outside. Unshakeable on the inside.",
      image: "images/girl.jpg",
      about: "You lead with warmth and your boundaries are made of silk, not walls. People relax around you, and somehow still do what you ask. Your power is calm, not loud.",
      palette: ["#a0174f", "#f48fb1", "#ec4899", "#fde4ee", "#fff0f6"],
      scent: "Rose Petals & Tonka", ritual: "15m Solitude & Matcha",
      traits: ["Warm", "Intuitive", "Graceful", "Grounded"],
      wardrobe: "Blush knits, satin ribbons, soft tailoring, pearl studs.",
      beauty: "Dewy skin, rose-tinted cheeks, glossy lips, a barely-there lash curl.",
      mindset: "Softness is a strategy. You do not have to be hard to be taken seriously.",
      rhythm: [
        ["Morning", "Slow start: warm water, stretch, open the curtains."],
        ["Afternoon", "One important thing done gently, with a matcha break."],
        ["Evening", "Candle, playlist, and a voice note to a friend."]
      ],
      mantra: "I can be soft and still be the one in charge."
    },
    {
      slug: "clean-minimalist", num: "II", emoji: "🤍",
      name: "The Clean Minimalist",
      tagline: "Less noise. More you.",
      image: "images/girl2.jpg",
      about: "You edit your life the way others edit photos: remove, simplify, breathe. Your space, your closet and your calendar all have room in them, and that room is the luxury.",
      palette: ["#3d3a38", "#bfb8b0", "#e8e2da", "#f7f4ef", "#ffffff"],
      scent: "White Tea & Cedar", ritual: "10m Stretch & Lemon Water",
      traits: ["Calm", "Organised", "Intentional", "Fresh"],
      wardrobe: "White tees, straight denim, neutral layers, one great pair of flats.",
      beauty: "Skin first: SPF, a good moisturiser, a slicked-back bun, clear gloss.",
      mindset: "If it does not add peace or joy, it does not stay.",
      rhythm: [
        ["Morning", "Make the bed, lemon water, 10 minutes of stretching."],
        ["Afternoon", "Single-task. One tab, one cup, one thing."],
        ["Evening", "Reset the room, lay out tomorrow, lights low."]
      ],
      mantra: "Space is the softest kind of luxury."
    },
    {
      slug: "literary-muse", num: "III", emoji: "📖",
      name: "The Literary Muse",
      tagline: "Main character, with a bookmark.",
      image: "images/girl3.jpg",
      about: "You live half in the world and half in the margins. Rainy windows, dog-eared pages and long thoughts are your love language. You notice what everyone else walks past.",
      palette: ["#5a1d39", "#a8577e", "#c9a27e", "#f1e3d3", "#fff7ee"],
      scent: "Old Paper & Amber", ritual: "20m Reading & Chai",
      traits: ["Reflective", "Romantic", "Curious", "Poetic"],
      wardrobe: "Cardigans, pleated skirts, burgundy, vintage brooches, a tote full of books.",
      beauty: "Berry lip stain, soft waves, minimal base, ink-smudged fingers.",
      mindset: "Your inner world is not a hiding place. It is a library.",
      rhythm: [
        ["Morning", "Chai, a journal page, and three lines of someone else's poem."],
        ["Afternoon", "Walk somewhere with a bench and a view."],
        ["Evening", "20 minutes of reading before anything with a screen."]
      ],
      mantra: "Every ordinary day is a chapter if I write it down."
    },
    {
      slug: "quiet-luxury", num: "IV", emoji: "🕊️",
      name: "The Quiet Luxury Girl",
      tagline: "She never needs to announce it.",
      image: "images/girl4.jpg",
      about: "You choose quality over volume, always. Your taste is obvious only to those who know. You invest in fewer things, better made, and you wear them for years.",
      palette: ["#2b2523", "#7a6a5f", "#b9a999", "#e9e1d8", "#faf7f2"],
      scent: "Sandalwood & Fig", ritual: "Evening Journaling & Jasmine Tea",
      traits: ["Refined", "Patient", "Discerning", "Poised"],
      wardrobe: "Cashmere, camel coats, tailored trousers, no logos, a good watch.",
      beauty: "Polished skin, neat brows, a signature perfume, immaculate hands.",
      mindset: "Buy once, wear forever. The same goes for your energy.",
      rhythm: [
        ["Morning", "Press the shirt, brew the tea, plan with a fountain pen."],
        ["Afternoon", "Lunch away from the desk, always sitting down."],
        ["Evening", "Journal, jasmine tea, early night."]
      ],
      mantra: "Elegance is restraint."
    },
    {
      slug: "coquette-romantic", num: "V", emoji: "🎀",
      name: "The Coquette Romantic",
      tagline: "Bows, butterflies and a very full heart.",
      image: "images/girl5.jpg",
      about: "You treat life like a love letter. Ribbons, lace, rose-tinted everything: you believe in sweetness as a form of style, and you are brave enough to show your heart.",
      palette: ["#be185d", "#f9a8d4", "#fbcfe8", "#fff1f2", "#fffafb"],
      scent: "Peony & Vanilla Cream", ritual: "Bubble Bath & Love Letters",
      traits: ["Playful", "Dreamy", "Affectionate", "Whimsical"],
      wardrobe: "Satin bows, lace trim, baby pink, ballet flats, pearl everything.",
      beauty: "Rosy blush, glitter in the inner eye, glossy pout, hair ribbons.",
      mindset: "Sweetness is not weakness. It is taste with a heartbeat.",
      rhythm: [
        ["Morning", "Tie a ribbon, put on a song, text someone something kind."],
        ["Afternoon", "Treat yourself: pastry, flowers, a small pretty thing."],
        ["Evening", "Bubble bath and a handwritten note to future you."]
      ],
      mantra: "Soft heart, sharp taste."
    },
    {
      slug: "street-sophisticate", num: "VI", emoji: "🖤",
      name: "The Street Sophisticate",
      tagline: "City energy. Tailored attitude.",
      image: "images/girl1.jpg",
      about: "You walk fast, think faster and always look put together. You mix high and low without trying, and you own every room by simply arriving with a good bag and a plan.",
      palette: ["#111111", "#4a4a4a", "#c8b6a6", "#f2ece4", "#ff2e93"],
      scent: "Black Tea & Smoked Vanilla", ritual: "Espresso, Playlist & a Long Walk",
      traits: ["Bold", "Social", "Sharp", "Independent"],
      wardrobe: "Oversized blazers, leather, white sneakers, statement bag, sunglasses.",
      beauty: "Defined brow, a bold lip or clean eyeliner, sleek hair, gold hoops.",
      mindset: "Be the standard. Do not wait for the invitation.",
      rhythm: [
        ["Morning", "Espresso, playlist, outfit decided in 5 minutes flat."],
        ["Afternoon", "Back-to-back meetings, but lunch with a friend."],
        ["Evening", "Walk home the long way. Dinner somewhere new."]
      ],
      mantra: "I do not follow the trend. I walk past it."
    }
  ];

  /* Each option gives points to one or more characters. */
  var questions = [
    { q: "Pick your perfect Saturday morning.", options: [
      { t: "Slow tea in bed, curtains open", w: { "soft-power": 2, "literary-muse": 1 } },
      { t: "Make the bed, stretch, tidy the desk", w: { "clean-minimalist": 2, "quiet-luxury": 1 } },
      { t: "Bubble bath and a pink playlist", w: { "coquette-romantic": 2, "soft-power": 1 } },
      { t: "Out the door with an espresso", w: { "street-sophisticate": 2, "quiet-luxury": 1 } }
    ]},
    { q: "Your dream coat is…", options: [
      { t: "A camel wool coat, no logos", w: { "quiet-luxury": 2, "clean-minimalist": 1 } },
      { t: "A vintage tweed with brass buttons", w: { "literary-muse": 2, "quiet-luxury": 1 } },
      { t: "A leather jacket with big shoulders", w: { "street-sophisticate": 2 } },
      { t: "A baby-pink coat with a satin bow", w: { "coquette-romantic": 2, "soft-power": 1 } }
    ]},
    { q: "Which place feels most like you?", options: [
      { t: "A sunny, empty white apartment", w: { "clean-minimalist": 2 } },
      { t: "A cosy bookshop on a rainy day", w: { "literary-muse": 2, "soft-power": 1 } },
      { t: "A rooftop in the city at golden hour", w: { "street-sophisticate": 2, "quiet-luxury": 1 } },
      { t: "A rose garden with a picnic blanket", w: { "coquette-romantic": 2, "soft-power": 1 } }
    ]},
    { q: "A friend is upset. You…", options: [
      { t: "Listen and hold space with a warm hug", w: { "soft-power": 2, "coquette-romantic": 1 } },
      { t: "Write them a long, thoughtful message", w: { "literary-muse": 2, "coquette-romantic": 1 } },
      { t: "Make a plan: dinner, then fix the problem", w: { "street-sophisticate": 2, "clean-minimalist": 1 } },
      { t: "Stay calm, quietly show up with what they need", w: { "quiet-luxury": 2, "clean-minimalist": 1 } }
    ]},
    { q: "Choose a signature accessory.", options: [
      { t: "Pearl studs", w: { "soft-power": 2, "quiet-luxury": 1 } },
      { t: "A hair ribbon", w: { "coquette-romantic": 2 } },
      { t: "Gold hoops and sunglasses", w: { "street-sophisticate": 2 } },
      { t: "A simple watch", w: { "clean-minimalist": 1, "quiet-luxury": 2 } },
      { t: "A brooch from a thrift shop", w: { "literary-muse": 2 } }
    ]},
    { q: "How do you like your space?", options: [
      { t: "Clear surfaces, calm and bright", w: { "clean-minimalist": 2, "quiet-luxury": 1 } },
      { t: "Stacks of books and warm lamps", w: { "literary-muse": 2 } },
      { t: "Flowers, candles and a bit of pink", w: { "soft-power": 2, "coquette-romantic": 1 } },
      { t: "Sleek, bold and always guest-ready", w: { "street-sophisticate": 2, "quiet-luxury": 1 } }
    ]},
    { q: "Your beauty routine is…", options: [
      { t: "SPF, moisturiser, done", w: { "clean-minimalist": 2 } },
      { t: "A dewy glow with a rosy cheek", w: { "soft-power": 2, "coquette-romantic": 1 } },
      { t: "A bold lip or sharp liner", w: { "street-sophisticate": 2, "literary-muse": 1 } },
      { t: "A polished, perfectly kept finish", w: { "quiet-luxury": 2, "street-sophisticate": 1 } }
    ]},
    { q: "Pick a mantra.", options: [
      { t: "Softness is strength.", w: { "soft-power": 2 } },
      { t: "Less, but better.", w: { "clean-minimalist": 1, "quiet-luxury": 2 } },
      { t: "Make life feel like a story.", w: { "literary-muse": 2, "coquette-romantic": 1 } },
      { t: "Love is the best accessory.", w: { "coquette-romantic": 2, "soft-power": 1 } },
      { t: "Lead, do not follow.", w: { "street-sophisticate": 2 } }
    ]}
  ];

  function score(answers) {
    var totals = {};
    characters.forEach(function (c) { totals[c.slug] = 0; });
    answers.forEach(function (optIndex, qi) {
      var opt = questions[qi] && questions[qi].options[optIndex];
      if (!opt) return;
      Object.keys(opt.w).forEach(function (s) { totals[s] += opt.w[s]; });
    });
    var best = characters[0].slug;
    characters.forEach(function (c) { if (totals[c.slug] > totals[best]) best = c.slug; });
    return { slug: best, totals: totals };
  }

  function find(slug) {
    for (var i = 0; i < characters.length; i++) if (characters[i].slug === slug) return characters[i];
    return null;
  }

  var KEY = "girlora_result";
  function save(slug) { try { localStorage.setItem(KEY, slug); } catch (e) {} }
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  window.GIRLORA = { characters: characters, questions: questions, score: score, find: find, save: save, load: load };
})();
