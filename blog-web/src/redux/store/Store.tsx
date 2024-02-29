import { configureStore } from '@reduxjs/toolkit';
import PostReducer from '../reducer/Post';
import CommentReducer from '../reducer/Comment';
import UserReducer from '../reducer/User';

export const store = configureStore({
  reducer: {
    Post: PostReducer,
    Comment: CommentReducer,
    User: UserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
