// 宣告全域 process 變數，解決 TypeScript 找不到 process 的錯誤
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: any;
    }
  }
}
