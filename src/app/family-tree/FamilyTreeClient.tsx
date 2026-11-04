'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/common/Link';
import Image from 'next/image';
import { getTarotImagePath, GununganSvg } from '@/components/ui/WayangVectors';
import {
  GitFork,
  ArrowRight,
  Info,
  Users,
  Search,
} from 'lucide-react';

import {
  INITIAL_TREE_NODES,
  INITIAL_TREE_EDGES,
  TreeNode,
  TreeEdge,
} from './initialTreeData';

function getCategoryName(category: any): string {
  if (!category) return 'Tokoh Wayang';
  if (typeof category === 'string') return category;
  if (typeof category === 'object' && category.name) return category.name;
  return 'Tokoh Wayang';
}

function getRelationInfo(
  type: string,
  isFromPerspective?: boolean,
  isFrom?: boolean
): { label: string; badgeColor: string } {
  const t = (type || '').toUpperCase();
  switch (t) {
    case 'SIBLING':
      return {
        label: 'Saudara Kandung',
        badgeColor: 'bg-amber-950/60 text-amber-300 border-amber-600/50',
      };
    case 'PARENT':
      if (isFromPerspective) {
        return {
          label: isFrom ? 'Anak Kandung' : 'Ayah / Pamomong',
          badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50',
        };
      }
      return {
        label: 'Ayah & Anak',
        badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50',
      };
    case 'SPOUSE':
      return {
        label: 'Suami — Istri',
        badgeColor: 'bg-rose-950/60 text-rose-300 border-rose-600/50',
      };
    case 'TEACHER':
      if (isFromPerspective) {
        return {
          label: isFrom ? 'Murid Binaan' : 'Guru / Pamomong',
          badgeColor: 'bg-blue-950/60 text-blue-300 border-blue-600/50',
        };
      }
      return {
        label: 'Guru & Murid',
        badgeColor: 'bg-blue-950/60 text-blue-300 border-blue-600/50',
      };
    case 'RIVAL':
      return {
        label: 'Rival Kurusetra',
        badgeColor: 'bg-red-950/60 text-red-300 border-red-600/50',
      };
    case 'ALLY':
      return {
        label: 'Sekutu Karib',
        badgeColor: 'bg-cyan-950/60 text-cyan-300 border-cyan-600/50',
      };
    default:
      return {
        label: type,
        badgeColor: 'bg-[#14110E] text-[#C5A059] border-[#C5A059]/30',
      };
  }
}

