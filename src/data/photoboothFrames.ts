/**
 * Nusantara Javanese Cultural Photobooth Frames (12 Corak Budaya Jawa Adiluhung)
 *
 * Cultural Collections:
 * 1. Batik Parang Kencana (Lereng pedang kencana kraton Mataram)
 * 2. Batik Kawung Sari (Empat penjuru mata angin, kesucian hati)
 * 3. Batik Truntum Kencana (Bintang bersemi, panuntun cinta kasih)
 * 4. Ukiran Gebyok Jepara (Kriya ukir kayu jati gapura pesisiran)
 * 5. Lung-Lungan Flora Jawa (Sulur meliuk keabadian & harmoni alam)
 * 6. Gunungan Wayang Agung (Kayon purwa pohon hayat Kalpataru)
 * 7. Batik Sido Mukti (Doa kemakmuran, derajat luhur, & kebahagiaan)
 * 8. Batik Mega Mendung (Awan pesisir pembawa kesejukan & kesabaran batin)
 * 9. Batik Sekar Jagad (Peta bunga semesta keanekaragaman nusantara)
 * 10. Batik Semen Rama (Hastha Brata & triloka kepemimpinan luhur)
 * 11. Surya Majapahit (Mandala dewata delapan penjuru kedaulatan nusantara)
 * 12. Batik Alas-Alasan (Satwa & rimba sakral harmoni alam Mangkunegaran)
 */

export type FrameId =
  | 'parang-kencana'
  | 'kawung-sari'
  | 'truntum-kencana'
  | 'ukiran-gebyok'
  | 'lung-lungan'
  | 'gunungan-agung'
  | 'sido-mukti'
  | 'mega-mendung'
  | 'sekar-jagad'
  | 'semen-rama'
  | 'surya-majapahit'
  | 'alas-alasan';

export type CulturalCategory =
  | 'semua'
  | 'keraton-mataram'
  | 'geometri-klasik'
  | 'kriya-arsitektur'
  | 'alam-pesisir';

export interface FramePalette {
  background: string;
  cardBg: string;
  borderOuter: string;
  borderInner: string;
  accentGold: string;
  textPrimary: string;
  textSecondary: string;
  badgeBg: string;
  badgeText: string;
}

export interface PhotoboothCulturalFrame {
  id: FrameId;
  name: string;
  javaneseName: string;
  category: CulturalCategory;
  motifCategory: string;
  origin: string;
  philosophy: string;
  description: string;
  pinterestSearchUrl: string;
  directImageUrl: string;
  palette: FramePalette;
  svgPatternUrl: string;
  svgPatternTile: string;
}

