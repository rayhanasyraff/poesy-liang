import ImageType from "./ImageType";
import VideoType from "./VideoType";

export default interface ContentPageType {
    id: number,
    images?: ImageType[],
    videos?: VideoType[],
    portfolio?: string
}