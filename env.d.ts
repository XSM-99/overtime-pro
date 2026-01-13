// Fix: Augment NodeJS namespace to avoid "Cannot redeclare block-scoped variable 'process'" error.
// This ensures process.env.API_KEY is typed correctly without conflicting with global type definitions.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: any;
  }
}
