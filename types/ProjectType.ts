import ImageType from "./ImageType";

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
    contentVideo?: string[];
    location?: string[];
    linkRedirect?: string;
}