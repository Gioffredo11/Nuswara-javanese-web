/**
 * Nuswara Javanese Transliteration Engine
 * Philological standard: Kongres Aksara Jawa (Yogyakarta & Surakarta) & Wewaton Sriwedari.
 * Supports:
 * - Deterministic Latin <-> Aksara Jawa conversion
 * - Two vowel modes: 'ketik' (e=taling, x=pepet) vs 'kopas' (e=pepet, é/è=taling)
 * - Scriptio Continua (Tanpa Spasi) with automatic Pasangan chaining
 * - Aksara Murda & Aksara Swara toggles
 * - Deep Syllable X-Ray decomposition & tokenization
 */

export type VowelMode = 'ketik' | 'kopas';

export interface TransliterationOptions {
  vowelMode: VowelMode;
  tanpaSpasi: boolean;
  useMurda: boolean;
  useSwara: boolean;
}

export interface SyllableComponent {
  glyph: string;
  name: string;
  description: string;
  type: 'base' | 'pasangan' | 'sandhangan' | 'anuswara' | 'pangkon' | 'pada';
}

export interface SyllableToken {
  id: string;
  latin: string;
  aksara: string;
  phonetic: string;
  base: SyllableComponent;
  pasangan?: SyllableComponent;
  sandhangan: SyllableComponent[];
  anuswara?: SyllableComponent;
  pangkon?: SyllableComponent;
}

export interface WordToken {
  id: string;
  latin: string;
  aksara: string;
  syllables: SyllableToken[];
}

export interface TransliterationResult {
  aksara: string;
  tokens: WordToken[];
}

// 20 Aksara Nglegena (mapped by bare consonant)
export const CONSONANT_MAP: Record<string, { glyph: string; name: string; pasangan: string }> = {
  h: { glyph: 'ꦲ', name: 'Ha', pasangan: '꧀ꦲ' },
  n: { glyph: 'ꦤ', name: 'Na', pasangan: '꧀ꦤ' },
  c: { glyph: 'ꦕ', name: 'Ca', pasangan: '꧀ꦕ' },
  r: { glyph: 'ꦫ', name: 'Ra', pasangan: '꧀ꦫ' },
  k: { glyph: 'ꦏ', name: 'Ka', pasangan: '꧀ꦏ' },
  d: { glyph: 'ꦢ', name: 'Da (Denta)', pasangan: '꧀ꦢ' },
  t: { glyph: 'ꦠ', name: 'Ta', pasangan: '꧀ꦠ' },
  s: { glyph: 'ꦱ', name: 'Sa', pasangan: '꧀ꦱ' },
  w: { glyph: 'ꦮ', name: 'Wa', pasangan: '꧀ꦮ' },
  l: { glyph: 'ꦭ', name: 'La', pasangan: '꧀ꦭ' },
  p: { glyph: 'ꦥ', name: 'Pa', pasangan: '꧀ꦥ' },
  dh: { glyph: 'ꦝ', name: 'Dha', pasangan: '꧀ꦝ' },
  j: { glyph: 'ꦗ', name: 'Ja', pasangan: '꧀ꦗ' },
  y: { glyph: 'ꦪ', name: 'Ya', pasangan: '꧀ꦪ' },
  ny: { glyph: 'ꦚ', name: 'Nya', pasangan: '꧀ꦚ' },
  m: { glyph: 'ꦩ', name: 'Ma', pasangan: '꧀ꦩ' },
  g: { glyph: 'ꦒ', name: 'Ga', pasangan: '꧀ꦒ' },
  b: { glyph: 'ꦧ', name: 'Ba', pasangan: '꧀ꦧ' },
  th: { glyph: 'ꦛ', name: 'Tha', pasangan: '꧀ꦛ' },
  ng: { glyph: 'ꦔ', name: 'Nga', pasangan: '꧀ꦔ' },
};

// Aksara Murda (Honorific/Capitals)
export const MURDA_MAP: Record<string, { glyph: string; name: string; pasangan: string }> = {
  n: { glyph: 'ꦟ', name: 'Murda Na', pasangan: '꧀ꦟ' },
  k: { glyph: 'ꦑ', name: 'Murda Ka', pasangan: '꧀ꦑ' },
  t: { glyph: 'ꦡ', name: 'Murda Ta', pasangan: '꧀ꦡ' },
  s: { glyph: 'ꦯ', name: 'Murda Sa', pasangan: '꧀ꦯ' },
  p: { glyph: 'ꦦ', name: 'Murda Pa', pasangan: '꧀ꦦ' },
  ny: { glyph: 'ꦘ', name: 'Murda Nya', pasangan: '꧀ꦘ' },
  g: { glyph: 'ꦓ', name: 'Murda Ga', pasangan: '꧀ꦓ' },
  b: { glyph: 'ꦨ', name: 'Murda Ba', pasangan: '꧀ꦨ' },
};

