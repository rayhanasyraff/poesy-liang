type NavigateBehavior = {
  type: "navigate";
  target: PageTarget | UrlTarget;
};

type PageTarget = {
  type: "page";
  pageId: number;
};

type UrlTarget = {
  type: "url";
  targetUrl: string;
};

export default interface ActionType {
  name: "click"; // or "hover", etc.
  behavior: NavigateBehavior;
};