// This file augments the global NodeJS namespace to include the API_KEY in process.env.
// It avoids redeclaring 'process' which causes conflicts with other type definitions.
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: any;
    }
  }
}
