import { Emojies } from "../types/app.types";

export const symbolEmoticonArray: Emojies[] = [
  //    currency
  {
    label: "USD",
    type: "Currency",
    emoji: "$",
    keywords: ["dollar", "usd", "money", "cash", "finance"],
  },
  {
    label: "Euro",
    type: "Currency",
    emoji: "€",
    keywords: ["euro", "eur", "europe", "money", "cash"],
  },
  {
    label: "British Pound",
    type: "Currency",
    emoji: "£",
    keywords: ["pound", "gbp", "sterling", "money", "uk"],
  },
  {
    label: "Yen / Yuan",
    type: "Currency",
    emoji: "¥",
    keywords: ["yen", "yuan", "jpy", "cny", "japan", "china"],
  },
  {
    label: "INR",
    type: "Currency",
    emoji: "₹",
    keywords: ["rupee", "inr", "india", "money"],
  },
  {
    label: "Russian Ruble",
    type: "Currency",
    emoji: "₽",
    keywords: ["ruble", "rub", "russia", "money"],
  },
  {
    label: "South Korean Won",
    type: "Currency",
    emoji: "₩",
    keywords: ["won", "krw", "korea", "money"],
  },
  {
    label: "Thai Baht",
    type: "Currency",
    emoji: "฿",
    keywords: ["baht", "thb", "thailand", "money"],
  },
  {
    label: "Turkish Lira",
    type: "Currency",
    emoji: "₺",
    keywords: ["lira", "try", "turkey", "money"],
  },
  {
    label: "Swiss Franc",
    type: "Currency",
    emoji: "₣",
    keywords: ["franc", "chf", "switzerland", "money", "cash"],
  },
  {
    label: "Israeli Shekel",
    type: "Currency",
    emoji: "₪",
    keywords: ["shekel", "ils", "israel", "money"],
  },
  {
    label: "VN Dong",
    type: "Currency",
    emoji: "₫",
    keywords: ["dong", "vnd", "vietnam", "money"],
  },
  {
    label: "Hryvnia",
    type: "Currency",
    emoji: "₴",
    keywords: ["hryvnia", "uah", "ukraine", "money"],
  },
  {
    label: "Peso",
    type: "Currency",
    emoji: "₱",
    keywords: ["peso", "php", "philippines", "money"],
  },
  {
    label: "Cedi",
    type: "Currency",
    emoji: "₵",
    keywords: ["cedi", "ghs", "ghana", "money"],
  },
  {
    label: "Tugrik",
    type: "Currency",
    emoji: "₮",
    keywords: ["tugrik", "mnt", "mongolia", "money"],
  },
  {
    label: "Lao Kip",
    type: "Currency",
    emoji: "₭",
    keywords: ["kip", "lak", "laos", "money"],
  },
  {
    label: "Sucre",
    type: "Currency",
    emoji: "₳",
    keywords: ["sucre", "ecuador", "historic", "money"],
  },

  // symbols
  // --- Arithmetic / Math ---
  {
    label: "Plus",
    type: "Arithmetic & Symbols",
    emoji: "+",
    keywords: ["add", "plus", "sum", "increase", "positive"],
  },
  {
    label: "Minus",
    type: "Arithmetic & Symbols",
    emoji: "-",
    keywords: ["subtract", "minus", "difference", "decrease", "negative"],
  },
  {
    label: "Times",
    type: "Arithmetic & Symbols",
    emoji: "×", // Unicode 'Multiplication Sign'
    keywords: ["multiply", "times", "product", "cross"],
  },
  {
    label: "Divide",
    type: "Arithmetic & Symbols",
    emoji: "÷", // Unicode 'Division Sign'
    keywords: ["divide", "quotient", "ratio"],
  },
  {
    label: "Equals",
    type: "Arithmetic & Symbols",
    emoji: "=",
    keywords: ["equal", "result", "is", "equality"],
  },
  {
    label: "Not Equal",
    type: "Arithmetic & Symbols",
    emoji: "≠",
    keywords: ["not equal", "unequal", "difference"],
  },
  {
    label: "Approx",
    type: "Arithmetic & Symbols",
    emoji: "≈",
    keywords: ["approximate", "almost equal", "estimate"],
  },
  {
    label: "Less Than",
    type: "Arithmetic & Symbols",
    emoji: "<",
    keywords: ["smaller", "less", "lower"],
  },
  {
    label: "Greater Than",
    type: "Arithmetic & Symbols",
    emoji: ">",
    keywords: ["bigger", "greater", "higher"],
  },
  {
    label: "Equal To",
    type: "Arithmetic & Symbols",
    emoji: "≤",
    keywords: ["less equal", "at most"],
  },
  {
    label: "Greater Equal",
    type: "Arithmetic & Symbols",
    emoji: "≥",
    keywords: ["greater equal", "at least"],
  },
  {
    label: "Percent",
    type: "Arithmetic & Symbols",
    emoji: "%",
    keywords: ["percentage", "rate", "ratio", "out of 100"],
  },
  {
    label: "Permille",
    type: "Arithmetic & Symbols",
    emoji: "‰",
    keywords: ["per thousand", "basis points", "rate"],
  },
  {
    label: "Infinity",
    type: "Arithmetic & Symbols",
    emoji: "∞",
    keywords: ["endless", "limitless", "math", "forever"],
  },
  {
    label: "Square Root",
    type: "Arithmetic & Symbols",
    emoji: "√",
    keywords: ["root", "radical", "math"],
  },
  {
    label: "Power",
    type: "Arithmetic & Symbols",
    emoji: "^",
    keywords: ["caret", "power", "exponent", "to the power of"],
  },
  {
    label: "Pi",
    type: "Arithmetic & Symbols",
    emoji: "π",
    keywords: ["pi", "constant", "geometry", "circle", "3.14"],
  },
  {
    label: "Sigma",
    type: "Arithmetic & Symbols",
    emoji: "Σ",
    keywords: ["sigma", "sum", "total", "series", "math"],
  },
  {
    label: "Integral",
    type: "Arithmetic & Symbols",
    emoji: "∫",
    keywords: ["calculus", "integration", "area", "math"],
  },
  {
    label: "Partial",
    type: "Arithmetic & Symbols",
    emoji: "∂",
    keywords: ["derivative", "calculus", "partial"],
  },
  {
    label: "Delta",
    type: "Arithmetic & Symbols",
    emoji: "Δ",
    keywords: ["delta", "change", "difference", "triangle"],
  },
  {
    label: "varies as",
    type: "Arithmetic & Symbols",
    emoji: "∝",
    keywords: ["proportional", "varies as", "relation"],
  },
  {
    label: "proof",
    type: "Arithmetic & Symbols",
    emoji: "∴",
    keywords: ["therefore", "conclusion", "logic", "proof"],
  },
  {
    label: "Since",
    type: "Arithmetic & Symbols",
    emoji: "∵",
    keywords: ["because", "since", "reason", "logic"],
  },
  {
    label: "Diameter",
    type: "Arithmetic & Symbols",
    emoji: "∅",
    keywords: ["empty set", "null", "diameter", "math"],
  },
  {
    label: "element of",
    type: "Arithmetic & Symbols",
    emoji: "∈",
    keywords: ["element of", "belongs to", "set theory"],
  },
  {
    label: "Angle",
    type: "Arithmetic & Symbols",
    emoji: "∠",
    keywords: ["angle", "geometry", "corner"],
  },
  {
    label: "right angle",
    type: "Arithmetic & Symbols",
    emoji: "⊥",
    keywords: ["perpendicular", "orthogonal", "right angle"],
  },
  {
    label: "Fn",
    type: "Arithmetic & Symbols",
    emoji: "ƒ",
    keywords: ["function", "math", "mapping"],
  },

  {
    label: "copyright",
    type: "Arithmetic & Symbols",
    emoji: "©",
    keywords: ["copyright", "legal", "owner", "license", "©"],
  },
  {
    label: "registered",
    type: "Arithmetic & Symbols",
    emoji: "®",
    keywords: ["registered", "trademark", "brand", "legal", "®"],
  },
  {
    label: "trademark",
    type: "Arithmetic & Symbols",
    emoji: "™",
    keywords: ["trademark", "tm", "brand", "legal", "™"],
  },
  {
    label: "check mark",
    type: "Arithmetic & Symbols",
    emoji: "✓",
    keywords: ["check", "done", "yes", "correct", "verify", "✓"],
  },
  {
    label: "bullet point",
    type: "Arithmetic & Symbols",
    emoji: "•",
    keywords: ["bullet", "point", "dot", "list", "•"],
  },
  {
    label: "degree",
    type: "Arithmetic & Symbols",
    emoji: "°",
    keywords: ["degree", "temperature", "weather", "angle", "°"],
  },
  {
    label: "infinity",
    type: "Arithmetic & Symbols",
    emoji: "∞",
    keywords: ["infinity", "forever", "loop", "math", "∞"],
  },
  {
    label: "section",
    type: "Arithmetic & Symbols",
    emoji: "§",
    keywords: ["section", "paragraph", "legal", "law", "§"],
  },
  {
    label: "currency generic",
    type: "Arithmetic & Symbols",
    emoji: "¤",
    keywords: ["currency", "money", "symbol", "price", "¤"],
  },

  // quaso
  {
      "label": "Basic Smile",
      "type": "ASCII Smol",
      "emoji": ":)",
      "keywords": [":-)", "happy", "smile", "joy"]
    },
    {
      "label": "Big Grin",
      "type": "ASCII Smol",
      "emoji": ":D",
      "keywords": [":-D", "=D", "laugh", "big smile"]
    },
    {
      "label": "Wink",
      "type": "ASCII Smol",
      "emoji": ";)",
      "keywords": [";-)", "wink", "flirt", "sarcasm"]
    },
    {
      "label": "Tongue",
      "type": "ASCII Smol",
      "emoji": ":P",
      "keywords": [":-P", ":p", ":-p", "tongue", "silly", "playful"]
    },
    {
      "label": "Kiss",
      "type": "ASCII Smol",
      "emoji": ":*",
      "keywords": [":-*", ":x", "kiss", "smooch", "love"]
    },
    {
      "label": "Heart",
      "type": "ASCII Smol",
      "emoji": "<3",
      "keywords": ["heart", "love", "less than three"]
    },
    {
      "label": "unsure",
      "type": "ASCII Smol",
      "emoji": ":/",
      "keywords": [":-/", ":\\", ":-\\", "skeptical", "unsure", "annoyed", "uneasy"]
    },
    {
      "label": "Neutral",
      "type": "ASCII Smol",
      "emoji": ":|",
      "keywords": [":-|", "straight face", "indifferent", "no expression"]
    },
    {
      "label": "Shock",
      "type": "ASCII Smol",
      "emoji": ":O",
      "keywords": [":-O", ":o", "shock", "surprise", "yell"]
    },
    {
      "label": "Frown",
      "type": "ASCII Smol",
      "emoji": ":(",
      "keywords": [":-(", "=(", "sad", "frown", "unhappy"]
    },
    {
      "label": "Crying",
      "type": "ASCII Smol",
      "emoji": ":'(",
      "keywords": [":'-(", "cry", "tear", "sobbing"]
    },
    {
      "label": "Angry",
      "type": "ASCII Smol",
      "emoji": ">:(",
      "keywords": [">:-(", "mad", "angry", "furious"]
  },
  // Big
  {
      "label": "happy",
      "type": "ASCII Big",
      "emoji": "(＾▽＾)",
      "keywords": ["happy", "smile", "joy"]
    },
    {
      "label": "joy and playful",
      "type": "ASCII Big",
      "emoji": "(≧◡≦)",
      "keywords": ["joy", "playful", "cute"]
    },
    {
      "label": "love",
      "type": "ASCII Big",
      "emoji": "(♡˙︶˙♡)",
      "keywords": ["love", "heart", "cute"]
    },
    {
      "label": "kiss",
      "type": "ASCII Big",
      "emoji": "( ˘ ³˘)♥",
      "keywords": ["kiss", "love", "affection"]
    },
    {
      "label": "sad",
      "type": "ASCII Big",
      "emoji": "(；︵；)",
      "keywords": ["sad", "cry", "upset"]
    },
    {
      "label": "crying",
      "type": "ASCII Big",
      "emoji": "(T_T)",
      "keywords": ["crying", "tears", "sad"]
    },
    {
      "label": "depressed",
      "type": "ASCII Big",
      "emoji": "(︶︹︶)",
      "keywords": ["depressed", "down", "sad"]
    },
    {
      "label": "angry",
      "type": "ASCII Big",
      "emoji": "(╬ಠ益ಠ)",
      "keywords": ["angry", "mad", "rage"]
    },
    {
      "label": "annoyed",
      "type": "ASCII Big",
      "emoji": "(¬_¬)",
      "keywords": ["annoyed", "unimpressed", "meh"]
    },
    {
      "label": "confused",
      "type": "ASCII Big",
      "emoji": "(・_・ヾ",
      "keywords": ["confused", "thinking", "unsure"]
    },
    {
      "label": "thinking",
      "type": "ASCII Big",
      "emoji": "(￢_￢)",
      "keywords": ["thinking", "suspicious", "hmm"]
    },
    {
      "label": "surprised",
      "type": "ASCII Big",
      "emoji": "(⊙_⊙)",
      "keywords": ["surprised", "shocked", "wow"]
    },
    {
      "label": "shrug",
      "type": "ASCII Big",
      "emoji": "¯\\_(ツ)_/¯",
      "keywords": ["shrug", "idk", "whatever"]
    },
    {
      "label": "Table Flip",
      "type": "ASCII Big",
      "emoji": "(╯°□°）╯︵ ┻━┻",
      "keywords": ["table flip", "rage", "frustration", "anger"]
    },
    {
      "label": "dead",
      "type": "ASCII Big",
      "emoji": "(x_x)",
      "keywords": ["dead", "knocked out", "fail"]
    },
    {
      "label": "cute bear",
      "type": "ASCII Big",
      "emoji": "ʕ•ᴥ•ʔ",
      "keywords": ["bear", "cute", "animal"]
    },
    {
      "label": "cute cat",
      "type": "ASCII Big",
      "emoji": "(=^･ω･^=)",
      "keywords": ["cat", "cute", "animal"]
    },
    {
      "label": "victory",
      "type": "ASCII Big",
      "emoji": "(ง •̀_•́)ง",
      "keywords": ["fight", "victory", "determined"]
    },
    {
      "label": "strong",
      "type": "ASCII Big",
      "emoji": "ᕙ(⇀‸↼‶)ᕗ",
      "keywords": ["strong", "muscle", "power"]
    },
    {
      "label": "blushing",
      "type": "ASCII Big",
      "emoji": "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
      "keywords": ["blush", "shy", "embarrassed"]
    },
    {
      "label": "winking",
      "type": "ASCII Big",
      "emoji": "(^.~)",
      "keywords": ["wink", "flirt", "playful"]
    },
    {
      "label": "sleeping",
      "type": "ASCII Big",
      "emoji": "(－_－) zzZ",
      "keywords": ["sleep", "tired", "rest"]
    },
    {
      "label": "dance",
      "type": "ASCII Big",
      "emoji": "└(＾＾)┐",
      "keywords": ["dance", "music", "happy"]
    },
    {
      "label": "excited",
      "type": "ASCII Big",
      "emoji": "o(>ω<)o",
      "keywords": ["excited", "happy", "yay"]
    },
    {
      "label": "scared",
      "type": "ASCII Big",
      "emoji": "(ノдヽ)",
      "keywords": ["scared", "hide", "fear"]
    },
    {
      "label": "pouting",
      "type": "ASCII Big",
      "emoji": " ( ￣＾￣)",
      "keywords": ["pout", "grumpy", "mad"]
    },
    {
      "label": "star eyes",
      "type": "ASCII Big",
      "emoji": "(☆▽☆)",
      "keywords": ["stars", "amazing", "impressed"]
    },
    {
      "label": "hug",
      "type": "ASCII Big",
      "emoji": "(づ◡﹏◡)づ",
      "keywords": ["hug", "cuddle", "comfort"]
    },
    {
      "label": "lenny face",
      "type": "ASCII Big",
      "emoji": "( ͡° ͜ʖ ͡°)",
      "keywords": ["lenny", "smirk", "suspicious"]
    },
    {
      "label": "dog",
      "type": "ASCII Big",
      "emoji": "V●ᴥ●V",
      "keywords": ["dog", "puppy", "animal"]
    },
    {
      "label": "sparkle happy",
      "type": "ASCII Big",
      "emoji": " (✧∀✧)/",
      "keywords": ["sparkle", "happy", "fabulous"]
    },
    {
      "label": "worried",
      "type": "ASCII Big",
      "emoji": "(ーー;)",
      "keywords": ["worried", "nervous", "sweat"]
    },
    {
      "label": "no thanks",
      "type": "ASCII Big",
      "emoji": "(￣ω￣)ゞ",
      "keywords": ["salute", "ok", "bye"]
    },
    {
      "label": "cool",
      "type": "ASCII Big",
      "emoji": "(⌐■_■)",
      "keywords": ["cool", "sunglasses", "deal with it"]
    },
    {
      "label": "money eyes",
      "type": "ASCII Big",
      "emoji": " [̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
      "keywords": ["money", "rich", "cash"]
    },
    {
      "label": "speechless",
      "type": "ASCII Big",
      "emoji": "(O_O;)",
      "keywords": ["speechless", "wow", "awkward"]
    },
    {
      "label": "flexing",
      "type": "ASCII Big",
      "emoji": "ᕦ(ò_ó)ᕤ",
      "keywords": ["strong", "flex", "tough"]
    },
    {
      "label": "magical",
      "type": "ASCII Big",
      "emoji": "╰( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ",
      "keywords": ["magic", "wizard", "sparkle"]
    },
    {
      "label": "running",
      "type": "ASCII Big",
      "emoji": "ε=ε=┌(;￣▽￣)┘",
      "keywords": ["run", "fast", "hurry"]
    },
    {
      "label": "WinkUp",
      "type": "ASCII Big",
      "emoji": "ദ്ദി( • ᴗ - ) ✧",
      "keywords": ["Wink", "Up", "Thumbs Up"]
    },
    {
      "label": "WinkUpBlush",
      "type": "ASCII Big",
      "emoji": "ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧",
      "keywords": ["Wink", "Up", "Thumbs Up", "WinkUpBlush"]
    },
    {
      "label": "ExcitedHi",
      "type": "ASCII Big",
      "emoji": "(˶˃ ᵕ ˂˶) .ᐟ.ᐟ",
      "keywords": ["Excited", "Hi", "Greate", "Blush"]
    },
    {
      "label": "ExcitedFly",
      "type": "ASCII Big",
      "emoji": "₍₍⚞(˶˃ ꒳ ˂˶)⚟⁾⁾",
      "keywords": ["Excited", "Fly", "UwU", "Blush"]
    },
    {
      "label": "Cry",
      "type": "ASCII Big",
      "emoji": "(っ╥﹏╥ς)",
      "keywords": ["Cry", "Sad", "skeptical", "unsure", "uneasy"]
    },
    {
      "label": "Cry2",
      "type": "ASCII Big",
      "emoji": "(╥﹏╥)",
      "keywords": ["Cry", "Sad", "skeptical", "unsure", "uneasy"]
    },
    {
      "label": "Sad",
      "type": "ASCII Big",
      "emoji": "ִֶָ( • ᴖ • ｡)",
      "keywords": ["Sad", "Heart", "Wether", "bad"]
    },

  //Patterns
  {
    label: "Floral Sparkles",
    type: "Patterns",
    emoji: "₊˚✧𑁍.ೃ࿔*:･",
    keywords: ["flower", "sparkle", "aesthetic", "nature"],
  },
  {
    label: "Sparkle Divider",
    type: "Patterns",
    emoji: "✦•┈๑⋅⋯ ⋯⋅๑┈•✦",
    keywords: ["divider", "line", "sparkle", "border"],
  },
  {
    label: "Flower Dust",
    type: "Patterns",
    emoji: "°❀⋆.ೃ࿔*:･",
    keywords: ["flower", "dust", "magic", "floral"],
  },
  {
    label: "Gothic Pentagram",
    type: "Patterns",
    emoji: "⛧°. ⋆༺♱༻⋆. °⛧",
    keywords: ["gothic", "pentagram", "cross", "dark", "alt"],
  },
  {
    label: "Starry Wings",
    type: "Patterns",
    emoji: "*ੈ✩‧₊˚༺☆༻*ੈ✩‧₊˚",
    keywords: ["star", "wings", "magic", "sparkles"],
  },
  {
    label: "Heart Bow",
    type: "Patterns",
    emoji: "⋆ ˚｡⋆୨♡୧⋆ ˚｡⋆",
    keywords: ["heart", "bow", "coquette", "cute"],
  },
  {
    label: "Minimalist Sparkles",
    type: "Patterns",
    emoji: ". ݁₊ ⊹ . ݁˖ . ݁",
    keywords: ["minimal", "sparkle", "clean", "aesthetic"],
  },
  {
    label: "Space Swirl",
    type: "Patterns",
    emoji: "☆⋆｡𖦹°‧★",
    keywords: ["space", "stars", "galaxy", "swirl"],
  },
  {
    label: "Shooting Star Dust",
    type: "Patterns",
    emoji: "*ੈ✩‧₊˚",
    keywords: ["star", "dust", "magic", "sparkle"],
  },
  {
    label: "Star Line",
    type: "Patterns",
    emoji: "─── ⋆⋅☆⋅⋆ ──",
    keywords: ["line", "divider", "star", "minimalist"],
  },
  {
    label: "Ethereal Glow",
    type: "Patterns",
    emoji: "‎₊˚⊹  𐦍༘⋆₊ ⊹",
    keywords: ["ethereal", "glow", "sparkle", "magic"],
  },
  {
    label: "Windy Stars",
    type: "Patterns",
    emoji: "⋆·˚ ༘ *",
    keywords: ["wind", "stars", "breeze", "cute"],
  },
  {
    label: "Stitches Drip",
    type: "Patterns",
    emoji: "꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
    keywords: ["drip", "stitches", "emo", "border"],
  },

  {
    label: "Heartbroken",
    type: "Patterns",
    emoji: "💕⃝💔ـﮩ٨ـﮩ٨ــﮩ٨ـ💔",
    keywords: ["Cry", "Sad", "Heart", "broken", "uneasy"],
  },
  {
    label: "Wether",
    type: "Patterns",
    emoji: "ִֶָ𓂃 ࣪˖ ִִֶֶָ🥀་༘࿐",
    keywords: ["Cry", "Sad", "Heart", "Wether", "bad"],
  },
  {
    label: "Night Sky",
    type: "Patterns",
    emoji: "⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆",
    keywords: ["night", "sky", "moon", "clouds", "stars"],
  },
  {
    label: "Checkerboard",
    type: "Patterns",
    emoji: "▀▄▀▄▀▄",
    keywords: ["checkerboard", "blocks", "scene", "pixels"],
  },
  {
    label: "Galaxy Swirl",
    type: "Patterns",
    emoji: "✮ ⋆ ˚｡𖦹 ⋆｡°✩",
    keywords: ["galaxy", "stars", "swirl", "space"],
  },
  {
    label: "Ocean Sailboat",
    type: "Patterns",
    emoji: "⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹ ࣪ ˖",
    keywords: ["ocean", "boat", "waves", "sea"],
  },
  {
    label: "Music Stars",
    type: "Patterns",
    emoji: "⋆.˚✮🎧✮˚.⋆",
    keywords: ["music", "headphones", "stars", "aesthetic"],
  },
  {
    label: "Swimming Fishes",
    type: "Patterns",
    emoji: "𓆝 𓆟 𓆞 𓆝 𓆟",
    keywords: ["fish", "ocean", "swimming", "sea"],
  },
  {
    label: "Ribbon Face",
    type: "Patterns",
    emoji: "⏔⏔⏔ ꒰ ᧔ෆ᧓ ꒱ ⏔⏔⏔",
    keywords: ["ribbon", "face", "cute", "coquette"],
  },
  {
    label: "Cursed Glitch",
    type: "Patterns",
    emoji: "𒅒𒈔𒅒𒇫𒄆",
    keywords: ["glitch", "cursed", "abstract", "weird"],
  },
  {
    label: "Zipper Teeth",
    type: "Patterns",
    emoji: "⫘⫘⫘⫘⫘⫘",
    keywords: ["zipper", "teeth", "border", "sharp"],
  },
  {
    label: "Double Floral Dust",
    type: "Patterns",
    emoji: "°❀⋆.ೃ࿔*:･°❀⋆.ೃ࿔*:･",
    keywords: ["flower", "dust", "magic", "double"],
  },
  {
    label: "Ornate Angel",
    type: "Patterns",
    emoji: "꧁⎝ 𓆩༺✧༻𓆪 ⎠꧂",
    keywords: ["ornate", "angel", "wings", "epic"],
  },
  {
    label: "Star Sequence",
    type: "Patterns",
    emoji: "☆ ★ ✮ ★ ☆",
    keywords: ["stars", "sequence", "pattern", "rating"],
  },
  {
    label: "Ocean Life",
    type: "Patterns",
    emoji: "𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚ 𓇼",
    keywords: ["ocean", "turtle", "fish", "starfish", "sea"],
  },
  {
    label: "Barcode Lines",
    type: "Patterns",
    emoji: "𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃",
    keywords: ["barcode", "lines", "scanner", "music"],
  },
];
