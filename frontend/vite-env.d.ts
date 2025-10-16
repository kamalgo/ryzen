/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_ENDPOINT: string
  readonly VITE_REDIRECTION_DURATION: string
  readonly VITE_MAX_UPLOAD_LIMIT: string
  // add more env vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