// Aksara Swara (Standalone vowels)
export const SWARA_MAP: Record<string, { glyph: string; name: string }> = {
  a: { glyph: 'ꦄ', name: 'Swara A' },
  i: { glyph: 'ꦆ', name: 'Swara I' },
  u: { glyph: 'ꦈ', name: 'Swara U' },
  e: { glyph: 'ꦌ', name: 'Swara E' },
  o: { glyph: 'ꦎ', name: 'Swara O' },
};

// Sandhangan Vowels & Consonant Modifiers
export const SANDHANGAN_MAP = {
  wulu: { glyph: 'ꦶ', name: 'Wulu (-i)', description: 'Vokal i atas' },
  suku: { glyph: 'ꦸ', name: 'Suku (-u)', description: 'Vokal u bawah' },
  taling: { glyph: 'ꦺ', name: 'Taling (é / è)', description: 'Vokal é depan' },
  pepet: { glyph: 'ꦼ', name: 'Pepet (ě)', description: 'Vokal ě tengah atas' },
  talingTarung: { glyph: 'ꦺꦴ', name: 'Taling Tarung (-o)', description: 'Vokal o kepit' },
  cecak: { glyph: 'ꦁ', name: 'Cecak (-ng)', description: 'Anuswara hidung akhir' },
  layar: { glyph: 'ꦂ', name: 'Layar (-r)', description: 'Konsonan r akhir atas' },
  wignyan: { glyph: 'ꦃ', name: 'Wignyan (-h)', description: 'Konsonan h aspirasi akhir' },
  pangkon: { glyph: '꧀', name: 'Pangkon (Virama)', description: 'Pemati vokal' },
  cakra: { glyph: 'ꦿ', name: 'Cakra (-ra)', description: 'Sisipan ra tengah' },
  keret: { glyph: 'ꦽ', name: 'Cakra Keret (-rě)', description: 'Sisipan rě pepet' },
  pengkal: { glyph: 'ꦾ', name: 'Pengkal (-ya)', description: 'Sisipan ya tengah' },
};

// Recognized consonant clusters ordered by length (longest match first)
const CONSONANT_CLUSTERS = [
  'ng', 'ny', 'dh', 'th',
  'h', 'n', 'c', 'r', 'k', 'd', 't', 's', 'w', 'l',
  'p', 'j', 'y', 'm', 'g', 'b'
];

/**
 * Normalize input Latin text according to vowel mode
 */
export function normalizeLatin(input: string, mode: VowelMode): string {
  let text = input;

  // Normalize diacritic variants
  text = text.replace(/ě/g, 'x');

  if (mode === 'kopas') {
    // In Kopas mode: 'e' is pepet ('x'), while 'é'/'è' is taling ('e')
    let temp = text.replace(/é|è/g, '__TALING__');
    temp = temp.replace(/e/g, 'x');
    temp = temp.replace(/__TALING__/g, 'e');
    text = temp;
  } else {
    // In Ketik mode: 'e' is taling, 'x' is pepet
    text = text.replace(/é|è/g, 'e');
  }

  // Handle retroflex characters
  text = text.replace(/ḍ/g, 'dh');
  text = text.replace(/ṭ/g, 'th');
  text = text.replace(/ŋ/g, 'ng');
  text = text.replace(/ñ/g, 'ny');

  return text;
}

/**
 * Syllabify a single Latin word into syllables
 * e.g., 'budi' -> ['bu', 'di'], 'sastra' -> ['sas', 'tra'], 'manunggal' -> ['ma', 'nung', 'gal']
 */
export function syllabify(word: string): string[] {
  if (!word) return [];

  // Punctuation check
  if (/^[.,!?:;꧋꧈꧉]/.test(word)) {
    return [word];
  }

  // Javanese syllable splitter: onset + vowel (including 'x' for pepet) + optional coda
  // Note: Consonant class excludes vowels [aeioux] so 'x' is recognized strictly as a vowel
  const syllables: string[] = [];
  const regex = /([^aeioux]*?)([aeioux])(ng(?![aeioux])|ny(?![aeioux])|dh(?![aeioux])|th(?![aeioux])|[rhn](?![aeioux])|[bcdfghjklmnpqrstvwyz](?=[bcdfghjklmnpqrstvwyz]|$))?/gi;
  let m: RegExpExecArray | null;
  let lastIndex = 0;

  while ((m = regex.exec(word)) !== null) {
    if (m[0]) {
      syllables.push(m[0]);
      lastIndex = regex.lastIndex;
    } else {
      break;
    }
  }

  if (lastIndex < word.length) {
    const trailing = word.slice(lastIndex);
    if (syllables.length > 0 && !/^[aeioux]/.test(trailing)) {
      syllables[syllables.length - 1] += trailing;
    } else {
      syllables.push(trailing);
    }
  }

  return syllables.length > 0 ? syllables : [word];
}

