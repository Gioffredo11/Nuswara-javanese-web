import {
  drawWayangOnCanvas,
  drawGununganWatermarkOnCanvas,
  drawGoldenDustMotesOnCanvas,
  drawAwanMegamendungOnCanvas,
} from './WayangVectors';

export interface WayangPosterExportOptions {
  type: 'ORACLE' | 'MANIFESTATION';
  title: string;
  tagline?: string;
  badgeRightTop?: string;
  badgeRightMid?: string;
  badgeRightBot?: string;
  datePrimary?: string;
  dateSecondary?: string;
  characterSlug?: string;
  description: string;
  secondaryQuote?: string;
  modernInterpretation?: string;
  footerCta?: string;
  filename?: string;
}

/**
 * Intelligent whole-word canvas text wrapping.
 * Never cuts words in half (prevents awkward breaks like 'tekad la' / 'n karya').
 */
export function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 4,
  align: CanvasTextAlign = 'center'
): number {
  if (!text) return y;
  const words = text.trim().split(/\s+/);
  let line = '';
  let currentY = y;
  let lineCount = 0;

  ctx.textAlign = align;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + (line ? ' ' : '') + words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n];
      currentY += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1 && n < words.length - 1) {
        let truncatedLine = line;
        for (let k = n + 1; k < words.length; k++) {
          const testTrunc = truncatedLine + ' ' + words[k];
          if (ctx.measureText(testTrunc + '...').width <= maxWidth) {
            truncatedLine = testTrunc;
          } else {
            break;
          }
        }
        ctx.fillText(truncatedLine + '...', x, currentY);
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

/**
 * Draws decorative diamond floret
 */
function drawDiamond(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color = '#F59E0B') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx + size, cy);
  ctx.lineTo(cx, cy + size);
  ctx.lineTo(cx - size, cy);
  ctx.closePath();
  ctx.fill();
}

/**
 * Universal 1080x1920 Poster Card Canvas Renderer.
 * Produces pixel-perfect output exactly matching the on-screen WayangPosterCard.
 */
