import { createAsyncThunk } from '@reduxjs/toolkit';

const LOCAL_API_URL = 'http://localhost:3004/farmers';

export const fetchFarmersThunk = createAsyncThunk(
  'farmers/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(LOCAL_API_URL);

      if (!response.ok) throw new Error('Failed to fetch farmers');

      const data: Farmer[] = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const createFarmerThunk = createAsyncThunk(
  'farmer/create',
  async (farmer: FarmerFormFields, thunkAPI) => {
    try {
      const response = await fetch(LOCAL_API_URL, {
        method: 'POST',
        body: JSON.stringify(farmer),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch farmer');

      const data: Farmer = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const deleteFarmerThunk = createAsyncThunk(
  'farmer/delete',
  async (farmerId: number, thunkAPI) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/${farmerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete farmer');

      return farmerId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const editFarmerThunk = createAsyncThunk(
  'farmer/edit',
  async ({ id, ...farmer }: Farmer, thunkAPI) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(farmer),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to edit farmer');

      const data: Farmer = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
