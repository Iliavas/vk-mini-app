import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { StoreType } from "../..";

interface IActivePanelSlice {
  activePanel: "selectPanel" | "viewPanel";
}

const activePanelSlice = createSlice({
  name: 'activePanel',
  initialState: {activePanel: "selectPanel"} as IActivePanelSlice,
  reducers: {
    setActivePanel(store, payload: PayloadAction<"selectPanel" | "viewPanel">) {
      store.activePanel = payload.payload;
    }
  }
})

export const getActivePanel = createSelector((store:StoreType) => store.activePanelReducer.activePanel, (panel) => panel);

export const {setActivePanel} = activePanelSlice.actions;
export default activePanelSlice.reducer;