/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_QUESTIONNAIRE_SCRIPT: string;
  readonly VITE_URL_SUGESTION_SCRIPT?: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
