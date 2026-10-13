export interface SejarahArticle {
  slug: string;
  eraNumber: string;
  eraPeriod: string;
  eraSubheading: string;
  title: string;
  shortSummary: string;
  leadParagraph: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  sections: Array<{
    title: string;
    content: string[];
    highlightQuote?: string;
  }>;
  keyTakeaways: string[];
  historicalFigures: string[];
  relatedPath: string;
  relatedLabel: string;
}

export const sejarahArticles: SejarahArticle[] = [
  {
    slug: 'era-keagungan-candi',
    eraNumber: '01',
    eraPeriod: 'Abad VIII - X M',
    eraSubheading: 'KERAJAAN MATARAM KUNO',
    title: 'Era Keagungan Candi & Pemujaan Semesta',
    shortSummary:
      'Pembangunan Candi Borobudur oleh Dinasti Syailendra dan Candi Prambanan oleh Rakai Pikatan. Fondasi kosmologi yang memuliakan harmoni antara manusia, alam, dan Sang Pencipta.',
    leadParagraph:
      'Di bawah naungan gunung-gunung api megah di jantung Jawa Tengah, Dinasti Syailendra dan Wangsa Sanjaya memahat sebuah peradaban batu yang melintasi ribuan tahun. Dari Candi Borobudur yang menjulang di lembah Kedu hingga gugusan Candi Prambanan yang ramping menusuk angkasa, bumi Mataram Kuno menjadi saksi bertemunya spiritualitas agung, toleransi keyakinan, dan penghormatan mutlak kepada keteraturan alam semesta.',
    readTime: '6 Menit Baca',
    heroImage: '/images/editorial/candi-relief.jpg',
    heroImageAlt: 'Relief Candi Borobudur peninggalan Mataram Kuno',
    heroImageCaption:
      'Relief pahatan andesit Candi Borobudur, menggambarkan kisah Karmawibhangga dan perjalanan spiritual manusia menuju pencerahan batin.',
    sections: [
      {
        title: 'Harmonisasi Dua Wangsa: Syailendra dan Sanjaya',
        content: [
          'Pada abad ke-8 hingga ke-10 Masehi, dataran subur Jawa Tengah diperintah oleh dua kekuatan besar: Dinasti Syailendra yang memeluk agama Buddha Mahayana dan Wangsa Sanjaya yang berpegang teguh pada ajaran Siwa Hindu.',
          'Alih-alih saling menaklukkan, kedua wangsa ini memilih jalur persekutuan luhur melalui perkawinan politik antara Rakai Pikatan dari Wangsa Sanjaya dengan Pramodhawardhani, putri mahkota Dinasti Syailendra. Perpaduan ini melahirkan masa keemasan seni arsitektur dan toleransi yang jarang tertandingi di dunia purba.',
          'Prasasti Wanua Tengah III dan Prasasti Canggal menegaskan bagaimana masyarakat agraris Mataram Kuno hidup makmur dengan mengelola sawah berundak, sistem perairan komunal, serta mempersembahkan karya seni batu monumental sebagai ungkapan rasa syukur kepada Sang Pencipta.',
        ],
        highlightQuote:
          'Kearifan Mataram Kuno mengajarkan bahwa perbedaan keyakinan bukan jurang pemisah, melainkan dua sayap doa yang mengantarkan kemakmuran peradaban.',
      },
      {
        title: 'Kosmologi Borobudur: Kamadhatu, Rupadhatu, dan Arupadhatu',
        content: [
          'Dibangun di bawah arahan arsitek legendaris Gunadharma sekitar tahun 750 hingga 825 Masehi, Candi Borobudur dirancang sebagai stupa mandala raksasa yang mencerminkan struktur kosmologi alam semesta Buddha.',
          'Bagian dasar candi (Kamadhatu) memuat 160 relief Karmawibhangga yang melukiskan hukum sebab-akibat dan belenggu hawa nafsu manusia di dunia fana.',
          'Tingkatan tengah (Rupadhatu) memuat relief Lalitavistara dan Jataka yang menceritakan riwayat Sang Buddha menaklukkan ego dan menggapai kemurnian budi.',
          'Puncaknya adalah tiga teras melingkar (Arupadhatu) yang menaungi 72 stupa berterawang dan satu stupa induk polos tanpa hiasan, lambang pencapaian Sunyata atau keheningan batin mutlak yang terbebas dari wujud fisik.',
        ],
      },
      {
        title: 'Prambanan dan Pemujaan Dewa Trimurti',
        content: [
          'Sebagai penyeimbang Borobudur di dataran timur, Candi Prambanan (Siwagrha) didirikan oleh Rakai Pikatan sekitar tahun 856 Masehi. Kompleks percandian Hindu terbesar di Asia Tenggara ini didedikasikan untuk Trimurti: Siwa sang pelebur, Brahma sang pencipta, dan Wisnu sang pemelihara.',
          'Candi Siwa setinggi 47 meter berdiri di pusat lingkaran suci, dihiasi relief epos Ramayana dan Krishnayana yang diukir dengan detail ekspresi manusiawi yang amat dinamis.',
          'Bagi peradaban Jawa, mendirikan candi bukan sekadar menumpuk batu, melainkan ritual penyelarasan jagad alit (mikrokosmos batin manusia) dengan jagad ageng (makrokosmos semesta).',
        ],
      },
      {
        title: 'Spiritualitas Gunung Api dan Samudra Selatan',
        content: [
          'Masyarakat Mataram Kuno memandang Gunung Merapi sebagai poros kosmik tempat bersemayamnya para dewa dan sumber kesuburan abu vulkanik, sementara samudra di selatan melambangkan kedalaman misteri kehidupan.',
          'Fondasi nilai inilah yang di kemudian hari menjadi akar falsafah Memayu Hayuning Bawana: kewajiban manusia Jawa untuk terus menjaga keharmonisan, keindahan, dan kelestarian ekosistem bumi tempat mereka berpijak.',
        ],
      },
    ],
    keyTakeaways: [
      'Simbol toleransi peradaban tertua melalui kolaborasi Syailendra (Buddha) dan Sanjaya (Hindu).',
      'Arsitektur batu andesit berorientasi kosmologi semesta dan perjalanan elevasi spiritual manusia.',
      'Akar filosofi Memayu Hayuning Bawana yang memuliakan keseimbangan ekologis antara gunung, manusia, dan sawah pertiwi.',
    ],
    historicalFigures: [
      'Rakai Pikatan (Raja Mataram Kuno)',
      'Pramodhawardhani (Putri Syailendra)',
      'Gunadharma (Arsitek Candi Borobudur)',
      'Dyah Balitung (Raja Pemersatu Mataram)',
    ],
    relatedPath: '/#monumen',
    relatedLabel: 'Jelajahi Monumen & Candi Sakral',
  },
  {
    slug: 'akulturasi-wayang-kulit',
    eraNumber: '02',
    eraPeriod: 'Abad XVI - XVIII M',
    eraSubheading: 'KESULTANAN ISLAM PESISIR & MATARAM ISLAM',
    title: 'Akulturasi Wayang Kulit & Tembang Macapat',
    shortSummary:
      'Para wali menggubah wayang kulit purwa menjadi sarana dakwah dan tuntunan budi pekerti. Munculnya gamelan keraton, serat-serat piwulang, dan keselarasan rasa batin Jawa.',
    leadParagraph:
      'Ketika peradaban Islam berlabuh di pesisir utara Jawa Tengah, para wali dan cendekiawan tanah Jawa tidak meruntuhkan bangunan kebudayaan masa lalu, melainkan meniupkan nyawa dan makna baru ke dalamnya. Seni pertunjukan wayang purwa, syair-syair tembang macapat, dan alunan gamelan keraton bermetamorfosis menjadi sarana penyempurnaan budi pekerti yang mempertemukan tasawuf ketuhanan dengan keluhuran rasa batin Nusantara.',
    readTime: '7 Menit Baca',
    heroImage: '/images/editorial/wayang-kelir.jpg',
    heroImageAlt: 'Kelir wayang kulit purwa dengan bayangan wayang klasik Jawa',
    heroImageCaption:
      'Pertunjukan wayang kulit purwa di balik kelir dan blencong, simbol manusia yang menyaksikan bayang-bayang kehendak Ilahi di panggung dunia.',
  sections: [
      {
        title: 'Sunan Kalijaga dan Metamorfosis Wayang Kulit',
        content: [
          'Sebelum abad ke-16, kisah wayang umumnya dipentaskan melalui wayang beber berwujud lukisan gulungan manusia nyata. Karena penghormatan terhadap kaidah Islam mengenai representasi makhluk hidup, Sunan Kalijaga bersama para wali merombak wujud wayang menjadi stilasi simbolik.',
          'Figur wayang digambar dengan proporsi tangan yang panjang melampaui lutut, hidung yang distilasi miring, serta tubuh berbahan kulit kerbau yang ditatah ornamen tembus pandang.',
          'Inovasi ini justru melahirkan mahakarya estetika baru: wayang kulit purwa. Kelir (layar putih) melambangkan alam fana tempat manusia berlakon, blencong (lampu minyak) melambangkan cahaya ketuhanan, dan dalang merepresentasikan Sang Maha Pencipta yang menggerakkan setiap tarikan nafas takdir.',
        ],
        highlightQuote:
          'Wayang dudu mung tontonan, nanging tuntunan tumraping laku: wayang bukan sekadar hiburan mata, melainkan penuntun laku hidup menuju ketenteraman sejati.',
      },
      {
        title: 'Lakon Pewayangan sebagai Kitab Falsafah Hidup',
        content: [
          'Dalam era Kesultanan Demak hingga Keraton Pajang dan Mataram Islam di Kotagede serta Surakarta, para pujangga keraton menyusun serat-serat lakon dengan dimensi spiritual mendalam.',
          'Lakon Bima Suci (Dewa Ruci) menjadi rujukan utama pencarian hakikat jati diri, di mana ksatria perkasa Bima menyelam ke samudra terdalam demi menemukan air perwitasari dan akhirnya bertemu miniatur dirinya sendiri yang suci.',
          'Tokoh Semar, Gareng, Petruk, dan Bagong (Punokawan) diperkenalkan sebagai rakyat jelata yang bijak, simbol bahwa hikmah kebenaran sering kali terbit dari kesederhanaan dan ketulusan batin rakyat jelata.',
        ],
      },
      {
        title: 'Tembang Macapat: Siklus Perjalanan Jiwa Manusia',
        content: [
          'Selain wayang, para ulama dan sastrawan keraton menciptakan tembang macapat, yaitu 11 metrum puisi berlagu yang merepresentasikan seluruh siklus perjalanan hidup manusia dari alam kandungan hingga alam baka:',
          '1. Maskumambang: Jiwa manusia yang masih mengambang di rahim sang ibu.',
          '2. Mijil: Lahirnya jabang bayi ke dunia fana.',
          '3. Sinom: Masa remaja yang penuh dengan rasa ingin tahu dan pencarian jati diri.',
          '4. Kinanthi: Masa pembentukan karakter yang membutuhkan bimbingan orang tua dan guru.',
          '5. Asmaradana: Berseminya api asmara dan ketertarikan antarmanusia.',
          '6. Gambuh: Pernikahan dan penyatuan tekad dua keluarga.',
          '7. Dhandhanggula: Puncak kenikmatan hidup, keberhasilan karier, dan manisnya rezeki.',
          '8. Durma: Munculnya tantangan, kepedulian sosial, dan keharusan membela keadilan.',
          '9. Pangkur: Mulai menarik diri dari hiruk pikuk nafsu duniawi dan mendekat pada Sang Khaliq.',
          '10. Megatruh: Terpisahnya nyawa dari raga (sakratul maut).',
          '11. Pocung: Tahap akhir ketika jasad dibungkus kain kafan dan bersiap mempertanggungjawabkan amalan.',
        ],
      },
      {
        title: 'Harmoni Gamelan Keraton dan Olah Rasa Keheningan',
        content: [
          'Gamelan laras Slendro dan Pelog dirancang bukan untuk memacu adrenalin, melainkan untuk menenangkan detak jantung dan mengheningkan pikiran liar manusia.',
          'Melalui bunyi gong pamungkas yang bergaung rendah, manusia Jawa diingatkan pada titik awal dan titik akhir hidup: Sangkan Paraning Dumadi (dari mana kita berasal dan ke mana kita akan kembali).',
        ],
      },
    ],
    keyTakeaways: [
      'Inovasi genius Sunan Kalijaga mentransformasikan wayang beber menjadi wayang kulit simbolik.',
      '11 Tembang Macapat sebagai peta navigasi filosofis perjalanan manusia sejak dalam rahim hingga wafat.',
      'Penyatuan nilai ketauhidan dengan kearifan rasa batin Jawa dalam serat piwulang dan gamelan keraton.',
    ],
    historicalFigures: [
      'Sunan Kalijaga (Wali Perancang Wayang & Gamelan)',
      'Sultan Agung Hanyokrokusumo (Raja Mataram Islam & Pembaharu Kalender Jawa)',
      'Kyai Lurah Semar (Simbol Kearifan Batin Rakyat)',
      'Paku Buwana IV (Penggubah Serat Wulangreh)',
    ],
    relatedPath: '/wayangpedia',
    relatedLabel: 'Eksplorasi Ensiklopedia Wayangpedia',
  },
  {
    slug: 'ksatria-modern',
    eraNumber: '03',
    eraPeriod: 'Abad XIX - XXI M',
    eraSubheading: 'PERGERAKAN NASIONAL & IDENTITAS DIGITAL',
    title: 'Ksatria Modern: Literasi, Pendidikan, & Kelestarian',
    shortSummary:
      'Perjuangan Pangeran Diponegoro, R.A. Kartini, hingga Ki Hadjar Dewantara menegakkan martabat batin bangsa. Hari ini, Nuswara meneruskan estafet nilai tersebut ke ranah digital.',
    leadParagraph:
      'Perjuangan ksatria tanah Jawa tidak pernah berakhir di padang Kurusetra atau medan perang masa lampau. Ketika bangsa ini berhadapan dengan gelombang kolonialisme dan modernitas yang mencabut akar tradisi, kepahlawanan berganti rupa menjadi keberanian pena, kecerdasan nalar, dan keteguhan moral. Dari gerilya batin Pangeran Diponegoro, korespondensi emansipasi R.A. Kartini, hingga sekolah rakyat Ki Hadjar Dewantara, martabat peradaban Jawa tetap menyala hingga era transformasi digital hari ini.',
    readTime: '6 Menit Baca',
    heroImage: '/images/editorial/tokoh-diponegoro.jpg',
    heroImageAlt: 'Lukisan heroisme Pangeran Diponegoro memimpin Perang Jawa',
    heroImageCaption:
      'Pangeran Diponegoro di atas kuda hitam, memimpin perlawanan Perang Jawa (1825-1830) demi martabat kemanusiaan dan kedaulatan tanah air.',
    sections: [
      {
        title: 'Pangeran Diponegoro: Keteguhan Moral dan Perang Jawa',
        content: [
          'Antara tahun 1825 hingga 1830, Perang Jawa berkecamuk dan mengguncang kekuasaan kolonial Hindia Belanda hingga ke batas kebangkrutan.',
          'Di balik keahlian taktik gerilyanya, Pangeran Diponegoro adalah seorang mistikus dan bangsawan terpelajar yang menolak kompromi moral keraton yang telah terkorupsi oleh politik adu domba.',
          'Selama masa pembuangannya di Manado dan Makassar, beliau menulis Babad Diponegoro, sebuah autobiografi sastra luhur sepanjang ratusan halaman tembang macapat yang kini diakui UNESCO sebagai Memory of the World.',
        ],
        highlightQuote:
          'Ksatria sejati bukan yang pedangnya paling tajam, melainkan yang hatinya paling tabah menegakkan kebenaran di tengah reruntuhan zaman.',
      },
      {
        title: 'R.A. Kartini: Terobosan Nalar dan Emansipasi Akal Budi',
        content: [
          'Dari balik tembok keraton Jepara yang membelenggunya dalam adat pingitan kaku, Raden Adjeng Kartini menuliskan gagasan-gagasan modern yang melampaui zamannya.',
          'Melalui surat-suratnya yang terkumpul dalam Habis Gelap Terbitlah Terang, Kartini menegaskan bahwa memajukan perempuan bukan sekadar menuntut hak setara, melainkan menyiapkan pendidik pertama bagi generasi masa depan bangsa.',
          'Beliau mencintai ukiran kayu Jepara, memperjuangkan nasib para perajin lokal, dan mempromosikan batik ke kancah internasional sebagai bukti keagungan intelektual dan ketelitian perempuan Jawa.',
        ],
      },
      {
        title: 'Ki Hadjar Dewantara dan Falsafah Pendidikan Merdeka',
        content: [
          'Raden Mas Soewardi Soerjaningrat menanggalkan gelar bangsawannya demi melebur menjadi Ki Hadjar Dewantara, bapak pendidikan nasional pendiri Perguruan Tamansiswa pada tahun 1922.',
          'Beliau mewariskan trilogi kepemimpinan pendidikan yang abadi hingga hari ini:',
          '• Ing Ngarso Sung Tulodho: Di depan menjadi teladan utama moralitas.',
          '• Ing Madyo Mangun Karso: Di tengah memompa semangat, prakarsa, dan kreativitas.',
          '• Tut Wuri Handayani: Di belakang memberikan dorongan moril dan kepercayaan penuh bagi generasi penerus.',
          'Bagi Dewantara, pendidikan bukan pabrik mencetak tenaga kerja, melainkan proses memanusiakan manusia agar mandiri lahir dan batin.',
        ],
      },
      {
        title: 'NUSWARA: Estafet Warisan Luhur ke Ranah Digital',
        content: [
          'Hari ini, di tengah derasnya arus globalisasi dan disrupsi kecerdasan buatan, tantangan terbesar kita bukan lagi penjajahan bersenjata, melainkan amnesia kultural.',
          'Platform NUSWARA hadir sebagai jembatan masa kini untuk menghidupkan kembali khazanah wayang, relief candi, dan filsafat luhur Jawa ke dalam antarmuka interaktif, ensiklopedia visual 3D, dan narasi digital yang dapat diakses oleh siapa saja di seluruh penjuru dunia.',
          'Kita adalah ksatria masa kini yang bertugas menjaga nyala api kebudayaan agar tetap relevan, dibanggakan, dan menerangi peradaban Nusantara ke masa depan.',
        ],
      },
    ],
    keyTakeaways: [
      'Babad Diponegoro sebagai warisan literasi perlawanan yang diakui UNESCO.',
      'Visi emansipasi akal budi dan preservasi kerajinan lokal oleh Raden Adjeng Kartini.',
      'Trilogi kepemimpinan Ki Hadjar Dewantara sebagai fondasi pendidikan kemandirian manusia.',
      'Peran platform digital NUSWARA meneruskan nilai-nilai luhur budaya Jawa ke generasi masa depan.',
    ],
    historicalFigures: [
      'Pangeran Diponegoro (Pemimpin Perang Jawa)',
      'R.A. Kartini (Pelopor Emansipasi & Literasi Bangsa)',
      'Ki Hadjar Dewantara (Bapak Pendidikan Nasional)',
      'Generasi Digital NUSWARA (Pelestari Warisan Budaya)',
    ],
    relatedPath: '/#tokoh',
    relatedLabel: 'Lihat Galeri Tokoh & Pahlawan Jawa',
  },
];

export function getSejarahArticleBySlug(slug: string): SejarahArticle | undefined {
  return sejarahArticles.find((art) => art.slug === slug);
}
