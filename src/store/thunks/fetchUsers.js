import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3002/users");

  await pause(1000); //測試暫停

  return response.data;
});
//以下為預設的方式
// fetchUsers.pending === "users/fetch/pending"; 表示剛啟動
// fetchUsers.fulfilled === "users/fetch/fulfilled"; 已完成
// fetchUsers.rejected === "users/fetch/rejected";已拒絕

//測試loading用的-----
const pause = (durartion) => {
  return new Promise((resolve) => {
    setTimeout(resolve, durartion);
  });
};
//測試loading用的-----

export { fetchUsers };
