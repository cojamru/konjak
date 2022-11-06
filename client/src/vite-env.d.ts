/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_API_ENDPOINT_ORIGIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
