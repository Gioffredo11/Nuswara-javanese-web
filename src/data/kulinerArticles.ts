export interface LegendaryLocation {
  name: string;
  address: string;
  legacyYear: string;
  note: string;
}

export interface KulinerArticle {
  slug: string;
  name: string;
  javaneseName?: string;
  category: 'makanan-utama' | 'kudapan-tradisional' | 'minuman-warisan' | 'kudapan-manis';
  categoryLabel: string;
  region: string;
  city: string;
  culturalTheme: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  flavorProfile: string[];
  readTime: string;
  shortSummary: string;
  leadParagraph: string;
  historyAndOrigin: Array<{
    title: string;
    content: string[];
  }>;
  philosophicalMeaning: {
    title: string;
    quote: string;
    content: string[];
  };
  ingredientsAndSpices: {
    mainIngredients: string[];
    secretSpices: string[];
    processNote: string;
  };
  tastingEtiquette: {
    servingStyle: string;
    traditionalPairing: string;
    steps: string[];
  };
  legendaryLocations: LegendaryLocation[];
  keyTakeaways: string[];
}

export const kulinerArticles: KulinerArticle[] = [
  {
    slug: 'lumpia-semarang',
    name: 'Lumpia Semarang',
    javaneseName: 'Lunpia Semawis',
    category: 'kudapan-tradisional',
    categoryLabel: 'Kudapan Tradisional',
    region: 'Pesisir Utara Jawa',
    city: 'Semarang',
    culturalTheme: 'Akulturasi Pesisir Tionghoa-Jawa',
    heroImage: '/images/editorial/kuliner-lumpia.jpg',
    heroImageAlt: 'Lumpia Semarang goreng dan basah dengan saus tauco kental',
    heroImageCaption: 'Lumpia Semarang disajikan hangat dengan olesan saus cokelat manis gurih, daun bawang lokio, dan cabai rawit hijau.',
    flavorProfile: ['Gurih Rebung Muda', 'Manis Legit Saus Tauco', 'Kriuk Renyah / Lembut Basah', 'Pedas Segar Rawit'],
    readTime: '5 Menit Baca',
    shortSummary:
      'Mahakarya akulturasi kuliner antara Tjoa Thay Yoe dan Mbok Wasih di abad ke-19, memadukan rebung muda manis gurih, udang windu, dan saus kental cokelat khas pesisir utara.',
    leadParagraph:
      'Dari pelabuhan dagang tua Semarang pada paruh kedua abad ke-19, lahirlah sebuah panganan legendaris yang menjadi lambang cinta dan perpaduan dua kebudayaan agung: Tionghoa dan Jawa. Lumpia Semarang bukan sekadar gulungan kulit gandum bertabur rebung; ia adalah bukti nyata bagaimana toleransi rasa mampu merekatkan dua peradaban yang berbeda menjadi sebuah identitas kuliner abadi Nusantara.',
    historyAndOrigin: [
      {
        title: 'Kisah Cinta di Gang Lombok: Awal Mula Sang Lunpia',
        content: [
          'Sejarah lumpia Semarang bermula ketika seorang pemuda Tionghoa perantau bernama Tjoa Thay Yoe tiba di pesisir Kota Semarang sekitar tahun 1870-an. Ia mulai berdagang penganan gulung khas Tiongkok yang berisi daging babi cincang dan rebung manis.',
          'Di pasar yang sama, seorang gadis pribumi Jawa bernama Mbok Wasih juga menjajakan penganan gulung manis beraroma kentang, udang, dan rempah bumbu Jawa. Bukannya bermusuhan dalam berniaga, keduanya justru saling mengagumi cita rasa masakan masing-masing hingga akhirnya jatuh cinta dan membina rumah tangga.',
          'Dari pernikahan cinta inilah, mereka memodifikasi resep lumpia: daging babi dihilangkan agar dapat dinikmati oleh seluruh kalangan masyarakat Muslim Jawa, diganti dengan udang windu dan telur ayam, sementara rebung muda (bung) dimasak manis gurih khas lidah Jawa. Gulungan ini kemudian dikenal sebagai Lunpia Semarang yang berpusat di Gang Lombok.',
        ],
      },
      {
        title: 'Dua Karakter: Antara Basah Lembut dan Goreng Keemasan',
        content: [
          'Lumpia Semarang dikenal dalam dua versi penyajian: lumpia basah dan lumpia goreng.',
          'Lumpia basah mempertahankan kesegaran kulit gandum yang tipis kenyal tanpa melalui proses penggorengan, menonjolkan aroma alami rebung muda yang direndam dan dibumbui bawang putih merica.',
          'Sementara lumpia goreng digoreng dalam minyak panas berlimpah hingga mencapai warna kuning keemasan, menghadirkan kerenyahan tekstur luar yang kontras dengan isian rebung basah yang sarat bumbu di dalamnya.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Filosofi Bhinneka Tunggal Ika dalam Gulungan Rasa',
      quote: 'Lumpia Semarang mengajarkan bahwa keindahan rasa tidak lahir dari penyeragaman, melainkan dari keberanian membuka diri dan merangkul perbedaan.',
      content: [
        'Karakter rebung muda yang berserat halus melambangkan sifat manusia Jawa yang lentur, sabar, dan senantiasa beradaptasi dengan perubahan zaman tanpa kehilangan akarnya.',
        'Saus cokelat kental berbahan dasar gula aren, bawang putih halus, dan pati tapioka melambangkan perekat sosial kerukunan antar-etnis di pesisir utara Jawa Tengah.',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Rebung muda (bung) pilihan tanpa bau pesing', 'Udang tambak segar cincang kasar', 'Daging ayam kampung rebus suwir', 'Telur bebek/ayam orak-arik gurih', 'Kulit lumpia tipis buatan tangan'],
      secretSpices: ['Bawang putih kating ulek halus', 'Merica butir sangrai', 'Kecap manis kedelai hitam tradisional', 'Gula kelapa aren asli', 'Minyak kelapa murni untuk menumis'],
      processNote: 'Kunci kelezatan rebung terletak pada pencucian berulang dengan air mengalir dan perebusan ganda menggunakan garam dan daun salam untuk menghilangkan getah dan aroma pesing alami bambu muda.',
    },
    tastingEtiquette: {
      servingStyle: 'Disajikan hangat di atas wadah piring porselen atau pincuk kertas minyak cokelat klasik.',
      traditionalPairing: 'Wajib disantap bersama daun bawang lokio segar (bawang batak), cabai rawit hijau utuh, dan cocolan saus cokelat manis kental.',
      steps: [
        'Ambil satu potongan lumpia hangat yang baru digoreng atau diangkat dari kukusan.',
        'Celupkan ujung lumpia ke dalam saus cokelat kental manis gurih.',
        'Gigit bersamaan dengan satu batang daun lokio renyah dan sebutir cabai rawit hijau untuk meledakkan perpaduan rasa gurih, manis, pedas, dan segar di lidah.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Loenpia Gang Lombok No. 11',
        address: 'Jl. Gang Lombok No.11, Purwodinatan, Semarang Tengah (Samping Klenteng Tay Kak Sie)',
        legacyYear: 'Didirikan c. Abad ke-19 (Generasi ke-4)',
        note: 'Gerai tertua dan paling legendaris, mempertahankan resep otentik tanpa bahan pengawet.',
      },
      {
        name: 'Lumpia Mbak Lien',
        address: 'Jl. Pemuda Gang Grajen No. 1, Pandansari, Semarang',
        legacyYear: 'Berdiri sejak 1930',
        note: 'Pelopor varian isian modern seperti daging kepiting dan keju dengan tetap menjaga cita rasa klasik rebung.',
      },
      {
        name: 'Lumpia Mataram',
        address: 'Jl. MT Haryono No. 533A, Semarang',
        legacyYear: 'Berdiri sejak 1980',
        note: 'Kerap menjadi rujukan oleh-oleh resmi dengan kemasan besek bambu tradisional yang tahan perjalanan jauh.',
      },
    ],
    keyTakeaways: [
      'Simbol otentik akulturasi harmonis etnis Tionghoa dan Jawa di Kota Semarang.',
      'Pengolahan rebung muda berteknik khusus menghasilkan rasa manis alami bebas bau apek.',
      'Dihidangkan lengkap dengan saus cokelat kental dan daun lokio sebagai etiket bersantap tradisi.',
    ],
  },
  {
    slug: 'nasi-liwet-solo',
    name: 'Nasi Liwet Solo',
    javaneseName: 'Sega Liwet Surakarta',
    category: 'makanan-utama',
    categoryLabel: 'Hidangan Utama',
    region: 'Surakarta Hadiningrat (Solo)',
    city: 'Surakarta',
    culturalTheme: 'Kemuliaan Sajian Keraton dan Doa Keselamatan',
    heroImage: '/images/editorial/kuliner-liwet.jpg',
    heroImageAlt: 'Nasi Liwet Solo disajikan dalam pincuk daun pisang dengan areh kelapa',
    heroImageCaption: 'Sega Liwet Solo beraroma santan gurih, ditemani suwiran ayam kampung ungkep, sayur labu siam pedas manis, dan gumpalan areh kumut putih lembut.',
    flavorProfile: ['Gurih Santan Kelapa Murni', 'Aroma Daun Salam & Serai', 'Manis Lembut Labu Siam', 'Kekayaan Lemak Areh Kumut'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Hidangan sakral pusaka Keraton Kasunanan Surakarta yang awalnya dimasak saat bencana melanda kota, menyajikan nasi gurih tanak santan beralas pincuk daun pisang.',
    leadParagraph:
      'Di sudut-sudut kota Solo saat malam mulai beranjak larut, kehangatan bakul bambu dan wangi kepulan daun pisang menyambut setiap penikmat kuliner pusaka. Nasi Liwet Solo bukan sekadar sarapan atau santap malam biasa; ia adalah hidangan sarat doa keselamatan spiritual (selamatan) yang bertransformasi dari sajian dapur bangsawan Keraton Kasunanan Surakarta menjadi jamuan merakyat yang merengkuh seluruh lapisan masyarakat.',
    historyAndOrigin: [
      {
        title: 'Asal-Usul Desa Menuran dan Doa Tolak Bala',
        content: [
          'Jejak sejarah nasi liwet berpangkal dari Desa Menuran, Baki, Sukoharjo. Pada masa pemerintahan Pakubuwono IX dan Pakubuwono X di Keraton Kasunanan Surakarta, wilayah Surakarta pernah dilanda bencana gempa bumi dan wabah penyakit.',
          'Para sesepuh dan kerabat keraton menggelar ritual doa tolak bala dengan memasak sega gurih (nasi liwet) yang diiringi tembang Macapat dan doa permohonan keselamatan. Nasi tersebut dibagikan kepada rakyat jelata sebagai lambang perlindungan dan belas kasih raja kepada kawulanya.',
          'Sejak saat itu, para perempuan perajin liwet dari Menuran mulai berjalan kaki memanggul bakul bambu menuju pusat kota Surakarta untuk menjual nasi liwet di pasar dan pelataran keraton, hingga menjadi profesi turun-temurun lintas generasi.',
        ],
      },
      {
        title: 'Anatomi Nasi Liwet Komplet',
        content: [
          'Seporsi nasi liwet Solo sejati terdiri atas lima elemen kuliner yang berpadu harmonis:',
          '1. Nasi Gurih: Beras mentik wangi ditanak bersama santan kelapa tua, daun salam, serai, dan sedikit garam hingga pulen berminyak.',
          '2. Sayur Jipang: Irisan labu siam muda yang dimasak kuah santan kuning encer bersama cabai rawit utuh dan ebi kering.',
          '3. Suwiran Ayam Opor: Daging ayam kampung pejantan yang diungkep santan kental bumbu opor putih hingga sangat empuk.',
          '4. Telur Pindang Bacem: Telur bebek yang direbus lambat bersama daun jati, kulit bawang, dan gula kelapa hingga permukaannya berwarna cokelat marun mengilap.',
          '5. Areh Santan (Kumut): Gumpalan santan kental kelapa tua yang dimasak berjam-jam hingga minyaknya terpisah dan menyisakan busa putih gurih selembut krim sutra.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Kesederhanaan Pincuk Daun dan Rasa Welas Asih',
      quote: 'Pincuk daun pisang mengajarkan manusia untuk menundukkan hati, menerima berkah semesta dengan rasa syukur dan kesahajaan luhur.',
      content: [
        'Wadah pincuk daun pisang yang dilipat mengerucut dan disemat lidi aren melambangkan sikap tangan menengadah memohon berkah Sang Hyang Widhi.',
        'Warna putih bersih areh santan di atas nasi kuning kecokelatan melambangkan kesucian niat batin manusia yang menaungi segala tindakan duniawi.',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Beras lokal mentik wangi atau pandan wangi', 'Santan kental dari perasan pertama kelapa tua', 'Labu siam (jipang) muda iris korek api', 'Ayam kampung utuh ungkep bumbu opor', 'Telur bebek pindang bumbu rempah daun jati'],
      secretSpices: ['Daun salam segar petik pekarangan', 'Batang serai memar wangi', 'Lengkuas merah geprek', 'Bawang merah Brebes ulek halus', 'Gula kelapa aren asli Cetak Boyolali'],
      processNote: 'Areh dibuat dalam dua lapisan: areh kuning encer yang disiramkan ke sayur jipang, dan areh putih kumut kental yang diletakkan di puncak nasi sebagai mahkota cita rasa gurih mutlak.',
    },
    tastingEtiquette: {
      servingStyle: 'Wajib disajikan di atas wadah pincuk daun pisang klutuk segar tanpa piring porselen.',
      traditionalPairing: 'Dinikmati bersama tempe bacem hangat, tahu ungkep, ati ampela goreng, dan segelas wedang teh krampul panas beraroma melati gula batu.',
      steps: [
        'Pegang pincuk daun pisang dengan telapak tangan kiri secara kokoh.',
        'Gunakan suru (sendok lipat dari potongan daun pisang) atau jari tangan kanan langsung untuk menyuap nasi bercampur areh dan sayur labu siam.',
        'Nikmati kelembutan areh yang meleleh lumer seketika bersentuhan dengan kehangatan lidah.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Nasi Liwet Wongso Lemu',
        address: 'Jl. Teuku Umar, Keprabon, Banjarsari, Surakarta',
        legacyYear: 'Didirikan sejak 1950',
        note: 'Ikon kuliner malam legendaris Solo yang diiringi alunan merdu sinden keraton bersenandung tembang Jawa di tepi trotoar.',
      },
      {
        name: 'Nasi Liwet Bu Sri Pasar Gede',
        address: 'Pintu Barat Pasar Gede Hardjonagoro, Surakarta',
        legacyYear: 'Berdiri sejak 1970-an',
        note: 'Langganan santap pagi para seniman dan pedagang pasar dengan areh kelapa gurih mantap.',
      },
      {
        name: 'Nasi Liwet Yu Sani Solo Baru',
        address: 'Jl. Veteran No. 90, Gemblegan, Solo',
        legacyYear: 'Berdiri sejak 1980',
        note: 'Terkenal dengan porsi melimpah dan suwiran ayam kampung empuk yang meresap sempurna.',
      },
    ],
    keyTakeaways: [
      'Kuliner keraton sakral yang lahir dari tradisi doa keselamatan dan tolak bala bumi Mataram.',
      'Areh kumut putih lembut menjadi identitas gurih tertinggi dalam seni masak tradisional Jawa.',
      'Tradisi bersantap menggunakan pincuk daun pisang dan suru mempertahankan interaksi indrawi murni.',
    ],
  },
  {
    slug: 'tempe-mendoan-banyumas',
    name: 'Tempe Mendoan Banyumas',
    javaneseName: 'Tempe Mendoan Penginyongan',
    category: 'kudapan-tradisional',
    categoryLabel: 'Kudapan Tradisional',
    region: 'Karesidenan Banyumas',
    city: 'Purwokerto & Banyumas',
    culturalTheme: 'Kearifan Kerakyatan & Jiwa Lugas Penginyongan',
    heroImage: '/images/editorial/kuliner-mendoan.jpg',
    heroImageAlt: 'Tempe Mendoan Banyumas panas bertabur daun bawang dan cabai rawit pedas',
    heroImageCaption: 'Tempe mendoan tipis lebar khas Banyumas, digoreng setengah matang (mendo) berbalut tepung gurih rempah ketumbar dan cocolan sambal kecap rawit.',
    flavorProfile: ['Gurih Kedelai Fermentasi Daun Pisang', 'Lembek Kenyal Setengah Matang', 'Wangi Ketumbar & Bawang Putih', 'Pedas Manis Sambal Kecap'],
    readTime: '4 Menit Baca',
    shortSummary:
      'Ikon kuliner Penginyongan lembah Gunung Slamet yang digoreng cepat setengah matang (mendo), mencerminkan keterbukaan dan kelugasan jiwa masyarakat Banyumasan.',
    leadParagraph:
      'Dari lembah barat Gunung Slamet dan aliran Sungai Serayu, masyarakat tlatah Banyumas mewariskan sebuah pusaka kuliner fermentasi kedelai yang diakui sebagai Warisan Budaya Takbenda Dunia oleh UNESCO: Tempe Mendoan. Istilah "mendo" dalam dialek bahasa Jawa Banyumasan berarti lembek, basah, atau setengah matang. Di balik kerenyahan tepung dan kelembutan kedelainya, mendoan menyimpan filosofi mendalam tentang karakter egaliter dan kelugasan wong Banyumas yang jujur apa adanya.',
    historyAndOrigin: [
      {
        title: 'Lahir dari Filosofi Penghematan dan Kecepatan Saji',
        content: [
          'Sejarah tempe mendoan telah terdokumentasi sejak abad ke-16 dalam Serat Centhini dan naskah kuno Jawa, di mana olahan kedelai bungkus daun jati dan daun pisang menjadi konsumsi pokok rakyat pedesaan.',
          'Pada era kolonial abad ke-19, masyarakat Banyumas yang sebagian besar bekerja sebagai buruh tani dan pekerja perkebunan membutuhkan makanan hangat yang lekas saji dan hemat kayu bakar. Memasak tempe dengan mencelupkannya ke dalam adonan tepung beras berbumbu ketumbar dan menggorengnya sebentar dalam minyak mendidih (sekitar 2 hingga 3 menit saja) menghasilkan tempe yang matang sempurna di dalam namun tetap basah kenyal di luar.',
          'Ukuran tempenya sengaja dibuat sangat tipis dan lebar (hanya sekitar 3 milimeter) serta difermentasikan satu per satu di dalam bungkusan daun pisang khusus, bukan tempe papan balok yang diiris tipis.',
        ],
      },
      {
        title: 'Perbedaan Tempe Mendoan Asli vs Tempe Goreng Tepung',
        content: [
          'Banyak orang keliru mengira tempe mendoan adalah tempe goreng renyah (crispy). Di tanah asalnya Banyumas, menggoreng mendoan hingga kering krispi justru dianggap merusak jati dirinya.',
          'Mendoan sejati harus diangkat dari kuali wajan minyak kelapa saat adonan tepung masih basah keputihan, lemas layu saat diangkat dengan sumpit bambu, dan menyisakan minyak gurih di sela-sela kedelai murni.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Cabaka: Watak Satria yang Fleksibel Namun Berprinsip',
      quote: 'Mendoan yang lentur mengajarkan watak Cabaka: manusia yang luwes bergaul di segala situasi, namun tetap kokoh memegang prinsip kebenaran batin.',
      content: [
        'Kelembutan tekstur mendoan melambangkan watak wong Banyumas yang ramah, hangat, dan tidak kaku dalam bergaul.',
        'Sensasi cabai rawit pedas dan sambal kecap melambangkan watak "blakasuta" (terus terang, lugas, tanpa kepalsuan dan tanpa basa-basi feodal).',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Tempe mendoan lembaran tipis bungkus daun pisang asli Banyumas', 'Tepung terigu protein sedang dicampur tepung beras lokal', 'Irisan kucai segar atau daun bawang prei halus', 'Minyak kelapa sawit/kelapa bersih untuk menggoreng rendam'],
      secretSpices: ['Biji ketumbar sangrai ulek kasar', 'Bawang putih kating aromatik', 'Kunyit bakar sedikit untuk warna semu keemasan', 'Kencur sedikit untuk aroma penghilang langu', 'Garam laut kristal'],
      processNote: 'Minyak dalam wajan harus sangat panas dan banyak (deep frying singkat). Waktu penggorengan tidak boleh melebihi 180 detik agar tepung mengembang setengah matang tanpa menjadi keras.',
    },
    tastingEtiquette: {
      servingStyle: 'Wajib disantap panas mendidih begitu baru diangkat dari wajan penggorengan di atas piring anyaman bambu.',
      traditionalPairing: 'Dicocol ke dalam sambal kecap manis bertabur ulekan cabai rawit merah dan bawang merah mentah, ditemani segelas teh poci gula batu wasgitel (wangi, panas, sepet, legi, kenthel).',
      steps: [
        'Ambil selembar tempe mendoan hangat yang masih mengepulkan uap harum ketumbar.',
        'Lipat menjadi dua bagian menggunakan jari jemari tangan.',
        'Cocolkan ke mangkuk sambal kecap kental dan kunyah selagi masih empuk kenyal.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Mendoan Sawangan No. 1 (Echo)',
        address: 'Jl. Mayjend Sutoyo No. 21, Sawangan, Purwokerto',
        legacyYear: 'Berdiri sejak 1960',
        note: 'Pusat oleh-oleh tempe mendoan mentah bungkus daun beserta tepung racikan legendaris.',
      },
      {
        name: 'Mendoan Khas Banyumas Sari Rasa',
        address: 'Jl. Jenderal Soedirman No. 450, Purwokerto Wetan',
        legacyYear: 'Berdiri sejak 1978',
        note: 'Pilihan utama penikmat mendoan dadakan yang digoreng langsung di hadapan pembeli.',
      },
      {
        name: 'Warung Mendoan Kali Bener',
        address: 'Jl. Pemuda, Sokaraja, Banyumas',
        legacyYear: 'Berdiri sejak 1985',
        note: 'Terkenal dengan cocolan sambal kecap rawit pedas nendang dan daun bawang kucai melimpah.',
      },
    ],
    keyTakeaways: [
      'Warisan Budaya Takbenda Dunia (UNESCO) asal Banyumas berbasis fermentasi kedelai tradisional.',
      'Teknik goreng kilat setengah matang (mendo) menghasilkan kelembutan tekstur beraroma ketumbar harum.',
      'Cerminan watak wong Banyumasan yang lugas, ramah, dan bersahaja (blakasuta).',
    ],
  },
  {
    slug: 'soto-kudus',
    name: 'Soto Kudus',
    javaneseName: 'Soto Daging Kebo Kudus',
    category: 'makanan-utama',
    categoryLabel: 'Hidangan Utama',
    region: 'Pesisir Timur Jawa Tengah',
    city: 'Kudus',
    culturalTheme: 'Filosofi Toleransi Lintas Agama Sunan Kudus',
    heroImage: '/images/editorial/kuliner-sotokudus.jpg',
    heroImageAlt: 'Soto Daging Kerbau Kudus dalam mangkuk porselen kecil khas pesisir',
    heroImageCaption: 'Soto Kudus berkuah kuning kecokelatan kaya rempah dengan irisan daging kerbau empuk dan taburan bawang putih goreng renyah.',
    flavorProfile: ['Gurih Kaldu Daging Kerbau', 'Aroma Rempah Pala & Cengkeh', 'Segar Jeruk Nipis Peras', 'Kriuk Renyah Bawang Putih Goreng'],
    readTime: '5 Menit Baca',
    shortSummary:
      'Simbol toleransi luhur Sunan Kudus yang mengganti daging sapi dengan daging kerbau demi menghormati umat Hindu, disajikan dalam mangkuk porselen mungil.',
    leadParagraph:
      'Di bawah bayang-bayang Menara Kudus yang anggun berpadu arsitektur Hindu-Islam abad ke-16, tersimpan sebuah riwayat kuliner yang menjadi monumen hidup penghormatan antar-umat beragama: Soto Kudus. Keunikan paling mendasar dari soto ini adalah penggunaan daging kerbau (atau ayam kampung) alih-alih daging sapi. Sebuah keputusan dakwah kultural penuh kelembutan budi yang dicanangkan oleh Ja\'far Shodiq (Sunan Kudus) untuk menjaga perasaan masyarakat pemeluk Hindu yang memuliakan lembu sapi sebagai hewan suci.',
    historyAndOrigin: [
      {
        title: 'Dakwah Kultural Sunan Kudus dan Larangan Menyembelih Sapi',
        content: [
          'Pada masa Kesultanan Demak dan penyebaran Islam di pesisir utara Jawa, Sunan Kudus memahami bahwa dakwah tidak boleh dilakukan dengan paksaan atau merusak tatanan kearifan lokal.',
          'Melihat masyarakat Kudus saat itu mayoritas menganut agama Hindu yang mensucikan sapi, Sunan Kudus mengeluarkan maklumat luhur: melarang seluruh pengikutnya menyembelih lembu sapi, bahkan pada saat hari raya Idul Adha. Sebagai gantinya, beliau menganjurkan penyembelihan hewan kerbau.',
          'Tradisi mulia ini meresap ke dalam dapur rumah tangga hingga lahirlah Soto Kudus berdaging kerbau. Daging kerbau memiliki serat yang lebih padat dan rasa gurih yang lebih pekat dibanding daging sapi, menuntut teknik perebusan lambat dengan rempah berlimpah agar teksturnya empuk lembut.',
        ],
      },
      {
        title: 'Tradisi Mangkuk Kecil dan Penyajian Campur',
        content: [
          'Soto Kudus secara turun-temurun selalu disajikan dalam mangkuk porselen keramik berukuran mungil (kira-kira berdiameter 12 cm).',
          'Penyajiannya lazimnya "dicampur" langsung antara nasi hangat, tauge pendek renyah, seledri cincang, dan suwiran daging kerbau yang disiram kuah kaldu rempah panas mendidih.',
          'Porsi kecil ini melatih manusia Jawa untuk mengendalikan hawa nafsu makan berlebihan, sekaligus memungkinkan penikmatnya menambah porsi kedua jika masih berkenan.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Tepaslira: Tenggang Rasa dan Kerendahan Hati',
      quote: 'Semangkuk soto kerbau Kudus adalah khotbah tanpa kata tentang betapa indahnya hidup berdampingan saat manusia rela menahan ego demi menghormati keyakinan sesamanya.',
      content: [
        'Penggunaan daging kerbau adalah wujud nyata tepaslira (empati sosial tertinggi) yang menempatkan harmoni persaudaraan di atas kenikmatan pribadi.',
        'Mangkuk kecil melambangkan kesederhanaan hidup santri yang senantiasa qana\'ah (merasa cukup atas rezeki Ilahi).',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Daging kerbau bagian sengkel atau gandik empuk', 'Tauge kacang hijau pendek khas Kudus', 'Nasi putih pulen hangat', 'Kucuran air jeruk nipis segar', 'Bawang putih iris goreng renyah'],
      secretSpices: ['Bawang merah dan bawang putih bakar', 'Kemiri sangrai halus', 'Kunyit bakar pekat', 'Biji pala dan cengkeh sedikit', 'Kayu manis dan serai geprek'],
      processNote: 'Daging kerbau direbus perlahan bersama rempah daun salam dan jahe selama minimal 3 jam hingga kaldunya berwarna kuning bening kecokelatan tanpa jejak bau amis.',
    },
    tastingEtiquette: {
      servingStyle: 'Dihidangkan dalam mangkuk keramik kecil bersendok bebek di atas meja makan kayu panjang.',
      traditionalPairing: 'Wajib ditemani deretan sate telur puyuh kecap, sate paru goreng rempah, perkedel kentang mini, dan kerupuk rambak kerbau.',
      steps: [
        'Sebelum mencampur sambal, hiruplah aroma kepulan kuah kaldu rempah panas dari mangkuk.',
        'Cicipi satu sendok kuah bening murni untuk merasakan kedalaman gurih kaldu daging kerbau.',
        'Tambahkan perasan jeruk nipis dan sambal cabai rawit rebus sesuai selera, lalu santap bersama sate telur puyuh manis gurih.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Soto Kerbau Pak Di Pasar Kliwon',
        address: 'Pasar Kliwon Kudus Lantai Dasar, Demaan, Kudus',
        legacyYear: 'Berdiri sejak 1950-an',
        note: 'Pusat kuliner soto kerbau otentik yang menjadi jujugan para pedagang dan pelancong ziarah Sunan Kudus.',
      },
      {
        name: 'Soto Kudus Bu Jatmi',
        address: 'Jl. Kyai H. Wahid Hasjim No. 43, Panjunan, Kudus',
        legacyYear: 'Berdiri sejak 1982',
        note: 'Terkenal dengan pilihan sate lauk pelengkap yang sangat melimpah dan kaldu bening menyegarkan.',
      },
    ],
    keyTakeaways: [
      'Mahakarya toleransi beragama Sunan Kudus yang menjaga persaudaraan dengan umat Hindu.',
      'Penggunaan daging kerbau menghasilkan kaldu gurih berkarakter mendalam.',
      'Tradisi mangkuk kecil sarat filosofi kesahajaan dan pengendalian diri.',
    ],
  },
  {
    slug: 'dawet-ayu-banjarnegara',
    name: 'Dawet Ayu Banjarnegara',
    javaneseName: 'Dawet Ayu Banjarnegara Asli',
    category: 'minuman-warisan',
    categoryLabel: 'Minuman Warisan',
    region: 'Lembah Dataran Tinggi Dieng',
    city: 'Banjarnegara',
    culturalTheme: 'Kesegaran Alami & Personifikasi Keanggunan Jawa',
    heroImage: '/images/editorial/kuliner-dawetayu.jpg',
    heroImageAlt: 'Segelas Es Dawet Ayu Banjarnegara dengan lapisan santan dan gula kelapa aren',
    heroImageCaption: 'Dawet Ayu Banjarnegara menampilkan gradasi tiga lapis: cairan gula kelapa nangka di dasar, butiran cendol pandan hijau di tengah, dan santan kelapa kental di puncak.',
    flavorProfile: ['Manis Legit Gula Kelapa Aren', 'Harum Alami Pandan Suji', 'Gurih Lembut Santan Murni', 'Aroma Eksotis Buah Nangka'],
    readTime: '4 Menit Baca',
    shortSummary:
      'Minuman dingin pusaka lereng Gunung Dieng dengan pikulan khas berornamen Semar dan Gareng, memadukan cendol tepung beras kenyal, santan, dan juruh gula aren nangka.',
    leadParagraph:
      'Di bawah teriknya matahari Jawa Tengah, tiada kesegaran yang mampu menandingi denting es batu dan siraman juruh gula aren dari sebuah gerobak pikulan berornamen kayu bertatahkan tokoh Semar dan Gareng. Dawet Ayu Banjarnegara adalah minuman legendaris yang memadukan keselarasan rasa manis legit gula kelapa, kelembutan gurih santan segar, dan kekenyalan cendol hijau alami beraroma daun pandan wangi dan daun suji.',
    historyAndOrigin: [
      {
        title: 'Asal-Usul Nama "Ayu" dan Tembang Macapat Ilir-Ilir',
        content: [
          'Ada dua riwayat populer mengenai nama "Dawet Ayu". Riwayat pertama menceritakan tentang seorang penjual dawet di Pasar Banjarnegara pada awal abad ke-20 yang berparas sangat cantik ("ayu" dalam bahasa Jawa), sehingga para pembeli gemar menjulukinya Dawet Ayu.',
          'Riwayat kedua merujuk pada lagu rakyat ciptaan seniman Banjarnegara Bono pada era 1970-an yang mempopulerkan lirik "Dawet Ayu Banjarnegara, seger anyep manis rasane...".',
          'Pikulan dawet ayu tradisional selalu dihiasi dengan ukiran tokoh wayang punokawan Semar dan Gareng di kedua sisinya. Kata "Semar" dan "Gareng" disingkat menjadi "Mareng", yang dalam bahasa Jawa merujuk pada musim kemarau saat cuaca terik dan dawet menjadi pelepas dahaga paling dicari umat manusia.',
        ],
      },
      {
        title: 'Tiga Lapisan Harmonis: Gula, Cendol, dan Santan',
        content: [
          'Keindahan visual dawet ayu terletak pada gradasi tiga lapis alami saat dituangkan ke dalam gelas kaca bening:',
          'Lapisan terbawah adalah "juruh", yaitu cairan kental gula kelapa nira asli yang dimasak lambat bersama potongan buah nangka masak pohon.',
          'Lapisan tengah adalah butiran dawet kenyal berwarna hijau emerald alami hasil tumbukan perasan daun pandan wangi dan daun suji.',
          'Lapisan teratas adalah santan kelapa tua yang dimasak dengan sedikit garam dan daun pandan untuk menciptakan kontras gurih yang menyeimbangkan rasa manis.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Keseimbangan Cipta, Rasa, dan Karsa',
      quote: 'Tiga lapisan dawet ayu adalah cermin dari keharmonisan cipta, rasa, dan karsa: manisnya perbuatan, kesucian batin, dan kebeningan niat hidup.',
      content: [
        'Warna hijau alami daun suji melambangkan kesuburan alam pertiwi di kaki Pegunungan Serayu.',
        'Kehadiran Semar dan Gareng di gerobak pikulan melambangkan kerendahan hati dan humor segar dalam menghadapi liku-liku kehidupan.',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Tepung beras dan sedikit tepung tapioka lokal', 'Perasan air daun pandan wangi dan daun suji pekat', 'Gula kelapa aren asli nira kelapa Banjarnegara', 'Santan segar dari kelapa tua pilihan', 'Potongan buah nangka manis matang'],
      secretSpices: ['Sedikit air kapur sirih alami untuk mengenyalkan butiran cendol', 'Garam kristal untuk memantapkan gurih santan', 'Daun pandan tua untuk rebusan juruh gula aren'],
      processNote: 'Pewarnaan cendol dawet ayu mutlak menggunakan daun suji asli pekarangan, bukan pewarna kimia buatan, sehingga menghasilkan aroma vegetal wangi yang menenangkan jiwa.',
    },
    tastingEtiquette: {
      servingStyle: 'Disajikan dalam gelas kaca tinggi bening atau mangkuk tanah liat (gerabah) klasik berhias sedotan bambu.',
      traditionalPairing: 'Paling nikmat diminum di siang hari ditemani tahu tempe bacem goreng atau getuk goreng Sokaraja.',
      steps: [
        'Sebelum diaduk, pandangi keindahan gradasi warna cokelat, hijau, dan putih di dalam gelas.',
        'Gunakan sendok bebek untuk mengaduk perlahan dari bawah ke atas agar juruh gula aren larut menyatu dengan santan.',
        'Seruput perlahan hingga butiran cendol meluncur kenyal di tenggorokan bersama aroma wangi nangka.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Dawet Ayu Asli Hj. Munardjo',
        address: 'Jl. Mayjend Panjaitan No. 25, Kutabanjarnegara, Banjarnegara',
        legacyYear: 'Pelopor legendaris sejak era 1960-an',
        note: 'Menggunakan gula kelapa murni tanpa campuran pemanis buatan dengan cendol super kenyal.',
      },
      {
        name: 'Dawet Ayu Alun-Alun Banjarnegara',
        address: 'Kompleks Kuliner Alun-Alun Banjarnegara',
        legacyYear: 'Pusat paguyuban pedagang tradisi',
        note: 'Menikmati segelas dawet ayu di bawah keteduhan pohon beringin kembar alun-alun kota.',
      },
    ],
    keyTakeaways: [
      'Minuman kebanggaan Banjarnegara bergradasi tiga lapis warna alami.',
      'Simbol punokawan Semar dan Gareng (Mareng) lambang pelepas dahaga musim kemarau.',
      'Cendol kenyal harum pandan berpadu juruh gula kelapa nira dan nangka semerbak.',
    ],
  },
  {
    slug: 'sate-kere-solo',
    name: 'Sate Kere Solo',
    javaneseName: 'Sate Kere Surakarta',
    category: 'makanan-utama',
    categoryLabel: 'Hidangan Utama',
    region: 'Surakarta Hadiningrat (Solo)',
    city: 'Surakarta',
    culturalTheme: 'Kreativitas Perlawanan Kultural Wong Cilik',
    heroImage: '/images/editorial/kuliner-satekere.jpg',
    heroImageAlt: 'Sate Kere Solo tempe gembus dan jeroan dibakar di atas arang batok kelapa',
    heroImageCaption: 'Sate Kere Solo dari olahan tempe gembus berlumur bumbu bacem manis gurih, disiram sambal kacang pedas bertabur irisan bawang merah segar.',
    flavorProfile: ['Manis Gurih Bumbu Bacem', 'Aroma Asap Arang Batok Kelapa', 'Kenyal Lembut Tempe Gembus', 'Pedas Gurih Sambal Kacang'],
    readTime: '5 Menit Baca',
    shortSummary:
      'Kecerdasan kuliner rakyat jelata Solo di era kolonial yang menciptakan sate dari tempe gembus dan jeroan karena tak mampu membeli daging sapi bangsawan Belanda.',
    leadParagraph:
      'Pada masa kolonial Hindia Belanda di Surakarta, aroma daging sapi dan kambing panggang yang mengepul dari rumah-rumah saudagar kaya dan pejabat Belanda hanyalah angan-angan bagi kaum jelata (wong cilik). Namun kemiskinan materi tidak pernah mematikan kecerdikan rasa manusia Jawa. Dari keterbatasan inilah lahir "Sate Kere" (secara harafiah bermakna sate orang miskin), sebuah manifestasi perlawanan budaya yang mengubah ampas tahu (tempe gembus) dan jeroan sapi sederhana menjadi santapan bergengsi tinggi yang kini diburu para presiden dan tokoh bangsa.',
    historyAndOrigin: [
      {
        title: 'Subversi Rasa: Meniru Santapan Kaum Menak',
        content: [
          'Pada awal abad ke-20 di Solo, daging sapi berharga sangat mahal dan hanya dapat dinikmati kaum bangsawan keraton dan petinggi kolonial Belanda.',
          'Masyarakat jelata yang ingin merasakan nikmatnya sate memanfaatkan tempe gembus—hasil fermentasi ampas tahu sisa pembuatan tahu sutra—dan jeroan sapi buangan seperti torpedo, usus, babat, koyor, dan tetelan.',
          'Bahan-bahan bersahaja ini diolah dengan teknik tinggi: direbus berjam-jam dalam racikan bumbu bacem gula kelapa, ketumbar, dan bawang merah hingga bumbu meresap ke dalam pori-pori terdalam tempe gembus. Saat dibakar di atas arang batok kelapa, lemak yang menetes memicu aroma harum yang tak kalah menggoda dari sate daging termahal sekalipun.',
        ],
      },
      {
        title: 'Dari Makanan Pinggir Jalan Menuju Meja Istana Negara',
        content: [
          'Dahulu sate kere dijajakan oleh ibu-ibu berpakaian kebaya lurik dengan menggendong tenggok bambu berkeliling kampung.',
          'Kini, sate kere telah bertransformasi menjadi kuliner prestisius khas Solo yang disajikan dalam jamuan kenegaraan resmi di Istana Kepresidenan, membuktikan bahwa kemuliaan rasa tidak ditentukan oleh mahalnya bahan dasar, melainkan keikhlasan dan kepiawaian dalam mengolahnya.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Urip Iku Urup: Menemukan Berkah di Balik Keterbatasan',
      quote: 'Sate kere adalah monumen ketabahan jiwa rakyat jelata: bahwa kemiskinan tidak menghalangi martabat manusia untuk menciptakan kebahagiaan rasa.',
      content: [
        'Pemanfaatan ampas tahu mengajarkan falsafah ramah lingkungan dan anti-pemborosan pangan (zero waste cuisine).',
        'Nama "kere" yang dipertahankan tanpa rasa malu merupakan wujud kejujuran sejarah dan kebanggaan atas akar tradisi kerakyatan.',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Tempe gembus padat segar dari ampas tahu kedelai murni', 'Jeroan sapi lokal (babat, usus, koyor, dan kikil)', 'Tusuk sate bambu buatan tangan', 'Arang batok kelapa untuk pengasapan optimal'],
      secretSpices: ['Gula kelapa aren asli Jawa', 'Biji ketumbar sangrai ulek', 'Bawang merah dan bawang putih kating', 'Asam jawa matang pohon', 'Bumbu kacang tanah giling kasar pedas manis'],
      processNote: 'Tempe gembus harus direbus lambat (diungkep) dalam kuah bacem selama minimal 2 jam agar teksturnya mengenyal dan bumbu manis gurih meresap sempurna sebelum proses pemanggangan arang.',
    },
    tastingEtiquette: {
      servingStyle: 'Disajikan hangat di atas wadah pincuk daun pisang bersama potongan lontong pulen.',
      traditionalPairing: 'Disiram saus sambal kacang kental hangat, ditaburi rajangan bawang merah mentah dan irisan cabai rawit pedas.',
      steps: [
        'Tarik potongan tempe gembus bakar dari tusuk bambunya menggunakan garpu atau jemari.',
        'Gulingkan ke dalam saus sambal kacang bacem yang gurih kental.',
        'Kunyah bersama sepotong lontong daun dan irisan bawang merah mentah untuk menyeimbangkan rasa manis karamel arang.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Sate Kere Yu Rebi',
        address: 'Jl. Kebangkitan Nasional No. 1, Penumping, Laweyan, Surakarta (Belakang Stadion Sriwedari)',
        legacyYear: 'Didirikan sejak 1986',
        note: 'Warung sate kere paling kondang di Solo, langganan para pejabat negara dan keluarga kepresidenan.',
      },
      {
        name: 'Sate Kere Mbak Tug Pasar Gede',
        address: 'Pintu Masuk Pasar Gede Hardjonagoro, Surakarta',
        legacyYear: 'Berdiri sejak era 1970-an',
        note: 'Menyajikan sate kere tempe gembus legendaris dengan kuah kacang kental aroma daun jeruk.',
      },
    ],
    keyTakeaways: [
      'Simbol perlawanan kultural dan kecerdasan kuliner wong cilik Surakarta di era kolonial.',
      'Mengubah tempe gembus dan jeroan menjadi hidangan bacem bakar berkelas istana.',
      'Kaya filosofi kesederhanaan, anti-pemborosan pangan, dan kebanggaan identitas kerakyatan.',
    ],
  },
  {
    slug: 'garang-asem-kudus',
    name: 'Garang Asem Kudus',
    javaneseName: 'Garang Asem Semawis & Kudus',
    category: 'makanan-utama',
    categoryLabel: 'Hidangan Utama',
    region: 'Jalur Pantura Jawa Tengah',
    city: 'Kudus & Pekalongan',
    culturalTheme: 'Kesegaran Pedas Asam & Harmoni Aroma Daun Pisang',
    heroImage: '/images/editorial/kuliner-garangasem.jpg', // Temporarily mapped
    heroImageAlt: 'Garang Asem Ayam Kampung mengepul dalam bungkusan daun pisang',
    heroImageCaption: 'Garang Asem Ayam Kampung berkuah santan belimbing wuluh segar dan cabai rawit merah kukus dalam balutan daun pisang yang harum.',
    flavorProfile: ['Asam Segar Belimbing Wuluh', 'Pedas Ceplus Cabai Rawit Utuh', 'Gurih Santan Kaldu Ayam Kampung', 'Wangi Daun Pisang Kukus'],
    readTime: '5 Menit Baca',
    shortSummary:
      'Olahan ayam kampung berkuah santan encer gurih yang dikukus di dalam bungkusan daun pisang bersama belimbing wuluh dan cabai rawit pedas meledak.',
    leadParagraph:
      'Di sepanjang lintasan jalan raya pos pesisir utara Jawa Tengah, kepulan uap harum daun pisang yang baru diangkat dari dandang kukusan selalu mengundang selera setiap musafir. Garang Asem adalah hidangan mahakarya yang mendobrak stereotip bahwa masakan Jawa selalu berkarakter manis pekat. Perpaduan asam segar belimbing wuluh (belimbing sayur), pedasnya cabai rawit utuh, dan kehangatan kuah santan kelapa menghasilkan ledakan cita rasa yang menyegarkan raga seketika.',
    historyAndOrigin: [
      {
        title: 'Teknik Memasak Tum: Rahasia Penguncian Kaldu Alami',
        content: [
          'Nama "Garang Asem" berasal dari dua kata bahasa Jawa: "garang" yang bermakna dipanaskan atau dikukus di atas api, dan "asem" yang merujuk pada rasa asam menyegarkan buah belimbing wuluh.',
          'Masyarakat pedesaan di Kudus, Pati, dan Pekalongan mengembangkan teknik membungkus ayam potongan bersama bumbu iris mentah di dalam beberapa lapis daun pisang klutuk tebal yang disemat biting lidi (teknik bungkusan tum).',
          'Saat dikukus selama berjam-jam di atas bara api, daun pisang mengunci sari pati kaldu ayam kampung agar tidak menguap keluar, sementara air belimbing wuluh melunakkan serat daging ayam hingga sangat lembut dan sarat bumbu.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Keseimbangan Rasa Panas dan Dingin',
      quote: 'Garang asem mengajarkan kita mengelola gejolak hidup: pedasnya tantangan dapat dinetralkan oleh segarnya kebijaksanaan dan kehangatan rasa persaudaraan.',
      content: [
        'Rasa asam belimbing wuluh berfungsi sebagai pembersih lemak alami yang menjaga kesehatan pencernaan manusia.',
        'Wadah daun pisang yang menghitam terkena uap panas melambangkan bahwa keindahan sejati tersembunyi di balik kesederhanaan lahiriah yang bersahaja.',
      ],
    },
    ingredientsAndSpices: {
      mainIngredients: ['Ayam kampung muda potong kecil berserat gurih', 'Belimbing wuluh (belimbing sayur) segar iris bulat', 'Cabai rawit merah dan hijau utuh', 'Santan kelapa encer segar', 'Daun pisang klutuk tebal untuk membungkus'],
      secretSpices: ['Bawang merah dan bawang putih iris tipis', 'Tomat hijau iris dadu', 'Lengkuas merah dan jahe memar', 'Daun salam petik segar', 'Serai iris halus'],
      processNote: 'Ayam kampung tidak digoreng terlebih dahulu, melainkan langsung dimarinasi bersama santan dan bumbu iris mentah di dalam bungkusan daun pisang sebelum dikukus minimal 90 menit.',
    },
    tastingEtiquette: {
      servingStyle: 'Disajikan langsung di dalam bungkusan daun pisang yang dibuka di atas piring cekung agar kuahnya tidak tumpah.',
      traditionalPairing: 'Disantap bersama nasi putih hangat beras mentik, tempe goreng mendoan, dan kerupuk udang renyah.',
      steps: [
        'Buka sematan biting lidi daun pisang secara hati-hati selagi masih mengepul panas.',
        'Hiduplah aroma wangi perpaduan daun pisang layu, belimbing wuluh, dan kaldu ayam yang menguar seketika.',
        'Sendokkan kuah asam pedas bersama suwiran daging ayam dan gigit sebutir cabai rawit utuh untuk sensasi pedas meledak.',
      ],
    },
    legendaryLocations: [
      {
        name: 'Garang Asem Sari Rasa Kudus',
        address: 'Jl. AKBP Agil Kusumadya No. 20, Kudus',
        legacyYear: 'Didirikan sejak 1975',
        note: 'Ikon kuliner garang asem paling tersohor di jalur Pantura Jawa Tengah dengan kuah santan asam pedas medok.',
      },
      {
        name: 'Garang Asem Mas Gas Pekalongan',
        address: 'Jl. Hayam Wuruk No. 89, Pekalongan',
        legacyYear: 'Berdiri sejak 1980',
        note: 'Menyajikan varian garang asem kuah bening tanpa santan yang sangat segar dan beraroma rempah kuat.',
      },
    ],
    keyTakeaways: [
      'Mendobrak stereotip rasa masakan Jawa dengan karakter asam segar dan pedas meledak.',
      'Teknik memasak kukus bungkusan daun pisang (tum) mengunci sari kaldu murni ayam kampung.',
      'Belimbing wuluh dan cabai rawit utuh menjadi jangkar kesegaran kuliner pesisir Pantura.',
    ],
  },
];

export function getKulinerArticleBySlug(slug: string): KulinerArticle | undefined {
  return kulinerArticles.find((article) => article.slug === slug);
}

export function getAllKulinerSlugs(): string[] {
  return kulinerArticles.map((article) => article.slug);
}