export function FamilyTreeClient() {
  const [nodes, setNodes] = useState<TreeNode[]>(INITIAL_TREE_NODES);
  const [edges, setEdges] = useState<TreeEdge[]>(INITIAL_TREE_EDGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(() => {
    return INITIAL_TREE_NODES.find((n) => n.slug === 'arjuna') || INITIAL_TREE_NODES[0] || null;
  });
  const [activeTab, setActiveTab] = useState<'visual' | 'lineage'>('visual');
  const [searchQuery, setSearchQuery] = useState('');

  const loadTreeData = async (signalParam?: AbortSignal | React.MouseEvent) => {
    const signal = signalParam instanceof AbortSignal ? signalParam : undefined;

    if (nodes.length === 0) {
      setLoading(true);
    }
    setError(null);
    try {
      const res = await fetch('/api/family-tree', {
        signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        if (nodes.length === 0) {
          setError('Gagal memuat silsilah wayang dari server.');
        }
        return;
      }

      const json = await res.json();
      const data = json.data || json;

      if (json.success || data?.nodes) {
        const rawNodes: TreeNode[] = Array.isArray(data?.nodes) ? data.nodes : [];
        const rawEdges: TreeEdge[] = Array.isArray(data?.edges)
          ? data.edges
          : Array.isArray(data?.links)
          ? data.links
          : [];

        if (rawNodes.length > 0) {
          setNodes(rawNodes);
          setEdges(rawEdges);

          // Update selected node if needed
          setSelectedNode((prev) => {
            if (prev) {
              const match = rawNodes.find((n) => n.slug === prev.slug || n.id === prev.id);
              if (match) return match;
            }
            const arjuna = rawNodes.find((n) => n.slug === 'arjuna');
            return arjuna || rawNodes[0];
          });
        }
      } else if (nodes.length === 0) {
        const errMsg = json.error?.message || json.message || 'Gagal memuat silsilah wayang.';
        setError(errMsg);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || signal?.aborted) {
        return;
      }
      if (nodes.length === 0) {
        console.warn('Gagal memuat data silsilah wayang:', err);
        setError(err.message || 'Koneksi ke server gagal.');
      } else {
        console.warn('[FamilyTree] Menggunakan data lokal:', err?.message || err);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadTreeData(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  // Filter nodes by search query
  const filteredNodes = searchQuery.trim()
    ? nodes.filter(
        (n) =>
          n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (n.title && n.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (n.kingdom && n.kingdom.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : nodes;

  // Group nodes by generation level
  const gen1 = filteredNodes.filter((n) => n.generationLevel === 1);
  const gen2 = filteredNodes.filter((n) => n.generationLevel === 2);
  const gen3 = filteredNodes.filter((n) => n.generationLevel >= 3);

  // Find relationships for selected node
  const activeRelationships = selectedNode && Array.isArray(edges)
    ? edges.filter(
        (e) =>
          e.fromId === selectedNode.id ||
          e.toId === selectedNode.id ||
          e.fromSlug === selectedNode.slug ||
          e.toSlug === selectedNode.slug
      )
    : [];

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <GununganSvg className="w-12 h-16 text-[#C5A059]/60 animate-pulse" />
        <p className="text-xs font-mono text-[#A89F91] uppercase tracking-widest">
          Menyusun Silsilah Wayang Purwa...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center p-6 bg-[#14110E] border border-red-500/40 space-y-4 shadow-xl">
        <p className="text-xs text-red-200 font-mono">{error}</p>
        <button
          onClick={loadTreeData}
          className="px-4 py-2 bg-[#C5A059] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer"
        >
          Coba Muat Ulang
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-[#C5A059]/20 pb-5">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
            [ SILSILAH // 02 ] — MAHABHARATA JAWA PURWA
          </span>
          <h2 className="text-2xl sm:text-3xl font-royal font-bold text-[#F4EFE6] tracking-tight">
            Silsilah Wayang Interaktif
          </h2>
          <p className="text-xs text-[#A89F91] max-w-xl font-sans">
            Peta relasi kekerabatan dan silsilah para ksatria peradaban Jawa Purwa.
          </p>
        </div>

        {/* View Switcher & Search Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search filter input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A89F91]" />
            <input
              type="text"
              placeholder="Cari tokoh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-[#14110E] border border-[#C5A059]/30 rounded-xl text-[#F4EFE6] placeholder-[#A89F91]/50 focus:border-[#C5A059] focus:outline-none w-40 sm:w-48 font-mono transition-colors"
            />
          </div>

          <div className="flex bg-[#14110E] border border-[#C5A059]/30 rounded-full p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer text-xs ${
                activeTab === 'visual'
                  ? 'bg-[#C5A059] text-[#0C0A08] font-bold shadow-md'
                  : 'text-[#A89F91] hover:text-[#F4EFE6]'
              }`}
            >
              Bagan Visual
            </button>
            <button
              onClick={() => setActiveTab('lineage')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer text-xs ${
                activeTab === 'lineage'
                  ? 'bg-[#C5A059] text-[#0C0A08] font-bold shadow-md'
                  : 'text-[#A89F91] hover:text-[#F4EFE6]'
              }`}
            >
              Daftar Relasi
            </button>
          </div>
        </div>
      </div>

      {/* Main Work Area: Tree Canvas + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Canvas / Tree Area */}
        <div className="lg:col-span-8 bg-[#0C0A08] border border-[#C5A059]/30 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-2xl relative">
          {activeTab === 'visual' && (
            <div className="sm:hidden flex items-center justify-between text-[11px] font-mono text-[#C5A059] bg-[#14110E] border border-[#C5A059]/30 rounded-lg px-3 py-1.5 mb-4">
              <span>Geser horizontal untuk menelusuri bagan purwa</span>
              <span>⇄</span>
            </div>
          )}
          {activeTab === 'visual' ? (
            <div className="min-w-[480px]">
              {/* CONNECTED LINEAGE TREE WITH ORTHOGONAL SPINE */}
              <div className="relative border-l-2 border-[#C5A059]/35 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
                {/* GENERASI 1: Sesepuh & Pamomong */}
                {gen1.length > 0 && (
                  <div className="relative space-y-3">
                    {/* Orthogonal connector arm */}
                    <div className="absolute -left-6 sm:-left-8 top-3.5 w-6 sm:w-8 h-[2px] bg-[#C5A059]/40" />

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0C0A08] bg-[#C5A059] px-2.5 py-0.5 font-bold rounded-full shadow-xs">
                        01. LELUHUR &amp; PAMOMONG
                      </span>
                      <div className="flex-1 h-[1px] bg-[#C5A059]/20" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-0.5">
                      {gen1.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        const directRel = selectedNode && node.id !== selectedNode.id
                          ? activeRelationships.find(
                              (r) =>
                                (r.fromSlug === selectedNode.slug && r.toSlug === node.slug) ||
                                (r.toSlug === selectedNode.slug && r.fromSlug === node.slug)
                            )
                          : null;
                        const relInfo = directRel
                          ? getRelationInfo(directRel.type, true, directRel.fromSlug === selectedNode?.slug)
                          : null;

                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`p-2.5 border text-left transition-all duration-300 cursor-pointer relative rounded-xl flex items-center gap-3 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] text-[#F4EFE6] border-[#C5A059] font-bold shadow-lg ring-2 ring-[#C5A059]/50 scale-[1.02]'
                                : relInfo
                                ? 'bg-[#1C1610] text-[#F4EFE6] border-[#C5A059]/60 hover:border-[#C5A059] shadow-sm'
                                : 'bg-[#14110E] text-[#D5C9B5] border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#1A1612]'
                            }`}
                          >
                            {/* Visual Tarot Artwork */}
                            <div className={`relative w-11 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                              isSelected
                                ? 'border-[#C5A059] ring-1 ring-[#C5A059]/60 shadow-md'
                                : relInfo
                                ? 'border-[#C5A059]/60 ring-1 ring-[#C5A059]/30'
                                : 'border-[#C5A059]/30'
                            }`}>
                              <Image
                                src={getTarotImagePath(node.slug)}
                                alt={node.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>

                            {/* Identity Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-mono uppercase tracking-wider block truncate ${
                                  isSelected ? 'text-[#C5A059]' : 'text-[#8E8271]'
                                }`}>
                                  {node.kingdom || getCategoryName(node.category)}
                                </span>
                                {relInfo && (
                                  <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold shrink-0 border ${relInfo.badgeColor}`}>
                                    {relInfo.label}
                                  </span>
                                )}
                              </div>
                              <div className={`font-royal font-bold text-sm block truncate mt-0.5 ${
                                isSelected ? 'text-[#F4EFE6]' : 'text-[#D5C9B5]'
                              }`}>
                                {node.name}
                              </div>
                              {node.title && (
                                <div className={`text-[10px] font-sans truncate mt-0.5 ${
                                  isSelected ? 'text-[#C5A059]/90' : 'text-[#8E8271]'
                                }`}>
                                  {node.title}
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* GENERASI 2: Pandawa & Kurawa */}
                {gen2.length > 0 && (
                  <div className="relative space-y-3">
                    {/* Orthogonal connector arm */}
                    <div className="absolute -left-6 sm:-left-8 top-3.5 w-6 sm:w-8 h-[2px] bg-[#C5A059]/40" />

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0C0A08] bg-[#C5A059] px-2.5 py-0.5 font-bold rounded-full shadow-xs">
                        02. PANDAWA &amp; KURAWA
                      </span>
                      <div className="flex-1 h-[1px] bg-[#C5A059]/20" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-0.5">
                      {gen2.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        const directRel = selectedNode && node.id !== selectedNode.id
                          ? activeRelationships.find(
                              (r) =>
                                (r.fromSlug === selectedNode.slug && r.toSlug === node.slug) ||
                                (r.toSlug === selectedNode.slug && r.fromSlug === node.slug)
                            )
                          : null;
                        const relInfo = directRel
                          ? getRelationInfo(directRel.type, true, directRel.fromSlug === selectedNode?.slug)
                          : null;

                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`p-2.5 border text-left transition-all duration-300 cursor-pointer relative rounded-xl flex items-center gap-3 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] text-[#F4EFE6] border-[#C5A059] font-bold shadow-lg ring-2 ring-[#C5A059]/50 scale-[1.02]'
                                : relInfo
                                ? 'bg-[#1C1610] text-[#F4EFE6] border-[#C5A059]/60 hover:border-[#C5A059] shadow-sm'
                                : 'bg-[#14110E] text-[#D5C9B5] border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#1A1612]'
                            }`}
                          >
                            {/* Visual Tarot Artwork */}
                            <div className={`relative w-11 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                              isSelected
                                ? 'border-[#C5A059] ring-1 ring-[#C5A059]/60 shadow-md'
                                : relInfo
                                ? 'border-[#C5A059]/60 ring-1 ring-[#C5A059]/30'
                                : 'border-[#C5A059]/30'
                            }`}>
                              <Image
                                src={getTarotImagePath(node.slug)}
                                alt={node.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>

                            {/* Identity Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-mono uppercase tracking-wider block truncate ${
                                  isSelected ? 'text-[#C5A059]' : 'text-[#8E8271]'
                                }`}>
                                  {node.kingdom || getCategoryName(node.category)}
                                </span>
                                {relInfo && (
                                  <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold shrink-0 border ${relInfo.badgeColor}`}>
                                    {relInfo.label}
                                  </span>
                                )}
                              </div>
                              <div className={`font-royal font-bold text-sm block truncate mt-0.5 ${
                                isSelected ? 'text-[#F4EFE6]' : 'text-[#D5C9B5]'
                              }`}>
                                {node.name}
                              </div>
                              {node.title && (
                                <div className={`text-[10px] font-sans truncate mt-0.5 ${
                                  isSelected ? 'text-[#C5A059]/90' : 'text-[#8E8271]'
                                }`}>
                                  {node.title}
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* GENERASI 3: Penerus & Ksatria Muda */}
                {gen3.length > 0 && (
                  <div className="relative space-y-3">
                    {/* Orthogonal connector arm */}
                    <div className="absolute -left-6 sm:-left-8 top-3.5 w-6 sm:w-8 h-[2px] bg-[#C5A059]/40" />

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0C0A08] bg-[#C5A059] px-2.5 py-0.5 font-bold rounded-full shadow-xs">
                        03. PENERUS &amp; KESATRIA MUDA
                      </span>
                      <div className="flex-1 h-[1px] bg-[#C5A059]/20" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-0.5">
                      {gen3.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        const directRel = selectedNode && node.id !== selectedNode.id
                          ? activeRelationships.find(
                              (r) =>
                                (r.fromSlug === selectedNode.slug && r.toSlug === node.slug) ||
                                (r.toSlug === selectedNode.slug && r.fromSlug === node.slug)
                            )
                          : null;
                        const relInfo = directRel
                          ? getRelationInfo(directRel.type, true, directRel.fromSlug === selectedNode?.slug)
                          : null;

                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`p-2.5 border text-left transition-all duration-300 cursor-pointer relative rounded-xl flex items-center gap-3 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] text-[#F4EFE6] border-[#C5A059] font-bold shadow-lg ring-2 ring-[#C5A059]/50 scale-[1.02]'
                                : relInfo
                                ? 'bg-[#1C1610] text-[#F4EFE6] border-[#C5A059]/60 hover:border-[#C5A059] shadow-sm'
                                : 'bg-[#14110E] text-[#D5C9B5] border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#1A1612]'
                            }`}
                          >
                            {/* Visual Tarot Artwork */}
                            <div className={`relative w-11 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                              isSelected
                                ? 'border-[#C5A059] ring-1 ring-[#C5A059]/60 shadow-md'
                                : relInfo
                                ? 'border-[#C5A059]/60 ring-1 ring-[#C5A059]/30'
                                : 'border-[#C5A059]/30'
                            }`}>
                              <Image
                                src={getTarotImagePath(node.slug)}
                                alt={node.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>

                            {/* Identity Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-mono uppercase tracking-wider block truncate ${
                                  isSelected ? 'text-[#C5A059]' : 'text-[#8E8271]'
                                }`}>
                                  {node.kingdom || getCategoryName(node.category)}
                                </span>
                                {relInfo && (
                                  <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold shrink-0 border ${relInfo.badgeColor}`}>
                                    {relInfo.label}
                                  </span>
                                )}
                              </div>
                              <div className={`font-royal font-bold text-sm block truncate mt-0.5 ${
                                isSelected ? 'text-[#F4EFE6]' : 'text-[#D5C9B5]'
                              }`}>
                                {node.name}
                              </div>
                              {node.title && (
                                <div className={`text-[10px] font-sans truncate mt-0.5 ${
                                  isSelected ? 'text-[#C5A059]/90' : 'text-[#8E8271]'
                                }`}>
                                  {node.title}
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {filteredNodes.length === 0 && (
                <div className="py-20 text-center text-[#A89F91] text-xs font-mono">
                  Tidak ditemukan tokoh dengan kata kunci &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          ) : (
            /* LIST KEKERABATAN TAB */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20 font-mono">
                <span className="text-xs font-bold uppercase text-[#C5A059]">
                  Daftar Relasi Kekerabatan ({edges.length})
                </span>
                <span className="text-xs text-[#A89F91]">
                  Total {nodes.length} Tokoh
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-2">
                {edges.map((e) => {
                  const fromNode = nodes.find((n) => n.id === e.fromId || n.slug === e.fromSlug);
                  const toNode = nodes.find((n) => n.id === e.toId || n.slug === e.toSlug);
                  const fromDisplayName = e.fromName || fromNode?.name || e.fromSlug;
                  const toDisplayName = e.toName || toNode?.name || e.toSlug;
                  const relInfo = getRelationInfo(e.type);

                  return (
                    <div
                      key={e.id}
                      className="p-3.5 bg-[#14110E] border border-[#C5A059]/25 hover:border-[#C5A059]/60 rounded-xl transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5A059]/15 pb-2">
                        <div className="flex items-center gap-2 text-sm font-royal font-bold text-[#F4EFE6]">
                          <button
                            onClick={() => fromNode && setSelectedNode(fromNode)}
                            className="hover:text-[#C5A059] transition-colors cursor-pointer hover:underline underline-offset-2"
                          >
                            {fromDisplayName}
                          </button>
                          <span className="text-[#C5A059] font-mono text-xs">↔</span>
                          <button
                            onClick={() => toNode && setSelectedNode(toNode)}
                            className="hover:text-[#C5A059] transition-colors cursor-pointer hover:underline underline-offset-2"
                          >
                            {toDisplayName}
                          </button>
                        </div>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-semibold border ${relInfo.badgeColor}`}>
                          {relInfo.label}
                        </span>
                      </div>

                      {e.note && (
                        <p className="text-xs text-[#A89F91] leading-relaxed font-sans">
                          {e.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected Node Inspector Drawer (Compact & Clean) */}
        <div className="lg:col-span-4">
          {selectedNode ? (
            <div className="bg-[#14110E] border border-[#C5A059]/35 rounded-2xl p-5 space-y-4 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#C5A059]/20 font-mono text-[10px]">
                <span className="uppercase tracking-widest text-[#C5A059] font-bold">
                  {getCategoryName(selectedNode.category)}
                </span>
                {selectedNode.kingdom && (
                  <span className="text-[#A89F91] uppercase tracking-wider">
                    {selectedNode.kingdom}
                  </span>
                )}
              </div>

              {/* Character Header */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-22 aspect-[2/3] bg-[#0C0A08] rounded-xl overflow-hidden shrink-0 border border-[#C5A059]/50 shadow-md">
                  <Image
                    src={getTarotImagePath(selectedNode.slug)}
                    alt={selectedNode.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#F4EFE6] truncate">
                    {selectedNode.name}
                  </h3>
                  {selectedNode.javaneseName && (
                    <span className="text-xs text-[#C5A059] italic font-editorial block truncate">
                      {selectedNode.javaneseName}
                    </span>
                  )}
                  {selectedNode.title && (
                    <p className="text-xs text-[#A89F91] font-sans mt-0.5 line-clamp-1">
                      {selectedNode.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Short explanation */}
              {selectedNode.shortDescription && (
                <p className="text-xs text-[#A89F91] leading-relaxed font-sans border-b border-[#C5A059]/15 pb-3">
                  {selectedNode.shortDescription}
                </p>
              )}

              {/* Character Personality / Karakter Tags */}
              {selectedNode.personality && selectedNode.personality.length > 0 && (
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] font-bold block">
                    Watak &amp; Karakter
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.personality.map((trait, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 bg-[#0C0A08] border border-[#C5A059]/30 text-[#D5C9B5] rounded-md"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Relationships related to this node */}
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold">
                    Ikatan &amp; Relasi ({activeRelationships.length})
                  </h4>
                  <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>

                {activeRelationships.length === 0 ? (
                  <p className="text-xs text-[#A89F91] italic font-mono py-2">
                    Belum ada data relasi terhubung.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {activeRelationships.map((rel) => {
                      const isFrom = rel.fromId === selectedNode.id || rel.fromSlug === selectedNode.slug;
                      const otherSlug = isFrom ? rel.toSlug : rel.fromSlug;
                      const otherName = isFrom
                        ? rel.toName || nodes.find((n) => n.slug === otherSlug)?.name || otherSlug
                        : rel.fromName || nodes.find((n) => n.slug === otherSlug)?.name || otherSlug;
                      const otherNode = nodes.find((n) => n.slug === otherSlug);
                      const relInfo = getRelationInfo(rel.type, true, isFrom);

                      return (
                        <div
                          key={rel.id}
                          className="p-2.5 bg-[#0C0A08] border border-[#C5A059]/20 hover:border-[#C5A059]/50 rounded-xl space-y-1.5 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={() => otherNode && setSelectedNode(otherNode)}
                              className="font-royal font-bold text-xs text-[#F4EFE6] hover:text-[#C5A059] text-left cursor-pointer hover:underline underline-offset-2 flex items-center gap-1.5"
                            >
                              <span>{otherName}</span>
                              <span className="text-[10px] text-[#C5A059]">↗</span>
                            </button>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase shrink-0 font-semibold border ${relInfo.badgeColor}`}>
                              {relInfo.label}
                            </span>
                          </div>

                          {rel.note && (
                            <p className="text-[10px] text-[#A89F91] leading-relaxed font-sans">
                              {rel.note}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* CTA to Wayangpedia */}
              <div className="pt-3 border-t border-[#C5A059]/20">
                <Link
                  href={`/wayangpedia/${selectedNode.slug}`}
                  className="w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[42px]"
                >
                  <span>Lihat Profil Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#14110E] border border-[#C5A059]/35 rounded-2xl p-8 text-center space-y-2">
              <Info className="w-8 h-8 text-[#C5A059] mx-auto opacity-75" />
              <p className="text-xs text-[#A89F91] font-mono">
                Pilih salah satu karakter di bagan silsilah untuk melihat relasi dan profilnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FamilyTreeClient;