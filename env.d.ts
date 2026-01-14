/**
 * Fix for TS2451: Cannot redeclare block-scoped variable 'process'.
 * Instead of declaring 'process' globally which conflicts with @types/node,
 * we augment the NodeJS.ProcessEnv interface to include API_KEY.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: any;
  }
}
