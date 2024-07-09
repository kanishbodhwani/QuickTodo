import { POST_TYPE } from '../../enums';
import { Media } from './media.model';
import { Poll } from './poll.model';

export interface Post {
  id: string;
  userId: string;
  isDeleted: boolean;
  like: Map<string, Date>;
  text: string;
  category: string | null;
  poll: Poll | null;
  type: POST_TYPE;
  media: Media | null;
  createdAt: Date;
  updatedAt: Date;
  reactions: string[]; // remove this one
}
