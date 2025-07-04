/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  VITE_DOMAIN: string;
  VITE_FRONTEND: string;
  VITE_WS_DOMAIN: string;
}

interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_FRONTEND: string;
  readonly VITE_WS_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
