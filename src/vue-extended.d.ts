export interface IAlertRequest {
  type?: "base" | "error" | "success";
  title?: string;
  text: string;
  timeout?: number;
  is_shown_always?: boolean;
}

declare module "vue/types/vue" {
  interface Vue {
    $notification(request: IAlertRequest): void;
  }
}
