import charactersSeed from '../../../prisma/seed-data/characters.json';
import relationshipsSeed from '../../../prisma/seed-data/relationships.json';

export interface TreeNode {
  id: number;
  name: string;
  slug: string;
  javaneseName?: string | null;
  title?: string | null;
  shortDescription?: string | null;
  generationLevel: number;
  kingdom?: string | null;
  category: string;
  categorySlug?: string;
  lineArtKey?: string | null;
}

export interface TreeEdge {
  id: number;
  fromId: number;
  toId: number;
  fromSlug: string;
  toSlug: string;
  fromName?: string;
  toName?: string;
  type: string;
  note?: string | null;
}

const catLookup: Record<string, string> = {
  pandawa: 'Pandawa Lima',
  kurawa: 'Wangsa Kurawa',
  punokawan: 'Punokawan',
  'kesatria-dewa': 'Kesatria & Pahlawan',
  ksatria: 'Kesatria & Pahlawan',
};

const sortedChars = [...charactersSeed].sort((a, b) => {
  if (a.generationLevel !== b.generationLevel) {
    return a.generationLevel - b.generationLevel;
  }
  return (a.order ?? 0) - (b.order ?? 0);
});

const charMap = new Map<string, { id: number; name: string }>();

export const INITIAL_TREE_NODES: TreeNode[] = sortedChars.map((c, idx) => {
  const id = idx + 1;
  charMap.set(c.slug, { id, name: c.name });
  return {
    id,
    slug: c.slug,
    name: c.name,
    javaneseName: c.javaneseName ?? null,
    title: c.title ?? null,
    shortDescription: c.shortDescription ?? null,
    category: catLookup[c.categorySlug] || 'Tokoh Wayang',
    categorySlug: c.categorySlug,
    generationLevel: c.generationLevel,
    kingdom: c.kingdom ?? null,
    lineArtKey: c.lineArtKey ?? null,
  };
});

export const INITIAL_TREE_EDGES: TreeEdge[] = relationshipsSeed.map((r, idx) => {
  const from = charMap.get(r.fromSlug);
  const to = charMap.get(r.toSlug);
  return {
    id: idx + 1,
    fromId: from?.id ?? 0,
    toId: to?.id ?? 0,
    fromSlug: r.fromSlug,
    toSlug: r.toSlug,
    fromName: from?.name ?? r.fromSlug,
    toName: to?.name ?? r.toSlug,
    type: r.type,
    note: r.note ?? null,
  };
});
