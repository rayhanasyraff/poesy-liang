import ContentPageType from "./ContentPageType";
import ImageType from "./ImageType";

export default interface ProjectType {
    id: number;
    order: number;
    date: string;
    pathname: string;
    category: string[];
    tags: string[];
    description: string;
    name: string;
    location?: string[];
    thumbnailImage: ImageType[];
    contentPages: ContentPageType[];
    visibility: string;
}