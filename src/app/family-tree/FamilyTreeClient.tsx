'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/common/Link';
import Image from 'next/image';
import { getTarotImagePath, GununganSvg } from '@/components/ui/WayangVectors';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
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

export function FamilyTreeClient() {
  const [nodes, setNodes] = useState<TreeNode[]>(INITIAL_TREE_NODES);
  const [edges, setEdges] = useState<TreeEdge[]>(INITIAL_TREE_EDGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(() => {
    return INITIAL_TREE_NODES.find((n) => n.slug === 'arjuna') || INITIAL_TREE_NODES[0] || null;
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'visual' | 'lineage'>('visual');
  const [searchQuery, setSearchQuery] = useState('');

  const loadTreeData = async () => {
    if (nodes.length === 0) {
      setLoading(true);
    }
    setError(null);
    try {
      const res = await fetch('/api/family-tree');
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
      console.error('Error fetching family-tree:', err);
      if (nodes.length === 0) {
        setError(err.message || 'Koneksi ke server gagal.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreeData();
  }, []);

  // Filter nodes by search query if any
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
        <GununganSvg className="w-12 h-16 text-[#C59B53]/60 animate-pulse" />
        <p className="text-xs font-mono text-[#D8C8AD] uppercase tracking-widest">
          Menyusun Silsilah Wayang Purwa...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center p-6 bg-[#1C1311] rounded-2xl border border-red-500/40 space-y-4 shadow-xl">
        <p className="text-xs text-red-200 font-medium">{error}</p>
        <button
          onClick={loadTreeData}
          className="px-4 py-2 bg-[#C59B53] text-[#0D0C0A] font-semibold text-xs rounded-lg hover:bg-[#ECC47E] transition-colors cursor-pointer"
        >
          Coba Muat Ulang
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B99A60]">
            <GitFork className="w-4 h-4 text-[#ECC47E]" />
            <span>Mahabharata Jawa Purwa Lineage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-royal font-bold text-[#F0E6D4] tracking-tight">
            Silsilah Wayang Interaktif
          </h2>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-xl font-sans leading-relaxed">
            Peta hubungan kekerabatan, guru-murid, dan ikatan darah para ksatria. Klik pada kartu tokoh untuk menelaah relasi dan profil lengkapnya.
          </p>
        </div>

        {/* View Switcher, Search & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search filter input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A89F91]" />
            <input
              type="text"
              placeholder="Cari tokoh wayang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-[#14110E] border border-[#C59B53]/35 text-[#F5EFE6] placeholder-[#A89F91]/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ECC47E] w-40 sm:w-48"
            />
          </div>

          <div className="flex bg-[#14110E] border border-[#C59B53]/30 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-[#B99A60] text-[#100D0A] font-bold shadow-sm'
                  : 'text-[#D8C8AD] hover:text-[#F0E6D4]'
              }`}
            >
              Bagan Visual
            </button>
            <button
              onClick={() => setActiveTab('lineage')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'lineage'
                  ? 'bg-[#B99A60] text-[#100D0A] font-bold shadow-sm'
                  : 'text-[#D8C8AD] hover:text-[#F0E6D4]'
              }`}
            >
              Daftar Kekerabatan
            </button>
          </div>

          {activeTab === 'visual' && (
            <div className="hidden sm:flex items-center bg-[#14110E] border border-[#C59B53]/30 p-1 rounded-lg">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1.5 text-[#D8C8AD] hover:text-[#F5EFE6] rounded hover:bg-[#241B12] cursor-pointer"
                title="Perkecil"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-2 text-[#ECC47E]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                className="p-1.5 text-[#D8C8AD] hover:text-[#F5EFE6] rounded hover:bg-[#241B12] cursor-pointer"
                title="Perbesar"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-[#D8C8AD] hover:text-[#F5EFE6] rounded hover:bg-[#241B12] ml-1 cursor-pointer"
                title="Reset Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Work Area: Tree Canvas + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas / Tree Area */}
        <div className="lg:col-span-8 bg-[#120F0C] border border-[#C59B53]/35 rounded-2xl p-4 sm:p-8 min-h-[520px] overflow-x-auto shadow-2xl relative">
          {activeTab === 'visual' && (
            <div className="sm:hidden flex items-center justify-between text-[11px] font-mono text-[#ECC47E] bg-[#1A1510] border border-[#C59B53]/30 px-3 py-1.5 rounded-lg mb-4">
              <span>Geser horizontal untuk menelusuri bagan purwa</span>
              <span>⇄</span>
            </div>
          )}
          {activeTab === 'visual' ? (
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              className="transition-transform duration-200 space-y-12 min-w-[500px]"
            >
              {/* GENERASI 1: Sesepuh & Pamomong */}
              {gen1.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] border border-[#C59B53]/30 px-2.5 py-0.5 rounded font-semibold">
                      Generasi 1 • Leluhur & Pamomong ({gen1.length})
                    </span>
                    <div className="flex-1 h-[1px] bg-[#C59B53]/25" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {gen1.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#DFB873] via-[#ECC47E] to-[#C59B53] text-[#100D0A] font-bold shadow-lg scale-102 ring-2 ring-[#ECC47E]'
                              : 'bg-[#18130E] text-[#F5EFE6] border-[#C59B53]/25 hover:border-[#ECC47E] hover:shadow-md'
                          }`}
                        >
                          <div className={`text-[10px] font-mono ${isSelected ? 'text-[#3D2C12]' : 'text-[#C59B53]'}`}>
                            {getCategoryName(node.category)}
                          </div>
                          <div className="font-royal font-bold text-sm">{node.name}</div>
                          {node.title && (
                            <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#3D2C12]' : 'text-[#A89F91]'}`}>
                              {node.title}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GENERASI 2: Pandawa & Kurawa */}
              {gen2.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] border border-[#C59B53]/30 px-2.5 py-0.5 rounded font-semibold">
                      Generasi 2 • Ksatria Utama (Pandawa & Kurawa) ({gen2.length})
                    </span>
                    <div className="flex-1 h-[1px] bg-[#C59B53]/25" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {gen2.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#DFB873] via-[#ECC47E] to-[#C59B53] text-[#100D0A] font-bold shadow-lg scale-102 ring-2 ring-[#ECC47E]'
                              : 'bg-[#18130E] text-[#F5EFE6] border-[#C59B53]/25 hover:border-[#ECC47E] hover:shadow-md'
                          }`}
                        >
                          <div className={`text-[10px] font-mono ${isSelected ? 'text-[#3D2C12]' : 'text-[#C59B53]'}`}>
                            {node.kingdom || 'Astina'}
                          </div>
                          <div className="font-royal font-bold text-sm truncate">{node.name}</div>
                          {node.title && (
                            <div className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-[#3D2C12]' : 'text-[#A89F91]'}`}>
                              {node.title}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GENERASI 3: Penerus & Ksatria Muda */}
              {gen3.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] border border-[#C59B53]/30 px-2.5 py-0.5 rounded font-semibold">
                      Generasi 3 • Pahlawan Muda & Penerus ({gen3.length})
                    </span>
                    <div className="flex-1 h-[1px] bg-[#C59B53]/25" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {gen3.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#DFB873] via-[#ECC47E] to-[#C59B53] text-[#100D0A] font-bold shadow-lg scale-102 ring-2 ring-[#ECC47E]'
                              : 'bg-[#18130E] text-[#F5EFE6] border-[#C59B53]/25 hover:border-[#ECC47E] hover:shadow-md'
                          }`}
                        >
                          <div className={`text-[10px] font-mono ${isSelected ? 'text-[#3D2C12]' : 'text-[#C59B53]'}`}>
                            {getCategoryName(node.category)}
                          </div>
                          <div className="font-royal font-bold text-sm">{node.name}</div>
                          {node.title && (
                            <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#3D2C12]' : 'text-[#A89F91]'}`}>
                              {node.title}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredNodes.length === 0 && (
                <div className="py-20 text-center text-[#A89F91] text-xs">
                  Tidak ditemukan tokoh dengan kata kunci &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          ) : (
            /* LIST KEKERABATAN TAB */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#C59B53]/20">
                <span className="text-xs font-mono font-semibold uppercase text-[#ECC47E]">
                  Daftar Relasi Kekerabatan Terdata ({edges.length})
                </span>
                <span className="text-xs text-[#A89F91]">
                  Total {nodes.length} Tokoh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-2">
                {edges.map((e) => {
                  const fromNode = nodes.find((n) => n.id === e.fromId || n.slug === e.fromSlug);
                  const toNode = nodes.find((n) => n.id === e.toId || n.slug === e.toSlug);
                  const fromDisplayName = e.fromName || fromNode?.name || e.fromSlug;
                  const toDisplayName = e.toName || toNode?.name || e.toSlug;

                  return (
                    <div
                      key={e.id}
                      className="p-3 bg-[#18130E] rounded-xl border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all shadow-md flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5EFE6]">
                          <button
                            onClick={() => fromNode && setSelectedNode(fromNode)}
                            className="hover:text-[#ECC47E] underline-offset-2 hover:underline cursor-pointer"
                          >
                            {fromDisplayName}
                          </button>
                          <span className="text-[#C59B53] font-mono text-[10px]">↔</span>
                          <button
                            onClick={() => toNode && setSelectedNode(toNode)}
                            className="hover:text-[#ECC47E] underline-offset-2 hover:underline cursor-pointer"
                          >
                            {toDisplayName}
                          </button>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#241B12] text-[#ECC47E] border border-[#C59B53]/40 uppercase">
                          {e.type}
                        </span>
                      </div>

                      {e.note && (
                        <p className="text-[11px] text-[#A89F91] leading-snug font-sans">
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

        {/* Selected Node Inspector Drawer */}
        <div className="lg:col-span-4">
          {selectedNode ? (
            <div className="bg-[#14110E] rounded-2xl border border-[#C59B53]/35 p-6 space-y-6 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[#C59B53]/20">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] px-2 py-0.5 rounded border border-[#C59B53]/40">
                  {getCategoryName(selectedNode.category)}
                </span>
                <span className="text-xs text-[#A89F91] font-mono">
                  Gen-{selectedNode.generationLevel} {selectedNode.kingdom ? `• ${selectedNode.kingdom}` : ''}
                </span>
              </div>

              {/* Character Header */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-24 aspect-[2/3] bg-[#1B1611] rounded-xl overflow-hidden shrink-0 border border-[#C59B53]/50 shadow-md">
                  <Image
                    src={getTarotImagePath(selectedNode.slug)}
                    alt={selectedNode.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-royal text-xl font-bold text-[#F5EFE6]">
                    {selectedNode.name}
                  </h3>
                  {selectedNode.javaneseName && (
                    <span className="text-xs text-[#DFB873] italic block">
                      {selectedNode.javaneseName}
                    </span>
                  )}
                  {selectedNode.title && (
                    <p className="text-xs text-[#ECC47E] font-medium mt-0.5">
                      {selectedNode.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Short explanation */}
              {selectedNode.shortDescription && (
                <p className="text-xs text-[#A89F91] leading-relaxed font-sans">
                  {selectedNode.shortDescription}
                </p>
              )}

              {/* Relationships related to this node */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-semibold">
                    Ikatan & Relasi ({activeRelationships.length})
                  </h4>
                  <Users className="w-3.5 h-3.5 text-[#ECC47E]" />
                </div>

                {activeRelationships.length === 0 ? (
                  <p className="text-xs text-[#A89F91] italic">
                    Belum ada data relasi terhubung untuk tokoh ini.
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

                      return (
                        <div
                          key={rel.id}
                          className="p-2.5 rounded-lg bg-[#1B1611] border border-[#C59B53]/25 text-xs flex items-center justify-between gap-2"
                        >
                          <div>
                            <button
                              onClick={() => otherNode && setSelectedNode(otherNode)}
                              className="font-semibold text-[#F5EFE6] hover:text-[#ECC47E] text-left underline-offset-2 hover:underline cursor-pointer"
                            >
                              {otherName}
                            </button>
                            {rel.note && (
                              <p className="text-[11px] text-[#A89F91] mt-0.5">{rel.note}</p>
                            )}
                          </div>
                          <span className="text-[10px] font-mono bg-[#241B12] text-[#ECC47E] border border-[#C59B53]/30 px-2 py-0.5 rounded uppercase shrink-0">
                            {rel.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* CTA to Wayangpedia */}
              <div className="pt-4 border-t border-[#C59B53]/20">
                <Link
                  href={`/wayangpedia/${selectedNode.slug}`}
                  className="w-full py-2.5 px-4 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Lihat Profil Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#14110E] rounded-2xl border border-[#C59B53]/35 p-8 text-center space-y-2">
              <Info className="w-8 h-8 text-[#C59B53] mx-auto opacity-75" />
              <p className="text-xs text-[#A89F91]">
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
