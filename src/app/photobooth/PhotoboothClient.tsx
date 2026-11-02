'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from '@/components/common/Link';
import {
  Camera,
  RotateCcw,
  Download,
  Share2,
  Check,
  RefreshCw,
  Sliders,
  Image as ImageIcon,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  CULTURAL_FRAMES,
  FrameId,
  CulturalCategory,
  getFrameById,
} from '@/data/photoboothFrames';
import { renderPhotoboothStripCanvas } from '@/components/ui/PhotoboothCanvasRenderer';
import { PhotoboothStripPreview } from '@/components/ui/PhotoboothStripPreview';
import { JavaneseViewfinderOverlay } from '@/components/ui/PhotoboothOverlays';

type FilterType = 'warm' | 'sepia' | 'monochrome';
type FrameType = FrameId;

const FRAME_ORIGIN_SHORT: Record<FrameId, string> = {
  'parang-kencana': 'SURAKARTA',
  'kawung-sari': 'MATARAM',
  'truntum-kencana': 'SOLO',
  'ukiran-gebyok': 'JEPARA',
  'lung-lungan': 'KLASIK JAWA',
  'gunungan-agung': 'WAYANG',
  'sido-mukti': 'SURAKARTA',
  'mega-mendung': 'CIREBON',
  'sekar-jagad': 'PEKALONGAN',
  'semen-rama': 'YOGYAKARTA',
  'surya-majapahit': 'MAJAPAHIT',
  'alas-alasan': 'MANGKUNEGARAN',
};

const CATEGORY_TABS: { id: CulturalCategory; label: string }[] = [
  { id: 'semua', label: 'Semua Corak' },
  { id: 'keraton-mataram', label: 'Keraton' },
  { id: 'geometri-klasik', label: 'Geometri' },
  { id: 'kriya-arsitektur', label: 'Kriya' },
  { id: 'alam-pesisir', label: 'Alam' },
];

