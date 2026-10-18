import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/components/common/Link';
import { tokohArticles, getTokohBySlug } from '@/data/tokohArticles';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Quote,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { ArticleShareBar } from '@/components/ui/ArticleShareBar';

interface TokohDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return tokohArticles.map((tokoh) => ({
    slug: tokoh.slug,
  }));
}

export async function generateMetadata({
  params,
}: TokohDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tokoh = getTokohBySlug(slug);

  if (!tokoh) {
    return {
      title: 'Tokoh Tidak Ditemukan • NUSWARA',
    };
  }

  return {
    title: `${tokoh.name}: ${tokoh.badgeLabel} • Arsip Tokoh NUSWARA`,
    description: `${tokoh.summary} Pelajari biografi mendalam, falsafah luhur, dan rekam jejak perjuangan ${tokoh.name}.`,
    openGraph: {
      title: `${tokoh.name} • NUSWARA`,
      description: tokoh.summary,
      images: [
        {
          url: tokoh.photoUrl,
          width: 800,
          height: 1067,
          alt: `Potret arsip ${tokoh.name}`,
        },
      ],
    },
  };
}

export default async function TokohDetailPage({
  params,
}: TokohDetailPageProps) {
  const { slug } = await params;
  const tokoh = getTokohBySlug(slug);

  if (!tokoh) {
    notFound();
  }

  // Rekomendasi tokoh lainnya (kecuali yang sedang aktif)
  const otherTokoh = tokohArticles
    .filter((item) => item.slug !== tokoh.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <ReadingProgressBar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A89F91]">
            <Link
              href="/"
              className="text-[#C59B53] hover:text-[#ECC47E] transition-colors"
            >
              Beranda
            </Link>
            <span>/</span>
            <Link
              href="/tokoh"
              className="text-[#C59B53] hover:text-[#ECC47E] transition-colors"
            >
              Arsip Tokoh
            </Link>
            <span>/</span>
            <span className="text-[#F5EFE6] truncate max-w-[200px] sm:max-w-none">
              {tokoh.name}
            </span>
          </div>
        </ScrollReveal>

        {/* Dossier Header Card: Archival Identity Card */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="rounded-3xl bg-gradient-to-b from-[#1C1610] via-[#14100C] to-[#0E0C09] border-2 border-[#C59B53]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Watermark Archival Pattern */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#C59B53]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Portrait with Archival Photo Borders */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-60 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#C59B53] shadow-2xl bg-[#0D0B08]">
                  <Image
                    src={tokoh.photoUrl}
                    alt={`Potret arsip bersejarah ${tokoh.name}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, 288px"
                    className="object-cover contrast-105"
                  />
                  {/* Ornate Photo Mounting Corners */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                </div>

                <div className="pt-4 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B53]/15 border border-[#C59B53]/40 text-[#ECC47E] text-[10px] font-mono tracking-widest uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>DOKUMEN KEARSIPAN RESMI</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#A89F91]">
                    {tokoh.idNumber}
                  </p>
                </div>
              </div>

              {/* Right Column: Identity Metadata & Quotes */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded bg-[#241B12] border border-[#C59B53]/50 text-[#ECC47E]">
                      {tokoh.category}
                    </span>
                    <span className="text-xs font-mono text-[#A89F91] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#C59B53]" />
                      {tokoh.personalData.gelarPahlawan}
                    </span>
                  </div>

                  <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                    {tokoh.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#DFB873] font-serif">
                    {tokoh.fullName}
                  </p>

                  <p className="text-sm font-mono uppercase tracking-wider text-[#ECC47E] font-semibold">
                    {tokoh.badgeLabel}
                  </p>
                </div>

                {/* Identity Metadata Table Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#0D0B08]/80 border border-[#C59B53]/20">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A89F91] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C59B53]" />
                      Tempat Lahir
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#F5EFE6]">
                      {tokoh.personalData.tempatLahir}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A89F91] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C59B53]" />
                      Masa Hidup
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#F5EFE6]">
                      {tokoh.period}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A89F91] flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#C59B53]" />
                      Tempat Wafat & Makam
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#F5EFE6]">
                      {tokoh.personalData.tempatWafat}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A89F91] flex items-center gap-1">
                      <Shield className="w-3 h-3 text-[#C59B53]" />
                      Atribut / Ciri Khas
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#F5EFE6]">
                      {tokoh.personalData.senjataAtauAtribut}
                    </p>
                  </div>
                </div>

                {/* Falsafah Quote Card */}
                <div className="relative rounded-2xl bg-gradient-to-r from-[#241B12] to-[#1A140F] p-5 sm:p-6 border border-[#C59B53]/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ECC47E]">
                    <Quote className="w-4 h-4 text-[#C59B53]" />
                    <span>Falsafah &amp; Pegangan Hidup</span>
                  </div>
                  <p className="font-editorial italic text-base sm:text-lg text-[#F5EFE6] leading-relaxed">
                    &ldquo;{tokoh.quote}&rdquo;
                  </p>
                </div>

                <p className="text-sm text-[#D8C8AD] leading-relaxed font-sans">
                  {tokoh.summary}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Content Body: Sections Biography & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Structured Biography Sections */}
            {tokoh.sections.map((section, sIdx) => (
              <ScrollReveal key={sIdx} direction="up" distance={30}>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ECC47E] uppercase">
                    <FileText className="w-4 h-4 text-[#C59B53]" />
                    <span>BAGIAN {sIdx + 1}</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans">
                    {section.content.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={
                          sIdx === 0 && pIdx === 0
                            ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-royal first-letter:text-[#ECC47E] first-letter:mr-2.5 first-letter:float-left'
                            : ''
                        }
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {section.highlightQuote && (
                    <div className="my-6 p-5 rounded-2xl bg-[#14100C] border-l-4 border-[#C59B53] text-[#ECC47E] font-editorial italic text-base sm:text-lg">
                      &ldquo;{section.highlightQuote}&rdquo;
                    </div>
                  )}
                </section>
              </ScrollReveal>
            ))}

            {/* Timeline Rekam Jejak */}
            <ScrollReveal direction="up" distance={30}>
              <section className="space-y-6 pt-6 border-t border-[#C59B53]/20">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ECC47E] uppercase">
                  <Clock className="w-4 h-4 text-[#C59B53]" />
                  <span>LINIMASA REKAM JEJAK SEJARAH</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                  Tonggak Peristiwa Penting
                </h2>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C59B53]/30">
                  {tokoh.timeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-6 sm:-left-8 top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#0D0B08] border-2 border-[#C59B53] group-hover:bg-[#C59B53] transition-colors" />

                      <div className="space-y-1 bg-[#14100C] p-4 rounded-xl border border-[#C59B53]/20 group-hover:border-[#C59B53]/50 transition-colors">
                        <span className="text-xs font-mono font-bold text-[#ECC47E] block">
                          {item.year}
                        </span>
                        <p className="text-sm text-[#F5EFE6] leading-relaxed">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Warisan Abadi untuk Indonesia */}
            <ScrollReveal direction="up" distance={30}>
              <section className="space-y-4 pt-6 border-t border-[#C59B53]/20">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ECC47E] uppercase">
                  <Sparkles className="w-4 h-4 text-[#C59B53]" />
                  <span>WARISAN ABADI UNTUK BANGSA</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                  Makna yang Diteruskan Hari Ini
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tokoh.keyLegacies.map((legacy, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#1C1610] to-[#120E0A] border border-[#C59B53]/30 space-y-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#C59B53]/15 border border-[#C59B53]/40 flex items-center justify-center text-xs font-mono font-bold text-[#ECC47E]">
                        {lIdx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-[#E3D9C8] leading-relaxed font-sans">
                        {legacy}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Factoids Card */}
            <ScrollReveal direction="up" distance={30} delay={150}>
              <div className="rounded-2xl bg-[#14100C] border border-[#C59B53]/35 p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ECC47E]">
                  <BookOpen className="w-4 h-4 text-[#C59B53]" />
                  <span>FAKTA ARSIP BERSEJARAH</span>
                </div>

                <div className="space-y-3">
                  {tokoh.funFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0D0B08] border border-[#C59B53]/20 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C59B53] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#E3D9C8] leading-relaxed">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Other Heroes Recommendations */}
            <ScrollReveal direction="up" distance={30} delay={200}>
              <div className="rounded-2xl bg-[#14100C] border border-[#C59B53]/35 p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ECC47E]">
                    TOKOH JAWA LAINNYA
                  </span>
                  <Link
                    href="/tokoh"
                    className="text-[11px] font-mono text-[#C59B53] hover:text-[#ECC47E] transition-colors"
                  >
                    Lihat Semua
                  </Link>
                </div>

                <div className="space-y-3">
                  {otherTokoh.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/tokoh/${other.slug}`}
                      className="group flex items-center gap-3.5 p-2.5 rounded-xl bg-[#0D0B08] border border-[#C59B53]/20 hover:border-[#C59B53] transition-all"
                    >
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-[#C59B53]/40 flex-shrink-0">
                        <Image
                          src={other.photoUrl}
                          alt={other.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-royal text-sm font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors truncate">
                          {other.name}
                        </h3>
                        <p className="text-[11px] font-mono text-[#A89F91] truncate">
                          {other.originCity} • {other.period}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#C59B53] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Interactive Social & Messaging Share Bar */}
        <ScrollReveal direction="up" distance={20}>
          <ArticleShareBar
            title={`Biografi & Falsafah ${tokoh.name}`}
            summary={tokoh.summary}
            categoryLabel={`${tokoh.badgeLabel} • ${tokoh.originCity}`}
          />
        </ScrollReveal>

        {/* Bottom Navigation Actions */}
        <ScrollReveal direction="up" distance={20}>
          <div className="pt-8 border-t border-[#C59B53]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/tokoh"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1610] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2016] transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Indeks Arsip Tokoh</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C59B53] text-[#0D0B08] font-semibold text-xs uppercase tracking-wider hover:bg-[#ECC47E] transition-colors shadow-lg w-full sm:w-auto justify-center"
            >
              <span>Beranda NUSWARA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
