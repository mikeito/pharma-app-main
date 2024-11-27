import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from 'src/api/route';
import axios from 'axios';

const getOrganizations = createAsyncThunk('organisations/getOrganisations', async () => {
  try {
    const res = await apiClient('/organisations', 'GET');
     console.log(res)
     if (res.success) {
      console.log(res.data)
      return res;
    }
  } catch (error:any) {
    return error.message
  }
  
});

const createOrganisation = createAsyncThunk('organisations/createOrganisation', async (data?:any) => {
    return await apiClient('/organisations', 'POST', data);    
    
  });

  const searchOrganisations = createAsyncThunk(
    'organisations/searchOrganisations',
      async (data: { type?: string; term: string }) => {
        try {
          
        // Build query parameters
        const queryParams = new URLSearchParams();
        if (data.type) queryParams.append('type', data.type);
        if (data.term) queryParams.append('search', data.term);
    
        // Send request with query parameters
        const response = await apiClient(`/organisations/search?${queryParams.toString()}`, 'GET');
        if(response.success){
          return response
        }
        } catch (error:any) {
          return error.message
        }
        console.log("data action", data);
    
     
    }
  );

  // const searchOrganisations = createAsyncThunk('organisations/searchOrganisations', async (data: {type: string, term: string}) => {
  //   try {
  //     const response = await axios.post('/api/organisations', data);
  
  
  //     // const res = await respon
  //     return response;
  //   } catch (error:any) {
  //     console.error('Error searching organisations:', error.message);
  //   }
  // })

export default { 
    getOrganizations,
    createOrganisation,
    searchOrganisations,
 };

 