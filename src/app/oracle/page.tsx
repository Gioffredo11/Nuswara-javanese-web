import { Metadata } from 'next';
import { OracleClient } from './OracleClient';

export const metadata: Metadata = {
  title: 'Javanese Oracle (Ramalan Weton & Arketipe Wayang) • NUSWARA',
  description: 'Temukan karakter wayang pelindung dan arketipe kepribadianmu berdasarkan weton dan hari lahir tradisi Jawa.',
};

export default function OraclePage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20">
      <OracleClient />
    </main>
  );
}
