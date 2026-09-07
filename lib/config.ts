// Server-only. Never import this file from a Client Component.
// Centralizes env var access so a missing variable fails fast, with a
// clear message, the first time it's actually needed rather than
// silently producing broken uploads later.

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. See .env.local.example.`
    );
  }
  return value;
}

export const serverConfig = {
  get serviceAccountEmail(): string {
    return required('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  },
  get privateKey(): string {
    // Railway and most .env tooling accept multiline keys stored with
    // literal "\n" sequences; convert them back into real newlines. If the
    // key was pasted with real line breaks instead (also supported), this
    // is a harmless no-op.
    return required('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
  },
  get driveFolderId(): string {
    return required('GOOGLE_DRIVE_FOLDER_ID');
  },
  get maxFileSizeBytes(): number {
    const mb = Number(process.env.MAX_FILE_SIZE_MB ?? '100');
    return (Number.isFinite(mb) && mb > 0 ? mb : 100) * 1024 * 1024;
  },
  get galleryPageSize(): number {
    const size = Number(process.env.GALLERY_PAGE_SIZE ?? '20');
    return Number.isFinite(size) && size > 0 ? Math.min(size, 100) : 20;
  },
};

/** Image formats accepted for upload. HEIC/HEIF covers unmodified iPhone photos. */
export const ALLOWED_MIME_TYPES: ReadonlySet<string> = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);
