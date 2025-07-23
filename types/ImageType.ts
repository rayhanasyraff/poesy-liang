import ActionType from "./ActionType";

export default interface ImageType {
  src: string;
  width: number;
  height: number;
  action?: ActionType;
}