// Augment NodeJS.ProcessEnv to include API_KEY without redeclaring 'process' which causes conflicts.
// The reference to vite/client is removed as it was reported missing.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: any;
  }
}
