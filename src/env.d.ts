interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_WORKSPACE_DOMAIN: string;
  readonly VITE_TOKEN_STORAGE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
