'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { GununganSvg } from '@/components/ui/WayangVectors';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Uncaught React Error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <GununganSvg className="w-16 h-24 text-amber-600/70" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Terjadi Kendala Memuat Tampilan
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-sans">
            Sistem mendeteksi kendala pada antarmuka halaman ini. Silakan muat ulang halaman untuk melanjutkan penjelajahan.
          </p>
          {this.state.error && (
            <p className="text-[11px] font-mono text-red-600 bg-red-50 p-2 rounded max-w-md border border-red-200">
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang Halaman</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
