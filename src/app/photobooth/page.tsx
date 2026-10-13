import { Metadata } from 'next';
import { PhotoboothClient } from './PhotoboothClient';

export const metadata: Metadata = {
  title: 'Web Photobooth 4-Cut Wayang • NUSWARA',
  description: 'Abadikan potret bergaya bingkai wayang klasik Jawa, unduh photo strip 4-cut dan bagikan momen budayamu.',
};

export default function PhotoboothPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20">
      <PhotoboothClient autoStart={false} />
    </main>
  );
}
