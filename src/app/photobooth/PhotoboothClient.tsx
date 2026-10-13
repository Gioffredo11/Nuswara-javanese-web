'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from '@/components/common/Link';
import {
  GununganSvg,
  GatotkacaSvg,
  SrikandiSvg,
  BatikKawungPatternSvg,
  BatikParangPatternSvg,
} from '@/components/ui/WayangVectors';
import {
  Camera,
  RotateCcw,
  Download,
  Share2,
  Check,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  drawJogloHouse,
  drawTumpalPattern,
  drawBotanicalLeaves,
  UkiranJeparaViewfinderOverlay,
  KlasikMaroonViewfinderOverlay,
  SugengAmbalWarsaViewfinderOverlay,
} from '@/components/ui/PhotoboothOverlays';

type FilterType = 'warm' | 'monochrome' | 'cyberpunk';
type FrameType =
  | 'gunungan'
  | 'pola-jawa'
  | 'companion-gatotkaca'
  | 'companion-srikandi'
  | 'ukiran-jepara'
  | 'klasik-maroon'
  | 'sugeng-ambal-warsa';

export function PhotoboothClient({ autoStart = false }: { autoStart?: boolean } = {}) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Snaps: array of up to 4 photos (dataURLs)
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  // Styling options
  const [activeFilter, setActiveFilter] = useState<FilterType>('warm');
  const [activeFrame, setActiveFrame] = useState<FrameType>('gunungan');
  const [customCoupleText, setCustomCoupleText] = useState('Raden & Ayu');
  const [customHashtagText, setCustomHashtagText] = useState('#NuswaraMoments');
  const [customWarsaName, setCustomWarsaName] = useState('Sang Sutresna');
  const [customWarsaGreeting, setCustomWarsaGreeting] = useState('Rahayu Widodo Lestari');

  // Strip rendering & sharing
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Camera
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser ini tidak mendukung akses kamera secara langsung.');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Izin kamera ditolak. Harap izinkan akses kamera di browsermu.');
      } else {
        setCameraError(err.message || 'Kamera belum terhubung atau tidak tersedia.');
      }
      setCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  useEffect(() => {
    if (autoStart) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [autoStart, startCamera]);

  // Filter CSS style mapping
  const getFilterStyle = (f: FilterType) => {
    switch (f) {
      case 'warm':
        return 'sepia(0.2) saturate(1.15) contrast(1.05) brightness(1.02)';
      case 'monochrome':
        return 'grayscale(1) contrast(1.3) brightness(0.95)';
      case 'cyberpunk':
        return 'contrast(1.25) hue-rotate(180deg) saturate(1.5) brightness(0.9)';
      default:
        return 'none';
    }
  };

  // Capture single photo from video element
  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Apply mirror flip for user selfie camera
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Apply filter on canvas
    ctx.filter = getFilterStyle(activeFilter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.9);
  }, [activeFilter]);

  // Automated 4-photo capture sequence
  const startCaptureSequence = async () => {
    if (photos.length >= 4) {
      setPhotos([]);
    }
    setIsCountingDown(true);

    const captured: string[] = [];

    for (let snapIndex = 0; snapIndex < 4; snapIndex++) {
      // Countdown 3, 2, 1
      for (let sec = 3; sec >= 1; sec--) {
        setCountdownNum(sec);
        await new Promise((r) => setTimeout(r, 900));
      }
      setCountdownNum(null);

      // Flash effect
      setFlash(true);
      const snap = capturePhoto();
      if (snap) {
        captured.push(snap);
        setPhotos([...captured]);
      }
      setTimeout(() => setFlash(false), 200);

      // Brief pause between snaps
      if (snapIndex < 3) {
        await new Promise((r) => setTimeout(r, 1200));
      }
    }

    setIsCountingDown(false);
  };

  // Sample photo generator for fallback if camera not available
  const loadDemoPhotos = () => {
    const demoSnaps = [
      generateDemoSnap('1. Salam Budaya'),
      generateDemoSnap('2. Pose Satria'),
      generateDemoSnap('3. Senyum Rama'),
      generateDemoSnap('4. Jaya Nusantara'),
    ];
    setPhotos(demoSnaps);
  };

  function generateDemoSnap(label: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.fillStyle = '#1C1917';
    ctx.fillRect(0, 0, 640, 480);
    ctx.strokeStyle = '#D4A373';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 600, 440);
    ctx.fillStyle = '#FAF7F0';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('JAWA EPIC PHOTO', 320, 220);
    ctx.font = '24px monospace';
    ctx.fillStyle = '#D4A373';
    ctx.fillText(label, 320, 280);
    return canvas.toDataURL('image/jpeg');
  }

