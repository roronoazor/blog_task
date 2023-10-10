/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { postSlice, ReduxThunkAction } from '@/lib/redux'
import { Post } from '@/interfaces/post'


export const setCurrentPostAsync = (post: Post | null): ReduxThunkAction =>
(dispatch, getState) => {
    dispatch(postSlice.actions.setCurrentPost(post));
}