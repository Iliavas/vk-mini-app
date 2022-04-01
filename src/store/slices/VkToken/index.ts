import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import { StoreType } from '../..';

interface IVKTokenSlice {
  token: string;
}

const VKTokenSlice = createSlice({
  name: "VKToken",
  initialState: {token: ""} as IVKTokenSlice,
  reducers: {
    setToken(store, payload: PayloadAction<string>) {
      store.token = payload.payload;
    }
  }
})

export const getToken = createSelector((store:StoreType) => store.tokenReducer.token, (token) => token);

export const {setToken} = VKTokenSlice.actions;
export default VKTokenSlice.reducer;