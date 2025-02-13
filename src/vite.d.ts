/// <reference types="vite/client" />

interface Env {
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_FILE_RESOURCE_URL: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMetaEnv extends Env {}
