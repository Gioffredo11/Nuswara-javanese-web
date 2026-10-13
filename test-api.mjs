async function testAll() {
  const base = 'http://localhost:3000';
  console.log('🚀 Testing Jawa Epic Live Endpoints...\n');

  const tests = [
    { name: 'Homepage (HTML)', url: `${base}/`, method: 'GET' },
    { name: 'Wayangpedia Page (HTML)', url: `${base}/wayangpedia`, method: 'GET' },
    { name: 'Oracle Page (HTML)', url: `${base}/oracle`, method: 'GET' },
    { name: 'Photobooth Page (HTML)', url: `${base}/photobooth`, method: 'GET' },
    { name: 'Family Tree Page (HTML)', url: `${base}/family-tree`, method: 'GET' },
    { name: 'Lakon Page (HTML)', url: `${base}/lakon`, method: 'GET' },
    { name: 'Ragam Rupa Page (HTML)', url: `${base}/ragam-rupa`, method: 'GET' },
    { name: 'Sejarah Index Page (HTML)', url: `${base}/sejarah`, method: 'GET' },
    { name: 'Sejarah Article 1 (HTML)', url: `${base}/sejarah/era-keagungan-candi`, method: 'GET' },
    { name: 'Sejarah Article 2 (HTML)', url: `${base}/sejarah/akulturasi-wayang-kulit`, method: 'GET' },
    { name: 'Sejarah Article 3 (HTML)', url: `${base}/sejarah/ksatria-modern`, method: 'GET' },
    { name: 'API Characters', url: `${base}/api/characters`, method: 'GET' },
    { name: 'API Character Gatotkaca', url: `${base}/api/characters/gatotkaca`, method: 'GET' },
    { name: 'API Family Tree', url: `${base}/api/family-tree`, method: 'GET' },
    { name: 'API Stories', url: `${base}/api/stories`, method: 'GET' },
    { name: 'API Story Bima Suci', url: `${base}/api/stories/bima-suci`, method: 'GET' },
    { name: 'API Philosophies', url: `${base}/api/philosophies`, method: 'GET' },
    { name: 'API Batik', url: `${base}/api/batik`, method: 'GET' },
    { name: 'API Visual Elements', url: `${base}/api/visual-elements`, method: 'GET' },
    { name: 'API Weton by Date', url: `${base}/api/weton/1998-05-21`, method: 'GET' },
    { 
      name: 'API Oracle Calculate', 
      url: `${base}/api/oracle/calculate`, 
      method: 'POST', 
      body: JSON.stringify({ name: 'Raden Bagus', birthDate: '1999-08-17' }),
      headers: { 'Content-Type': 'application/json' }
    },
    { 
      name: 'API Manifestation Draw', 
      url: `${base}/api/manifestation/draw`, 
      method: 'POST' 
    },
    { 
      name: 'API Share Create', 
      url: `${base}/api/share`, 
      method: 'POST',
      body: JSON.stringify({ type: 'ORACLE', payload: { test: true } }),
      headers: { 'Content-Type': 'application/json' }
    }
  ];

  let passed = 0;
  for (const t of tests) {
    try {
      const res = await fetch(t.url, {
        method: t.method,
        headers: t.headers,
        body: t.body,
      });
      if (res.ok) {
        console.log(`✅ [${res.status}] ${t.name}`);
        passed++;
      } else {
        const text = await res.text();
        console.error(`❌ [${res.status}] ${t.name}:`, text.slice(0, 150));
      }
    } catch (err) {
      console.error(`❌ [ERR] ${t.name}:`, err.message);
    }
  }

  console.log(`\n🎉 Results: ${passed}/${tests.length} tests passed successfully!`);
}
testAll();
