// Reexport the native module. On web, it will be resolved to CallerIdModule.web.ts
// and on native platforms to CallerIdModule.ts
export * from "./src/CallerId.types";
export { default } from "./src/CallerIdModule";
