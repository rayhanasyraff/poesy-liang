type Behavior = {
  name: string;
  target: Target;
};

// type PageTarget = {
//   type: "page";
//   pageId: number;
// };

// type UrlTarget = {
//   type: "url";
//   targetUrl: string;
// };

type Target = {
  type: string;
  pageId?: number;
  targetUrl?: string;
}

export default interface ActionType {
  name: string;
  behavior: Behavior;
};