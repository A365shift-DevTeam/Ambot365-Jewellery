/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_USE_CLOUDINARY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
