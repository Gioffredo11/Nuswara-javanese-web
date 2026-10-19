import React from 'react';

export function GununganSvg({ className = 'w-12 h-16', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Gunungan Wayang Kulit">
      {/* Outer Outline */}
      <path
        d="M50 8 C42 35 15 85 10 135 C10 150 25 155 50 155 C75 155 90 150 90 135 C85 85 58 35 50 8 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sacred Crown Point */}
      <path d="M50 4 L50 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="50" cy="5" r="2.5" fill={color} />
      <circle cx="50" cy="14" r="1.5" fill={color} />

      {/* Internal Tree of Life (Pohon Kalpataru) */}
      <path d="M50 148 L50 45" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Branches */}
      <path d="M50 115 C36 105 28 85 30 70" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M50 115 C64 105 72 85 70 70" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M50 90 C38 80 34 65 38 52" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M50 90 C62 80 66 65 62 52" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M50 68 C42 60 40 48 45 38" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M50 68 C58 60 60 48 55 38" stroke={color} strokeWidth="1" strokeLinecap="round" />

      {/* Sacred Portal / Gapura Bawah */}
      <rect x="36" y="125" width="28" height="25" rx="3" stroke={color} strokeWidth="1.5" />
      <path d="M50 125 L50 150" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M40 125 C40 118 60 118 60 125" stroke={color} strokeWidth="1.4" />
      <circle cx="50" cy="135" r="3" stroke={color} strokeWidth="1" />

      {/* Ornamental Floral Flares */}
      <path d="M22 135 C28 120 32 110 38 105" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M78 135 C72 120 68 110 62 105" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <circle cx="28" cy="85" r="1.5" fill={color} />
      <circle cx="72" cy="85" r="1.5" fill={color} />
      <circle cx="36" cy="58" r="1.5" fill={color} />
      <circle cx="64" cy="58" r="1.5" fill={color} />
    </svg>
  );
}

export function GatotkacaSvg({ className = 'w-48 h-64', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Gatotkaca Line Art">
      {/* Crown / Makuta Garudamuka */}
      <path d="M75 25 C70 12 85 8 85 22 C92 12 102 18 95 30" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M78 30 C88 28 92 35 88 42" stroke={color} strokeWidth="1.4" />
      {/* Face & Fierce Eyes */}
      <path d="M78 42 C70 45 68 55 74 62 C78 65 84 65 88 60 C90 52 86 44 78 42 Z" stroke={color} strokeWidth="1.6" />
      <circle cx="80" cy="50" r="2.5" fill={color} /> {/* Thelengan Eye */}
      <path d="M74 55 Q78 57 82 55" stroke={color} strokeWidth="1.2" /> {/* Kumis */}
      <path d="M72 61 L82 61" stroke={color} strokeWidth="1.2" />

      {/* Wings / Praba Belakang */}
      <path d="M60 55 C35 45 20 68 30 100 C36 120 52 135 68 140" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M42 68 C32 80 34 105 48 118" stroke={color} strokeWidth="1.2" />
      <path d="M100 55 C125 45 140 68 130 100 C124 120 108 135 92 140" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M118 68 C128 80 126 105 112 118" stroke={color} strokeWidth="1.2" />

      {/* Body & Kotang Antakusuma Armor */}
      <path d="M68 65 L60 85 L65 130 L80 135 L95 130 L100 85 L92 65 Z" stroke={color} strokeWidth="1.8" />
      {/* Solar Emblem on Chest */}
      <circle cx="80" cy="92" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="80" cy="92" r="4" fill={color} />

      {/* Powerful Arms in Flying / Striking Stance */}
      <path d="M60 85 C45 92 38 108 30 125 C25 135 32 142 40 138 C48 132 55 120 62 110" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M100 85 C115 92 122 108 130 125 C135 135 128 142 120 138 C112 132 105 120 98 110" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Claws / Kuku Pancanaka */}
      <path d="M28 128 L23 134 M132 128 L137 134" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Kain Dodot Poleng & Stately Stance */}
      <path d="M65 130 L55 175 L75 178 L78 205 M95 130 L105 175 L85 178 L82 205" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Poleng Checkered Pattern Clues */}
      <line x1="68" y1="145" x2="92" y2="145" stroke={color} strokeWidth="1" strokeDasharray="2 3" />
      <line x1="65" y1="160" x2="95" y2="160" stroke={color} strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  );
}

export function ArjunaSvg({ className = 'w-48 h-64', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Arjuna Line Art">
      {/* Gelung Supit Urang (Curved Hairpiece) */}
      <path d="M75 22 C68 15 75 8 82 12 C90 16 95 30 88 40" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M82 12 C88 5 98 10 94 22 C92 30 84 38 78 38" stroke={color} strokeWidth="1.4" />
      {/* Refined Noble Head & Liyepan Eye */}
      <path d="M76 40 C70 44 68 52 72 58 C76 64 82 64 86 58 C88 50 84 42 76 40 Z" stroke={color} strokeWidth="1.6" />
      <path d="M78 48 Q82 46 84 49" stroke={color} strokeWidth="1.5" strokeLinecap="round" /> {/* Gentle Eye */}
      <path d="M74 53 L78 54" stroke={color} strokeWidth="1" /> {/* Wali Miring Nose tip */}

      {/* Slender Royal Silhouette */}
      <path d="M72 62 L66 82 L70 130 L80 134 L90 130 L94 82 L86 62 Z" stroke={color} strokeWidth="1.6" />
      <path d="M72 75 C78 72 82 72 88 75" stroke={color} strokeWidth="1.2" />

      {/* Divine Bow (Gandiwa) & Focused Archer Pose */}
      <path d="M35 30 C30 75 30 145 38 190" stroke={color} strokeWidth="2.2" strokeLinecap="round" /> {/* Bow Arc */}
      <path d="M35 30 L38 190" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" /> {/* Bowstring */}
      {/* Left Hand Holding Bow */}
      <path d="M66 82 C52 86 42 95 36 108" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Right Hand Drawing Arrow */}
      <path d="M94 82 C108 85 116 95 112 108 C108 115 95 112 85 110" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Pasopati Arrow Shaft */}
      <path d="M34 108 L114 108" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <polygon points="34,105 28,108 34,111" fill={color} />

      {/* Flowing Jarik Batik Skirt */}
      <path d="M70 130 L62 180 L76 182 L78 208 M90 130 L98 180 L84 182 L82 208" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Sampur (Silk Sash) Cascading */}
      <path d="M80 134 C86 150 92 170 88 195 C86 205 82 210 76 212" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function SrikandiSvg({ className = 'w-48 h-64', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Srikandi Line Art">
      {/* Elegant Crown & Sanggul */}
      <path d="M78 22 C72 16 78 10 85 14 C92 18 94 30 88 38" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="85" cy="18" r="2.5" fill={color} />
      {/* Female Warrior Face */}
      <path d="M76 38 C72 42 70 50 74 56 C77 62 83 62 86 56 C88 48 84 40 76 38 Z" stroke={color} strokeWidth="1.5" />
      <path d="M78 46 Q81 44 84 47" stroke={color} strokeWidth="1.5" strokeLinecap="round" /> {/* Determined Eye */}

      {/* Slender Athletic Torso & Kemben */}
      <path d="M74 58 L68 78 L71 125 L80 128 L89 125 L92 78 L86 58 Z" stroke={color} strokeWidth="1.6" />
      <line x1="71" y1="82" x2="89" y2="82" stroke={color} strokeWidth="1.2" />

      {/* Dynamic Archery Stance */}
      <path d="M45 40 C40 85 40 140 46 185" stroke={color} strokeWidth="2" strokeLinecap="round" /> {/* Bow */}
      <line x1="45" y1="40" x2="46" y2="185" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" />
      <path d="M68 78 C56 82 48 94 45 110" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M92 78 C104 82 112 92 108 106 C104 112 92 110 82 110" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 110 L110 110" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <polygon points="44,107 38,110 44,113" fill={color} />

      {/* Graceful Martial Skirt & Sash */}
      <path d="M71 125 L65 178 L78 180 L80 205 M89 125 L95 178 L82 180 L80 205" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M80 128 C88 145 92 165 96 195" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function SemarSvg({ className = 'w-48 h-64', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Semar Line Art">
      {/* Kuncung Semar (Tuft of Hair) */}
      <path d="M72 32 C65 20 70 12 78 16 C85 20 86 32 80 40" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Plump, Smiling & Wise Face */}
      <path d="M68 40 C55 45 52 65 62 76 C72 85 88 85 96 75 C102 62 95 44 80 40 Z" stroke={color} strokeWidth="1.8" />
      {/* Half-closed smiling eyes */}
      <path d="M68 56 Q74 52 78 56" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M84 56 Q88 52 92 56" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Benevolent Mouth Smile */}
      <path d="M72 68 Q80 75 88 68" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

      {/* Round Body & Humorous Dignity */}
      <ellipse cx="80" cy="125" rx="35" ry="38" stroke={color} strokeWidth="1.8" />

      {/* Welcoming Left Hand Pointing Forward */}
      <path d="M50 115 C38 120 28 128 20 135 C16 138 20 144 26 142 C34 138 42 130 52 125" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Right Hand on Back */}
      <path d="M110 115 C122 120 130 128 135 138" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

      {/* Kain Kampuh Semar */}
      <path d="M55 158 C50 185 58 198 68 202 L78 202 M105 158 C110 185 102 198 92 202 L82 202" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BatikKawungPatternSvg({ className = 'w-16 h-16', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Batik Kawung Vector">
      {/* Center Axis */}
      <circle cx="40" cy="40" r="4" fill={color} />
      <circle cx="40" cy="40" r="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

      {/* Four Petals / Kolang Kaling Oval Intersections */}
      <ellipse cx="40" cy="22" rx="14" ry="18" stroke={color} strokeWidth="1.5" />
      <ellipse cx="40" cy="58" rx="14" ry="18" stroke={color} strokeWidth="1.5" />
      <ellipse cx="22" cy="40" rx="18" ry="14" stroke={color} strokeWidth="1.5" />
      <ellipse cx="58" cy="40" rx="18" ry="14" stroke={color} strokeWidth="1.5" />

      {/* Inner Dots in Each Petal */}
      <circle cx="40" cy="22" r="2.5" fill={color} />
      <circle cx="40" cy="58" r="2.5" fill={color} />
      <circle cx="22" cy="40" r="2.5" fill={color} />
      <circle cx="58" cy="40" r="2.5" fill={color} />

      {/* Diagonal Diamond Corners */}
      <path d="M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function BatikParangPatternSvg({ className = 'w-16 h-16', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Batik Parang Vector">
      {/* Diagonal Waves */}
      <path d="M-10 90 L90 -10" stroke={color} strokeWidth="1.5" />
      <path d="M10 110 L110 10" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M-30 70 L70 -30" stroke={color} strokeWidth="1" strokeDasharray="3 3" />

      {/* Parang 'S' Hook Waves */}
      <path d="M15 65 C25 55 35 60 45 45 C50 38 48 30 55 25" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20" cy="60" r="3" fill={color} />
      <circle cx="50" cy="30" r="3" fill={color} />

      <path d="M-5 45 C5 35 15 40 25 25 C30 18 28 10 35 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="0" cy="40" r="3" fill={color} />
      <circle cx="30" cy="10" r="3" fill={color} />

      <path d="M35 85 C45 75 55 80 65 65 C70 58 68 50 75 45" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="40" cy="80" r="3" fill={color} />
      <circle cx="70" cy="50" r="3" fill={color} />
    </svg>
  );
}

// -------------------------------------------------------------
// HIGH-FIDELITY POSTER FIGURES (MATCHING LUXURY WAYANG CARD ART)
// -------------------------------------------------------------

/**
 * Arjuna Poster Figure - High fidelity vector matching the user reference image
 * (Profile, Supit Urang hair, long arms, keris on waist, crimson & gold dodot)
 */
