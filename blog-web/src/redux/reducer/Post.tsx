import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import PostApi from '../api/PostApi';
import {
  PostState
} from '../module';


export const getAllPosts = createAsyncThunk(
  'getAllPosts',
  async (args, { rejectWithValue }) => {
    try {
      return (await PostApi.getAllPosts()).data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  'deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      return (await PostApi.deletePost(id)).data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: PostState = {
  loadingPosts: false,
  posts: [],

  loadingDeletePost: false,
  errDeletePost: null,
  successDeletePost: false,
}

// Define the slice
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Add other synchronous actions here
  },
  extraReducers: (builder) => {

    builder.addCase(getAllPosts.pending, (state) => {
      state.loadingPosts = true;
      state.posts = []
    });

    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loadingPosts = false;
      state.posts = action.payload;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loadingPosts = false;
      state.posts = []
    });

    // delete post 

    builder.addCase(deletePost.pending, (state) => {
      state.loadingDeletePost = true;
      state.successDeletePost = false;
      state.errDeletePost = null;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loadingDeletePost = false;
      state.successDeletePost = true;
      state.errDeletePost = null;
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.loadingDeletePost = false;
      state.successDeletePost = false;
      state.errDeletePost =
        action.payload !== undefined ? action.payload : null;
    });

  },
});



// Export actions
export const { /* Add synchronous action creators here */ } = postSlice.actions;

// Export the reducer
export default postSlice.reducer;
