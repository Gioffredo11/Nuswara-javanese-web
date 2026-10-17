import React from 'react';
import { Link } from '@/components/common/Link';
import { GununganSvg } from '@/components/ui/WayangVectors';

export function Footer() {
  return (
    <footer className="bg-[#0A0908] text-[#A89F91] pt-16 pb-12 border-t border-[#C59B53]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#C59B53]/15">
          {/* Brand & Cultural Manifesto */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <GununganSvg className="w-8 h-12 text-[#ECC47E]" />
              <div>
                <span className="font-royal tracking-[0.25em] text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4DE9B] via-[#E2BC73] to-[#C59B53] uppercase block">
                  NUSWARA
                </span>
                <p className="text-[10px] text-[#A89F91] font-serif italic tracking-wider">
                  Menelusuri Jejak, Merawat Suara
                </p>
              </div>
            </div>
            <p className="text-xs text-[#8C8273] leading-relaxed font-sans">
              Menelusuri jejak, merawat suara. Platform kurasi dan eksplorasi digital sejarah peradaban Jawa Tengah, filsafat pakeliran wayang kulit, dan kearifan adiluhung Nusantara untuk generasi masa depan.
            </p>
            <div className="text-[10px] font-mono text-[#C59B53]/80 uppercase tracking-widest">
              Central Java Cultural Collective
            </div>
          </div>

          {/* Section: Eksplorasi Budaya */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
              Eksplorasi Budaya
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#sejarah" className="hover:text-[#F4DE9B] transition-colors">
                  Sejarah Jawa Tengah
                </Link>
              </li>
              <li>
                <Link href="/tokoh" className="hover:text-[#F4DE9B] transition-colors">
                  Arsip Artikel Tokoh Jawa
                </Link>
              </li>
              <li>
                <Link href="/#wayangpedia" className="hover:text-[#F4DE9B] transition-colors">
                  Wayangpedia (Katalog Tokoh)
                </Link>
              </li>
              <li>
                <Link href="/#family-tree" className="hover:text-[#F4DE9B] transition-colors">
                  Silsilah Purwa Interaktif
                </Link>
              </li>
              <li>
                <Link href="/ragam-rupa" className="hover:text-[#F4DE9B] transition-colors">
                  Ragam Rupa & Anatomi Wayang
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Pengalaman Digital */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
              Pengalaman Interaktif
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#oracle" className="hover:text-[#F4DE9B] transition-colors">
                  Javanese Oracle (Weton Matcher)
                </Link>
              </li>
              <li>
                <Link href="/#manifestasi" className="hover:text-[#F4DE9B] transition-colors">
                  Manifestasi Harian (Piwulang)
                </Link>
              </li>
              <li>
                <Link href="/#photobooth" className="hover:text-[#F4DE9B] transition-colors">
                  Web Photobooth 4-Cut
                </Link>
              </li>
              <li>
                <Link href="/#kuliner" className="hover:text-[#F4DE9B] transition-colors">
                  Khazanah Kuliner Jawa
                </Link>
              </li>
              <li>
                <Link href="/tempat-sakral" className="hover:text-[#F4DE9B] transition-colors">
                  Monumen Keabadian & Situs Sakral
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Ajaran & Nilai */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
              Kearifan Hidup
            </h3>
            <div className="p-3.5 rounded-xl bg-[#14110E] border border-[#C59B53]/25 text-xs space-y-2">
              <span className="font-serif italic text-[#ECC47E] text-sm block">
                &ldquo;Memayu Hayuning Bawana&rdquo;
              </span>
              <p className="text-[#8C8273] text-[11px] leading-relaxed font-sans">
                Menjaga keharmonisan semesta, menghidupkan tradisi luhur melalui karya yang bersuara bagi generasi kini dan masa depan.
              </p>
            </div>
            <div className="pt-1 text-[10px] text-[#A89F91]/60 font-mono">
              Arsip Digital Budaya Jawa Tengah
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8273] gap-4">
          <p>© {new Date().getFullYear()} NUSWARA × JAWA EPIC. Menelusuri Jejak, Merawat Suara.</p>
          <div className="flex items-center space-x-4 sm:space-x-6 text-[#A89F91]/80 text-xs">
            <span>Mataram & Pesisir Archive</span>
            <span>•</span>
            <span>Wayang Purwa Heritage</span>
            <span>•</span>
            <span>Digital Conservation</span>
          </div>
        </div>
      </div>
    </footer>

  );
}