export function ArjunaPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Arjuna Poster Art"
    >
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="clothRed" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#991B1B" />
          <stop offset="1" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      {/* HEAD & SUPIT URANG (HAIR ORNAMENT) */}
      {/* Big curved supit urang sweeping back and up */}
      <path
        d="M130 120 C125 70 140 40 165 40 C190 40 195 70 180 90 C165 105 140 115 130 120 Z"
        stroke="url(#goldStroke)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#381E0C"
        fillOpacity="0.3"
      />
      {/* Decorative internal supit urang coils */}
      <path
        d="M145 90 C150 65 170 55 180 70 C185 80 175 95 160 100"
        stroke="url(#goldStroke)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="165" cy="62" r="3" fill="#FCD34D" />
      <circle cx="178" cy="74" r="2.5" fill="#FCD34D" />
      <circle cx="152" cy="78" r="2.5" fill="#FCD34D" />

      {/* Front Crown & Sumping (Ear Jewel) */}
      <path
        d="M110 115 C100 95 115 80 128 90 C138 98 132 112 124 116"
        stroke="url(#goldStroke)"
        strokeWidth="2.5"
      />
      <path
        d="M115 130 C125 135 145 130 150 115"
        stroke="url(#goldStroke)"
        strokeWidth="2"
      />

      {/* NOBLE PROFILE: Pointed Nose (Wali Miring) & Serene Eye (Liyepan) */}
      <path
        d="M112 120 L95 135 L85 155 L102 152 L108 162 L120 162 L132 152"
        stroke="url(#goldStroke)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Slender Eye */}
      <path
        d="M98 142 C104 138 112 138 116 142"
        stroke="url(#goldStroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="107" cy="142" r="2" fill="#FDE68A" />
      {/* Gentle mouth */}
      <path d="M102 156 L110 156" stroke="url(#goldStroke)" strokeWidth="1.8" />

      {/* NECK & KALUNG ULUR (ROYAL NECKLACE) */}
      <path d="M125 160 L140 180" stroke="url(#goldStroke)" strokeWidth="3" />
      <path d="M136 150 L150 175" stroke="url(#goldStroke)" strokeWidth="3" />
      <path
        d="M135 175 C142 185 152 185 160 178"
        stroke="url(#goldStroke)"
        strokeWidth="2.5"
      />
      <circle cx="148" cy="184" r="3" fill="#FCD34D" />

      {/* TORSO & HATCHING LINES (TRADITIONAL WAYANG SHADING) */}
      <path
        d="M140 180 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 180 Z"
        stroke="url(#goldStroke)"
        strokeWidth="3"
        fill="#381E0C"
        fillOpacity="0.2"
      />
      {/* Fine golden hatchings on torso */}
      <line x1="145" y1="200" x2="165" y2="190" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.7" />
      <line x1="148" y1="215" x2="170" y2="205" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.7" />
      <line x1="150" y1="230" x2="175" y2="220" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.7" />
      <line x1="153" y1="245" x2="178" y2="235" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.7" />

      {/* KERIS BEHIND WAIST (TRADITIONAL WEAPON TUCKED IN DODOT) */}
      <g opacity="0.95">
        {/* Handle / Hilt */}
        <path d="M190 230 L215 210 L220 215 L195 235 Z" fill="#F59E0B" stroke="url(#goldStroke)" strokeWidth="2" />
        {/* Sheath (Wrangka & Gandar) */}
        <path d="M185 245 L235 220 L242 228 L190 255 Z" fill="#381E0C" stroke="url(#goldStroke)" strokeWidth="2.5" />
        {/* Ornamental rings on sheath */}
        <line x1="195" y1="242" x2="198" y2="249" stroke="url(#goldStroke)" strokeWidth="2" />
        <line x1="205" y1="236" x2="208" y2="243" stroke="url(#goldStroke)" strokeWidth="2" />
        <line x1="215" y1="231" x2="218" y2="238" stroke="url(#goldStroke)" strokeWidth="2" />
        <line x1="225" y1="226" x2="228" y2="233" stroke="url(#goldStroke)" strokeWidth="2" />
      </g>

      {/* ROYAL DODOT (BATIK CLOTH - CRIMSON RED WITH GOLDEN WAVE PATTERNS) */}
      <g>
        {/* Upper Belt (Sabuk & Timang) */}
        <path
          d="M152 260 C165 256 182 256 195 260 L195 272 C182 268 165 268 152 272 Z"
          fill="#D97706"
          stroke="url(#goldStroke)"
          strokeWidth="2.5"
        />
        <circle cx="174" cy="265" r="4" fill="#FEF08A" stroke="url(#goldStroke)" strokeWidth="1.5" />

        {/* Main Dodot Skirt Body in Rich Crimson Red */}
        <path
          d="M150 272 C140 310 148 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 272 Z"
          fill="url(#clothRed)"
          stroke="url(#goldStroke)"
          strokeWidth="3.5"
        />

        {/* Antique Cream & Golden Wavy Batik Motif (Parang/Udan Liris) */}
        <path
          d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300"
          stroke="#FEF3C7"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300"
          stroke="url(#goldStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320"
          stroke="#FEF3C7"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320"
          stroke="url(#goldStroke)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Golden circular dots / motes on the dodot */}
        <circle cx="185" cy="305" r="3.5" fill="#FEF08A" />
        <circle cx="205" cy="310" r="3.5" fill="#FEF08A" />
        <circle cx="198" cy="335" r="3.5" fill="#FEF08A" />
        <circle cx="218" cy="338" r="3.5" fill="#FEF08A" />
      </g>

      {/* ARMS: SLENDER & ELONGATED WAYANG JOINTS */}
      {/* Front Left Arm (Hanging down gracefully) */}
      <g>
        {/* Upper Arm */}
        <path d="M140 185 L130 260" stroke="url(#goldStroke)" strokeWidth="4" strokeLinecap="round" />
        {/* Kelat Bahu (Armband) */}
        <circle cx="137" cy="210" r="4" fill="#FCD34D" />
        {/* Forearm */}
        <path d="M130 260 L120 335" stroke="url(#goldStroke)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Gelang (Wristband) */}
        <circle cx="121" cy="320" r="3.5" fill="#FCD34D" />
        {/* Slender Wayang Fingers Curved Forward */}
        <path
          d="M120 335 C115 345 100 350 90 355 M120 335 C112 348 98 355 92 360 M120 335 C116 350 105 362 98 368"
          stroke="url(#goldStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Rear Right Arm (Angled at Elbow, Pointing Downwards) */}
      <g>
        {/* Shoulder to elbow */}
        <path d="M175 185 L235 195" stroke="url(#goldStroke)" strokeWidth="4" strokeLinecap="round" />
        {/* Elbow to wrist - long downward drop */}
        <path d="M235 195 L240 300" stroke="url(#goldStroke)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Wristband */}
        <circle cx="240" cy="285" r="3.5" fill="#FCD34D" />
        {/* Delicate Hand */}
        <path
          d="M240 300 C242 312 238 322 232 328 M240 300 C245 315 242 328 236 335"
          stroke="url(#goldStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* LEGS: NOBLE WAYANG STANDING POSE */}
      <g>
        {/* Left Thigh & Shin */}
        <path
          d="M165 365 L160 410 L155 450"
          stroke="url(#goldStroke)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Foot on Ground */}
        <path
          d="M155 450 C150 455 138 456 128 456 C138 450 152 445 155 440"
          stroke="url(#goldStroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Thigh & Shin */}
        <path
          d="M195 365 L198 410 L200 450"
          stroke="url(#goldStroke)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Foot on Ground */}
        <path
          d="M200 450 C205 455 218 456 228 456 C218 450 204 445 200 440"
          stroke="url(#goldStroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Golden Celana (Trousers) and Shading Hatchings on Shins */}
        <line x1="158" y1="420" x2="164" y2="422" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <line x1="156" y1="430" x2="162" y2="432" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <line x1="196" y1="420" x2="202" y2="422" stroke="url(#goldStroke)" strokeWidth="1.5" />
        <line x1="197" y1="430" x2="203" y2="432" stroke="url(#goldStroke)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * Petruk Poster Figure - Tall, long-nosed, benevolent Punokawan humorist
 */
export function PetrukPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Petruk Poster Art"
    >
      <defs>
        <linearGradient id="petrukGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="petrukCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#991B1B" />
          <stop offset="1" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      {/* KUNCUNG HAIR & HEAD */}
      <path
        d="M150 90 C140 50 160 30 180 40 C190 50 185 75 168 88"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Tall forehead & eye */}
      <path
        d="M145 92 C135 105 125 118 118 135"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
      />
      {/* Round warm smiling eye */}
      <circle cx="124" cy="122" r="3.5" fill="#FEF08A" />

      {/* ICONIC LONG POINTED NOSE */}
      <path
        d="M120 128 L60 138 C55 140 58 148 68 146 L115 145"
        stroke="url(#petrukGold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* SMILING MOUTH & CHIN */}
      <path
        d="M115 145 C110 160 125 170 135 165 L145 155"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M112 152 Q120 160 128 152" stroke="url(#petrukGold)" strokeWidth="2.5" />

      {/* LONG TALL SLENDER TORSO */}
      <path
        d="M142 165 L145 270 C155 272 178 272 188 270 L180 165 Z"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
        fill="#381E0C"
        fillOpacity="0.2"
      />
      {/* Rib & Hatching Shading */}
      <line x1="148" y1="195" x2="175" y2="190" stroke="url(#petrukGold)" strokeWidth="1.5" opacity="0.8" />
      <line x1="148" y1="215" x2="178" y2="210" stroke="url(#petrukGold)" strokeWidth="1.5" opacity="0.8" />
      <line x1="148" y1="235" x2="180" y2="230" stroke="url(#petrukGold)" strokeWidth="1.5" opacity="0.8" />

      {/* WAIST & KANTHONG BOLONG CLOTH */}
      <g>
        <rect x="140" y="268" width="55" height="15" rx="3" fill="#D97706" stroke="url(#petrukGold)" strokeWidth="2" />
        <path
          d="M140 282 C132 320 140 360 165 370 C190 380 220 365 225 320 L195 282 Z"
          fill="url(#petrukCloth)"
          stroke="url(#petrukGold)"
          strokeWidth="3.5"
        />
        {/* Checkered / Poleng Motif on Skirt */}
        <line x1="150" y1="310" x2="215" y2="310" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="145" y1="335" x2="218" y2="335" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="178" cy="325" r="4" fill="#FEF08A" />
      </g>

      {/* ARMS: LANKY & EXPRESSIVE */}
      <path
        d="M142 170 L125 240 L105 310"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Hand with pointing finger */}
      <path
        d="M105 310 L92 325 M105 310 L95 332"
        stroke="url(#petrukGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M180 170 L220 220 L235 300"
        stroke="url(#petrukGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M235 300 L242 320" stroke="url(#petrukGold)" strokeWidth="2.5" strokeLinecap="round" />

      {/* LEGS: TALL & STURDY */}
      <path d="M155 370 L152 450" stroke="url(#petrukGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M152 450 L130 456" stroke="url(#petrukGold)" strokeWidth="3.5" strokeLinecap="round" />

      <path d="M185 370 L188 450" stroke="url(#petrukGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M188 450 L210 456" stroke="url(#petrukGold)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Symmetrical Pair of Gunungan Watermarks (Flanking lower left & right like in the reference art)
 */
export function GununganPosterWatermarks({ className = 'absolute inset-0 pointer-events-none' }: { className?: string }) {
  return (
    <div className={`${className} flex justify-between items-end overflow-hidden`}>
      {/* Left Gunungan Silhouette */}
      <div className="w-56 sm:w-64 -ml-16 sm:-ml-20 mb-[-10%] opacity-20 transform -rotate-6">
        <GununganSvg className="w-full h-auto text-amber-500" color="#B45309" />
      </div>

      {/* Right Gunungan Silhouette */}
      <div className="w-56 sm:w-64 -mr-16 sm:-mr-20 mb-[-10%] opacity-20 transform rotate-6 scale-x-[-1]">
        <GununganSvg className="w-full h-auto text-amber-500" color="#B45309" />
      </div>
    </div>
  );
}

