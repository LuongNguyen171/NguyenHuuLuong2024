import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CommentAPI from '../api/CommentApi';
import {
    CommentState
} from '../module';

const initialState: CommentState = {

    loadingComments: false,
    comments: [],

    loadingCommentByPost: false,
    commentByPost: [],

    loadingEditCommentById: false,
    successEditCommentById: false,
    errEditCommentById: null,
}

export const getAllComments = createAsyncThunk(
    'getAllComments',
    async (args, { rejectWithValue }) => {
        try {
            return (await CommentAPI.getAllComments()).data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const editCommentById = createAsyncThunk(
    'editCommentById',
    async (args: { id: number, newComment: string }, { rejectWithValue }) => {
        const { id, newComment } = args;
        try {
            return (await CommentAPI.editCommentById(id, newComment)).data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const getAllCommentsByPost = createAsyncThunk(
    'getAllCommentsByPost',
    async (postId: number, { rejectWithValue }) => {
        try {
            return (await CommentAPI.getAllCommentsByPost(postId)).data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


// Define the slice
const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        // Add other synchronous actions here
    },
    extraReducers: (builder) => {

        //get all comment
        builder.addCase(getAllComments.pending, (state) => {
            state.loadingComments = true;
            state.comments = []
        });

        builder.addCase(getAllComments.fulfilled, (state, action) => {
            state.loadingComments = false;
            state.comments = action.payload;
        });

        builder.addCase(getAllComments.rejected, (state, action) => {
            state.loadingComments = false;
            state.comments = []
        });

        //getAllCommentsByPost
        builder.addCase(getAllCommentsByPost.pending, (state) => {
            state.loadingCommentByPost = true;
            state.commentByPost = []
        });

        builder.addCase(getAllCommentsByPost.fulfilled, (state, action) => {
            state.loadingCommentByPost = false;
            state.commentByPost = action.payload;
        });

        builder.addCase(getAllCommentsByPost.rejected, (state, action) => {
            state.loadingCommentByPost = false;
            state.commentByPost = []
        });

        //editCommentById
        builder.addCase(editCommentById.pending, (state) => {
            state.loadingEditCommentById = true;
            state.successEditCommentById = false;
            state.errEditCommentById = null;
        });

        builder.addCase(editCommentById.fulfilled, (state, action) => {
            state.loadingEditCommentById = false;
            state.successEditCommentById = true;
            state.errEditCommentById = null;
        });

        builder.addCase(editCommentById.rejected, (state, action) => {
            state.loadingEditCommentById = false;
            state.successEditCommentById = false;
            state.errEditCommentById =
                action.payload !== undefined ? action.payload : null;
        });

    },
});



// Export actions
export const { /* Add synchronous action creators here */ } = commentSlice.actions;

export default commentSlice.reducer;
