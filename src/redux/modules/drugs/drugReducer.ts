import { createReducer } from '@reduxjs/toolkit';
import drugActions from './drugActions';

export const DrugState = {
    drugs: {
      loading: false,
      data: [],
      error: null as string | null,
    },
    drug:{},
    error: null as string | null,
    creating:false
};

const drugReducer = createReducer(DrugState, (builder) => {
    builder
      .addCase(drugActions.getDrugs.pending, (state) => {
        state.drugs.loading = true;
      })
      .addCase(drugActions.getDrugs.fulfilled, (state, action) => {
        state.drugs.data = action.payload.data;  
        state.drugs.loading = false;
      })
      .addCase(drugActions.getDrugs.rejected, (state, action) => {
        state.drugs.loading = false;
        state.drugs.error = action.error as string;
      })
      .addCase(drugActions.createDrug.pending, (state) => {
        state.creating = true;
      })
      .addCase(drugActions.createDrug.fulfilled, (state, action) => {
        state.creating = false;
        state.drug = action.payload;
      })
      .addCase(drugActions.createDrug.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error as string;
      });
  });
  
  export default drugReducer;