/**
 * Traditional Javanese Golden Sparkles & Floating Dust Motes
 */
export function GoldenDustMotes({ className = 'absolute inset-0 pointer-events-none' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 700" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="60" cy="190" r="2.5" fill="#FCD34D" opacity="0.6" />
      <circle cx="85" cy="180" r="1.5" fill="#FDE68A" opacity="0.8" />
      <circle cx="70" cy="210" r="2" fill="#FCD34D" opacity="0.5" />
      <circle cx="110" cy="240" r="1.5" fill="#FDE68A" opacity="0.7" />
      <circle cx="50" cy="270" r="2" fill="#FBBF24" opacity="0.6" />

      <circle cx="340" cy="180" r="2" fill="#FCD34D" opacity="0.5" />
      <circle cx="360" cy="210" r="1.5" fill="#FDE68A" opacity="0.7" />
      <circle cx="320" cy="230" r="2.5" fill="#FCD34D" opacity="0.6" />
      <circle cx="350" cy="260" r="1.8" fill="#FBBF24" opacity="0.5" />

      <circle cx="80" cy="380" r="2" fill="#FCD34D" opacity="0.4" />
      <circle cx="330" cy="400" r="2.2" fill="#FCD34D" opacity="0.4" />
      <circle cx="200" cy="130" r="1.5" fill="#FEF08A" opacity="0.7" />
    </svg>
  );
}

// -------------------------------------------------------------
// SADEWA POSTER FIGURE (ASTROLOGER, VISIONARY OF BAWERATALUN)
// -------------------------------------------------------------

export function SadewaPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Sadewa Poster Art"
    >
      <defs>
        <linearGradient id="sadewaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="sadewaCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <radialGradient id="sadewaOrbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ASTROLOGICAL CELESTIAL BACKGROUND CONSTELLATION NODES */}
      <g opacity="0.75">
        <circle cx="85" cy="80" r="2" fill="#FEF08A" />
        <circle cx="110" cy="65" r="2.5" fill="#FCD34D" />
        <circle cx="70" cy="115" r="2" fill="#FEF08A" />
        <circle cx="245" cy="95" r="2" fill="#FEF08A" />
        <circle cx="260" cy="140" r="2.5" fill="#FCD34D" />
        <line x1="85" y1="80" x2="110" y2="65" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="85" y1="80" x2="70" y2="115" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="245" y1="95" x2="260" y2="140" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3 3" />
      </g>

      {/* HEAD & SUPIT URANG (CURVED HAIR WITH ASTRAL PINS) */}
      <path
        d="M130 120 C125 70 140 40 165 40 C190 40 195 70 180 90 C165 105 140 115 130 120 Z"
        stroke="url(#sadewaGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#2A1608"
        fillOpacity="0.35"
      />
      <path
        d="M145 90 C150 65 170 55 180 70 C185 80 175 95 160 100"
        stroke="url(#sadewaGold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Astral Hair Pins */}
      <circle cx="165" cy="60" r="3" fill="#FEF08A" />
      <circle cx="178" cy="72" r="2.5" fill="#FDE68A" />
      <circle cx="152" cy="76" r="2.5" fill="#FDE68A" />

      {/* FRONT CROWN & SUMPING SURENGPATI */}
      <path
        d="M110 115 C100 95 115 80 128 90 C138 98 132 112 124 116"
        stroke="url(#sadewaGold)"
        strokeWidth="2.5"
      />
      <path
        d="M115 130 C125 135 145 130 150 115"
        stroke="url(#sadewaGold)"
        strokeWidth="2"
      />

      {/* REFINED NOBLE PROFILE: LIYEPAN SERENE EYE & WALI MIRING NOSE */}
      <path
        d="M112 120 L95 135 L85 155 L102 152 L108 162 L120 162 L132 152"
        stroke="url(#sadewaGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Serene Contemplative Eye */}
      <path
        d="M98 142 C104 138 112 138 116 142"
        stroke="url(#sadewaGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="107" cy="142" r="2" fill="#FEF08A" />
      {/* Wise Gentle Mouth */}
      <path d="M102 156 L110 156" stroke="url(#sadewaGold)" strokeWidth="1.8" />

      {/* NECK & KALUNG ULUR WITH ASTRAL MEDALLION */}
      <path d="M125 160 L140 180" stroke="url(#sadewaGold)" strokeWidth="3" />
      <path d="M136 150 L150 175" stroke="url(#sadewaGold)" strokeWidth="3" />
      <path
        d="M135 175 C142 185 152 185 160 178"
        stroke="url(#sadewaGold)"
        strokeWidth="2.5"
      />
      {/* Star Medallion */}
      <polygon points="148,180 151,185 156,185 152,189 154,194 148,191 142,194 144,189 140,185 145,185" fill="#FEF08A" />

      {/* TORSO & HATCHING LINES */}
      <path
        d="M140 180 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 180 Z"
        stroke="url(#sadewaGold)"
        strokeWidth="3"
        fill="#2A1608"
        fillOpacity="0.25"
      />
      <line x1="145" y1="200" x2="165" y2="190" stroke="url(#sadewaGold)" strokeWidth="1.2" opacity="0.75" />
      <line x1="148" y1="215" x2="170" y2="205" stroke="url(#sadewaGold)" strokeWidth="1.2" opacity="0.75" />
      <line x1="150" y1="230" x2="175" y2="220" stroke="url(#sadewaGold)" strokeWidth="1.2" opacity="0.75" />
      <line x1="153" y1="245" x2="178" y2="235" stroke="url(#sadewaGold)" strokeWidth="1.2" opacity="0.75" />

      {/* KERIS BEHIND WAIST */}
      <g opacity="0.95">
        <path d="M190 230 L215 210 L220 215 L195 235 Z" fill="#F59E0B" stroke="url(#sadewaGold)" strokeWidth="2" />
        <path d="M185 245 L235 220 L242 228 L190 255 Z" fill="#2A1608" stroke="url(#sadewaGold)" strokeWidth="2.5" />
        <line x1="195" y1="242" x2="198" y2="249" stroke="url(#sadewaGold)" strokeWidth="2" />
        <line x1="205" y1="236" x2="208" y2="243" stroke="url(#sadewaGold)" strokeWidth="2" />
        <line x1="215" y1="231" x2="218" y2="238" stroke="url(#sadewaGold)" strokeWidth="2" />
      </g>

      {/* ROYAL DODOT (DEEP INDIGO MIDNIGHT BATIK WITH STAR CONSTELLATIONS) */}
      <g>
        <path
          d="M152 260 C165 256 182 256 195 260 L195 272 C182 268 165 268 152 272 Z"
          fill="#D97706"
          stroke="url(#sadewaGold)"
          strokeWidth="2.5"
        />
        <circle cx="174" cy="265" r="4" fill="#FEF08A" stroke="url(#sadewaGold)" strokeWidth="1.5" />

        <path
          d="M150 272 C140 310 148 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 272 Z"
          fill="url(#sadewaCloth)"
          stroke="url(#sadewaGold)"
          strokeWidth="3.5"
        />

        {/* Golden Constellation Waves on Dodot */}
        <path
          d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300"
          stroke="#FEF3C7"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300"
          stroke="url(#sadewaGold)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320"
          stroke="#FEF3C7"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320"
          stroke="url(#sadewaGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Glowing constellation stars on indigo dodot */}
        <circle cx="185" cy="305" r="3.5" fill="#FEF08A" />
        <circle cx="205" cy="310" r="3.5" fill="#FEF08A" />
        <circle cx="198" cy="335" r="3.5" fill="#FEF08A" />
        <circle cx="218" cy="338" r="3.5" fill="#FEF08A" />
        <line x1="185" y1="305" x2="205" y2="310" stroke="#FEF08A" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
        <line x1="205" y1="310" x2="218" y2="338" stroke="#FEF08A" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
        <line x1="198" y1="335" x2="218" y2="338" stroke="#FEF08A" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      </g>

      {/* ARMS: FORWARD ASTRAL MUDRA HOLDING CELESTIAL ORB */}
      <g>
        {/* Forward Left Arm holding astrological Primbon orb */}
        <path d="M140 185 L120 235" stroke="url(#sadewaGold)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="127" cy="215" r="4" fill="#FCD34D" />
        <path d="M120 235 L102 270" stroke="url(#sadewaGold)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="106" cy="260" r="3.5" fill="#FCD34D" />

        {/* Hand in delicate mudra */}
        <path
          d="M102 270 C96 274 92 280 88 288 M102 270 C98 276 94 284 92 292"
          stroke="url(#sadewaGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Glowing Celestial Primbon Orb in palm */}
        <circle cx="86" cy="268" r="14" fill="url(#sadewaOrbGlow)" />
        <circle cx="86" cy="268" r="5" fill="#FEF08A" />
        <line x1="86" y1="258" x2="86" y2="278" stroke="#FEF08A" strokeWidth="1.5" />
        <line x1="76" y1="268" x2="96" y2="268" stroke="#FEF08A" strokeWidth="1.5" />
      </g>

      {/* Rear Right Arm (Graceful downward extension) */}
      <g>
        <path d="M175 185 L235 195" stroke="url(#sadewaGold)" strokeWidth="4" strokeLinecap="round" />
        <path d="M235 195 L240 300" stroke="url(#sadewaGold)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="240" cy="285" r="3.5" fill="#FCD34D" />
        <path
          d="M240 300 C242 312 238 322 232 328 M240 300 C245 315 242 328 236 335"
          stroke="url(#sadewaGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* LEGS: NOBLE WAYANG STANDING POSE */}
      <g>
        <path d="M165 365 L160 410 L155 450" stroke="url(#sadewaGold)" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M155 450 C150 455 138 456 128 456 C138 450 152 445 155 440"
          stroke="url(#sadewaGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d="M195 365 L198 410 L200 450" stroke="url(#sadewaGold)" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M200 450 C205 455 218 456 228 456 C218 450 204 445 200 440"
          stroke="url(#sadewaGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line x1="158" y1="420" x2="164" y2="422" stroke="url(#sadewaGold)" strokeWidth="1.5" />
        <line x1="156" y1="430" x2="162" y2="432" stroke="url(#sadewaGold)" strokeWidth="1.5" />
        <line x1="196" y1="420" x2="202" y2="422" stroke="url(#sadewaGold)" strokeWidth="1.5" />
        <line x1="197" y1="430" x2="203" y2="432" stroke="url(#sadewaGold)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// -------------------------------------------------------------
// BIMA / WERKUDARA POSTER FIGURE (MIGHTY KSATRIA OF JODHIPATI)
// -------------------------------------------------------------

export function BimaPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Bima Poster Art"
    >
      <defs>
        <linearGradient id="bimaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="bimaPoleng" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#262626" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      {/* HEAD & HIGH GELUNG SUPIT URANG PUPUS */}
      <path
        d="M125 120 C110 50 145 20 180 25 C205 30 215 65 195 95 C175 115 145 125 125 120 Z"
        stroke="url(#bimaGold)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="#261A0F"
        fillOpacity="0.4"
      />
      {/* Golden Pupus Horn */}
      <path d="M180 25 L196 10 L198 28" stroke="url(#bimaGold)" strokeWidth="3" fill="#F59E0B" />

      {/* FIERCE WARRIOR FACE: THELENGAN EYE & MIGHTY MUSTACHE */}
      <path
        d="M105 120 L82 140 L72 165 L95 165 L100 180 L125 180 L138 165"
        stroke="url(#bimaGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fierce Round Thelengan Eye */}
      <ellipse cx="96" cy="148" rx="8" ry="6" fill="#FEF08A" stroke="url(#bimaGold)" strokeWidth="2" />
      <circle cx="96" cy="148" r="3" fill="#171717" />
      {/* Curled Mustache (Kumis Melengkung) */}
      <path d="M78 165 Q96 158 112 168" stroke="url(#bimaGold)" strokeWidth="3" strokeLinecap="round" />

      {/* BROAD HEROIC NECK & CHEST */}
      <path d="M115 180 L128 205" stroke="url(#bimaGold)" strokeWidth="3.5" />
      <path d="M138 175 L158 205" stroke="url(#bimaGold)" strokeWidth="3.5" />
      <path
        d="M125 205 C145 235 152 270 155 290 L200 290 C208 260 210 225 188 200 Z"
        stroke="url(#bimaGold)"
        strokeWidth="3.5"
        fill="#261A0F"
        fillOpacity="0.3"
      />
      {/* Powerful Chest Hatchings */}
      <line x1="135" y1="225" x2="168" y2="215" stroke="url(#bimaGold)" strokeWidth="1.5" />
      <line x1="138" y1="245" x2="175" y2="235" stroke="url(#bimaGold)" strokeWidth="1.5" />
      <line x1="142" y1="265" x2="182" y2="255" stroke="url(#bimaGold)" strokeWidth="1.5" />

      {/* MIGHTY GADA RUJAKPALA (WAR CLUB ON FLANK) */}
      <g>
        <ellipse cx="248" cy="165" rx="18" ry="26" fill="#78350F" stroke="url(#bimaGold)" strokeWidth="3.5" />
        <line x1="235" y1="165" x2="260" y2="165" stroke="url(#bimaGold)" strokeWidth="2.5" />
        <line x1="248" y1="145" x2="248" y2="185" stroke="url(#bimaGold)" strokeWidth="2.5" />
        <path d="M248 190 L256 360" stroke="url(#bimaGold)" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* DODOT KAMPUH POLENG (CHECKERED BLACK & WHITE) */}
      <g>
        <rect x="145" y="285" width="55" height="15" fill="#D97706" stroke="url(#bimaGold)" strokeWidth="2.5" />
        <path
          d="M140 300 C130 340 138 385 165 395 C195 405 235 390 240 340 L205 300 Z"
          fill="url(#bimaPoleng)"
          stroke="url(#bimaGold)"
          strokeWidth="3.5"
        />
        {/* Poleng Checkered Tracery */}
        <line x1="142" y1="325" x2="230" y2="325" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="148" y1="350" x2="235" y2="350" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="155" y1="375" x2="225" y2="375" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="175" y1="305" x2="175" y2="395" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="205" y1="305" x2="205" y2="395" stroke="#FEF08A" strokeWidth="2" strokeDasharray="6 6" />
      </g>

      {/* MIGHTY ARMS & KUKU PANCANAKA CLAWS */}
      {/* Left Arm with long sharp Pancanaka claw */}
      <g>
        <path d="M130 210 L110 270 L85 330" stroke="url(#bimaGold)" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="118" cy="245" r="4.5" fill="#FCD34D" />
        <circle cx="95" cy="315" r="4" fill="#FCD34D" />
        {/* Kuku Pancanaka Claw */}
        <path d="M85 330 C72 342 66 360 68 375 C74 360 84 348 94 340 Z" fill="#FEF08A" stroke="url(#bimaGold)" strokeWidth="2" />
      </g>

      {/* Right Arm */}
      <g>
        <path d="M185 205 L230 230 L240 310" stroke="url(#bimaGold)" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="236" cy="290" r="4" fill="#FCD34D" />
        <path d="M240 310 C250 322 255 338 252 352 C248 338 240 328 232 322 Z" fill="#FEF08A" stroke="url(#bimaGold)" strokeWidth="2" />
      </g>

      {/* POWERFUL LEGS & GOLDEN BINGGEL ANKLETS */}
      <g>
        <path d="M160 395 L155 450" stroke="url(#bimaGold)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M155 450 C148 456 132 458 120 458" stroke="url(#bimaGold)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="155" cy="442" r="4" fill="#FCD34D" />

        <path d="M200 395 L205 450" stroke="url(#bimaGold)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M205 450 C212 456 228 458 240 458" stroke="url(#bimaGold)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="205" cy="442" r="4" fill="#FCD34D" />
      </g>
    </svg>
  );
}

