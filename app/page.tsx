'use client';

import { Gallery } from '@/components/Gallery';
import { Onboarding } from '@/components/Onboarding';
import { UploadButton } from '@/components/UploadButton';
import { UploadProgress } from '@/components/UploadProgress';
import { useGalleryPolling } from '@/hooks/useGalleryPolling';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useUpload } from '@/hooks/useUpload';

export default function Page() {
  const { showOnboarding, dismiss } = useOnboarding();
  const { photos, status, hasMore, loadingMore, loadMore, addOptimisticPhoto } = useGalleryPolling();
  const { tasks, enqueueFiles, retryTask, removeTask } = useUpload({
    onPhotoUploaded: addOptimisticPhoto,
  });

  return (
    <main className="min-h-screen bg-paper pb-32">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm shadow-sm" aria-hidden>✦</span>
            <p className="font-display text-lg leading-none text-ink">Kai&apos;s birthday</p>
          </div>
          <span className="rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-paper">Photo book</span>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-9 text-paper shadow-[0_20px_50px_rgba(88,50,37,0.16)] sm:px-10 sm:py-12">
          <span className="absolute -right-7 -top-9 h-40 w-40 rounded-full bg-coral/90" aria-hidden />
          <span className="absolute bottom-0 right-20 h-20 w-20 rounded-full bg-butter/90" aria-hidden />
          <div className="relative max-w-xl animate-float-in">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-peach">One beautiful day</p>
            <h1 className="mt-3 font-display text-4xl leading-[0.98] sm:text-6xl">A little book of big birthday memories.</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/75 sm:text-base">Drop in your favorite snapshots so we can hold onto every laugh, candle, and happy moment.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-9 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">The collection</p>
            <h2 className="mt-1 font-display text-3xl text-ink">Moments, together</h2>
          </div>
          {photos.length > 0 && status === 'ready' && <span className="rounded-full border border-line bg-paper/70 px-3 py-1.5 text-xs font-medium text-muted">{photos.length} {photos.length === 1 ? 'photo' : 'photos'}</span>}
        </div>
        <Gallery
          photos={photos}
          status={status}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      </section>

      <UploadProgress tasks={tasks} onRetry={retryTask} onDismiss={removeTask} />
      <UploadButton onFilesSelected={enqueueFiles} />
      <Onboarding open={showOnboarding} onDismiss={dismiss} />
    </main>
  );
}
