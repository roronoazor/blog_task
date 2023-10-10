import { createSelector } from '@reduxjs/toolkit';
import { ReduxState } from '../../store'; // Update the import path as needed
import { postSlice } from '../postSlice';

const selectPostSlice = (state: ReduxState) => state.post;

export const selectPosts = createSelector(
  selectPostSlice,
  (postSlice) => postSlice.posts
);

export const selectCurrentPost = createSelector(
  selectPostSlice,
  (postSlice) => postSlice.currentPost
);