export function PhotoboothClient({ autoStart = false }: { autoStart?: boolean } = {}) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Snaps: array of up to 4 photos (dataURLs)
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  // Styling options (12 authentic Javanese cultural frames)
  const [activeFilter, setActiveFilter] = useState<FilterType>('warm');
  const [activeFrame, setActiveFrame] = useState<FrameType>('parang-kencana');
  const [selectedCategory, setSelectedCategory] = useState<CulturalCategory>('semua');
  const [customTitle, setCustomTitle] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Strip rendering & sharing
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFrame = getFrameById(activeFrame);

  // Filter frames based on selected category
  const filteredFrames = useMemo(() => {
    if (selectedCategory === 'semua') return CULTURAL_FRAMES;
    return CULTURAL_FRAMES.filter((f) => f.category === selectedCategory);
  }, [selectedCategory]);

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
  }, [autoStart, startCamera, stream]);

  // Filter CSS style computation (Warm natural tones, preserving Indonesian skin tones)
  const getFilterStyle = (filter: FilterType): string => {
    switch (filter) {
      case 'warm':
        return 'sepia(0.2) saturate(1.15) contrast(1.05) brightness(1.02)';
      case 'sepia':
        return 'sepia(0.55) contrast(1.1) brightness(0.98) saturate(1.08)';
      case 'monochrome':
        return 'grayscale(1) contrast(1.22) brightness(0.96)';
      default:
        return 'none';
    }
  };

  // Capture single snapshot from camera
  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = streamCanvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.filter = getFilterStyle(activeFilter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    return canvas.toDataURL('image/jpeg', 0.92);
  }, [activeFilter]);

  // Trigger flash visual effect
  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  // Countdown timer helper
  const runCountdown = (seconds: number): Promise<void> => {
    return new Promise((resolve) => {
      let current = seconds;
      setCountdownNum(current);
      const timer = setInterval(() => {
        current -= 1;
        if (current <= 0) {
          clearInterval(timer);
          setCountdownNum(null);
          resolve();
        } else {
          setCountdownNum(current);
        }
      }, 1000);
    });
  };

  // Take a single snap with 3s countdown
  const handleTakeSnap = async () => {
    if (photos.length >= 4 || isCountingDown) return;
    setIsCountingDown(true);
    await runCountdown(3);
    triggerFlash();
    const snap = capturePhoto();
    if (snap) {
      setPhotos((prev) => [...prev, snap]);
    }
    setIsCountingDown(false);
  };

  // Take 4 snaps consecutively in burst mode
  const handleTakeFourBurst = async () => {
    if (photos.length >= 4 || isCountingDown) return;
    setIsCountingDown(true);
    setPhotos([]);

    const newSnaps: string[] = [];
    for (let i = 0; i < 4; i++) {
      await runCountdown(3);
      triggerFlash();
      const snap = capturePhoto();
      if (snap) {
        newSnaps.push(snap);
        setPhotos([...newSnaps]);
      }
      if (i < 3) {
        await new Promise((r) => setTimeout(r, 800));
      }
    }
    setIsCountingDown(false);
  };

  // Handle manual photo upload fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - photos.length;
    const filesToRead = Array.from(files).slice(0, remainingSlots);

    filesToRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          setPhotos((prev) => {
            if (prev.length >= 4) return prev;
            return [...prev, loadEvent.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Reset photos
  const handleRetake = () => {
    setPhotos([]);
    setStripUrl(null);
    setShareCode(null);
    setCopied(false);
  };

  // Load demo snaps if user doesn't have camera or image files
  const loadDemoSnaps = () => {
    const demoSnaps = [
      generateDemoSnap('POSE 01: SIKAP ANORAGA'),
      generateDemoSnap('POSE 02: SEMBAH TAPA'),
      generateDemoSnap('POSE 03: KERIS TAYUHAN'),
      generateDemoSnap('POSE 04: RAHAYU LESTARI'),
    ];
    setPhotos(demoSnaps);
  };

  function generateDemoSnap(label: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.fillStyle = '#14110E';
    ctx.fillRect(0, 0, 640, 480);
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 600, 440);
    ctx.fillStyle = '#F4EFE6';
    ctx.font = 'bold 32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('NUSWARA BILIK FOTO', 320, 220);
    ctx.font = '18px monospace';
    ctx.fillStyle = '#C5A059';
    ctx.fillText(label, 320, 280);
    return canvas.toDataURL('image/jpeg');
  }

  // Generate 4-Cut Vertical Strip (1:3 format at 800 x 2400)
  const generateStrip = useCallback(async () => {
    if (photos.length < 4) return;
    const stripCanvas = document.createElement('canvas');
    try {
      const stripData = await renderPhotoboothStripCanvas(stripCanvas, {
        photos,
        frameId: activeFrame,
        filterId: activeFilter,
        customText: customTitle,
        customSubtext: customMessage,
      });
      setStripUrl(stripData);
    } catch (err) {
      console.error('Error generating photo strip canvas:', err);
    }
  }, [photos, activeFilter, activeFrame, customTitle, customMessage]);

  useEffect(() => {
    if (photos.length === 4) {
      generateStrip();
    }
  }, [photos, activeFilter, activeFrame, customTitle, customMessage, generateStrip]);

  // Handle Download Strip (PNG high-resolution)
  const handleDownloadStrip = () => {
    if (!stripUrl) return;
    const a = document.createElement('a');
    a.href = stripUrl;
    a.download = `Nuswara_Strip_${activeFrame}_${Date.now()}.png`;
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
          title: `Photobooth 4-Cut Strip ${currentFrame.name}`,
          snapshotData: {
            frame: activeFrame,
            frameName: currentFrame.name,
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
      <div className="border-b border-[#C5A059]/20 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              [ BILIK FOTO // 04 ] — ARCHIVAL DARKROOM STUDIO WORKSPACE
            </span>
            <h2 className="text-3xl sm:text-5xl font-royal font-bold text-[#F4EFE6] tracking-tight">
              Bilik Foto Jawa Kontemporer
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed font-sans max-w-2xl">
              Abadikan 4 pose budaya langsung dari kameramu. Pilih nuansa filter Mataram, padukan dengan 12 corak adiluhung berdasar riset arsip Jawa, lalu unduh strip vertikal beresolusi tinggi.
            </p>
          </div>

          <div className="text-xs font-mono text-[#A89F91] border border-[#C5A059]/30 px-3.5 py-2 bg-[#14110E] rounded-xl shrink-0">
            <span className="text-[#C5A059] font-bold">FORMAT // 1:3</span> VERTICAL STRIP
          </div>
        </div>
      </div>

      {/* UNIFIED 3-COLUMN DARKROOM STUDIO WORKSPACE (5 : 4 : 3 GRID) */}
      <div className="border border-[#C5A059]/30 bg-[#14110E] shadow-2xl rounded-2xl overflow-hidden">
        {/* Studio Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-[#C5A059]/20 bg-[#0C0A08] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059]">❖</span>
            <span className="font-bold text-[#F4EFE6] uppercase tracking-wider">
              DARKROOM STUDIO WORKSPACE
            </span>
            <span className="text-[#C5A059]/40">•</span>
            <span className="text-[#A89F91]">3-PANE INTEGRATED EDITORIAL LAYOUT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A89F91]">STATUS POSE:</span>
            <span className="text-[#0C0A08] bg-[#C5A059] px-2.5 py-0.5 font-bold rounded-full">
              {photos.length} / 4 POSE
            </span>
          </div>
        </div>

        {/* 3-Column Desk: Viewfinder (5 cols) : Kurasi Filter & Bingkai (4 cols) : Pratinjau (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#C5A059]/20 items-stretch">
          
          {/* =========================================================================
              KOLOM 1: VIEWFINDER KAMERA (5 BAGIAN / 12 COLS)
              ========================================================================= */}
          <div className="lg:col-span-5 p-5 space-y-4 flex flex-col justify-between bg-[#100D0A]">
            <div className="space-y-3">
              {/* Camera Header Plate */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#C5A059]/15 pb-2">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">
                  01 // VIEWFINDER KAMERA
                </span>
                <span className="text-[#A89F91]">
                  {cameraActive ? 'KAMERA AKTIF' : 'STANDBY'}
                </span>
              </div>

              {/* Viewfinder Frame with Studio Reticles */}
              <div className="relative aspect-[4/3] bg-[#0C0A08] border border-[#C5A059]/40 rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Darkroom Reticle Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none z-20" />
                <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none z-20" />
                <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none z-20" />
                <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none z-20" />

                {/* White Flash overlay */}
                {flash && (
                  <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none" />
                )}

                {/* Countdown Overlay */}
                {countdownNum && (
                  <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-8xl font-editorial font-bold text-[#C5A059] animate-ping">
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

                {/* Javanese Cultural Viewfinder Overlay */}
                {cameraActive && <JavaneseViewfinderOverlay frameId={activeFrame} />}

                {/* Fallback Screen when camera is not ready */}
                {!cameraActive && (
                  <div className="p-6 text-center space-y-4 max-w-sm w-full z-10">
                    <div className="w-14 h-14 bg-[#14110E] border border-[#C5A059]/30 rounded-2xl flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6 text-[#C5A059]" />
                    </div>
                    {cameraError ? (
                      <div className="space-y-3">
                        <p className="text-xs text-red-400 leading-relaxed font-mono">
                          {cameraError}
                        </p>
                        <button
                          onClick={startCamera}
                          className="px-4 py-2 bg-[#1C1610] hover:bg-[#282119] text-[#C5A059] text-xs font-mono uppercase tracking-wider border border-[#C5A059]/40 rounded-xl cursor-pointer transition-colors"
                        >
                          Coba Sambungkan Ulang
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-[#A89F91] font-sans">
                          Kamera bilik foto siap dinyalakan untuk mengambil 4-cut pose budaya Jawa.
                        </p>
                        <button
                          onClick={startCamera}
                          className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs font-mono uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2 mx-auto cursor-pointer rounded-xl"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Nyalakan Kamera</span>
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] text-[#A89F91] hover:text-[#C5A059] underline font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Upload Foto</span>
                      </button>
                      <span className="text-[#C5A059]/30">•</span>
                      <button
                        onClick={loadDemoSnaps}
                        className="text-[11px] text-[#C5A059] hover:underline font-mono cursor-pointer"
                      >
                        Gunakan Foto Demo (4 Pose)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Trigger Buttons */}
              {cameraActive && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleTakeSnap}
                    disabled={photos.length >= 4 || isCountingDown}
                    className="px-4 py-3 bg-[#14110E] hover:bg-[#1C1610] disabled:opacity-40 text-[#F4EFE6] text-xs font-mono uppercase tracking-wider border border-[#C5A059]/40 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Ambil 1</span>
                  </button>
                  <button
                    onClick={handleTakeFourBurst}
                    disabled={photos.length >= 4 || isCountingDown}
                    className="flex-1 py-3 bg-[#C5A059] hover:bg-[#D5B36E] disabled:opacity-40 text-[#0C0A08] text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-xl"
                  >
                    <span className="text-[#0C0A08]">❖</span>
                    <span>{isCountingDown ? 'Mengambil Pose...' : 'Burst 4 Pose'}</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    title="Matikan Kamera"
                    className="p-3 text-[#A89F91] hover:text-[#F4EFE6] border border-[#C5A059]/30 hover:bg-[#14110E] transition-colors rounded-xl"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Snap Bar */}
            <div className="pt-3 border-t border-[#C5A059]/15">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A89F91]">
                  HASIL JEPRETAN ({photos.length}/4):
                </span>
                {photos.length > 0 && (
                  <button
                    onClick={handleRetake}
                    className="text-[11px] text-red-400 hover:text-red-300 font-mono flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-lg hover:bg-red-950/40 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Pose</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, idx) => {
                  const photo = photos[idx];
                  return (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] border border-[#C5A059]/30 bg-[#0C0A08] rounded-xl overflow-hidden flex items-center justify-center"
                    >
                      {photo ? (
                        <>
                          <img src={photo} alt={`Snap ${idx + 1}`} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 right-0 bg-[#0C0A08]/90 text-[9px] text-[#C5A059] px-1.5 py-0.5 rounded-tl-md font-mono">
                            #{idx + 1}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-[#A89F91]/50">
                          #{idx + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================================
              KOLOM 2: KURASI FILTER & 12 BINGKAI BUDAYA (4 BAGIAN / 12 COLS)
              ========================================================================= */}
          <div className="lg:col-span-4 p-5 space-y-5 bg-[#14110E] overflow-y-auto max-h-[820px]">
            {/* Header Plate */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#C5A059]/15 pb-2">
              <span className="text-[#C5A059] font-bold uppercase tracking-wider">
                02 // FILTER &amp; BINGKAI BUDAYA
              </span>
              <span className="text-[#A89F91]">
                {CULTURAL_FRAMES.length} MOTIF
              </span>
            </div>

            {/* Filter Nuansa */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A89F91] font-bold flex items-center gap-1.5 uppercase">
                  <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>FILTER NUANSA:</span>
                </span>
                <span className="text-[#C5A059] uppercase font-semibold">
                  {activeFilter === 'warm'
                    ? 'Warm Mataram'
                    : activeFilter === 'sepia'
                    ? 'Sepia Keraton'
                    : 'Batik B&W'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveFilter('warm')}
                  className={`p-2.5 border text-left text-xs transition-all cursor-pointer rounded-xl relative ${
                    activeFilter === 'warm'
                      ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0A08] font-bold shadow-md ring-1 ring-[#C5A059]'
                      : 'border-[#C5A059]/25 bg-[#0C0A08] text-[#F4EFE6] hover:border-[#C5A059]/50'
                  }`}
                >
                  <span className="font-bold block font-mono text-[11px]">Warm Mataram</span>
                  <span className={`text-[9px] block ${activeFilter === 'warm' ? 'text-[#0C0A08]/85 font-semibold' : 'text-[#A89F91]'}`}>
                    Sogan Klasik
                  </span>
                </button>
                <button
                  onClick={() => setActiveFilter('sepia')}
                  className={`p-2.5 border text-left text-xs transition-all cursor-pointer rounded-xl relative ${
                    activeFilter === 'sepia'
                      ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0A08] font-bold shadow-md ring-1 ring-[#C5A059]'
                      : 'border-[#C5A059]/25 bg-[#0C0A08] text-[#F4EFE6] hover:border-[#C5A059]/50'
                  }`}
                >
                  <span className="font-bold block font-mono text-[11px]">Sepia Keraton</span>
                  <span className={`text-[9px] block ${activeFilter === 'sepia' ? 'text-[#0C0A08]/85 font-semibold' : 'text-[#A89F91]'}`}>
                    Klise Lawasan
                  </span>
                </button>
                <button
                  onClick={() => setActiveFilter('monochrome')}
                  className={`p-2.5 border text-left text-xs transition-all cursor-pointer rounded-xl relative ${
                    activeFilter === 'monochrome'
                      ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0A08] font-bold shadow-md ring-1 ring-[#C5A059]'
                      : 'border-[#C5A059]/25 bg-[#0C0A08] text-[#F4EFE6] hover:border-[#C5A059]/50'
                  }`}
                >
                  <span className="font-bold block font-mono text-[11px]">Batik B&amp;W</span>
                  <span className={`text-[9px] block ${activeFilter === 'monochrome' ? 'text-[#0C0A08]/85 font-semibold' : 'text-[#A89F91]'}`}>
                    Kontras Wayang
                  </span>
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="space-y-2 pt-2 border-t border-[#C5A059]/15">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A89F91] font-bold block">
                KATEGORI CORAK JAWA:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1.5 text-[11px] font-mono whitespace-nowrap rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#C5A059] text-[#0C0A08] font-bold shadow-md'
                          : 'bg-[#0C0A08] text-[#A89F91] border border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:text-[#F4EFE6]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 12 Cultural Frames Grid (Museum Specimen Cards) */}
            <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
              {filteredFrames.map((f, idx) => {
                const isSelected = activeFrame === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFrame(f.id)}
                    className={`p-2.5 border text-left text-xs transition-all relative flex flex-col justify-between cursor-pointer rounded-xl group overflow-hidden ${
                      isSelected
                        ? 'border-[#C5A059] bg-[#1E1712] text-[#F4EFE6] ring-1 ring-[#C5A059] shadow-[0_4px_16px_rgba(197,160,89,0.18)]'
                        : 'border-[#C5A059]/20 bg-[#0E0B09] text-[#A89F91] hover:border-[#C5A059]/45 hover:bg-[#15110E]'
                    }`}
                  >
                    {/* Header: Cultural Origin Tag & Selection / Catalog Number */}
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <span className="text-[9px] font-mono tracking-wider uppercase text-[#C5A059] font-bold truncate pr-1">
                        {FRAME_ORIGIN_SHORT[f.id] || 'NUSANTARA'}
                      </span>
                      {isSelected ? (
                        <span className="px-1.5 py-0.5 bg-[#C5A059] text-[#0C0A08] text-[8.5px] font-mono font-bold tracking-wider rounded flex items-center gap-0.5 shadow-xs shrink-0">
                          <span>❖</span> AKTIF
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono text-[#A89F91] shrink-0">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* Visual Motif Asset Pattern Swatch Banner */}
                    <div
                      className="w-full h-11 rounded-lg mb-2 border overflow-hidden relative shadow-inner"
                      style={{
                        backgroundColor: f.palette.background,
                        borderColor: isSelected ? f.palette.accentGold : 'rgba(197, 160, 89, 0.25)',
                        backgroundImage: `url("/images/patterns/${f.id}.svg")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '24px 24px',
                      }}
                    >
                      {/* Subtle Vignette Gradient for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none" />
                    </div>

                    {/* Frame Typography & Heritage Class */}
                    <div className="space-y-0.5 px-0.5">
                      <span className="font-bold block text-[11.5px] leading-tight text-[#F4EFE6] group-hover:text-[#ECC47E] transition-colors font-serif">
                        {f.name}
                      </span>
                      <span className="text-[9px] text-[#A89F91] block truncate font-mono">
                        {f.motifCategory}
                      </span>
                    </div>

                    {/* Authentic Dual-Tone Frame Border Accent Ribbon */}
                    <div
                      className="w-full h-0.5 mt-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(to right, ${f.palette.borderOuter}, ${f.palette.accentGold}, transparent)`,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Cultural Information of Selected Frame */}
            <div className="p-3.5 bg-[#0C0A08] border border-[#C5A059]/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2 border-b border-[#C5A059]/15 pb-1.5">
                <div>
                  <span className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">
                    [ {currentFrame.origin} ]
                  </span>
                  <h4 className="font-royal font-bold text-sm text-[#F4EFE6]">
                    {currentFrame.javaneseName}
                  </h4>
                </div>
                <a
                  href={currentFrame.pinterestSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C5A059] hover:text-[#F4EFE6] bg-[#14110E] px-2.5 py-1 rounded-lg border border-[#C5A059]/40 shrink-0 transition-colors"
                >
                  <span>Pinterest</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Visual Pattern & Asset Preview Banner */}
              <div
                className="w-full h-12 rounded-lg border border-[#C5A059]/30 relative overflow-hidden flex items-center justify-between px-3"
                style={{
                  backgroundColor: currentFrame.palette.background,
                  backgroundImage: `url("/images/patterns/${currentFrame.id}.svg")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '30px 30px',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/75 pointer-events-none" />
                <span className="relative z-10 text-[9px] font-mono uppercase tracking-widest text-[#ECC47E] font-bold">
                  ✦ CORAK RESMI NUSWARA ✦
                </span>
                {currentFrame.id === 'ukiran-gebyok' && (
                  <img
                    src="/frames/frame-ukiran-jepara.png"
                    alt="Ukir Jepara"
                    className="relative z-10 h-9 w-auto object-contain opacity-95 drop-shadow-md"
                  />
                )}
                {currentFrame.id === 'parang-kencana' && (
                  <img
                    src="/images/batik-parang.png"
                    alt="Batik Parang"
                    className="relative z-10 h-9 w-auto object-contain opacity-95 drop-shadow-md"
                  />
                )}
              </div>

              <p className="text-[10px] text-[#A89F91] leading-relaxed font-sans line-clamp-2">
                {currentFrame.description}
              </p>
              <div className="p-2 bg-[#14110E] border-l-2 border-[#C5A059] rounded-r-lg flex items-start gap-1.5">
                <Info className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#F4EFE6] italic leading-tight font-sans">
                  <strong className="not-italic font-bold font-mono text-[#C5A059]">FILOSOFI:</strong> {currentFrame.philosophy}
                </p>
              </div>

              {/* Personalization Inputs */}
              <div className="pt-2 border-t border-[#C5A059]/15 space-y-1.5">
                <label className="text-[10px] text-[#A89F91] font-mono uppercase block">
                  Teks Kustom Strip (Opsional):
                </label>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder={`e.g. ${currentFrame.javaneseName}`}
                    className="w-full px-3 py-2 bg-[#14110E] border border-[#C5A059]/30 rounded-xl text-[#F4EFE6] text-[11px] font-mono focus:border-[#C5A059] focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Rahayu Widodo Lestari / #Nuswara"
                    className="w-full px-3 py-2 bg-[#14110E] border border-[#C5A059]/30 rounded-xl text-[#F4EFE6] text-[11px] font-mono focus:border-[#C5A059] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              KOLOM 3: PRATINJAU PHOTO STRIP 4-CUT (3 BAGIAN / 12 COLS)
              ========================================================================= */}
          <div className="lg:col-span-3 p-5 space-y-4 bg-[#0C0A08] flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header Plate */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#C5A059]/15 pb-2">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">
                  03 // PRATINJAU STRIP
                </span>
                <span className="text-[#A89F91] text-[11px]">
                  1:3 VERTIKAL
                </span>
              </div>

              {/* Strip Preview Container (Darkroom Presentation Stage) */}
              <div className="flex justify-center bg-[#080705] p-3 border border-[#C5A059]/20 rounded-2xl min-h-[460px] items-center">
                <PhotoboothStripPreview
                  frame={currentFrame}
                  photos={photos}
                  stripUrl={stripUrl}
                  customText={customTitle}
                  customSubtext={customMessage}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {photos.length === 4 && stripUrl ? (
              <div className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                <button
                  onClick={handleDownloadStrip}
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#0C0A08]" />
                  <span>Download Strip PNG</span>
                </button>

                <button
                  onClick={handleShareStrip}
                  disabled={sharing}
                  className="w-full py-2.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] text-xs font-mono uppercase tracking-wider border border-[#C5A059]/40 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-[#C5A059] font-bold">Tautan Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{sharing ? 'Menyimpan...' : 'Bagikan Strip'}</span>
                    </>
                  )}
                </button>

                {shareCode && (
                  <div className="p-2.5 bg-[#14110E] border border-[#C5A059]/30 rounded-xl text-center text-xs">
                    <span className="font-mono text-[#A89F91] text-[10px] block uppercase">
                      KODE PUBLIK:
                    </span>
                    <Link
                      href={`/share/${shareCode}`}
                      className="font-mono font-bold text-[#C5A059] underline text-[11px] block truncate"
                    >
                      nuswara.id/share/{shareCode}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 bg-[#14110E] border border-[#C5A059]/20 rounded-xl text-center text-xs font-mono text-[#A89F91] space-y-1">
                <span className="text-[#C5A059] block">❖ AMBIL 4 POSE ❖</span>
                <p className="text-[10px] text-[#A89F91]/80">
                  Strip 4-cut resolusi tinggi akan otomatis dirender setelah 4 foto terisi.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoboothClient;