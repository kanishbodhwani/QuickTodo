import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
import { apiSlice } from '../api/apiSlice';
import { Post } from '../../models/Post';
// import { RootState } from '../../app/store';

type PostsResponse = Post[];

const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.createdAt.toString().localeCompare(a.createdAt.toString()),
});

const initialState = postAdapter.getInitialState({});

// All posts are based on location, where the user resides
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, string>({
      // Modify the query to accept a userId parameter
      query: (userId: string) => `/posts/?userId=${userId}`,
      transformResponse: (rawResult: { result: { post: Post } }) => {
        // If data coming from backend is not in the format we want, we can transform it here
        // const data = responseData.map(post => ({ ...post, date: sub(new Date(), { minutes: post.id }) }));
        // return postAdapter.setAll(postAdapter.getInitialState(), data);
        return [rawResult.result.post];
      },
      // if any of id is invalid, provideTags will refetch the data
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Post' as const, id })),
            { type: 'Post', id: 'LIST' },
          ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    addNewPost: builder.mutation<Post, Post>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, { id: string; post: Post }>({
      query: ({ id, post }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: {
          ...post,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    addReaction: builder.mutation<{ postId: string; reaction: string }, { postId: string; reaction: string }>({
      query: ({ postId, reaction }) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: { reaction },
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        // updateQueryData requires the endpoint name and cache key arguments
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getPosts', postId, (draft) => {
            const post = draft.find((post) => post.id === postId);
            if (post) {
              post.reactions = [...post.reactions, reaction];
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),
  }),
});

export const { useGetPostsQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation } =
  extendedApiSlice;

// returns the query result object
const selectPostsResult = (userId: string) => extendedApiSlice.endpoints.getPosts.select(userId);

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => (postsResult as unknown as EntityState<Post, string>) || initialState
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors(selectPostsData);
