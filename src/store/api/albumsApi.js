import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//測試loading用的-----
const pause = (durartion) => {
  return new Promise((resolve) => {
    setTimeout(resolve, durartion);
  });
};
//測試loading用的-----

const albumsApi = createApi({
  reducerPath: "albums", //名子可以隨便取
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
    fetchFn: async (...arg) => {
      await pause(1000); //暫停時間
      return fetch(...arg);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UserAlbum", id: user.id }];
        }, //接收tag'UserAlbum'會更新數據要求
        query: (user) => {
          return {
            url: "/albums",

            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        //這裡fetchAlbums會決定hook名稱
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UserAlbum", id: user.id });
          return tags;
        }, //tag用於可以再次執行
        query: (user) => {
          return {
            url: "/albums",
            params: {
              //要撈查看資料才需要
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

//albumsApi.useFetchAlbumsQuery(); //以上會生成一個hook
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
