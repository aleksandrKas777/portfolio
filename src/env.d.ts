
interface ImportMetaEnv {
  readonly VITE_GOOGLE_PRIVATE_KEY: string,
  readonly VITE_GOOGLE_CLIENT_EMAIL: string,
  readonly VITE_GOOGLE_SHEET_ID: string,
  readonly VITE_GOOGLE_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}