import { MEDIA_TYPE } from "../../enums/media";

export interface Media {
    type: MEDIA_TYPE;
    urls: string[];
}