/**
 * Transliterate Latin text to Aksara Jawa with rich tokenization and breakdown
 */
export function latinToAksara(
  rawInput: string,
  options: TransliterationOptions = {
    vowelMode: 'ketik',
    tanpaSpasi: true,
    useMurda: false,
    useSwara: false,
  }
): TransliterationResult {
  if (!rawInput.trim()) {
    return { aksara: '', tokens: [] };
  }

  const words = rawInput.trim().split(/\s+/);
  const wordTokens: WordToken[] = [];
  let fullAksara = '';

  for (let wIdx = 0; wIdx < words.length; wIdx++) {
    const rawWord = words[wIdx];
    const normalizedWord = normalizeLatin(rawWord, options.vowelMode);
    const rawSyllables = syllabify(normalizedWord);
    const syllableTokens: SyllableToken[] = [];

    for (let sIdx = 0; sIdx < rawSyllables.length; sIdx++) {
      const syl = rawSyllables[sIdx];
      const token = convertSyllable(syl, sIdx === 0, options);
      syllableTokens.push(token);
    }

    const wordAksara = syllableTokens.map((s) => s.aksara).join('');
    fullAksara += (wIdx > 0 ? (options.tanpaSpasi ? '' : ' ') : '') + wordAksara;

    wordTokens.push({
      id: `w-${wIdx}-${Date.now()}`,
      latin: rawWord,
      aksara: wordAksara,
      syllables: syllableTokens,
    });
  }

  return {
    aksara: fullAksara,
    tokens: wordTokens,
  };
}

/**
 * Convert a single syllable to its Aksara Jawa glyph with component decomposition
 */
