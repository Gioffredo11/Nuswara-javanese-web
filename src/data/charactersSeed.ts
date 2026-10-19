import charactersRaw from '../../prisma/seed-data/characters.json';
import { CharacterItem } from '@/components/ui/Wayang3DBookCard';

const categoryLabels: Record<string, { id: number; name: string }> = {
  pandawa: { id: 1, name: 'Pandawa' },
  kurawa: { id: 2, name: 'Kurawa' },
  punokawan: { id: 3, name: 'Punokawan' },
  'kesatria-dewa': { id: 4, name: 'Ksatria & Pahlawan' },
  ksatria: { id: 4, name: 'Ksatria & Pahlawan' },
};

export const defaultCategories = [
  { id: 1, name: 'Pandawa', slug: 'pandawa' },
  { id: 2, name: 'Kurawa', slug: 'kurawa' },
  { id: 3, name: 'Punokawan', slug: 'punokawan' },
  { id: 4, name: 'Ksatria & Pahlawan', slug: 'kesatria-dewa' },
];

export const defaultCharactersSeed: CharacterItem[] = (charactersRaw as Array<{
  slug: string;
  name: string;
  javaneseName?: string;
  title?: string;
  categorySlug: string;
  shortDescription: string;
  lineArtKey?: string;
}>).map((c, index) => {
  const catInfo = categoryLabels[c.categorySlug] || { id: 4, name: 'Ksatria & Pahlawan' };
  return {
    id: index + 1,
    slug: c.slug,
    name: c.name,
    javaneseName: c.javaneseName || null,
    title: c.title || null,
    shortDescription: c.shortDescription,
    category: {
      id: catInfo.id,
      slug: c.categorySlug,
      name: catInfo.name,
    },
    lineArtKey: c.lineArtKey || null,
  };
});
