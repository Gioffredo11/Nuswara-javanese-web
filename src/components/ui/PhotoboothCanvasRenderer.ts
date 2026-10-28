/**
 * Photobooth Canvas 2D Renderer for Nusantara Cultural 4-Cut Strip
 *
 * Renders high-resolution 800x2400 vertical photo strips (1:3 aspect ratio)
 * with authentic Javanese vector ornaments, margins, headers, and footers.
 * 100% Vector Canvas 2D paths — Zero CORS tainting risk, exportable to high-res PNG.
 */

import { PhotoboothCulturalFrame, getFrameById } from '@/data/photoboothFrames';
import QRCode from 'qrcode';

export interface RenderStripOptions {
  photos: string[];
  frameId: string;
  filterId?: string;
  customText?: string;
  customSubtext?: string;
}

/**
 * Utility: Crop and draw image into target rectangle maintaining aspect ratio (cover)
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let sWidth = img.width;
  let sHeight = img.height;
  let sx = 0;
  let sy = 0;

  if (imgRatio > targetRatio) {
    sWidth = img.height * targetRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    sHeight = img.width / targetRatio;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

/**
 * Draw decorative corner flourishes at (x, y)
 */
function drawCornerFlourish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotationRad: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotationRad);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  // Inner arc
  ctx.beginPath();
  ctx.arc(size * 0.45, size * 0.45, size * 0.35, Math.PI, 1.5 * Math.PI, false);
  ctx.stroke();

  // Corner dot
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size * 0.35, size * 0.35, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draw Parang blade wave on Canvas
 */
function drawParangMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  accentColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = accentColor;
  ctx.lineWidth = 2;

  const count = Math.floor(height / 45);
  for (let i = 0; i < count; i++) {
    const curY = y + i * 45;
    ctx.beginPath();
    ctx.moveTo(x + 5, curY + 35);
    ctx.quadraticCurveTo(x + width * 0.5, curY + 20, x + width - 8, curY + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + width * 0.4, curY + 22, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Kawung interlocking circles on Canvas margin
 */
function drawKawungMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  centerColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = centerColor;
  ctx.lineWidth = 1.8;

  const count = Math.floor(height / 48);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 24 + i * 48;

    // 4 petals
    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, 6, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy + 10, 6, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx - 10, cy, 10, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 10, cy, 10, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Truntum starflowers on Canvas margin
 */
function drawTruntumMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  accentColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = accentColor;
  ctx.lineWidth = 1.6;

  const count = Math.floor(height / 50);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 25 + i * 50;
    const r = 12;

    // 8 rays
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx, cy + r);
    ctx.moveTo(cx - r * 0.7, cy - r * 0.7);
    ctx.lineTo(cx + r * 0.7, cy + r * 0.7);
    ctx.moveTo(cx - r * 0.7, cy + r * 0.7);
    ctx.lineTo(cx + r * 0.7, cy - r * 0.7);
    ctx.stroke();

    // Central jasmine dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // 4 tip dots
    ctx.beginPath();
    ctx.arc(cx, cy - r - 2, 1.8, 0, Math.PI * 2);
    ctx.arc(cx, cy + r + 2, 1.8, 0, Math.PI * 2);
    ctx.arc(cx - r - 2, cy, 1.8, 0, Math.PI * 2);
    ctx.arc(cx + r + 2, cy, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Jepara carved wood acanthus columns on margins
 */
function drawGebyokMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  const count = Math.floor(height / 60);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 30 + i * 60;

    // Acanthus leaf curve
    ctx.beginPath();
    ctx.moveTo(cx - 14, cy + 20);
    ctx.quadraticCurveTo(cx - 18, cy, cx, cy - 15);
    ctx.quadraticCurveTo(cx + 18, cy, cx + 14, cy + 20);
    ctx.stroke();

    ctx.strokeStyle = goldColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = goldColor;
    ctx.fill();

    ctx.strokeStyle = color;
  }
  ctx.restore();
}

/**
 * Draw Lung-Lungan winding vine tendrils
 */
function drawLungLunganMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.fillStyle = color;

  const count = Math.floor(height / 65);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 32 + i * 65;
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy + 25);
    ctx.bezierCurveTo(cx - 20, cy + 5, cx + 20, cy - 5, cx + 12, cy - 25);
    ctx.stroke();

    // Curled tendril fern
    ctx.beginPath();
    ctx.arc(cx + 8, cy - 12, 5, 0, Math.PI * 1.5, false);
    ctx.stroke();

    // Sprouting bud
    ctx.beginPath();
    ctx.ellipse(cx - 8, cy + 10, 4, 7, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draw Gunungan Wayang flame & mountain silhouette
 */
function drawGununganPeak(
  ctx: CanvasRenderingContext2D,
  cx: number,
  topY: number,
  width: number,
  height: number,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.4;

  // Outer Gunungan Arch
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  ctx.bezierCurveTo(cx - width * 0.35, topY + height * 0.35, cx - width * 0.5, topY + height * 0.8, cx - width * 0.45, topY + height);
  ctx.lineTo(cx + width * 0.45, topY + height);
  ctx.bezierCurveTo(cx + width * 0.5, topY + height * 0.8, cx + width * 0.35, topY + height * 0.35, cx, topY);
  ctx.stroke();

  // Spire / Sungu puncak
  ctx.beginPath();
  ctx.moveTo(cx, topY - 14);
  ctx.lineTo(cx, topY + 18);
  ctx.stroke();
  ctx.fillStyle = goldColor;
  ctx.beginPath();
  ctx.arc(cx, topY - 14, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Kalpataru Central Trunk
  ctx.beginPath();
  ctx.moveTo(cx, topY + height);
  ctx.lineTo(cx, topY + height * 0.35);
  ctx.stroke();

  // Branches
  ctx.beginPath();
  ctx.moveTo(cx, topY + height * 0.65);
  ctx.quadraticCurveTo(cx - 35, topY + height * 0.55, cx - 45, topY + height * 0.4);
  ctx.moveTo(cx, topY + height * 0.65);
  ctx.quadraticCurveTo(cx + 35, topY + height * 0.55, cx + 45, topY + height * 0.4);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Sido Mukti diamond wajik grid
 */
function drawSidoMuktiMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.fillStyle = goldColor;

  const count = Math.floor(height / 52);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 26 + i * 52;
    const w = 15;
    const h = 20;

    // Diamond lozenge
    ctx.beginPath();
    ctx.moveTo(cx, cy - h);
    ctx.lineTo(cx + w, cy);
    ctx.lineTo(cx, cy + h);
    ctx.lineTo(cx - w, cy);
    ctx.closePath();
    ctx.stroke();

    // Inner Gurda Winglet dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Wing marks
    ctx.strokeStyle = goldColor;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy);
    ctx.lineTo(cx - 3, cy - 5);
    ctx.moveTo(cx + 8, cy);
    ctx.lineTo(cx + 3, cy - 5);
    ctx.stroke();
    ctx.strokeStyle = color;
  }
  ctx.restore();
}

/**
 * Draw Mega Mendung cloud waves on margin rails
 */
function drawMegaMendungMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  blueColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = blueColor;
  ctx.lineWidth = 2;

  const count = Math.floor(height / 55);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 27 + i * 55;

    // Outer cloud curl
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy + 12);
    ctx.bezierCurveTo(cx - 20, cy - 5, cx - 8, cy - 18, cx, cy - 10);
    ctx.bezierCurveTo(cx + 8, cy - 18, cx + 20, cy - 5, cx + 15, cy + 12);
    ctx.stroke();

    // Inner gold cloud tier
    ctx.strokeStyle = goldColor;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy + 8);
    ctx.quadraticCurveTo(cx, cy - 4, cx + 8, cy + 8);
    ctx.stroke();
    ctx.strokeStyle = blueColor;
  }
  ctx.restore();
}

/**
 * Draw Sekar Jagad mosaic lozenges on margin rails
 */
function drawSekarJagadMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  amberColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = amberColor;
  ctx.lineWidth = 1.8;
  const count = Math.floor(height / 56);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 28 + i * 56;

    // Organic flower island
    ctx.beginPath();
    ctx.arc(cx - 6, cy - 6, 7, 0, Math.PI * 2);
    ctx.arc(cx + 6, cy + 6, 7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Semen Rama triloka & Meru on margin rails
 */
function drawSemenRamaMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  amberColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 1.8;
  const count = Math.floor(height / 60);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 30 + i * 60;

    // Sacred Meru Peak (triangle tiers)
    ctx.beginPath();
    ctx.moveTo(cx, cy - 16);
    ctx.lineTo(cx + 12, cy + 6);
    ctx.lineTo(cx - 12, cy + 6);
    ctx.closePath();
    ctx.stroke();

    // Sprouting vine bud (semi)
    ctx.strokeStyle = amberColor;
    ctx.beginPath();
    ctx.arc(cx, cy + 12, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = goldColor;
  }
  ctx.restore();
}

/**
 * Draw Surya Majapahit radiant 8-pointed sun crest
 */
