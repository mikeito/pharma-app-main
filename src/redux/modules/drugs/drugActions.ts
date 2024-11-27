import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'src/api/route';


const getDrugs = createAsyncThunk('drugs/getDrugs', async () => {
  try {
    const response = await apiClient('/drugs', 'GET');
    if(response.success){
      return response
    }    
  } catch (error:any) {
    return error.message
  }
  
});

const createDrug = createAsyncThunk('drugs/createDrug', async (data?:any) => {

    return await apiClient('/drugs', 'POST', data);    
    
  });
  const searchDrugs = createAsyncThunk(
    'drugs/searchDrugs',
      async (data: {term: string }) => {
        try {
          
        const queryParams = new URLSearchParams();
        if (data.term) queryParams.append('term', data.term);
    
        const response = await apiClient(`/drugs/search?${queryParams.toString()}`, 'GET');
        if(response.success){
          return response
        }
        } catch (error:any) {
          return error.message
        }
    
     
    }
  );

export default { 
    getDrugs,
    createDrug,
    searchDrugs
 };
