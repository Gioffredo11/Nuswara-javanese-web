import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/components/common/Link';
import {
  kulinerArticles,
  getKulinerArticleBySlug,
  getAllKulinerSlugs,
} from '@/data/kulinerArticles';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Compass,
  MapPin,
  Sparkles,
  Utensils,
  Flame,
  CheckCircle2,
  Store,
  Share2,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { ArticleShareBar } from '@/components/ui/ArticleShareBar';

interface KulinerArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllKulinerSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: KulinerArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getKulinerArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Kuliner Tidak Ditemukan • NUSWARA',
    };
  }

  return {
    title: `${article.name} (${article.culturalTheme}) • Kuliner Jawa Tengah NUSWARA`,
    description: article.shortSummary,
    openGraph: {
      title: `${article.name}: ${article.culturalTheme} • NUSWARA`,
      description: article.shortSummary,
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.heroImageAlt,
        },
      ],
    },
  };
}

export default async function KulinerArticleDetailPage({
  params,
}: KulinerArticlePageProps) {
  const { slug } = await params;
  const article = getKulinerArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const currentIndex = kulinerArticles.findIndex((a) => a.slug === slug);
  const prevArticle =
    currentIndex > 0 ? kulinerArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < kulinerArticles.length - 1
      ? kulinerArticles[currentIndex + 1]
      : null;

  return (
    <article className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <ReadingProgressBar />

      {/* Top Header / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/kuliner"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Daftar Kuliner</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A89F91]">
            <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title, Category & Lead */}
        <ScrollReveal direction="up" distance={30}>
          <header className="space-y-5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
                {article.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14110E] border border-[#C59B53]/25 text-[#D8C8AD] text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#C59B53]" />
                <span>
                  {article.city} • {article.region}
                </span>
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-[1.15] tracking-tight">
                {article.name}
              </h1>
              {article.javaneseName && (
                <p className="font-royal text-sm sm:text-base text-[#C59B53] italic">
                  Nama Tradisional: {article.javaneseName}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#14110E] border-l-2 border-[#C59B53] text-xs sm:text-sm font-mono text-[#ECC47E]">
              Tema Kultural: {article.culturalTheme}
            </div>

            <p className="text-base sm:text-xl text-[#D8C8AD] leading-relaxed font-sans pt-2">
              {article.leadParagraph}
            </p>
          </header>
        </ScrollReveal>

        {/* Hero Archival Image */}
        <ScrollReveal direction="up" distance={35} delay={150}>
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-[#C59B53]/40 shadow-2xl bg-[#14110E]">
              <Image
                src={article.heroImage}
                alt={article.heroImageAlt}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <p className="text-xs font-editorial italic text-[#A89F91] text-center sm:text-left px-2 leading-relaxed">
              {article.heroImageCaption}
            </p>
          </div>
        </ScrollReveal>

        {/* Flavor Profile Ribbon */}
        <ScrollReveal direction="up" distance={25} delay={100}>
          <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E]">
              <Utensils className="w-4 h-4 text-[#C59B53]" />
              <span>Spektrum Cita Rasa Karakteristik</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.flavorProfile.map((flavor, fIdx) => (
                <span
                  key={fIdx}
                  className="px-3 py-1.5 rounded-xl bg-[#1C1712] border border-[#C59B53]/30 text-[#F5EFE6] text-xs font-mono font-medium"
                >
                  {flavor}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Historical Narrative */}
        <div className="space-y-10 pt-4 text-[#E6DCce] font-sans">
          {article.historyAndOrigin.map((section, idx) => (
            <ScrollReveal key={idx} direction="up" distance={30} delay={100}>
              <section className="space-y-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6] tracking-tight border-b border-[#C59B53]/20 pb-2">
                  {section.title}
                </h2>

                <div className="space-y-4 leading-relaxed text-sm sm:text-base text-[#D4C8B8]">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Cultural Philosophy Callout */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <section className="p-6 sm:p-8 rounded-2xl bg-[#14110E] border border-[#C59B53]/40 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E]">
              <Sparkles className="w-4 h-4 text-[#C59B53]" />
              <span>{article.philosophicalMeaning.title}</span>
            </div>

            <div className="p-5 rounded-xl bg-[#0D0C0A] border-l-4 border-[#C59B53]">
              <blockquote className="font-editorial italic text-base sm:text-lg text-[#ECC47E] leading-relaxed">
                &ldquo;{article.philosophicalMeaning.quote}&rdquo;
              </blockquote>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#D4C8B8] leading-relaxed">
              {article.philosophicalMeaning.content.map((para, cIdx) => (
                <p key={cIdx}>{para}</p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Ingredients & Spice Secrets */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <section className="p-6 sm:p-8 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E]">
              <Flame className="w-4 h-4 text-[#C59B53]" />
              <span>Anatomi Bahan & Rahasia Dapur Leluhur</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Ingredients */}
              <div className="space-y-3">
                <h3 className="font-editorial text-lg font-bold text-[#F5EFE6] border-b border-[#C59B53]/20 pb-1.5">
                  Bahan Dasar Utama
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
                  {article.ingredientsAndSpices.mainIngredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="text-[#C59B53] font-bold mt-0.5">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secret Spices */}
              <div className="space-y-3">
                <h3 className="font-editorial text-lg font-bold text-[#F5EFE6] border-b border-[#C59B53]/20 pb-1.5">
                  Bumbu Rempah & Kunci Rasa
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
                  {article.ingredientsAndSpices.secretSpices.map((spice, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-[#ECC47E] font-bold mt-0.5">✦</span>
                      <span>{spice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kitchen Note */}
            <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/20 text-xs text-[#A89F91] leading-relaxed">
              <strong className="text-[#ECC47E] block mb-1 font-mono uppercase tracking-wider text-[11px]">
                Catatan Pengolahan Pusaka:
              </strong>
              {article.ingredientsAndSpices.processNote}
            </div>
          </section>
        </ScrollReveal>

        {/* Tasting Etiquette */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <section className="p-6 sm:p-8 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#F5EFE6] border-b border-[#C59B53]/20 pb-2">
              Tata Krama & Etiket Menikmati
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C59B53] block">
                  Penyajian Tradisi
                </span>
                <p className="text-[#D8C8AD]">{article.tastingEtiquette.servingStyle}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C59B53] block">
                  Pendamping Klasik
                </span>
                <p className="text-[#D8C8AD]">{article.tastingEtiquette.traditionalPairing}</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#ECC47E] block">
                Langkah Penghayatan Rasa:
              </span>
              <ol className="space-y-2.5 text-xs sm:text-sm text-[#D4C8B8]">
                {article.tastingEtiquette.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C59B53]/20 border border-[#C59B53]/50 text-[#ECC47E] text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </ScrollReveal>

        {/* Legendary Locations */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <section className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E]">
                <Store className="w-4 h-4 text-[#C59B53]" />
                <span>Jejak Legendaris Penjaga Rasa</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                Rujukan Warung & Gerai Pusaka
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.legendaryLocations.map((loc, lIdx) => (
                <div
                  key={lIdx}
                  className="p-5 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-lg space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-editorial text-lg font-bold text-[#F5EFE6] leading-snug">
                      {loc.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-[#1F1913] border border-[#C59B53]/30 text-[10px] font-mono text-[#ECC47E] shrink-0">
                      {loc.legacyYear}
                    </span>
                  </div>

                  <p className="text-xs text-[#A89F91] leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B53] shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>

                  <p className="text-xs text-[#D8C8AD] leading-relaxed pt-1 border-t border-[#C59B53]/15">
                    {loc.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Key Takeaways */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <section className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#C59B53]" />
              <span>Intisari & Warisan Budaya</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D8C8AD]">
              {article.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <span className="text-[#C59B53] font-bold mt-0.5">✦</span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Interactive Social & Messaging Share Bar */}
        <ScrollReveal direction="up" distance={20}>
          <ArticleShareBar
            title={article.name}
            summary={article.shortSummary}
            categoryLabel={`${article.categoryLabel} • ${article.city}`}
          />
        </ScrollReveal>

        {/* Bottom Pagination & Navigation */}
        <div className="pt-8 border-t border-[#C59B53]/25 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/kuliner/${prevArticle.slug}`}
                className="p-5 rounded-xl bg-[#14110E] border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all group flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono text-[#A89F91] flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  <span>Kuliner Sebelumnya</span>
                </span>
                <span className="font-editorial text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors mt-2">
                  {prevArticle.name}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/kuliner/${nextArticle.slug}`}
                className="p-5 rounded-xl bg-[#14110E] border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all group flex flex-col justify-between text-right"
              >
                <span className="text-[11px] font-mono text-[#A89F91] flex items-center justify-end gap-1">
                  <span>Kuliner Selanjutnya</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="font-editorial text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors mt-2">
                  {nextArticle.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/kuliner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] hover:bg-[#C59B53] hover:text-[#0D0C0A] transition-all text-xs font-mono uppercase tracking-wider font-semibold shadow-lg group"
            >
              <Utensils className="w-4 h-4" />
              <span>Jelajahi Semua Kuliner Jawa Tengah</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