function drawSuryaMajapahitPeak(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  goldColor: string,
  crimsonColor: string
) {
  ctx.save();
  // Central Solar disc
  ctx.fillStyle = goldColor;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = crimsonColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 8 Main Rays
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  for (let a = 0; a < 8; a++) {
    const rad = (a * Math.PI) / 4;
    const x1 = cx + Math.cos(rad) * (radius * 0.55);
    const y1 = cy + Math.sin(rad) * (radius * 0.55);
    const x2 = cx + Math.cos(rad) * (radius * 1.05);
    const y2 = cy + Math.sin(rad) * (radius * 1.05);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Ray finial dot
    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Alas-Alasan forest fauna and flora on margin rails
 */
function drawAlasAlasanMotif(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  sageColor: string,
  goldColor: string
) {
  ctx.save();
  ctx.strokeStyle = sageColor;
  ctx.lineWidth = 2;
  const count = Math.floor(height / 60);
  const cx = x + width / 2;

  for (let i = 0; i < count; i++) {
    const cy = y + 30 + i * 60;

    // Stylized deer horn / peacock crest
    ctx.beginPath();
    ctx.moveTo(cx, cy + 18);
    ctx.lineTo(cx, cy - 6);
    ctx.lineTo(cx - 10, cy - 16);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx + 10, cy - 16);
    ctx.stroke();

    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(cx, cy + 4, 3, 0, Math.PI * 2);
    ctx.arc(cx - 10, cy - 16, 2, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 16, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Draw Traditional Golden Tumpal band at bottom
 */
function drawTumpalBand(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  height: number,
  color: string,
  fillColor: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = 1.8;

  const triangleW = 25;
  const count = Math.ceil(width / triangleW);

  for (let i = 0; i < count; i++) {
    const sx = i * triangleW;
    ctx.beginPath();
    ctx.moveTo(sx, y + height);
    ctx.lineTo(sx + triangleW / 2, y);
    ctx.lineTo(sx + triangleW, y + height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  ctx.restore();
}

/**
 * MAIN GENERATE STRIP FUNCTION
 * Builds the complete 800 x 2400 high-res photobooth vertical strip canvas
 */
export async function renderPhotoboothStripCanvas(
  stripCanvas: HTMLCanvasElement,
  options: RenderStripOptions
): Promise<string> {
  const { photos, frameId, customText, customSubtext } = options;
  const frame = getFrameById(frameId);

  // Set vertical 4-cut canvas dimensions: 800w x 2400h (Format 1:3)
  stripCanvas.width = 800;
  stripCanvas.height = 2400;
  const ctx = stripCanvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  const photoWidth = 680;
  const photoHeight = 440;
  const photoStartX = 60;
  const startY = 170;
  const gap = 30;

  // 1. FILL BASE BACKGROUND
  ctx.fillStyle = frame.palette.background;
  ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);

  // 2. DRAW SIDE MARGIN MOTIF RAILS (Without touching the 680x440 photo area!)
  // Left margin: X: 0..58 | Right margin: X: 742..800
  const marginW = 46;
  const railLeftX = 7;
  const railRightX = 747;
  const railY = 170;
  const railH = 1850;

  if (frame.id === 'parang-kencana') {
    drawParangMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
    drawParangMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
  } else if (frame.id === 'kawung-sari') {
    drawKawungMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.borderInner);
    drawKawungMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.borderInner);
  } else if (frame.id === 'truntum-kencana') {
    drawTruntumMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawTruntumMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'ukiran-gebyok') {
    drawGebyokMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawGebyokMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'lung-lungan') {
    drawLungLunganMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
    drawLungLunganMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
  } else if (frame.id === 'gunungan-agung') {
    drawParangMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
    drawParangMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
  } else if (frame.id === 'sido-mukti') {
    drawSidoMuktiMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawSidoMuktiMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'mega-mendung') {
    drawMegaMendungMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
    drawMegaMendungMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderInner, frame.palette.accentGold);
  } else if (frame.id === 'sekar-jagad') {
    drawSekarJagadMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawSekarJagadMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'semen-rama') {
    drawSemenRamaMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawSemenRamaMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'surya-majapahit') {
    drawSidoMuktiMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawSidoMuktiMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  } else if (frame.id === 'alas-alasan') {
    drawAlasAlasanMotif(ctx, railLeftX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
    drawAlasAlasanMotif(ctx, railRightX, railY, marginW, railH, frame.palette.borderOuter, frame.palette.accentGold);
  }

  // 3. OUTER BORDER & CORNER ACCENTS
  ctx.strokeStyle = frame.palette.borderOuter;
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, stripCanvas.width - 36, stripCanvas.height - 36);

  ctx.strokeStyle = frame.palette.borderInner;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(25, 25, stripCanvas.width - 50, stripCanvas.height - 50);

  // Corner flourishes
  const cornerSize = 28;
  drawCornerFlourish(ctx, 28, 28, cornerSize, 0, frame.palette.accentGold);
  drawCornerFlourish(ctx, stripCanvas.width - 28, 28, cornerSize, Math.PI / 2, frame.palette.accentGold);
  drawCornerFlourish(ctx, stripCanvas.width - 28, stripCanvas.height - 28, cornerSize, Math.PI, frame.palette.accentGold);
  drawCornerFlourish(ctx, 28, stripCanvas.height - 28, cornerSize, -Math.PI / 2, frame.palette.accentGold);

  // 4. HEADER BRANDING & MOTIF CROWN
  ctx.textAlign = 'center';

  if (frame.id === 'gunungan-agung') {
    drawGununganPeak(ctx, 400, 28, 110, 68, frame.palette.accentGold);
    ctx.fillStyle = frame.palette.textPrimary;
    ctx.font = 'bold 32px serif';
    ctx.fillText('NUSWARA', 400, 122);
    ctx.fillStyle = frame.palette.accentGold;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('✦ EDISI GUNUNGAN WAYANG AGUNG ✦', 400, 146);
  } else if (frame.id === 'surya-majapahit') {
    drawSuryaMajapahitPeak(ctx, 400, 52, 28, frame.palette.accentGold, frame.palette.borderOuter);
    ctx.fillStyle = frame.palette.textPrimary;
    ctx.font = 'bold 34px serif';
    ctx.fillText('NUSWARA', 400, 112);
    ctx.fillStyle = frame.palette.accentGold;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('✦ SURYA MAJAPAHIT KENCANA ✦', 400, 138);
  } else if (frame.id === 'ukiran-gebyok') {
    ctx.fillStyle = frame.palette.textPrimary;
    ctx.font = 'bold 32px serif';
    ctx.fillText('NUSWARA', 400, 85);
    ctx.fillStyle = frame.palette.accentGold;
    ctx.font = 'bold 16px serif';
    ctx.fillText('GAPURA GEBYOK JEPARA EDITION', 400, 114);
    ctx.font = 'italic 13px serif';
    ctx.fillStyle = frame.palette.textSecondary;
    ctx.fillText('Kriya Seni Kayu Jati Adiluhung Jawa Tengah', 400, 138);
  } else {
    // Elegant standard cultural header
    ctx.fillStyle = frame.palette.accentGold;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('✦ BILIK BUDAYA NUSWANTARA ✦', 400, 62);

    ctx.fillStyle = frame.palette.textPrimary;
    ctx.font = 'bold 36px serif';
    ctx.fillText('NUSWARA', 400, 102);

    ctx.fillStyle = frame.palette.accentGold;
    ctx.font = 'bold 15px monospace';
    ctx.fillText(`✦ EDISI ${frame.name.toUpperCase()} ✦`, 400, 132);
  }

  // 5. DRAW THE 4 PHOTOS
  for (let i = 0; i < 4; i++) {
    const currentY = startY + i * (photoHeight + gap);

    // Photo card matting background
    ctx.fillStyle = frame.palette.cardBg;
    ctx.fillRect(photoStartX - 4, currentY - 4, photoWidth + 8, photoHeight + 8);

    // If photo exists, draw it; otherwise draw elegant placeholder
    if (photos[i]) {
      const img = new Image();
      img.src = photos[i];
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
      drawImageCover(ctx, img, photoStartX, currentY, photoWidth, photoHeight);
    } else {
      // Clean cultural placeholder slot
      ctx.fillStyle = frame.palette.background;
      ctx.fillRect(photoStartX, currentY, photoWidth, photoHeight);
      ctx.fillStyle = frame.palette.textSecondary;
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`POSE #${i + 1}`, photoStartX + photoWidth / 2, currentY + photoHeight / 2);
    }

    // Photo border frame stroke (Does not cover photo content, sets sharp inner outline)
    ctx.strokeStyle = frame.palette.borderInner;
    ctx.lineWidth = 3.5;
    ctx.strokeRect(photoStartX, currentY, photoWidth, photoHeight);

    // Tiny corner tick marks on photo
    ctx.strokeStyle = frame.palette.accentGold;
    ctx.lineWidth = 2;
    const tick = 12;
    ctx.beginPath();
    ctx.moveTo(photoStartX + tick, currentY);
    ctx.lineTo(photoStartX, currentY);
    ctx.lineTo(photoStartX, currentY + tick);
    ctx.moveTo(photoStartX + photoWidth - tick, currentY);
    ctx.lineTo(photoStartX + photoWidth, currentY);
    ctx.lineTo(photoStartX + photoWidth, currentY + tick);
    ctx.moveTo(photoStartX, currentY + photoHeight - tick);
    ctx.lineTo(photoStartX, currentY + photoHeight);
    ctx.lineTo(photoStartX + tick, currentY + photoHeight);
    ctx.moveTo(photoStartX + photoWidth - tick, currentY + photoHeight);
    ctx.lineTo(photoStartX + photoWidth, currentY + photoHeight);
    ctx.lineTo(photoStartX + photoWidth, currentY + photoHeight - tick);
    ctx.stroke();

    // Horizontal separator between photos
    if (i < 3) {
      const sepY = currentY + photoHeight + gap / 2;
      ctx.strokeStyle = frame.palette.borderInner;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(120, sepY);
      ctx.lineTo(370, sepY);
      ctx.moveTo(430, sepY);
      ctx.lineTo(680, sepY);
      ctx.stroke();

      ctx.fillStyle = frame.palette.accentGold;
      ctx.font = 'bold 13px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦ ❖ ✦', 400, sepY + 4);
    }
  }

  // 6. FOOTER BRANDING, PHILOSOPHY, DATE & QR CODE
  const bottomY = startY + 4 * (photoHeight + gap) + 40;
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Left column information
  ctx.textAlign = 'left';
  ctx.fillStyle = frame.palette.accentGold;
  ctx.font = 'bold 14px monospace';
  ctx.fillText('NUSWARA • BILIK BUDAYA JAWA', 60, bottomY - 10);

  ctx.fillStyle = frame.palette.textPrimary;
  ctx.font = 'bold 26px serif';
  const displayTitle = customText?.trim() ? customText : frame.javaneseName;
  ctx.fillText(displayTitle, 60, bottomY + 26);

  ctx.fillStyle = frame.palette.textSecondary;
  ctx.font = 'italic 16px serif';
  const displaySubtext = customSubtext?.trim()
    ? customSubtext
    : `"${frame.philosophy}"`;

  // Wrap philosophy text if long
  const maxPhilosophyWidth = 490;
  const words = displaySubtext.split(' ');
  let line = '';
  let lineY = bottomY + 58;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxPhilosophyWidth && n > 0) {
      ctx.fillText(line, 60, lineY);
      line = words[n] + ' ';
      lineY += 22;
      if (lineY > bottomY + 115) break; // Keep within footer bounds
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, lineY);

  // Date and Origin footer tags
  ctx.fillStyle = frame.palette.accentGold;
  ctx.font = '13px monospace';
  ctx.fillText(`🗓️ ${dateStr}  •  📍 ${frame.origin}`, 60, bottomY + 150);

  // QR CODE BOX ON BOTTOM RIGHT
  const qrBoxX = 595;
  const qrBoxY = bottomY - 20;
  const qrBoxW = 145;
  const qrBoxH = 175;

  // Dedicated QR card background so QR code is guaranteed high contrast
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);
  ctx.strokeStyle = frame.palette.borderOuter;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);

  // Generate QR code safely to dataURL
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nuswara.id';
    const qrDataUrl = await QRCode.toDataURL(`${origin}/photobooth`, {
      width: 125,
      margin: 1,
      color: {
        dark: '#1A110B',
        light: '#FFFFFF',
      },
    });

    const qrImg = new Image();
    qrImg.src = qrDataUrl;
    await new Promise((resolve) => {
      qrImg.onload = resolve;
      qrImg.onerror = resolve;
    });

    ctx.drawImage(qrImg, qrBoxX + 10, qrBoxY + 10, 125, 125);

    // QR Caption
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1A110B';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('SCAN FOR PHOTO', qrBoxX + qrBoxW / 2, qrBoxY + 148);
    ctx.fillStyle = '#78716C';
    ctx.font = '8px monospace';
    ctx.fillText('nuswara.id', qrBoxX + qrBoxW / 2, qrBoxY + 162);
  } catch (err) {
    console.warn('QR code generation fallback:', err);
  }

  // 7. BOTTOM TUMPAL / GEOMETRIC BANNER
  drawTumpalBand(
    ctx,
    stripCanvas.height - 48,
    stripCanvas.width,
    26,
    frame.palette.borderInner,
    frame.palette.badgeBg
  );

  return stripCanvas.toDataURL('image/png');
}
