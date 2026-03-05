import ImageType from "./ImageType";
import VideoType from "./VideoType";
import PressReleaseType from "./PressReleaseType";

export default interface ContentPageType {
    id: number,
    images?: ImageType[],
    videos?: VideoType[],
    portfolio?: string | string[],
    text?: string,
    pressReleases?: PressReleaseType[]
}