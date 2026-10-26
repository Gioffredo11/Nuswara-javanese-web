import { Metadata } from 'next';
import { ManifestationClient } from './ManifestationClient';

export const metadata: Metadata = {
  title: 'Manifestasi Piwulang Luhur • NUSWARA',
  description: 'Tarik kartu afirmasi harian berisi kebijaksanaan budi pekerti dan filosofi hidup leluhur Jawa Tengah.',
};

export default function ManifestationPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ManifestationClient />
      </div>
    </main>
  );
}
