import type { InjectionKey } from "vue";

export type AppView = "home" | "login" | "register" | "field";

export const showViewKey: InjectionKey<(view: AppView) => void> =
  Symbol("showView");
