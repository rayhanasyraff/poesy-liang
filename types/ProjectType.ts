import ImageType from "./ImageType";
import VideoType from "./VideoType";

export interface ProjectType {
    id: number;
    date: string;
    pathname: string;
    category: string[];
    tags: string[];
    description: string;
    name: string;
    thumbnailImage: ImageType[];
    contentImage: ImageType[];
    contentPortfolio?: string;
    contentVideo?: VideoType[];
    location?: string[];
    linkRedirect?: string;
}