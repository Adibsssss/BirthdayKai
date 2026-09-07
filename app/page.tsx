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
    <main className="min-h-screen bg-paper pb-28">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <h1 className="text-[15px] font-medium text-ink">Event Gallery</h1>
      </header>

      <Gallery
        photos={photos}
        status={status}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={loadMore}
      />

      <UploadProgress tasks={tasks} onRetry={retryTask} onDismiss={removeTask} />
      <UploadButton onFilesSelected={enqueueFiles} />
      <Onboarding open={showOnboarding} onDismiss={dismiss} />
    </main>
  );
}