function drawImageCover(
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

  // Generate 4-Cut Vertical Strip
  const generateStrip = useCallback(async () => {
    if (photos.length < 4) return;

    const stripCanvas = document.createElement('canvas');

    // Sugeng Ambal Warsa Celebration Frame (9:16 aspect ratio at 1152x2048)
    if (activeFrame === 'sugeng-ambal-warsa') {
      stripCanvas.width = 1152;
      stripCanvas.height = 2048;
      const ctx = stripCanvas.getContext('2d');
      if (!ctx) return;

      // Base warm parchment background
      ctx.fillStyle = '#EBDAC2';
      ctx.fillRect(0, 0, 1152, 2048);

      // Load Photo 1 (Main Portrait Window)
      const img1 = new Image();
      img1.src = photos[0];
      await new Promise((resolve) => {
        img1.onload = resolve;
        img1.onerror = resolve;
      });

      // Load Photo 2 (Tilted Accent Window)
      const img2 = new Image();
      img2.src = photos[1] || photos[0];
      await new Promise((resolve) => {
        img2.onload = resolve;
        img2.onerror = resolve;
      });

      // Load Sugeng Ambal Warsa Frame Overlay
      const frameImg = new Image();
      frameImg.src = '/frames/frame-sugeng-ambal-warsa.png';
      await new Promise((resolve) => {
        frameImg.onload = resolve;
        frameImg.onerror = resolve;
      });

      // Draw Photo 1 in Window 1 (Main vertical ornate frame)
      ctx.save();
      ctx.beginPath();
      ctx.rect(275, 435, 600, 790);
      ctx.clip();
      drawImageCover(ctx, img1, 275, 435, 600, 790);
      ctx.restore();

      // Draw Photo 2 in Window 2 (Tilted landscape ornate frame)
      ctx.save();
      ctx.translate(800, 1300);
      ctx.rotate((-2.5 * Math.PI) / 180);
      ctx.beginPath();
      ctx.rect(-240, -180, 480, 360);
      ctx.clip();
      drawImageCover(ctx, img2, -240, -180, 480, 360);
      ctx.restore();

      // Draw Frame PNG Overlay on top
      ctx.drawImage(frameImg, 0, 0, 1152, 2048);

      // Custom Typography Overlay in bottom maroon cloud
      ctx.save();
      ctx.textAlign = 'center';
      if (customWarsaName) {
        ctx.fillStyle = '#FEF3C7';
        ctx.font = 'bold 32px serif';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fillText(`✦ ${customWarsaName} ✦`, 576, 1935);
      }
      ctx.fillStyle = '#FDE68A';
      ctx.font = 'italic 24px serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 5;
      ctx.fillText(customWarsaGreeting || 'Rahayu Widodo Lestari', 576, 1975);

      const dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      ctx.fillStyle = '#E2D3B8';
      ctx.font = '16px monospace';
      ctx.fillText(dateStr, 576, 2008);
      ctx.restore();

      const stripData = stripCanvas.toDataURL('image/png');
      setStripUrl(stripData);
      return;
    }

    // Vertical 4-cut dimensions: 800 width x 2400 height
    stripCanvas.width = 800;
    stripCanvas.height = 2400;
    const ctx = stripCanvas.getContext('2d');
    if (!ctx) return;

    const photoWidth = 680;
    const photoHeight = 440;
    const startY = 170;
    const gap = 30;

    // Background based on active frame
    if (activeFrame === 'klasik-maroon') {
      ctx.fillStyle = '#3E1210'; // Deep royal maroon
    } else if (activeFilter === 'cyberpunk') {
      ctx.fillStyle = '#0F172A';
    } else {
      ctx.fillStyle = '#FAF7F0';
    }
    ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);

    // Frame outer border
    if (activeFrame === 'klasik-maroon') {
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, stripCanvas.width - 40, stripCanvas.height - 40);
    } else if (activeFrame === 'ukiran-jepara') {
      ctx.strokeStyle = '#8C522B';
      ctx.lineWidth = 8;
      ctx.strokeRect(25, 25, stripCanvas.width - 50, stripCanvas.height - 50);
    } else {
      ctx.strokeStyle = activeFilter === 'cyberpunk' ? '#38BDF8' : '#C85A32';
      ctx.lineWidth = 10;
      ctx.strokeRect(30, 30, stripCanvas.width - 60, stripCanvas.height - 60);
    }

    // Header Branding
    if (activeFrame === 'klasik-maroon') {
      drawBotanicalLeaves(ctx, 400, 75);
      ctx.fillStyle = '#FEF3C7';
      ctx.font = 'bold 30px serif';
      ctx.textAlign = 'center';
      ctx.fillText('SUN FLOWER • NUSWARA', 400, 105);
      ctx.font = 'italic 18px serif';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText('@nuswara.id  •  BILIK KENANGAN BUDAYA', 400, 135);
    } else if (activeFrame === 'ukiran-jepara') {
      ctx.fillStyle = '#29140A';
      ctx.font = 'bold 34px serif';
      ctx.textAlign = 'center';
      ctx.fillText('NUSWARA', 400, 95);
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#8C522B';
      ctx.fillText('UKIRAN JEPARA EDITION', 400, 125);
    } else {
      ctx.fillStyle = activeFilter === 'cyberpunk' ? '#E2E8F0' : '#1C1917';
      ctx.font = 'bold 34px serif';
      ctx.textAlign = 'center';
      ctx.fillText('NUSWARA', 400, 100);
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#78716C';
      ctx.fillText('DIGITAL CULTURE PHOTOBOOTH', 400, 130);
    }

    // Load Jepara frame overlay image if activeFrame === 'ukiran-jepara'
    let jeparaImg: HTMLImageElement | null = null;
    if (activeFrame === 'ukiran-jepara') {
      jeparaImg = new Image();
      jeparaImg.src = '/frames/frame-ukiran-jepara.png';
      await new Promise((resolve) => {
        jeparaImg!.onload = resolve;
        jeparaImg!.onerror = resolve;
      });
    }

    // Draw the 4 photos stacked vertically
    for (let i = 0; i < 4; i++) {
      const currentY = startY + i * (photoHeight + gap);

      // Load image
      const img = new Image();
      img.src = photos[i];
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      if (activeFrame === 'klasik-maroon') {
        // White matting around photo
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(52, currentY - 8, photoWidth + 16, photoHeight + 16);
        ctx.drawImage(img, 60, currentY, photoWidth, photoHeight);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3;
        ctx.strokeRect(60, currentY, photoWidth, photoHeight);
      } else {
        // Photo frame card
        ctx.drawImage(img, 60, currentY, photoWidth, photoHeight);

        // Inner photo thin border
        ctx.strokeStyle = activeFrame === 'ukiran-jepara' ? '#8C522B' : '#D4A373';
        ctx.lineWidth = 4;
        ctx.strokeRect(60, currentY, photoWidth, photoHeight);

        // If Jepara frame, overlay the carved wood ornament over each photo
        if (activeFrame === 'ukiran-jepara' && jeparaImg) {
          ctx.drawImage(jeparaImg, 60, currentY, photoWidth, photoHeight);
        }
      }

      // Frame specific overlays
      if (activeFrame === 'companion-gatotkaca' && i === 3) {
        ctx.fillStyle = 'rgba(200, 90, 50, 0.85)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('✦ GATOTKACA COMPANION', 720, currentY + photoHeight - 20);
      }
      if (activeFrame === 'companion-srikandi' && i === 3) {
        ctx.fillStyle = 'rgba(200, 90, 50, 0.85)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('✦ SRIKANDI COMPANION', 720, currentY + photoHeight - 20);
      }
    }

    // Bottom Branding, Stamp & QR Code
    const bottomY = startY + 4 * (photoHeight + gap) + 40;
    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (activeFrame === 'klasik-maroon') {
      // Golden Joglo houses flanking the signature
      drawJogloHouse(ctx, 45, bottomY - 30, 140, 140);
      drawJogloHouse(ctx, 615, bottomY - 30, 140, 140);

      // Center Wedding / Celebration Calligraphy & Signature
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FDE68A';
      ctx.font = '22px serif';
      ctx.fillText('The Celebration Of', 400, bottomY - 15);

      ctx.fillStyle = '#FFFBEB';
      ctx.font = 'bold italic 48px serif';
      ctx.fillText(customCoupleText || 'Raden & Ayu', 400, bottomY + 38);

      ctx.fillStyle = '#FDE68A';
      ctx.font = '20px serif';
      ctx.fillText(dateStr, 400, bottomY + 80);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 19px monospace';
      ctx.fillText(customHashtagText || '#NuswaraMoments', 400, bottomY + 115);

      // Bottom golden tumpal border across base
      drawTumpalPattern(ctx, 2345, 800, 40);
    } else {
      ctx.textAlign = 'left';
      ctx.fillStyle = activeFilter === 'cyberpunk' ? '#F8FAFC' : '#1C1917';
      ctx.font = 'bold 24px serif';
      ctx.fillText(`Solo & Mataram Edition`, 60, bottomY);

      ctx.fillStyle = '#78716C';
      ctx.font = '18px monospace';
      ctx.fillText(dateStr, 60, bottomY + 30);
      ctx.fillText(`Frame: ${activeFrame.toUpperCase()}`, 60, bottomY + 55);

      // Generate real QR code image for bottom right
      const dummyShortCode = Math.random().toString(36).substring(2, 10);
      const qrDataUrl = await QRCode.toDataURL(
        `${window.location.origin}/photobooth`,
        { width: 130, margin: 1 }
      );
      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
      });

      ctx.drawImage(qrImg, 610, bottomY - 35, 130, 130);
    }

    const stripData = stripCanvas.toDataURL('image/png');
    setStripUrl(stripData);
  }, [
    photos,
    activeFilter,
    activeFrame,
    customCoupleText,
    customHashtagText,
    customWarsaName,
    customWarsaGreeting,
  ]);

  useEffect(() => {
    if (photos.length === 4) {
      generateStrip();
    }
  }, [
    photos,
    activeFilter,
    activeFrame,
    customCoupleText,
    customHashtagText,
    customWarsaName,
    customWarsaGreeting,
    generateStrip,
  ]);

  // Handle Download Strip
  const handleDownloadStrip = () => {
    if (!stripUrl) return;
    const a = document.createElement('a');
    a.href = stripUrl;
    a.download = `Nuswara_Strip_${Date.now()}.png`;
    a.click();
  };

  // Handle Share Link creation
  const handleShareStrip = async () => {
    if (!stripUrl) return;
    setSharing(true);
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shareType: 'PHOTOBOOTH',
          title: `Photobooth 4-Cut Strip Jawa Epic`,
          snapshotData: {
            frame: activeFrame,
            filter: activeFilter,
            createdAt: new Date().toISOString(),
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShareCode(data.data.shortCode);
        const url = `${window.location.origin}/share/${data.data.shortCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Error saving share link:', err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] px-3 py-1 rounded-full border border-[#C59B53]/40">
          <Camera className="w-3.5 h-3.5 text-[#B99A60]" />
          <span>Web Photobooth 4-Cut</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-royal font-bold text-[#F0E6D4] tracking-tight">
          Bilik Foto Jawa Kontemporer
        </h2>
        <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed font-sans">
          Ambil 4 foto langsung dari kameramu. Pilih filter Warm Minimalist atau Batik Monochrome, gunakan bingkai Gunungan atau Ukiran Jepara, lalu unduh dan bagikan vertical strip karyamu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Camera & Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Viewfinder Frame */}
          <div className="relative aspect-[4/3] bg-stone-950 rounded-2xl overflow-hidden border-2 border-stone-800 shadow-md flex items-center justify-center">
            {/* White Flash overlay */}
            {flash && (
              <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none" />
            )}

            {/* Countdown Overlay */}
            {countdownNum && (
              <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                <span className="text-8xl font-serif font-bold text-amber-400 animate-ping">
                  {countdownNum}
                </span>
              </div>
            )}

            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ filter: getFilterStyle(activeFilter), transform: 'scaleX(-1)' }}
              className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
            />

            {/* Companion Silhouette Overlays on Viewfinder */}
            {activeFrame === 'companion-gatotkaca' && (
              <div className="absolute right-4 bottom-2 h-4/5 pointer-events-none opacity-85 z-20">
                <GatotkacaSvg className="h-full w-auto text-amber-400 drop-shadow-md" />
              </div>
            )}
            {activeFrame === 'companion-srikandi' && (
              <div className="absolute right-4 bottom-2 h-4/5 pointer-events-none opacity-85 z-20">
                <SrikandiSvg className="h-full w-auto text-amber-400 drop-shadow-md" />
              </div>
            )}
            {activeFrame === 'gunungan' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-16 pointer-events-none opacity-80 z-20">
                <GununganSvg className="h-full w-auto text-amber-400" />
              </div>
            )}
            {activeFrame === 'ukiran-jepara' && <UkiranJeparaViewfinderOverlay />}
            {activeFrame === 'klasik-maroon' && (
              <KlasikMaroonViewfinderOverlay
                coupleText={customCoupleText}
                hashtagText={customHashtagText}
              />
            )}
            {activeFrame === 'sugeng-ambal-warsa' && (
              <SugengAmbalWarsaViewfinderOverlay
                birthdayName={customWarsaName}
              />
            )}

            {/* Fallback Screen when camera is not ready */}
            {!cameraActive && (
              <div className="p-8 text-center space-y-4 max-w-sm">
                <Camera className="w-12 h-12 text-stone-600 mx-auto" />
                {cameraError ? (
                  <div className="space-y-2">
                    <p className="text-xs text-red-400 leading-relaxed font-sans">
                      {cameraError}
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-md"
                    >
                      Coba Sambungkan Ulang
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-stone-300">
                      Kamera bilik foto siap dinyalakan untuk mengambil 4-cut pose.
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Nyalakan Kamera</span>
                    </button>
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={loadDemoPhotos}
                    className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline"
                  >
                    Atau gunakan mode demo tanpa kamera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Trigger & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={startCaptureSequence}
                disabled={isCountingDown || (!cameraActive && photos.length === 0)}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-stone-50 font-medium text-xs rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>
                  {photos.length === 0 ? 'Mulai Ambil 4 Foto (3..2..1)' : 'Foto Ulang 4 Pose'}
                </span>
              </button>

              {photos.length > 0 && (
                <button
                  onClick={() => setPhotos([])}
                  className="p-3 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                  title="Reset Semua Foto"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-stone-500">
              {photos.length}/4 Foto Terambil
            </div>
          </div>

          {/* Filters & Frames Customization Box */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 shadow-sm">
            {/* Filter Picker */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                Pilih Nuansa Filter
              </span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveFilter('warm')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    activeFilter === 'warm'
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800'
                  }`}
                >
                  <span className="font-semibold block">Warm Minimal</span>
                  <span className="text-[10px] opacity-75">Bumi Mataram</span>
                </button>
                <button
                  onClick={() => setActiveFilter('monochrome')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    activeFilter === 'monochrome'
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800'
                  }`}
                >
                  <span className="font-semibold block">Batik B&W</span>
                  <span className="text-[10px] opacity-75">Kontras Klise</span>
                </button>
                <button
                  onClick={() => setActiveFilter('cyberpunk')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    activeFilter === 'cyberpunk'
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800'
                  }`}
                >
                  <span className="font-semibold block">Cyberpunk</span>
                  <span className="text-[10px] opacity-75">Neon Wayang</span>
                </button>
              </div>
            </div>

            {/* Frame Picker */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                Pilih Bingkai Budaya (Frame)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setActiveFrame('gunungan')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    activeFrame === 'gunungan'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  Gunungan Line
                </button>
                <button
                  onClick={() => setActiveFrame('pola-jawa')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    activeFrame === 'pola-jawa'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  Kawung-Parang
                </button>
                <button
                  onClick={() => setActiveFrame('companion-gatotkaca')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    activeFrame === 'companion-gatotkaca'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  Gatotkaca Pose
                </button>
                <button
                  onClick={() => setActiveFrame('companion-srikandi')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                    activeFrame === 'companion-srikandi'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  Srikandi Pose
                </button>
                <button
                  onClick={() => setActiveFrame('ukiran-jepara')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${
                    activeFrame === 'ukiran-jepara'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-600/30'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Ukiran Jepara</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1 py-0.5 rounded font-mono">NEW</span>
                </button>
                <button
                  onClick={() => setActiveFrame('klasik-maroon')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${
                    activeFrame === 'klasik-maroon'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-600/30'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Klasik Maroon</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1 py-0.5 rounded font-mono">NEW</span>
                </button>
                <button
                  onClick={() => setActiveFrame('sugeng-ambal-warsa')}
                  className={`p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${
                    activeFrame === 'sugeng-ambal-warsa'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-600/30'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Ambal Warsa</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1 py-0.5 rounded font-mono">NEW</span>
                </button>
              </div>

              {/* Customizer for Klasik Maroon */}
              {activeFrame === 'klasik-maroon' && (
                <div className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kustomisasi Teks Strip Klasik Maroon</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] text-stone-600 font-medium block mb-1">
                        Nama Pasangan / Tokoh
                      </label>
                      <input
                        type="text"
                        value={customCoupleText}
                        onChange={(e) => setCustomCoupleText(e.target.value)}
                        placeholder="e.g. Raden & Ayu / Mus'ab & Ega"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-stone-900 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 font-medium block mb-1">
                        Hashtag / Slogan Bawah
                      </label>
                      <input
                        type="text"
                        value={customHashtagText}
                        onChange={(e) => setCustomHashtagText(e.target.value)}
                        placeholder="e.g. #NuswaraMoments"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-stone-900 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Customizer for Sugeng Ambal Warsa */}
              {activeFrame === 'sugeng-ambal-warsa' && (
                <div className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kustomisasi Teks Sugeng Ambal Warsa</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] text-stone-600 font-medium block mb-1">
                        Nama yang Berulang Tahun
                      </label>
                      <input
                        type="text"
                        value={customWarsaName}
                        onChange={(e) => setCustomWarsaName(e.target.value)}
                        placeholder="e.g. Sang Sutresna / Raden Mas"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-stone-900 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 font-medium block mb-1">
                        Doa & Ucapan Rahayu
                      </label>
                      <input
                        type="text"
                        value={customWarsaGreeting}
                        onChange={(e) => setCustomWarsaGreeting(e.target.value)}
                        placeholder="e.g. Rahayu Widodo Lestari"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-stone-900 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 4-Cut Vertical Strip Preview & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
                Preview Photo Strip 4-Cut
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {activeFrame === 'sugeng-ambal-warsa' ? 'Format 9:16 Ambal Warsa' : 'Format 1:3 Vertikal'}
              </span>
            </div>

            {/* Strip Preview Container */}
            <div className="flex justify-center bg-[#F4EEE2] p-4 rounded-xl border border-stone-300/80 min-h-[460px] items-center">
              {stripUrl ? (
                <img
                  src={stripUrl}
                  alt="Hasil 4-Cut Photo Strip"
                  className="max-h-[520px] w-auto rounded-lg shadow-md border border-stone-300"
                />
              ) : photos.length > 0 ? (
                /* Snaps in progress */
                <div className="space-y-2 w-48">
                  {photos.map((p, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded border border-stone-400 overflow-hidden"
                    >
                      <img src={p} alt={`Snap ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {Array.from({ length: 4 - photos.length }).map((_, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded border border-dashed border-stone-300 flex items-center justify-center text-[10px] text-stone-400 font-mono"
                    >
                      Pose #{photos.length + idx + 1}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 space-y-2 text-stone-400">
                  <GununganSvg className="w-10 h-14 mx-auto text-stone-300" />
                  <p className="text-xs">
                    Tekan &ldquo;Mulai Ambil 4 Foto&rdquo; untuk merangkai strip fotomu.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {stripUrl && (
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleDownloadStrip}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Strip (PNG Resolusi Tinggi)</span>
                </button>

                <button
                  onClick={handleShareStrip}
                  disabled={sharing}
                  className="w-full py-3 bg-white hover:bg-stone-100 text-stone-800 text-xs font-medium border border-stone-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Tautan Berbagi Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-stone-600" />
                      <span>{sharing ? 'Membuat Tautan...' : 'Simpan & Dapatkan Tautan Share'}</span>
                    </>
                  )}
                </button>

                {shareCode && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center text-xs">
                    <span className="font-mono text-stone-500 text-[11px] block">
                      Kode Share Publik:
                    </span>
                    <Link
                      href={`/share/${shareCode}`}
                      className="font-mono font-bold text-amber-900 underline mt-0.5 block"
                    >
                      nuswara.id/share/{shareCode}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
