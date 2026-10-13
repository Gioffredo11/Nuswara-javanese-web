export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  funExplanation: string;
}

export interface LakonQuiz {
  storySlug: string;
  title: string;
  subtitle: string;
  badgeTitle: string;
  questions: QuizQuestion[];
}

export const lakonQuizzesData: Record<string, LakonQuiz> = {
  'bima-suci': {
    storySlug: 'bima-suci',
    title: 'Kuis Kearifan & Asah Nalar: Bima Suci',
    subtitle: 'Uji pemahamanmu tentang laku spiritual sang ksatria penakluk samudra!',
    badgeTitle: 'Pujangga Samudra Minangkalbu 🌊',
    questions: [
      {
        id: 'bs-1',
        question: 'Kenapa Werkudara tetap nekat mencari Tirta Perwitasari ke laut ganas padahal sudah diperingatkan saudaranya bahwa Durna dihasut Sengkuni?',
        options: [
          'Karena Bima memang hobi diving dan renang di laut lepas',
          'Karena memegang prinsip Guru Susrusa: ketulusan murid mematuhi titah guru demi ilmu sejati',
          'Karena Bima taruhan makan sate buntel sama Arjuna',
          'Supaya bisa pamer kekuatan Kuku Pancanaka di depan penduduk pesisir'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat sekali! 🌟 Dalam etika Jawa purba, "Guru Susrusa" adalah kepatuhan suci murid. Niat tulus murid sanggup mengubah racun muslihat menjadi air berkah kasampurnan!'
      },
      {
        id: 'bs-2',
        question: 'Naga raksasa "Nabawarna" yang dilawan Bima di dasar palung laut melambangkan apa dalam falsafah hidup?',
        options: [
          'Sembilan warna cat tembok keraton Astina yang belum kering',
          'Hewan peliharaan Batara Guru yang kabur dari kolam kahyangan',
          'Sembilan ragam hawa nafsu dan keraguan duniawi yang harus ditundukkan batin',
          'Spesies belut purba laut dalam yang langka'
        ],
        correctIndex: 2,
        funExplanation:
          'Hebat! 🐉 Naga Nabawarna adalah simbol hawa nafsu wadag (babahan hawa sanga). Menaklukkan naga berarti menaklukkan ego dan hawa nafsu sendiri!'
      },
      {
        id: 'bs-3',
        question: 'Bagaimana cara Bima yang berbadan raksasa bisa masuk ke dalam tubuh Dewa Ruci yang sekecil telapak tangan bayi?',
        options: [
          'Minum ramuan jamu pengecil badan racikan Semar',
          'Masuk melalui lubang telinga kiri dengan kepasrahan mutlak tanpa kesombongan wadag',
          'Memakai pintu ajaib doraemon versi pewayangan',
          'Ditiup angin puting beliung hingga menyusut'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat 100%! ✨ Telinga melambangkan kepekaan menangkap isyarat gaib ketuhanan. Sukma sejati itu tak berhingga besarnya dibanding raga lahiriah!'
      },
      {
        id: 'bs-4',
        question: 'Setelah meraih pencerahan Manunggaling Kawula Gusti, pesan penting apa yang diberikan Dewa Ruci kepada Bima?',
        options: [
          'Tinggal saja di dasar laut selamanya dan pensiun dari dunia politik',
          'Kembali ke marcapada untuk mengabdi, menegakkan keadilan, dan bermanfaat bagi sesama (Urip Iku Urup)',
          'Segera membalas dendam dan menghancurkan padepokan Resi Durna',
          'Membuka kursus spiritual berbayar di keraton Amarta'
        ],
        correctIndex: 1,
        funExplanation:
          'Mantap sekali! 🌿 Spiritualitas Jawa sejati tidak mengajak orang lari dari kenyataan hidup, melainkan turun kembali ke masyarakat membawa manfaat nyata (Urip Iku Urup)!'
      }
    ]
  },
  'gatotkaca-gugur': {
    storySlug: 'gatotkaca-gugur',
    title: 'Kuis Seru Pahlawan Angkasa: Gatotkaca Gugur',
    subtitle: 'Seberapa kenal kamu dengan pahlawan otot kawat balung wesi?',
    badgeTitle: 'Ksatria Dirgantara Sejati ⚡',
    questions: [
      {
        id: 'gg-1',
        question: 'Kenapa perang malam pada hari ke-14 Bharatayuda dianggap melanggar aturan suci Dharmayuddha?',
        options: [
          'Karena tarif listrik penerangan Kurusetra sangat mahal di malam hari',
          'Menurut etika ksatria purba, perang wajib berhenti saat matahari terbenam untuk merawat korban',
          'Para dewa di kahyangan sudah jam tidur dan tidak suka berisik',
          'Kuda dan gajah perang sering mengantuk dan mogok jalan'
        ],
        correctIndex: 1,
        funExplanation:
          'Benar! ⚔️ Perang zaman dahulu memiliki kode etik kehormatan tinggi: malam hari adalah waktu gencatan senjata untuk menghormati jenazah dan merawat yang terluka.'
      },
      {
        id: 'gg-2',
        question: 'Pusaka apa yang dikenakan Gatotkaca sehingga mampu melayang bebas di angkasa membelah awan Kurusetra?',
        options: [
          'Sepatu roda emas buatan Antareja',
          'Rompi Kotang Antakusuma dan Caping Basunanda',
          'Parasut sutra warisan kakeknya Prabu Pandu',
          'Balon udara tradisional dari desa Pringgandani'
        ],
        correctIndex: 1,
        funExplanation:
          'Juara! ☁️ Rompi Kotang Antakusuma memberi daya terbang tanpa sayap, sedangkan Caping Basunanda melindungi sang ksatria dari sengatan hawa panas dan panah musuh!'
      },
      {
        id: 'gg-3',
        question: 'Kenapa Adipati Karna awalnya sangat berat hati melepaskan Senjata Kuntawijayadanu kepada Gatotkaca?',
        options: [
          'Karena tombak itu berat dan tangannya sedang pegal',
          'Senjata Kunta hanya berdaya satu kali seumur hidup dan disiapkan khusus untuk menandingi Arjuna',
          'Karna takut dimarahi ibunya Dewi Kunti jika senjatanya hilang',
          'Pusaka Kunta belum diasah ulang oleh empu pandai besi'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat! 🎯 Pusaka Kunta adalah kartu truf pamungkas Karna. Terpaksa membuangnya untuk Gatotkaca berarti membatalkan garansi kemenangan Karna melawan Arjuna esok hari!'
      },
      {
        id: 'gg-4',
        question: 'Apa aksi heroik terakhir yang dilakukan Gatotkaca beberapa detik sebelum menghembuskan napas terakhirnya?',
        options: [
          'Minta difoto oleh prajurit juru warta Kurusetra',
          'Memperbesar jasad raksasanya dan menjatuhkan diri tepat ke atas kereta tempur musuh Kurawa',
          'Meneriakkan pantun perpisahan kepada pamannya Arjuna',
          'Mencuri kembali senjata Kunta dari tangan Karna'
        ],
        correctIndex: 1,
        funExplanation:
          'Luar biasa! 💥 Bahkan saat menjelang ajal, Gatotkaca menggunakan sisa tenaga terakhirnya untuk menghancurkan satu divisi kereta Kurawa demi melindungi keselamatan barisannya!'
      }
    ]
  },
  'srikandi-belajar-memanah': {
    storySlug: 'srikandi-belajar-memanah',
    title: 'Kuis Ketangkasan & Emansipasi: Srikandi Belajar Memanah',
    subtitle: 'Uji fokus batin dan pemahamanmu tentang ksatria putri pertama di jagad pakeliran!',
    badgeTitle: 'Senapati Srikandi Mandraguna 🏹',
    questions: [
      {
        id: 'sm-1',
        question: 'Apa alasan utama Dewi Srikandi menolak perintah kraton untuk sekadar duduk manis menenun kain di bilik keputrian?',
        options: [
          'Karena Srikandi alergi debu benang tenun istana',
          'Ia bertekad menjaga kedaulatan tanah air dengan tangannya sendiri jika musuh menyerang',
          'Supaya bisa flexing skill memanah di depan para putri kerajaan tetangga',
          'Ingin mencari jodoh ksatria yang jago berburu rusa di hutan'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat sekali! 🌸 Srikandi mematahkan pandangan feodal kuno bahwa pertahanan negara hanya urusan laki-laki. Ia pionir emansipasi berintegritas tinggi!'
      },
      {
        id: 'sm-2',
        question: 'Menurut ajaran Raden Arjuna di Madukara, apa rahasia terpenting dalam seni memanah Gandiwa?',
        options: [
          'Makan telur ayam kampung setengah matang sebelum latihan',
          'Menundukkan amarah, menyatukan cipta-rasa-karsa, dan pasrah pada kehendak Hyang Widhi',
          'Membeli busur panah impor termahal dari negeri seberang',
          'Memicu tali busur dengan kecepatan setinggi mungkin tanpa hening'
        ],
        correctIndex: 1,
        funExplanation:
          'Brilian! 🎯 Memanah dalam budaya Jawa adalah laku spiritual olah batin. Ketenangan batin menentukan presisi anak panah yang meluncur!'
      },
      {
        id: 'sm-3',
        question: 'Ujian ketangkasan puncak apa yang berhasil ditaklukkan Srikandi di lembah Madukara hingga membuat Arjuna takjub?',
        options: [
          'Memanah buah mangga manis di halaman keputrian',
          'Membidik tepat tangkai sehelai daun kering yang melayang liar ditiup angin kencang',
          'Menembak lalat yang hinggap di hidung Petruk',
          'Memanah sasaran diam dari jarak dua langkah'
        ],
        correctIndex: 1,
        funExplanation:
          'Hebat! 🍃 Menembus tangkai daun kering yang melayang di udara melambangkan kesatuan rasa dengan alam sekitar tanpa distraksi keraguan!'
      },
      {
        id: 'sm-4',
        question: 'Falsafah "Ngluruk Tanpa Bala, Menang Tanpa Ngasorake" yang diamalkan Srikandi memiliki arti apa?',
        options: [
          'Berangkat perang sendirian tanpa membawa bekal makan siang',
          'Berani berjuang tanpa bergantung massa, serta menang tanpa merendahkan martabat pihak lawan',
          'Menyerah sebelum bertarung agar tidak ada yang sakit hati',
          'Menang dengan cara menyembunyikan pasukan di dalam goa rahasia'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat 100%! 🕊️ Filosofi luhur Jawa ini mengajarkan kemandirian jiwa dan keluhuran budi: mengalahkan kekeliruan tanpa mempermalukan martabat kemanusiaan siapapun!'
      }
    ]
  },
  'karna-tanding': {
    storySlug: 'karna-tanding',
    title: 'Kuis Dilema Ksatria: Karna Tanding',
    subtitle: 'Uji wawasanmu tentang perang saudara paling mengharukan dalam wiracarita pewayangan!',
    badgeTitle: 'Ksatria Surya Berbudi Luhur ☀️',
    questions: [
      {
        id: 'kt-1',
        question: 'Apa janji mulia yang diucapkan Adipati Karna kepada ibunya, Dewi Kunti, di tepian Bengawan Gangga?',
        options: [
          'Berjanji akan mentraktir makan seluruh Pandawa setelah perang selesai',
          'Berjanji tidak akan membunuh empat Pandawa lainnya dan hanya akan berduel melawan Arjuna',
          'Berjanji akan pura-pura pingsan saat peluit perang dibunyikan',
          'Berjanji akan membagi takhta Astina menjadi sepuluh bagian yang sama'
        ],
        correctIndex: 1,
        funExplanation:
          'Benar sekali! 🤍 Dengan janji ini, Karna memastikan Dewi Kunti akan tetap memiliki lima orang anak, apa pun hasil pertarungan esok hari!'
      },
      {
        id: 'kt-2',
        question: 'Mengapa Karna menolak ajakan Dewi Kunti untuk bergabung bersama adik-adiknya Pandawa menjelang perang?',
        options: [
          'Karena Karna tidak suka seragam perang Amarta yang berwarna putih',
          'Karena pantang berkhianat pada Duryodana yang telah mengangkat martabatnya dari kehinaan anak kusir',
          'Karena Karna ingin memimpin perang sendirian tanpa sekutu',
          'Karena Duryodana menjanjikan liburan keliling nusantara'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat! 🤝 Nilai kesetiaan dan balas budi (Serat Tripama): Karna memilih menanggung takdir pahit daripada dicap sebagai ksatria oportunis pengkhianat budi.'
      },
      {
        id: 'kt-3',
        question: 'Apa yang dilakukan Sri Kresna saat anak panah sakti Kyai Ardhadadali milik Karna membidik tepat leher Arjuna?',
        options: [
          'Menyiram panah itu dengan seember air kelapa muda',
          'Menginjak lantai kereta hingga roda melesak sejengkal ke lumpur sehingga panah hanya mengenai mahkota gelung',
          'Berteriak memanggil bantuan para dewa penunggu angin',
          'Menangkap anak panah itu dengan mulutnya'
        ],
        correctIndex: 1,
        funExplanation:
          'Hebat! 🛡️ Kecerdikan Sri Kresna menyelamatkan nyawa Arjuna: kereta diturunkan sejengkal ke dalam lumpur sehingga panah sakti hanya menyambar mahkota Arjuna!'
      },
      {
        id: 'kt-4',
        question: 'Sifat kepribadian utama apa yang membuat nama Adipati Karna tetap harum dan dihormati kedua belah pihak hingga kini?',
        options: [
          'Koleksi baju perangnya yang sangat banyak dan mewah',
          'Kedermawanan mutlak tanpa pamrih dan kesetiaan teguh memegang janji ksatria',
          'Kemampuannya berpidato dengan suara menggelegar',
          'Ketrampilan berkuda gaya bebas di padang pasir'
        ],
        correctIndex: 1,
        funExplanation:
          'Juara! 🌟 Karna dikenal sebagai ksatria paling dermawan (Danapati). Ia tak pernah menolak permintaan siapa pun yang datang memohon pertolongan!'
      }
    ]
  },
  'semar-mbangun-kayangan': {
    storySlug: 'semar-mbangun-kayangan',
    title: 'Kuis Jenaka & Satir Rakyat: Semar Mbangun Kayangan',
    subtitle: 'Asah tawa dan nalar kritismu bersama keluarga Punokawan Karangtumaritis!',
    badgeTitle: 'Pamomong Jagad Adiluhung 🎭',
    questions: [
      {
        id: 'sk-1',
        question: 'Apa arti sejati dari niat Kyai Semar "Mbangun Kayangan" yang sempat dicurigai makar oleh para ksatria Amarta?',
        options: [
          'Mendirikan gedung pencakar langit bertingkat seratus di desa Karangtumaritis',
          'Membangun kesadaran moral para pemimpin, membersihkan hati dari ketamakan, dan memakmurkan rakyat jelata',
          'Membeli pulau terpencil untuk tempat berlibur para punokawan',
          'Mendirikan pabrik krupuk dan rokok klobot terbesar di tanah Jawa'
        ],
        correctIndex: 1,
        funExplanation:
          'Tepat sekali! 🌾 "Mbangun Kayangan" adalah satir budaya: kayangan sejati adalah tatanan negara yang adil di mana lumbung padi rakyat terisi penuh tanpa kelaparan!'
      },
      {
        id: 'sk-2',
        question: 'Ciri khas fisik Petruk adalah hidung panjang dan kantong celana bolong (Kanthong Bolong). Apa makna filosofisnya?',
        options: [
          'Suka bohong seperti Pinokio dan suka lupa menaruh kunci',
          'Berwawasan tajam mencium ketidakadilan, dermawan, dan pantang menimbun harta haram (anti-korupsi)',
          'Sering tertusuk ranting pohon saat berjalan di hutan',
          'Baju yang dipakai adalah baju bekas lungsuran Gareng'
        ],
        correctIndex: 1,
        funExplanation:
          'Brilian! 💰 Kanthong Bolong melambangkan sifat dermawan: apa yang didapat segera dialirkan untuk menolong sesama, tidak menimbun kekayaan hasil menipu rakyat!'
      },
      {
        id: 'sk-3',
        question: 'Siapakah jati diri sejati Kyai Lurah Semar yang tersingkap saat Arjuna berniat menghalanginya dengan busur Gandiwa?',
        options: [
          'Jin sakti penunggu pohon beringin Karangtumaritis',
          'Batara Ismaya, dewa purba tertua abang kandung Batara Guru yang memilih menjadi pelindung rakyat jelata',
          'Mantan perdana menteri kerajaan Astina yang sedang menyamar',
          'Pangeran dari negeri seberang lautan'
        ],
        correctIndex: 1,
        funExplanation:
          'Hebat! ⚡ Semar adalah Batara Ismaya. Sosoknya mengajarkan bahwa suara rakyat jelata (wong cilik) sesungguhnya membawa kedaulatan nurani tertinggi!'
      },
      {
        id: 'sk-4',
        question: 'Sikap apa yang harus diambil generasi muda saat melihat ketidakadilan di sekitarnya, meneladani Punokawan?',
        options: [
          'Cuek bebek dan fokus main game sepanjang hari',
          'Berani bersuara kritis dengan cara cerdas, berintegritas, santun, dan membawa solusi nyata bagi sesama',
          'Ikut-ikutan mencela tanpa mau berkontribusi memperbaiki keadaan',
          'Pura-pura tidak melihat agar tetap aman dan nyaman sendiri'
        ],
        correctIndex: 1,
        funExplanation:
          'Sempurna! 💡 Meneladani Punokawan: kritis berani, berhati jenaka menyejukkan suasana, namun pantang mundur memperjuangkan kebenaran rakyat banyak!'
      }
    ]
  }
};
