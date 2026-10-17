import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES = [
  {
    target: 'monumen-borobudur.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Borobudur-Temple-Park_Indonesia_Stupas-of-Borobudur-04.jpg',
    title: 'Stupa Terbuka Candi Borobudur saat Fajar',
    author: 'Uwe Aranas',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'monumen-dieng.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Arjuna_Temple_Complex_in_the_Dieng_Plateau.jpg',
    title: 'Kompleks Candi Arjuna Dataran Tinggi Dieng',
    author: 'Gunawan Kartapranata',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'monumen-cetho.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Candi_Cetho%2C_karanganyar_jawa_tengah.jpg',
    title: 'Gapura Bertingkat Candi Cetho Lereng Gunung Lawu',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'monumen-sukuh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Candi_sukuh.jpg',
    title: 'Piramida Berundak Candi Sukuh Karanganyar',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'monumen-demak.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Masjid_demak.jpg',
    title: 'Masjid Agung Demak dengan Atap Tumpang Tiga',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'monumen-gedongsongo.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Gedong_songo.jpg',
    title: 'Candi Gedong Songo di Lereng Gunung Ungaran',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'tokoh-kartini.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/COLLECTIE_TROPENMUSEUM_Portret_van_Raden_Ajeng_Kartini_TMnr_10018776.jpg',
    title: 'Potret Asli Raden Ajeng Kartini (1879–1904)',
    author: 'Koleksi Tropenmuseum Amsterdam (TMnr 10018776)',
    source: 'Nationaal Museum van Wereldculturen / Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'tokoh-diponegoro.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Diponegoro.jpg',
    title: 'Potret Pangeran Diponegoro (1785–1855)',
    author: 'Arsip Sejarah / Tropenmuseum',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'tokoh-dewantara.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Ki_Hadjar_Dewantara_Mimbar_Umum_18_October_1949_p2.jpg',
    title: 'Potret Ki Hadjar Dewantara (1889–1959)',
    author: 'Surat Kabar Mimbar Umum / Perpusnas RI',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'tokoh-soedirman.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Sudirman.jpg',
    title: 'Potret Resmi Panglima Besar Jenderal Soedirman',
    author: 'Arsip Nasional Republik Indonesia',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'tokoh-ahmaddahlan.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Ahmad_Dahlan.jpg',
    title: 'Potret KH Ahmad Dahlan (1868–1923)',
    author: 'Arsip Pimpinan Pusat Muhammadiyah',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'tokoh-nyiagengserang.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Nyai_Ageng_Serang_%282%29.jpg',
    title: 'Potret Pahlawan Nasional Nyi Ageng Serang',
    author: 'Kementerian Sosial Republik Indonesia',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    target: 'kuliner-lumpia.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Loenpia_Semarang_with_sauce.JPG',
    title: 'Lumpia Goreng Khas Semarang dengan Saus Manis Bawang',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'kuliner-liwet.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Nasi_Liwet_Solo.jpg',
    title: 'Nasi Liwet Solo Gurih Tradisional Berdaun Pisang',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'kuliner-mendoan.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mendoan.jpg',
    title: 'Tempe Mendoan Hangat Khas Banyumas',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'kuliner-sotokudus.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Soto_Kudus_nasi.JPG',
    title: 'Soto Kudus Tradisional dalam Mangkuk Porselen',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 3.0'
  },
  {
    target: 'kuliner-dawetayu.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Es_dawet_ayu_banjarnegara.jpg',
    title: 'Es Dawet Ayu Segar Khas Banjarnegara',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'kuliner-satekere.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Sate_Kere_daging_sapi.jpg',
    title: 'Sate Kere Tradisional Solo dengan Bumbu Kacang',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'kuliner-garangasem.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Garang_asem_Pj.JPG',
    title: 'Garang Asem Ayam Daun Pisang Khas Kudus & Grobogan',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'candi-relief.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/KITLV_90016%2C_Borobudur_relief%2C_dancer_with_orchestra.jpg',
    title: 'Relief Ansambel Musik & Tari Kuno Candi Borobudur Abad ke-8',
    author: 'KITLV / Universitas Leiden (Foto ID 90016)',
    source: 'Wikimedia Commons / Tropenmuseum',
    license: 'Public Domain'
  },
  {
    target: 'wayang-kelir.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pertunjukan_Wayang_Kulit.jpg',
    title: 'Pagelaran Wayang Kulit Semalam Suntuk di Depan Layar Kelir',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  },
  {
    target: 'batik-canting.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Batik_Artisan_Drawing_Wax_with_Canting_in_Trusmi_Cirebon_Indonesia.jpg',
    title: 'Pengrajin Membatik Tulis Halus dengan Canting Tradisional',
    author: 'Wikimedia Commons Contributor',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0'
  }
];

async function downloadAndOptimize(item, outDir) {
  const destPath = path.join(outDir, item.target);
  console.log(`[Downloading] ${item.target} from ${item.url}...`);

  const res = await fetch(item.url, {
    headers: { 'User-Agent': 'NuswaraCulturalHeritage/1.0 (https://nuswara.id; contact@nuswara.id)' }
  });

  if (!res.ok) {
    throw new Error(`Failed HTTP ${res.status}: ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const rawBuffer = Buffer.from(arrayBuffer);

  // Process with Sharp: clean sRGB, max 1600px width/height, quality 86 mozjpeg
  const optimized = await sharp(rawBuffer)
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(destPath, optimized);
  console.log(`✓ [Saved] ${item.target} (${Math.round(optimized.length / 1024)} KB)`);
}

async function main() {
  const outDir = path.join(process.cwd(), 'public', 'images', 'editorial');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Starting download of ${IMAGES.length} authentic internet photos (0% AI)...\n`);
  let successCount = 0;

  for (const item of IMAGES) {
    try {
      await downloadAndOptimize(item, outDir);
      successCount++;
    } catch (err) {
      console.error(`✗ Error downloading ${item.target}:`, err.message);
    }
  }

  console.log(`\nCompleted: ${successCount}/${IMAGES.length} authentic photos successfully updated!`);
}

main();
