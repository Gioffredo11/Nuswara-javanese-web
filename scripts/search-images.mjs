import fs from 'node:fs';

const queries = [
  { key: 'borobudur', query: 'Borobudur temple stupa sunrise' },
  { key: 'dieng', query: 'Dieng Plateau Candi Arjuna' },
  { key: 'cetho', query: 'Candi Cetho Karanganyar Lawu' },
  { key: 'sukuh', query: 'Candi Sukuh Karanganyar piramida' },
  { key: 'demak', query: 'Masjid Agung Demak' },
  { key: 'gedongsongo', query: 'Candi Gedong Songo' },
  { key: 'kartini', query: 'Raden Adjeng Kartini' },
  { key: 'diponegoro', query: 'Prince Diponegoro Raden Saleh' },
  { key: 'dewantara', query: 'Ki Hadjar Dewantara' },
  { key: 'soedirman', query: 'General Sudirman Jenderal Soedirman' },
  { key: 'ahmaddahlan', query: 'Ahmad Dahlan' },
  { key: 'nyiagengserang', query: 'Nyi Ageng Serang' },
  { key: 'lumpia', query: 'Lumpia Semarang' },
  { key: 'liwet', query: 'Nasi Liwet Solo' },
  { key: 'mendoan', query: 'Tempe Mendoan' },
  { key: 'sotokudus', query: 'Soto Kudus' },
  { key: 'dawetayu', query: 'Dawet Ayu Banjarnegara' },
  { key: 'satekere', query: 'Sate Kere Solo' },
  { key: 'garangasem', query: 'Garang Asem' },
  { key: 'candi_relief', query: 'Borobudur relief carving' },
  { key: 'wayang_kelir', query: 'Wayang kulit performance screen kelir' },
  { key: 'batik_canting', query: 'Batik canting artisan woman' },
];

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=5&format=json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'NuswaraHeritage/1.0 (contact@nuswara.id)' }
  });
  const data = await res.json();
  return data.query?.search?.map(item => item.title) || [];
}

async function main() {
  const results = {};
  for (const item of queries) {
    try {
      const files = await searchCommons(item.query);
      results[item.key] = files;
      console.log(`[${item.key}]: ${files.length} files found. Top: ${files[0]}`);
    } catch (err) {
      console.error(`Error on ${item.key}:`, err.message);
    }
  }
  fs.writeFileSync('scripts/commons-search-results.json', JSON.stringify(results, null, 2));
}

main();
