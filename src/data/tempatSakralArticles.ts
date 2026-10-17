export interface SacredLocationDetail {
  address: string;
  historicalEra: string;
  builtBy: string;
  elevation?: string;
  bestTimeToVisit: string;
}

export interface TempatSakralArticle {
  slug: string;
  name: string;
  javaneseName?: string;
  category: 'candi-buddha' | 'candi-hindu' | 'situs-islam-walisongo' | 'situs-megalitikum-lawu';
  categoryLabel: string;
  region: string;
  city: string;
  spiritualTheme: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  highlights: string[];
  readTime: string;
  shortSummary: string;
  leadParagraph: string;
  spiritualAndHistoricalNarrative: Array<{
    title: string;
    content: string[];
  }>;
  philosophicalMeaning: {
    title: string;
    quote: string;
    content: string[];
  };
  sacredArchitecture: {
    symbolism: string;
    features: string[];
    sacredRelicsOrArtifacts: string[];
  };
  spiritualEtiquette: {
    mindset: string;
    dressCode: string;
    prohibitionsAndRules: string[];
  };
  locationDetails: SacredLocationDetail;
  keyTakeaways: string[];
}

export const tempatSakralArticles: TempatSakralArticle[] = [
  {
    slug: 'candi-borobudur',
    name: 'Candi Borobudur',
    javaneseName: 'Candhi Barabudhur',
    category: 'candi-buddha',
    categoryLabel: 'Situs Buddha Suci • Mahakarya Dunia',
    region: 'Lembah Kedu & Progo',
    city: 'Magelang',
    spiritualTheme: 'Mandala Kosmik dan Pendakian Kesadaran Batin Menuju Nirwana',
    heroImage: '/images/editorial/monumen-borobudur.jpg',
    heroImageAlt: 'Siluet stupa Candi Borobudur saat fajar keemasan di Magelang',
    heroImageCaption: 'Fajar merekah di pelataran puncak Borobudur, mempertemukan keheningan stupa berterawang dengan kabut magis Lembah Kedu.',
    highlights: ['Piramida Berundak Buddha Terbesar di Dunia', '2.672 Panel Relief Filosofis', '504 Arca Buddha', 'UNESCO World Heritage'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Mahakarya Dinasti Syailendra abad ke-8 yang memvisualisasikan mandala raksasa. Menuntun peziarah melintasi tiga alam kesadaran: Kamadhatu, Rupadhatu, hingga heningnya Arupadhatu.',
    leadParagraph:
      'Diapit oleh dua pasang gunung kembar—Merapi-Merbabu dan Sindoro-Sumbing—serta dua aliran sungai suci Elo dan Progo, Candi Borobudur berdiri tegak bukan sekadar sebagai monumen batu andesit raksasa. Ia dirancang para leluhur Mataram Kuno sebagai kitab suci tiga dimensi dan diagram kosmik (mandala) yang mengajak manusia menempuh perjalanan spiritual: melepaskan belenggu hasrat hewani menuju pencerahan sejati.',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Kisah Pembangunan oleh Dinasti Syailendra & Sosok Gunadharma',
        content: [
          'Borobudur dibangun sekitar tahun 750 hingga 842 Masehi di bawah kepemimpinan raja-raja Wangsa Syailendra yang menganut agama Buddha Mahayana. Dalam tradisi lisan rakyat Jawa Tengah, arsitek agung di balik rancang bangun stupa bertingkat ini diyakini bernama Gunadharma, sosok suci yang konon siluet tubuhnya kini membujur menjadi punggung Bukit Menoreh yang memagari candi.',
          'Pembangunan Borobudur membutuhkan waktu hampir satu abad, memotong dan menyusun lebih dari 2 juta balok batu andesit vulkanik tanpa menggunakan perekat semen sama sekali, melainkan memanfaatkan teknik penguncian batu (interlocking system) yang amat presisi.',
          'Selama berabad-abad pasca-letusan dahsyat Gunung Merapi dan berpindahnya pusat kekuasaan ke Jawa Timur, Borobudur sempat tertidur lelap di bawah timbunan abu vulkanik dan belantara hutan tropis, sebelum akhirnya ditemukan kembali pada tahun 1814 oleh Sir Thomas Stamford Raffles dan insinyur H.C. Cornelius.',
        ],
      },
      {
        title: 'Pradaksina: Ritual Putaran Suci Searah Jarum Jam',
        content: [
          'Secara spiritual, menjelajahi Borobudur sesungguhnya adalah ibadah laku hening. Tradisi kuno mengajarkan peziarah untuk melakukan Pradaksina—berjalan kaki mengelilingi setiap lorong lorong candi secara berulang searah jarum jam sambil menempatkan candi di sisi kanan.',
          'Setiap langkah pradaksina dari lantai terendah menuju puncak membawa peziarah membaca untaian relief: mulai dari hukum karma yang tak terelakkan, teladan welas asih Bodhisattva, hingga kisah pengembaraan spiritual Sudhana mencari hakikat kebijaksanaan tertinggi dalam naskah Gandavyuha.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Triloka: Tiga Tingkatan Spiritual Manusia',
      quote: 'Kemanusiaan sejati bermula ketika kita mengenali gelapnya nafsu, melatih kesadaran budi pekerti, lalu melarutkan ego ke dalam keheningan semesta yang tanpa wujud.',
      content: [
        'Kamadhatu (Kaki Candi): Melambangkan alam bawah, dunia manusia yang masih dikuasai oleh hawa nafsu inderawi, amarah, keserakahan, dan keterikatan duniawi sebagaimana digambarkan dalam relief Karmawibhangga.',
        'Rupadhatu (Empat Lorong Berundak Persegi): Alam peralihan di mana manusia telah mampu menaklukkan nafsu kasar, namun masih terikat pada bentuk, nama, dan wujud jasmani. Dindingnya dihiasi kisah Lalitavistara dan Jataka.',
        'Arupadhatu (Tiga Teras Melingkar & Stupa Induk): Alam tanpa wujud, puncak kemerdekaan jiwa. Tidak ada lagi relief cerita; hanya lingkaran suci, 72 stupa berongga belah ketupat dan bujur sangkar yang menaungi arca Buddha, berpusat pada Stupa Induk yang sunyi dan hampa—lambang Nirwana.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Stupa dan Teratai Mekar di Atas Lembah Purba',
      features: [
        'Sistem tata air tersembunyi berwujud Makara (pancuran berkepala monster air) yang mengalirkan air hujan keluar candi.',
        'Orientasi astronomis yang selaras sempurna dengan sumbu terbit matahari dan rasi bintang suci Waisak.',
        'Stupa Induk puncak yang sengaja dibuat tertutup rapat tanpa rongga, melambangkan kebenaran sejati yang melampaui segala konsepsi kata dan penglihatan mata.',
      ],
      sacredRelicsOrArtifacts: [
        'Relief Karmawibhangga yang kini tertutup kaki penopang tambahan.',
        'Arca Buddha dalam mudra Dharmachakra (memutar roda dharma) di teras Arupadhatu.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Heningkan cipta (manekung), bawa niat untuk menghormati leluhur dan menjaga kesucian batin.',
      dressCode: 'Mengenakan pakaian sopan tertutup; peziarah yang mengenakan celana/rok di atas lutut wajib mengenakan kain jarik batik penutup.',
      prohibitionsAndRules: [
        'Dilarang keras menyentuh, menduduki, memanjat, atau bersandar pada relief dan stupa.',
        'Menjaga ketenangan suara dan tidak berteriak atau membuat kegaduhan di teras suci Arupadhatu.',
        'Dilarang merokok dan membawa makanan ke atas struktur monumen candi.',
      ],
    },
    locationDetails: {
      address: 'Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah 56553',
      historicalEra: 'Abad VIII - IX Masehi (c. 750 - 825 M)',
      builtBy: 'Wangsa Syailendra (Raja Samaratungga & Pramodhawardhani)',
      elevation: '265 mdpl',
      bestTimeToVisit: 'Saat fajar merekah (05.30 - 07.00 WIB) untuk menikmati keteduhan batin dan pemandangan halimun kabut Lembah Kedu.',
    },
    keyTakeaways: [
      'Borobudur bukan sekadar objek foto, melainkan piramida mandala meditasi terbesar di bumi.',
      'Perjalanan mendaki teras candi mengajarkan evolusi jiwa dari keterikatan hasrat menuju kemerdekaan spiritual.',
      'Harmoni antara alam pegunungan Jawa Tengah dan kosmologi Buddha tercermin utuh dalam setiap jengkal batu andesitnya.',
    ],
  },
  {
    slug: 'dataran-tinggi-dieng',
    name: 'Kompleks Candi Dieng',
    javaneseName: 'Candhi Dhiyang & Telaga Warna',
    category: 'candi-hindu',
    categoryLabel: 'Kompleks Candi Hindu Tertua • Tanah Para Dewata',
    region: 'Pegunungan Dieng',
    city: 'Wonosobo & Banjarnegara',
    spiritualTheme: 'Di Hyang: Tempat Bersemayamnya Dewata di Puncak Kabut Purba',
    heroImage: '/images/editorial/monumen-dieng.jpg',
    heroImageAlt: 'Kompleks Candi Arjuna Dieng berselimut kabut pagi pegunungan',
    heroImageCaption: 'Kompleks Candi Arjuna berdiri khidmat di tengah mangkuk kaldera Dieng, di kelilingi uap belerang dan kabut abadi para dewa.',
    highlights: ['Candi Tertua di Tanah Jawa (Abad VII M)', 'Ketinggian Lebih dari 2.000 mdpl', 'Pemujaan Dewa Siwa Trinetra', 'Telaga Warna & Kawah Sikidang'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Lembah suci vulkanik Mataram Kuno yang dipercaya sebagai panggung persemayaman para dewa. Dihiasi gugusan candi wayang purwa seperti Candi Arjuna, Semar, Puntadewa, dan Gatotkaca.',
    leadParagraph:
      'Nama "Dieng" berasal dari paduan bahasa Kawi kuno: "Di" yang bermakna tempat tinggi atau gunung, dan "Hyang" yang berarti dewa atau roh suci leluhur. Di ketinggian 2.093 meter di atas permukaan laut, dataran vulkanik ini dipilih oleh para pertapa Hindu Siwa kuno sebagai altar persembahyangan paling sakral di tanah Jawa, karena letaknya yang menembus awan dan paling dekat dengan langit kahyangan.',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Asal-Usul Kompleks Candi Tertua di Jawa Tengah',
        content: [
          'Dibangun pada rentang abad ke-7 hingga ke-8 Masehi pada masa awal Kerajaan Kalingga dan Mataram Hindu, Candi Dieng diperkirakan lebih tua dari Borobudur dan Prambanan.',
          'Pada mulanya, dataran tinggi ini merupakan pusat asrama keagamaan (pendidikan spiritual dan pertapaan) bagi para brahmana dan ksatria. Sekitar 400 candi konon pernah berdiri di sini, namun sebagian besar telah tertimbun rawa purba dan erosi vulkanik, menyisakan gugusan utama yang kini dinamai berdasarkan tokoh-tokoh wayang purwa Mahabharata.',
        ],
      },
      {
        title: 'Penamaan Karakter Pewayangan: Harmoni Hindu dan Folklor Jawa',
        content: [
          'Menariknya, prasasti asli tidak menyebut candi-candi ini dengan nama tokoh wayang. Penamaan seperti Candi Arjuna, Candi Semar, Candi Srikandi, Candi Puntadewa, hingga Candi Bima disematkan oleh penduduk lokal Jawa berabad-abad kemudian sebagai bentuk penghormatan dan akulturasi cerita rakyat.',
          'Candi Bima memiliki arsitektur paling unik bergaya Shikhara India Utara dengan hiasan relung kudu (wajah dewa yang melongok keluar jendela batu), sedangkan Candi Arjuna dan Candi Semar mencerminkan dualisme filosofis pamong dan ksatria pengayom bumi.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Keseimbangan Alam Kahyangan dan Gejolak Perut Bumi',
      quote: 'Dieng menyadarkan kita bahwa kesucian tertinggi sering kali bertetangga langsung dengan kekuatan alam yang paling dahsyat—mengajarkan rasa rendah hati di hadapan Hyang Widhi.',
      content: [
        'Kawah belerang Sikidang dan kawah Candradimuka melambangkan kawah penyucian batin manusia: tempat segala ego dan kesombongan ditempa agar lahir pribadi ksatria sejati.',
        'Telaga Warna yang airnya dapat berganti rona kehijauan, keemasan, dan kebiruan karena pantulan mineral belerang melambangkan keberagaman watak jiwa manusia yang harus diselaraskan demi mencapai kedamaian.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Bentuk Candi Kubus Sederhana Berorientasi Puncak Mahameru',
      features: [
        'Atap bertingkat bergaya Dravida sederhana dengan lingga-yoni di bilik utama (garbhagrha).',
        'Kala-makara berwajah monster penjaga pintu masuk tanpa rahang bawah untuk menelan segala energi buruk sebelum memasuki ruang suci.',
        'Candi Semar yang berdiri persis di depan Candi Arjuna sebagai candi perwara (pendamping), melambangkan sifat kesederhanaan dan keteduhan batin Semar.',
      ],
      sacredRelicsOrArtifacts: [
        'Yoni batu sakral tempat upacara penyucian amerta (air suci dewa).',
        'Relief kepala dewa pada jendela candi (kudu) yang menatap ke lembah abadi.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Mawas diri, menjaga kesantunan lisan, dan tidak meremehkan dinginnya kabut mistis Dieng.',
      dressCode: 'Pakaian hangat berlapis yang sopan dan menutup aurat demi kenyamanan suhu udara yang dapat mendekati 0 derajat Celsius.',
      prohibitionsAndRules: [
        'Tidak membuang sampah sembarangan di areal pelataran suci candi dan kawah belerang.',
        'Menghormati tradisi anak berambut gimbal (anak bajang titipan Kyai Kolodete) saat upacara pemotongan rambut ruwatan berlangsung.',
        'Dilarang melangkah melangkahi sesajen atau dupa yang diletakkan para peziarah di dekat lingga yoni.',
      ],
    },
    locationDetails: {
      address: 'Desa Dieng Kulon, Kecamatan Batur, Kabupaten Banjarnegara & Wonosobo, Jawa Tengah 53456',
      historicalEra: 'Abad VII - VIII Masehi (c. 650 - 750 M)',
      builtBy: 'Raja-raja Mataram Kuno (Dinasti Sanjaya awal)',
      elevation: '2.093 mdpl',
      bestTimeToVisit: 'Pukul 06.00 - 09.00 WIB ketika kabut tipis tersibak sinar matahari pagi dan hawa dingin masih membekukan embun upas.',
    },
    keyTakeaways: [
      'Gugusan candi Hindu tertua yang menghubungkan kosmologi dewata Siwa dengan lanskap vulkanik spektakuler.',
      'Pertemuan antara mitologi wayang purwa Jawa dan tradisi arsitektur batu kuno.',
      'Pusat ziarah alam yang menggetarkan rasa spiritual melalui keheningan pegunungan dan telaga warna.',
    ],
  },
  {
    slug: 'candi-cetho',
    name: 'Candi Cetho',
    javaneseName: 'Candhi Cetha (Inggil Lawu)',
    category: 'situs-megalitikum-lawu',
    categoryLabel: 'Punden Berundak Megalitikum • Gerbang Kahyangan Lawu',
    region: 'Lereng Barat Gunung Lawu',
    city: 'Karanganyar',
    spiritualTheme: 'Punden Berundak Ruwatan & Pensucian Jiwa di Pelataran Kabut Suci',
    heroImage: '/images/editorial/monumen-cetho.jpg',
    heroImageAlt: 'Gerbang Candi Bentar Candi Cetho berlatar perbukitan berkabut di Gunung Lawu',
    heroImageCaption: 'Gapura megah Candi Cetho membelah halimun lereng Lawu, gerbang batu purba tempat para resi Majapahit akhir menyucikan diri.',
    highlights: ['Punden Berundak 13 Teras Megalitikum', 'Situs Ruwatan Era Majapahit Akhir (1475 M)', 'Ketinggian 1.496 mdpl di Atas Kebun Teh', 'Tradisi Ibadah Umat Hindu Jawa & Kejawen'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Kuil batu mistis di punggung barat Gunung Lawu dengan gerbang candi bentar yang menembus kabut langit. Saksi bisu pelarian spiritual para resi Majapahit akhir untuk melangsungkan ruwatan suci.',
    leadParagraph:
      'Bertengger di ketinggian 1.496 meter di atas permukaan laut di antara hamparan hijau perkebunan teh Kemuning, Candi Cetho memiliki aura spiritual yang sangat berbeda dari candi-candi di dataran rendah Jawa Tengah. Bangunannya bukan stupa berkubah atau menara ramping bergaya India, melainkan punden berundak megalitikum asli Nusantara—sebuah bukti bangkitnya kembali kepercayaan asli pemujaan arwah leluhur di penghujung keruntuhan imperium Majapahit.',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Kembalinya Arsitektur Asli Nusantara di Era Majapahit Akhir',
        content: [
          'Berdasarkan prasasti beraksara Jawa Kuno pada teras ke-7, Candi Cetho diperkirakan dibangun sekitar tahun 1475 Masehi pada masa pemerintahan Bhre Kertabhumi (Brawijaya V), raja terakhir Majapahit.',
          'Ketika stabilitas politik di ibu kota Trowulan runtuh akibat perang saudara dan peralihan kekuasaan, para pemuka agama dan resi keraton menyingkir ke tempat-tempat sunyi di lereng gunung suci Mahameru dan Lawu. Di sini, pengaruh arsitektur India ditinggalkan dan digantikan oleh arsitektur bertingkat (punden berundak) yang mirip piramida berteras tradisi animisme purba ribuan tahun sebelumnya.',
        ],
      },
      {
        title: 'Makna "Cetha": Kejelasan dan Keterbukaan Penglihatan Batin',
        content: [
          'Kata "Cetho" dalam bahasa Jawa bermakna "jelas", "terang", atau "gamblang". Penamaan ini memiliki dua lapisan arti.',
          'Secara fisik, dari puncak teras candi ini seseorang dapat memandang bebas ke segala penjuru mata angin: melihat Kota Solo, Gunung Merapi, dan Gunung Merbabu tanpa halangan saat langit bersih.',
          'Secara batiniah, mendaki ke-13 teras Candi Cetho dimaknai sebagai proses membersihkan kekeruhan pikiran dan nafsu duniawi hingga mata batin manusia menjadi "cetha" (terbuka terang) dalam memandang hakikat Ketuhanan.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Kosmologi Kura-Kura Penyangga Semesta & Simbol Kesuburan Purba',
      quote: 'Ketika peradaban duniawi hancur, manusia kembali ke pelukan gunung sunyi—menemukan bahwa ketulusan doa tidak butuh kemegahan istana, melainkan kesucian sukma.',
      content: [
        'Pada lantai teras ketiga, terdapat susunan batu berbentuk garuda raksasa membentangkan sayap dengan motif kura-kura raksasa (Kurma Avatara) di punggungnya, melambangkan Samudramanthana—pengadukan lautan susu untuk mencari air keabadian amerta.',
        'Lambang phallus (lingga) dan yoni berukuran besar pada pelataran suci menegaskan filosofi "Sangkan Paraning Dumadi"—mengingatkan manusia dari mana asal mula kehidupan fisik diciptakan dan ke mana jiwa akan kembali berpulang.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Struktur Teras Berjenjang 13 Tingkat Menuju Langit Murni',
      features: [
        'Candi Bentar (gapura terbelah) megah yang membingkai langit terbuka dan lautan kabut awan.',
        'Situs altar persembahyangan akhir berbentuk piramida terpancung di teras tertinggi yang masih aktif digunakan untuk sembahyang dupa umat Hindu Dharma.',
        'Relief kisah Sudamala yang memuat ajaran ruwatan: pembebasan Dewi Durga dari kutukan raksasa oleh Sahadewa.',
      ],
      sacredRelicsOrArtifacts: [
        'Arca peninggalan resi dan pendeta bertapa berpostur tegak khas seni Majapahit akhir.',
        'Batu tatanan lambang surya dan kura-kura kosmik.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Jaga kebersihan hati, jangan berbicara congkak atau berbuat asusila di kawasan sakral.',
      dressCode: 'Wajib memakai kain poleng (kain motif kotak hitam-putih khas pura) yang diikatkan di pinggang sebelum memasuki area utama candi.',
      prohibitionsAndRules: [
        'Dilarang melangkah sembarangan atau melangkahi sesaji dupa yang tengah menyala.',
        'Dilarang memasuki batas suci ruang paling atas (teras utama) jika tidak bertujuan untuk bersembahyang / meditasi hening.',
        'Wanita yang sedang datang bulan dilarang memasuki kawasan peribadatan suci demi menghormati tatanan tradisi lokal.',
      ],
    },
    locationDetails: {
      address: 'Dusun Cetho, Desa Gumeng, Kecamatan Jenawi, Kabupaten Karanganyar, Jawa Tengah 57794',
      historicalEra: 'Abad XV Masehi (c. 1475 M)',
      builtBy: 'Masyarakat spiritual era Majapahit Akhir (Masa Brawijaya V)',
      elevation: '1.496 mdpl',
      bestTimeToVisit: 'Sore menjelang matahari terbenam (16.00 - 17.30 WIB) saat kabut gunung turun menyelimuti gerbang batu seperti mengambang di atas awan.',
    },
    keyTakeaways: [
      'Punden berundak unik yang menjadi saksi kebangkitan jati diri arsitektur asli Nusantara di era akhir Majapahit.',
      'Tempat suci ruwatan batin untuk melepaskan segala kutukan dan beban karma masa lalu.',
      'Pemandangan alam spektakuler di atas awan lereng barat Gunung Lawu.',
    ],
  },
  {
    slug: 'candi-sukuh',
    name: 'Candi Sukuh',
    javaneseName: 'Candhi Sukuh (Piramida Lawu)',
    category: 'situs-megalitikum-lawu',
    categoryLabel: 'Piramida Batu Bertingkat • Altar Ruwatan Sakral',
    region: 'Lereng Barat Gunung Lawu',
    city: 'Karanganyar',
    spiritualTheme: 'Pelepasan Kutukan, Kemurnian Purba, dan Kemandirian Rohani',
    heroImage: '/images/editorial/monumen-sukuh.jpg',
    heroImageAlt: 'Bangunan piramida terpancung Candi Sukuh dikelilingi hutan cemara Gunung Lawu',
    heroImageCaption: 'Bentuk piramida terpotong Candi Sukuh yang memukau para arkeolog dunia, menyerupai kuil suku Maya namun sarat filosofi ruwatan Jawa.',
    highlights: ['Bentuk Piramida Terpancung Mirip Kuil Maya', 'Pusat Upacara Ruwatan Pembebasan Jiwa', 'Arca Kura-Kura Meja Altar Raksasa', 'Relief Sudamala & Garudeya'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Situs paling misterius dan kontroversial di Nusantara. Menghadirkan struktur piramida terpancung dengan relief kejujuran anatomi purba dan narasi ruwatan Sudamala demi memerdekakan jiwa manusia.',
    leadParagraph:
      'Tersembunyi di lereng sejuk Gunung Lawu pada ketinggian 910 meter dpl, Candi Sukuh kerap membuat para penjelajah dunia terperangah. Arsitekturnya yang menyerupai piramida suku Maya di Chichen Itza Meksiko memicu kekaguman mendalam. Namun di balik keunikan bentuk fisiknya, Sukuh sesungguhnya adalah mahakarya teologi Jawa kuno yang didedikasikan untuk upacara ruwatan: membebaskan manusia dari kutukan duniawi dan dosa masa silam.',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Misteri Piramida Terpancung di Hutan Pinus',
        content: [
          'Candi Sukuh diperkirakan didirikan sekitar tahun 1437 Masehi, ditandai dengan berbagai candrasengkala memet di antaranya berbunyi "Gopura Buta Mangan Wong" (Gapura raksasa memakan orang) yang melambangkan angka tahun saka.',
          'Berbeda dari candi-candi Mataram Kuno yang memiliki proporsi anggun nan simetris dengan ukiran halus, pahatan di Candi Sukuh terkesan sederhana, kokoh, dan primitif—mirip arca gaya megalitikum Pasemah. Hal ini mencerminkan keterbebasan para pembangunnya dari dogma ortodoks keraton.',
        ],
      },
      {
        title: 'Upacara Ruwatan Sudamala & Garudeya',
        content: [
          'Dinding candi Sukuh dipenuhi kisah pembebasan jiwa. Kisah pertama adalah Garudeya: cerita tentang burung Garuda yang rela mempertaruhkan nyawanya mencari air keabadian Tirta Amerta demi membebaskan ibunya, Winata, dari perbudakan ular Kadru.',
          'Kisah kedua adalah Sudamala: di mana ksatria bungsu Pandawa, Sahadewa, dirasuki Dewa Siwa untuk meruwat Batari Durga yang berwujud raksasa mengerikan agar kembali menjadi Dewi Uma yang jelita dan bercahaya.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Kejujuran Asal Kehidupan Tanpa Tabu Semu',
      quote: 'Di Candi Sukuh, ketelanjangan bukan sensualitas kotor, melainkan lambang kepolosan mutlak manusia saat menghadap Hyang Maha Pencipta tanpa topeng kepalsuan.',
      content: [
        'Relief sengkalan berupa lambang lingga dan yoni di lantai gerbang masuk berfungsi sebagai "swastika batin": setiap orang yang melangkah melangkahi relief tersebut diyakini telah luntur segala niat jahat, kutukan, dan kekotoran batinnya.',
        'Meja altar berbentuk kura-kura raksasa dengan punggung datar di puncak piramida melambangkan stabilitas bumi yang menopang perjalanan vertikal jiwa manusia menuju keabadian.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Piramida Truncated Sebagai Tangga Astral Jiwa',
      features: [
        'Tangga sempit berlorong curam yang menembus badan piramida, memaksa orang menundukkan kepala dan merapatkan tubuh saat mendaki.',
        'Tiga arca kura-kura raksasa berukir indah di depan pelataran utama.',
        'Relief penempaan keris oleh Empu Rama dan Empu Permadi di hadapan Dewa Ganesha—menggambarkan proses penempaan jiwa manusia laksana sebilah keris pusaka.',
      ],
      sacredRelicsOrArtifacts: [
        'Arca Phallus monumental setinggi 1,82 meter (kini disimpan di Museum Nasional Jakarta).',
        'Relief Garudeya memanggul kendi air amerta.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Pandanglah setiap relief dengan kacamata kesucian filosofis, bukan dengan prasangka nafsu mesum.',
      dressCode: 'Mengenakan pakaian sopan dan kain jarik penghormatan yang disediakan di pos masuk.',
      prohibitionsAndRules: [
        'Dilarang melakukan tindakan tidak senonoh atau memperolok relief-relief kesuburan.',
        'Dilarang menduduki punggung arca kura-kura purba atau relief rapuh di pelataran piramida.',
        'Menjaga ketenangan dan kebersihan lingkungan sekitar situs.',
      ],
    },
    locationDetails: {
      address: 'Desa Berjo, Kecamatan Ngargoyoso, Kabupaten Karanganyar, Jawa Tengah 57793',
      historicalEra: 'Abad XV Masehi (c. 1437 M)',
      builtBy: 'Masyarakat Pertapa Lereng Lawu era Majapahit Akhir',
      elevation: '910 mdpl',
      bestTimeToVisit: 'Pagi hari sekitar pukul 08.00 - 10.30 WIB ketika udara masih sejuk segar dan kabut belum menutupi detail relief piramida.',
    },
    keyTakeaways: [
      'Struktur arsitektur piramida terpancung yang amat langka di Asia Tenggara.',
      'Situs suci ruwatan paling komprehensif yang mengajarkan pembebasan batin dari kutukan dan karma buruk.',
      'Lambang keberanian spiritual leluhur Jawa dalam mengekspresikan filosofi penciptaan dan kemurnian jiwa.',
    ],
  },
  {
    slug: 'masjid-agung-demak',
    name: 'Masjid Agung Demak',
    javaneseName: 'Mesjid Ageng Demak Bintoro',
    category: 'situs-islam-walisongo',
    categoryLabel: 'Pusat Spiritualitas Walisongo • Tonggak Sejarah Islam Jawa',
    region: 'Pesisir Utara Jawa Tengah',
    city: 'Demak',
    spiritualTheme: 'Akulturasi Cahaya Islam Sufistik & Mukjizat Soko Tatal Persatuan Bangsa',
    heroImage: '/images/editorial/monumen-demak.jpg',
    heroImageAlt: 'Halaman Masjid Agung Demak dengan atap tumpang tiga yang legendaris saat senja',
    heroImageCaption: 'Masjid Agung Demak berdiri megah dengan atap limas tumpang tiga bersusun, mahakarya arsitektur kayu jati akulturasi Walisongo.',
    highlights: ['Masjid Tertua di Tanah Jawa (Didirikan 1479 M)', 'Tiang Kayu Mukjizat Soko Tatal Sunan Kalijaga', 'Atap Tumpang Tiga Akulturasi Meru', 'Pintu Petir Ki Ageng Selo (Bledeg)'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Pusat dakwah dan musyawarah para wali songo yang menjadi fondasi peradaban Islam Nusantara. Menyimpan keajaiban tiang tatal kayu Sunan Kalijaga dan simbol Surya Majapahit.',
    leadParagraph:
      'Di alun-alun barat Kota Demak, berdiri sebuah monumen kayu jati yang menjadi episentrum peralihan peradaban agung di tanah Jawa: Masjid Agung Demak. Didirikan oleh Raden Patah bersama dewan Walisongo pada paruh akhir abad ke-15, masjid ini bukan sekadar tempat salat berjamaah, melainkan laboratorium kebudayaan di mana ajaran tauhid Islam dipadukan dengan kearifan lokal Jawa secara lembut, damai, dan memancarkan welas asih.',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Musyawarah Walisongo & Kisah Tiang Soko Guru',
        content: [
          'Dalam Babad Tanah Jawi, ruang utama Masjid Agung Demak ditopang oleh empat pilar raksasa dari kayu jati yang disebut "Soko Guru". Masing-masing tiang ditegakkan oleh empat wali utama: Sunan Bonang, Sunan Gunung Jati, Sunan Ampel, dan Sunan Kalijaga.',
          'Konon ketika hari peresmian masjid hampir tiba, Sunan Kalijaga belum sempat menyiapkan sebatang kayu jati utuh karena beliau sedang mengembara berdakwah. Dengan ketajaman mata batin dan laku spiritualnya, Sunan Kalijaga mengumpulkan serpihan-serpihan sisa kayu tatal yang berserakan, mengikatnya erat, lalu menekannya menjadi sebatang tiang silinder kokoh.',
          'Hingga hari ini, "Soko Tatal" tersebut masih tegak berdiri di sisi barat laut ruang utama, menjadi bukti mukjizat sekaligus pesan luhur persatuan: bahwa kekuatan bangsa lahir dari kepingan-kepingan kecil yang disatukan oleh cinta dan tekad bersama.',
        ],
      },
      {
        title: 'Pintu Bledeg: Penangkal Petir & Daya Tangkal Ki Ageng Selo',
        content: [
          'Pintu utama masjid dikenal dengan nama Lawang Bledeg (Pintu Petir), dibuat oleh Ki Ageng Selo pada tahun 1471 M. Daun pintunya berukir motif kepala naga raksasa yang memuntahkan sulur bunga.',
          'Menurut folklor setempat, Ki Ageng Selo berhasil menangkap kilat petir yang menggelegar di tengah sawah dan menguncinya menjadi ukiran pintu masjid. Candrasengkala pada pintu ini berbunyi "Naga Mulat Salira Wani", menyiratkan angka tahun 1388 Saka.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Tiga Tingkatan Atap: Iman, Islam, dan Ihsan',
      quote: 'Pohon agama tidak menumbangkan tanah tempatnya berpijak; ia menancapkan akar akulturasi agar ranting-ranting kebaikannya memayungi semua insan.',
      content: [
        'Atap Tumpang Tiga (Meru): Mengadopsi arsitektur atap bertingkat pura Hindu Jawa kuno yang dimaknai ulang sebagai tahapan pendakian rohani Islam: Atap paling bawah adalah Syariat (Iman), atap tengah adalah Tarekat (Islam), dan puncak teratas adalah Hakikat/Makrifat (Ihsan).',
        'Mustaka Puncak Berbentuk Labu Air / Bunga Melati: Melambangkan kesucian tauhid yang menembus hadirat Ilahi dan kemanfaatan yang menyejukkan bagi alam semesta.',
        'Lambang Surya Majapahit di Mihrab: Simbol penghormatan Walisongo kepada trah leluhur Majapahit, menegaskan kontinuitas sejarah bahwa Islam hadir menyempurnakan kebaikan budi, bukan membinasakannya.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Harmoni Kayu Jati Keraton dan Kesahajaan Surau Pesantren',
      features: [
        'Pawestren: Ruangan khusus jemaah wanita yang dibangun dengan ventilasi kayu ukir khas Demak.',
        'Kolam Wudhu Bersejarah: Kolam batu tempat para wali berwudhu yang airnya senantiasa mengalir sejuk.',
        'Serambi Megah dengan 28 pilar kayu berukir motif flora Majapahit.',
      ],
      sacredRelicsOrArtifacts: [
        'Maksurah: Bilik pelindung sultan bertarikh 1866 M dengan ukiran kaligrafi ayat Al-Quran.',
        'Museum Masjid Agung Demak yang menyimpan serpihan soko tatal asli, bedug antik, dan Al-Quran tulisan tangan bertinta emas.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Niatkan ziarah untuk mengenang perjuangan dakwah para wali penyebar cinta dan persaudaraan di tanah Jawa.',
      dressCode: 'Pakaian muslim/muslimah yang sopan, bersih, dan menutup aurat secara sempurna.',
      prohibitionsAndRules: [
        'Melepaskan alas kaki sebelum menginjak pelataran batas suci masjid.',
        'Menjaga kekhusyukan salat dan tidak berbicara lantang atau bercanda di area makam para raja Demak di belakang masjid.',
        'Dilarang mengambil foto atau menyalakan lampu kilat kamera di hadapan orang yang sedang khusyuk beribadah salat atau berzikir.',
      ],
    },
    locationDetails: {
      address: 'Kp. Kauman, Kelurahan Bintoro, Kecamatan Demak, Kabupaten Demak, Jawa Tengah 59511',
      historicalEra: 'Abad XV Masehi (Didirikan 1479 M)',
      builtBy: 'Raden Patah (Sultan Demak I) bersama Dewan Walisongo',
      elevation: '4 mdpl',
      bestTimeToVisit: 'Saat menjelang salat Maghrib dan Isya ketika lampu-lampu temaram menyinari tiang kayu serambi dan lantunan ayat suci menggema syahdu.',
    },
    keyTakeaways: [
      'Monumen tonggak awal transformasi spiritual dan politik dari era Hindu-Buddha menuju era Islam di tanah Jawa.',
      'Keteladanan para wali dalam merawat toleransi kebudayaan tanpa mengorbankan ketauhidan.',
      'Soko Tatal Sunan Kalijaga sebagai lambang abadi kekuatan persatuan dari kebersahajaan.',
    ],
  },
  {
    slug: 'candi-gedong-songo',
    name: 'Candi Gedong Songo',
    javaneseName: 'Candhi Gedhong Sanga (Hargo Ungaran)',
    category: 'candi-hindu',
    categoryLabel: 'Situs Hindu Dataran Tinggi • Sembilan Penjuru Kosmis',
    region: 'Lereng Gunung Ungaran',
    city: 'Semarang',
    spiritualTheme: 'Sembilan Penjuru Keselarasan Semesta & Energi Suci Bumi Belantara',
    heroImage: '/images/editorial/monumen-gedongsongo.jpg',
    heroImageAlt: 'Candi batu Gedong Songo bertengger di atas bukit hijau berlatar Gunung Ungaran',
    heroImageCaption: 'Gugusan candi batu andesit Gedong Songo tersebar di puncak-puncak bukit berhawa sejuk lereng Gunung Ungaran, dikelilingi kabut belerang alami.',
    highlights: ['9 Gugusan Candi di Ketinggian 1.200 - 1.400 mdpl', 'Pemandangan 5 Gunung Sekaligus', 'Mata Air Panas Alami & Uap Belerang', 'Pemujaan Dewa Siwa Mahaguru'],
    readTime: '6 Menit Baca',
    shortSummary:
      'Kompleks sembilan kelompok candi Hindu Mataram Kuno yang terpencar di bukit-bukit hijau Gunung Ungaran. Menyajikan harmoni spiritual antara pemujaan kosmis Siwa dan kesembuhan alami uap belerang.',
    leadParagraph:
      'Terhampar megah di punggung selatan Gunung Ungaran pada ketinggian 1.200 hingga 1.400 meter di atas permukaan laut, Candi Gedong Songo menawarkan salah satu pengalaman ziarah alam paling menakjubkan di Pulau Jawa. Dalam bahasa Jawa, "Gedong Songo" bermakna "Sembilan Bangunan". Menjelajahi gugusan candi ini bukan sekadar berjalan santai di bukit pinus, melainkan laku napak tilas pendakian spiritual melintasi sembilan penjuru mata angin suci (Nawa Sanga).',
    spiritualAndHistoricalNarrative: [
      {
        title: 'Jejak Mataram Kuno di Balik Hutan Pinus Ungaran',
        content: [
          'Candi Gedong Songo dibangun sekitar abad ke-8 hingga ke-9 Masehi oleh Raja Sanjaya dan para penerusnya di Kerajaan Mataram Kuno, sezaman dengan candi-candi di Dataran Tinggi Dieng.',
          'Ditemukan pertama kali oleh Sir Thomas Stamford Raffles pada tahun 1804 (awalnya tercatat hanya 7 kelompok candi sehingga dinamai Gedong Pitu), penelitian lanjutan oleh arkeolog Belanda seperti Knebel dan van Stein Callenfels berhasil menyingkap keberadaan sembilan kelompok candi yang tersebar di punggung-punggung bukit.',
        ],
      },
      {
        title: 'Nawa Sanga: Sembilan Penjaga Keseimbangan Mata Batin',
        content: [
          'Dalam teologi Hindu Siwa Jawa, angka sembilan mewakili sembilan dewa penjaga arah mata angin (Dewata Nawa Sanga) yang dipimpin oleh Dewa Siwa di pusat alam semesta.',
          'Setiap kelompok candi di Gedong Songo ditempatkan secara cermat mengikuti kontur geomansi alam pegunungan: candi I berada di lereng bawah, berlanjut hingga candi V dan gugusan puncak yang menghadap langsung ke kawah uap belerang vulkanik aktif.',
        ],
      },
    ],
    philosophicalMeaning: {
      title: 'Pembersihan Raga di Mata Air Panas, Pencerahan Jiwa di Puncak Bukit',
      quote: 'Leluhur kita membangun candi di lereng gunung bukan untuk menjauh dari manusia, melainkan agar manusia yang mendakinya sadar betapa kecilnya raga di hadapan Sanghyang Widhi.',
      content: [
        'Di antara Candi III dan Candi IV, terdapat jurang dengan mata air panas belerang alami yang sejak zaman purba digunakan sebagai sarana penyucian raga sebelum melanjutkan sembahyang ke candi-candi yang lebih tinggi.',
        'Dari pelataran candi tertinggi, peziarah disuguhkan panorama agung lima gunung legendaris Jawa Tengah: Gunung Merbabu, Merapi, Telomoyo, Sindoro, dan Sumbing—sebuah lanskap mandala alamiah yang menenangkan jiwa.',
      ],
    },
    sacredArchitecture: {
      symbolism: 'Arsitektur Ramping dengan Relung Ganesha dan Durga Mahisasuramardini',
      features: [
        'Bilik utama candi yang menghadap ke arah barat dengan arca Dewa Siwa sebagai Mahadewa.',
        'Relung utara memuat arca Dewi Durga bertangan delapan yang menaklukkan kerbau raksasa angkara murka.',
        'Relung selatan memuat arca Resi Agastya (Siwa Mahaguru) yang berjenggot panjang membawa kendi amerta.',
      ],
      sacredRelicsOrArtifacts: [
        'Arca Ganesha penjaga pintu berkepala gajah lambang penyingkir segala rintangan hidup.',
        'Batu alas lingga-yoni dengan pahatan saluran pancuran air suci.',
      ],
    },
    spiritualEtiquette: {
      mindset: 'Jaga keheningan batin selama mendaki bukit; resapi desau angin pinus dan hangatnya uap bumi sebagai berkah Ilahi.',
      dressCode: 'Gunakan sepatu jalan yang nyaman untuk medan mendaki perbukitan serta pakaian sopan berpenghangat.',
      prohibitionsAndRules: [
        'Dilarang mencoret-coret (vandalisme) atau menggeser susunan batu candi.',
        'Bagi yang menunggang kuda wisata, patuhi rute jalan setapak dan tidak memasuki pelataran rumput sakral di sekeliling candi.',
        'Dilarang membuang puntung rokok sembarangan karena rawan memicu kebakaran hutan pinus lereng Ungaran.',
      ],
    },
    locationDetails: {
      address: 'Desa Candi, Kecamatan Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
      historicalEra: 'Abad VIII - IX Masehi (c. 730 - 850 M)',
      builtBy: 'Raja Sanjaya & Wangsa Sanjaya (Mataram Kuno)',
      elevation: '1.200 - 1.400 mdpl',
      bestTimeToVisit: 'Pagi hari pukul 06.30 - 09.30 WIB untuk menikmati udara pegunungan terbersih sebelum kabut tebal menyelimuti lembah.',
    },
    keyTakeaways: [
      'Gugusan sembilan candi sakral yang menyeimbangkan energi vulkanik dan kedamaian spiritual pegunungan.',
      'Kombinasi langka antara situs cagar budaya purba, terapi uap belerang alami, dan panorama lima gunung.',
      'Saksi laku spiritual para resi Mataram Kuno dalam menyatukan raga dengan semesta raya.',
    ],
  },
];

export function getTempatSakralArticleBySlug(slug: string): TempatSakralArticle | undefined {
  return tempatSakralArticles.find((article) => article.slug === slug);
}

export function getAllTempatSakralSlugs(): string[] {
  return tempatSakralArticles.map((article) => article.slug);
}