function convertSyllable(
  syl: string,
  isWordInitial: boolean,
  options: TransliterationOptions
): SyllableToken {
  let lower = syl.toLowerCase();

  // Handle punctuation
  if (/^[.,!?:;]/.test(lower)) {
    const isComma = lower === ',';
    const glyph = isComma ? '꧈' : '꧉';
    return {
      id: `syl-punct-${Date.now()}-${Math.random()}`,
      latin: syl,
      aksara: glyph,
      phonetic: isComma ? 'Pada Lingsa (Koma)' : 'Pada Lungsi (Titik)',
      base: {
        glyph,
        name: isComma ? 'Pada Lingsa' : 'Pada Lungsi',
        description: 'Tanda baca Jawa',
        type: 'pada',
      },
      sandhangan: [],
    };
  }

  // Parse onset
  let onset = '';
  for (const c of CONSONANT_CLUSTERS) {
    if (lower.startsWith(c)) {
      onset = c;
      break;
    }
  }

  let rest = onset ? lower.slice(onset.length) : lower;

  // Medial glides: cakra (r), cakra keret (rx), pengkal (y)
  let medial = '';
  if (rest.startsWith('rx')) {
    medial = 'rx';
    rest = rest.slice(2);
  } else if (rest.startsWith('r') && /^[aeioux]/.test(rest.slice(1))) {
    medial = 'r';
    rest = rest.slice(1);
  } else if (rest.startsWith('y') && /^[aeioux]/.test(rest.slice(1))) {
    medial = 'y';
    rest = rest.slice(1);
  }

  // Vowel
  let vowel = '';
  if (/^[aeioux]/.test(rest)) {
    vowel = rest[0];
    rest = rest.slice(1);
  }

  // Coda (final consonant)
  let coda = rest;

  // Identify Base Glyph
  let baseGlyph = 'ꦲ';
  let baseName = 'Ha';
  let baseType: 'base' | 'pasangan' | 'sandhangan' | 'anuswara' | 'pangkon' | 'pada' = 'base';
  const sandhanganList: SyllableComponent[] = [];
  let anuswaraComp: SyllableComponent | undefined;
  let pangkonComp: SyllableComponent | undefined;

  if (!onset && isWordInitial && options.useSwara && SWARA_MAP[vowel === 'x' ? 'e' : vowel]) {
    const swara = SWARA_MAP[vowel === 'x' ? 'e' : vowel];
    baseGlyph = swara.glyph;
    baseName = swara.name;
    baseType = 'base';
  } else if (onset) {
    if (options.useMurda && MURDA_MAP[onset]) {
      const murda = MURDA_MAP[onset];
      baseGlyph = murda.glyph;
      baseName = murda.name;
    } else if (CONSONANT_MAP[onset]) {
      const nglegena = CONSONANT_MAP[onset];
      baseGlyph = nglegena.glyph;
      baseName = nglegena.name;
    }
  } else {
    // Implicit initial 'ha'
    baseGlyph = 'ꦲ';
    baseName = 'Ha';
  }

  // Medial sandhangan
  let medialGlyph = '';
  if (medial === 'rx') {
    medialGlyph = SANDHANGAN_MAP.keret.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.keret, type: 'sandhangan' });
  } else if (medial === 'r') {
    medialGlyph = SANDHANGAN_MAP.cakra.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.cakra, type: 'sandhangan' });
  } else if (medial === 'y') {
    medialGlyph = SANDHANGAN_MAP.pengkal.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.pengkal, type: 'sandhangan' });
  }

  // Vowel sandhangan
  let vowelGlyph = '';
  if (vowel === 'i') {
    vowelGlyph = SANDHANGAN_MAP.wulu.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.wulu, type: 'sandhangan' });
  } else if (vowel === 'u') {
    vowelGlyph = SANDHANGAN_MAP.suku.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.suku, type: 'sandhangan' });
  } else if (vowel === 'e') {
    vowelGlyph = SANDHANGAN_MAP.taling.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.taling, type: 'sandhangan' });
  } else if (vowel === 'x') {
    if (medial !== 'rx') {
      vowelGlyph = SANDHANGAN_MAP.pepet.glyph;
      sandhanganList.push({ ...SANDHANGAN_MAP.pepet, type: 'sandhangan' });
    }
  } else if (vowel === 'o') {
    vowelGlyph = SANDHANGAN_MAP.talingTarung.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.talingTarung, type: 'sandhangan' });
  }

  // Coda sandhangan or Pangkon
  let codaGlyph = '';
  if (coda === 'ng') {
    codaGlyph = SANDHANGAN_MAP.cecak.glyph;
    anuswaraComp = { ...SANDHANGAN_MAP.cecak, type: 'anuswara' };
  } else if (coda === 'r') {
    codaGlyph = SANDHANGAN_MAP.layar.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.layar, type: 'sandhangan' });
  } else if (coda === 'h') {
    codaGlyph = SANDHANGAN_MAP.wignyan.glyph;
    sandhanganList.push({ ...SANDHANGAN_MAP.wignyan, type: 'sandhangan' });
  } else if (coda) {
    // Consonant deadened by pangkon
    const codaCons = CONSONANT_MAP[coda];
    if (codaCons) {
      codaGlyph = codaCons.glyph + SANDHANGAN_MAP.pangkon.glyph;
      pangkonComp = { ...SANDHANGAN_MAP.pangkon, type: 'pangkon' };
    }
  }

  // Visual layout for Aksara Jawa:
  // Taling (é) and Taling Tarung (o) wrap around the base glyph
  let aksara = '';
  if (vowel === 'e') {
    aksara = SANDHANGAN_MAP.taling.glyph + baseGlyph + medialGlyph + codaGlyph;
  } else if (vowel === 'o') {
    aksara = SANDHANGAN_MAP.taling.glyph + baseGlyph + medialGlyph + 'ꦴ' + codaGlyph;
  } else {
    aksara = baseGlyph + medialGlyph + vowelGlyph + codaGlyph;
  }

  return {
    id: `syl-${Date.now()}-${Math.random()}`,
    latin: syl,
    aksara,
    phonetic: syl,
    base: {
      glyph: baseGlyph,
      name: baseName,
      description: 'Aksara wanda dasar',
      type: baseType,
    },
    sandhangan: sandhanganList,
    anuswara: anuswaraComp,
    pangkon: pangkonComp,
  };
}

/**
 * Transliterate Aksara Jawa Unicode back to Latin phonetics
 */
