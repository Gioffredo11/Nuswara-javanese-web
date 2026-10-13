export interface GenZCharacterProfile {
  characterSlug: string;
  characterName: string;
  auraTitle: string;
  punchline: string;
  compatibilityAdvice: string;
  tagline: string;
}

export const GENZ_WAYANG_PROFILES: Record<string, GenZCharacterProfile> = {
  gatotkaca: {
    characterSlug: 'gatotkaca',
    characterName: 'Gatotkaca',
    auraTitle: 'The Unshakeable Carry',
    tagline: 'Otot Kawat Balung Wesi, Mental Anti-Ghosting',
    punchline:
      'Aura lu tuh magnetis banget kayak Gatotkaca. Karismatik, tangguh, selalu bisa diandelin temen pas kerja kelompok, tapi kalau udah mager, susah banget dibangunin. Lu tipe orang yang siap pasang badan buat circle lu tanpa mikir dua kali!',
    compatibilityAdvice:
      'Saran Oracle: Boleh loyal dan pasang badan buat bestie, tapi jangan lupa me-time biar "urat kawat"-mu gak ikutan encok karena nanggung beban orang lain.',
  },
  arjuna: {
    characterSlug: 'arjuna',
    characterName: 'Arjuna',
    auraTitle: 'Main Character Vibes',
    tagline: 'Fokus Tajam, Pesona Karismatik Tanpa Usaha',
    punchline:
      'Visual dan aura lu tuh Arjuna-coded abis! Elegan, kalem, multitalenta, tapi gampang overthinking pas larut malam. Sekali lu udah ngejar passion atau goals, pesona dan fokus lu gak ada tandingannya.',
    compatibilityAdvice:
      'Saran Oracle: Kurangin overthinking jam 2 pagi. Lu tuh udah punya modal skill dan kharisma tinggi, tinggal percaya penuh sama insting sendiri.',
  },
  srikandi: {
    characterSlug: 'srikandi',
    characterName: 'Srikandi',
    auraTitle: 'Fearless & Sat-Set Leader',
    tagline: 'Anti-Basa-Basi, Berani Ambil Kendali',
    punchline:
      'Aura fearless Srikandi kental banget di diri lu! Mandiri parah, serba sat-set, anti-basa-basi, dan berani speak up pas yang lain cuma diem. Definisi alpha yang punya standar hidup tinggi dan gak gampang kemakan validasi murahan.',
    compatibilityAdvice:
      'Saran Oracle: Ketegasan lu adalah superpower. Cuma sesekali santai dikit ya, jangan sampai energi kompetitif lu bikin lu lupa nikmatin momen.',
  },
  semar: {
    characterSlug: 'semar',
    characterName: 'Semar',
    auraTitle: 'The Wise Tongkrongan Elder',
    tagline: 'Tempat Curhat Sejuta Umat, Humor Berbobot',
    punchline:
      'Vibes lu tuh "wise elder" alias tempat curhat sejuta umat kayak Eyang Semar. Santai, humble, humornya berbobot, tapi kalau lu udah mode serius, kata-kata lu langsung bikin satu tongkrongan terdiam dan dapet pencerahan.',
    compatibilityAdvice:
      'Saran Oracle: Jangan serap semua emosi curhatan circle lu ke hati sendiri. Lu juga butuh recharge energi biar gak burnout emosional.',
  },
  petruk: {
    characterSlug: 'petruk',
    characterName: 'Petruk',
    auraTitle: 'Si Paling Ice Breaker',
    tagline: 'Humor Cerdas, Penyelamat Suasana Garing',
    punchline:
      'Si paling pencair suasana tongkrongan ala Petruk! Humornya savage tapi asik, cerdas membaca situasi, dan anti kaku pas lagi krisis. Temen-temen lu bakal ngerasa sepi banget kalau sehari aja lu absen dari obrolan.',
    compatibilityAdvice:
      'Saran Oracle: Tetep jadi pemantik tawa yang ceria, tapi jangan ragu buat nunjukin sisi ambisius lu pas lagi ngerancang masa depan.',
  },
  bima: {
    characterSlug: 'bima',
    characterName: 'Bima Werkudara',
    auraTitle: 'Loyalitas 100% Tanpa Tapi',
    tagline: 'Prinsip Sekeras Karang, Anti-Bermuka Dua',
    punchline:
      'Tenang di luar, tapi prinsip lu sekeras karang kayak Raden Werkudara. Anti-drama, to-the-point, dan loyalitasnya 100%. Sekali bestie atau circle lu disenggol, lu yang paling pertama maju pasang badan!',
    compatibilityAdvice:
      'Saran Oracle: Asah kemampuan diplomasi dikit. Gak semua masalah harus disikat frontal, kadang taktik tenang justru lebih cepet beres.',
  },
  yudhistira: {
    characterSlug: 'yudhistira',
    characterName: 'Yudhistira',
    auraTitle: 'Definisi Green Flag Berjalan',
    tagline: 'Sabar Kebangetan, Hati Sejernih Mata Air',
    punchline:
      'Aura lu tuh sejujur dan sebersih Prabu Puntadewa. Sabar luar biasa, anti-toxic, dan selalu mikirin perasaan orang lain sebelum bertindak. Definisi temen idaman yang gak bakal pernah nusuk dari belakang.',
    compatibilityAdvice:
      'Saran Oracle: Kurang-kurangin rasa "gak enakan" sama orang lain. Kebaikan tulus lu jangan sampai dimanfaatin sama toxic people.',
  },
  nakula: {
    characterSlug: 'nakula',
    characterName: 'Nakula',
    auraTitle: 'The Silent Mastermind',
    tagline: 'Jarang Koar-Koar, Tapi Solusi Luar Biasa',
    punchline:
      'Jarang banyak bacot di medsos, tapi lu pengamat paling jeli kayak Nakula. Peka sama kode-kodean orang, punya intuisi super tajam, dan tau solusi praktis sebelum orang lain kepikiran.',
    compatibilityAdvice:
      'Saran Oracle: Jangan ragu buat lebih vokal. Opini dan sudut pandang lu terlalu brilian buat cuma disimpan di draft.',
  },
  sadewa: {
    characterSlug: 'sadewa',
    characterName: 'Sadewa',
    auraTitle: 'Visioner Berintuisi Tajam',
    tagline: 'Intuisi Akurat, Pemikir Langkah Jauh ke Depan',
    punchline:
      'Vibes lu tuh pemikir strategis kayak Sadewa. Selalu selangkah lebih maju, tahu mana yang red flag dan green flag dari jauh. Temen lu yang bijak pasti selalu minta second opinion ke lu sebelum ambil keputusan.',
    compatibilityAdvice:
      'Saran Oracle: Jangan terlalu lama terjebak di fase over-analyzing. Eksekusi ide lu secepatnya!',
  },
  karna: {
    characterSlug: 'karna',
    characterName: 'Adipati Karna',
    auraTitle: 'Pejuang Berhati Emas',
    tagline: 'Setia Janji, Totalitas Tanpa Batas',
    punchline:
      'Dedikasi lu ke janji atau passion tuh totalitas tanpa batas ala Adipati Karna! Rela berkorban demi kehormatan komitmen, pantang menyerah walau sering dihadapkan sama situasi serba dilematis.',
    compatibilityAdvice:
      'Saran Oracle: Self-worth lu gak ditentukan sama seberapa banyak lu berkorban buat orang lain. Lu pantes dicintai apa adanya.',
  },
};

export function getGenZProfile(slug: string, fallbackName = 'Ksatria Wayang'): GenZCharacterProfile {
  const normalized = (slug || '').toLowerCase().trim();
  if (GENZ_WAYANG_PROFILES[normalized]) {
    return GENZ_WAYANG_PROFILES[normalized];
  }

  // Fallback for any other character
  return {
    characterSlug: normalized || 'ksatria',
    characterName: fallbackName,
    auraTitle: 'The Legendary Pioneer',
    tagline: 'Pemberani & Punya Resonansi Karakter Kuat',
    punchline: `Aura lu tuh berkarakter banget kayak ${fallbackName}! Mandiri, berprinsip, dan punya keunikan tersendiri yang bikin orang lain langsung notice keberadaan lu di tongkrongan.`,
    compatibilityAdvice:
      'Saran Oracle: Tetap percaya diri sama keunikan karakter lu. Gaya otentik lu adalah kunci pembuka pintu rezeki dan relasi terbaik.',
  };
}
