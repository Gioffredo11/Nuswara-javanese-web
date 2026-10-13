export interface CharacterStoryInsight {
  slug: string;
  name: string;
  title: string;
  role: 'PROTAGONIST' | 'ANTAGONIST' | 'GUIDE' | 'ALLY' | 'TEACHER';
  roleLabel: string;
  avatarVector: string; // vector key
  motivation: string;
  storyInLakon: string;
  keyDialogue: string;
  piwulang: string;
}

export interface LakonEnrichment {
  storySlug: string;
  historicalContext: string;
  moralCore: string;
  characterInsights: CharacterStoryInsight[];
  funFacts: string[];
}

export const lakonEnrichmentData: Record<string, LakonEnrichment> = {
  'bima-suci': {
    storySlug: 'bima-suci',
    historicalContext:
      'Lakon Bima Suci (Serat Dewaruci) digubah pada era peralihan Majapahit-Mataram Islam oleh pujangga Yasadipura I. Lakon ini merupakan sintesis agung antara filsafat mistisisme Kejawen, tasawuf Islam (Manunggaling Kawula Gusti), dan metafisika Tantra Hindu-Buddha.',
    moralCore:
      'Kejujuran dan ketulusan batin (lelabuhan tanpa pamrih) sanggup mengubah tipu muslihat musuh menjadi jalan pencerahan spiritual tertinggi.',
    funFacts: [
      'Bima adalah satu-satunya Pandawa yang tidak pernah menggunakan bahasa krama inggil kepada siapa pun di muka bumi, kecuali kepada Dewa Ruci (sukma sejatinya).',
      'Naga Nabawarna yang bertarung di dasar laut memiliki sembilan warna yang melambangkan sembilan lubang hawa nafsu wadag (babahan hawa sanga).',
      'Dewa Ruci berwujud sangat mungil (setelapak tangan bayi) untuk mengajarkan bahwa Diri Sejati itu begitu dekat, bersahaja, dan tak terukur oleh kesombongan fisik.'
    ],
    characterInsights: [
      {
        slug: 'bima',
        name: 'Raden Werkudara (Bima)',
        title: 'Ksatria Jodhipati Panegak Pandawa',
        role: 'PROTAGONIST',
        roleLabel: 'Pencari Kasampurnan Sejati',
        avatarVector: 'bima',
        motivation:
          'Kepatuhan mutlak murid kepada guru (Guru Susrusa) dan kerinduan jiwa merengkuh hakikat hidup sejati melampaui ilusi duniawi.',
        storyInLakon:
          'Meskipun saudara-saudaranya memperingatkan bahwa Resi Durna dihasut Sengkuni untuk mencelakakannya, Werkudara memilih percaya dengan kepolosan batin. Ia menerjang belantara Tikbrasara dan menyelam ke jurang samudra ganas tanpa tabung pernapasan atau rasa gentar. Ketulusan hatinya membuat racun intrik politik berubah menjadi air kehidupan suci Tirta Perwitasari.',
        keyDialogue:
          '"Kakang Puntadewa, bila hati tulus mematuhi dawuh guru, laut manapun akan membuka jalannya!"',
        piwulang:
          'Laku hening dan keteguhan batin adalah senjata pamungkas menaklukkan pusaran badai kehidupan modern.'
      },
      {
        slug: 'semar',
        name: 'Kyai Lurah Semar Badranaya',
        title: 'Pamomong Luhur Karangtumaritis',
        role: 'GUIDE',
        roleLabel: 'Kompas Spiritual Kawula',
        avatarVector: 'semar',
        motivation:
          'Memastikan Werkudara tidak tersesat dalam kesombongan olah kanuragan dan tetap berpegang pada kesadaran ketuhanan.',
        storyInLakon:
          'Semar menemani Werkudara hingga batas pantai Samudra Minangkalbu. Dengan kelembutan kebapaan, Semar menguji kemantapan niat sang asuhan. Semar membiarkan Bima mencebur ke samudra sendirian karena ia paham bahwa perjalanan menemukan jati diri adalah laku sunyi yang harus ditempuh oleh setiap jiwa seorang diri.',
        keyDialogue:
          '"Gusti Werkudara, apa yang engkau cari di laut yang tiada bertepi ini selain bayang-bayang hatimu sendiri?"',
        piwulang:
          'Pembimbing sejati tidak menyelesaikan masalah kita, melainkan mengantarkan kita ke pintu keberanian menghadapi diri sendiri.'
      },
      {
        slug: 'arjuna',
        name: 'Raden Arjuna',
        title: 'Ksatria Madukara',
        role: 'ALLY',
        roleLabel: 'Saudara yang Mencemaskan Takdir',
        avatarVector: 'arjuna',
        motivation:
          'Kasih persaudaraan yang mendalam kepada kakaknya yang dinilai terlalu jujur di tengah pusaran politik licik Kurawa.',
        storyInLakon:
          'Arjuna menangis memeluk kaki Werkudara di pelataran istana Amarta, memohon agar kakaknya membatalkan ekspedisi maut itu. Namun keteguhan Werkudara justru membuka mata Arjuna tentang arti kesetiaan tanpa pamrih yang kelak memperkokoh barisan Pandawa menghadapi Bharatayuda.',
        keyDialogue:
          '"Kakang Bima, engkau adalah pilar hidup kami. Jangan biarkan racun lidah Durna memadamkan cahayamu!"',
        piwulang:
          'Rasa sayang saudara sering kali berbentuk kekhawatiran, namun penghormatan terbaik adalah mendukung panggilan suci mereka.'
      }
    ]
  },
  'gatotkaca-gugur': {
    storySlug: 'gatotkaca-gugur',
    historicalContext:
      'Diadaptasi dari Kakawin Bharatayuddha abad ke-12 gubahan Mpu Sedah dan Mpu Panuluh di Kerajaan Kediri. Gugurnya Gatotkaca di malam ke-14 adalah babak paling dramatis yang menjadi titik balik strategi kemenangan kubu Pandawa.',
    moralCore:
      'Pengorbanan diri seorang pahlawan demi melindungi peradaban dan martabat tanah air adalah mahkota kehormatan tertinggi yang tak lekang oleh waktu.',
    funFacts: [
      'Gatotkaca dinamai "Otot Kawat Balung Wesi" karena saat bayi ia dicelupkan ke kawah Candradimuka dan ditempa oleh senjata para dewa.',
      'Senjata Kunta milik Adipati Karna tersimpan di dalam sarung pusaka yang dahulu menyatu di pusar Gatotkaca saat ia dipotong tali pusarnya.',
      'Sebelum jasadnya menyentuh bumi, Gatotkaca memperbesar tubuhnya menjadi raksasa bukit dan mengincar kereta Adipati Karna dan bala tentara Kurawa.'
    ],
    characterInsights: [
      {
        slug: 'gatotkaca',
        name: 'Raden Gatotkaca',
        title: 'Ksatria Pringgandani',
        role: 'PROTAGONIST',
        roleLabel: 'Benteng Angkasa Nusantara',
        avatarVector: 'gatotkaca',
        motivation:
          'Melindungi paman Arjuna dan ayahanda Bima dari ancaman senjata pamungkas Adipati Karna, rela mati demi keselamatan poros Pandawa.',
        storyInLakon:
          'Kala perkemahan Pandawa digempur serangan malam licik Kurawa, Gatotkaca terbang membelah langit hitam Kurusetra. Mengenakan Caping Basunanda dan Rompi Antakusuma, ia memancing teror udara hingga Adipati Karna terdesak dan terpaksa melepas Pusaka Kunta. Gatotkaca menyambut ajal di angkasa dengan senyum kemenangan ksatria sejati.',
        keyDialogue:
          '"Demi kehormatan darah Pandawa dan keselamatan paman Arjuna, remuknya tulang-belulangku di angkasa kupersembahkan bagi pertiwi!"',
        piwulang:
          'Ksatria sejati mengutamakan keselamatan barisan bersama daripada kenyamanan hidup pribadinya.'
      },
      {
        slug: 'karna',
        name: 'Adipati Karna (Basukarna)',
        title: 'Raja Ksatria Awangga',
        role: 'ANTAGONIST',
        roleLabel: 'Senapati yang Terbelenggu Sumpah',
        avatarVector: 'karna',
        motivation:
          'Memenuhi desakan histeris Duryodana untuk menyelamatkan pasukan Kurawa yang luluh lantak oleh amukan angkasa Gatotkaca.',
        storyInLakon:
          'Karna sesungguhnya menyimpan Senjata Kunta seumur hidup hanya untuk duel melawan Arjuna. Kala Gatotkaca menghancurkan barisan Kurawa dari langit malam, Karna terpojok oleh pilihan mustahil. Dengan kepedihan hati yang mendalam, ia melepaskan Kunta, menyadari bahwa kemenangan atas Gatotkaca sekaligus menandai vonis matinya di tangan Arjuna esok hari.',
        keyDialogue:
          '"Gatotkaca, engkau ksatria muda terhebat di kolong langit ini... maafkan aku yang terikat sumpah membidik dadamu!"',
        piwulang:
          'Pilihan politik yang salah akan menuntut harga pengorbanan yang teramat mahal dari orang-orang terbaik.'
      },
      {
        slug: 'arjuna',
        name: 'Raden Arjuna',
        title: 'Ksatria Panengah Pandawa',
        role: 'ALLY',
        roleLabel: 'Paman yang Terselamatkan Nyawanya',
        avatarVector: 'arjuna',
        motivation:
          'Duka mendalam melihat keponakan tercinta yang telah menjadi tameng hidup demi menyelamatkan nyawanya.',
        storyInLakon:
          'Arjuna menyaksikan kilatan Kuntawijayadanu menyambar langit dan jatuhnya jasad Gatotkaca. Di depan jenazah keponakannya, Arjuna bersujud menangis tersedu-sedu. Sri Kresna menegur dan membangkitkan tekad Arjuna: pengorbanan Gatotkaca tidak boleh sia-sia, panah Pasopati harus menuntaskan perang demi keadilan jagad.',
        keyDialogue:
          '"Anakku Gatotkaca, darahmu yang membasahi Kurusetra adalah utang kehormatan yang akan kubayar lunas esok pagi!"',
        piwulang:
          'Rasa berutang budi atas pengorbanan orang lain harus diubah menjadi tanggung jawab moral untuk menuntaskan kebaikan.'
      }
    ]
  },
  'srikandi-belajar-memanah': {
    storySlug: 'srikandi-belajar-memanah',
    historicalContext:
      'Berasal dari tradisi Wayang Madya dan lakon carangan keraton Mataram. Menjadi tonggak sejarah sastra Jawa yang secara eksplisit memotret perjuangan kepemimpinan perempuan dalam domain pertahanan dan militer kuno.',
    moralCore:
      'Keahlian dan martabat kepemimpinan tidak ditentukan oleh sekat gender, melainkan oleh kebersihan niat, ketekunan berlatih, dan ketajaman fokus batin.',
    funFacts: [
      'Busur sakti Srikandi bernama "Panah Hrusangkali", berhulu lesatan angin kencang yang mampu merontokkan panah lawan di udara.',
      'Dalam perang Bharatayuda kelak, Dewi Srikandi dipercaya menjadi Senapati Agung yang memimpin barisan terdepan menaklukkan Resi Bisma.',
      'Arjuna mengajarkan bahwa memanah bukan olahraga otot, melainkan meditasi jalan pernapasan (olah napas pranayama).'
    ],
    characterInsights: [
      {
        slug: 'srikandi',
        name: 'Dewi Wara Srikandi',
        title: 'Panglima Putri Pancalaradya',
        role: 'PROTAGONIST',
        roleLabel: 'Pelopor Ksatria Putri',
        avatarVector: 'srikandi',
        motivation:
          'Menolak stereotip keputrian pasif kraton yang hanya berhias dan menenun, bertekad melindungi kedaulatan tanah air dengan tangannya sendiri.',
        storyInLakon:
          'Srikandi menolak lamaran para pangeran sombong dan memilih menempuh laku keras di Madukara. Walau jari-jemarinya melepuh dan berdarah karena gesekan tali busur, ia tak pernah mengeluh. Dengan ketajaman batin yang hening, ia berhasil membidik sehelai daun kering di tengah terpaan badai, membuktikan kapasitasnya sebagai ksatria sejati.',
        keyDialogue:
          '"Bila musuh menyerbu tanah airku, tenunan sutra tak sanggup menahan pedang musuh. Aku ingin menjaga tanah kelahiranku dengan tanganku sendiri!"',
        piwulang:
          'Keberanian mendobrak batasan prasangka adalah langkah awal membuka pintu peradaban yang setara dan adil.'
      },
      {
        slug: 'arjuna',
        name: 'Raden Arjuna',
        title: 'Begawan Ciptaning Madukara',
        role: 'TEACHER',
        roleLabel: 'Guru Adiluhung',
        avatarVector: 'arjuna',
        motivation:
          'Mewariskan ilmu memanah Gandiwa kepada jiwa yang bersih tanpa memandang apakah muridnya seorang pria atau wanita.',
        storyInLakon:
          'Arjuna melihat api dedikasi yang langka di dalam diri Srikandi. Alih-alih meremehkan seorang putri keraton, Arjuna membimbingnya dengan metode olah cipta hening. Arjuna menguji ketenangan batin Srikandi di bawah terpaan angin lembah hingga sang murid mencapai tingkat kemahiran memanah tanpa keraguan.',
        keyDialogue:
          '"Menarik busur adalah menundukkan amarah, membidik adalah menyatukan cipta-rasa-karsa, dan melepaskan panah adalah kepasrahan mutlak."',
        piwulang:
          'Pendidik sejati adalah orang yang melihat potensi batin seseorang melampaui sekat tradisi dan label sosial.'
      }
    ]
  },
  'karna-tanding': {
    storySlug: 'karna-tanding',
    historicalContext:
      'Puncak klimaks Bharatayuda di hari ke-17. Ditulis dalam Kakawin Bharatayuddha dan diabadikan dalam Serat Tripama oleh KGPAA Mangkunegara IV sebagai representasi ksatria berjiwa patriotik yang teguh memegang sumpah kehormatan.',
    moralCore:
      'Kehormatan janji dan balas budi adalah pilar integritas seorang ksatria, meski takdir menuntut pengorbanan jiwa di medan kebenaran semesta.',
    funFacts: [
      'Karna dijuluki "Suryaputra" karena ia adalah putra kandung Batara Surya (dewa matahari) yang lahir dari telinga Dewi Kunti.',
      'Karna memiliki anting-anting kundala dan zirah pelindung emas yang melekat di kulitnya sejak lahir, yang ia serahkan kepada pengemis penyamaran Batara Indra demi kedermawanannya.',
      'Karna sengaja tidak membidik organ vital Arjuna pada tembakan pertamanya demi menghormati janjinya kepada sang ibunda, Dewi Kunti.'
    ],
    characterInsights: [
      {
        slug: 'karna',
        name: 'Adipati Karna',
        title: 'Raja Dermawan Awangga',
        role: 'PROTAGONIST',
        roleLabel: 'Ksatria Sumpah Kehormatan',
        avatarVector: 'karna',
        motivation:
          'Membalas budi seumur hidup kepada Prabu Duryodana yang telah mengangkat harkat kemanusiaannya dari hinaan anak kusir kereta.',
        storyInLakon:
          'Meski mengetahui Pandawa adalah adik-adik kandungnya seibu, Karna menolak berkhianat kepada Duryodana di saat sang sahabat paling membutuhkan bantuannya. Demi ibunya, ia bersumpah tidak membunuh empat Pandawa lainnya dan hanya akan berduel melawan Arjuna. Ia bertanding dengan kemegahan jiwa ksatria surya hingga hembusan napas terakhir.',
        keyDialogue:
          '"Jika kini saat Duryodana di ambang kehancuran aku meninggalkannya demi kemewahan takhta Amarta, maka seluruh sejarah akan meludahiku sebagai pengkhianat!"',
        piwulang:
          'Integritas sejati diuji bukan saat situasi menguntungkan kita, melainkan saat kita harus membayar harga mahal demi menepati janji moral.'
      },
      {
        slug: 'arjuna',
        name: 'Raden Arjuna',
        title: 'Ksatria Panengah Pandawa',
        role: 'ANTAGONIST',
        roleLabel: 'Penegak Swadharma Semesta',
        avatarVector: 'arjuna',
        motivation:
          'Menegakkan dharma keadilan bagi jutaan rakyat yang tertindas oleh kezaliman wangsa Kurawa.',
        storyInLakon:
          'Arjuna menghadapi Karna dengan hati berat dan gemetar. Di bawah bimbingan kusir agung Sri Kresna, Arjuna menyadari bahwa duel ini bukanlah pembalasan dendam pribadi, melainkan hukum karma semesta yang harus dijalankan demi memulihkan ketertiban dunia purwa.',
        keyDialogue:
          '"Kakanda Karna... andai takdir mengizinkan kita merajut kasih persaudaraan di bawah naungan Amarta yang damai..."',
        piwulang:
          'Menjalankan tugas keadilan sering kali menuntut pengorbanan emosional yang menyayat hati nurani.'
      },
      {
        slug: 'duryodana',
        name: 'Prabu Duryodana',
        title: 'Raja Astina',
        role: 'ALLY',
        roleLabel: 'Sahabat yang Bergantung Penuh',
        avatarVector: 'duryodana',
        motivation:
          'Mengandalkan kesaktian panah Karna sebagai benteng terakhir pertahanan takhta Astina yang nyaris runtuh.',
        storyInLakon:
          'Duryodana mencintai Karna melebihi saudara kandungnya sendiri. Kepercayaan dan penghormatan tulus Duryodana kepada Karna itulah yang mengikat hati sang Adipati Awangga hingga rela mengorbankan nyawanya demi persahabatan tersebut.',
        keyDialogue:
          '"Karna saudaraku, tanpa dirimu di sisiku, takhta Astina ini hanyalah tumpukan abu tak bernilai!"',
        piwulang:
          'Persahabatan sejati memiliki kekuatan mengikat yang luar biasa, namun harus tetap dituntun oleh kompas moral kebenaran.'
      }
    ]
  },
  'semar-mbangun-kayangan': {
    storySlug: 'semar-mbangun-kayangan',
    historicalContext:
      'Lakon carangan masterpiece gubahan dalang-dalang keraton Surakarta dan Yogyakarta. Merupakan alegori kritik sosial paling berani dalam sejarah pakeliran Jawa terhadap arogansi kekuasaan dan pengabaian rakyat kecil.',
    moralCore:
      'Kayangan sejati bukanlah istana emas megah di puncak kahyangan, melainkan kemakmuran lumbung padi rakyat, kejujuran pemimpin, dan keadilan sosial yang merata.',
    funFacts: [
      'Semar sesungguhnya adalah Batara Ismaya, kakak kandung Batara Guru (raja dewa) yang memilih turun ke bumi menjadi abdi rakyat jelata.',
      'Dalam lakon ini, Bagong dan Petruk sering menyelipkan dialog spontan mengkritik harga sembako dan pungutan liar para pejabat kerajaan.',
      'Ketika tubuh Semar memancarkan cahaya Batara Ismaya, seluruh pusaka ksatria termasuk panah Gandiwa Arjuna luluh tak berdaya di hadapannya.'
    ],
    characterInsights: [
      {
        slug: 'semar',
        name: 'Kyai Lurah Semar Badranaya',
        title: 'Batara Ismaya / Pamomong Tanah Jawa',
        role: 'PROTAGONIST',
        roleLabel: 'Suara Nurani Rakyat Jelata',
        avatarVector: 'semar',
        motivation:
          'Menyadarkan para ksatria dan penguasa yang terlena oleh kemewahan proyek seremonial bahwa kemakmuran batin rakyat adalah pilar utama negara.',
        storyInLakon:
          'Melihat rakyat didera paceklik sementara pembesar sibuk berselisih paham memperebutkan kuasa, Semar mengumumkan niat mendirikan kayangan di bumi. Menghadapi ancaman senjata para ksatria yang mencurigainya berbuat makar, Semar menyingkap jati diri dewata purbanya dan merangkul Arjuna dengan air mata kasih sayang seorang pamomong.',
        keyDialogue:
          '"Mbangun kayangan bukan mendirikan istana marmer bertatah emas di langit, melainkan memastikan lumbung padi rakyat kecil terisi penuh tanpa tangisan kelaparan!"',
        piwulang:
          'Kekuasaan yang kehilangan empati pada rakyat kecil cepat atau lambat akan kehilangan legitimasi moralnya di hadapan semesta.'
      },
      {
        slug: 'petruk',
        name: 'Petruk (Kanthong Bolong)',
        title: 'Pujangga Humor Karangtumaritis',
        role: 'ALLY',
        roleLabel: 'Diplomat Jenaka Wong Cilik',
        avatarVector: 'petruk',
        motivation:
          'Menyampaikan kritik sosial yang tajam kepada penguasa keraton dengan bumbu tawa dan sindiran cerdas.',
        storyInLakon:
          'Petruk menjadi juru bicara warga desa yang menertawakan ketakutan para pembesar Amarta. Dengan kantong bajunya yang bolong (simbol kedermawanan dan kejujuran tanpa korupsi), Petruk membongkar kepalsuan laporan pejabat yang mengklaim rakyat sudah sejahtera padahal sawah kering kerontang.',
        keyDialogue:
          '"Kalau kebenaran dilarang diomongkan para pujangga, jangan kaget kalau sebentar lagi perut rakyat yang bakal berteriak!"',
        piwulang:
          'Humor dan satir cerdas adalah benteng perlawanan masyarakat dalam menjaga kewarasan nalar publik.'
      },
      {
        slug: 'bagong',
        name: 'Bagong (Bawor)',
        title: 'Bungsu Punokawan',
        role: 'ALLY',
        roleLabel: 'Suara Kritis Tanpa Kompromi',
        avatarVector: 'bagong',
        motivation:
          'Membela ayahandanya Semar dan berani bicara blak-blakan di hadapan para pejabat tanpa rasa takut.',
        storyInLakon:
          'Dengan mata melotot dan gaya bicara ceplas-ceplosnya, Bagong mempertanyakan mengapa para pembesar Amarta begitu panik saat rakyat kecil hendak membangun desa mereka sendiri. Celetukan Bagong yang polos namun menusuk telak menyadarkan para ksatria akan arogansi feodal mereka.',
        keyDialogue:
          '"Gusti pembesar takut kehilangan kursi kayangan, sampai lupa tanah yang diinjaknya itu tanahnya rakyat jelata!"',
        piwulang:
          'Kejujuran tanpa basa-basi sering kali lebih berharga daripada seribu pujian palsu para penjilat kekuasaan.'
      }
    ]
  }
};
