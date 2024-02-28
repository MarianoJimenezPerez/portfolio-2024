/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_DOMAIN: string;
  readonly PUBLIC_CONTACT_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