// -------------------------------------------------------------
// YUDHISTIRA / PUNTADEWA POSTER FIGURE (PURE-HEARTED AMARTA KING)
// -------------------------------------------------------------

export function YudhistiraPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Yudhistira Poster Art"
    >
      <defs>
        <linearGradient id="yudhisGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="yudhisWhiteCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>

      {/* MAKUTA JAMANG KENCANA (ROUNDED ROYAL CROWN OF AMARTA) */}
      <path
        d="M130 115 C125 65 150 40 175 42 C200 45 205 75 190 98 C175 112 145 118 130 115 Z"
        stroke="url(#yudhisGold)"
        strokeWidth="3.5"
        fill="#332211"
        fillOpacity="0.3"
      />
      <circle cx="175" cy="44" r="4" fill="#FEF08A" stroke="url(#yudhisGold)" strokeWidth="1.5" />
      <path d="M140 92 C150 75 170 65 182 80" stroke="url(#yudhisGold)" strokeWidth="2" />

      {/* SERENE NOBLE FACE (PEACEFUL LIYEPAN COUNTENANCE) */}
      <path
        d="M115 118 L98 132 L88 152 L105 150 L110 160 L122 160 L134 150"
        stroke="url(#yudhisGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M100 140 C106 136 114 136 118 140" stroke="url(#yudhisGold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="109" cy="140" r="2" fill="#FEF08A" />
      <path d="M104 154 L112 154" stroke="url(#yudhisGold)" strokeWidth="1.8" />

      {/* ROYAL TORSO & WHITE SILK DODOT */}
      <path d="M125 158 L140 178 M136 148 L150 173" stroke="url(#yudhisGold)" strokeWidth="3" />
      <path
        d="M140 178 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 178 Z"
        stroke="url(#yudhisGold)"
        strokeWidth="3"
        fill="#261A0F"
        fillOpacity="0.2"
      />

      {/* SACRED JAMUS KALIMASADA TALISMAN SCROLL */}
      <g>
        <rect x="150" y="220" width="22" height="36" rx="3" fill="#FEF3C7" stroke="url(#yudhisGold)" strokeWidth="2" />
        <line x1="155" y1="230" x2="167" y2="230" stroke="#B45309" strokeWidth="1.5" />
        <line x1="155" y1="238" x2="167" y2="238" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="161" cy="248" r="2.5" fill="#DC2626" />
      </g>

      {/* PURE WHITE DODOT SKIRT */}
      <g>
        <rect x="148" y="258" width="46" height="12" fill="#D97706" stroke="url(#yudhisGold)" strokeWidth="2" />
        <path
          d="M148 270 C138 310 146 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 270 Z"
          fill="url(#yudhisWhiteCloth)"
          stroke="url(#yudhisGold)"
          strokeWidth="3.5"
        />
        <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="url(#yudhisGold)" strokeWidth="2" />
        <path d="M175 310 C185 330 198 348 218 350" stroke="url(#yudhisGold)" strokeWidth="2" />
      </g>

      {/* HANDS IN REVERENT NGAPURANCANG POSTURE */}
      <path d="M140 182 L125 240 L145 255" stroke="url(#yudhisGold)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M175 182 L190 240 L168 255" stroke="url(#yudhisGold)" strokeWidth="3.5" strokeLinecap="round" />

      {/* LEGS: STATELY STANDING */}
      <path d="M165 365 L160 450 L135 456" stroke="url(#yudhisGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M195 365 L198 450 L220 456" stroke="url(#yudhisGold)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// -------------------------------------------------------------
// GATOTKACA POSTER FIGURE (SUPERHERO OF PRINGGANDANI)
// -------------------------------------------------------------

export function GatotkacaPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Gatotkaca Poster Art"
    >
      <defs>
        <linearGradient id="gatotkacaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="gatotkacaWings" x1="40" y1="120" x2="280" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" stopOpacity="0.3" />
          <stop offset="1" stopColor="#B45309" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* PRABA REAR FLIGHT WINGS (SUWIWI KENCANA) */}
      <g>
        <path
          d="M120 160 C50 110 15 170 30 230 C45 270 85 285 120 290"
          stroke="url(#gatotkacaGold)"
          strokeWidth="3"
          fill="url(#gatotkacaWings)"
        />
        <path d="M50 160 C35 190 40 230 65 255" stroke="url(#gatotkacaGold)" strokeWidth="1.5" />
        <path
          d="M200 160 C270 110 305 170 290 230 C275 270 235 285 200 290"
          stroke="url(#gatotkacaGold)"
          strokeWidth="3"
          fill="url(#gatotkacaWings)"
        />
        <path d="M270 160 C285 190 280 230 255 255" stroke="url(#gatotkacaGold)" strokeWidth="1.5" />
      </g>

      {/* MAKUTA GARUDAMUKA CROWN & HEAD */}
      <path
        d="M135 120 C125 75 145 45 165 42 C185 45 205 75 195 120 Z"
        stroke="url(#gatotkacaGold)"
        strokeWidth="3.5"
        fill="#261A0F"
        fillOpacity="0.4"
      />
      <circle cx="165" cy="42" r="3.5" fill="#FEF08A" />
      {/* Fierce Profile */}
      <path
        d="M112 120 L90 138 L80 160 L102 160 L108 172 L128 172 L140 160"
        stroke="url(#gatotkacaGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="98" cy="146" r="3" fill="#FEF08A" />
      <path d="M85 160 Q100 156 112 162" stroke="url(#gatotkacaGold)" strokeWidth="2.5" />

      {/* KOTANG ANTAKUSUMA SOLAR BREASTPLATE */}
      <path
        d="M130 180 L115 220 L125 280 L160 285 L195 280 L205 220 L190 180 Z"
        stroke="url(#gatotkacaGold)"
        strokeWidth="3.5"
        fill="#1C1008"
        fillOpacity="0.5"
      />
      {/* Radiant Solar Sunburst Emblem */}
      <circle cx="160" cy="235" r="14" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2" />
      <polygon points="160,217 163,228 174,228 165,235 168,246 160,239 152,246 155,235 146,228 157,228" fill="#FEF08A" />

      {/* FLYING ARMS WITH KUKU PANCANAKA */}
      <path d="M120 220 L80 240 L65 285" stroke="url(#gatotkacaGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M65 285 C55 295 50 310 52 322 C56 310 64 300 72 295 Z" fill="#FEF08A" stroke="url(#gatotkacaGold)" strokeWidth="1.8" />

      <path d="M200 220 L240 240 L255 285" stroke="url(#gatotkacaGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M255 285 C265 295 270 310 268 322 C264 310 256 300 248 295 Z" fill="#FEF08A" stroke="url(#gatotkacaGold)" strokeWidth="1.8" />

      {/* DODOT POLENG & STATELY LEGS */}
      <path
        d="M135 285 L125 350 L160 365 L195 350 L185 285 Z"
        stroke="url(#gatotkacaGold)"
        strokeWidth="3.5"
        fill="#0F0804"
      />
      <line x1="130" y1="315" x2="190" y2="315" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="135" y1="335" x2="185" y2="335" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 4" />

      <path d="M145 360 L140 450 L115 456" stroke="url(#gatotkacaGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M175 360 L180 450 L205 456" stroke="url(#gatotkacaGold)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// -------------------------------------------------------------
// SRIKANDI POSTER FIGURE (PANCALA WARRIOR ARCHER HEROINE)
// -------------------------------------------------------------

