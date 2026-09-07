"use client";

import { useEffect, useRef, useState } from "react";
import { Gallery } from "@/components/Gallery";
import { Onboarding } from "@/components/Onboarding";
import { UploadButton } from "@/components/UploadButton";
import { UploadProgress } from "@/components/UploadProgress";
import { useGalleryPolling } from "@/hooks/useGalleryPolling";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useUpload } from "@/hooks/useUpload";

/** A loose garland strung across the top of the hero banner — the one
 * ornamental flourish on the page, so everything else can stay quiet. */
function Bunting() {
  return (
    <svg
      viewBox="0 0 400 34"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-8 w-full text-paper/25"
      aria-hidden
    >
      <path
        d="M0,6 Q100,26 200,8 T400,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {[24, 80, 136, 192, 248, 304, 360].map((x, i) => (
        <path
          key={x}
          d={`M${x},${i % 2 === 0 ? 12 : 16} l-7,0 l3.5,11 z`}
          fill={i % 3 === 0 ? "#ee9c1f" : i % 3 === 1 ? "#d1487a" : "#fbf1e3"}
          opacity={0.9}
        />
      ))}
    </svg>
  );
}

/** The birthday kid himself, pinned into the banner the same way a photo
 * gets pinned into the gallery below — ties the hero back to the
 * scrapbook motif instead of using a generic decorative icon. */
function HeroPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="polaroid-frame relative w-16 rotate-3 rounded-sm sm:w-36 md:w-56">
        <span
          aria-hidden
          className="absolute -top-2 left-1/2 h-3.5 w-9 -translate-x-1/2 -rotate-2 rounded-[1px] bg-butter/80 shadow-sm sm:-top-3 sm:h-6 sm:w-20 md:h-7 md:w-24"
        />
        <div className="aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-line/40">
          <img
            src="/hero-baby.jpg"
            alt="Kai"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { showOnboarding, dismiss } = useOnboarding();
  const { photos, status, hasMore, loadingMore, loadMore, addOptimisticPhoto } =
    useGalleryPolling();
  const { tasks, enqueueFiles, retryTask, removeTask } = useUpload({
    onPhotoUploaded: addOptimisticPhoto,
  });

  // Replays the counter's "tick" animation only when the count actually
  // grows, by changing the element's key so React remounts it.
  const previousCount = useRef(photos.length);
  const [tickKey, setTickKey] = useState(0);
  useEffect(() => {
    if (photos.length > previousCount.current) setTickKey((k) => k + 1);
    previousCount.current = photos.length;
  }, [photos.length]);

  return (
    <main className="min-h-screen bg-paper pb-32">
      <header className="glass-surface sticky top-0 z-20 px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm text-white"
            aria-hidden
          >
            ✦
          </span>
          <p className="font-display text-lg leading-none text-ink">
            Kai&apos;s birthday
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-plum px-6 pb-9 pt-11 text-paper sm:px-10 sm:pb-12 sm:pt-14">
          <Bunting />

          <div className="flex items-start justify-between gap-3 sm:gap-5">
            <h1 className="max-w-[170px] -rotate-1 font-display text-3xl leading-[0.98] sm:max-w-sm sm:text-5xl md:max-w-lg md:text-6xl">
              A little book of big birthday memories.
            </h1>
            <HeroPhoto className="shrink-0" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/75 sm:text-base">
            Drop in your favorite snapshots so we can hold onto every laugh,
            candle, and happy moment.
          </p>

          {photos.length > 0 && status === "ready" && (
            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper/10 py-1.5 pl-1.5 pr-4">
              <span
                key={tickKey}
                className="flex h-7 min-w-7 animate-tick items-center justify-center rounded-full bg-coral px-2 text-[13px] font-bold text-white"
              >
                {photos.length}
              </span>
              <span className="text-[13px] font-medium text-paper/85">
                {photos.length === 1
                  ? "photo pinned so far"
                  : "photos pinned so far"}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-9 sm:px-6">
        <h2 className="font-display text-3xl text-ink">Moments, together</h2>
        <Gallery
          photos={photos}
          status={status}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      </section>

      <UploadProgress
        tasks={tasks}
        onRetry={retryTask}
        onDismiss={removeTask}
      />
      <UploadButton onFilesSelected={enqueueFiles} />
      <Onboarding open={showOnboarding} onDismiss={dismiss} />
    </main>
  );
}