export function aksaraToLatin(aksaraInput: string): string {
  if (!aksaraInput.trim()) return '';

  let text = aksaraInput;

  const REVERSE_CONSONANTS: Record<string, string> = {
    'ꦲ': 'ha', 'ꦤ': 'na', 'ꦕ': 'ca', 'ꦫ': 'ra', 'ꦏ': 'ka',
    'ꦢ': 'da', 'ꦠ': 'ta', 'ꦱ': 'sa', 'ꦮ': 'wa', 'ꦭ': 'la',
    'ꦥ': 'pa', 'ꦝ': 'dha', 'ꦗ': 'ja', 'ꦪ': 'ya', 'ꦚ': 'nya',
    'ꦩ': 'ma', 'ꦒ': 'ga', 'ꦧ': 'ba', 'ꦛ': 'tha', 'ꦔ': 'nga',
    'ꦟ': 'Na', 'ꦑ': 'Ka', 'ꦡ': 'Ta', 'ꦯ': 'Sa', 'ꦦ': 'Pa',
    'ꦘ': 'Nya', 'ꦓ': 'Ga', 'ꦨ': 'Ba',
    'ꦄ': 'A', 'ꦆ': 'I', 'ꦈ': 'U', 'ꦌ': 'E', 'ꦎ': 'O'
  };

  // Convert numbers
  text = text.replace(/꧑/g, '1')
    .replace(/꧒/g, '2')
    .replace(/꧓/g, '3')
    .replace(/꧔/g, '4')
    .replace(/꧕/g, '5')
    .replace(/꧖/g, '6')
    .replace(/꧗/g, '7')
    .replace(/꧘/g, '8')
    .replace(/꧙/g, '9')
    .replace(/꧐/g, '0');

  // Convert punctuation
  text = text.replace(/꧈/g, ', ')
    .replace(/꧉/g, '. ')
    .replace(/꧋/g, '')
    .replace(/꧁|꧂/g, '');

  let result = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];

    if (REVERSE_CONSONANTS[ch]) {
      let base = REVERSE_CONSONANTS[ch];
      let vowel = 'a';
      let coda = '';

      let j = i + 1;
      while (j < text.length) {
        const next = text[j];
        if (next === 'ꦶ') { vowel = 'i'; j++; }
        else if (next === 'ꦸ') { vowel = 'u'; j++; }
        else if (next === 'ꦺ') { vowel = 'é'; j++; }
        else if (next === 'ꦼ') { vowel = 'e'; j++; }
        else if (next === 'ꦁ') { coda = 'ng'; j++; }
        else if (next === 'ꦂ') { coda = 'r'; j++; }
        else if (next === 'ꦃ') { coda = 'h'; j++; }
        else if (next === '꧀') { vowel = ''; j++; }
        else { break; }
      }

      if (vowel === '') {
        result += base.replace(/a$/, '') + coda;
      } else {
        result += base.replace(/a$/, vowel) + coda;
      }
      i = j;
    } else {
      result += ch;
      i++;
    }
  }

  return result.trim();
}

/**
 * Curated classical philosophical presets (Pustaka Sastra)
 */
export const CULTURAL_PRESETS = [
  {
    title: 'Budi Pekerti Luhur',
    aksara: 'ꦧꦸꦢꦶꦥꦺꦏꦼꦂꦠꦶꦭꦸꦲꦸꦂ',
    latin: 'Budi pekerti luhur',
    meaning: 'Keluhuran akhlak, tata krama, dan kesucian budi nurani dalam setiap laku kehidupan.',
    context: 'Serat Wulangreh karya Sri Susuhunan Pakubuwana IV'
  },
  {
    title: 'Manunggaling Kawula Gusti',
    aksara: 'ꦩꦤꦸꦁꦒꦭꦶꦁꦏꦮꦸꦭꦒꦸꦱ꧀ꦠꦶ',
    latin: 'Manunggaling kawula gusti',
    meaning: 'Harmoni mistis dan kesatuan batin antara manusia dengan Sang Maha Pencipta serta pemimpin dan rakyatnya.',
    context: 'Ajaran Sangkan Paraning Dumadi Kejawen'
  },
  {
    title: 'Sastra Jendra Hayuningrat',
    aksara: 'ꦯꦱ꧀ꦠꦫꦗꦺꦤ꧀ꦢꦿꦲꦪꦸꦤꦶꦁꦫꦠ꧀',
    latin: 'Sastra Jendra Hayuningrat',
    meaning: 'Ilmu rahasia adiluhung pembebas jiwa untuk memayu keselamatan jagad semesta dan seisi bumi.',
    context: 'Lakon Wayang Purwa Lokapala'
  },
  {
    title: 'Memayu Hayuning Bawana',
    aksara: 'ꦩꦼꦩꦪꦸꦲꦪꦸꦤꦶꦁꦧꦮꦤ',
    latin: 'Memayu hayuning bawana',
    meaning: 'Kewajiban manusia untuk merawat, memperindah, dan menjaga kedamaian alam semesta.',
    context: 'Falsafah Luhur Kasultanan Ngayogyakarta'
  }
];
