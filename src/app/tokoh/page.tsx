import React from 'react';
import { Metadata } from 'next';
import { TokohIndexClient } from './TokohIndexClient';

export const metadata: Metadata = {
  title: 'Arsip & Artikel Tokoh Ksatria Jawa • NUSWARA',
  description:
    'Telusuri arsip identitas dan artikel biografi mendalam tokoh-tokoh pahlawan kemerdekaan Indonesia yang berasal dari tanah Jawa: R.A. Kartini, Pangeran Diponegoro, Ki Hadjar Dewantara, Jenderal Soedirman, K.H. Ahmad Dahlan, dan Nyi Ageng Serang.',
  openGraph: {
    title: 'Arsip & Artikel Tokoh Ksatria Jawa • NUSWARA',
    description:
      'Telusuri arsip identitas dan artikel biografi mendalam tokoh-tokoh pahlawan kemerdekaan Indonesia yang berasal dari Jawa.',
  },
};

export default function TokohPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TokohIndexClient />
      </div>
    </main>
  );
}
