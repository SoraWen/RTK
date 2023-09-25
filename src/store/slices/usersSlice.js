import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  //   reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      //更新我們的state向使用者展示我們在加載數據
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(removeUser.pending, (state, action) => {
      //待处理
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      //已完成
      state.isLoading = false;
      console.log(action);
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
      //FIX
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      //被拒绝
      state.isLoading = false;
      state.error = action.error;
      //console.log(state.error);
    });
  },
});

export const usersReducer = usersSlice.reducer;
