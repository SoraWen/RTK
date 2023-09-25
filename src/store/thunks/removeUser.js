import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  //const response =
  await axios.delete(`http://localhost:3002/users/${user.id}`);
  //FIX //因為在刪除後回傳的會是{}空的
  // return response.data;  //返回的東西會變當成payload

  return user;
});

export { removeUser };