export const CULTURAL_FRAMES: PhotoboothCulturalFrame[] = [
  {
    id: 'parang-kencana',
    name: 'Parang Kencana',
    javaneseName: 'Batik Parang Kencana',
    category: 'keraton-mataram',
    motifCategory: 'Batik Keraton Klasik',
    origin: 'Surakarta & Ngayogyakarta Hadiningrat',
    philosophy: 'Ombak samudra tanpa jeda melambangkan semangat pantang menyerah, ketajaman akal budi, dan kemuliaan martabat ksatria.',
    description: 'Motif lereng miring pedang kencana dengan selingan aksen emas sogan keraton, memberikan kesan agung dan berwibawa.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20parang%20kencana%20pattern%20border%20gold',
    directImageUrl: '/images/batik-parang.png',
    palette: {
      background: '#19110B',
      cardBg: '#231811',
      borderOuter: '#D4AF37',
      borderInner: '#C59B53',
      accentGold: '#ECC47E',
      textPrimary: '#FFF8E7',
      textSecondary: '#D1B48C',
      badgeBg: 'rgba(212, 175, 55, 0.2)',
      badgeText: '#FDE68A',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M-10 50 L50 -10 M10 70 L70 10" stroke="%23D4AF37" stroke-width="1.5" stroke-opacity="0.35"/><path d="M15 45 C22 38 30 42 38 30 C42 24 40 18 46 14" stroke="%23ECC47E" stroke-width="2" fill="none" stroke-opacity="0.5"/><circle cx="18" cy="42" r="2" fill="%23ECC47E" fill-opacity="0.6"/><circle cx="42" cy="18" r="2" fill="%23ECC47E" fill-opacity="0.6"/></svg>',
    svgPatternTile: `<pattern id="pat-parang" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M-10 50 L50 -10 M10 70 L70 10" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.35"/><path d="M15 45 C22 38 30 42 38 30 C42 24 40 18 46 14" stroke="#ECC47E" stroke-width="2" fill="none" stroke-opacity="0.6"/><circle cx="18" cy="42" r="2" fill="#ECC47E" fill-opacity="0.7"/><circle cx="42" cy="18" r="2" fill="#ECC47E" fill-opacity="0.7"/></pattern>`,
  },
  {
    id: 'kawung-sari',
    name: 'Kawung Sari',
    javaneseName: 'Batik Kawung Sari',
    category: 'geometri-klasik',
    motifCategory: 'Geometri Sakral Jawa',
    origin: 'Mataram Kuno & Kasultanan Yogyakarta',
    philosophy: 'Empat kelopak buah kolang-kaling bersilang melambangkan Sedulur Papat Lima Pancer, kesucian hati, keadilan seimbang, dan pengendalian hawa nafsu.',
    description: 'Pola geometris elips empat penjuru berpadu sogan lembut dan krim pusaka, menciptakan bingkai anggun berkarakter bersahaja.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20kawung%20sari%20border%20vector',
    directImageUrl: '/images/patterns/kawung-sari.svg',
    palette: {
      background: '#F9F4EB',
      cardBg: '#FFFFFF',
      borderOuter: '#5A3219',
      borderInner: '#C59B53',
      accentGold: '#8C522B',
      textPrimary: '#2B1608',
      textSecondary: '#6B4C35',
      badgeBg: 'rgba(90, 50, 25, 0.12)',
      badgeText: '#5A3219',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><ellipse cx="25" cy="12" rx="9" ry="12" fill="none" stroke="%238C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="25" cy="38" rx="9" ry="12" fill="none" stroke="%238C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="12" cy="25" rx="12" ry="9" fill="none" stroke="%238C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="38" cy="25" rx="12" ry="9" fill="none" stroke="%238C522B" stroke-width="1.2" stroke-opacity="0.4"/><circle cx="25" cy="25" r="3" fill="%23C59B53" fill-opacity="0.5"/></svg>',
    svgPatternTile: `<pattern id="pat-kawung" width="50" height="50" patternUnits="userSpaceOnUse"><ellipse cx="25" cy="12" rx="9" ry="12" fill="none" stroke="#8C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="25" cy="38" rx="9" ry="12" fill="none" stroke="#8C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="12" cy="25" rx="12" ry="9" fill="none" stroke="#8C522B" stroke-width="1.2" stroke-opacity="0.4"/><ellipse cx="38" cy="25" rx="12" ry="9" fill="none" stroke="#8C522B" stroke-width="1.2" stroke-opacity="0.4"/><circle cx="25" cy="25" r="3" fill="#C59B53" fill-opacity="0.5"/></pattern>`,
  },
  {
    id: 'truntum-kencana',
    name: 'Truntum Kencana',
    javaneseName: 'Batik Truntum Kencana',
    category: 'keraton-mataram',
    motifCategory: 'Batik Kasunanan Surakarta',
    origin: 'Kasunanan Surakarta (Kanjeng Ratu Kencana)',
    philosophy: 'Taburan kuntum melati bintang di langit malam, perlambang cinta tulus yang terus bersemi (tumaruntum), kesetiaan abadi, dan penuntun sanubari.',
    description: 'Bintang keemasan delapan penjuru di atas latar hitam obsidian kelam, memberikan aura magis, romantis, dan penuh ketenangan.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20truntum%20pattern%20gold%20border',
    directImageUrl: '/images/patterns/truntum-kencana.svg',
    palette: {
      background: '#0D0C0A',
      cardBg: '#161411',
      borderOuter: '#ECC47E',
      borderInner: '#C59B53',
      accentGold: '#F5C542',
      textPrimary: '#FFF9ED',
      textSecondary: '#E0C89E',
      badgeBg: 'rgba(236, 196, 126, 0.2)',
      badgeText: '#ECC47E',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="2.5" fill="%23ECC47E"/><path d="M24 14 L24 34 M14 24 L34 24 M17 17 L31 31 M17 31 L31 17" stroke="%23ECC47E" stroke-width="1" stroke-opacity="0.45"/><circle cx="24" cy="14" r="1.5" fill="%23F5C542" fill-opacity="0.6"/><circle cx="24" cy="34" r="1.5" fill="%23F5C542" fill-opacity="0.6"/><circle cx="14" cy="24" r="1.5" fill="%23F5C542" fill-opacity="0.6"/><circle cx="34" cy="24" r="1.5" fill="%23F5C542" fill-opacity="0.6"/></svg>',
    svgPatternTile: `<pattern id="pat-truntum" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="24" cy="24" r="2.5" fill="#ECC47E"/><path d="M24 14 L24 34 M14 24 L34 24 M17 17 L31 31 M17 31 L31 17" stroke="#ECC47E" stroke-width="1" stroke-opacity="0.5"/><circle cx="24" cy="14" r="1.5" fill="#F5C542" fill-opacity="0.7"/><circle cx="24" cy="34" r="1.5" fill="#F5C542" fill-opacity="0.7"/><circle cx="14" cy="24" r="1.5" fill="#F5C542" fill-opacity="0.7"/><circle cx="34" cy="24" r="1.5" fill="#F5C542" fill-opacity="0.7"/></pattern>`,
  },
  {
    id: 'ukiran-gebyok',
    name: 'Ukiran Gebyok',
    javaneseName: 'Kriya Ukir Kayu Jepara',
    category: 'kriya-arsitektur',
    motifCategory: 'Seni Kriya Ukir Kayu',
    origin: 'Kabupaten Jepara, Jawa Tengah',
    philosophy: 'Pintu gerbang gebyok jati bermahkota lung krawangan melambangkan pintu kebaikan, perlindungan keluarga, dan kemahiran karya cipta luhur.',
    description: 'Mahkota gapura gebyok berukir daun paku ulir dan tiang pilaster jati berpelitur cokelat tembaga mewah dengan lis prada emas.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=gebyok%20jepara%20carved%20wood%20frame%20border',
    directImageUrl: '/frames/frame-ukiran-jepara.png',
    palette: {
      background: '#24140B',
      cardBg: '#1B0E07',
      borderOuter: '#B57438',
      borderInner: '#D4AF37',
      accentGold: '#E5B869',
      textPrimary: '#FFF4E0',
      textSecondary: '#D9B48F',
      badgeBg: 'rgba(181, 116, 56, 0.25)',
      badgeText: '#F4BA80',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 60 30"><path d="M0 15 C10 5, 20 5, 30 15 C40 25, 50 25, 60 15" stroke="%23B57438" stroke-width="1.5" fill="none" stroke-opacity="0.45"/><circle cx="30" cy="15" r="3" fill="%23D4AF37" fill-opacity="0.6"/><path d="M15 10 C15 3, 22 3, 22 10" stroke="%23E5B869" stroke-width="1" fill="none" stroke-opacity="0.4"/><path d="M45 20 C45 27, 52 27, 52 20" stroke="%23E5B869" stroke-width="1" fill="none" stroke-opacity="0.4"/></svg>',
    svgPatternTile: `<pattern id="pat-gebyok" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 15 C10 5, 20 5, 30 15 C40 25, 50 25, 60 15" stroke="#B57438" stroke-width="1.5" fill="none" stroke-opacity="0.45"/><circle cx="30" cy="15" r="3" fill="#D4AF37" fill-opacity="0.6"/></pattern>`,
  },
  {
    id: 'lung-lungan',
    name: 'Lung-Lungan Jawa',
    javaneseName: 'Ornamen Lung-Lungan Sulur',
    category: 'alam-pesisir',
    motifCategory: 'Ragam Hias Tumbuhan Jawa',
    origin: 'Keraton Surakarta & Pesisir Demak-Kudus',
    philosophy: 'Sulur dedaunan tumbuhan menjalar berkesinambungan tanpa putus melambangkan keluwesan hidup, rezeki terus bertunas, dan tali persaudaraan lestari.',
    description: 'Pilinan sulur tanaman liar, kuncup bunga teratai, dan spiral daun pakis bersaput emas di atas hijau zamrud malam yang teduh nan sakral.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=javanese%20lung%20lungan%20ornament%20floral%20border',
    directImageUrl: '/images/patterns/lung-lungan.svg',
    palette: {
      background: '#0E1712',
      cardBg: '#132119',
      borderOuter: '#D4AF37',
      borderInner: '#88A375',
      accentGold: '#ECC47E',
      textPrimary: '#F2F7F2',
      textSecondary: '#B9CEB6',
      badgeBg: 'rgba(136, 163, 117, 0.2)',
      badgeText: '#A7C79E',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M10 54 C20 40 18 20 32 14 C46 8 50 24 40 36 C34 44 26 42 28 32 C30 26 36 28 34 32" stroke="%23ECC47E" stroke-width="1.4" fill="none" stroke-opacity="0.45"/><circle cx="32" cy="14" r="2.5" fill="%2388A375" fill-opacity="0.7"/><circle cx="10" cy="54" r="2" fill="%23ECC47E" fill-opacity="0.5"/></svg>',
    svgPatternTile: `<pattern id="pat-lung" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M10 54 C20 40 18 20 32 14 C46 8 50 24 40 36 C34 44 26 42 28 32 C30 26 36 28 34 32" stroke="#ECC47E" stroke-width="1.4" fill="none" stroke-opacity="0.45"/><circle cx="32" cy="14" r="2.5" fill="#88A375" fill-opacity="0.7"/></pattern>`,
  },
  {
    id: 'gunungan-agung',
    name: 'Gunungan Agung',
    javaneseName: 'Kayon Gunungan Wayang Purwa',
    category: 'kriya-arsitektur',
    motifCategory: 'Seni Wayang Kulit Klasik',
    origin: 'Pewayangan Mataram (Yogyakarta & Surakarta)',
    philosophy: 'Puncak Gunungan memuat Pohon Hayat Kalpataru dan gerbang suci, lambang alam semesta beserta isinya, doa keselamatan, serta awal dan akhir perjalanan manusia.',
    description: 'Siluet puncak Gunungan Kayon adiluhung bermahkota sulur lidah api pelindung jagad, berlatar arang obsidian dengan aksen prada kencana.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=gunungan%20wayang%20pattern%20border%20strip',
    directImageUrl: '/images/patterns/gunungan-agung.svg',
    palette: {
      background: '#0B0908',
      cardBg: '#151210',
      borderOuter: '#ECC47E',
      borderInner: '#C59B53',
      accentGold: '#F59E0B',
      textPrimary: '#FFFDF5',
      textSecondary: '#E4CEAA',
      badgeBg: 'rgba(245, 158, 11, 0.2)',
      badgeText: '#FCD34D',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80"><path d="M30 6 C24 22 8 46 6 68 C6 76 16 78 30 78 C44 78 54 76 54 68 C52 46 36 22 30 6 Z" stroke="%23ECC47E" stroke-width="1.2" fill="none" stroke-opacity="0.35"/><path d="M30 74 L30 25 M30 55 C22 50 18 40 20 32 M30 55 C38 50 42 40 40 32" stroke="%23F59E0B" stroke-width="1" fill="none" stroke-opacity="0.45"/></svg>',
    svgPatternTile: `<pattern id="pat-gunungan" width="60" height="80" patternUnits="userSpaceOnUse"><path d="M30 6 C24 22 8 46 6 68 C6 76 16 78 30 78 C44 78 54 76 54 68 C52 46 36 22 30 6 Z" stroke="#ECC47E" stroke-width="1.2" fill="none" stroke-opacity="0.35"/><path d="M30 74 L30 25" stroke="#F59E0B" stroke-width="1" fill="none" stroke-opacity="0.45"/></pattern>`,
  },
  {
    id: 'sido-mukti',
    name: 'Sido Mukti',
    javaneseName: 'Batik Sido Mukti Ageng',
    category: 'keraton-mataram',
    motifCategory: 'Batik Larangan Pengantin Jawa',
    origin: 'Kasunanan Surakarta & Praja Mangkunegaran',
    philosophy: 'Sido Mukti bermakna terus-menerus hidup berkecukupan dan bahagia lahir batin. Ornamen garuda, singgasana, dan bangunan melambangkan perlindungan dan kemuliaan.',
    description: 'Jalinan geometris belah ketupat wajik dengan ornamen gurda bersayap emas di atas warna cokelat sogan hangat khas upacara agung keraton.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20sidomukti%20pattern%20traditional%20border',
    directImageUrl: '/images/patterns/sido-mukti.svg',
    palette: {
      background: '#26160F',
      cardBg: '#1B0E09',
      borderOuter: '#E2B774',
      borderInner: '#C59B53',
      accentGold: '#F6D389',
      textPrimary: '#FFF8EE',
      textSecondary: '#DFC59E',
      badgeBg: 'rgba(226, 183, 116, 0.2)',
      badgeText: '#F7D698',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path d="M28 2 L54 28 L28 54 L2 28 Z" stroke="%23E2B774" stroke-width="1.2" fill="none" stroke-opacity="0.4"/><circle cx="28" cy="28" r="4" fill="%23F6D389" fill-opacity="0.5"/><path d="M28 20 C22 24 20 28 16 28 M28 20 C34 24 36 28 40 28" stroke="%23F6D389" stroke-width="1" fill="none" stroke-opacity="0.45"/></svg>',
    svgPatternTile: `<pattern id="pat-sidomukti" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M28 2 L54 28 L28 54 L2 28 Z" stroke="#E2B774" stroke-width="1.2" fill="none" stroke-opacity="0.4"/><circle cx="28" cy="28" r="4" fill="#F6D389" fill-opacity="0.5"/></pattern>`,
  },
  {
    id: 'mega-mendung',
    name: 'Mega Mendung',
    javaneseName: 'Batik Mega Mendung Pesisiran',
    category: 'alam-pesisir',
    motifCategory: 'Batik Akulturasi Pesisiran',
    origin: 'Cirebon & Pesisir Utara Jawa',
    philosophy: 'Awan pembawa hujan penyejuk jagad, perlambang kesabaran mendalam, kejernihan pikiran, dan ketenangan hati saat menghadapi prahara hidup.',
    description: 'Stilisasi awan meliuk berlapis bergradasi biru safir, indigo malam, dan kontur prada emas, menghadirkan aura anggun nan menyejukkan.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20mega%20mendung%20pattern%20border%20vector',
    directImageUrl: '/images/patterns/mega-mendung.svg',
    palette: {
      background: '#091326',
      cardBg: '#0F1E38',
      borderOuter: '#ECC47E',
      borderInner: '#3B82F6',
      accentGold: '#93C5FD',
      textPrimary: '#F0F9FF',
      textSecondary: '#BAE6FD',
      badgeBg: 'rgba(59, 130, 246, 0.25)',
      badgeText: '#93C5FD',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><path d="M5 25 C10 15 25 15 30 25 C35 12 50 12 55 25" stroke="%233B82F6" stroke-width="1.5" fill="none" stroke-opacity="0.5"/><path d="M12 28 C16 20 28 20 32 28" stroke="%23ECC47E" stroke-width="1.2" fill="none" stroke-opacity="0.6"/><circle cx="30" cy="22" r="2" fill="%2393C5FD" fill-opacity="0.6"/></svg>',
    svgPatternTile: `<pattern id="pat-megamendung" width="60" height="40" patternUnits="userSpaceOnUse"><path d="M5 25 C10 15 25 15 30 25 C35 12 50 12 55 25" stroke="#3B82F6" stroke-width="1.5" fill="none" stroke-opacity="0.5"/><path d="M12 28 C16 20 28 20 32 28" stroke="#ECC47E" stroke-width="1.2" fill="none" stroke-opacity="0.6"/></pattern>`,
  },
  {
    id: 'sekar-jagad',
    name: 'Sekar Jagad',
    javaneseName: 'Batik Sekar Jagad Nuswantara',
    category: 'geometri-klasik',
    motifCategory: 'Batik Harmoni Keberagaman',
    origin: 'Kasultanan Yogyakarta & Pekalongan',
    philosophy: 'Karang Jagad bermakna peta bunga semesta. Melambangkan keindahan keberagaman suku, budaya, dan alam nusantara yang bersatu dalam satu kesatuan luhur.',
    description: 'Mozaik kompartemen pulau bunga dengan isen-isen ceplok, parang alit, dan sawat keemasan berlatar sogan hangat yang memesona.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20sekar%20jagad%20pattern%20border',
    directImageUrl: '/images/patterns/sekar-jagad.svg',
    palette: {
      background: '#20130C',
      cardBg: '#2C1B12',
      borderOuter: '#D97706',
      borderInner: '#ECC47E',
      accentGold: '#FBBF24',
      textPrimary: '#FFFBEB',
      textSecondary: '#E9D5A1',
      badgeBg: 'rgba(217, 119, 6, 0.22)',
      badgeText: '#FDE68A',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M0 32 Q16 16 32 32 T64 32" stroke="%23D97706" stroke-width="1.2" fill="none" stroke-opacity="0.45"/><circle cx="16" cy="16" r="4" fill="none" stroke="%23ECC47E" stroke-width="1"/><circle cx="48" cy="48" r="4" fill="none" stroke="%23ECC47E" stroke-width="1"/><path d="M12 48 L20 48 M44 16 L52 16" stroke="%23FBBF24" stroke-width="1.5"/></svg>',
    svgPatternTile: `<pattern id="pat-sekarjagad" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M0 32 Q16 16 32 32 T64 32" stroke="#D97706" stroke-width="1.2" fill="none" stroke-opacity="0.45"/><circle cx="16" cy="16" r="4" fill="none" stroke="#ECC47E" stroke-width="1"/></pattern>`,
  },
  {
    id: 'semen-rama',
    name: 'Semen Rama',
    javaneseName: 'Batik Semen Rama Hastha Brata',
    category: 'keraton-mataram',
    motifCategory: 'Batik Kepemimpinan Agung',
    origin: 'Kasunanan Surakarta & Mataram',
    philosophy: 'Semen bermakna semi (tumbuh bersemi). Mengandung ajaran Hastha Brata (delapan watak keutamaan pemimpin: surya, candra, kartika, angkasa, bayu, samudra, geni, dan bumi).',
    description: 'Ornamen triloka suci berupa sayap garuda perkasa, gunung meru keemasan, dan sulur tumbuhan bertunas yang melambangkan kemakmuran kepemimpinan sejati.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20semen%20rama%20hastha%20brata',
    directImageUrl: '/images/patterns/semen-rama.svg',
    palette: {
      background: '#16110C',
      cardBg: '#201811',
      borderOuter: '#F59E0B',
      borderInner: '#C59B53',
      accentGold: '#ECC47E',
      textPrimary: '#FFFDF5',
      textSecondary: '#D6C09F',
      badgeBg: 'rgba(245, 158, 11, 0.2)',
      badgeText: '#FCD34D',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54"><path d="M27 6 L38 24 L16 24 Z" stroke="%23F59E0B" stroke-width="1.2" fill="none" stroke-opacity="0.4"/><path d="M10 38 C18 30 24 38 27 32 C30 38 36 30 44 38" stroke="%23ECC47E" stroke-width="1.4" fill="none" stroke-opacity="0.45"/><circle cx="27" cy="16" r="2" fill="%23F59E0B" fill-opacity="0.6"/></svg>',
    svgPatternTile: `<pattern id="pat-semenrama" width="54" height="54" patternUnits="userSpaceOnUse"><path d="M27 6 L38 24 L16 24 Z" stroke="#F59E0B" stroke-width="1.2" fill="none" stroke-opacity="0.4"/><path d="M10 38 C18 30 24 38 27 32 C30 38 36 30 44 38" stroke="#ECC47E" stroke-width="1.4" fill="none" stroke-opacity="0.45"/></pattern>`,
  },
  {
    id: 'surya-majapahit',
    name: 'Surya Majapahit',
    javaneseName: 'Ornamen Surya Majapahit Kencana',
    category: 'kriya-arsitektur',
    motifCategory: 'Pusaka Wilwatikta Majapahit',
    origin: 'Trowulan, Jawa Timur (Kekaisaran Majapahit)',
    philosophy: 'Matahari bersudut delapan Dewata Nawasanga melambangkan keteraturan kosmik mandala, martabat kedaulatan ksatria, dan cahaya pencerahan nusantara yang tak pernah padam.',
    description: 'Mahkota lambang Surya Majapahit dengan delapan sinar dewata, ornamen sulur terakota candi, dan aksen emas prada kejayaan nusantara purba.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=surya%20majapahit%20ornament%20vector%20gold',
    directImageUrl: '/images/patterns/surya-majapahit.svg',
    palette: {
      background: '#220B0A',
      cardBg: '#2E100F',
      borderOuter: '#DC2626',
      borderInner: '#ECC47E',
      accentGold: '#FDE68A',
      textPrimary: '#FFF5F5',
      textSecondary: '#E8B4B4',
      badgeBg: 'rgba(220, 38, 38, 0.25)',
      badgeText: '#FECACA',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="5" fill="%23ECC47E" fill-opacity="0.6"/><path d="M25 6 L25 15 M25 35 L25 44 M6 25 L15 25 M35 25 L44 25 M12 12 L18 18 M32 32 L38 38 M12 38 L18 32 M32 18 L38 12" stroke="%23DC2626" stroke-width="1.5" stroke-opacity="0.5"/></svg>',
    svgPatternTile: `<pattern id="pat-suryamajapahit" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="5" fill="#ECC47E" fill-opacity="0.6"/><path d="M25 6 L25 15 M25 35 L25 44 M6 25 L15 25 M35 25 L44 25" stroke="#DC2626" stroke-width="1.5" stroke-opacity="0.5"/></pattern>`,
  },
  {
    id: 'alas-alasan',
    name: 'Alas-Alasan',
    javaneseName: 'Batik Alas-Alasan Mangkunegaran',
    category: 'alam-pesisir',
    motifCategory: 'Ragam Hias Satwa & Rimba',
    origin: 'Praja Mangkunegaran, Surakarta',
    philosophy: 'Alas bermakna rimba raya. Mengajarkan manusia untuk selalu mawas diri (introspeksi), menghormati peran setiap makhluk, dan menjaga harmoni sakral semesta.',
    description: 'Siluet anggun satwa rimba keraton (kidang kencana, burung merak, dan ayam alas) bersanding sulur dedaunan hutan bertabur rintik emas.',
    pinterestSearchUrl: 'https://www.pinterest.com/search/pins/?q=batik%20alas%20alasan%20pattern%20border',
    directImageUrl: '/images/patterns/alas-alasan.svg',
    palette: {
      background: '#0D1611',
      cardBg: '#132119',
      borderOuter: '#52796F',
      borderInner: '#ECC47E',
      accentGold: '#84A98C',
      textPrimary: '#F1F7F4',
      textSecondary: '#B7CEBE',
      badgeBg: 'rgba(82, 121, 111, 0.25)',
      badgeText: '#A3C4B8',
    },
    svgPatternUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58"><path d="M10 48 Q24 20 48 30" stroke="%2384A98C" stroke-width="1.4" fill="none" stroke-opacity="0.5"/><circle cx="28" cy="22" r="3" fill="%23ECC47E" fill-opacity="0.6"/><path d="M26 19 L32 10 M30 20 L38 14" stroke="%23ECC47E" stroke-width="1" stroke-opacity="0.45"/></svg>',
    svgPatternTile: `<pattern id="pat-alasalasan" width="58" height="58" patternUnits="userSpaceOnUse"><path d="M10 48 Q24 20 48 30" stroke="#84A98C" stroke-width="1.4" fill="none" stroke-opacity="0.5"/><circle cx="28" cy="22" r="3" fill="#ECC47E" fill-opacity="0.6"/></pattern>`,
  },
];

export function getFrameById(id: string): PhotoboothCulturalFrame {
  const found = CULTURAL_FRAMES.find((f) => f.id === id);
  return found || CULTURAL_FRAMES[0];
}