export function SrikandiPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Srikandi Poster Art"
    >
      <defs>
        <linearGradient id="srikandiGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="srikandiCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#047857" />
          <stop offset="1" stopColor="#064E3B" />
        </linearGradient>
      </defs>

      {/* SANGGUL HAIR WITH CUNDUK MENTUL JEWELS */}
      <path
        d="M135 120 C125 70 145 45 170 45 C195 45 200 75 185 95 C170 108 145 115 135 120 Z"
        stroke="url(#srikandiGold)"
        strokeWidth="3.5"
        fill="#261A0F"
        fillOpacity="0.3"
      />
      <circle cx="170" cy="45" r="3.5" fill="#FEF08A" />
      <circle cx="185" cy="55" r="2.5" fill="#FEF08A" />

      {/* DETERMINED FEMALE WARRIOR FACE */}
      <path
        d="M115 118 L98 132 L88 152 L105 150 L110 160 L122 160 L134 150"
        stroke="url(#srikandiGold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M100 138 C106 134 114 134 118 138" stroke="url(#srikandiGold)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="109" cy="138" r="2" fill="#FEF08A" />

      {/* ATHLETIC ARCHERY POSE WITH DIVINE BOW & ARROW */}
      <path d="M50 60 C40 180 40 320 55 420" stroke="url(#srikandiGold)" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="60" x2="55" y2="420" stroke="#FEF08A" strokeWidth="1" strokeDasharray="4 4" />
      {/* Pasopati/Arrow Drawn */}
      <line x1="48" y1="230" x2="190" y2="230" stroke="url(#srikandiGold)" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="48,225 38,230 48,235" fill="#FEF08A" />

      {/* ARMS HOLDING BOW */}
      <path d="M135 180 L90 200 L50 230" stroke="url(#srikandiGold)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M175 180 L205 210 L190 230" stroke="url(#srikandiGold)" strokeWidth="3.5" strokeLinecap="round" />

      {/* EMERALD GREEN WARRIOR SKIRT */}
      <g>
        <path
          d="M145 260 C135 300 142 340 165 355 C190 370 230 355 235 310 L195 260 Z"
          fill="url(#srikandiCloth)"
          stroke="url(#srikandiGold)"
          strokeWidth="3.5"
        />
        <path d="M160 275 C170 295 180 310 200 315" stroke="url(#srikandiGold)" strokeWidth="2" />
      </g>

      {/* MARTIAL LEGS */}
      <path d="M160 355 L155 440 L130 446" stroke="url(#srikandiGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M190 355 L195 440 L220 446" stroke="url(#srikandiGold)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// -------------------------------------------------------------
// SEMAR POSTER FIGURE (PAMOMONG SEJATI, BATARA ISMAYA)
// -------------------------------------------------------------

export function SemarPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wayang Kulit Semar Poster Art"
    >
      <defs>
        <linearGradient id="semarGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* KUNCUNG HAIR TUFT FORWARD */}
      <path
        d="M130 100 C110 65 130 45 150 55 C165 65 160 90 145 110"
        stroke="url(#semarGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#261A0F"
        fillOpacity="0.3"
      />

      {/* BENEVOLENT SMILING FACE & ROUND CHIN */}
      <path
        d="M120 115 C95 125 90 160 110 185 C130 205 170 205 185 185 C200 160 185 125 150 115 Z"
        stroke="url(#semarGold)"
        strokeWidth="3.5"
      />
      {/* Smiling, Wise Eye */}
      <path d="M122 145 Q135 138 145 145" stroke="url(#semarGold)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M160 145 Q170 138 180 145" stroke="url(#semarGold)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M135 170 Q150 182 165 170" stroke="url(#semarGold)" strokeWidth="2.5" strokeLinecap="round" />

      {/* BENEVOLENT ROUND TORSO & KAMPUH */}
      <ellipse cx="160" cy="270" rx="65" ry="70" stroke="url(#semarGold)" strokeWidth="4" fill="#1C1008" fillOpacity="0.3" />

      {/* WELCOMING GUIDANCE HAND ("NUDING KABECIKAN") */}
      <path d="M100 250 C75 260 55 275 40 290 C32 296 40 308 52 304 C68 296 84 280 105 270" stroke="url(#semarGold)" strokeWidth="4" strokeLinecap="round" />

      {/* KAMPUH SKIRT & STURDY SHORT FEET */}
      <path d="M110 335 C100 390 115 420 135 430 L155 430" stroke="url(#semarGold)" strokeWidth="4" strokeLinecap="round" />
      <path d="M210 335 C220 390 205 420 185 430 L165 430" stroke="url(#semarGold)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// -------------------------------------------------------------
// SACRED GUNUNGAN POSTER FIGURE
// -------------------------------------------------------------

export function GununganPosterFigure({ className = 'h-64 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gunungan Poster Art"
    >
      <defs>
        <linearGradient id="gununganGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Outer Leaf Silhouette */}
      <path
        d="M160 30 C135 110 50 250 35 390 C35 430 80 445 160 445 C240 445 285 430 285 390 C270 250 185 110 160 30 Z"
        stroke="url(#gununganGold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#261A0F"
        fillOpacity="0.25"
      />
      {/* Top Sacred Crown Point */}
      <line x1="160" y1="15" x2="160" y2="70" stroke="url(#gununganGold)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="160" cy="20" r="5" fill="#FEF08A" />

      {/* Kalpataru Tree Trunk */}
      <line x1="160" y1="420" x2="160" y2="120" stroke="url(#gununganGold)" strokeWidth="5" strokeLinecap="round" />

      {/* Tree Branches */}
      <path d="M160 330 C120 300 95 245 105 200" stroke="url(#gununganGold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 330 C200 300 225 245 215 200" stroke="url(#gununganGold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 260 C125 230 110 190 125 150" stroke="url(#gununganGold)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M160 260 C195 230 210 190 195 150" stroke="url(#gununganGold)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Sacred Portal (Gapura Bawah) */}
      <rect x="120" y="350" width="80" height="70" rx="5" stroke="url(#gununganGold)" strokeWidth="3.5" fill="#170E07" />
      <line x1="160" y1="350" x2="160" y2="420" stroke="url(#gununganGold)" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="160" cy="380" r="8" stroke="url(#gununganGold)" strokeWidth="2" />
    </svg>
  );
}

// -------------------------------------------------------------
// TAROT ARTWORK & DYNAMIC COMPONENT RESOLVER
// -------------------------------------------------------------

export function getTarotImagePath(slug: string): string {
  const s = (slug || '').toLowerCase().trim();
  switch (s) {
    case 'arjuna':
    case 'janaka':
    case 'permadi':
      return '/images/tarot/arjuna.jpg';
    case 'bima':
    case 'werkudara':
    case 'bratasena':
      return '/images/tarot/bima.jpg';
    case 'gatotkaca':
    case 'purubaya':
    case 'tetuka':
      return '/images/tarot/gatotkaca.jpg';
    case 'semar':
    case 'badranaya':
    case 'ismaya':
      return '/images/tarot/semar.jpg';
    case 'kresna':
    case 'narayana':
      return '/images/tarot/kresna.jpg';
    case 'srikandi':
      return '/images/tarot/srikandi.jpg';
    case 'bagong':
    case 'bawor':
      return '/images/tarot/bagong.jpg';
    case 'petruk':
    case 'kanthong-bolong':
      return '/images/tarot/petruk.jpg';
    case 'gareng':
    case 'cakruk':
      return '/images/tarot/gareng.jpg';
    case 'karna':
    case 'suryaputra':
      return '/images/tarot/karna.jpg';
    case 'yudhistira':
    case 'puntadewa':
    case 'samiaji':
      return '/images/tarot/yudhistira.jpg';
    case 'nakula':
    case 'pinten':
      return '/images/tarot/nakula.jpg';
    case 'sadewa':
    case 'tangsen':
      return '/images/tarot/sadewa.jpg';
    case 'duryodana':
    case 'kurupati':
    case 'suyodhana':
      return '/images/tarot/duryodana.jpg';
    default:
      return `/images/tarot/${s}.jpg`;
  }
}

export function WayangFigureBySlug({
  slug,
  className = 'h-52 sm:h-60 w-auto',
  alt,
}: {
  slug: string;
  className?: string;
  alt?: string;
}) {
  const imageSrc = getTarotImagePath(slug);
  return (
    <img
      src={imageSrc}
      alt={alt || slug}
      className={`aspect-[9/16] object-cover rounded-xl border border-[#C59B53]/50 shadow-xl ${className}`}
      loading="lazy"
    />
  );
}

// -------------------------------------------------------------
// STANDALONE SVG STRING GENERATORS FOR HTML5 CANVAS EXPORT
// -------------------------------------------------------------

