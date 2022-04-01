import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import { StoreType } from '../..';

interface IUsernameSlice {
  username: string;
}

const usernameSlice = createSlice({
  name: "username",
  initialState: {} as IUsernameSlice,
  reducers: {
    setUsername(store, payload: PayloadAction<string>) {
      store.username = payload.payload;
    }
  }
})

export const getUsername = createSelector((store:StoreType) => store.tokenReducer.token, (token) => token);

export const {setUsername} = usernameSlice.actions;
export default usernameSlice.reducer;