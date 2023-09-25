import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker"; //一個隨機生成API

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3002/users", {
    name: faker.person.fullName(),
  });
  return response.data;
});

export { addUser };
