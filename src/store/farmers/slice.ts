import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as FarmerThunks from './actions';
import type { RootState } from '..';

type FarmersState = {
  data: Farmer[];
  error: string | null;
  loading: boolean;
};

const initialState: FarmersState = {
  data: [],
  error: null,
  loading: false,
};

export const farmersSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      FarmerThunks.fetchFarmersThunk.fulfilled,
      (state, action: PayloadAction<Farmer[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(FarmerThunks.createFarmerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      FarmerThunks.createFarmerThunk.fulfilled,
      (state, action: PayloadAction<Farmer>) => {
        state.data = [...state.data, action.payload];
        state.loading = false;
      }
    );
    builder.addCase(
      FarmerThunks.deleteFarmerThunk.fulfilled,
      (state, action: PayloadAction<number>) => {
        const farmerId = action.payload;
        state.data = state.data.filter((farmer) => farmer.id !== farmerId);
      }
    );
    builder.addCase(FarmerThunks.editFarmerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      FarmerThunks.editFarmerThunk.fulfilled,
      (state, action: PayloadAction<Farmer>) => {
        const editedFarmer = action.payload;
        const oldFarmerIndex = state.data.findIndex(
          (farmer) => farmer.id === editedFarmer.id
        );
        state.data[oldFarmerIndex] = editedFarmer;
        state.loading = false;
      }
    );
  },
});

export const selectFarmers = (state: RootState) => state.farmers;
export const selectFarmer = ({ farmers }: RootState, farmerId: number) =>
  farmers.data.find((farmer) => farmer.id === farmerId);
export const selectFarmersDocument = createSelector(
  [selectFarmers],
  (farmers) => farmers.data.map((farmer) => farmer.document)
);

export default farmersSlice.reducer;
