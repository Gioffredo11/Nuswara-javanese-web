export interface TokohSection {
  title: string;
  content: string[];
  highlightQuote?: string;
}

export interface TokohArticle {
  slug: string;
  idNumber: string;
  name: string;
  fullName: string;
  honorificTitle: string;
  period: string;
  birthDateText: string;
  deathDateText: string;
  originCity: string;
  category: string;
  badgeLabel: string;
  quote: string;
  summary: string;
  photoUrl: string;
  verifiedSealText: string;
  personalData: {
    tempatLahir: string;
    tempatWafat: string;
    makam: string;
    gelarPahlawan: string;
    falsafahHidup: string;
    senjataAtauAtribut: string;
  };
  keyLegacies: string[];
  sections: TokohSection[];
  funFacts: string[];
  timeline: Array<{
    year: string;
    event: string;
  }>;
}

export const tokohArticles: TokohArticle[] = [
  {
    slug: 'ra-kartini',
    idNumber: 'ARSIP-ID-1879-RAK',
    name: 'R.A. Kartini',
    fullName: 'Raden Adjeng Kartini (Raden Ayu Adipati Djojoadiningrat)',
    honorificTitle: 'Pahlawan Kemerdekaan Nasional • Pelopor Emansipasi & Pendidikan Perempuan',
    period: '1879 – 1904',
    birthDateText: '21 April 1879 (Mayong, Jepara)',
    deathDateText: '17 September 1904 (Rembang)',
    originCity: 'Jepara, Jawa Tengah',
    category: 'EMANSIPASI & PENDIDIKAN',
    badgeLabel: 'PELOPOR LITERASI BUDI PEKERTI',
    quote: 'Habis gelap terbitlah terang: aksara yang membuka martabat dan nurani budi pekerti.',
    summary:
      'Pahlawan perintis emansipasi wanita dan pendidikan budi pekerti dari bumi Jepara. Surat-suratnya melintasi batas samudra menegaskan bahwa kemajuan peradaban suatu bangsa bermula dari kemerdekaan batin dan kecerdasan kaum perempuan.',
    photoUrl: '/images/editorial/tokoh-kartini.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 108 TAHUN 1964',
    personalData: {
      tempatLahir: 'Mayong, Kabupaten Jepara, Karesidenan Jepara',
      tempatWafat: 'Kabupaten Rembang, Jawa Tengah (Usia 25 tahun)',
      makam: 'Desa Bulu, Kecamatan Bulu, Kabupaten Rembang',
      gelarPahlawan: 'Pahlawan Kemerdekaan Nasional (2 Mei 1964)',
      falsafahHidup: 'Door Duisternis tot Licht (Habis Gelap Terbitlah Terang)',
      senjataAtauAtribut: 'Pena Aksara, Surat Korespondensi, & Kain Batik Tenun Troso Jepara',
    },
    keyLegacies: [
      'Buku kumpulan surat "Door Duisternis tot Licht" yang mengguncang nurani intelektual Eropa',
      'Mendirikan Sekolah Wanita Kartini pertama di Jepara dan Rembang tanpa memungut bayaran',
      'Memelopori ekspor kerajinan ukir Jepara ke kancah internasional untuk mengangkat ekonomi pengrajin lokal',
      'Meletakkan fondasi kurikulum etika, keterampilan tangan, dan pemikiran kritis bagi perempuan pribumi',
    ],
    sections: [
      {
        title: 'Pingitan dan Jendela Dunia Melalui Aksara',
        content: [
          'Lahir dalam keluarga bangsawan bupati Jepara, Raden Mas Adipati Ario Sosroningrat, Kartini berkesempatan mengenyam pendidikan di ELS (Europese Lagere School) hingga usia 12 tahun. Namun tradisi feodal keraton kala itu mewajibkan seorang gadis bangsawan menjalani masa pingitan di dalam bilik istana hingga tiba waktu dijodohkan.',
          'Alih-alih menyerah pada kurungan fisik bilik kaputren, Kartini mengubah kamar pingitannya menjadi laboratorium intelektual. Berbekal kemampuan bahasa Belanda yang fasih, ia membaca buku-buku pemikiran modern Eropa karya Max Havelaar (Multatuli), Louis Couperus, hingga karya-karya sosialis dan feminis tentang keadilan sosial.',
          'Lewat jendela kecil kamarnya, Kartini menulis puluhan lembar surat yang dikirimkan kepada sahabat-sahabat penanya di Belanda, seperti Rosa Manuela Abendanon dan Estelle Zeehandelaar, menyuarakan jeritan batin perempuan pribumi yang terkekang tradisi poligami paksa dan kebodohan struktural.',
        ],
        highlightQuote:
          'Kami di sini bukan menuntut hak untuk menyamai kaum pria dalam kesombongannya, melainkan menuntut hak untuk sanggup berdiri sendiri, mencerdaskan putra-putri kami, dan meringankan penderitaan rakyat.',
      },
      {
        title: 'Pendidikan Budi Pekerti Melampaui Sekat Feodal',
        content: [
          'Visi Kartini melampaui sekadar tuntutan persamaan hak perempuan. Ia memandang pendidikan sebagai instrumen liberasi kemanusiaan seutuhnya. Baginya, pendidikan Barat yang hanya mengajarkan akal intelektual tanpa diimbangi budi pekerti dan empati kultural hanya akan melahirkan penjajah baru berwajah lokal.',
          'Bersama saudarinya, Roekmini dan Kardinah, Kartini membuka kelas belajar bagi anak-anak gadis di pendapa kabupaten Jepara. Di sana, mereka diajarkan membaca, menulis aksara Jawa dan Latin, berhitung, menjahit, merawat kesehatan, serta mencintai kebudayaan tanah air sendiri.',
          'Kartini juga menjadi pelindung seni ukir kayu Jepara. Ia secara aktif memperkenalkan karya pengrajin ukir desa Belakanggunung kepada para pejabat kolonial di Batavia dan Belanda, menciptakan terobosan ekonomi kriya kayu Jepara yang melegenda hingga hari ini.',
        ],
      },
      {
        title: 'Warisan Abadi Surat-Surat Jiwa',
        content: [
          'Kartini wafat di usia yang sangat belia, 25 tahun, beberapa hari setelah melahirkan putra tunggalnya, Soesalit Djojoadiningrat. Meski raganya telah berpulang di bumi Rembang, nyala apinya tak pernah padam.',
          'Surat-surat yang dikumpulkan oleh J.H. Abendanon dan diterbitkan pada tahun 1911 menjadi pemicu lahirnya gelombang Politik Etis dan membakar semangat pergerakan pemuda Nusantara di awal abad ke-20, menginspirasi berdirinya Budi Utomo dan surat kabar kaum pergerakan.',
        ],
      },
    ],
    funFacts: [
      'Kartini adalah vegetarian dan sangat peduli pada kesejahteraan satwa serta kelestarian alam.',
      'Selain menulis, Kartini adalah pembatik ulung yang menciptakan motif batik "Buket Bambu" dan motif flora khas Jepara.',
      'Kartini belajar tafsir Al-Qur\'an dari ulama besar Jawa K.H. Muhammad Sholeh bin Umar (Kiai Sholeh Darat) Semarang, yang menerjemahkan surat Al-Fatihah ke dalam aksara Pegon Jawa.',
    ],
    timeline: [
      { year: '1879', event: 'Lahir di Mayong, Jepara pada 21 April.' },
      { year: '1885', event: 'Mulai bersekolah di ELS (Europese Lagere School) Jepara.' },
      { year: '1892', event: 'Mulai menjalani tradisi pingitan bangsawan di pendapa kabupaten.' },
      { year: '1899', event: 'Mulai aktif berkirim surat dengan sahabat pena internasional di Eropa.' },
      { year: '1903', event: 'Mendirikan sekolah wanita pertama di Jepara dan menikah dengan Bupati Rembang.' },
      { year: '1904', event: 'Wafat di Rembang pada 17 September dalam usia 25 tahun.' },
      { year: '1911', event: 'Buku "Door Duisternis tot Licht" pertama kali diterbitkan di Den Haag.' },
    ],
  },
  {
    slug: 'pangeran-diponegoro',
    idNumber: 'ARSIP-ID-1785-PND',
    name: 'Pangeran Diponegoro',
    fullName: 'Bendara Pangeran Harya Dipanegara (Raden Mas Antawirya)',
    honorificTitle: 'Pahlawan Nasional • Panglima Besar Perang Jawa (1825–1830) • Ksatria Perang Sabil',
    period: '1785 – 1855',
    birthDateText: '11 November 1785 (Yogyakarta)',
    deathDateText: '8 Januari 1855 (Benteng Rotterdam, Makassar)',
    originCity: 'Magelang & Tegalrejo, Jawa Tengah',
    category: 'PERLAWANAN & STRATEGI MILITER',
    badgeLabel: 'KSATRIA TAHTA & SPIRITUALITAS',
    quote: 'Sadumuk bathuk, sanyari bumi: kehormatan jiwa dan jengkal tanah leluhur dipertaruhkan hingga akhir hayat.',
    summary:
      'Ksatria agung tanah Jawa yang memadukan spiritualitas mistik Islam dan kesaktian kanuragan. Memimpin koalisi rakyat, santri, kiai, dan bangsawan dalam Perang Jawa (De Java Oorlog) yang nyaris membangkrutkan kas pemerintah kolonial Hindia Belanda.',
    photoUrl: '/images/editorial/tokoh-diponegoro.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 087 TAHUN 1973',
    personalData: {
      tempatLahir: 'Keraton Ngayogyakarta Hadiningrat',
      tempatWafat: 'Benteng Rotterdam, Makassar, Sulawesi Selatan (Usia 69 tahun)',
      makam: 'Kampung Melayu, Wajo, Makassar',
      gelarPahlawan: 'Pahlawan Nasional Republik Indonesia (6 November 1973)',
      falsafahHidup: 'Sadumuk Bathuk Sanyari Bumi Ditohi Pati',
      senjataAtauAtribut: 'Keris Kyai Nogo Siluman, Tombak Kyai Rondhan, Kuda Hitam Kyai Gitayu, & Sorban Putih',
    },
    keyLegacies: [
      'Karya autobiografi sastra monumental Babad Diponegoro (diakui UNESCO Memory of the World)',
      'Memimpin perang gerilya terbesar di Asia Tenggara yang menelan biaya 20 juta gulden dan melumpuhkan finansial Belanda',
      'Membangun aliansi inklusif lintas strata: ulama pesantren, petani jelata, dan pangeran keraton bersatu padu',
      'Mengukir simbol perlawanan antikolonial berbasis moralitas spiritual dan kedaulatan tanah adat',
    ],
    sections: [
      {
        title: 'Menolak Kemewahan Istana Demi Kesucian Pesantren',
        content: [
          'Lahir sebagai putra sulung Sultan Hamengkubuwana III dari selir R.A. Mangkarawati, Diponegoro sejak belia menolak tinggal di lingkungan keraton yang mulai terkontaminasi intrik politik dan gaya hidup sekuler pejabat kolonial Belanda.',
          'Ia memilih diasuh oleh nenek buyutnya, Ratu Ageng (permaisuri Hamengkubuwana I), di desa Tegalrejo. Di sana, Diponegoro berbaur dengan santri dan petani jelata, mendalami ilmu tauhid, tasawuf, syariat, filsafat Jawa, dan kanuragan.',
          'Ketika ditawari takhta menjadi Sultan Yogyakarta, Diponegoro menolak secara halus karena ia menyadari bahwa menjadi raja boneka di bawah telunjuk residen Belanda bertentangan dengan kemurnian nuraninya.',
        ],
        highlightQuote:
          'Aku tidak mengejar takhta duniawi yang fana. Aku hanya ingin menegakkan kembali tatanan agama dan membebaskan rakyat dari beban pajak yang mencekik leher.',
      },
      {
        title: 'Pecahnya Perang Jawa: Siasat Gerilya Benteng Stelsel',
        content: [
          'Api perlawanan berkobar pada Mei 1825 ketika pihak Belanda secara sepihak memasang patok-patok pembangunan jalan melintasi tanah dan makam leluhur Diponegoro di Tegalrejo tanpa izin.',
          'Diponegoro memindahkan markas ke Goa Selarong dan mengumandangkan Perang Sabil. Didukung oleh panglima muda brilian Sentot Alibasya Prawirodirdjo dan ulama karismatik Kyai Mojo, pasukan Diponegoro menerapkan taktik perang gerilya kilat yang memorak-porandakan garnisun Belanda di seluruh pelosok Jawa Tengah dan Yogyakarta.',
          'Jenderal De Kock terpaksa mengerahkan sistem Benteng Stelsel (membangun ratusan benteng pertahanan kecil yang saling terhubung) dan mendatangkan puluhan ribu tentara bayaran dari Eropa dan Afrika untuk membatasi ruang gerak pasukan Diponegoro.',
        ],
      },
      {
        title: 'Penangkapan Licik di Magelang dan Warisan Babad',
        content: [
          'Pada 28 Maret 1830, di rumah Residen Kedu di Magelang, Diponegoro bersedia berunding secara damai di bulan suci Ramadhan. Namun secara culas dan tanpa senjata di tangan, De Kock menangkap sang pangeran dan mengasingkannya ke Manado, kemudian ke Benteng Rotterdam di Makassar.',
          'Selama 25 tahun pengasingan hingga wafatnya, Diponegoro menulis "Babad Diponegoro"—sebuah mahakarya sastra setebal 1.151 halaman tembang macapat yang mencatat sejarah, spiritualitas, dan pergulatan zamannya dengan kejujuran intelektual yang luar biasa.',
        ],
      },
    ],
    funFacts: [
      'Keris Kyai Nogo Siluman milik Diponegoro sempat hilang selama lebih dari satu abad di Belanda sebelum akhirnya ditemukan dan dikembalikan secara resmi ke Indonesia pada tahun 2020.',
      'Diponegoro adalah penunggang kuda ulung; kuda hitam kesayangannya dinamai Kyai Gitayu yang mampu melompati tebing terjal.',
      'Di pengasingan, Diponegoro gemar bermain catur dan mengamati dinamika kehidupan maritim para pelaut Bugis-Makassar.',
    ],
    timeline: [
      { year: '1785', event: 'Lahir di Yogyakarta pada 11 November dengan nama Raden Mas Antawirya.' },
      { year: '1793', event: 'Pindah ke Tegalrejo diasuh oleh Ratu Ageng, mendalami agama dan bertani.' },
      { year: '1825', event: 'Pemasangan patok Tegalrejo memicu letusan Perang Jawa.' },
      { year: '1826', event: 'Pasukan Diponegoro menguasai hampir seluruh wilayah pedalaman Jawa Tengah.' },
      { year: '1830', event: 'Ditangkap secara licik saat perundingan damai di Magelang, diasingkan ke Makassar.' },
      { year: '1855', event: 'Wafat di Benteng Rotterdam, Makassar pada 8 Januari.' },
      { year: '2013', event: 'Babad Diponegoro diakui UNESCO sebagai Ingatan Kolektif Dunia (Memory of the World).' },
    ],
  },
  {
    slug: 'ki-hadjar-dewantara',
    idNumber: 'ARSIP-ID-1889-KHD',
    name: 'Ki Hadjar Dewantara',
    fullName: 'Raden Mas Soewardi Soerjaningrat',
    honorificTitle: 'Pahlawan Nasional • Bapak Pendidikan Nasional • Pendiri Perguruan Taman Siswa',
    period: '1889 – 1959',
    birthDateText: '2 Mei 1889 (Yogyakarta)',
    deathDateText: '26 April 1959 (Yogyakarta)',
    originCity: 'Yogyakarta & Surakarta, Jawa Tengah',
    category: 'FILSAFAT PENDIDIKAN & PERS',
    badgeLabel: 'BAPAK PENDIDIKAN NASIONAL',
    quote: 'Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.',
    summary:
      'Wartawan pemberani, sastrawan kritis, dan filsuf pendidikan agung. Menanggalkan gelar kebangsawanannya untuk melebur bersama rakyat jelata, merumuskan sistem pendidikan nasional berlandaskan kemerdekaan jiwa, budi pekerti, dan cinta tanah air.',
    photoUrl: '/images/editorial/tokoh-dewantara.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 305 TAHUN 1959',
    personalData: {
      tempatLahir: 'Kadipaten Pakualaman, Yogyakarta',
      tempatWafat: 'Yogyakarta (Usia 69 tahun)',
      makam: 'Taman Wijaya Brata, Celeban, Umbulharjo, Yogyakarta',
      gelarPahlawan: 'Pahlawan Nasional Pertama Republik Indonesia (28 November 1959)',
      falsafahHidup: 'Trilogi Kepemimpinan Pendidikan: Tut Wuri Handayani',
      senjataAtauAtribut: 'Pena Jurnalis, Pakaian Beskap Putih Sederhana, Kacamata Bulat, & Lambang Garuda',
    },
    keyLegacies: [
      'Trilogi kepemimpinan pendidikan yang menjadi semboyan resmi Kementerian Pendidikan RI',
      'Mendirikan Perguruan Nasional Taman Siswa pada 3 Juli 1922 sebagai tandingan sekolah kolonial',
      'Artikel satir legendaris "Als ik eens Nederlander was" (Seandainya Aku Seorang Belanda)',
      'Menetapkan tanggal kelahirannya, 2 Mei, sebagai Hari Pendidikan Nasional (Hardiknas)',
    ],
    sections: [
      {
        title: 'Pena Tajam Wartawan Tiga Serangkai',
        content: [
          'Lahir dari trah bangsawan kraton Pakualaman, Soewardi Soerjaningrat menolak hidup berjarak dengan rakyat. Di masa mudanya, ia memilih jalur jurnalistik yang tajam, menulis di berbagai surat kabar pergerakan seperti De Express, Utusan Hindia, dan Sediotomo.',
          'Bersama Douwes Dekker (Danudirja Setiabudi) dan dr. Tjipto Mangoenkoesoemo, ia mendirikan Indische Partij—partai politik pertama di Hindia Belanda yang secara terbuka menuntut kemerdekaan Nusantara.',
          'Pada tahun 1913, ia mengguncang pemerintah kolonial dengan pamflet satirnya: "Als ik eens Nederlander was" (Seandainya Aku Seorang Belanda), yang mengecam rencana Belanda merayakan 100 tahun kemerdekaan mereka dari Prancis dengan memungut iuran dari rakyat jajahan. Tulisan ini membuatnya dibuang ke Belanda.',
        ],
        highlightQuote:
          'Sekiranya aku seorang Belanda, aku tidak akan menyelenggarakan pesta-pesta peringatan kemerdekaan di negeri yang kita rampas kemerdekaannya sendiri.',
      },
      {
        title: 'Lahirnya Filosofi Perguruan Taman Siswa',
        content: [
          'Masa pembuangan di Belanda dimanfaatkan Soewardi untuk mendalami pemikiran pendidikan dunia, termasuk konsep Friedrich Fröbel dan Maria Montessori, serta memadukannya dengan filosofi luhur Jawa.',
          'Kembali ke tanah air pada tahun 1919, dan pada usia 40 tahun (menurut hitungan tahun Saka) ia menanggalkan gelar bangsawannya "Raden Mas" menjadi "Ki Hadjar Dewantara" agar bebas bergaul dengan seluruh lapisan rakyat jelata.',
          'Pada 3 Juli 1922, ia mendirikan Nationaal Onderwijs Instituut Tamansiswa di Yogyakarta. Pendidikan di Taman Siswa tidak menggunakan paksaan atau rotan hukuman kolonial, melainkan menerapkan sistem "Among"—mengasuh dengan kelembutan, keteladanan, dan kebebasan batin.',
        ],
      },
      {
        title: 'Trilogi Kepemimpinan yang Abadi',
        content: [
          'Ki Hadjar merumuskan tiga pilar kepemimpinan pendidikan yang tak lekang oleh zaman: "Ing ngarsa sung tulada" (di depan memberi teladan), "Ing madya mangun karsa" (di tengah membangun semangat dan prakarsa), serta "Tut wuri handayani" (dari belakang memberi dorongan dan kepercayaan).',
          'Setelah Indonesia merdeka, Presiden Soekarno mengangkatnya sebagai Menteri Pengajaran, Pendidikan, dan Kebudayaan pertama Republik Indonesia.',
        ],
      },
    ],
    funFacts: [
      'Gelar "Ki" adalah sapaan takzim Jawa untuk sesepuh yang dituakan dan dihormati ilmunya oleh masyarakat.',
      'Semboyan "Tut Wuri Handayani" dengan lambang burung garuda dan sayap buku hingga kini menjadi logo resmi Kementerian Pendidikan Indonesia.',
      'Ki Hadjar sangat mencintai musik karawitan gamelan Jawa dan mengajarkan seni tari sebagai media pembentukan karakter batin siswa.',
    ],
    timeline: [
      { year: '1889', event: 'Lahir di Yogyakarta pada 2 Mei dengan nama R.M. Soewardi Soerjaningrat.' },
      { year: '1912', event: 'Mendirikan Indische Partij bersama Tjipto Mangoenkoesoemo dan Douwes Dekker.' },
      { year: '1913', event: 'Menulis "Als ik eens Nederlander was", diasingkan ke Belanda.' },
      { year: '1919', event: 'Kembali dari pengasingan dan aktif mengajar anak-anak bangsa.' },
      { year: '1922', event: 'Mendirikan Perguruan Nasional Taman Siswa pada 3 Juli di Yogyakarta.' },
      { year: '1945', event: 'Diangkat sebagai Menteri Pendidikan, Pengajaran, dan Kebudayaan pertama RI.' },
      { year: '1959', event: 'Wafat pada 26 April, ditetapkan sebagai Pahlawan Nasional dan bapak Hardiknas.' },
    ],
  },
  {
    slug: 'jenderal-soedirman',
    idNumber: 'ARSIP-ID-1916-SDR',
    name: 'Jenderal Soedirman',
    fullName: 'Raden Soedirman (Panglima Besar Jenderal Soedirman)',
    honorificTitle: 'Pahlawan Nasional • Panglima Besar Tentara Nasional Indonesia Pertama • Bapak Perang Gerilya',
    period: '1916 – 1950',
    birthDateText: '24 Januari 1916 (Bodas Karangjati, Purbalingga)',
    deathDateText: '29 Januari 1950 (Magelang)',
    originCity: 'Purbalingga & Banyumas, Jawa Tengah',
    category: 'PERJUANGAN KEMERDEKAAN & TENTARA',
    badgeLabel: 'PANGLIMA BESAR GERILYA',
    quote: 'Robek-robeklah badanku, potong-potonglah jasad ini, tetapi jiwaku yang dilindungi benteng Merah Putih akan tetap hidup!',
    summary:
      'Panglima Besar pertama tentara Republik Indonesia dari tlatah Purbalingga-Banyumas. Memimpin perang gerilya menembus ribuan kilometer hutan belantara dan gunung dalam keadaan satu paru-paru di atas tandu bambu, membuktikan eksistensi Republik di mata dunia.',
    photoUrl: '/images/editorial/tokoh-soedirman.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 314 TAHUN 1964',
    personalData: {
      tempatLahir: 'Bodas Karangjati, Rembang, Kabupaten Purbalingga, Jawa Tengah',
      tempatWafat: 'Pesanggrahan Militer Magelang, Jawa Tengah (Usia 34 tahun)',
      makam: 'Taman Makam Pahlawan Kusumanegara, Semaki, Yogyakarta',
      gelarPahlawan: 'Pahlawan Pembela Kemerdekaan (10 Desember 1964) & Jenderal Besar Anumerta (1997)',
      falsafahHidup: 'Prajurit Sejati Hanya Mengenal Satu Pilihan: Menang atau Gugur Membela Kedaulatan',
      senjataAtauAtribut: 'Mantel Wool Tebal Panjang, Blangkon Wulung Banyumasan, Keris Warisan, & Tandu Bambu',
    },
    keyLegacies: [
      'Pemenang Palagan Ambarawa (15 Desember 1945) yang diperingati sebagai Hari Juang TNI AD / Hari Infanteri',
      'Panglima Besar TNI termuda dalam sejarah (terpilih secara demokratis oleh prajurit pada usia 29 tahun)',
      'Doktrin Perang Semesta dan Taktik Gerilya yang dipelajari di akademi militer internasional',
      'Keteladanan moral kepemimpinan tentara rakyat: menolak menyerah meski Presiden dan Wakil Presiden ditawan',
    ],
    sections: [
      {
        title: 'Dari Guru Muhammadiyah Menjadi Panglima Rakyat',
        content: [
          'Lahir di keluarga bersahaja di Purbalingga, Soedirman muda dikenal sangat taat beribadah, jujur, dan berdisiplin tinggi. Sebelum memanggul senjata, ia mengabdikan hidupnya sebagai guru dan kepala sekolah HIS Muhammadiyah Cilacap serta pandu Hizbul Wathan.',
          'Pada masa pendudukan Jepang, ia bergabung dalam pembentukan PETA (Pembela Tanah Air) di Banyumas. Karisma kepemimpinannya yang teduh dan mengayomi membuatnya sangat dicintai oleh segenap prajurit bawahan.',
          'Setelah proklamasi kemerdekaan 1945, dalam Konferensi TKR di Yogyakarta, Soedirman yang saat itu baru berpangkat kolonel secara aklamasi dipilih oleh komandan-komandan divisi dari seluruh penjuru negeri menjadi Panglima Besar pertama mengalahkan kandidat senior lulusan KNIL.',
        ],
        highlightQuote:
          'Tentara bukan merupakan suatu golongan di luar masyarakat, bukan suatu kasta yang berdiri di atas masyarakat. Tentara tidak lain dan tidak bukan adalah anak kandung rakyat.',
      },
      {
        title: 'Kemenangan Gemilang di Palagan Ambarawa',
        content: [
          'Ujian kepemimpinan militer pertamanya terjadi pada November–Desember 1945 kala pasukan Sekutu dan NICA bersenjata modern mengancam pedalaman Jawa Tengah melalui Magelang dan Ambarawa.',
          'Soedirman memimpin langsung taktik "Supit Urang"—pengepungan rangkap dari dua sisi yang mengisolasi logistik musuh di medan berawa dan perbukitan Ambarawa. Pada 15 Desember 1945, pasukan Sekutu dipukul mundur kocar-kacir ke Semarang. Kemenangan ini membuktikan kepada sekutu bahwa angkatan perang Republik bukanlah gerombolan liar, melainkan tentara profesional yang terorganisir rapi.',
        ],
      },
      {
        title: 'Gerilya di Atas Tandu Melintasi Seribu Gunung',
        content: [
          'Kala Belanda melancarkan Agresi Militer II pada 19 Desember 1948 dan menduduki ibu kota Yogyakarta, Presiden Soekarno dan Hatta ditawan. Sebelum ditawan, Bung Karno meminta Soedirman beristirahat di dalam kota karena penyakit tuberkulosis (TBC) parah yang membuat satu paru-parunya tidak berfungsi.',
          'Namun Soedirman menolak. Dengan tegas ia menjawab: "Tempat saya yang terbaik adalah di tengah-tengah anak buah saya." Di atas tandu bambu sederhana yang dipikul bergantian oleh prajurit dan rakyat desa, Soedirman memimpin perang gerilya sejauh lebih dari 1.000 kilometer melintasi perbukitan Jawa Tengah dan Jawa Timur selama tujuh bulan.',
          'Keberadaan Panglima Besar di hutan belantara membuyarkan propaganda Belanda yang mengklaim TNI telah musnah, memicu keberhasilan Serangan Umum 1 Maret 1949, dan memaksa Belanda mengakui kedaulatan Indonesia di meja Konferensi Meja Bundar.',
        ],
      },
    ],
    funFacts: [
      'Soedirman selalu menjaga wudhu sepanjang perjalanannya memimpin perang gerilya di hutan belantara.',
      'Tandu bambu asli yang dipakai memikul Jenderal Soedirman saat gerilya kini tersimpan abadi di Museum Benteng Vredeburg dan Museum Sasmitaloka Yogyakarta.',
      'Soedirman dianugerahi pangkat Jenderal Besar Bintang Lima bersama Jenderal A.H. Nasution dan Jenderal Soeharto.',
    ],
    timeline: [
      { year: '1916', event: 'Lahir di Purbalingga pada 24 Januari.' },
      { year: '1936', event: 'Menjadi guru dan pendidik di HIS Muhammadiyah Cilacap.' },
      { year: '1944', event: 'Menempuh pendidikan perwira PETA di Bogor dan menjadi Daidanco Banyumas.' },
      { year: '1945', event: 'Terpilih menjadi Panglima Besar TKR (12 November) dan memenangkan Palagan Ambarawa (15 Desember).' },
      { year: '1948', event: 'Memimpin perang gerilya gerak cepat di atas tandu usai Agresi Militer Belanda II.' },
      { year: '1949', event: 'Kembali ke Yogyakarta dengan disambut tangis haru rakyat dan Bung Karno.' },
      { year: '1950', event: 'Wafat di Magelang pada 29 Januari dalam usia 34 tahun.' },
    ],
  },
  {
    slug: 'kh-ahmad-dahlan',
    idNumber: 'ARSIP-ID-1868-KAD',
    name: 'K.H. Ahmad Dahlan',
    fullName: 'Kiai Haji Ahmad Dahlan (Muhammad Darwis)',
    honorificTitle: 'Pahlawan Nasional • Pelopor Pembaruan Islam Modern & Pelayanan Sosial Nusantara',
    period: '1868 – 1923',
    birthDateText: '1 Agustus 1868 (Kauman, Yogyakarta)',
    deathDateText: '23 Februari 1923 (Yogyakarta)',
    originCity: 'Yogyakarta & Kedu, Jawa Tengah',
    category: 'PEMBARUAN SOSIAL & DAKWAH',
    badgeLabel: 'PELOPOR REFORMASI SOSIAL & KESEHATAN',
    quote: 'Hidup-hidupilah persyarikatan dengan kerja nyata, dan jangan pernah mencari nafkah pribadi di dalamnya.',
    summary:
      'Tokoh ulama visioner berdarah bangsawan ulama Jawa Tengah-Yogyakarta. Mentransformasikan pemahaman keagamaan dari sekadar ritual lisan menjadi aksi kemanusiaan nyata: mendirikan rumah sakit, panti asuhan, dan sekolah modern bagi kaum papa dan mustad’afin.',
    photoUrl: '/images/editorial/tokoh-ahmaddahlan.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 657 TAHUN 1961',
    personalData: {
      tempatLahir: 'Kampung Kauman, Yogyakarta',
      tempatWafat: 'Kauman, Yogyakarta (Usia 54 tahun)',
      makam: 'Makam Karangkajen, Brontokusuman, Mergangsan, Yogyakarta',
      gelarPahlawan: 'Pahlawan Kemerdekaan Nasional (27 Desember 1961)',
      falsafahHidup: 'Teologi Surat Al-Ma’un: Iman Sejati Dibuktikan Lewat Menyantuni Kaum Lemah',
      senjataAtauAtribut: 'Sorban Putih Rapi, Kitab Fiqih, Jam Qiblat (Tongkat Istiwa), & Biola Akustik',
    },
    keyLegacies: [
      'Mendirikan Persyarikatan Muhammadiyah pada 18 November 1912 di Kauman',
      'Mendirikan Rumah Penolong Kesengsaraan Oemoem (PKO/PKU Muhammadiyah) pertama di Indonesia',
      'Memelopori pembentukan organisasi perempuan Islam \'Aisyiyah bersama sang istri, Nyai Ahmad Dahlan',
      'Mengintegrasikan kurikulum ilmu sains modern dan agama di bangku madrasah pribumi',
    ],
    sections: [
      {
        title: 'Koreksi Kiblat dan Ilmu Falak Modern',
        content: [
          'Lahir dengan nama Muhammad Darwis, putra K.H. Abu Bakar imam Masjid Gedhe Kauman, ia adalah keturunan ke-12 dari Maulana Malik Ibrahim (Sunan Gresik). Sejak muda ia mendalami ilmu falak (astronomi Islam) dan fikih.',
          'Sepulang dari menuntut ilmu di Mekkah dan berguru pada pemikir reformis Timur Tengah, Ahmad Dahlan melakukan penelitian ilmiah menggunakan kompas dan tongkat istiwa. Ia mendapati bahwa arah kiblat sebagian besar masjid di Jawa tidak tepat menghadap Ka\'bah melainkan agak miring ke arah Afrika.',
          'Dengan santun dan ilmiah, ia mengusulkan koreksi arah saf salat. Meski sempat ditentang keras oleh kalangan konservatif bahkan musala kecilnya dirobohkan, Ahmad Dahlan tidak membalas dengan amarah. Ia terus mengedukasi masyarakat dengan kelembutan budi pekerti khas Jawa.',
        ],
        highlightQuote:
          'Kebenaran ilmiah dan kelurusan syariat tidak perlu diperjuangkan dengan kekerasan, melainkan dengan keteladanan budi dan kesabaran dialog.',
      },
      {
        title: 'Teologi Al-Ma’un: Mengangkat Martabat Kaum Lemah',
        content: [
          'Kisah paling masyhur dari metode pengajaran K.H. Ahmad Dahlan adalah ketika ia mengajarkan Surat Al-Ma’un kepada santri-santrinya selama berbulan-bulan tanpa mengganti materi surah lain.',
          'Ketika santrinya bertanya mengapa surah tersebut diulang terus-menerus, Dahlan menjawab: "Kalian sudah hafal dan paham artinya, tapi apakah kalian sudah mengamalkannya? Di luar sana banyak anak yatim piatu kelaparan dan orang miskin terlantar. Cari mereka, bawa ke mari, beri mereka makan, mandikan, dan carikan tempat tinggal!"',
          'Dari pengamalan nyata inilah lahir gerakan filantropi modern pertama di tanah air: Panti Asuhan Yatim, Dapur Umum Bencana, dan Balai Pengobatan PKO (Penolong Kesengsaraan Oemoem) yang kini menjelma menjadi ratusan rumah sakit modern di seluruh penjuru Indonesia.',
        ],
      },
      {
        title: 'Pembaruan Pendidikan dan Kesetaraan Perempuan',
        content: [
          'Ahmad Dahlan mendobrak dikotomi kolonial yang memisahkan sekolah umum sekuler dengan pesantren tradisional. Di sekolah Muhammadiyah, anak-anak diajarkan matematika, biologi, bahasa Belanda, sekaligus akidah, akhlak, dan bermain biola.',
          'Bersama istrinya, Nyai Ahmad Dahlan (Siti Walidah), ia mendirikan gerakan perempuan \'Aisyiyah pada 1917, mendorong kaum perempuan muslim untuk berpendidikan tinggi, aktif di ranah publik, dan memimpin gerakan sosial kemasyarakatan.',
        ],
      },
    ],
    funFacts: [
      'K.H. Ahmad Dahlan pandai memainkan biola dan menggunakannya untuk mengajarkan seni musik serta menyegarkan pikiran murid-muridnya.',
      'Ia adalah sahabat karib Ki Hadjar Dewantara; keduanya sering berdiskusi tentang masa depan pendidikan karakter anak bangsa.',
      'Demi mendanai pembangunan sekolah dan panti asuhan di masa krisis keuangan, Ahmad Dahlan pernah melelang seluruh perabotan rumah tangganya di alun-alun.',
    ],
    timeline: [
      { year: '1868', event: 'Lahir di Kauman Yogyakarta pada 1 Agustus dengan nama Muhammad Darwis.' },
      { year: '1890', event: 'Berangkat ke Mekkah menuntut ilmu agama dan falak, berganti nama Ahmad Dahlan.' },
      { year: '1898', event: 'Melakukan koreksi ilmiah arah kiblat Masjid Gedhe Kauman.' },
      { year: '1912', event: 'Mendirikan Persyarikatan Muhammadiyah pada 18 November.' },
      { year: '1917', event: 'Menginisiasi berdirinya organisasi perempuan \'Aisyiyah.' },
      { year: '1923', event: 'Wafat di Yogyakarta pada 23 Februari dalam usia 54 tahun.' },
    ],
  },
  {
    slug: 'nyi-ageng-serang',
    idNumber: 'ARSIP-ID-1752-NAS',
    name: 'Nyi Ageng Serang',
    fullName: 'Raden Ayu Serang (Raden Ajeng Kustiyah Wulaningsih Retno Edi)',
    honorificTitle: 'Pahlawan Nasional • Panglima Perang Wanita & Penasihat Militer Perang Jawa',
    period: '1752 – 1828',
    birthDateText: '1752 (Serang, Grobogan, Purwodadi)',
    deathDateText: '1828 (Kulon Progo, Yogyakarta)',
    originCity: 'Grobogan & Purwodadi, Jawa Tengah',
    category: 'PERLAWANAN & MILITER WANITA',
    badgeLabel: 'PANGLIMA GERILYA PUTRI ADILUHUNG',
    quote: 'Untuk keselamatan jiwa dan martabat tanah air, kita wajib berserah diri pada Hyang Widdhi dan berdiri teguh membela bumi pertiwi.',
    summary:
      'Panglima perang wanita legendaris dari tlatah Serang, Grobogan, Jawa Tengah. Putri dari Pangeran Natapraja, keturunan Sunan Kalijaga. Di usia senja 73 tahun, ia tetap menunggang kuda perang di atas tandu memimpin laskar gerilya dan menjadi penasihat militer utama Pangeran Diponegoro.',
    photoUrl: '/images/editorial/tokoh-nyiagengserang.jpg',
    verifiedSealText: 'ARSIP KEBANGSAAN • SK PRESIDEN NO. 084 TAHUN 1974',
    personalData: {
      tempatLahir: 'Desa Serang, Kecamatan Karangrayung, Kabupaten Grobogan, Jawa Tengah',
      tempatWafat: 'Kalibawang, Kulon Progo (Usia 76 tahun)',
      makam: 'Makam Pahlawan Nyi Ageng Serang, Kalibawang, Kulon Progo',
      gelarPahlawan: 'Pahlawan Nasional Republik Indonesia (13 Desember 1974)',
      falsafahHidup: 'Ksatria Putri Pantang Menyerah di Bawah Kaki Penjajah',
      senjataAtauAtribut: 'Keris Luk Lima Warisan Kalijaga, Busur Panah Gendewa, Jubah Kebaya Wulung, & Tandu Tempur',
    },
    keyLegacies: [
      'Pencetus Taktik Kamuflase Militer Daun Keladi (Lumbu) yang mengecoh intrik patroli serdadu Belanda',
      'Panglima laskar perempuan dan sesepuh militer yang sangat disegani Pangeran Diponegoro',
      'Menjaga kedaulatan wilayah Grobogan-Demak-Purwodadi dari cengkeraman monopoli kolonial VOC',
      'Membuktikan bahwa kepemimpinan komando militer tertinggi dapat diemban oleh seorang wanita di usia senja',
    ],
    sections: [
      {
        title: 'Titisan Darah Kalijaga di Bumi Purwodadi',
        content: [
          'Dilahirkan di desa Serang, perbatasan Grobogan dan Sragen, Nyi Ageng Serang bernama asli Raden Ajeng Kustiyah Wulaningsih Retno Edi. Ayahnya adalah Panembahan Natapraja, seorang panglima perang setia Pangeran Mangkubumi (Sultan Hamengkubuwana I) yang berdarah Sunan Kalijaga.',
          'Sejak masa kanak-kanak, Kustiyah tidak hanya diajarkan tata krama keputrian, melainkan dilatih berkuda, menembak, memanah, olah kanuragan pedang, serta taktik perang gerilya bersama prajurit pria.',
          'Ketika ayah dan suaminya wafat, ia mewarisi kepemimpinan wilayah Serang dan diberi gelar kehormatan "Nyi Ageng Serang". Rakyat Grobogan memandangnya sebagai figur ibu pelindung sekaligus panglima perang yang adil dan mengasihi fakir miskin.',
        ],
        highlightQuote:
          'Selama darah para leluhur masih mengalir di urat nadiku, pantang bagi sebidang jengkal tanah pusaka Serang diinjak oleh sepatu keserakahan penjajah.',
      },
      {
        title: 'Taktik Lumbu: Kamuflase Daun Keladi Hijau',
        content: [
          'Salah satu kontribusi kecerdasan militer paling terkenal dari Nyi Ageng Serang adalah penemuan taktik kamuflase daun lumbu (daun talas/keladi).',
          'Di medan perbukitan Grobogan dan Kulon Progo yang berhutan lebat, Nyi Ageng Serang memerintahkan seluruh laskar pasukannya mengenakan rumbai-rumbai jubah dari daun lumbu hijau yang lebar. Pasukan Belanda yang berpatroli mengira bukit tersebut hanyalah hamparan kebun keladi liar.',
          'Kala barisan serdadu musuh masuk ke dalam jebakan, laskar Nyi Ageng Serang menyerbu serentak dari balik kamuflase daun, melumpuhkan lawan sebelum mereka sempat menarik pelatuk senapan.',
        ],
      },
      {
        title: 'Panglima Sepuh di Tengah Kobaran Perang Jawa',
        content: [
          'Ketika Perang Jawa meletus pada 1825, Nyi Ageng Serang telah berusia 73 tahun. Meski fisiknya menua dan ia harus dipikul di atas tandu bambu, batin dan kecerdasan strateginya tetap tajam laksana sembilu.',
          'Pangeran Diponegoro mengangkat Nyi Ageng Serang sebagai salah satu penasihat militer senior kepercayaannya bersama Pangeran Mangkubumi. Pasukan Serang di bawah pimpinannya mempertahankan benteng pertahanan Kulon Progo dan Serang dengan gagah berani hingga akhir hayatnya pada tahun 1828.',
        ],
      },
    ],
    funFacts: [
      'Nyi Ageng Serang adalah nenek buyut dari Pahlawan Nasional R.M. Soewardi Soerjaningrat (Ki Hadjar Dewantara).',
      'Patung monumen Nyi Ageng Serang sedang menunggang kuda perang sambil mengacungkan tombak berdiri megah di pusat Wates, Kulon Progo.',
      'Meski memimpin perang, ia terkenal sangat gemar membaca kitab-kitab tasawuf dan mengaji Al-Qur\'an di waktu malam.',
    ],
    timeline: [
      { year: '1752', event: 'Lahir di Serang, Grobogan, putri dari Panembahan Natapraja.' },
      { year: '1770', event: 'Mulai memimpin laskar keputrian dan mengawal pertahanan wilayah Serang.' },
      { year: '1800', event: 'Menggantikan ayahnya memimpin wilayah otonom Serang dan rakyat Grobogan.' },
      { year: '1825', event: 'Bergabung dalam Perang Jawa pada usia 73 tahun, menjadi penasihat Diponegoro.' },
      { year: '1826', event: 'Memimpin taktik perang daun lumbu di front pertahanan Kulon Progo.' },
      { year: '1828', event: 'Wafat di Kalibawang, Kulon Progo dalam usia 76 tahun.' },
      { year: '1974', event: 'Dianugerahi gelar Pahlawan Nasional oleh Presiden Republik Indonesia.' },
    ],
  },
];

export function getTokohBySlug(slug: string): TokohArticle | undefined {
  return tokohArticles.find((t) => t.slug === slug);
}
