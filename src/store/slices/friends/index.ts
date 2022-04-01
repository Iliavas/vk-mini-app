import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import { StoreType } from '../..';

interface IFriendsSlice {
  friends: {
    name: string;
    surname: string;
    city?: string;
    photo?: string;
    bdate?: string;
  }[]
}

const friendsSelector = createSlice({
  name: 'friends',
  initialState: {
    friends: []
  } as IFriendsSlice,
  reducers: {
    setFriends(store, payload: PayloadAction<IFriendsSlice>) {
      store.friends = payload.payload.friends;
      console.log(store);
    }
  }
});

export const getFriends = createSelector((store: StoreType) => store.friendsReducer.friends, (friends) => friends);

export const {setFriends} = friendsSelector.actions;
export default friendsSelector.reducer;