export function getSadewaSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="sadewaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="sadewaCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1E3A8A"/>
        <stop offset="1" stop-color="#0F172A"/>
      </linearGradient>
      <radialGradient id="sadewaOrbGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#B45309" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g opacity="0.75">
      <circle cx="85" cy="80" r="2" fill="#FEF08A"/>
      <circle cx="110" cy="65" r="2.5" fill="#FCD34D"/>
      <circle cx="70" cy="115" r="2" fill="#FEF08A"/>
      <circle cx="245" cy="95" r="2" fill="#FEF08A"/>
      <circle cx="260" cy="140" r="2.5" fill="#FCD34D"/>
      <line x1="85" y1="80" x2="110" y2="65" stroke="#FCD34D" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="85" y1="80" x2="70" y2="115" stroke="#FCD34D" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="245" y1="95" x2="260" y2="140" stroke="#FCD34D" stroke-width="1" stroke-dasharray="3 3"/>
    </g>
    <path d="M130 120 C125 70 140 40 165 40 C190 40 195 70 180 90 C165 105 140 115 130 120 Z" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round" fill="#2A1608" fill-opacity="0.35"/>
    <path d="M145 90 C150 65 170 55 180 70 C185 80 175 95 160 100" stroke="url(#sadewaGold)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="165" cy="60" r="3" fill="#FEF08A"/>
    <circle cx="178" cy="72" r="2.5" fill="#FDE68A"/>
    <circle cx="152" cy="76" r="2.5" fill="#FDE68A"/>
    <path d="M110 115 C100 95 115 80 128 90 C138 98 132 112 124 116" stroke="url(#sadewaGold)" stroke-width="2.5"/>
    <path d="M115 130 C125 135 145 130 150 115" stroke="url(#sadewaGold)" stroke-width="2"/>
    <path d="M112 120 L95 135 L85 155 L102 152 L108 162 L120 162 L132 152" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98 142 C104 138 112 138 116 142" stroke="url(#sadewaGold)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="107" cy="142" r="2" fill="#FEF08A"/>
    <path d="M102 156 L110 156" stroke="url(#sadewaGold)" stroke-width="1.8"/>
    <path d="M125 160 L140 180" stroke="url(#sadewaGold)" stroke-width="3"/>
    <path d="M136 150 L150 175" stroke="url(#sadewaGold)" stroke-width="3"/>
    <path d="M135 175 C142 185 152 185 160 178" stroke="url(#sadewaGold)" stroke-width="2.5"/>
    <polygon points="148,180 151,185 156,185 152,189 154,194 148,191 142,194 144,189 140,185 145,185" fill="#FEF08A"/>
    <path d="M140 180 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 180 Z" stroke="url(#sadewaGold)" stroke-width="3" fill="#2A1608" fill-opacity="0.25"/>
    <line x1="145" y1="200" x2="165" y2="190" stroke="url(#sadewaGold)" stroke-width="1.2" opacity="0.75"/>
    <line x1="148" y1="215" x2="170" y2="205" stroke="url(#sadewaGold)" stroke-width="1.2" opacity="0.75"/>
    <line x1="150" y1="230" x2="175" y2="220" stroke="url(#sadewaGold)" stroke-width="1.2" opacity="0.75"/>
    <line x1="153" y1="245" x2="178" y2="235" stroke="url(#sadewaGold)" stroke-width="1.2" opacity="0.75"/>
    <g opacity="0.95">
      <path d="M190 230 L215 210 L220 215 L195 235 Z" fill="#F59E0B" stroke="url(#sadewaGold)" stroke-width="2"/>
      <path d="M185 245 L235 220 L242 228 L190 255 Z" fill="#2A1608" stroke="url(#sadewaGold)" stroke-width="2.5"/>
      <line x1="195" y1="242" x2="198" y2="249" stroke="url(#sadewaGold)" stroke-width="2"/>
      <line x1="205" y1="236" x2="208" y2="243" stroke="url(#sadewaGold)" stroke-width="2"/>
      <line x1="215" y1="231" x2="218" y2="238" stroke="url(#sadewaGold)" stroke-width="2"/>
    </g>
    <g>
      <path d="M152 260 C165 256 182 256 195 260 L195 272 C182 268 165 268 152 272 Z" fill="#D97706" stroke="url(#sadewaGold)" stroke-width="2.5"/>
      <circle cx="174" cy="265" r="4" fill="#FEF08A" stroke="url(#sadewaGold)" stroke-width="1.5"/>
      <path d="M150 272 C140 310 148 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 272 Z" fill="url(#sadewaCloth)" stroke="url(#sadewaGold)" stroke-width="3.5"/>
      <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="#FEF3C7" stroke-width="5" stroke-linecap="round"/>
      <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="url(#sadewaGold)" stroke-width="2" stroke-linecap="round"/>
      <path d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320" stroke="#FEF3C7" stroke-width="4" stroke-linecap="round"/>
      <path d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320" stroke="url(#sadewaGold)" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="185" cy="305" r="3.5" fill="#FEF08A"/>
      <circle cx="205" cy="310" r="3.5" fill="#FEF08A"/>
      <circle cx="198" cy="335" r="3.5" fill="#FEF08A"/>
      <circle cx="218" cy="338" r="3.5" fill="#FEF08A"/>
      <line x1="185" y1="305" x2="205" y2="310" stroke="#FEF08A" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
      <line x1="205" y1="310" x2="218" y2="338" stroke="#FEF08A" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
      <line x1="198" y1="335" x2="218" y2="338" stroke="#FEF08A" stroke-width="1" stroke-dasharray="2 2" opacity="0.6"/>
    </g>
    <g>
      <path d="M140 185 L120 235" stroke="url(#sadewaGold)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="127" cy="215" r="4" fill="#FCD34D"/>
      <path d="M120 235 L102 270" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="106" cy="260" r="3.5" fill="#FCD34D"/>
      <path d="M102 270 C96 274 92 280 88 288 M102 270 C98 276 94 284 92 292" stroke="url(#sadewaGold)" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="86" cy="268" r="14" fill="url(#sadewaOrbGlow)"/>
      <circle cx="86" cy="268" r="5" fill="#FEF08A"/>
      <line x1="86" y1="258" x2="86" y2="278" stroke="#FEF08A" stroke-width="1.5"/>
      <line x1="76" y1="268" x2="96" y2="268" stroke="#FEF08A" stroke-width="1.5"/>
    </g>
    <g>
      <path d="M175 185 L235 195" stroke="url(#sadewaGold)" stroke-width="4" stroke-linecap="round"/>
      <path d="M235 195 L240 300" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="240" cy="285" r="3.5" fill="#FCD34D"/>
      <path d="M240 300 C242 312 238 322 232 328 M240 300 C245 315 242 328 236 335" stroke="url(#sadewaGold)" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g>
      <path d="M165 365 L160 410 L155 450" stroke="url(#sadewaGold)" stroke-width="4" stroke-linecap="round"/>
      <path d="M155 450 C150 455 138 456 128 456 C138 450 152 445 155 440" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M195 365 L198 410 L200 450" stroke="url(#sadewaGold)" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 450 C205 455 218 456 228 456 C218 450 204 445 200 440" stroke="url(#sadewaGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="158" y1="420" x2="164" y2="422" stroke="url(#sadewaGold)" stroke-width="1.5"/>
      <line x1="156" y1="430" x2="162" y2="432" stroke="url(#sadewaGold)" stroke-width="1.5"/>
      <line x1="196" y1="420" x2="202" y2="422" stroke="url(#sadewaGold)" stroke-width="1.5"/>
      <line x1="197" y1="430" x2="203" y2="432" stroke="url(#sadewaGold)" stroke-width="1.5"/>
    </g>
  </svg>`;
}

export function getArjunaSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="goldStroke" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FDE68A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="clothRed" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#991B1B"/>
        <stop offset="1" stop-color="#7F1D1D"/>
      </linearGradient>
    </defs>
    <path d="M130 120 C125 70 140 40 165 40 C190 40 195 70 180 90 C165 105 140 115 130 120 Z" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" fill="#381E0C" fill-opacity="0.3"/>
    <path d="M145 90 C150 65 170 55 180 70 C185 80 175 95 160 100" stroke="url(#goldStroke)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="165" cy="62" r="3" fill="#FCD34D"/>
    <circle cx="178" cy="74" r="2.5" fill="#FCD34D"/>
    <circle cx="152" cy="78" r="2.5" fill="#FCD34D"/>
    <path d="M110 115 C100 95 115 80 128 90 C138 98 132 112 124 116" stroke="url(#goldStroke)" stroke-width="2.5"/>
    <path d="M115 130 C125 135 145 130 150 115" stroke="url(#goldStroke)" stroke-width="2"/>
    <path d="M112 120 L95 135 L85 155 L102 152 L108 162 L120 162 L132 152" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98 142 C104 138 112 138 116 142" stroke="url(#goldStroke)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="107" cy="142" r="2" fill="#FDE68A"/>
    <path d="M102 156 L110 156" stroke="url(#goldStroke)" stroke-width="1.8"/>
    <path d="M125 160 L140 180" stroke="url(#goldStroke)" stroke-width="3"/>
    <path d="M136 150 L150 175" stroke="url(#goldStroke)" stroke-width="3"/>
    <path d="M135 175 C142 185 152 185 160 178" stroke="url(#goldStroke)" stroke-width="2.5"/>
    <circle cx="148" cy="184" r="3" fill="#FCD34D"/>
    <path d="M140 180 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 180 Z" stroke="url(#goldStroke)" stroke-width="3" fill="#381E0C" fill-opacity="0.2"/>
    <line x1="145" y1="200" x2="165" y2="190" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.7"/>
    <line x1="148" y1="215" x2="170" y2="205" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.7"/>
    <line x1="150" y1="230" x2="175" y2="220" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.7"/>
    <line x1="153" y1="245" x2="178" y2="235" stroke="url(#goldStroke)" stroke-width="1.2" opacity="0.7"/>
    <g opacity="0.95">
      <path d="M190 230 L215 210 L220 215 L195 235 Z" fill="#F59E0B" stroke="url(#goldStroke)" stroke-width="2"/>
      <path d="M185 245 L235 220 L242 228 L190 255 Z" fill="#381E0C" stroke="url(#goldStroke)" stroke-width="2.5"/>
      <line x1="195" y1="242" x2="198" y2="249" stroke="url(#goldStroke)" stroke-width="2"/>
      <line x1="205" y1="236" x2="208" y2="243" stroke="url(#goldStroke)" stroke-width="2"/>
      <line x1="215" y1="231" x2="218" y2="238" stroke="url(#goldStroke)" stroke-width="2"/>
      <line x1="225" y1="226" x2="228" y2="233" stroke="url(#goldStroke)" stroke-width="2"/>
    </g>
    <g>
      <path d="M152 260 C165 256 182 256 195 260 L195 272 C182 268 165 268 152 272 Z" fill="#D97706" stroke="url(#goldStroke)" stroke-width="2.5"/>
      <circle cx="174" cy="265" r="4" fill="#FEF08A" stroke="url(#goldStroke)" stroke-width="1.5"/>
      <path d="M150 272 C140 310 148 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 272 Z" fill="url(#clothRed)" stroke="url(#goldStroke)" stroke-width="3.5"/>
      <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="#FEF3C7" stroke-width="7" stroke-linecap="round"/>
      <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="url(#goldStroke)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320" stroke="#FEF3C7" stroke-width="6" stroke-linecap="round"/>
      <path d="M175 310 C185 330 198 348 218 350 C230 350 235 335 236 320" stroke="url(#goldStroke)" stroke-width="2" stroke-linecap="round"/>
      <circle cx="185" cy="305" r="3.5" fill="#FEF08A"/>
      <circle cx="205" cy="310" r="3.5" fill="#FEF08A"/>
      <circle cx="198" cy="335" r="3.5" fill="#FEF08A"/>
      <circle cx="218" cy="338" r="3.5" fill="#FEF08A"/>
    </g>
    <g>
      <path d="M140 185 L130 260" stroke="url(#goldStroke)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="137" cy="210" r="4" fill="#FCD34D"/>
      <path d="M130 260 L120 335" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="121" cy="320" r="3.5" fill="#FCD34D"/>
      <path d="M120 335 C115 345 100 350 90 355 M120 335 C112 348 98 355 92 360 M120 335 C116 350 105 362 98 368" stroke="url(#goldStroke)" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g>
      <path d="M175 185 L235 195" stroke="url(#goldStroke)" stroke-width="4" stroke-linecap="round"/>
      <path d="M235 195 L240 300" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="240" cy="285" r="3.5" fill="#FCD34D"/>
      <path d="M240 300 C242 312 238 322 232 328 M240 300 C245 315 242 328 236 335" stroke="url(#goldStroke)" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g>
      <path d="M165 365 L160 410 L155 450" stroke="url(#goldStroke)" stroke-width="4" stroke-linecap="round"/>
      <path d="M155 450 C150 455 138 456 128 456 C138 450 152 445 155 440" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M195 365 L198 410 L200 450" stroke="url(#goldStroke)" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 450 C205 455 218 456 228 456 C218 450 204 445 200 440" stroke="url(#goldStroke)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="158" y1="420" x2="164" y2="422" stroke="url(#goldStroke)" stroke-width="1.5"/>
      <line x1="156" y1="430" x2="162" y2="432" stroke="url(#goldStroke)" stroke-width="1.5"/>
      <line x1="196" y1="420" x2="202" y2="422" stroke="url(#goldStroke)" stroke-width="1.5"/>
      <line x1="197" y1="430" x2="203" y2="432" stroke="url(#goldStroke)" stroke-width="1.5"/>
    </g>
  </svg>`;
}

export function getBimaSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="bimaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#B45309"/>
      </linearGradient>
      <linearGradient id="bimaPoleng" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#262626"/>
        <stop offset="1" stop-color="#0A0A0A"/>
      </linearGradient>
    </defs>
    <path d="M125 120 C110 50 145 20 180 25 C205 30 215 65 195 95 C175 115 145 125 125 120 Z" stroke="url(#bimaGold)" stroke-width="4" stroke-linecap="round" fill="#261A0F" fill-opacity="0.4"/>
    <path d="M180 25 L196 10 L198 28" stroke="url(#bimaGold)" stroke-width="3" fill="#F59E0B"/>
    <path d="M105 120 L82 140 L72 165 L95 165 L100 180 L125 180 L138 165" stroke="url(#bimaGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="96" cy="148" rx="8" ry="6" fill="#FEF08A" stroke="url(#bimaGold)" stroke-width="2"/>
    <circle cx="96" cy="148" r="3" fill="#171717"/>
    <path d="M78 165 Q96 158 112 168" stroke="url(#bimaGold)" stroke-width="3" stroke-linecap="round"/>
    <path d="M115 180 L128 205" stroke="url(#bimaGold)" stroke-width="3.5"/>
    <path d="M138 175 L158 205" stroke="url(#bimaGold)" stroke-width="3.5"/>
    <path d="M125 205 C145 235 152 270 155 290 L200 290 C208 260 210 225 188 200 Z" stroke="url(#bimaGold)" stroke-width="3.5" fill="#261A0F" fill-opacity="0.3"/>
    <line x1="135" y1="225" x2="168" y2="215" stroke="url(#bimaGold)" stroke-width="1.5"/>
    <line x1="138" y1="245" x2="175" y2="235" stroke="url(#bimaGold)" stroke-width="1.5"/>
    <line x1="142" y1="265" x2="182" y2="255" stroke="url(#bimaGold)" stroke-width="1.5"/>
    <g>
      <ellipse cx="248" cy="165" rx="18" ry="26" fill="#78350F" stroke="url(#bimaGold)" stroke-width="3.5"/>
      <line x1="235" y1="165" x2="260" y2="165" stroke="url(#bimaGold)" stroke-width="2.5"/>
      <line x1="248" y1="145" x2="248" y2="185" stroke="url(#bimaGold)" stroke-width="2.5"/>
      <path d="M248 190 L256 360" stroke="url(#bimaGold)" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g>
      <rect x="145" y="285" width="55" height="15" fill="#D97706" stroke="url(#bimaGold)" stroke-width="2.5"/>
      <path d="M140 300 C130 340 138 385 165 395 C195 405 235 390 240 340 L205 300 Z" fill="url(#bimaPoleng)" stroke="url(#bimaGold)" stroke-width="3.5"/>
      <line x1="142" y1="325" x2="230" y2="325" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="148" y1="350" x2="235" y2="350" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="155" y1="375" x2="225" y2="375" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="175" y1="305" x2="175" y2="395" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="205" y1="305" x2="205" y2="395" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6 6"/>
    </g>
    <g>
      <path d="M130 210 L110 270 L85 330" stroke="url(#bimaGold)" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="118" cy="245" r="4.5" fill="#FCD34D"/>
      <circle cx="95" cy="315" r="4" fill="#FCD34D"/>
      <path d="M85 330 C72 342 66 360 68 375 C74 360 84 348 94 340 Z" fill="#FEF08A" stroke="url(#bimaGold)" stroke-width="2"/>
    </g>
    <g>
      <path d="M185 205 L230 230 L240 310" stroke="url(#bimaGold)" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="236" cy="290" r="4" fill="#FCD34D"/>
      <path d="M240 310 C250 322 255 338 252 352 C248 338 240 328 232 322 Z" fill="#FEF08A" stroke="url(#bimaGold)" stroke-width="2"/>
    </g>
    <g>
      <path d="M160 395 L155 450" stroke="url(#bimaGold)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M155 450 C148 456 132 458 120 458" stroke="url(#bimaGold)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="155" cy="442" r="4" fill="#FCD34D"/>
      <path d="M200 395 L205 450" stroke="url(#bimaGold)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M205 450 C212 456 228 458 240 458" stroke="url(#bimaGold)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="205" cy="442" r="4" fill="#FCD34D"/>
    </g>
  </svg>`;
}

export function getYudhistiraSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="yudhisGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="yudhisWhiteCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F8FAFC"/>
        <stop offset="1" stop-color="#CBD5E1"/>
      </linearGradient>
    </defs>
    <path d="M130 115 C125 65 150 40 175 42 C200 45 205 75 190 98 C175 112 145 118 130 115 Z" stroke="url(#yudhisGold)" stroke-width="3.5" fill="#332211" fill-opacity="0.3"/>
    <circle cx="175" cy="44" r="4" fill="#FEF08A" stroke="url(#yudhisGold)" stroke-width="1.5"/>
    <path d="M140 92 C150 75 170 65 182 80" stroke="url(#yudhisGold)" stroke-width="2"/>
    <path d="M115 118 L98 132 L88 152 L105 150 L110 160 L122 160 L134 150" stroke="url(#yudhisGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M100 140 C106 136 114 136 118 140" stroke="url(#yudhisGold)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="109" cy="140" r="2" fill="#FEF08A"/>
    <path d="M104 154 L112 154" stroke="url(#yudhisGold)" stroke-width="1.8"/>
    <path d="M125 158 L140 178 M136 148 L150 173" stroke="url(#yudhisGold)" stroke-width="3"/>
    <path d="M140 178 C150 205 155 240 158 260 L180 260 C185 235 188 200 175 178 Z" stroke="url(#yudhisGold)" stroke-width="3" fill="#261A0F" fill-opacity="0.2"/>
    <g>
      <rect x="150" y="220" width="22" height="36" rx="3" fill="#FEF3C7" stroke="url(#yudhisGold)" stroke-width="2"/>
      <line x1="155" y1="230" x2="167" y2="230" stroke="#B45309" stroke-width="1.5"/>
      <line x1="155" y1="238" x2="167" y2="238" stroke="#B45309" stroke-width="1.5"/>
      <circle cx="161" cy="248" r="2.5" fill="#DC2626"/>
    </g>
    <g>
      <rect x="148" y="258" width="46" height="12" fill="#D97706" stroke="url(#yudhisGold)" stroke-width="2"/>
      <path d="M148 270 C138 310 146 350 170 365 C195 380 235 365 240 320 C242 290 215 270 195 270 Z" fill="url(#yudhisWhiteCloth)" stroke="url(#yudhisGold)" stroke-width="3.5"/>
      <path d="M165 285 C175 305 185 320 205 325 C220 330 225 315 228 300" stroke="url(#yudhisGold)" stroke-width="2"/>
      <path d="M175 310 C185 330 198 348 218 350" stroke="url(#yudhisGold)" stroke-width="2"/>
    </g>
    <path d="M140 182 L125 240 L145 255" stroke="url(#yudhisGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M175 182 L190 240 L168 255" stroke="url(#yudhisGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M165 365 L160 450 L135 456" stroke="url(#yudhisGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M195 365 L198 450 L220 456" stroke="url(#yudhisGold)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

export function getGatotkacaSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="gatotkacaGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="gatotkacaWings" x1="40" y1="120" x2="280" y2="300" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F59E0B" stop-opacity="0.3"/>
        <stop offset="1" stop-color="#B45309" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    <g>
      <path d="M120 160 C50 110 15 170 30 230 C45 270 85 285 120 290" stroke="url(#gatotkacaGold)" stroke-width="3" fill="url(#gatotkacaWings)"/>
      <path d="M50 160 C35 190 40 230 65 255" stroke="url(#gatotkacaGold)" stroke-width="1.5"/>
      <path d="M200 160 C270 110 305 170 290 230 C275 270 235 285 200 290" stroke="url(#gatotkacaGold)" stroke-width="3" fill="url(#gatotkacaWings)"/>
      <path d="M270 160 C285 190 280 230 255 255" stroke="url(#gatotkacaGold)" stroke-width="1.5"/>
    </g>
    <path d="M135 120 C125 75 145 45 165 42 C185 45 205 75 195 120 Z" stroke="url(#gatotkacaGold)" stroke-width="3.5" fill="#261A0F" fill-opacity="0.4"/>
    <circle cx="165" cy="42" r="3.5" fill="#FEF08A"/>
    <path d="M112 120 L90 138 L80 160 L102 160 L108 172 L128 172 L140 160" stroke="url(#gatotkacaGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="98" cy="146" r="3" fill="#FEF08A"/>
    <path d="M85 160 Q100 156 112 162" stroke="url(#gatotkacaGold)" stroke-width="2.5"/>
    <path d="M130 180 L115 220 L125 280 L160 285 L195 280 L205 220 L190 180 Z" stroke="url(#gatotkacaGold)" stroke-width="3.5" fill="#1C1008" fill-opacity="0.5"/>
    <circle cx="160" cy="235" r="14" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
    <polygon points="160,217 163,228 174,228 165,235 168,246 160,239 152,246 155,235 146,228 157,228" fill="#FEF08A"/>
    <path d="M120 220 L80 240 L65 285" stroke="url(#gatotkacaGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M65 285 C55 295 50 310 52 322 C56 310 64 300 72 295 Z" fill="#FEF08A" stroke="url(#gatotkacaGold)" stroke-width="1.8"/>
    <path d="M200 220 L240 240 L255 285" stroke="url(#gatotkacaGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M255 285 C265 295 270 310 268 322 C264 310 256 300 248 295 Z" fill="#FEF08A" stroke="url(#gatotkacaGold)" stroke-width="1.8"/>
    <path d="M135 285 L125 350 L160 365 L195 350 L185 285 Z" stroke="url(#gatotkacaGold)" stroke-width="3.5" fill="#0F0804"/>
    <line x1="130" y1="315" x2="190" y2="315" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="135" y1="335" x2="185" y2="335" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M145 360 L140 450 L115 456" stroke="url(#gatotkacaGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M175 360 L180 450 L205 456" stroke="url(#gatotkacaGold)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

export function getSrikandiSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="srikandiGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="srikandiCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#047857"/>
        <stop offset="1" stop-color="#064E3B"/>
      </linearGradient>
    </defs>
    <path d="M135 120 C125 70 145 45 170 45 C195 45 200 75 185 95 C170 108 145 115 135 120 Z" stroke="url(#srikandiGold)" stroke-width="3.5" fill="#261A0F" fill-opacity="0.3"/>
    <circle cx="170" cy="45" r="3.5" fill="#FEF08A"/>
    <circle cx="185" cy="55" r="2.5" fill="#FEF08A"/>
    <path d="M115 118 L98 132 L88 152 L105 150 L110 160 L122 160 L134 150" stroke="url(#srikandiGold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M100 138 C106 134 114 134 118 138" stroke="url(#srikandiGold)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="109" cy="138" r="2" fill="#FEF08A"/>
    <path d="M50 60 C40 180 40 320 55 420" stroke="url(#srikandiGold)" stroke-width="4" stroke-linecap="round"/>
    <line x1="50" y1="60" x2="55" y2="420" stroke="#FEF08A" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="48" y1="230" x2="190" y2="230" stroke="url(#srikandiGold)" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="48,225 38,230 48,235" fill="#FEF08A"/>
    <path d="M135 180 L90 200 L50 230" stroke="url(#srikandiGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M175 180 L205 210 L190 230" stroke="url(#srikandiGold)" stroke-width="3.5" stroke-linecap="round"/>
    <g>
      <path d="M145 260 C135 300 142 340 165 355 C190 370 230 355 235 310 L195 260 Z" fill="url(#srikandiCloth)" stroke="url(#srikandiGold)" stroke-width="3.5"/>
      <path d="M160 275 C170 295 180 310 200 315" stroke="url(#srikandiGold)" stroke-width="2"/>
    </g>
    <path d="M160 355 L155 440 L130 446" stroke="url(#srikandiGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M190 355 L195 440 L220 446" stroke="url(#srikandiGold)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

export function getSemarSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="semarGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
    </defs>
    <path d="M130 100 C110 65 130 45 150 55 C165 65 160 90 145 110" stroke="url(#semarGold)" stroke-width="3.5" stroke-linecap="round" fill="#261A0F" fill-opacity="0.3"/>
    <path d="M120 115 C95 125 90 160 110 185 C130 205 170 205 185 185 C200 160 185 125 150 115 Z" stroke="url(#semarGold)" stroke-width="3.5"/>
    <path d="M122 145 Q135 138 145 145" stroke="url(#semarGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M160 145 Q170 138 180 145" stroke="url(#semarGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M135 170 Q150 182 165 170" stroke="url(#semarGold)" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="160" cy="270" rx="65" ry="70" stroke="url(#semarGold)" stroke-width="4" fill="#1C1008" fill-opacity="0.3"/>
    <path d="M100 250 C75 260 55 275 40 290 C32 296 40 308 52 304 C68 296 84 280 105 270" stroke="url(#semarGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M110 335 C100 390 115 420 135 430 L155 430" stroke="url(#semarGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M210 335 C220 390 205 420 185 430 L165 430" stroke="url(#semarGold)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

export function getPetrukSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="petrukGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FDE68A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="petrukCloth" x1="140" y1="260" x2="220" y2="380" gradientUnits="userSpaceOnUse">
        <stop stop-color="#991B1B"/>
        <stop offset="1" stop-color="#7F1D1D"/>
      </linearGradient>
    </defs>
    <path d="M150 90 C140 50 160 30 180 40 C190 50 185 75 168 88" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M145 92 C135 105 125 118 118 135" stroke="url(#petrukGold)" stroke-width="3.5"/>
    <circle cx="124" cy="122" r="3.5" fill="#FEF08A"/>
    <path d="M120 128 L60 138 C55 140 58 148 68 146 L115 145" stroke="url(#petrukGold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M115 145 C110 160 125 170 135 165 L145 155" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M112 152 Q120 160 128 152" stroke="url(#petrukGold)" stroke-width="2.5"/>
    <path d="M142 165 L145 270 C155 272 178 272 188 270 L180 165 Z" stroke="url(#petrukGold)" stroke-width="3.5" fill="#381E0C" fill-opacity="0.2"/>
    <line x1="148" y1="195" x2="175" y2="190" stroke="url(#petrukGold)" stroke-width="1.5" opacity="0.8"/>
    <line x1="148" y1="215" x2="178" y2="210" stroke="url(#petrukGold)" stroke-width="1.5" opacity="0.8"/>
    <line x1="148" y1="235" x2="180" y2="230" stroke="url(#petrukGold)" stroke-width="1.5" opacity="0.8"/>
    <g>
      <rect x="140" y="268" width="55" height="15" rx="3" fill="#D97706" stroke="url(#petrukGold)" stroke-width="2"/>
      <path d="M140 282 C132 320 140 360 165 370 C190 380 220 365 225 320 L195 282 Z" fill="url(#petrukCloth)" stroke="url(#petrukGold)" stroke-width="3.5"/>
      <line x1="150" y1="310" x2="215" y2="310" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4"/>
      <line x1="145" y1="335" x2="218" y2="335" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="178" cy="325" r="4" fill="#FEF08A"/>
    </g>
    <path d="M142 170 L125 240 L105 310" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M105 310 L92 325 M105 310 L95 332" stroke="url(#petrukGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M180 170 L220 220 L235 300" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M235 300 L242 320" stroke="url(#petrukGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M155 370 L152 450" stroke="url(#petrukGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M152 450 L130 456" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M185 370 L188 450" stroke="url(#petrukGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M188 450 L210 456" stroke="url(#petrukGold)" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`;
}

export function getGununganSvgString(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480" fill="none">
    <defs>
      <linearGradient id="gununganGold" x1="0" y1="0" x2="320" y2="480" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FEF08A"/>
        <stop offset="0.5" stop-color="#F59E0B"/>
        <stop offset="1" stop-color="#D97706"/>
      </linearGradient>
    </defs>
    <path d="M160 30 C135 110 50 250 35 390 C35 430 80 445 160 445 C240 445 285 430 285 390 C270 250 185 110 160 30 Z" stroke="url(#gununganGold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#261A0F" fill-opacity="0.25"/>
    <line x1="160" y1="15" x2="160" y2="70" stroke="url(#gununganGold)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="160" cy="20" r="5" fill="#FEF08A"/>
    <line x1="160" y1="420" x2="160" y2="120" stroke="url(#gununganGold)" stroke-width="5" stroke-linecap="round"/>
    <path d="M160 330 C120 300 95 245 105 200" stroke="url(#gununganGold)" stroke-width="3" stroke-linecap="round"/>
    <path d="M160 330 C200 300 225 245 215 200" stroke="url(#gununganGold)" stroke-width="3" stroke-linecap="round"/>
    <path d="M160 260 C125 230 110 190 125 150" stroke="url(#gununganGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M160 260 C195 230 210 190 195 150" stroke="url(#gununganGold)" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="120" y="350" width="80" height="70" rx="5" stroke="url(#gununganGold)" stroke-width="3.5" fill="#170E07"/>
    <line x1="160" y1="350" x2="160" y2="420" stroke="url(#gununganGold)" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="160" cy="380" r="8" stroke="url(#gununganGold)" stroke-width="2"/>
  </svg>`;
}

export function getWayangSvgString(slug: string): string {
  const s = (slug || '').toLowerCase().trim();
  switch (s) {
    case 'sadewa':
    case 'nakula':
      return getSadewaSvgString();
    case 'bima':
    case 'werkudara':
    case 'bratasena':
      return getBimaSvgString();
    case 'yudhistira':
    case 'puntadewa':
    case 'samiaji':
      return getYudhistiraSvgString();
    case 'gatotkaca':
    case 'purubaya':
    case 'tetuka':
      return getGatotkacaSvgString();
    case 'srikandi':
      return getSrikandiSvgString();
    case 'semar':
    case 'badranaya':
    case 'ismaya':
      return getSemarSvgString();
    case 'petruk':
    case 'kanthong-bolong':
    case 'gareng':
    case 'bagong':
      return getPetrukSvgString();
    case 'gunungan':
      return getGununganSvgString();
    case 'arjuna':
    case 'janaka':
    case 'permadi':
    case 'karna':
    case 'duryodana':
    default:
      return s === 'sadewa' ? getSadewaSvgString() : getArjunaSvgString();
  }
}

// -------------------------------------------------------------
// CANVAS DRAWING HELPERS (ASYNC HTML5 2D DRAWING)
// -------------------------------------------------------------

/**
 * Draws the high-fidelity Wayang figure onto an HTML5 2D Canvas context.
 */
export async function drawWayangOnCanvas(
  ctx: CanvasRenderingContext2D,
  slug: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  const tarotSrc = getTarotImagePath(slug);
  const svgString = getWayangSvgString(slug);

  return new Promise((resolve) => {
    try {
      const tarotImg = new Image();
      tarotImg.crossOrigin = 'anonymous';

      const renderTarotCard = () => {
        try {
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
          ctx.shadowBlur = 36;
          ctx.shadowOffsetY = 18;

          // Clip to rounded rectangle with gold border
          const radius = Math.min(24, width * 0.08);
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.save();
          ctx.clip();
          ctx.drawImage(tarotImg, x, y, width, height);
          ctx.restore();

          // Stroke subtle golden border around card
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#D4AF37';
          ctx.stroke();

          ctx.restore();
        } catch (drawErr) {
          console.error('[drawWayangOnCanvas] drawImage failed:', drawErr);
        }
        resolve();
      };

      tarotImg.onload = renderTarotCard;
      tarotImg.onerror = () => {
        // Fallback to SVG rendering if tarot image cannot be fetched
        try {
          const img = new Image();
          const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
          img.onload = () => {
            try {
              ctx.save();
              ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
              ctx.shadowBlur = 36;
              ctx.shadowOffsetY = 18;
              ctx.drawImage(img, x, y, width, height);
              ctx.restore();
            } catch (err) {
              console.error('[drawWayangOnCanvas] svg draw failed:', err);
            }
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
          img.src = dataUri;
        } catch {
          resolve();
        }
      };

      tarotImg.src = tarotSrc;
    } catch (e) {
      console.error('[drawWayangOnCanvas] Exception:', e);
      resolve();
    }
  });
}

/**
 * Draws ambient watermark Gunungan silhouettes on lower borders of canvas
 */
export async function drawGununganWatermarkOnCanvas(
  ctx: CanvasRenderingContext2D,
  canvasWidth = 1080,
  canvasHeight = 1920
): Promise<void> {
  const svgString = getGununganSvgString();
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

      const renderGunungan = () => {
        try {
          ctx.save();
          ctx.globalAlpha = 0.16;

          // Left Gunungan watermark
          ctx.save();
          ctx.translate(30, canvasHeight - 780);
          ctx.rotate((-6 * Math.PI) / 180);
          ctx.drawImage(img, 0, 0, 360, 560);
          ctx.restore();

          // Right Gunungan watermark (mirrored)
          ctx.save();
          ctx.translate(canvasWidth - 30, canvasHeight - 780);
          ctx.rotate((6 * Math.PI) / 180);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0, 360, 560);
          ctx.restore();

          ctx.restore();
        } catch {
          // fail silently
        }
        resolve();
      };

      img.onload = renderGunungan;
      img.onerror = () => {
        try {
          const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            try {
              ctx.save();
              ctx.globalAlpha = 0.16;
              ctx.save();
              ctx.translate(30, canvasHeight - 780);
              ctx.rotate((-6 * Math.PI) / 180);
              ctx.drawImage(fallbackImg, 0, 0, 360, 560);
              ctx.restore();
              ctx.save();
              ctx.translate(canvasWidth - 30, canvasHeight - 780);
              ctx.rotate((6 * Math.PI) / 180);
              ctx.scale(-1, 1);
              ctx.drawImage(fallbackImg, 0, 0, 360, 560);
              ctx.restore();
              ctx.restore();
            } finally {
              URL.revokeObjectURL(url);
              resolve();
            }
          };
          fallbackImg.onerror = () => {
            URL.revokeObjectURL(url);
            resolve();
          };
          fallbackImg.src = url;
        } catch {
          resolve();
        }
      };

      img.src = dataUri;
    } catch {
      resolve();
    }
  });
}

/**
 * Draws authentic golden dust motes on the 9:16 Canvas
 */
export function drawGoldenDustMotesOnCanvas(ctx: CanvasRenderingContext2D) {
  const motes = [
    { x: 160, y: 550, r: 4, o: 0.6 },
    { x: 220, y: 520, r: 2.5, o: 0.8 },
    { x: 190, y: 640, r: 3.5, o: 0.5 },
    { x: 280, y: 720, r: 2.5, o: 0.7 },
    { x: 130, y: 800, r: 3, o: 0.6 },
    { x: 920, y: 530, r: 3.5, o: 0.5 },
    { x: 960, y: 620, r: 2.5, o: 0.7 },
    { x: 880, y: 690, r: 4, o: 0.6 },
    { x: 940, y: 770, r: 2.5, o: 0.5 },
    { x: 200, y: 1080, r: 3, o: 0.4 },
    { x: 880, y: 1120, r: 3, o: 0.4 },
    { x: 540, y: 470, r: 2.5, o: 0.7 },
    { x: 340, y: 920, r: 2.5, o: 0.5 },
    { x: 740, y: 920, r: 2.5, o: 0.5 },
  ];
  ctx.save();
  for (const m of motes) {
    ctx.fillStyle = `rgba(252, 211, 77, ${m.o})`;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draws traditional Megamendung / Awan Wayang flourishes on canvas border
 */
export function drawAwanMegamendungOnCanvas(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = '#D39F47';
  ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const drawCloud = (x: number, y: number, scaleX: number, scaleY: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.beginPath();
    ctx.moveTo(10, 55);
    ctx.bezierCurveTo(10, 40, 25, 35, 35, 42);
    ctx.bezierCurveTo(40, 28, 60, 25, 70, 35);
    ctx.bezierCurveTo(80, 20, 105, 25, 110, 45);
    ctx.bezierCurveTo(115, 55, 105, 65, 90, 65);
    ctx.lineTo(20, 65);
    ctx.bezierCurveTo(12, 65, 10, 60, 10, 55);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25, 55);
    ctx.bezierCurveTo(25, 46, 35, 43, 42, 48);
    ctx.bezierCurveTo(46, 38, 60, 36, 67, 43);
    ctx.bezierCurveTo(74, 33, 90, 36, 94, 50);
    ctx.stroke();
    ctx.restore();
  };

  // Left cloud around y=520 (framing figure below headline)
  drawCloud(55, 520, 1.3, 1.3);

  // Right cloud around y=590 (framing right border)
  drawCloud(1025, 590, -1.3, 1.3);

  // Bottom left cloud around y=1260
  drawCloud(50, 1260, 1.1, 1.1);

  ctx.restore();
}


