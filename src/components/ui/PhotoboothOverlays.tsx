
import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Draw Traditional Javanese Joglo House Architecture on Canvas
 */
export function drawJogloHouse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 2.5;
  ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';

  // Main peaked roof (Atap Brunjung Joglo)
  ctx.beginPath();
  ctx.moveTo(x + width * 0.5, y);
  ctx.lineTo(x + width * 0.35, y + height * 0.35);
  ctx.lineTo(x + width * 0.12, y + height * 0.65);
  ctx.lineTo(x + width * 0.88, y + height * 0.65);
  ctx.lineTo(x + width * 0.65, y + height * 0.35);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Crown finial / Sungu Joglo
  ctx.beginPath();
  ctx.moveTo(x + width * 0.5, y - 8);
  ctx.lineTo(x + width * 0.5, y);
  ctx.stroke();

  // Lower roof tiers (Atap Penanggap)
  ctx.beginPath();
  ctx.moveTo(x + width * 0.05, y + height * 0.8);
  ctx.lineTo(x + width * 0.95, y + height * 0.8);
  ctx.stroke();

  // Pillars (Soko Guru)
  ctx.beginPath();
  ctx.moveTo(x + width * 0.3, y + height * 0.65);
  ctx.lineTo(x + width * 0.3, y + height);
  ctx.moveTo(x + width * 0.7, y + height * 0.65);
  ctx.lineTo(x + width * 0.7, y + height);
  ctx.moveTo(x + width * 0.15, y + height * 0.8);
  ctx.lineTo(x + width * 0.15, y + height);
  ctx.moveTo(x + width * 0.85, y + height * 0.8);
  ctx.lineTo(x + width * 0.85, y + height);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Traditional Golden Triangular Tumpal / Songket Border across bottom
 */
export function drawTumpalPattern(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.strokeStyle = '#FCD34D';
  ctx.fillStyle = 'rgba(252, 211, 77, 0.15)';
  ctx.lineWidth = 2;
  const triangleWidth = 28;
  const count = Math.ceil(width / triangleWidth);

  for (let i = 0; i < count; i++) {
    const startX = i * triangleWidth;
    // Outer Triangle
    ctx.beginPath();
    ctx.moveTo(startX, y + height);
    ctx.lineTo(startX + triangleWidth / 2, y);
    ctx.lineTo(startX + triangleWidth, y + height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Inner small decorative chevron
    ctx.beginPath();
    ctx.moveTo(startX + 6, y + height);
    ctx.lineTo(startX + triangleWidth / 2, y + 8);
    ctx.lineTo(startX + triangleWidth - 6, y + height);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draw Golden Botanical Leaf Flourishes flanking header
 */
export function drawBotanicalLeaves(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number
) {
  ctx.save();
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(252, 211, 77, 0.25)';

  // Left leaf branch
  ctx.beginPath();
  ctx.moveTo(centerX - 80, centerY);
  ctx.quadraticCurveTo(centerX - 160, centerY - 25, centerX - 260, centerY - 5);
  ctx.stroke();

  for (let offset = 100; offset <= 240; offset += 35) {
    ctx.beginPath();
    ctx.ellipse(centerX - offset, centerY - 15, 14, 7, -Math.PI / 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }

  // Right leaf branch
  ctx.beginPath();
  ctx.moveTo(centerX + 80, centerY);
  ctx.quadraticCurveTo(centerX + 160, centerY - 25, centerX + 260, centerY - 5);
  ctx.stroke();

  for (let offset = 100; offset <= 240; offset += 35) {
    ctx.beginPath();
    ctx.ellipse(centerX + offset, centerY - 15, 14, 7, Math.PI / 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Viewfinder overlay for Ukiran Jepara
 */
export function UkiranJeparaViewfinderOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-2">
      <img
        src="/frames/frame-ukiran-jepara.png"
        alt="Bingkai Ukiran Jepara"
        className="w-full h-full object-contain pointer-events-none drop-shadow-xl select-none"
      />
    </div>
  );
}

/**
 * Viewfinder overlay for Klasik Maroon & Emas Photostrip
 */
export function KlasikMaroonViewfinderOverlay({
  coupleText = 'Raden & Ayu',
  hashtagText = '#JawaEpicMoments',
}: {
  coupleText?: string;
  hashtagText?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between border-8 border-[#3E1210]">
      {/* Top Maroon Header with Golden Foliage */}
      <div className="bg-[#3E1210]/95 px-4 py-2.5 flex items-center justify-between text-amber-200 border-b border-amber-600/40 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-serif font-bold text-amber-200 tracking-wider">
            SUN FLOWER • JAWA EPIC
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
          BILIK BUDAYA
        </span>
      </div>

      {/* Bottom Maroon Footer with Celebration Signature */}
      <div className="bg-[#3E1210]/95 px-4 py-3 flex items-center justify-between text-amber-100 border-t border-amber-600/40 backdrop-blur-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 block">
            PAWIWAHAN AGENG
          </span>
          <span className="text-sm font-serif italic text-white font-medium">
            {coupleText}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-amber-300 block">
            {hashtagText}
          </span>
          <span className="text-[9px] text-amber-400/70">Weton Mataram</span>
        </div>
      </div>
    </div>
  );
}
