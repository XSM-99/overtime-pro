// Global declaration for process variable
// This is necessary because the environment is browser-based (Vite) but we need to satisfy 
// the @google/genai SDK requirement of using process.env.API_KEY.

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: any;
    }
  }
}
