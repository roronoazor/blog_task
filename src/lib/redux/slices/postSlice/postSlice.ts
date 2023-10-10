/* Core */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '@/interfaces/post'

/* Instruments */
const initialState: PostSliceState = {
  posts: [],
  currentPost: null,
  status: 'idle'
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    }
  }
});

/* Types */
export interface PostSliceState {
  posts: Post[];
  currentPost: Post | null;
  status: 'idle' | 'loading' | 'failed'
}
