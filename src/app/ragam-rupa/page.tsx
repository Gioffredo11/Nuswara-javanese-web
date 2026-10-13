import { Metadata } from 'next';
import { RagamRupaClient } from './RagamRupaClient';
import { VisualElementRepository } from '@/server/repositories/visual-element.repository';
import { BatikRepository } from '@/server/repositories/batik.repository';

export const metadata: Metadata = {
  title: 'Ragam Corak & Rupa Jawa • NUSWARA',
  description: 'Eksplorasi visual tatah sungging anatomi wayang kulit dan filosofi motif batik Jawa.',
};

export default async function RagamRupaPage() {
  const visualElementRepo = new VisualElementRepository();
  const batikRepo = new BatikRepository();

  let visualElements: any[] = [];
  let batikPatterns: any[] = [];

  try {
    visualElements = await visualElementRepo.findAll();
  } catch (err) {
    console.warn('[RagamRupaPage] DB error fetching visual elements:', err);
  }

  try {
    batikPatterns = await batikRepo.findAll();
  } catch (err) {
    console.warn('[RagamRupaPage] DB error fetching batik patterns:', err);
  }

  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20">
      <RagamRupaClient
        visualElements={JSON.parse(JSON.stringify(visualElements))}
        batikPatterns={JSON.parse(JSON.stringify(batikPatterns))}
      />
    </main>
  );
}
