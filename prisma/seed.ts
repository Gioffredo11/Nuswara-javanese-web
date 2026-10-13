import { PrismaClient, Prisma, ContentStatus, RelationshipType, VisualElementKind, UserRole } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function loadJson<T>(filename: string): T {
  const filePath = path.join(__dirname, 'seed-data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

async function main() {
  console.log('🌱 Starting idempotent Jawa Epic database seed from seed-data/*.json...');

  // 0. Seed Admin User from environment if provided
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@jawaepic.id';
  const adminPassword = process.env.ADMIN_PASSWORD || 'PariwaraJawa2026!';
  const adminPasswordHash = crypto.createHash('sha256').update(adminPassword).digest('hex');

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
    create: {
      guestToken: 'admin-seed-token-' + crypto.randomBytes(8).toString('hex'),
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });
  console.log(`👤 Admin user seeded: ${adminEmail}`);

  // 1. Categories
  interface CategorySeed {
    slug: string;
    name: string;
    description: string;
    source?: string;
    status?: ContentStatus;
    variantNote?: string;
  }
  const categoriesData = loadJson<CategorySeed[]>('categories.json');
  const categoryMap = new Map<string, number>();

  for (const cat of categoriesData) {
    const record = await prisma.characterCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        source: cat.source || null,
        status: cat.status || ContentStatus.DRAFT,
        variantNote: cat.variantNote || null,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        source: cat.source || null,
        status: cat.status || ContentStatus.DRAFT,
        variantNote: cat.variantNote || null,
      },
    });
    categoryMap.set(cat.slug, record.id);
  }
  console.log(`📁 Seeded ${categoryMap.size} character categories`);

  // 2. Weapons
  interface WeaponSeed {
    slug: string;
    name: string;
    description: string;
    origin?: string;
    power?: string;
    source?: string;
    status?: ContentStatus;
  }
  const weaponsData = loadJson<WeaponSeed[]>('weapons.json');
  const weaponMap = new Map<string, number>();

  for (const w of weaponsData) {
    const record = await prisma.weapon.upsert({
      where: { slug: w.slug },
      update: {
        name: w.name,
        description: w.description,
        origin: w.origin || null,
        power: w.power || null,
        source: w.source || null,
        status: w.status || ContentStatus.DRAFT,
      },
      create: {
        slug: w.slug,
        name: w.name,
        description: w.description,
        origin: w.origin || null,
        power: w.power || null,
        source: w.source || null,
        status: w.status || ContentStatus.DRAFT,
      },
    });
    weaponMap.set(w.slug, record.id);
  }
  console.log(`⚔️  Seeded ${weaponMap.size} weapons`);

  // 3. Characters
  interface CharacterSeed {
    slug: string;
    name: string;
    javaneseName?: string;
    title?: string;
    categorySlug: string;
    shortDescription: string;
    personality?: string[];
    uniqueFacts?: string;
    storySummary?: string;
    lineArtKey?: string;
    traitTags?: string[];
    neptuAffinity?: number;
    kingdom?: string;
    generationLevel?: number;
    order?: number;
    source?: string;
    status?: ContentStatus;
    variantNote?: string;
  }
  const charactersData = loadJson<CharacterSeed[]>('characters.json');
  const characterMap = new Map<string, number>();

  for (const c of charactersData) {
    const categoryId = categoryMap.get(c.categorySlug);
    if (!categoryId) {
      throw new Error(`Category ${c.categorySlug} not found for character ${c.slug}`);
    }

    const record = await prisma.character.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        javaneseName: c.javaneseName || null,
        title: c.title || null,
        categoryId,
        shortDescription: c.shortDescription,
        personality: c.personality ? c.personality : Prisma.JsonNull,
        uniqueFacts: c.uniqueFacts || null,
        storySummary: c.storySummary || null,
        lineArtKey: c.lineArtKey || null,
        traitTags: c.traitTags ? c.traitTags : Prisma.JsonNull,
        neptuAffinity: c.neptuAffinity || null,
        kingdom: c.kingdom || null,
        generationLevel: c.generationLevel ?? 1,
        order: c.order ?? 0,
        source: c.source || null,
        status: c.status || ContentStatus.DRAFT,
        variantNote: c.variantNote || null,
      },
      create: {
        slug: c.slug,
        name: c.name,
        javaneseName: c.javaneseName || null,
        title: c.title || null,
        categoryId,
        shortDescription: c.shortDescription,
        personality: c.personality ? c.personality : Prisma.JsonNull,
        uniqueFacts: c.uniqueFacts || null,
        storySummary: c.storySummary || null,
        lineArtKey: c.lineArtKey || null,
        traitTags: c.traitTags ? c.traitTags : Prisma.JsonNull,
        neptuAffinity: c.neptuAffinity || null,
        kingdom: c.kingdom || null,
        generationLevel: c.generationLevel ?? 1,
        order: c.order ?? 0,
        source: c.source || null,
        status: c.status || ContentStatus.DRAFT,
        variantNote: c.variantNote || null,
      },
    });
    characterMap.set(c.slug, record.id);
  }
  console.log(`🎭 Seeded ${characterMap.size} characters`);

  // 4. Character Weapons
  interface CharWeaponSeed {
    characterSlug: string;
    weaponSlug: string;
  }
  const charWeaponsData = loadJson<CharWeaponSeed[]>('character-weapons.json');
  for (const cw of charWeaponsData) {
    const characterId = characterMap.get(cw.characterSlug);
    const weaponId = weaponMap.get(cw.weaponSlug);
    if (characterId && weaponId) {
      await prisma.characterWeapon.upsert({
        where: {
          characterId_weaponId: { characterId, weaponId },
        },
        update: {},
        create: { characterId, weaponId },
      });
    }
  }
  console.log(`🔗 Linked character weapons`);

  // 5. Character Relationships
  interface RelationshipSeed {
    fromSlug: string;
    toSlug: string;
    type: RelationshipType;
    note?: string;
  }
  const relationshipsData = loadJson<RelationshipSeed[]>('relationships.json');
  for (const rel of relationshipsData) {
    const fromId = characterMap.get(rel.fromSlug);
    const toId = characterMap.get(rel.toSlug);
    if (fromId && toId && fromId !== toId) {
      await prisma.characterRelationship.upsert({
        where: {
          fromId_toId_type: {
            fromId,
            toId,
            type: rel.type,
          },
        },
        update: {
          note: rel.note || null,
        },
        create: {
          fromId,
          toId,
          type: rel.type,
          note: rel.note || null,
        },
      });
    }
  }
  console.log(`👥 Seeded ${relationshipsData.length} character relationships`);

  // 6. Philosophies
  interface PhilosophySeed {
    slug: string;
    title: string;
    textJawa: string;
    meaning: string;
    modernInterpretation: string;
    primaryCharacterSlug?: string;
    category?: string;
    source?: string;
    status?: ContentStatus;
    variantNote?: string;
  }
  const philosophiesData = loadJson<PhilosophySeed[]>('philosophies.json');
  const philosophyMap = new Map<string, number>();

  for (const p of philosophiesData) {
    const primaryCharacterId = p.primaryCharacterSlug
      ? characterMap.get(p.primaryCharacterSlug) || null
      : null;

    const record = await prisma.philosophy.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        textJawa: p.textJawa,
        meaning: p.meaning,
        modernInterpretation: p.modernInterpretation,
        primaryCharacterId,
        category: p.category || 'KEARIFAN',
        source: p.source || null,
        status: p.status || ContentStatus.DRAFT,
        variantNote: p.variantNote || null,
      },
      create: {
        slug: p.slug,
        title: p.title,
        textJawa: p.textJawa,
        meaning: p.meaning,
        modernInterpretation: p.modernInterpretation,
        primaryCharacterId,
        category: p.category || 'KEARIFAN',
        source: p.source || null,
        status: p.status || ContentStatus.DRAFT,
        variantNote: p.variantNote || null,
      },
    });
    philosophyMap.set(p.slug, record.id);

    if (primaryCharacterId) {
      await prisma.characterPhilosophy.upsert({
        where: {
          characterId_philosophyId: {
            characterId: primaryCharacterId,
            philosophyId: record.id,
          },
        },
        update: {},
        create: {
          characterId: primaryCharacterId,
          philosophyId: record.id,
        },
      });
    }
  }
  console.log(`📜 Seeded ${philosophyMap.size} philosophies`);

  // 7. Stories, Chapters & Scenes
  interface StorySceneSeed {
    order: number;
    narration: string;
    speakerName?: string;
    culturalNote?: string;
    illustrationKey?: string;
    metadata?: Record<string, unknown>;
  }
  interface StoryChapterSeed {
    order: number;
    title: string;
    subtitle?: string;
    summary?: string;
    estimatedReadSeconds?: number;
    scenes: StorySceneSeed[];
  }
  interface StorySeed {
    slug: string;
    title: string;
    summary: string;
    coverKey?: string;
    philosophySlug?: string;
    theme?: string;
    source?: string;
    status?: ContentStatus;
    characters: Array<{ characterSlug: string; role?: string }>;
    chapters: StoryChapterSeed[];
  }
  const storiesData = loadJson<StorySeed[]>('stories.json');

  for (const s of storiesData) {
    const philosophyId = s.philosophySlug ? philosophyMap.get(s.philosophySlug) || null : null;

    const story = await prisma.story.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        summary: s.summary,
        coverKey: s.coverKey || null,
        philosophyId,
        theme: s.theme || 'Kepahlawanan',
        source: s.source || null,
        status: s.status || ContentStatus.DRAFT,
      },
      create: {
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        coverKey: s.coverKey || null,
        philosophyId,
        theme: s.theme || 'Kepahlawanan',
        source: s.source || null,
        status: s.status || ContentStatus.DRAFT,
      },
    });

    // Story Characters
    for (const sc of s.characters) {
      const charId = characterMap.get(sc.characterSlug);
      if (charId) {
        await prisma.storyCharacter.upsert({
          where: {
            storyId_characterId: {
              storyId: story.id,
              characterId: charId,
            },
          },
          update: { role: sc.role || 'PROTAGONIST' },
          create: {
            storyId: story.id,
            characterId: charId,
            role: sc.role || 'PROTAGONIST',
          },
        });
      }
    }

    // Chapters & Scenes
    for (const ch of s.chapters) {
      const chapter = await prisma.storyChapter.upsert({
        where: {
          storyId_order: {
            storyId: story.id,
            order: ch.order,
          },
        },
        update: {
          title: ch.title,
          subtitle: ch.subtitle || null,
          summary: ch.summary || null,
          estimatedReadSeconds: ch.estimatedReadSeconds ?? 120,
        },
        create: {
          storyId: story.id,
          order: ch.order,
          title: ch.title,
          subtitle: ch.subtitle || null,
          summary: ch.summary || null,
          estimatedReadSeconds: ch.estimatedReadSeconds ?? 120,
        },
      });

      for (const sc of ch.scenes) {
        await prisma.storyScene.upsert({
          where: {
            chapterId_order: {
              chapterId: chapter.id,
              order: sc.order,
            },
          },
          update: {
            narration: sc.narration,
            speakerName: sc.speakerName || null,
            illustrationKey: sc.illustrationKey || null,
            culturalNote: sc.culturalNote || null,
            metadata: (sc.metadata as any) || null,
          },
          create: {
            chapterId: chapter.id,
            order: sc.order,
            narration: sc.narration,
            speakerName: sc.speakerName || null,
            illustrationKey: sc.illustrationKey || null,
            culturalNote: sc.culturalNote || null,
            metadata: (sc.metadata as any) || null,
          },
        });
      }
    }
  }
  console.log(`📖 Seeded ${storiesData.length} stories with chapters and scenes`);

  // 8. Batik Patterns
  interface BatikSeed {
    slug: string;
    name: string;
    originRegion: string;
    shortHistory: string;
    philosophy: string;
    usage: string;
    vectorKey?: string;
    colorPalette?: string[];
    source?: string;
    status?: ContentStatus;
    relatedCharacterSlugs?: string[];
  }
  const batikData = loadJson<BatikSeed[]>('batik.json');

  for (const b of batikData) {
    const pattern = await prisma.batikPattern.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        originRegion: b.originRegion,
        shortHistory: b.shortHistory,
        philosophy: b.philosophy,
        usage: b.usage,
        vectorKey: b.vectorKey || null,
        colorPalette: b.colorPalette ? b.colorPalette : Prisma.JsonNull,
        source: b.source || null,
        status: b.status || ContentStatus.DRAFT,
      },
      create: {
        slug: b.slug,
        name: b.name,
        originRegion: b.originRegion,
        shortHistory: b.shortHistory,
        philosophy: b.philosophy,
        usage: b.usage,
        vectorKey: b.vectorKey || null,
        colorPalette: b.colorPalette ? b.colorPalette : Prisma.JsonNull,
        source: b.source || null,
        status: b.status || ContentStatus.DRAFT,
      },
    });

    if (b.relatedCharacterSlugs) {
      for (const charSlug of b.relatedCharacterSlugs) {
        const charId = characterMap.get(charSlug);
        if (charId) {
          await prisma.batikRelatedCharacter.upsert({
            where: {
              batikPatternId_characterId: {
                batikPatternId: pattern.id,
                characterId: charId,
              },
            },
            update: {},
            create: {
              batikPatternId: pattern.id,
              characterId: charId,
            },
          });
        }
      }
    }
  }
  console.log(`🎨 Seeded ${batikData.length} batik patterns`);

  // 9. Visual Elements
  interface VisualElementSeed {
    slug: string;
    kind: VisualElementKind;
    name: string;
    meaning: string;
    characterSlug?: string;
    source?: string;
    status?: ContentStatus;
  }
  const visualElementsData = loadJson<VisualElementSeed[]>('visual-elements.json');

  for (const ve of visualElementsData) {
    const characterId = ve.characterSlug ? characterMap.get(ve.characterSlug) || null : null;

    await prisma.visualElement.upsert({
      where: { slug: ve.slug },
      update: {
        kind: ve.kind,
        name: ve.name,
        meaning: ve.meaning,
        characterId,
        source: ve.source || null,
        status: ve.status || ContentStatus.DRAFT,
      },
      create: {
        slug: ve.slug,
        kind: ve.kind,
        name: ve.name,
        meaning: ve.meaning,
        characterId,
        source: ve.source || null,
        status: ve.status || ContentStatus.DRAFT,
      },
    });
  }
  console.log(`👁️  Seeded ${visualElementsData.length} visual elements`);

  // 10. Weton & Weton Traits & Rules
  interface WetonSeed {
    dayName: string;
    pasaran: string;
    neptu: number;
    name: string;
    auraTitle?: string;
    summary?: string;
    characterSlug?: string;
    matchReason?: string;
    compatibilityAdvice?: string;
    traits?: Array<{ trait: string; description: string; kind: string }>;
  }
  const wetonData = loadJson<WetonSeed[]>('weton.json');

  for (const w of wetonData) {
    const wetonRecord = await prisma.weton.upsert({
      where: {
        dayName_pasaran: {
          dayName: w.dayName,
          pasaran: w.pasaran,
        },
      },
      update: {
        neptu: w.neptu,
        name: w.name,
        auraTitle: w.auraTitle || null,
        summary: w.summary || null,
      },
      create: {
        dayName: w.dayName,
        pasaran: w.pasaran,
        neptu: w.neptu,
        name: w.name,
        auraTitle: w.auraTitle || null,
        summary: w.summary || null,
      },
    });

    // Delete existing traits before inserting to maintain clean idempotency
    await prisma.wetonTrait.deleteMany({
      where: { wetonId: wetonRecord.id },
    });

    if (w.traits && w.traits.length > 0) {
      await prisma.wetonTrait.createMany({
        data: w.traits.map((t) => ({
          wetonId: wetonRecord.id,
          trait: t.trait,
          description: t.description,
          kind: t.kind,
        })),
      });
    }

    // Matching Character Rule
    if (w.characterSlug && characterMap.has(w.characterSlug)) {
      const charId = characterMap.get(w.characterSlug)!;
      await prisma.wetonCharacterRule.upsert({
        where: {
          wetonId_characterId: {
            wetonId: wetonRecord.id,
            characterId: charId,
          },
        },
        update: {
          matchReason: w.matchReason || `Karakteristik selaras dengan ${w.name}`,
          compatibilityAdvice: w.compatibilityAdvice || 'Jaga ketenangan batin dalam melangkah.',
          priority: 10,
        },
        create: {
          wetonId: wetonRecord.id,
          characterId: charId,
          matchReason: w.matchReason || `Karakteristik selaras dengan ${w.name}`,
          compatibilityAdvice: w.compatibilityAdvice || 'Jaga ketenangan batin dalam melangkah.',
          priority: 10,
        },
      });
    }
  }
  console.log(`📅 Seeded 35 weton records with traits and rules`);

  // 11. Photobooth Frames & Filters
  interface PhotoboothSeed {
    frames: Array<{
      slug: string;
      name: string;
      assetKey: string;
      config: Record<string, unknown>;
      isActive: boolean;
    }>;
    filters: Array<{
      slug: string;
      name: string;
      assetKey: string;
      config: Record<string, unknown>;
      isActive: boolean;
    }>;
  }
  const pbData = loadJson<PhotoboothSeed>('photobooth.json');

  for (const f of pbData.frames) {
    await prisma.photoboothFrame.upsert({
      where: { slug: f.slug },
      update: {
        name: f.name,
        assetKey: f.assetKey,
        config: f.config as any,
        isActive: f.isActive,
      },
      create: {
        slug: f.slug,
        name: f.name,
        assetKey: f.assetKey,
        config: f.config as any,
        isActive: f.isActive,
      },
    });
  }

  for (const fl of pbData.filters) {
    await prisma.photoboothFilter.upsert({
      where: { slug: fl.slug },
      update: {
        name: fl.name,
        assetKey: fl.assetKey,
        config: fl.config as any,
        isActive: fl.isActive,
      },
      create: {
        slug: fl.slug,
        name: fl.name,
        assetKey: fl.assetKey,
        config: fl.config as any,
        isActive: fl.isActive,
      },
    });
  }
  console.log(`📸 Seeded photobooth frames & filters`);

  console.log('✨ All seed data processed cleanly and idempotently!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