export async function exportWayangPosterCard(options: WayangPosterExportOptions): Promise<void> {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920; // 9:16 Instagram Story & TikTok Ultra-HD Resolution
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const normalizedSlug = (options.characterSlug || 'arjuna').toLowerCase().trim();

  // Normalize right badge lines
  const rTop = (options.badgeRightTop || (options.type === 'ORACLE' ? 'ORACLE' : 'PIWULANG')).toUpperCase();
  const rMid = (options.badgeRightMid || (options.type === 'ORACLE' ? 'WAYANG' : 'LUHUR')).toUpperCase();
  const rBot = (options.badgeRightBot || (options.type === 'ORACLE' ? 'NASIONAL' : 'JAWA')).toUpperCase();

  // Normalize left date lines
  const dPrimary = options.datePrimary || (options.type === 'ORACLE' ? 'Jumat Wage.' : '07 November.');
  const dSecondary = options.dateSecondary || (options.type === 'ORACLE' ? 'Neptu 10' : '2025');

  // Clean title: ensure period at end like in reference poster "Arjuna."
  const rawTitle = (options.title || 'Wayang').trim();
  const displayTitle = rawTitle.endsWith('.') ? rawTitle : `${rawTitle}.`;

  // 1. Rich dark tobacco/bronze radial gradient matching website batik theme
  const bgGrad = ctx.createRadialGradient(540, 580, 100, 540, 960, 1050);
  bgGrad.addColorStop(0, '#5A3114');
  bgGrad.addColorStop(0.35, '#3D1E0B');
  bgGrad.addColorStop(0.75, '#231005');
  bgGrad.addColorStop(1, '#150802');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle Batik Parang Texture Layer if available
  try {
    const batikImg = new Image();
    batikImg.src = '/images/batik-parang.png';
    if (batikImg.complete && batikImg.naturalWidth > 0) {
      ctx.save();
      ctx.globalAlpha = 0.15;
      const pattern = ctx.createPattern(batikImg, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    }
  } catch {
    // Graceful fallback without image
  }

  // 2. Double Golden Framing Borders
  ctx.strokeStyle = '#8C4D22';
  ctx.lineWidth = 14;
  ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 4;
  ctx.strokeRect(75, 75, canvas.width - 150, canvas.height - 150);

  // Delicate thin inner border
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(95, 95, canvas.width - 190, canvas.height - 190);

  // Corner diamond florets
  drawDiamond(ctx, 75, 75, 12);
  drawDiamond(ctx, canvas.width - 75, 75, 12);
  drawDiamond(ctx, 75, canvas.height - 75, 12);
  drawDiamond(ctx, canvas.width - 75, canvas.height - 75, 12);

  // 3. Cultural Ambient Layers
  await drawGununganWatermarkOnCanvas(ctx, canvas.width, canvas.height);
  drawAwanMegamendungOnCanvas(ctx);
  drawGoldenDustMotesOnCanvas(ctx);

  // 4. TOP BRANDING BAR: Redesigned authentic cultural header, removing @jawaepic
  ctx.fillStyle = 'rgba(229, 178, 96, 0.9)';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('NUSWARA', 115, 145);

  ctx.fillStyle = 'rgba(199, 168, 136, 0.85)';
  ctx.font = '20px serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ PIWULANG LUHUR ✦', 540, 145);

  ctx.fillStyle = 'rgba(199, 168, 136, 0.85)';
  ctx.font = '22px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('JAWA TENGAH', 965, 145);

  // Subtle separator line under top bar
  ctx.strokeStyle = 'rgba(229, 178, 96, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(115, 165);
  ctx.lineTo(965, 165);
  ctx.stroke();

  // 5. HERO TITLE & DUAL BADGES
  // Right Badge: Stacked 3 lines in bold serif caps
  ctx.textAlign = 'right';
  ctx.fillStyle = '#F5E5C9';
  ctx.font = 'bold 28px serif';
  ctx.fillText(rTop, 965, 230);
  ctx.fillText(rMid, 965, 268);
  ctx.fillText(rBot, 965, 306);

  // Hero Display Headline (left side, up to max width 620px to avoid right badge)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px serif';

  // Measure title to check if 1 line or 2 lines
  const titleMetrics = ctx.measureText(displayTitle);
  let titleEndY = 260;
  if (titleMetrics.width > 620) {
    ctx.font = 'bold 64px serif';
    titleEndY = wrapCanvasText(ctx, displayTitle, 115, 220, 620, 72, 2, 'left');
  } else {
    ctx.fillText(displayTitle, 115, 255);
    titleEndY = 265;
  }

  // Tagline below title
  if (options.tagline) {
    ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
    ctx.font = 'italic 30px serif';
    ctx.fillText(`“${options.tagline}”`, 115, titleEndY + 36);
  }

  // Left Mid Badge (Date / Weton / Neptu)
  const leftBadgeY = titleEndY + 85;
  ctx.font = 'bold 28px serif';
  ctx.fillStyle = '#FDE68A';
  ctx.fillText(dPrimary, 115, leftBadgeY);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(dSecondary, 115, leftBadgeY + 36);

  // Divider Line at y = 490
  ctx.strokeStyle = '#92400E';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(115, 490);
  ctx.lineTo(965, 490);
  ctx.stroke();

  // 6. CENTERPIECE: WARM HALO GLOW & HIGH-FIDELITY WAYANG FIGURE
  const circleGrad = ctx.createRadialGradient(540, 890, 50, 540, 890, 360);
  circleGrad.addColorStop(0, 'rgba(245, 158, 11, 0.32)');
  circleGrad.addColorStop(0.5, 'rgba(180, 83, 9, 0.12)');
  circleGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(540, 890, 360, 0, Math.PI * 2);
  ctx.fill();

  // Draw the exact matching character figure (height 720, width 480, centered at x=540)
  await drawWayangOnCanvas(ctx, normalizedSlug, 300, 560, 480, 720);

  // 7. BOTTOM SECTION: EDITORIAL NARRATIVE
  let currentBottomY = 1330;

  // Secondary Quote (e.g. original Javanese text)
  if (options.secondaryQuote) {
    ctx.fillStyle = '#FCD34D';
    ctx.font = 'italic 32px serif';
    ctx.textAlign = 'center';
    currentBottomY = wrapCanvasText(
      ctx,
      `“${options.secondaryQuote}”`,
      540,
      currentBottomY,
      820,
      42,
      2,
      'center'
    );
    currentBottomY += 15;
  }

  // Narrative Box
  const descBoxY = currentBottomY;
  const descBoxHeight = options.type === 'ORACLE' ? 240 : 210;

  ctx.fillStyle = 'rgba(28, 11, 4, 0.82)';
  ctx.fillRect(115, descBoxY, 850, descBoxHeight);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(115, descBoxY, 850, descBoxHeight);

  // Description text wrapped neatly inside the box
  ctx.fillStyle = '#FFF7ED';
  ctx.font = '26px sans-serif';
  wrapCanvasText(ctx, options.description, 540, descBoxY + 52, 790, 40, 4, 'center');

  // Modern Interpretation or Compatibility Advice
  const subTextY = descBoxY + descBoxHeight + 35;
  if (options.modernInterpretation) {
    ctx.fillStyle = '#FDE68A';
    ctx.font = 'italic 23px sans-serif';
    wrapCanvasText(ctx, options.modernInterpretation, 540, subTextY, 840, 32, 2, 'center');
  }

  // Delicate bottom diamond divider line
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(420, 1740);
  ctx.lineTo(660, 1740);
  ctx.stroke();
  drawDiamond(ctx, 540, 1740, 6);

  // Footer Social & Call to Action
  const footerCta =
    options.footerCta ||
    (options.type === 'ORACLE'
      ? 'Cek Wetonmu Sendiri di nuswara.id/oracle ↗'
      : 'NUSWARA • Manifestasi Harian Luhur Jawa ↗');

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(footerCta, 540, 1810);

  // 8. Trigger PNG Download
  const filename =
    options.filename ||
    (options.type === 'ORACLE'
      ? `Oracle_Story_9x16_${options.title}.png`
      : `Manifestasi_${options.title}.png`);

  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename;
  a.click();
}
