import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
//-----以下import為RTK Query
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./api/albumsApi";
import { photosApi } from "./api/photosApi";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    //albums: albumsApi.reducer //需要跟api內設定的reducerPath一樣
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});
setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
//------
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./api/albumsApi";

export {
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotosMutation,
} from "./api/photosApi";
