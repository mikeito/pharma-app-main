import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from 'src/api/route';

const createUser = createAsyncThunk('users/createUser', async (data?:any) => {
  try {
    const response = await apiClient('/users', 'POST', data, ); 
    if(response.success){
      console.log(response.data)
      return response
    }
  } catch (error:any) {
    return error.message
  }

});

const getUsers = createAsyncThunk('users/getUsers', async () => {
  try{
    const response = await apiClient('/users', 'GET');
    if (response.success) {
      console.log(response.data)
      return response;
    }
  }catch(error:any){
    return error.message
  }
});

export default {
  getUsers,
  createUser,
};
