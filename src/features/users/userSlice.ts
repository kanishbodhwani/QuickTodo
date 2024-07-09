import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';`
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../app/store';
import { User } from '../../models/User';

type UserResponse = User[];

const userAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => b.created_at.toString().localeCompare(a.created_at.toString()),
});

const initialState = userAdapter.getInitialState({});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getUserById: builder.query<UserResponse, string>({
      query: (id: string) => `/users/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'User' as const, id: result[0].uid }] : [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, User>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.uid}`,
        method: 'PATCH',
        body: updatedUser,
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.uid }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// Creates memoized selector
export const selectUserData = createSelector(
  selectUsersResult,
  (users) => (users?.data as unknown as EntityState<User, string>) || initialState
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors<RootState>((state) => selectUserData(state));
