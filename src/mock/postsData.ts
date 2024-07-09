import { POST_TYPE } from '../enums';
import { MEDIA_TYPE } from '../enums/media';
import { Post } from '../models/Post';
export const posts: Post[] = [
  {
    id: '1',
    userId: '1',
    isDeleted: false,
    like: new Map(),
    text: 'This is a post',
    category: 'General',
    poll: null,
    type: POST_TYPE.POST,
    media: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    reactions: [],
  },
  {
    id: '2',
    userId: '2',
    isDeleted: false,
    like: new Map(),
    text: 'This is a post with media',
    category: 'General',
    poll: null,
    type: POST_TYPE.POST,
    media: {
      type: MEDIA_TYPE.IMAGE,
      urls: ['https://via.placeholder.com/150'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    reactions: [],
  },
  {
    id: '3',
    userId: '3',
    isDeleted: false,
    like: new Map(),
    text: 'This is a post with poll',
    category: 'General',
    poll: {
      startTime: new Date(),
      endTime: new Date(),
      options: [
        {
          id: '1',
          text: 'Yes',
          order: 1,
          isSelected: false,
          voteCount: 0,
        },
        {
          id: '2',
          text: 'No',
          isSelected: false,
          order: 2,
          voteCount: 0,
        },
      ],
    },
    type: POST_TYPE.POLL,
    media: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    reactions: [],
  },
];
