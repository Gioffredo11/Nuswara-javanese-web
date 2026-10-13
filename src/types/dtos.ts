import { RelationshipType, ShareType } from '@prisma/client';

export interface CharacterSummaryDTO {
  id: number;
  slug: string;
  name: string;
  javaneseName: string | null;
  title: string | null;
  category: {
    id: number;
    slug: string;
    name: string;
  };
  shortDescription: string;
  lineArtKey: string | null;
  neptuAffinity: number | null;
  traitTags: string[];
}

export interface CharacterDetailDTO extends CharacterSummaryDTO {
  personality: string[];
  uniqueFacts: string | null;
  storySummary: string | null;
  kingdom: string | null;
  weapons: Array<{
    id: number;
    slug: string;
    name: string;
    description: string;
    power: string | null;
  }>;
  philosophies: Array<{
    id: number;
    slug: string;
    title: string;
    textJawa: string;
    meaning: string;
    modernInterpretation: string;
  }>;
  relationships: Array<{
    id: number;
    character: {
      id: number;
      slug: string;
      name: string;
    };
    direction: 'FROM' | 'TO';
    type: RelationshipType;
    note: string | null;
  }>;
  stories: Array<{
    id: number;
    slug: string;
    title: string;
    role: string;
  }>;
}

export interface FamilyTreeGraphDTO {
  nodes: Array<{
    id: number;
    slug: string;
    name: string;
    javaneseName?: string | null;
    title?: string | null;
    shortDescription?: string | null;
    category: string;
    categorySlug?: string;
    generationLevel: number;
    kingdom: string | null;
    lineArtKey?: string | null;
  }>;
  edges: Array<{
    id: number;
    fromId: number;
    toId: number;
    fromSlug: string;
    toSlug: string;
    fromName?: string;
    toName?: string;
    type: RelationshipType;
    note: string | null;
  }>;
  links?: Array<{
    id: number;
    fromId: number;
    toId: number;
    fromSlug: string;
    toSlug: string;
    fromName?: string;
    toName?: string;
    type: RelationshipType;
    note: string | null;
  }>;
}

export interface OracleCalculateInputDTO {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  cutoff?: 'midnight' | 'maghrib';
}

export interface OracleResultDTO {
  id?: number;
  name: string;
  birthDate: string;
  effectiveDate: string;
  weton: {
    name: string;
    dayName: string;
    pasaran: string;
    neptu: {
      neptuHari: number;
      neptuPasaran: number;
      totalNeptu: number;
    };
    auraTitle: string | null;
    summary: string | null;
    traits: Array<{
      trait: string;
      description: string;
      kind: string;
    }>;
  };
  characterMatch: {
    slug: string;
    name: string;
    title: string | null;
    shortDescription: string;
    lineArtKey: string | null;
    matchReason: string;
    compatibilityAdvice: string;
    confidenceScore: number;
  };
  relatedStory: {
    slug: string;
    title: string;
    summary: string;
  } | null;
  relatedPhilosophy: {
    slug: string;
    title: string;
    textJawa: string;
    meaning: string;
    modernInterpretation: string;
  } | null;
  ctaUrl: string;
  shareCode?: string;
  interpretationType: 'MODERN_INTERPRETATION';
}

export interface DailyManifestationDTO {
  id: number;
  localDate: string;
  philosophy: {
    id: number;
    slug: string;
    title: string;
    textJawa: string;
    meaning: string; // Konteks budaya
    modernInterpretation: string; // Interpretasi modern
    category: string;
  };
  relatedCharacters: Array<{
    id: number;
    slug: string;
    name: string;
    title: string | null;
  }>;
  isFirstDrawToday: boolean;
}

export interface PhotoboothFrameDTO {
  id: number;
  slug: string;
  name: string;
  assetKey: string;
  config: unknown;
  isActive: boolean;
}

export interface PhotoboothFilterDTO {
  id: number;
  slug: string;
  name: string;
  assetKey: string;
  config: unknown;
  isActive: boolean;
}

export interface ShareCreateDTO {
  type: ShareType;
  referenceId?: string;
  payload?: unknown;
}

export interface ShareResultDTO {
  shortCode: string;
  shareUrl: string;
  type: ShareType;
  referenceId: string | null;
  snapshotData: unknown;
  createdAt: Date;
  expiresAt: Date | null;
}
